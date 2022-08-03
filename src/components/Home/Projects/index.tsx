import { FC } from 'react';
import Card from 'components/Card';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import config from 'config';
import { getAccessToken } from 'utils/authFn';
import getRandomString from 'utils/getRandomString';
import ProjectCard from '../ProjectCard';
import styles from './index.module.scss';
import { castArray } from 'lodash';

const Projects: FC = () => {
  const navigate = useNavigate();
  const { isLoading, error, data, isFetching } = useQuery(
    ['userOrgs'],
    () =>
      fetch(`${config.ApiBaseUrl}/fl-project/new`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${getAccessToken()}` },
      }).then(response => response.json()),
    {
      refetchOnWindowFocus: false,
    }
  );
  if (isFetching) return <p>Loading...</p>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <section className={styles.projects}>
      <div className={styles.header}>
        <p>New Projects</p>
        <span
          onClick={() => navigate('/project/all')}
          style={{ cursor: 'pointer', zIndex: '1' }}
        >
          View all
        </span>
      </div>
      <div className={styles.border}>
        <Card className={styles['projects-cont']} showTransparentBg>
          {data.map((project: any) => console.log(project))}
          {data.map((project: any) => (
            <ProjectCard
              key={getRandomString(5)}
              projectId={project.flProjectId_uuid}
              projectName={project.flProjectName}
              org={project.organisationName}
              description={project.flProjectDescription}
              numTasks={project.taskCount}
              orgImage={project.organisationImage}
              location="home"
              width=""
            />
          ))}
        </Card>
      </div>
    </section>
  );
};

export default Projects;
