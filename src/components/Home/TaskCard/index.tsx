import { ReactComponent as BrandImage } from 'assets/images/metadata/brand-image.svg';
import clsx from 'clsx';
import Card from 'components/Card';
import useBuilderTaskApply from 'hooks/useBuilderTaskApply';
import styles from './index.module.scss';

const TaskCard = (props: any) => {
  const { width, height, data, location } = props;

  const builderTaskApply = useBuilderTaskApply();

  const applyToTask = () => {
    builderTaskApply.mutate({
      taskId: data.taskId,
    });
  };

  if (location === 'home') {
    return (
      <>
        <Card
          className={styles['task-card']}
          showTransparentBg
          width={width}
          height={height}
          borderType={'0.7px solid #e0b9ff'}
        >
          <div className={styles.wrapper} style={{ height: '120px' }}>
            <div className={styles.content} style={{ lineHeight: '2rem' }}>
              <div className={styles.catWrap}>
                <p className={styles.cat}>
                  {data.flProjectCategory.categoryName}
                </p>
              </div>
              <div className={styles.wrapContent}>
                <h4>{data.name}</h4>
                <p>{data.flProjectCategory.flProject.name}</p>
                {Array.from({ length: data.estimatedDifficulty }).map(
                  (_, index) => (
                    <i
                      key={index}
                      className={clsx('material-icons', styles['rating-star'])}
                    >
                      star
                    </i>
                  )
                )}
              </div>
            </div>
            <div className={styles.content} style={{ width: '150px' }}>
              <div className={styles.col}>
                <div style={{ cursor: 'pointer' }} onClick={applyToTask}>
                  Apply to task
                </div>

                <div
                  className={styles.dot}
                  style={{
                    background: '#FFB9C2',
                    top: '90px',
                    left: '25px',
                  }}
                ></div>
                <p>{data.price} USDC </p>
              </div>
            </div>
          </div>
        </Card>
        <br />
      </>
    );
  }
  return (
    <Card
      className={styles['task-card']}
      showTransparentBg
      width={width}
      height={height}
    >
      <>
        <div className={styles.wrapper}>
          <div className={styles.content} style={{ width: '100px' }}>
            <BrandImage width={95} height={95} />
          </div>
          <div className={styles.content} style={{ lineHeight: '2rem' }}>
            <h4>{data.name}</h4>
            <p>{data.flProjectCategory.flProject.name}</p>
            {Array.from({ length: data.estimatedDifficulty }).map(
              (_, index) => (
                <i
                  key={index}
                  className={clsx('material-icons', styles['rating-star'])}
                >
                  star
                </i>
              )
            )}
          </div>
          <div className={styles.content} style={{ width: '200px' }}>
            <div className={styles.dot} style={{ top: '1px', left: '-25px' }}>
              {' '}
            </div>
            <p>{data.price} USDC </p>
          </div>
          <div
            className={styles.content}
            style={{ width: '200px', cursor: 'pointer' }}
            onClick={applyToTask}
          >
            <p>Apply to task</p> 
          </div>
        </div>
      </>
    </Card>
  );
};

export default TaskCard;
