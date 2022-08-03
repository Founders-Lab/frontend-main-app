import { useQuery } from '@tanstack/react-query';
import config from 'config';
import { getAccessToken } from 'utils/authFn';
import { handleApiErrors } from 'utils/handleApiErrors';
import { handleError } from 'utils/handleUnAuthorization';

const useFetchUserTasks = (profileId: any) => {
  const accessToken = getAccessToken();
  const { data } = useQuery(
    ['userTasks'],
    async ({ signal }) => {
      const response = await fetch(
        `${config.ApiBaseUrl}/task/user/${profileId}`,
        {
          signal,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const json = await handleApiErrors(response);
      return json;
    },
    {
      refetchOnWindowFocus: false,
      onError: (error: any) => {
        handleError({
          error,
          explicitMessage: 'Unable to fetch user tasks',
        });
      },
    }
  );

  return { data };
};

export default useFetchUserTasks;
