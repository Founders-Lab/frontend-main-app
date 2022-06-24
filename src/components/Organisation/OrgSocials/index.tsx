import { FC } from 'react';
import { ReactComponent as InstagramIcon } from 'assets/illustrations/profile/instagram.svg';
import { ReactComponent as LinkedinIcon } from 'assets/illustrations/profile/linkedin.svg';
import { ReactComponent as TwitterIcon } from 'assets/illustrations/profile/twitter.svg';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import styles from './index.module.scss';

interface IOrgSocialsProps {
  orgId: number;
}

const OrgSocials: FC<IOrgSocialsProps> = ({ orgId }) => {
  const organisations = useSelector((state: RootState) => state.org.orgs);

  const [organisation] = organisations.filter(
    org => orgId === org.organisationId
  );

  return (
    <span className={styles['org-socials-container']}>
      {organisation?.linkedin && <LinkedinIcon width={40} height={40} />}
      {organisation?.twitter && <TwitterIcon width={40} height={40} />}
      {organisation?.instagram && <InstagramIcon width={40} height={40} />}
    </span>
  );
};

export default OrgSocials;
