import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';

interface InsertProps {
    isOpen: boolean;
    onClose: () => void;
    refreshFetchdata: () => void;
}

const api = 'http://localhost:3001';

function InsertProvinceCard({ isOpen, onClose, refreshFetchdata }: InsertProps) {
    const [provinceName, setProvinceName] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setProvinceName("");
    }, [isOpen]);

    const close = () => {
        setProvinceName("");
        onClose();
    }

    const handleInsertProvince = async (provinceName: string) => {
        try {
            setLoading(true);
            const response = await fetch(`${api}/insertProvince`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ provinceName }),
            });

            if (response.ok) {
                console.log("Province inserted successfully");
                onClose();
                alert(`Inserted the data: ${provinceName}`);
                refreshFetchdata();
            } else {
                console.error("Failed to insert Province");
            }
        } catch (error) {
            console.error("Error occurred:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<{ data: { ProvinceID: number; ProvinceName: string }[] }>(`${api}/showProvince`);
                const data = response.data.data || [];
                console.log("Fetched data:", data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <Dialog open={isOpen} onClose={close}>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-90" />

            <div className="flex items-center justify-center fixed inset-0 z-10">
                <div className="bg-base-200 p-6 rounded shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-center">Insert Province</h2>
                    <div className='space-y-4 px-4'>
                        <label className="form-control w-full max-w-md">
                            <div className="label">
                                <span className="label-text">Province's name</span>
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-md font-notoLao" value={provinceName} onChange={(e) => setProvinceName(e.target.value)} />
                        </label>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button className="btn btn-primary mr-2" onClick={() => handleInsertProvince(provinceName)} disabled={loading}>
                            {loading ? 'Inserting...' : 'Accept'}
                        </button>
                        <button className="btn btn-ghost" onClick={close} disabled={loading}>Deny</button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default InsertProvinceCard;
