import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { ThemeToggle, useTheme } from '../../../../../../../theme/theme';

interface DeleteProps {
    name: string;
    provinceID: string;
    selectProvinceID: string;
    isOpen: boolean;
    onClose: () => void;
    refreshFetchdata: () => void;
}

const api = 'http://localhost:3001';

function DeleteProvinceCard({ name, provinceID, selectProvinceID, isOpen, onClose, refreshFetchdata }: DeleteProps) {
    const { theme } = useTheme();
    const [loading, setLoading] = useState(false);

    const handleDeleteProvince = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${api}/deleteProvince`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ provinceIDs: provinceID || selectProvinceID }),
            });

            if (response.ok) {
                console.log(provinceID ? "Province deleted successfully" : "Provinces deleted successfully");
                onClose();
                alert(`the address${provinceID ? '' : 'es'}:${provinceID || selectProvinceID} deleted `);
                refreshFetchdata();
            } else {
                console.error(provinceID ? "Failed to delete Province" : "Failed to delete Provinces");
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
                <div className="bg-base-200 p-6 rounded shadow-lg"  data-theme={theme}>
                    <h2 className="text-2xl font-bold mb-4">Delete Province</h2>
                    <p>This will permanently deactivate province: <span className="text-red-500 font-bold">{name}</span> ( <span className="text-red-500 font-bold">ProvinceID: {provinceID || selectProvinceID}</span>).</p>
                    <p>Are you sure you want to delete?</p>
                    <div className="mt-6 flex justify-end">
                        <button className="btn btn-primary mr-2" onClick={handleDeleteProvince} disabled={loading}>
                            {loading ? 'Deleting...' : 'Accept'}
                        </button>
                        <button className="btn btn-ghost" onClick={onClose}>Deny</button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default DeleteProvinceCard;
