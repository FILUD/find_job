import axios from "axios";
import { useEffect, useState } from "react";
import DeleteAccountCard from "./card/account_delete_card";
import PacmanLoader from "react-spinners/PacmanLoader";
import VerifyAccountCard from "./card/account_verify_card";

function DashboardPeople() {
    interface UserData {
        UserID: number,
        Name: string,
        Email: string,
        Role: string,
        Tel: string,
        Verify: string
    }
    const [userData, setUserData] = useState<UserData[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [userID, setUserID] = useState<number | undefined>(undefined);
    const [userName, setUserName] = useState<string>("")
    const [userRole, setUserRole] = useState<string>("")
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // Add state for delete dialog
    const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false); // Add state for delete dialog

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
                console.log("data user manager :", userData)
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
    const toggleVerifyDialog = (userID: number, name: string) => {
        setUserID(userID);
        setUserName(name);
        // setUserRole(role);
        setIsVerifyDialogOpen(true); // Open delete dialog when clicked
    }

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    }

    const handleCloseVerifyDialog = () => {
        setIsVerifyDialogOpen(false);
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
                    <div className="overflow-x-auto bg-base-200 h-screen">
                        <div>
                            <div> </div>
                            <div className="space-x-5 flex justify-end m-2">
                                {/* <button className="btn btn-primary">Edit</button>  */}
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
                                                        <img src="/Icon/user.png" alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{user.Name}</div>
                                                    <div className="text-sm opacity-50">UserID: {user.UserID}</div>

                                                </div>
                                                {user.Verify == "verified" ?
                                                    <span className="badge badge-info badge-lg font-semibold">{user.Verify}</span>
                                                    :
                                                    null
                                                }
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge badge-ghost badge-lg font-semibold">{user.Email}</span>
                                            {/* <br />
                                        <span className="text-sm opacity-50 ml-2">{user.Tel}</span> */}
                                        </td>
                                        <td className="space-x-2">
                                            <span className="badge badge-info badge-lg font-semibold">{user.Role}</span>

                                        </td>
                                        <th className="space-x-2 w-72 flex justify-end">
                                            {/* <button className="btn btn-accent  btn-md">View</button>
                                            <button className="btn btn-primary btn-outline btn-md">Edit</button> */}

                                            {user.Role == "Employer" && user.Verify != "verified" ?
                                                <button className="btn btn-info btn-outline  btn-md" onClick={() => toggleVerifyDialog(user.UserID, user.Name)}>Verify</button>
                                                :
                                                null
                                            }
                                            <button className="btn btn-error btn-outline btn-md" onClick={() => toggleDeleteDialog(user.UserID, user.Name, user.Role)}>Delete</button>
                                        </th>
                                    </tr>
                                ))
                                }
                                <DeleteAccountCard name={userName} userID={userID || 0} isOpen={isDeleteDialogOpen} onClose={handleCloseDeleteDialog} role={userRole} />

                                <VerifyAccountCard name={userName} userID={userID || 0} isOpen={isVerifyDialogOpen} onClose={handleCloseVerifyDialog} />


                            </tbody>



                        </table>

                    </div>
                </div>
            )}


        </div>

    );
}

export default DashboardPeople;
