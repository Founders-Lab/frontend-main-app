import { updateOrg } from 'actions/organisation';
import config from 'config';
import { IOrgApiResponse } from 'interfaces/organisation';
import { useDispatch } from 'react-redux';
import { getAccessToken } from 'utils/authFn';
import { handleApiErrors } from 'utils/handleApiErrors';
import { handleUnAuthorization } from 'utils/handleUnAuthorization';

interface IUpdateMain {
  name: string;
  website: string;
}

const useUpdateCompanyMain = (orgId: string) => {
  const dispatch = useDispatch();

  const UpdateCompanyMain = ({ name, website }: IUpdateMain) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      const ac = new AbortController();
      const { signal } = ac;

      (async () => {
        try {
          const payload = {
            name,
            website,
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
        }
      })();
    }
  };

  return UpdateCompanyMain;
};

export default useUpdateCompanyMain;
