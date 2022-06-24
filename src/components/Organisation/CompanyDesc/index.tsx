import { FC, useState, ChangeEvent, useCallback } from 'react';
import Card from 'components/Card';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import useUpdateCompanyDesc from './hook';
import styles from './index.module.scss';

interface ICompanyDescProps {
  orgId: number;
}

const CompanyDesc: FC<ICompanyDescProps> = ({ orgId }) => {
  const isEditable = useSelector((state: RootState) => state.org.isEditable);
  const organisations = useSelector((state: RootState) => state.org.orgs);

  const [organisation] = organisations.filter(
    org => orgId === org.organisationId
  );

  const description =
    organisation?.description ||
    `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, s
		imilique atque eius adipisci reprehenderit veritatis eum sunt reiciendis 
		harum optio odit facilis quis est quasi accusantium dolorum, dicta mollitia 
		quidem suscipit quas. Fugit repellat, impedit eius praesentium sequi delectus
		placeat! Doloremque vel qui pariatur voluptatem dignissimos in quibusdam ducimus 
		Explicabo temporibus aut soluta cum delectus commodi perferendis reprehenderit recusandae 
		voluptatum? Itaque porro, molestias ratione expedita sapiente nisi magnam cumque eveniet beatae a
		minima possimus tenetur impedit, sed libero? Aut aspernatur quo cupiditate eaque laboriosam
		quidem exercitationem velit fugiat itaque.`;

  return isEditable ? (
    <CompanyDescCardEdit description={description} orgId={`${orgId}`} />
  ) : (
    <CompanyDescCard description={description} />
  );
};

interface IDescription {
  description: string;
}

const CompanyDescCard: FC<IDescription> = ({ description }) => {
  return (
    <Card className={styles.description}>
      <p>{description}</p>
    </Card>
  );
};

interface IDescriptionEdit extends IDescription {
  orgId: string;
}

const CompanyDescCardEdit: FC<IDescriptionEdit> = ({ description, orgId }) => {
  const [desc, setDesc] = useState(description);

  const updateCompanyDescription = useUpdateCompanyDesc(orgId);

  const handleDebounceFn = (d: string) => {
    updateCompanyDescription(d);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setDesc(e.target.value);

  return (
    <Card className={styles['description--edit']}>
      <textarea value={desc} onChange={handleDescriptionChange} />
    </Card>
  );
};

export default CompanyDesc;
