import BlurBlobs from 'components/BlurBlobs';
import NavBar from 'components/NavBar';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import useGetOrganisationData from 'components/Home/Landing/hook';
import CompanyDesc from '../CompanyDesc';
import Banner from '../Banner';
import CreatedBy from '../CreatedBy';
import styles from './index.module.scss';
import WhitePaper from '../WhitePaper';

const Landing: FC = () => {
  const { orgId } = useParams();

  useGetOrganisationData();

  return (
    <div className={styles.container}>
      <BlurBlobs />
      <NavBar />
      {orgId && (
        <>
          <Banner orgId={+orgId} />
          <div className={styles.content}>
            <section className={styles.section}>
              <div className={styles.child}>
                <p>Company Description</p>
                <div className={styles.height}>
                  <CompanyDesc orgId={+orgId} />
                </div>
              </div>
              <div className={styles.child}>
                <p>Profile Created By</p>
                <div className={styles.height}>
                  <CreatedBy />
                </div>
              </div>
            </section>
            <section className={styles.section}>
              <div className={styles.child}>
                <p className={styles.whitePaper}>White Paper</p>
                <WhitePaper orgId={+orgId} />
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default Landing;
