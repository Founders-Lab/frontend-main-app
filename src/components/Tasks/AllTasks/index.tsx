import { FC } from 'react';
import TaskCard from 'components/Home/TaskCard';
import { useQuery } from '@tanstack/react-query';
import config from 'config';
import { getAccessToken } from 'utils/authFn';
import styles from './index.module.scss';

const AllTasks: FC = () => {
  const { isLoading, error, data, isFetching } = useQuery(['allTasks'], () =>
    fetch(`${config.ApiBaseUrl}/task/all`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    }).then(response => response.json())
  );
  if (isFetching) return <p>Loading...</p>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.heading}>All Tasks</h1>
        <div className={styles.taskCardWrapper}>
          {data.map((task: any) => (
            <TaskCard key={task.id} data={task} width="60vw" />
          ))}
        </div>
      </div>
    </div>
  );
};
export default AllTasks;
