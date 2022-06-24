import { Dispatch, SetStateAction } from 'react';
import { updateOrg } from 'actions/organisation';
import config from 'config';
import { IOrgApiResponse } from 'interfaces/organisation';
import { useDispatch } from 'react-redux';
import { getAccessToken } from 'utils/authFn';
import { handleApiErrors } from 'utils/handleApiErrors';
import { handleUnAuthorization } from 'utils/handleUnAuthorization';

interface FunctionParameters {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface IUpdateOrgSocial {
  linkedin: string;
  twitter: string;
  instagram: string;
}

const useUpdateOrgSocial = (orgId: number) => {
  const dispatch = useDispatch();

  const updateOrgSocial = ({
    linkedin,
    twitter,
    instagram,
    setOpen,
  }: IUpdateOrgSocial & FunctionParameters) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      const ac = new AbortController();
      const { signal } = ac;

      (async () => {
        try {
          const payload = {
            twitter,
            instagram,
            linkedin,
          };

          const response = await fetch(
            `${config.ApiBaseUrl}/organisation/${orgId}`,
            {
              signal,
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify(payload),
            }
          );
          const json: IOrgApiResponse = await handleApiErrors(response);
          dispatch(updateOrg(json));
        } catch (err) {
          console.log(err);
          handleUnAuthorization(err);
        } finally {
          setOpen(false);
        }
      })();
    }
  };

  return updateOrgSocial;
};

export default useUpdateOrgSocial;
