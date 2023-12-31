import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import BASE_URL from "./BaseUrl"
import Cookies from 'js-cookie';

const getCookie = () => {
    return Cookies.get("token");
}

export const userSlice = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL,
       prepareHeaders: (headers)=>{
        const token = getCookie();
        if(token){
            headers.set('authorization', `Bearer${token}`)
        }
       }
     }),

    endpoints: (builder) => ({
        
         getUser: builder.query({
            query: () => ({
            url: "user",
            method: "GET",
            }),
            providesTags:["Note"]
        }),


    }),
})

export const { useGetUserQuery} = userSlice;
export default userSlice.reducer;
