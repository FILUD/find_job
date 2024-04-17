import { useState } from 'react';
import { Dialog } from '@headlessui/react';

interface DeleteProps {
    name: string;
    districtID: string;
    selectDistrictID: string;
    isOpen: boolean;
    onClose: () => void;
    refreshFetchdata: () => void;
}

const api = 'http://localhost:3001';



function DeleteDistrictCard({ name, districtID, selectDistrictID, isOpen, onClose, refreshFetchdata }: DeleteProps) {

    const [loading, setLoading] = useState(false);


    const handleDeleteDistrict = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${api}/deleteDistrict`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ districtIDs: districtID || selectDistrictID }),
            });

            if (response.ok) {
                console.log(districtID ? "District deleted successfully" : "Districts deleted successfully");
                onClose();
                alert(`the address${districtID ? '' : 'es'}:${districtID || selectDistrictID} deleted `);
                refreshFetchdata();
            } else {
                console.error(districtID ? "Failed to delete District" : "Failed to delete Districts");
            }
        } catch (error) {
            console.error("Error Delete occurred:", error);
            // You can update UI or show an error message here
        } finally {
            setLoading(false);
        }
    };


    return (
        <Dialog open={isOpen} onClose={onClose}>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-90" />

            <div className="flex  items-center justify-center fixed inset-0 z-10">
                <div className="bg-base-200 p-6 rounded shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Delete District </h2>
                    <p>This will permanently deactivate district: <span className="text-red-500 font-bold">{name}</span> ( <span className="text-red-500 font-bold">DistrictID: {districtID || selectDistrictID}</span>).</p>
                    <p>Are you sure you want to delete ?</p>

                    <div className="mt-6 flex justify-end">
                        <button className="btn btn-primary mr-2" onClick={handleDeleteDistrict} disabled={loading}>
                            {loading ? 'Deleting...' : 'Accept'}
                        </button>
                        <button className="btn btn-ghost" onClick={onClose}>Deny</button>
                    </div>
                </div>
            </div>
        </Dialog >
    );
}

export default DeleteDistrictCard;


