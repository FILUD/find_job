import { useState } from 'react';
import { Dialog } from '@headlessui/react';

interface DeleteProps {
    name: string;
    workCategoryID: string;
    selectWorkCategoryID: string;
    isOpen: boolean;
    onClose: () => void;
    refreshFetchdata: () => void;
}

const api = 'http://localhost:3001';

function DeleteWorkCategoryCard({ name, workCategoryID, selectWorkCategoryID, isOpen, onClose, refreshFetchdata }: DeleteProps) {

    const [loading, setLoading] = useState(false);

    const handleDeleteWorkCategory = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${api}/deleteWorkCategory`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ workCategoryIDs: workCategoryID || selectWorkCategoryID }),
            });

            if (response.ok) {
                console.log(workCategoryID ? "Work Category deleted successfully" : "Work Categories deleted successfully");
                onClose();
                alert(`the work category${workCategoryID ? '' : 'ies'}:${workCategoryID || selectWorkCategoryID} deleted `);
                refreshFetchdata();
            } else {
                console.error(workCategoryID ? "Failed to delete Work Category" : "Failed to delete Work Categories");
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
            <div className="flex items-center justify-center fixed inset-0 z-10">
                <div className="bg-base-200 p-6 rounded shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Delete Work Category</h2>
                    <p>This will permanently deactivate work category: <span className="text-red-500 font-bold">{name}</span> ( <span className="text-red-500 font-bold">WorkCategoryID: {workCategoryID || selectWorkCategoryID}</span>).</p>
                    <p>Are you sure you want to delete?</p>
                    <div className="mt-6 flex justify-end">
                        <button className="btn btn-primary mr-2" onClick={handleDeleteWorkCategory} disabled={loading}>
                            {loading ? 'Deleting...' : 'Accept'}
                        </button>
                        <button className="btn btn-ghost" onClick={onClose}>Deny</button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default DeleteWorkCategoryCard;
