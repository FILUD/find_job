import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { ThemeToggle, useTheme } from '../../../../../../../theme/theme';

interface InsertOccupationProps {
    isOpen: boolean;
    onClose: () => void;
    refreshFetchdata: () => void;
}

const api = 'http://localhost:3001';

function InsertOccupationCard({ isOpen, onClose, refreshFetchdata }: InsertOccupationProps) {
    const [occupationName, setOccupationName] = useState<string>("");
    const [workCategories, setWorkCategories] = useState<{ CategoryID: number; CategoryName: string }[]>([]);
    const [selectedWorkCategory, setSelectedWorkCategory] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        setOccupationName("");
    }, []);

    const close = async () => {
        setOccupationName("");
        onClose();
    }

    const handleInsertOccupation = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${api}/insertOccupation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ occupationName, workCategoryID: selectedWorkCategory }),
            });

            if (response.ok) {
                console.log("Occupation Inserted successfully");
                onClose();
                alert(`Inserted the data : ${occupationName}`);
                refreshFetchdata();
            } else {
                console.error("Failed to Insert Occupation");
            }
        } catch (error) {
            console.error("Error occurred:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleWorkCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = parseInt(event.target.value);
        setSelectedWorkCategory(selectedCategory);
    }

    const fetchWorkCategories = async () => {
        try {
            const response = await axios.get<{ data: { CategoryID: number; CategoryName: string }[] }>(`${api}/showWorkCategory`);
            setWorkCategories(response.data.data || []);
        } catch (error) {
            console.error("Error fetching work categories:", error);
        }
    };

    useEffect(() => {
        fetchWorkCategories();
    }, []);

    return (
        <Dialog open={isOpen} onClose={close}>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-90" />

            <div className="flex items-center justify-center fixed inset-0 z-10">
                <div className="bg-base-200 p-6 rounded shadow-lg w-full max-w-md " data-theme={theme}>
                    <h2 className="text-2xl font-bold mb-4 text-center">Insert Occupation</h2>
                    <div className='space-y-4 px-4'>
                        <label className="form-control w-full max-w-md">
                            <div className="label">
                                <span className="label-text">Occupation's name</span>
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-md font-notoLao" value={occupationName} onChange={(e) => setOccupationName(e.target.value)} />
                        </label>
                        <label className="form-control w-full max-w-md">
                            <div className="label">
                                <span className="label-text">Select Work Category</span>
                            </div>
                            <select
                                className="select select-bordered font-notoLao"
                                value={selectedWorkCategory || ''}
                                onChange={handleWorkCategoryChange}
                            >
                                <option disabled value="">Pick one</option>
                                {workCategories.map(category => (
                                    <option key={category.CategoryID} value={category.CategoryID}>
                                        {category.CategoryName}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button className="btn btn-primary mr-2" onClick={handleInsertOccupation} disabled={loading}>
                            {loading ? 'Inserting...' : 'Accept'}
                        </button>
                        <button className="btn btn-ghost" onClick={close} disabled={loading}>Deny</button>
                    </div>
                </div>
            </div>
        </Dialog >
    );
}

export default InsertOccupationCard;
