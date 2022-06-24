import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';
import Modal from 'components/Modal';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import gradientBtn from 'assets/illustrations/button/button-gradient.svg';
import styles from './index.module.scss';
import useUpdateOrgSocial from './hooks';

interface IProfileSkills {
  orgId: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const OrgSocialsModal: FC<IProfileSkills> = ({ orgId, setOpen }) => {
  const organisations = useSelector((state: RootState) => state.org.orgs);

  const [organisation] = organisations.filter(
    org => orgId === org.organisationId
  );

  const [linkedin, setLinkedin] = useState(organisation?.linkedin ?? '');
  const [twitter, setTwitter] = useState(organisation?.twitter ?? '');
  const [instagram, setInstagram] = useState(organisation?.instagram ?? '');

  const updateOrgSocials = useUpdateOrgSocial(orgId);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    updateOrgSocials({
      linkedin,
      twitter,
      instagram,
      setOpen,
    });
  };

  return (
    <Modal onClose={handleClose}>
      <h1 className={styles['social-title']}>Socials</h1>
      <SocialInput
        title="Twitter"
        value={twitter}
        handleChange={e => setTwitter(e.target.value)}
      />
      <SocialInput
        title="Instagram"
        value={instagram}
        handleChange={e => setInstagram(e.target.value)}
      />
      <SocialInput
        title="LinkedIn"
        value={linkedin}
        handleChange={e => setLinkedin(e.target.value)}
      />
      <div className={styles['gradient-save-btn']} onClick={handleSave}>
        <div
          className={styles['gradient-blur']}
          style={{ backgroundImage: `url(${gradientBtn})` }}
        />
        <p>Save</p>
      </div>
    </Modal>
  );
};

interface ISocialInput {
  title: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SocialInput: FC<ISocialInput> = ({ title, value, handleChange }) => {
  return (
    <div className={styles['social-input']}>
      <span className={styles['social-input-title']}>{title}</span>
      <input
        type="text"
        placeholder="Write address here"
        className={styles['social-input-field']}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default OrgSocialsModal;
