import { useState } from 'react';
import { Dialog } from '@headlessui/react';

interface DeleteProps {
    name: string;
    userID: number;
    isOpen: boolean; // Add isOpen prop
    onClose: () => void; // Add onClose prop
}

function DeleteCard({ name, userID, isOpen, onClose }: DeleteProps) {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-90" />

            <div className="flex  items-center justify-center fixed inset-0 z-10">
                <div className="bg-base-200 p-6 rounded shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Delete user account</h2>
                    <p>This will permanently deactivate <span className="text-red-500 font-bold">{name}</span>'s account ( <span className="text-red-500 font-bold">ID: {userID}</span>).</p>                    <p>Are you sure you want to delete this user?</p>

                    <div className="mt-6 flex justify-end">
                        <button className="btn btn-primary mr-2" onClick={onClose}>Accept</button>
                        <button className="btn btn-ghost" onClick={onClose}>Deny</button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default DeleteCard;
