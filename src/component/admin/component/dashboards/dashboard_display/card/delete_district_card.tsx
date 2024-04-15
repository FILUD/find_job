import { useState } from 'react';
import { Dialog } from '@headlessui/react';

interface DeleteProps {
    name: string;
    districtIDs: number;
    isOpen: boolean; 
    onClose: () => void; 
}

const api = 'http://localhost:3001';

const handleDeleteDistrict = async (districtIDs: number) => {
    try {
        const response = await fetch(`${api}/deleteDistrict`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ districtIDs: districtIDs }),
        });

        if (response.ok) {
            console.log("District deleted successfully");
            alert(`the address:${districtIDs} deleted `)
        } else {
            console.error("Failed to delete District");
            // You can update UI or show an error message here
        }
    } catch (error) {
        console.error("Error occurred:", error);
        // You can update UI or show an error message here
    }
};


function DeleteDistrictCard({ name, districtIDs, isOpen, onClose }: DeleteProps) {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-90" />

            <div className="flex  items-center justify-center fixed inset-0 z-10">
                <div className="bg-base-200 p-6 rounded shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Delete District </h2>
                    <p>This will permanently deactivate district: <span className="text-red-500 font-bold">{name}</span> ( <span className="text-red-500 font-bold">DistrictID: {districtIDs}</span>).</p>                    
                    <p>Are you sure you want to delete this address?</p>

                    <div className="mt-6 flex justify-end">
                        <button className="btn btn-primary mr-2" onClick={() => handleDeleteDistrict(districtIDs)}>Accept</button>
                        <button className="btn btn-ghost" onClick={onClose}>Deny</button>
                    </div>
                </div>
            </div>
        </Dialog >
    );
}

export default DeleteDistrictCard;
