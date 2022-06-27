import {
  FC,
  ReactNode,
  SetStateAction,
  Dispatch,
  ChangeEvent,
  useState,
  useEffect,
} from 'react';
import gradient from 'assets/illustrations/organisation/gradient.svg';
import { ReactComponent as Apple } from 'assets/illustrations/organisation/apple.svg';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { editOrg } from 'actions/organisation';
import { RootState } from 'reducers';
import styles from './index.module.scss';
import OrgSocials from '../OrgSocials';
import OrgSocialsEdit from '../OrgSocialsEdit';
import useUpdateCompanyMain from './hook';

interface IBannerProps {
  orgId: number;
}

const Banner: FC<IBannerProps> = ({ orgId }) => {
  const isEditable = useSelector((state: RootState) => state.org.isEditable);
  const organisations = useSelector((state: RootState) => state.org.orgs);

  const [organisation] = organisations.filter(
    org => orgId === org.organisationId
  );

  const [website, setWebsite] = useState(organisation?.website || 'apple.com');
  const [name, setName] = useState(organisation?.name || 'apple');

  useEffect(() => {
    if (organisation) {
      setWebsite(organisation?.website || 'apple.com');
      setName(organisation?.name || 'apple');
    }
  }, [organisation]);

  const updateCompanyMain = useUpdateCompanyMain(`${orgId}`);

  const handleSubmit = () => {
    updateCompanyMain({
      name,
      website,
    });
  };

  return (
    <BannerContainer>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Apple width={95} height={117} />
        </div>
        <div className={clsx(styles.info, styles.center)}>
          <Title isEditable={isEditable} setTitle={setName} title={name} />
          <p className={styles['text--secondary']}>
            &quot;Think Different - But not Too Different&quot;
          </p>
          <footer className={styles.btnCont}>
            {isEditable ? (
              <OrgButton type="save" onClick={handleSubmit}>
                save
              </OrgButton>
            ) : (
              <OrgButton type="edit">Edit Organisation</OrgButton>
            )}
          </footer>
        </div>
        <div className={clsx(styles.center, styles.extra)}>
          <OrgWebsite
            website={website}
            isEditable={isEditable}
            setWebsite={setWebsite}
          />
          <Socials isEditable={isEditable} orgId={orgId} />
        </div>
      </div>
    </BannerContainer>
  );
};

interface ITitleProps {
  title: string;
  isEditable: boolean;
  setTitle: Dispatch<SetStateAction<string>>;
}

const Title: FC<ITitleProps> = ({ title, isEditable, setTitle }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div
      className={clsx(
        styles.titleCont,
        styles.center,
        isEditable && styles.edit
      )}
    >
      {isEditable ? (
        <input value={title} onChange={handleChange} className={styles.title} />
      ) : (
        <p className={styles['text--primary']}>{title}</p>
      )}
    </div>
  );
};

interface IOrgWebsiteProps {
  website: string;
  isEditable: boolean;
  setWebsite: Dispatch<SetStateAction<string>>;
}

const OrgWebsite: FC<IOrgWebsiteProps> = ({
  website,
  isEditable,
  setWebsite,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWebsite(e.target.value);
  };

  return (
    <div className={styles.action}>
      <p>Website:</p>
      <div
        className={clsx(
          styles.webCont,
          styles.center,
          isEditable && styles.edit
        )}
      >
        {isEditable ? (
          <input value={website} onChange={handleChange} />
        ) : (
          <a href={website}>{website}</a>
        )}
      </div>
    </div>
  );
};

interface ISocialsProps {
  isEditable: boolean;
  orgId: number;
}

const Socials: FC<ISocialsProps> = ({ isEditable, orgId }) => {
  return (
    <div className={styles.action}>
      Socials:
      {isEditable ? (
        <OrgSocialsEdit orgId={orgId} />
      ) : (
        <OrgSocials orgId={orgId} />
      )}
    </div>
  );
};

interface IBannerContProps {
  children: ReactNode;
}

const BannerContainer: FC<IBannerContProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.gradient}
        style={{ backgroundImage: `url(${gradient})` }}
      />
      {children}
    </div>
  );
};

interface IOrgButtonProps {
  type: 'edit' | 'save';
  children: ReactNode;
  onClick?: () => void;
}

const OrgButton: FC<IOrgButtonProps> = ({ type, children, onClick }) => {
  const dispatch = useDispatch();

  const handleClickEdit = () => {
    dispatch(editOrg(true));
  };

  const handleClickSave = () => {
    dispatch(editOrg(false));
    if (onClick) onClick();
  };

  if (type === 'edit')
    return (
      <button className={styles.btn} onClick={handleClickEdit}>
        {children}
      </button>
    );

  return (
    <button className={styles.btn} onClick={handleClickSave}>
      {children}
    </button>
  );
};

OrgButton.defaultProps = {
  onClick: () => {},
};

export default Banner;
