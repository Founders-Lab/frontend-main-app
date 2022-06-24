import { FC, useState } from 'react';
import { ReactComponent as InstagramIcon } from 'assets/illustrations/profile/instagram.svg';
import { ReactComponent as LinkedinIcon } from 'assets/illustrations/profile/linkedin.svg';
import { ReactComponent as TwitterIcon } from 'assets/illustrations/profile/twitter.svg';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import styles from './index.module.scss';
import OrgSocialsModal from './OrgSocialsModal';

interface IOrgSocialsEditProps {
  orgId: number;
}

const OrgSocialsEdit: FC<IOrgSocialsEditProps> = ({ orgId }) => {
  const [open, setOpen] = useState(false);
  const organisations = useSelector((state: RootState) => state.org.orgs);

  const [organisation] = organisations.filter(
    org => orgId === org.organisationId
  );

  const handleOpenModal = () => setOpen(true);

  return (
    <>
      <span
        className={styles['org-socials-container']}
        onClick={handleOpenModal}
      >
        {organisation?.linkedin && <LinkedinIcon width={40} height={40} />}
        {organisation?.twitter && <TwitterIcon width={40} height={40} />}
        {organisation?.instagram && <InstagramIcon width={40} height={40} />}
      </span>
      {open && <OrgSocialsModal setOpen={setOpen} orgId={orgId} />}
    </>
  );
};

export default OrgSocialsEdit;
