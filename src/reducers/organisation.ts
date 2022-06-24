import { IOrganisation } from 'interfaces/organisation';
import {
  CREATE_ORG,
  EDIT_ORG,
  FILL_ORGS,
  UPDATE_ORG,
} from 'actions/organisation/types';

interface State {
  orgs: Partial<IOrganisation>[];
  isEditable: boolean;
}

type Action =
  | { type: typeof FILL_ORGS; orgs: IOrganisation[] }
  | {
      type: typeof CREATE_ORG;
      org: Partial<IOrganisation>;
    }
  | { type: typeof UPDATE_ORG; org: Partial<IOrganisation> }
  | {
      type: typeof EDIT_ORG;
      isEditable: boolean;
    };

const initialState: State = {
  orgs: [],
  isEditable: false,
};

const org = (state = initialState, action: Action): State => {
  switch (action.type) {
    case FILL_ORGS: {
      const { orgs } = action;

      return {
        ...state,
        orgs,
      };
    }
    case CREATE_ORG: {
      const orgArray = [...state.orgs, action.org];
      return {
        ...state,
        orgs: orgArray,
      };
    }
    case UPDATE_ORG: {
      const restOrgs = state.orgs.filter(
        o => o.organisationId !== action.org.organisationId
      );
      return {
        ...state,
        orgs: [...restOrgs, action.org],
      };
    }
    case EDIT_ORG:
      return {
        ...state,
        isEditable: action.isEditable,
      };
    default:
      return { ...state };
  }
};

export default org;
