import React, { useContext } from 'react';
import { AuthContext } from '../../Authentication/AuthContext';
import UseAxiosSecureAPI from '../../CustomHooks/UseAxiosSecureAPI';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const MyParcels = () => {
    const {user} = useContext(AuthContext);

    const axiosApi = UseAxiosSecureAPI();

    // using tanStack Query for better API handling
    const {data : parcel = [], refetch} = useQuery({
        queryKey: ['myParcels' , user?.email],
        queryFn: async () => {
            const res = await axiosApi.get(`/parcels/email?email=${user?.email}`);
            return res.data;
        }
    })

    console.log(parcel);

    const handleView = () => {

    }

    const handleDelete  = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This parcel will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#e11d48", // red-600
            cancelButtonColor: "#6b7280",  // gray-500
        });

        if(confirm.isConfirmed){
            try{
                axiosApi.delete(`parcels/${id}`)
                .then(res => {
                    if(res.data.deletedCount){
                        Swal.fire({
                                title: "Deleted!",
                                text: "Parcel has been deleted.",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false,
                        })
                    }
                    refetch(); // updating UI immediately after deletion
                })
            
            }
            catch (err) {
                Swal.fire("Error", err.message || "Failed to delete parcel", "error");
            }
        }

    }

     const formatDate = (date) => {
        return new Date(date).toLocaleString(); // Format: "6/22/2025, 3:11:31 AM"
    };

    return (
        <div className="m-25 overflow-x-auto shadow-md rounded-xl">
            <table className="table table-zebra w-full">
                <thead className="bg-base-200 text-2xl font-semibold">
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Created At</th>
                        <th>Cost</th>
                        <th>Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parcel.map((parcel, index) => (
                        <tr key={parcel._id}>
                            <td className='text-2xl'>{index + 1}</td>
                            <td className="max-w-[380px] text-2xl truncate">{parcel.title}</td>
                            <td className="capitalize text-2xl">{parcel.type}</td>
                            <td className='text-2xl'>{formatDate(parcel.creation_date)}</td>
                            <td className='text-2xl'>৳{parcel.totalCost}</td>
                            <td className='text-2xl'>
                                <span
                                    className={`cursor-pointer badge text-3xl font-bold p-4 uppercase ${parcel.payment_status === "paid"
                                        ? "badge-success"
                                        : "badge-error"
                                        }`}
                                >
                                    {parcel.payment_status}
                                </span>
                            </td>
                            <td className="space-x-2 flex items-center justify-center mt-3">
                                <button
                                    onClick={() => handleView(parcel._id)}
                                    className="cursor-pointer text-2xl p-4 btn btn-xs btn-outline"
                                >
                                    View
                                </button>
                                {/* {parcel.payment_status === "unpaid" && (
                                    // <button
                                    //     onClick={() => handlePay(parcel._id)}
                                    //     className="cursor-pointer btn btn-xs btn-primary text-black"
                                    // >
                                    //     Pay
                                    // </button>
                                )} */}
                                <button
                                    onClick={() => handleDelete(parcel._id)}
                                    className="cursor-pointer text-2xl p-4 btn btn-xs btn-error"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {parcel.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center text-4xl font-bold text-gray-500 py-6">
                                No parcels found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyParcels;