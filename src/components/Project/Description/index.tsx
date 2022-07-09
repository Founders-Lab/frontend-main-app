import { FC } from 'react';
import styles from './index.module.scss';
interface DescriptionProps {
  description: string;
  budget: number;
  timeOfCompletion: string;
  preferredTimeZones: string[];
  flResources: any[];
}

const Description: FC<DescriptionProps> = (props: DescriptionProps) => {
  const {
    description,
    budget,
    timeOfCompletion,
    preferredTimeZones,
    flResources,
  } = props;
  const timeZones = preferredTimeZones;
  const dateToday = new Date();
  const date2 = new Date(timeOfCompletion);
  const days = Math.floor(
    (date2.getTime() - dateToday.getTime()) / (1000 * 60 * 60 * 24)
  );
  const flResourcesStringJoined = flResources
    ?.map((resource) => resource.title)
    .join(', ');
  return (
    <div className={styles.container}>
      <h4>Company Description</h4>
      <div className={styles.wrap}>
        <section className={styles.projectDescription}>
          <p>{description}</p>
        </section>
        <section className={styles.projectDetails}>
          <div className={styles.card}>
            <p>Budget: {budget} USDC</p>
            <p>Timeline: {days} days</p>
            <p>Preferred TimeZones: {timeZones}</p>

            <p>{flResourcesStringJoined}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Description;
