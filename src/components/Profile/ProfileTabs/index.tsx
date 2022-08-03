/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import clsx from 'clsx';
import { FC, useState } from 'react';
import Education from 'components/Education';
import Tasks from 'components/Tasks';
import WorkHistory from 'components/WorkHistory';
import OrganisationTab from 'components/OrganisationTab';
import ProjectsTab from 'components/ProjectsTab';
import styles from './index.module.scss';

const ProfileTabs: FC = () => {
  const [activeState, setActiveState] = useState('task');
  const renderTabs = () => {
    switch (activeState) {
      case 'organisation':
        return <OrganisationTab />;
      case 'project':
        return <ProjectsTab />;
      case 'task':
        return <Tasks />;
      case 'workHistory':
        return <WorkHistory />;
      case 'education':
        return <Education />;
      default:
        return null;
    }
  };

  const handleClick = (value: string) => {
    setActiveState(value);
  };

  return (
    <>
      <div className={styles['profile-tab-header']}>
        <h3
          className={clsx(
            styles['profile-tab-title'],
            activeState === 'organisation' &&
              styles['profile-tab-title--active']
          )}
          onClick={() => handleClick('organisation')}
        >
          Organisations
        </h3>
        <h3
          className={clsx(
            styles['profile-tab-title'],
            activeState === 'project' && styles['profile-tab-title--active']
          )}
          onClick={() => setActiveState('project')}
        >
          Projects
        </h3>
        <h3
          className={clsx(
            styles['profile-tab-title'],
            activeState === 'task' && styles['profile-tab-title--active']
          )}
          onClick={() => setActiveState('task')}
        >
          Tasks
        </h3>
        <h3
          className={clsx(
            styles['profile-tab-title'],
            activeState === 'workHistory' && styles['profile-tab-title--active']
          )}
          onClick={() => setActiveState('workHistory')}
        >
          Work History
        </h3>
        <h3
          className={clsx(
            styles['profile-tab-title'],
            activeState === 'education' && styles['profile-tab-title--active']
          )}
          onClick={() => setActiveState('education')}
        >
          Education
        </h3>
      </div>
      {renderTabs()}
    </>
  );
};

export default ProfileTabs;
