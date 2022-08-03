/* eslint-disable no-underscore-dangle */
import Card from 'components/Card';
import { ReactComponent as BrandImage } from 'assets/images/metadata/brand-image.svg';
import styles from './index.module.scss';
import useFetchUserOrgs from './hooks';

const OrganisationCard = () => {
  const userOrgs = useFetchUserOrgs();
  return (
    <div className={styles.container}>
      {userOrgs?.data?.length === 0 && <p>No Organisations</p>}
      {userOrgs?.data?.map((org: any) => {
        return (
          <div className={styles.wrap}>
            <Card
              showTransparentBg
              className={styles.cardsContainer}
              key={org.organisationId}
            >
              <header>
                {/* <img src={org?.bannerImage} alt="Organisation banner" /> */}
                <BrandImage width="71.14px" height="73.53px" />
                <h3 className={styles['text--primary']}>{org.name}</h3>
              </header>
              <p>{org?._count?.flProjects} Projects</p>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default OrganisationCard;
