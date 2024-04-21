import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { ThemeToggle, useTheme } from '../../../../../../../theme/theme';


interface EditProps {
    name: string;
    workCategoryID: string;
    isOpen: boolean;
    onClose: () => void;
    refreshFetchdata: () => void;
}

const api = 'http://localhost:3001';

function EditWorkCategoryCard({ name, workCategoryID, isOpen, onClose, refreshFetchdata }: EditProps) {
    const [workCategoryName, setWorkCategoryName] = useState<string>(name);
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();
    
    useEffect(() => {
        setWorkCategoryName(name);
    }, [name]);

    const handleEditWorkCategory = async (workCategoryID: string, workCategoryName: string) => {
        try {
            setLoading(true);
            const response = await fetch(`${api}/editWorkCategory`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ workCategoryID, workCategoryName }),
            });

            if (response.ok) {
                console.log(workCategoryID ? "Work category edited successfully" : "Work categories edited successfully");
                onClose();
                alert(`Updated data: ${workCategoryName}`);
                refreshFetchdata();
            } else {
                console.error(workCategoryID ? "Failed to edit work category" : "Failed to edit work categories");
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
                <div className="bg-base-200 p-6 rounded shadow-lg w-full max-w-md" data-theme={theme}>
                    <h2 className="text-2xl font-bold mb-4 text-center">Edit Work Category</h2>
                    <div className='space-y-4 px-4'>
                        <label className="form-control w-full max-w-md">
                            <div className="label">
                                <span className="label-text">Work Category's name</span>
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-md font-notoLao" value={workCategoryName} onChange={(e) => setWorkCategoryName(e.target.value)} />
                        </label>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button className="btn btn-primary mr-2" onClick={() => handleEditWorkCategory(workCategoryID, workCategoryName)} disabled={loading}>
                            {loading ? 'Editing...' : 'Accept'}
                        </button>
                        <button className="btn btn-ghost" onClick={onClose} disabled={loading}>Deny</button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default EditWorkCategoryCard;
