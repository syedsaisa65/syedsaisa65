import { blueedApi } from './../baseQuery';
import { GET_ALL_USER_LIST_API_PATH } from 'config/ApiList';
export const UserApi = blueedApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => {
        return {
          url: GET_ALL_USER_LIST_API_PATH,
          method: 'GET'
        };
      },
      providesTags: ['UserApi']
    })
  })
});

export const { useGetUsersQuery } = UserApi;
