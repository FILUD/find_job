import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { ThemeToggle, useTheme } from '../../../../../../../theme/theme';


interface DeleteProps {
    name: string;
    occupationID: string;
    selectOccupationID: string;
    isOpen: boolean;
    onClose: () => void;
    refreshFetchdata: () => void;
}

const api = 'http://localhost:3001';

const DeleteOccupationCard: React.FC<DeleteProps> = ({ name, occupationID, selectOccupationID, isOpen, onClose, refreshFetchdata }) => {
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();

    const handleDeleteOccupation = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${api}/deleteOccupation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ occupationIDs: occupationID || selectOccupationID }),
            });

            if (response.ok) {
                console.log(occupationID ? "Occupation deleted successfully" : "Occupations deleted successfully");
                onClose();
                alert(`the occupation${occupationID ? '' : 's'}:${occupationID || selectOccupationID} deleted `);
                refreshFetchdata();
            } else {
                console.error(occupationID ? "Failed to delete Occupation" : "Failed to delete Occupations");
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
                <div className="bg-base-200 p-6 rounded shadow-lg" data-theme={theme}>
                    <h2 className="text-2xl font-bold mb-4">Delete Occupation</h2>
                    <p>This will permanently deactivate occupation: <span className="text-red-500 font-bold">{name}</span> ( <span className="text-red-500 font-bold">OccupationID: {occupationID || selectOccupationID}</span>).</p>
                    <p>Are you sure you want to delete ?</p>

                    <div className="mt-6 flex justify-end">
                        <button className="btn btn-primary mr-2" onClick={handleDeleteOccupation} disabled={loading}>
                            {loading ? 'Deleting...' : 'Accept'}
                        </button>
                        <button className="btn btn-ghost" onClick={onClose}>Deny</button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default DeleteOccupationCard;
