import { useState } from 'react';
import { Dialog } from '@headlessui/react';

interface DeleteProps {
    name: string;
    userID: number;
    role: string;
    isOpen: boolean; 
    onClose: () => void; 
}

const api = 'http://localhost:3001';

const handleDeleteClient = async (userID: number, role: string) => {
    try {
        const response = await fetch(`${api}/deleteClient`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userID: userID, role: role }),
        });

        if (response.ok) {
            console.log("Client deleted successfully");
            alert(`the user account:${userID} deleted `)
        } else {
            console.error("Failed to delete client");
            // You can update UI or show an error message here
        }
    } catch (error) {
        console.error("Error occurred:", error);
        // You can update UI or show an error message here
    }
};


function DeleteAccountCard({ name, userID, role, isOpen, onClose }: DeleteProps) {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-90" />

            <div className="flex  items-center justify-center fixed inset-0 z-10">
                <div className="bg-base-200 p-6 rounded shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Delete user account</h2>
                    <p>This will permanently deactivate <span className="text-red-500 font-bold">{name}</span>'s account ( <span className="text-red-500 font-bold">ID: {userID}</span>).</p>                    <p>Are you sure you want to delete this user?</p>

                    <div className="mt-6 flex justify-end">
                        <button className="btn btn-primary mr-2" onClick={() => handleDeleteClient(userID, role)}>Accept</button>
                        <button className="btn btn-ghost" onClick={onClose}>Deny</button>
                    </div>
                </div>
            </div>
        </Dialog >
    );
}

export default DeleteAccountCard;
