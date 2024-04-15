import axios from "axios";
import { useEffect, useState } from "react";
import DeleteDistrictCard from "./card/delete_district_card";

function Dashboard_district() {
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const api = 'http://localhost:3001';
    interface AddressProps {
        DistrictID: number,
        DistrictName: string,
        ProvinceID: number,
        ProvinceName: string,
    }
    const [districtID, setDistrictID] = useState<number | undefined>(undefined);
    const [districtName, setDistrictName] = useState<string>("")
    const [provinceName, setProvinceName] = useState<string>("")
    const [address, setAddress] = useState<AddressProps[]>([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const toggleDeleteDialog = (districtID: number, districtName: string) => {
        setDistrictID(districtID);
        setDistrictName(districtName);
        setIsDeleteDialogOpen(true);
    }

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<{ data: AddressProps[] }>(`${api}/showDistrict`);
                setAddress(response.data.data || []);
            } catch (error) {
                setError("An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <div className="overflow-x-auto ">
                        <div className="flex justify-between">
                            <div className="flex place-items-center ml-16">
                                <p className="font-bold text-2xl">District Manage</p>
                            </div>
                            <div className=" space-x-2 flex justify-end m-2 mr-16">
                                <button className="btn btn-primary">Add a district</button>
                                <button className="btn btn-error">delete all select</button>
                            </div>
                        </div>

                        <table className="table ">
                            {/* head */}
                            <thead className="bg-slate-800 text-gray-400 outline outline-1 outline-white">
                                <tr className="text-sm font-sans">
                                    <th className="outline outline-1 outline-base-100 w-20 ">
                                        {/* <label className="flex justify-center">
                                        <input type="checkbox" className="checkbox checkbox-info " />
                                    </label> */}
                                    </th>
                                    <th className="outline outline-1 w-52">District_ID</th>
                                    <th className="outline outline-1  ">District</th>
                                    <th className="outline outline-1 ">Province</th>
                                    <th className="outline outline-1 w-72">Setting</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(address) && address.map((address) => (
                                    <tr className="outline outline-1 hover" key={address.DistrictID}  >
                                        <th>
                                            <label className="flex justify-center">
                                                <input type="checkbox" className="checkbox checkbox-info" />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="text-lg">{address.DistrictID}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">

                                                <div>
                                                    <div className="text-lg">{address.DistrictName}</div>
                                                    <div className="text-sm opacity-50"></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-lg">{address.ProvinceName}</span>
                                        </td>

                                        <th className="space-x-2 ">
                                            <button className="btn btn-accent  btn-md">View</button>
                                            <button className="btn btn-primary btn-outline btn-md">Edit</button>
                                            <button className="btn btn-error btn-outline btn-md" onClick={() => toggleDeleteDialog(address.DistrictID, address.DistrictName)}>Delete</button>
                                        </th>
                                    </tr>
                                ))
                                }
                                <DeleteDistrictCard name={districtName} districtIDs={districtID || 0} isOpen={isDeleteDialogOpen} onClose={handleCloseDeleteDialog} />

                            </tbody>
                        </table>
                    </div>
                </div>
            )
            } </div>
    )
}

export default Dashboard_district