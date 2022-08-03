import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import Web3 from 'web3';
import toast, { Toaster } from 'react-hot-toast';
import clsx from 'clsx';
import { RootState } from 'reducers';
import { ReactComponent as WalletIcon } from 'assets/illustrations/icons/wallet.svg';
import { ReactComponent as VisibilityIcon } from 'assets/illustrations/icons/visibility.svg';
import { ReactComponent as WithdrawIcon } from 'assets/illustrations/icons/withdraw.svg';
import styles from './index.module.scss';
import useWithdrawFund from './hooks';

const WalletBalButton = () => {
  const [openWithdraw, setOpenWithdraw] = useState(false);

  const { usdcBalance, profileContractAddress } = useSelector(
    (state: RootState) => state.profile
  );

  const { withdrawFund } = useWithdrawFund();

  const handleWithdraw = () => {
    if (usdcBalance === 0) {
      toast.error('Zero Balance');
    } else {
      withdrawFund(profileContractAddress);
    }
    setOpenWithdraw(false);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.balance}
        onClick={() => setOpenWithdraw(!openWithdraw)}
      >
        <div className={styles.icon}>
          <WalletIcon width={28} height={28} />
        </div>
        <div className={styles.content}>
          <div
            className={clsx(
              styles['text--primary'],
              styles['text--align'],
              styles['text--clickable']
            )}
          >
            <span>
              {Number(
                Number(usdcBalance / Math.pow(10, 6)).toFixed(4)
              ).toLocaleString()}{' '}
              usdc
            </span>
            <span className="material-icons">keyboard_arrow_down</span>
          </div>
          <span
            className={clsx(
              styles['text--secondary'],
              styles['text--clickable'],
              styles['text--align']
            )}
          >
            Profile Balance
            {/* <VisibilityIcon width={15} height={15} /> TODO - toggle visibility */}
          </span>
        </div>
      </div>
      {openWithdraw && (
        <div className={styles.withdraw} onClick={handleWithdraw}>
          <WithdrawIcon width={30} height={20} />
          <span>Withdraw</span>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default WalletBalButton;
