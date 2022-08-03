import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import ProfileImage from 'assets/images/profile/user-image.png';
import { RootState } from 'reducers';
import styles from './index.module.scss';

const ProfileButton: FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const profile = useSelector((state: RootState) => state.profile.profile);
  const navigate = useNavigate();
  const pictureFunc = () => {
    return profile?.picture ?? ProfileImage;
  };
  return (
    <div className={styles.container}>
      <div className={styles['image-cont']}>
        <div
          className={styles.image}
          onClick={() => {
            navigate('/profile');
          }}
        >
          <img src={pictureFunc()} alt="your profile" />
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
          <div          >
            <span>{user?.walletId?.slice(0, 6)}...{user?.walletId?.slice(user?.walletId.length - 6, user?.walletId.length)}</span>
          </div>
          {/* <span className="material-icons">keyboard_arrow_down</span> No USE now */}
        </div>
        <div className={clsx(styles['text--secondary'], styles['text--align'])}>
          <span>My Wallet</span>
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
