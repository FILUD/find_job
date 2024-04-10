import axios from "axios";
import { useEffect, useState } from "react"



function Dashboard_people() {

    interface UserData {
        UserID: number,
        Name: string,
        Email: string,
        Role: string,
        Tel: string,
    }
    const [userData, setUserData] = useState<UserData[]>([]);
    const [isLoading, setLoading] = useState(true);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/ShowClient');
                console.log(response);
                setUserData(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);

            }
        }
        fetchData();
    }, []);


    return (
        <div>
            {/* content */}
            <div className="overflow-x-auto">

                <table className="table ">
                    {/* head */}
                    <thead className="bg-gray-700 text-white outline outline-1 outline-white">
                        <tr className="text-sm font-sans">
                            <th className="outline outline-1 outline-base-100 ">
                                {/* <label className="flex justify-center">
                                    <input type="checkbox" className="checkbox checkbox-info " />
                                </label> */}
                            </th>
                            <th className="outline outline-1 outline-base-100 ">Name</th>
                            <th className="outline outline-1 outline-base-100">Email</th>
                            <th className="outline outline-1 outline-base-100">Role</th>
                            <th className="outline outline-1 outline-base-100">Setting</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {/* row 1 */}

                        {/* todo put list user */}
                        {userData.map((user) => (
                            <tr className="outline outline-1" key={user.UserID}>
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
                                            <div className="text-sm opacity-50">{user.UserID}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Zemlak, Daniel and Leannon
                                    <br />
                                    <span className="badge badge-ghost badge-sm">{user.Email}</span>
                                </td>
                                <td>{user.Role}</td>
                                <th className="space-x-2 w-72">
                                    <button className="btn btn-accent  btn-md">View</button>
                                    <button className="btn btn-primary btn-outline btn-md">Edit</button>
                                    <button className="btn btn-error btn-outline btn-md">Delete</button>
                                </th>
                            </tr>
                        ))
                        }

                    </tbody>
                    {/* foot
                    <tfoot className="">
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </tfoot> */}

                </table>
            </div>



        </div>
    )
}

export default Dashboard_people