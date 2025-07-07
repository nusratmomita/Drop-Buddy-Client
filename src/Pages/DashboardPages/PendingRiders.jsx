import React, { useState } from 'react';
import { AuthContext } from '../../Authentication/AuthContext';
import UseAxiosSecureAPI from '../../CustomHooks/UseAxiosSecureAPI';
import { useQuery } from '@tanstack/react-query';
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import Swal from 'sweetalert2';

const PendingRiders = () => {
    const [selectedRiders , setSelectedRiders] =useState(null);

    const axiosApi = UseAxiosSecureAPI();

    const { isPending ,  data: riders=[] , refetch} = useQuery({
        queryKey: ['pending-riders'],
        queryFn: async () => {
            const res = await axiosApi.get("/rider/pending");
            return res.data;
        }
    });

    if (isPending) {
        return <div className="flex justify-center items-center h-screen">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-500"></div>
                </div>
    }


    const handleDecision = async(id , action , email) => {
        const confirm = await Swal.fire({
            title: `${action === 'approve' ? "Approve" : "Rejects"} Application`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        });

        if(!confirm.isConfirmed){
            return;
        }

        // sending email to accept as a rider
        const status = action === "approve" ? "active" : "rejected";
        await axiosApi.patch(`/rider/${id}/status`, { status  , email});

        refetch(),

        Swal.fire("Success" , `Rider ${action}d successfully` , "success");
    }

    return (
        <div className="mt-25 p-6">
            <h2 className="text-2xl font-semibold mb-4">Pending Rider Applications</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-xl">
                    <thead>
                        <tr className='text-xl'>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Region</th>
                            <th>District</th>
                            <th>Phone</th>
                            <th>Applied</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders.map((rider) => (
                            <tr key={rider._id}>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.region}</td>
                                <td>{rider.district}</td>
                                <td>{rider.phone}</td>
                                <td>{new Date(rider.created_at).toLocaleDateString()}</td>
                                <td className="flex gap-2">
                                    <button
                                        onClick={() => setSelectedRiders(rider)}
                                        className="btn btn-sm btn-info"
                                    >
                                        <FaEye />
                                    </button>
                                    <button
                                        onClick={() => handleDecision(rider._id, "approve" , rider.email)}
                                        className="btn btn-sm btn-success"
                                    >
                                        <FaCheck />
                                    </button>
                                    <button
                                        onClick={() => handleDecision(rider._id, "reject" , rider.email)}
                                        className="btn btn-sm btn-error"
                                    >
                                        <FaTimes />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for viewing rider details */}
            {selectedRiders && (
                <dialog id="riderDetailsModal" className="modal modal-open">
                    <div className="modal-box max-w-2xl">
                        <h3 className="font-bold text-xl mb-2">Rider Details</h3>
                        <div className="space-y-2">
                            <p><strong>Name:</strong> {selectedRiders.name}</p>
                            <p><strong>Email:</strong> {selectedRiders.email}</p>
                            <p><strong>Phone:</strong> {selectedRiders.phone}</p>
                            <p><strong>Age:</strong> {selectedRiders.age}</p>
                            <p><strong>NID:</strong> {selectedRiders.nid}</p>
                            <p><strong>Bike Brand:</strong> {selectedRiders.bike_brand}</p>
                            <p><strong>Bike Registration:</strong> {selectedRiders.bike_registration}</p>
                            <p><strong>Region:</strong> {selectedRiders.region}</p>
                            <p><strong>District:</strong> {selectedRiders.district}</p>
                            <p><strong>Applied At:</strong> {new Date(selectedRiders.created_at).toLocaleString()}</p>
                            {selectedRiders.note && <p><strong>Note:</strong> {selectedRiders.note}</p>}
                        </div>

                        <div className="modal-action mt-4">
                            <button
                                className="btn btn-outline"
                                onClick={() => setSelectedRiders(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default PendingRiders;