/* eslint-disable no-underscore-dangle */
import Card from 'components/Card';
import { ReactComponent as BrandImage } from 'assets/images/metadata/brand-image.svg';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import getRandomString from 'utils/getRandomString';
import styles from './index.module.scss';
import useFetchUserProjects from './hooks';

const ProjectsCard = () => {
  const data = useFetchUserProjects();
  const projects: any = [];
  data?.data?.forEach((project: any) => {
    projects.push(project.flProjects);
  });
  const projectsFlat = projects.flat();
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      {projectsFlat?.map((project: any) => {
        return (
          <div
            onClick={() => {
              navigate(`/project/${project.flProjectId_uuid}`);
            }}
            style={{ cursor: 'pointer' }}
            key={getRandomString(5)}
          >
            <Card
              className={styles['project-card']}
              showTransparentBg
              width="189.95px"
              marginRight="50px"
            >
              <header>
                <BrandImage width={70} height={70} />
                <h3 className={styles['text--primary']}>
                  {project?.name?.length > 13
                    ? `${project?.name?.substring(0, 13)}...`
                    : project?.name}
                </h3>
                <span className={styles['text--secondary']}>org</span>
              </header>
              <p className={styles['text-content']}>
                {project?.description?.length > 121
                  ? `${project?.description?.substring(0, 121)}...`
                  : project?.description}
              </p>
              <footer>
                <span className={styles['text-extra']}>{1} tasks</span>
                <span className={clsx('material-icons', styles.icon)}>
                  east
                </span>
              </footer>
            </Card>
          </div>
        );
      })}
      {projectsFlat?.length === 0 && <p>No Projects</p>}
    </div>
  );
};

export default ProjectsCard;
