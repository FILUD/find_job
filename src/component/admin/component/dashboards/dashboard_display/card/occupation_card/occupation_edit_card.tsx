import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';

interface EditProps {
    name: string;
    occupationID: string;
    isOpen: boolean;
    onClose: () => void;
    refreshFetchdata: () => void;
}

const api = 'http://localhost:3001';

function EditOccupationCard({ name, occupationID, isOpen, onClose, refreshFetchdata }: EditProps) {
    const [occupationName, setOccupationName] = useState<string>(name);
    const [workCategoryID, setWorkCategoryID] = useState<string>("");
    const [workCategories, setWorkCategories] = useState<{ CategoryID: number; CategoryName: string }[]>([]);
    const [selectedWorkCategory, setSelectedWorkCategory] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    interface WorkCategoryProps {
        CategoryID: number,
        CategoryName: string,
    }

    useEffect(() => {
        setSelectedWorkCategory(null);
        setOccupationName(name);
    }, [name]);

    //handle
    const handleEditOccupation = async (occupationID: string, occupationName: string, workCategoryID: string) => {
        try {
            const response = await fetch(`${api}/editOccupation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ occupationID: occupationID, occupationName: occupationName, workCategoryID: workCategoryID }),
            });

            if (response.ok) {
                console.log(occupationID ? "Occupation Edited successfully" : "Occupations Edited successfully");
                onClose();
                alert(`Update the data : ${occupationName} and ${workCategoryID} `);
                refreshFetchdata();
            } else {
                console.error(occupationID ? "Failed to Edit Occupation" : "Failed to Edit Occupations");
            }
        } catch (error) {
            console.error("Error occurred:", error);
        }
    };

    const handleWorkCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedWorkCategoryId = parseInt(event.target.value);
        const stringWorkCategoryID = (event.target.value);
        setSelectedWorkCategory(selectedWorkCategoryId);
        setWorkCategoryID(stringWorkCategoryID);
    }

    // fetch part
    const fetchData = async () => {
        try {
            const response = await axios.get<{ data: WorkCategoryProps[] }>(`${api}/showWorkCategory`);
            setWorkCategories(response.data.data || []);
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
            <div className="flex items-center justify-center fixed inset-0 z-10">
                <div className="bg-base-200 p-6 rounded shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-center">Edit Occupation </h2>
                    <div className='space-y-4 px-4'>
                        <label className="form-control w-full max-w-md">
                            <div className="label">
                                <span className="label-text">Occupation's name</span>
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-md font-notoLao" value={occupationName} onChange={(e) => setOccupationName(e.target.value)} />
                        </label>
                        <label className="form-control w-full max-w-md">
                            <div className="label">
                                <span className="label-text">Pick the work category</span>
                            </div>
                            <select
                                className="select select-bordered font-notoLao"
                                value={selectedWorkCategory || ''}
                                onChange={handleWorkCategoryChange}
                            >
                                <option disabled value="">Pick one</option>
                                {workCategories.map(workCategory => (
                                    <option key={workCategory.CategoryID} value={workCategory.CategoryID}>
                                        {workCategory.CategoryName}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button className="btn btn-primary mr-2" onClick={() => handleEditOccupation(occupationID, occupationName, workCategoryID)} disabled={loading}>
                            {loading ? 'Editing...' : 'Accept'}
                        </button>
                        <button className="btn btn-ghost" onClick={onClose} disabled={loading}>Deny</button>
                    </div>
                </div>
            </div>
        </Dialog >
    );
}

export default EditOccupationCard;
