/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import Card from 'components/Card';
import { ReactComponent as BrandImage } from 'assets/images/metadata/brand-image.svg';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import styles from './index.module.scss';

interface ProjectCardProps {
  projectName: string;
  description: string;
  org: string;
  numTasks: number;
  projectId: string;
  location?: string;
  width?: string;
  orgImage?: string;
}

const ProjectCard: FC<ProjectCardProps> = ({
  projectName,
  description,
  org,
  numTasks,
  projectId,
  location,
  width,
  orgImage,
}) => {
  const navigate = useNavigate();
  console.log(orgImage);

  if (location === 'home') {
    return (
      <div
        onClick={() => {
          navigate(`/project/${projectId}`);
        }}
        style={{ cursor: 'pointer' }}
      >
        <Card
          className={styles['project-card']}
          showTransparentBg
          width={width}
          marginRight="44px"
        >
          <>
            <header>
              {orgImage ? (
                <img src={orgImage} className={styles.orgImage}></img>
              ) : (
                <BrandImage width={70} height={70} />
              )}
              <h3 className={styles['text--primary']}>
                {projectName?.length > 13
                  ? `${projectName?.substring(0, 13)}...`
                  : projectName}
              </h3>
              <span className={styles['text--secondary']}>{org}</span>
            </header>
            <p className={styles['text-content']}>
              {description?.length > 90
                ? `${description?.substring(0, 90)}...`
                : description}
            </p>

            <footer>
              <span className={styles['text-extra']}>{numTasks} tasks</span>
              <span className={clsx('material-icons', styles.icon)}>east</span>
            </footer>
          </>
        </Card>
      </div>
    );
  }
  return (
    <div
      onClick={() => {
        navigate(`/project/${projectId}`);
      }}
      style={{ cursor: 'pointer' }}
    >
      <Card className={styles['project-card']} showTransparentBg width={width}>
        <>
          <header>
            {orgImage ? (
              <img src={orgImage} className={styles.orgImage}></img>
            ) : (
              <BrandImage width={70} height={70} />
            )}
            <h3 className={styles['text--primary']}>
              {projectName?.length > 16
                ? `${projectName?.substring(0, 16)}...`
                : projectName}
            </h3>
            <span className={styles['text--secondary']}>{org}</span>
          </header>
          <p className={styles['text-content']}>
            {description?.length > 90
              ? `${description?.substring(0, 90)}...`
              : description}
          </p>

          <footer>
            <span className={styles['text-extra']}>{numTasks} tasks</span>
            <span className={clsx('material-icons', styles.icon)}>east</span>
          </footer>
        </>
      </Card>
    </div>
  );
};

ProjectCard.defaultProps = {
  width: '215px',
  location: 'home',
};

export default ProjectCard;
