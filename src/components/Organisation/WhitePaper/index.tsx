/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/extensions */
import { FC, useState, ChangeEvent, useCallback } from 'react';
import _debounce from 'lodash/debounce';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import useUpdateWhitePaper from './hook';
import styles from './index.module.scss';

interface IWhitePaperProps {
  orgId: number;
}

const WhitePaper: FC<IWhitePaperProps> = ({ orgId }) => {
  const isEditable = useSelector((state: RootState) => state.org.isEditable);
  const organisations = useSelector((state: RootState) => state.org.orgs);

  const [organisation] = organisations.filter(
    org => orgId === org.organisationId
  );

  const whitePaper =
    organisation?.whitepaper ||
    `https://breath.example.com/brother/action.html?basketball=bridge&branch=arm`;

  return isEditable ? (
    <WhitePaperCardEdit whitePaper={whitePaper} orgId={`${orgId}`} />
  ) : (
    <WhitePaperCard whitePaper={whitePaper} />
  );
};

interface IWhitePaper {
  whitePaper: string;
}

const WhitePaperCard: FC<IWhitePaper> = ({ whitePaper }) => {
  return (
    <div className={styles.whitePaper}>
      <a href={whitePaper}>{whitePaper}</a>
    </div>
  );
};

interface IWhitePaperEdit extends IWhitePaper {
  orgId: string;
}

const WhitePaperCardEdit: FC<IWhitePaperEdit> = ({ whitePaper, orgId }) => {
  const [link, setLink] = useState(whitePaper);

  const updateWhitePaper = useUpdateWhitePaper(orgId);

  const handleDebounceFn = (w: string) => {
    if (w.trim().length === 0) return;
    updateWhitePaper(w);
  };

  const debounceFn: any = useCallback(_debounce(handleDebounceFn, 1000), []);

  const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    debounceFn(e.target.value);
  };

  return (
    <div className={styles['whitePaper--edit']}>
      <input value={link} onChange={handleLinkChange} />
    </div>
  );
};

export default WhitePaper;
