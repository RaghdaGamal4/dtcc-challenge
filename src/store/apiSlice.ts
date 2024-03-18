import {
    BaseQueryFn,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: headers => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        }
        return headers;
    },
});

export const authBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
    const response = await baseQuery(args, api, extraOptions);
    return response;
};

export const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: authBaseQuery,
    endpoints: () => ({}),
});
