import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { ThemeToggle, useTheme } from '../../../../../../../theme/theme';


interface InsertProps {
    isOpen: boolean;
    onClose: () => void;
    refreshFetchdata: () => void;
}

const api = 'http://localhost:3001';

function InsertWorkCategoryCard({ isOpen, onClose, refreshFetchdata }: InsertProps) {
    const [workCategoryName, setWorkCategoryName] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();
    
    useEffect(() => {
        setWorkCategoryName("");
    }, [isOpen]);

    const close = () => {
        setWorkCategoryName("");
        onClose();
    }

    const handleInsertWorkCategory = async (workCategoryName: string) => {
        try {
            setLoading(true);
            const response = await fetch(`${api}/insertWorkCategory`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ workCategoryName }),
            });

            if (response.ok) {
                console.log("Work category inserted successfully");
                onClose();
                alert(`Inserted the data: ${workCategoryName}`);
                refreshFetchdata();
            } else {
                console.error("Failed to insert work category");
            }
        } catch (error) {
            console.error("Error occurred:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onClose={close}>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-90" />

            <div className="flex items-center justify-center fixed inset-0 z-10">
                <div className="bg-base-200 p-6 rounded shadow-lg w-full max-w-md" data-theme={theme}>
                    <h2 className="text-2xl font-bold mb-4 text-center">Insert Work Category</h2>
                    <div className='space-y-4 px-4'>
                        <label className="form-control w-full max-w-md">
                            <div className="label">
                                <span className="label-text">Work Category's name</span>
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-md font-notoLao" value={workCategoryName} onChange={(e) => setWorkCategoryName(e.target.value)} />
                        </label>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button className="btn btn-primary mr-2" onClick={() => handleInsertWorkCategory(workCategoryName)} disabled={loading}>
                            {loading ? 'Inserting...' : 'Accept'}
                        </button>
                        <button className="btn btn-ghost" onClick={close} disabled={loading}>Deny</button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default InsertWorkCategoryCard;
