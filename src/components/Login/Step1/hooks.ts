import { updateCurrentStep, updateFirstTimeUser } from 'actions/auth';
import config from 'config';
import { Dispatch, SetStateAction } from 'react';
import { providers } from 'ethers';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddPolygonChain, signMessage } from 'utils/ethereumFn';
import { handleApiErrors } from 'utils/handleApiErrors';
import { setAccessToken } from 'utils/authFn';
import { updateUser } from 'actions/user';
import { RootState } from 'reducers';
import {
  detectMetamask,
  handleSwitchChange,
  requestEthereumAccounts,
} from 'utils/web3EventFn';

interface IGenerateNonce {
  setError: Dispatch<SetStateAction<string>>;
}

const useMetamaskLogin = () => {
  const dispatch = useDispatch();

  const generateNonce = async ({ setError }: IGenerateNonce) => {
    const ac = new AbortController();
    const { signal } = ac;

    try {
      const provider = detectMetamask();
      const { errorMessage } = await handleSwitchChange(
        provider,
        config.chainId
      );
      if (errorMessage === 'Chain not present') {
        await handleAddPolygonChain(provider);
      }

      const account = await requestEthereumAccounts(provider);

      if (account) {
        const payload = {
          walletId: account,
        };

        const response = await fetch(
          `${config.ApiBaseUrl}/auth/generate-nonce`,
          {
            signal,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          }
        );

        const json: any = await handleApiErrors(response);

        dispatch(updateUser(json.user));

        const signature = await signMessage(provider, json.message);

        if (signature) {
          const payload2 = {
            message: json.message,
            walletId: account,
            isFirstTimeUser: json.isFirstTimeUser,
            signature,
          };

          console.log(payload2);

          const response2 = await fetch(
            `${config.ApiBaseUrl}/auth/verify-signature`,
            {
              signal,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload2),
            }
          );

          const json2: any = await handleApiErrors(response2);

          setAccessToken(json2.accessToken);
          dispatch(updateFirstTimeUser(json.isFirstTimeUser));
          dispatch(updateCurrentStep(2));
        }
      }
    } catch (e: any) {
      if (e.message === 'Please install Metamask!') {
        setError(e.message);
      } else if (e.message === 'User rejected the request') {
        setError(e.message);
      } else if (e.message === 'Previous request already in progress') {
        setError(e.message);
      }
    }
  };

  return generateNonce;
};

const useWalletConnectLogin = () => {
  const dispatch = useDispatch();
  const walletConnectProvider = useSelector(
    (state: RootState) => state.app.walletConnectProvider
  );

  const walletConnectGenerateNonce = async ({ setError }: IGenerateNonce) => {
    const ac = new AbortController();
    const { signal } = ac;

    try {
      await walletConnectProvider.enable();
      const web3Provider = new providers.Web3Provider(walletConnectProvider);
      console.log(web3Provider);

      const accounts = await web3Provider.listAccounts();

      const { chainId } = await web3Provider.getNetwork();
      console.log(chainId);
      await walletConnectProvider.disconnect();
      console.log(accounts);

      if (chainId !== 137) {
        throw new Error('Please change the network to Polygon');
      }

      if (accounts.length > 0) {
        const payload = {
          walletId: accounts[0],
        };

        const response = await fetch(
          `${config.ApiBaseUrl}/auth/generate-nonce`,
          {
            signal,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          }
        );

        const json: any = await handleApiErrors(response);

        dispatch(updateUser(json.user));

        const signature = await signMessage(
          walletConnectProvider,
          json.message
        );

        if (signature) {
          const payload2 = {
            message: json.message,
            walletId: accounts[0],
            isFirstTimeUser: json.isFirstTimeUser,
            signature,
          };

          console.log(payload2);

          const response2 = await fetch(
            `${config.ApiBaseUrl}/auth/verify-signature`,
            {
              signal,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload2),
            }
          );

          const json2: any = await handleApiErrors(response2);

          setAccessToken(json2.accessToken);
          dispatch(updateFirstTimeUser(json.isFirstTimeUser));
          dispatch(updateCurrentStep(2));
        }
      }
    } catch (e: any) {
      if (e.message === 'Please install Metamask!') {
        setError(e.message);
      } else if (e.message === 'User rejected the request') {
        setError(e.message);
      } else if (e.message === 'Previous request already in progress') {
        setError(e.message);
      } else if (e.message === 'Please change the network to Polygon') {
        setError(e.message);
      }
    }
  };

  return walletConnectGenerateNonce;
};

export { useMetamaskLogin, useWalletConnectLogin };
