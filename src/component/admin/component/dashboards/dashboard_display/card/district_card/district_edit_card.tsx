import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { ThemeToggle, useTheme } from '../../../../../../../theme/theme';


interface EditProps {
    name: string;
    districtID: string;
    isOpen: boolean;
    onClose: () => void;
    refreshFetchdata: () => void;
    getProvinceID: string;
}

const api = 'http://localhost:3001';


function EditDistrictCard({ name, districtID, isOpen, onClose, refreshFetchdata, getProvinceID }: EditProps) {
    const [districtName, setDistrictName] = useState<string>(name);
    const [provinceID, setProvinceID] = useState<string>("");
    const [provinces, setProvinces] = useState<{ ProvinceID: number; ProvinceName: string }[]>([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();

    interface ProvinceProps {
        ProvinceID: number,
        ProvinceName: string,
    }


    useEffect(() => {
        setDistrictName(name);
        if (getProvinceID) {
            console.log(getProvinceID)
            handleProvinceChange({ target: { value: getProvinceID } } as React.ChangeEvent<HTMLSelectElement>);
        }
    }, [name, getProvinceID]);


    //handle
    const handleEditDistrict = async (districtID: string, districtName: string, provinceID: string) => {
        try {
            const response = await fetch(`${api}/editDistrict`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ districtID: districtID, districtName: districtName, provinceID: provinceID }),
            });

            if (response.ok) {
                console.log(districtID ? "District Edited successfully" : "Districts Edited successfully");
                onClose();
                alert(`Update the data : ${districtName} and ${provinceID} `);
                refreshFetchdata();
            } else {
                console.error(districtID ? "Failed to Edite District" : "Failed to Edite Districts");
            }
        } catch (error) {
            console.error("Error occurred:", error);
        }
    };

    const handleProvinceChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProvince(event.target.value);
        setProvinceID(event.target.value);
    }

    // fetch part
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
        <Dialog open={isOpen} onClose={onClose}>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-90" />

            <div className="flex  items-center justify-center fixed inset-0 z-10">
                <div className="bg-base-200 p-6 rounded shadow-lg w-full max-w-md " data-theme={theme}>
                    <h2 className="text-2xl font-bold mb-4 text-center">Edit District </h2>
                    <div className='space-y-4 px-4'>
                        <label className="form-control w-full max-w-md">
                            <div className="label">
                                <span className="label-text">District's name</span>
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
                        <button className="btn btn-primary mr-2" onClick={() => handleEditDistrict(districtID, districtName, provinceID)} disabled={loading}>
                            {loading ? 'Editing...' : 'Accept'}
                        </button>
                        <button className="btn btn-ghost" onClick={onClose} disabled={loading}>Deny</button>
                    </div>
                </div>
            </div>
        </Dialog >
    );
}

export default EditDistrictCard;


