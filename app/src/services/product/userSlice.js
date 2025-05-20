import { emptyApiSlice } from "../emptyApiSlice";

const userSlice = emptyApiSlice
  .enhanceEndpoints({ addTagTypes: ["User"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUserData: builder.query({
        query: () => `/users/me`,
        providesTags: ["User"],
        keepUnusedDataFor: 5,
      }),
    }),
  });

export const { useGetUserDataQuery } = userSlice;
