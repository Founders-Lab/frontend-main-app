import { FC } from 'react';
import clsx from 'clsx';
import ProfileImage from 'assets/images/profile/user-image.png';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';

import { useNavigate } from 'react-router-dom';
const ProfileButton: FC = () => {
const userWalletId = useSelector((state: RootState) => state.user.user?.walletId);

  
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles['image-cont']}>
        <div
          className={styles.image}
          onClick={() => {
            navigate('/profile');
          }}
        >
          <img src={ProfileImage} alt="your profile" />
        </div>
      </div>
      <div className={styles.content}>
        <div
          className={clsx(
            styles['text--primary'],
            styles['text--align'],
            styles['text--clickable']
          )}
        >
          <div
          >
            <span>{userWalletId?.substring(0,6)+ '...'+ userWalletId?.substring(userWalletId.length-4,userWalletId.length)}</span>
          </div>
          <span className="material-icons">keyboard_arrow_down</span>
        </div>
        <div className={clsx(styles['text--secondary'], styles['text--align'])}>
          <span>Your Wallet</span>
          <WalletConnIndicator />
        </div>
      </div>
    </div>
  );
};

const WalletConnIndicator: FC = () => {
  return (
    <div className={styles['indicator-outer']}>
      <div className={styles['indicator-fill']} />
    </div>
  );
};

export default ProfileButton;
