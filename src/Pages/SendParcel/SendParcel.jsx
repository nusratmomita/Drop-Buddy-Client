/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Authentication/AuthContext';
import UseAxiosSecureAPI from '../../CustomHooks/UseAxiosSecureAPI';


const SendParcel = () => {

    const serviceCenters = useLoaderData();
    // console.log(serviceCenters)

    const {user} = useContext(AuthContext);

    const {register , formState:{errors} , handleSubmit , watch} = useForm();

    const generateTrackingId = () => {
        const date = new Date();
        const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
        const rand = Math.random().toString(36).substring(2,7).toUpperCase();

        return `PCL-${datePart}-${rand}`;
    }

    const axiosApi = UseAxiosSecureAPI();

    // extracting unique regions
    const uniqueRegions = [... new Set(serviceCenters.map((center) => center.region))];
    // console.log(uniqueRegions);

    // extracting unique districts
    const uniqueDistricts = (region) =>
        serviceCenters.filter((w) => w.region === region).map((w) => w.district);
    // console.log(uniqueDistricts)

    const parcelType = watch('type');
    const senderRegion = watch('sender_region')
    const receiverRegion = watch('receiver_region')

    const handleSendParcel = (data) => {
        // console.log(data);
        const weight = parseFloat(data.weight) || 0;
        const isSameDistrict = data.sender_center === data.receiver_center;

        let baseCost = 0;
        let extraCost = 0;
        let breakdown = "";

        if(data.type === 'document') {
            baseCost = isSameDistrict ? 60 : 80;
            breakdown =  `Document delivery ${isSameDistrict ? "within" : "outside"} the district.`;
        }
        else{
            if(weight <= 3){
                baseCost = isSameDistrict ? 110 : 150;
                breakdown = `Non-document delivery upto 3KG ${isSameDistrict} ? "within" : "outside" the district. `
            }
            // more than 3 kgs
            else{
                const extraKg = weight - 3;
                const chargePerKg = extraKg * 40;
                const districtExtra = isSameDistrict ? 0 : 40;

                extraCost = chargePerKg + districtExtra;
                baseCost = isSameDistrict ? 110 :150;

                breakdown = `
                            Non-document over 3kg ${isSameDistrict ? "within" : "outside"} the district.<br/>
                            Extra charge: ৳40 x ${extraKg.toFixed(1)}kg = ৳${chargePerKg}<br/>
                            ${districtExtra ? "+ ৳40 extra for outside district delivery" : ""}
                        `; 
            }

            
        }
        const totalCost = extraCost + baseCost;
       
        Swal.fire({
        title: "Delivery Cost Breakdown",
        icon: "info",
        html: `<div class="text-left text-base space-y-2">
                <p><strong>Parcel Type:</strong> ${data.type}</p>
                <p><strong>Weight:</strong> ${weight} kg</p>
                <p><strong>Delivery Zone:</strong> ${isSameDistrict ? "Within Same District" : "Outside District"}</p>
                <hr class="my-2"/>
                <p><strong>Base Cost:</strong> ৳${baseCost}</p>
                ${extraCost > 0 ? `<p><strong>Extra Charges:</strong> ৳${extraCost}</p>` : ""}
                <div class="text-gray-500 text-sm">${breakdown}</div>
                <hr class="my-2"/>
                <p class="text-xl font-bold text-green-600">Total Cost: ৳${totalCost}</p>
            </div>
            `,
        showDenyButton: true,
        confirmButtonText: "💳 Proceed to Payment",
        denyButtonText: "✏️ Continue Editing",
        confirmButtonColor: "#5F9EA0",
        denyButtonColor: "#008000",
        customClass: {
            popup: "rounded-xl shadow-md px-6 py-6",
        },
        }).then((result) => {
            if (result.isConfirmed) { 
                const newParcel = { ...data , 
                    totalCost , 
                    user_email: user?.email,
                    payment_status: "unpaid",
                    delivery_status: "pending",
                    creation_date: new Date().toISOString(),
                    tracking_id:  generateTrackingId()
                };
                // console.log(newParcel);
                axiosApi.post("/parcels" , newParcel)
                .then(res => {
                    console.log(res.data);
                    if(res.data.insertedId){
                        Swal.fire({
                            title: "Redirecting...",
                            text: "Proceeding to payment gateway.",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    }
                })

            }
        });
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <form onSubmit={handleSubmit(handleSendParcel)} className="space-y-8">
                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Send a Parcel</h2>
                    <p className="text-gray-500">Fill in the details below</p>
                </div>

                {/* Parcel Info */}
                <div className="border p-4 rounded-xl shadow-md space-y-4">
                    <h3 className="font-semibold text-xl">Parcel Info</h3>
                    <div className="space-y-4">
                        {/* Parcel Name */}
                        <div>
                            <label className="label">Parcel Name</label>
                            <input
                                {...register("title", { required: true })}
                                className="input input-bordered w-full"
                                placeholder="Describe your parcel"
                            />
                            {errors.title && <p className="text-red-500 text-sm">Parcel name is required</p>}
                        </div>

                        {/* Type */}
                        <div>
                            <label className="label">Type</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="Document"
                                        {...register("type", { required: true })}
                                        className="radio"
                                    />
                                    Document
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="Non-document"
                                        {...register("type", { required: true })}
                                        className="radio"
                                    />
                                    Non-Document
                                </label>
                            </div>
                            {errors.type && <p className="text-red-500 text-sm">Type is required</p>}
                        </div>

                        {/* Weight */}
                        <div>
                            <label className="label">Weight (kg)</label>
                            <input
                                type="number"
                                step="0.1"
                                {...register("weight")}
                                disabled={parcelType !== "Non-document"}
                                className={`input input-bordered w-full ${parcelType === "Document" ? "bg-gray-100 cursor-not-allowed" : ""
                                    }`}
                                placeholder="Enter weight"
                            />
                        </div>
                    </div>
                </div>


                {/* Sender & Receiver Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Sender Info */}
                    <div className="border p-4 rounded-xl shadow-md space-y-4">
                        <h3 className="font-semibold text-xl">Sender Info</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <input {...register("sender_name", { required: true })} className="input input-bordered w-full" placeholder="Name" />
                            <input {...register("sender_contact", { required: true })} className="input input-bordered w-full" placeholder="Contact" />
                            <select {...register("sender_region", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Region</option>
                                {uniqueRegions.map((region) => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                            <select {...register("sender_center", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Service Center</option>
                                {uniqueDistricts(senderRegion).map((district) => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                            <input {...register("sender_address", { required: true })} className="input input-bordered w-full" placeholder="Address" />
                            <textarea {...register("pickup_instruction", { required: true })} className="textarea textarea-bordered w-full" placeholder="Pickup Instruction" />
                        </div>
                    </div>

                    {/* Receiver Info */}
                    <div className="border p-4 rounded-xl shadow-md space-y-4">
                        <h3 className="font-semibold text-xl">Receiver Info</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <input {...register("receiver_name", { required: true })} className="input input-bordered w-full" placeholder="Name" />
                            <input {...register("receiver_contact", { required: true })} className="input input-bordered w-full" placeholder="Contact" />
                            <select {...register("receiver_region", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Region</option>
                                {uniqueRegions.map((region) => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                            <select {...register("receiver_center", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Service Center</option>
                                {uniqueDistricts(receiverRegion).map((district) => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                            <input {...register("receiver_address", { required: true })} className="input input-bordered w-full" placeholder="Address" />
                            <textarea {...register("delivery_instruction", { required: true })} className="textarea textarea-bordered w-full" placeholder="Delivery Instruction" />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button className="cursor-pointer w-1/2 px-8 py-3 text-3xl font-semibold rounded-md bg-[#CAEB66] ">Send parcel</button>
                </div>
            </form>
        </div>
    );
};

export default SendParcel;