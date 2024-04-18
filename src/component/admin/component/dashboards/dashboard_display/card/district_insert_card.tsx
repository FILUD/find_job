import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';

interface InsertProps {
    isOpen: boolean;
    onClose: () => void;
    refreshFetchdata: () => void;
}

const api = 'http://localhost:3001';

function InsertDistrictCard({ isOpen, onClose, refreshFetchdata }: InsertProps) {
    const [districtName, setDistrictName] = useState<string>("");
    const [provinceID, setProvinceID] = useState<string>("");
    const [provinces, setProvinces] = useState<{ ProvinceID: number; ProvinceName: string }[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    interface ProvinceProps {
        ProvinceID: number,
        ProvinceName: string,
    }

    useEffect(() => {
        setSelectedProvince(null);
        setDistrictName("");
    }, []);

    const close = async () => {
        setDistrictName("");
        onClose();
    }

    const handleInsertDistrict = async (districtName: string, provinceID: string) => {
        try {
            const response = await fetch(`${api}/insertDistrict`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ districtName: districtName, provinceID: provinceID }),
            });

            if (response.ok) {
                console.log("District Inserted successfully" );
                onClose();
                alert(`Inserted the data : ${districtName} and ${provinceID} `);
                refreshFetchdata();
            } else {
                console.error("Failed to Insert District" );
            }
        } catch (error) {
            console.error("Error occurred:", error);
        }
    };

    const handleProvinceChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedProvinceId = parseInt(event.target.value);
        const stringProvinceID = (event.target.value);
        setSelectedProvince(selectedProvinceId);
        setProvinceID(stringProvinceID);
    }

    const fetchData = async () => {
        try {
            const response = await axios.get<{ data: ProvinceProps[] }>(`${api}/showProvince`);
            setProvinces(response.data.data || []);
        } catch (error) {
            console.error("Error Edit occurred:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Dialog open={isOpen} onClose={close}>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-90" />

            <div className="flex  items-center justify-center fixed inset-0 z-10">
                <div className="bg-base-200 p-6 rounded shadow-lg w-full max-w-md ">
                    <h2 className="text-2xl font-bold mb-4 text-center">Insert District </h2>
                    <div className='space-y-4 px-4'>
                        <label className="form-control w-full max-w-md">
                            <div className="label">
                                <span className="label-text ">District's name</span>
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-md font-notoLao" value={districtName} onChange={(e) => setDistrictName(e.target.value)} />
                        </label>
                        <label className="form-control w-full max-w-md">
                            <div className="label">
                                <span className="label-text">Pick the province</span>
                            </div>
                            <select
                                className="select select-bordered font-notoLao"
                                value={selectedProvince || ''}
                                onChange={handleProvinceChange}
                            >
                                <option disabled value="">Pick one</option>
                                {provinces.map(province => (
                                    <option key={province.ProvinceID} value={province.ProvinceID}>
                                        {province.ProvinceName}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button className="btn btn-primary mr-2" onClick={() => handleInsertDistrict(districtName, provinceID)} disabled={loading}>
                            {loading ? 'Inserting...' : 'Accept'}
                        </button>
                        <button className="btn btn-ghost" onClick={close} disabled={loading}>Deny</button>
                    </div>
                </div>
            </div>
        </Dialog >
    );
}

export default InsertDistrictCard;
