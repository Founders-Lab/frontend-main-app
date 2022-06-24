import { fillOrgs } from 'actions/organisation';
import config from 'config';
import { IOrgApiResponse } from 'interfaces/organisation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { getAccessToken } from 'utils/authFn';
import { handleApiErrors } from 'utils/handleApiErrors';

const useGetOrganisationData = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.user?.userId);
  const accessToken = getAccessToken();

  useEffect(() => {
    const fetchOrgData = async () => {
      if (userId && accessToken) {
        const ac = new AbortController();
        const { signal } = ac;

        try {
          const response = await fetch(
            `${config.ApiBaseUrl}/organisation/user/${userId}`,
            {
              signal,
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const json: IOrgApiResponse[] = await handleApiErrors(response);
          console.trace(json);
          dispatch(fillOrgs(json));
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchOrgData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
};

export default useGetOrganisationData;
