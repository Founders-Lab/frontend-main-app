import { FC } from 'react';
import NavBar from 'components/NavBar';
import Tasks from '../Tasks';
import styles from './index.module.scss';
import Banner from '../Banner';
import Projects from '../Projects';
import useGetOrganisationData from './hook';

const Landing: FC = () => {
  useGetOrganisationData();

  return (
    <div className={styles.background}>
      <NavBar />
      <Banner />
      <section className={styles.content}>
        <Projects />
        <Tasks />
      </section>
    </div>
  );
};

export default Landing;
