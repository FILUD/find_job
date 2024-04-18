import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';

interface EditProps {
    name: string;
    provinceID: string;
    isOpen: boolean;
    onClose: () => void;
    refreshFetchdata: () => void;
}

const api = 'http://localhost:3001';

function EditProvinceCard({ name, provinceID, isOpen, onClose, refreshFetchdata }: EditProps) {
    const [provinceName, setProvinceName] = useState<string>(name);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setProvinceName(name);
    }, [name]);

    const handleEditProvince = async (provinceID: string, provinceName: string) => {
        try {
            setLoading(true);
            const response = await fetch(`${api}/editProvince`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ provinceID, provinceName }),
            });

            if (response.ok) {
                console.log(provinceID ? "Province edited successfully" : "Provinces edited successfully");
                onClose();
                alert(`Updated data: ${provinceName}`);
                refreshFetchdata();
            } else {
                console.error(provinceID ? "Failed to edit province" : "Failed to edit provinces");
            }
        } catch (error) {
            console.error("Error occurred:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Dialog open={isOpen} onClose={onClose}>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-90" />
            <div className="flex items-center justify-center fixed inset-0 z-10">
                <div className="bg-base-200 p-6 rounded shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-center">Edit Province</h2>
                    <div className='space-y-4 px-4'>
                        <label className="form-control w-full max-w-md">
                            <div className="label">
                                <span className="label-text">Province's name</span>
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-md font-notoLao" value={provinceName} onChange={(e) => setProvinceName(e.target.value)} />
                        </label>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button className="btn btn-primary mr-2" onClick={() => handleEditProvince(provinceID, provinceName)} disabled={loading}>
                            {loading ? 'Editing...' : 'Accept'}
                        </button>
                        <button className="btn btn-ghost" onClick={onClose} disabled={loading}>Deny</button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default EditProvinceCard;
