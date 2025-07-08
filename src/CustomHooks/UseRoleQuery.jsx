import React, { useContext } from 'react';
import { AuthContext } from '../Authentication/AuthContext';
import UseAxiosSecureAPI from './UseAxiosSecureAPI';
import { useQuery } from '@tanstack/react-query';

// using this component to get what role current the logged in user has(user/rider/admin)
const UseRoleQuery = () => {

    const {user , loading: authLoading} = useContext(AuthContext);

    const axiosApi = UseAxiosSecureAPI();

    const { data: role = 'user' , isLoading: roleLoading , refetch} = useQuery({
        queryKey: ['userRole' , user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () =>{
            const res = await axiosApi.get(`users/${user?.email}/role`);
            console.log(res.data.role,res.data)
            return res.data.role;
        }
    });
    
    return { role , roleLoading: authLoading || roleLoading, refetch};
};

export default UseRoleQuery;