import { FC } from 'react';
import clsx from 'clsx';
import { ReactComponent as DummyImage1 } from 'assets/illustrations/task/task-dummy-1.svg';
import { ReactComponent as DummyImage2 } from 'assets/illustrations/task/task-dummy-2.svg';
import { ReactComponent as BrandImage } from 'assets/images/metadata/brand-image.svg';
import userImg from 'assets/images/profile/user-image.png';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import Card from 'components/Card';
import styles from './index.module.scss';
import useFetchUserTasks from './hooks';

const Tasks = () => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const profileId = profile?.profileId ? profile.profileId : 0;
  const { data } = useFetchUserTasks(profileId);
  if (data) {
    return (
      <div className={styles['tasks-container']}>
        {data?.data?.map((d: any) => (
          <TaskCard
            key={d.taskId}
            title={d.title}
            organisation={d.organisation}
            estimatedDifficulty={d.estimatedDifficulty}
            price={d.price}
            organisationImage={d.organisationImage}
          />
        ))}
      </div>
    );
  }
  return null;
};

interface ITaskCard {
  title: string;
  organisation: string;
  estimatedDifficulty: number;
  price: number;
  organisationImage: JSX.Element;
}

const TaskCard: FC<ITaskCard> = ({
  title,
  organisation,
  estimatedDifficulty,
  price,
  organisationImage,
}) => {
  const applyToTask = () => {};
  return (
    <div className={styles.container}>
      <Card
        className={styles['task-card']}
        showTransparentBg
        width="100%"
        height="auto"
      >
        <div className={styles.wrapper}>
          <div className={styles.content} style={{ width: '100px' }}>
            <BrandImage width={95} height={95} />
          </div>
          <div className={styles.content} style={{ lineHeight: '2rem' }}>
            <h4>{title}</h4>
            <p>{organisation}</p>
            {Array.from({ length: estimatedDifficulty }).map((_, index) => (
              <i
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className={clsx('material-icons', styles['rating-star'])}
              >
                star
              </i>
            ))}
          </div>
          <div className={styles.content} style={{ width: '200px' }}>
            <p className={styles.dot} style={{ top: '1px', left: '-25px' }} />
            <p>{price} USDC </p>
          </div>
          <div
            className={styles.content}
            style={{ width: '200px', cursor: 'pointer' }}
            onClick={applyToTask}
          >
            Apply to task
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Tasks;
