import { Dispatch, FC, SetStateAction, useState } from 'react';
import { ActionMeta, SingleValue } from 'react-select';
import Modal from 'components/Modal';
import Select, { Option } from 'components/Select';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import clsx from 'clsx';
import gradientBtn from 'assets/illustrations/button/button-gradient.svg';
import {
  useAddProfileSkill,
  useFetchAppSkills,
  useRemoveProfileSkill,
} from './hooks';
import styles from './index.module.scss';

interface IProfileSkills {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ProfileSkillsModal: FC<IProfileSkills> = ({ setOpen }) => {
  useFetchAppSkills();
  const addProfileSkill = useAddProfileSkill();
  const removeProfileSkill = useRemoveProfileSkill();

  const [selectedSkill, setSelectedSkill] = useState<Option | null>(null);

  const appSkills = useSelector((state: RootState) => state.skills.appSkills);
  const profileSkills = useSelector(
    (state: RootState) => state.skills.profileSkills
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectChange = (
    newValue: SingleValue<Option>,
    action: ActionMeta<Option>
  ) => {
    if (newValue) {
      const found = profileSkills?.some(el => el.label === newValue.label);
      if (!found) {
        setSelectedSkill(newValue);
        addProfileSkill(newValue);
      }
    }
  };

  const handleSkillRemove = (skillsId: number) => {
    removeProfileSkill(skillsId, profileSkills);
  };

  return (
    <Modal onClose={handleClose}>
      <h1 className={styles['skill-title']}>Skills</h1>
      <p className={styles['skill-description']}>
        To add more skills, write it in field below and click ENTER to add a
        skill. You can add maximum 6 skills.
      </p>
      <Select
        options={appSkills}
        placeholder="Select Skills"
        value={selectedSkill}
        name="ProfileSkills"
        onSelectChange={handleSelectChange}
      />
      <div className={styles['profile-skill-modal-tag-container']}>
        {profileSkills.map(profileSkill => (
          <SkillTag
            key={profileSkill.value}
            name={profileSkill.label}
            skillsId={profileSkill.value}
            handleRemove={handleSkillRemove}
          />
        ))}
      </div>
      <div className={styles['gradient-save-btn']} onClick={handleClose}>
        <div
          className={styles['gradient-blur']}
          style={{ backgroundImage: `url(${gradientBtn})` }}
        />
        <p>Save</p>
      </div>
    </Modal>
  );
};

interface ISkillTag {
  skillsId: number;
  name: string;
  handleRemove: (skillsId: number) => void;
}

const SkillTag: FC<ISkillTag> = ({ skillsId, name, handleRemove }) => {
  const handleSkillRemove = () => {
    handleRemove(skillsId);
  };

  return (
    <div className={styles['profile-skill-modal-tag']}>
      <span>{name}</span>
      <i className={clsx('material-icons-200')} onClick={handleSkillRemove}>
        close
      </i>
    </div>
  );
};

export default ProfileSkillsModal;
