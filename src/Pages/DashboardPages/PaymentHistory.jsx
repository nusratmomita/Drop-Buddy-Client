import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecureAPI from '../../CustomHooks/UseAxiosSecureAPI';
import { AuthContext } from '../../Authentication/AuthContext';

const formatDate = (iso) => new Date(iso).toLocaleString();

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosApi = UseAxiosSecureAPI();

    console.log(user,user?.email)

    const { isPending, data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosApi.get(`/payments?email=${user.email}`);
            console.log(res.data)
            return res.data;
        }
    })

    if (isPending) {
        return <div className="flex justify-center items-center h-screen">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-500"></div>
                </div>
    }

    return (
        <div className="m-25 overflow-x-auto shadow-md rounded-xl">
            <table className="table table-zebra w-full">
                <thead className="bg-base-200 text-2xl font-semibold">
                    <tr>
                        <th>#</th>
                        <th>Parcel ID</th>
                        <th>Amount</th>
                        <th>Transaction</th>
                        <th>Paid At</th>
                    </tr>
                </thead>
                <tbody>
                    {payments?.length > 0 ? (
                        payments.map((p, index) => (
                            <tr key={p.transactionId}>
                                <td className='text-xl'>{index + 1}</td>
                                <td className="truncate text-xl" title={p.parcelId}>
                                    {p.parcelId}...
                                </td>
                                <td className='text-xl'>৳{p.amount}</td>
                                <td className="font-mono text-xl">
                                    <span title={p.transactionId}>
                                        {p.transactionId}...
                                    </span>
                                </td>
                                <td className='text-xl'>{formatDate(p.paid_at_string)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center text-gray-500 py-6">
                                No payment history found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;