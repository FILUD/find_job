import axios from "axios";
import { useEffect, useState } from "react";
import DeleteAccountCard from "./card/account_delete_card";
import PacmanLoader from "react-spinners/PacmanLoader";

function DashboardPeople() {
    interface UserData {
        UserID: number,
        Name: string,
        Email: string,
        Role: string,
        Tel: string,
    }
    const [userData, setUserData] = useState<UserData[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [userID, setUserID] = useState<number | undefined>(undefined);
    const [userName, setUserName] = useState<string>("")
    const [userRole, setUserRole] = useState<string>("")
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // Add state for delete dialog

    const api = 'http://localhost:3001';
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<{ data: UserData[] }>(`${api}/ShowClient`);
                setUserData(response.data.data || []);
            } catch (error) {
                setError("An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const toggleDeleteDialog = (userID: number, name: string, role: string) => {
        setUserID(userID);
        setUserName(name);
        setUserRole(role);
        setIsDeleteDialogOpen(true); // Open delete dialog when clicked
    }

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    }

    return (
        <div className="">
            {isLoading ? (
                <div className="flex justify-center items-center max-h-screen h-screen bg-white">
                    <PacmanLoader color="#36d7b7" />
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div >
                    <div className="overflow-x-auto ">
                        <div>
                            <div> </div>
                            <div className="space-x-5 flex justify-end m-2">
                                <button className="btn btn-primary">Edit</button>
                                <button className="btn btn-error">Delete all selected</button>
                            </div>
                        </div>

                        <table className="table ">
                            {/* head */}
                            <thead className="bg-slate-800 text-gray-400 outline outline-1 outline-white">
                                <tr className="text-sm font-sans">
                                    <th className="outline outline-1 outline-base-100 ">
                                        {/* <label className="flex justify-center">
                                        <input type="checkbox" className="checkbox checkbox-info " />
                                    </label> */}
                                    </th>
                                    <th className="outline outline-1  ">Name</th>
                                    <th className="outline outline-1 ">Email</th>
                                    <th className="outline outline-1 ">Role</th>
                                    <th className="outline outline-1 ">Setting</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {Array.isArray(userData) && userData.map((user) => (
                                    <tr className="outline outline-1 hover" key={user.UserID} >
                                        <th>
                                            <label className="flex justify-center">
                                                <input type="checkbox" className="checkbox checkbox-info" />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{user.Name}</div>
                                                    <div className="text-sm opacity-50">UserID: {user.UserID}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge badge-ghost badge-lg font-semibold">{user.Email}</span>
                                            {/* <br />
                                        <span className="text-sm opacity-50 ml-2">{user.Tel}</span> */}
                                        </td>
                                        <td>
                                            <span className="badge badge-info badge-lg font-semibold">{user.Role}</span>
                                        </td>
                                        <th className="space-x-2 w-72">
                                            <button className="btn btn-accent  btn-md">View</button>
                                            <button className="btn btn-primary btn-outline btn-md">Edit</button>
                                            <button className="btn btn-error btn-outline btn-md" onClick={() => toggleDeleteDialog(user.UserID, user.Name, user.Role)}>Delete</button>
                                        </th>
                                    </tr>
                                ))
                                }

                                <DeleteAccountCard name={userName} userID={userID || 0} isOpen={isDeleteDialogOpen} onClose={handleCloseDeleteDialog} role={userRole} />


                            </tbody>



                        </table>

                    </div>
                </div>
            )}


        </div>

    );
}

export default DashboardPeople;
