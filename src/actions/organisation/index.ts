import { IOrganisation, IOrgApiResponse } from 'interfaces/organisation';
import { CREATE_ORG, EDIT_ORG, FILL_ORGS, UPDATE_ORG } from './types';

export const createOrg = (org: Partial<IOrganisation>) => ({
  type: CREATE_ORG,
  org,
});

export const editOrg = (isEditable: boolean) => ({
  type: EDIT_ORG,
  isEditable,
});

export const fillOrgs = (orgs: IOrgApiResponse[]) => ({
  type: FILL_ORGS,
  orgs,
});

export const updateOrg = (org: Partial<IOrganisation>) => ({
  type: UPDATE_ORG,
  org,
});
