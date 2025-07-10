import React, { useContext } from 'react';
import UseAxiosSecureAPI from '../../CustomHooks/UseAxiosSecureAPI';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../Authentication/AuthContext';
import Swal from 'sweetalert2';

const AssignRidersToParcel = () => {
    const axiosApi = UseAxiosSecureAPI();

    const queryClient = useQueryClient();

    const {user} = useContext(AuthContext);

    const {data: parcels=[], isLoading} = useQuery({
        queryKey: ["ridersParcels"],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosApi.get(`rider/parcelAssigned?email=${user?.email}`);
            console.log(res.data)
            return res.data;
        }
    });

    const {mutateAsync: updateStatus} = useMutation({
        mutationFn: async ({parcel,status})=>{
            const res = await axiosApi.patch(`/parcels/${parcel._id}/status`,{
                status
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["ridersParcels"])
        }
    });

    const handleStatusUpdate = (parcel,newStatus) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Mark parcel as ${newStatus.replace("_", " ")}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, update",
        })
        .then((result)=>{
            if(result.isConfirmed){
                updateStatus({parcel , status: newStatus})
                .then(async ()=>{
                    Swal.fire("Updated!", "Parcel status updated.", "success");
                })
                .catch(() => {
                        Swal.fire("Error!", "Failed to update status.", "error");
                });
            }
        })
    };
    console.log(parcels)
    
    return (
       <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Pending Deliveries</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : parcels.length === 0 ? (
                <p className="text-gray-500">No assigned deliveries.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr className='text-2xl'>
                                <th>Tracking ID</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Receiver</th>
                                <th>Receiver Center</th>
                                <th>Cost</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel) => (
                                <tr className='text-2xl' key={parcel._id}>
                                    <td>{parcel.tracking_id}</td>
                                    <td>{parcel.title}</td>
                                    <td>{parcel.type}</td>
                                    <td>{parcel.receiver_name}</td>
                                    <td>{parcel.receiver_center}</td>
                                    <td>৳{parcel.totalCost}</td>
                                    <td className="capitalize">{parcel.delivery_status.replace("_", " ")}</td>
                                    <td>
                                        {parcel.delivery_status === "rider_assigned" && (
                                            <button
                                                className="btn btn-xl bg-[#CAEB66] whitespace-nowrap text-2xl btn-primary text-black"
                                                onClick={() =>
                                                    handleStatusUpdate(parcel, "in_transit")
                                                }
                                            >
                                                Mark Picked Up
                                            </button>
                                        )}
                                        {parcel.delivery_status === "in_transit" && (
                                            <button
                                                className="btn btn-xl bg-[#CAEB66] whitespace-nowrap btn-success text-black"
                                                onClick={() =>
                                                    handleStatusUpdate(parcel, "delivered")
                                                }
                                            >
                                                Mark Delivered
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AssignRidersToParcel;