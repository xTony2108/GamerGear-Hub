import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emptyApiSlice = createApi({
  reducerPath: "emptyApiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: () => ({}),
});