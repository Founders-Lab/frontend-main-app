import config from 'config';
import { getAccessToken } from './authFn';
import decodeToken from './decodeToken';
import { revokeAccess } from './handleUnAuthorization';

export const handleChainChanged = (chainId: any) => {
  console.log('chain changed');
  console.log(chainId);

  if (chainId !== config.chainId) {
    // Before reloading, move the user to the login page first because
    // if user rejects the metamask auth then they'll remain on the same
    // page. So, to avoid this case.
    revokeAccess();
  }
};

export const detectMetamask = () => {
  const provider = window.ethereum;

  if (provider) {
    return provider;
  }
  throw new Error('Please install Metamask!');
};

export const handleSwitchChange = async (provider: any, chainId: string) => {
  try {
    console.log('changing chain');
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId,
        },
      ],
    });
  } catch (err: any) {
    if (err.code === 4902) {
      return {
        errorMessage: 'Chain not present',
      };
    }
    if (err.code === 4001) {
      throw new Error('User rejected the request');
    }
    if (err.code === -32002) {
      throw new Error('Previous request already in progress');
    }
  }

  return {
    errorMessage: '',
  };
};

export const requestEthereumAccounts = async (provider: any) => {
  try {
    const accounts: any[] = await provider.request({
      method: 'eth_requestAccounts',
    });

    const account = handleAccountsChanged(accounts);
    return account;
  } catch (err: any) {
    if (err.code === 4001) {
      // EIP-1193 userRejectedRequest error
      console.log('Please connect to MetaMask.');
    } else {
      console.error(err);
    }
  }

  return null;
};

export const handleAccountsChanged = (accounts: any[]) => {
  console.log('account changed');
  console.log(accounts);

  if (accounts.length === 0) {
    revokeAccess();
  }

  const accessToken = getAccessToken();
  if (accessToken) {
    const decoded = decodeToken(accessToken);

    if (decoded?.walletId !== accounts[0]) {
      revokeAccess();
    }
  }

  return accounts[0];
};
