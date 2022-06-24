import { IOrganisation, IOrgApiResponse } from 'interfaces/organisation';
import { CREATE_ORG, EDIT_ORG, FILL_ORG } from './types';

export const createOrg = (org: Partial<IOrganisation>) => ({
  type: CREATE_ORG,
  org,
});

export const editOrg = (isEditable: boolean) => ({
  type: EDIT_ORG,
  isEditable,
});

export const fillOrg = (orgs: IOrgApiResponse[]) => ({
  type: FILL_ORG,
  orgs,
});
