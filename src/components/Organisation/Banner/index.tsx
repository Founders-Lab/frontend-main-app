import { FC } from 'react';
import gradient from 'assets/illustrations/organisation/gradient.svg';
import { ReactComponent as Instagram } from 'assets/illustrations/profile/instagram.svg';
import { ReactComponent as Linkedin } from 'assets/illustrations/profile/linkedin.svg';
import { ReactComponent as Twitter } from 'assets/illustrations/profile/twitter.svg';
import { ReactComponent as Apple } from 'assets/illustrations/organisation/apple.svg';
import clsx from 'clsx';
import styles from './index.module.scss';

const Banner: FC = () => {
  return (
    <div className={styles.container}>
      <div
        className={styles.gradient}
        style={{ backgroundImage: `url(${gradient})` }}
      />
      <div className={styles.content}>
        <div className={styles.logo}>
          <Apple width={95} height={117} />
        </div>
        <div className={clsx(styles.info, styles.center)}>
          <p className={styles['text--primary']}>Apple Inc.</p>
          <p className={styles['text--secondary']}>
            &quot;Think Different - But not Too Different&quot;
          </p>
          <footer className={styles.btnCont}>
            <EditOrgButton />
          </footer>
        </div>
        <div className={clsx(styles.center, styles.extra)}>
          <p>
            Website:
            <span>
              <a href="http://#">Apple.com</a>
            </span>
          </p>
          <p>
            Socials:
            <span>
              <Instagram width={37} height={37} />
              <Linkedin width={37} height={37} />
              <Twitter width={37} height={37} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const EditOrgButton: FC = () => {
  return <button className={styles.btn}>Edit Organisation</button>;
};

export default Banner;
