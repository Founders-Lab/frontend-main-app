import { FC } from 'react';
import Card from 'components/Card';
import ProjectCard from 'components/Home/ProjectCard';
import getRandomString from 'utils/getRandomString';
import styles from './index.module.scss';

interface AllProjectsProps {
  projectData: any;
}

const AllProjects: FC<AllProjectsProps> = ({ projectData }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>All Projects</h1>
      <Card className={styles.cardsContainer}>
        <>
          {projectData.map((project: any) => {
            return (
              <ProjectCard
                key={getRandomString(5)}
                projectId={project.flProjectId_uuid}
                projectName={project.flProjectName}
                org={project.organisationName}
                description={project.flProjectDescription}
                numTasks={project.taskCount}
                location="Project"
                orgImage={project.organisationImage}
                width="200px"
              />
            );
          })}
        </>
      </Card>
    </div>
  );
};

export default AllProjects;
