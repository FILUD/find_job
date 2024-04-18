import axios from "axios";
import { useEffect, useState } from "react";
import DeleteDistrictCard from "./card/district_delete_card";
import EditDistrictCard from "./card/district_edit_card";
import InsertDistrictCard from "./card/district_insert_card";

function Dashboard_district() {
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const api = 'http://localhost:3001';

    interface AddressProps {
        DistrictID: string,
        DistrictName: string,
        ProvinceID: number,
        ProvinceName: string,
    }

    const [districtID, setDistrictID] = useState<string>("");
    const [districtName, setDistrictName] = useState<string>("");
    const [provinceName, setProvinceName] = useState<string>("");
    const [address, setAddress] = useState<AddressProps[]>([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isInsertDialogOpen, setIsInsertDialogOpen] = useState(false);
    const [selectedDistrictIDs, setSelectedDistrictIDs] = useState<string[]>([]);
    const [districtIDs, setDistrictIDs] = useState<string>("");

    //selected part
    const toggleDistrictSelection = (districtID: string) => {
        const isSelected = selectedDistrictIDs.includes(districtID);
        setSelectedDistrictIDs(prevSelected =>
            isSelected ?
                prevSelected.filter(id => id !== districtID) :
                [...prevSelected, districtID]
        );
    };
    const getSelectedDistrictIDsString = () => {
        return selectedDistrictIDs.join(',');
    };

    //delete part
    const toggleDeleteDialog = (districtID: string, districtName: string) => {
        setDistrictID(districtID);
        setDistrictName(districtName);
        setIsDeleteDialogOpen(true);
    }
    const toggleSelectedDeleteDialog = () => {
        setDistrictIDs(getSelectedDistrictIDsString())
        setIsDeleteDialogOpen(true);
    }
    const handleCloseDialog = () => {
        setDistrictID('');
        setDistrictIDs('');
        setDistrictName('');
        setSelectedDistrictIDs([]);
        setIsDeleteDialogOpen(false);
        setIsEditDialogOpen(false);
        setIsInsertDialogOpen(false);
    }

    //edit part
    const toggleEditDialog = (districtID: string, districtName: string) => {
        setDistrictID(districtID);
        setDistrictName(districtName);
        setIsEditDialogOpen(true);
    }

    //insert part
    const toggleInsertDialog = () => {
        setIsInsertDialogOpen(true);
    }


    // fetch part
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
    useEffect(() => {
        fetchData();
    }, []);
    const handleRefresh = () => {
        setLoading(true);
        fetchData();
    };

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                // <div className="font-notoLao">
                <div className="">
                    <div className="overflow-x-auto ">
                        <div className="flex justify-between">
                            <div className="flex place-items-center ml-16">
                                <p className="font-bold text-2xl ">District Manage</p>
                            </div>
                            <div className=" space-x-2 flex justify-end m-2 mr-16">
                                <button className="btn btn-primary" onClick={() => toggleInsertDialog()}>Add a district</button>
                                <button className="btn btn-error" onClick={() => toggleSelectedDeleteDialog()}>delete all select</button>
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
                            <tbody >
                                {Array.isArray(address) && address.map((address) => (
                                    <tr className="outline outline-1 hover" key={address.DistrictID}  >
                                        <th>
                                            <label className="flex justify-center">
                                                <input
                                                    type="checkbox"
                                                    className="checkbox checkbox-info"
                                                    onClick={() => toggleDistrictSelection(address.DistrictID)}
                                                    checked={selectedDistrictIDs.includes(address.DistrictID)}
                                                />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center ">
                                                <div>
                                                    <div className="text-lg ">{address.DistrictID}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">

                                                <div>
                                                    <div className="text-lg font-notoLao">{address.DistrictName}</div>
                                                    <div className="text-sm opacity-50"></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-lg font-notoLao">{address.ProvinceName}</span>
                                        </td>

                                        <th className="space-x-2 flex justify-center ">
                                            <button className="btn btn-primary btn-outline btn-md" onClick={() => toggleEditDialog(address.DistrictID, address.DistrictName)} >Edit</button>
                                            <button className="btn btn-error btn-outline btn-md" onClick={() => toggleDeleteDialog(address.DistrictID, address.DistrictName)}>Delete</button>
                                        </th>
                                    </tr>
                                ))
                                }
                                <DeleteDistrictCard
                                    name={districtName}
                                    districtID={districtID}
                                    isOpen={isDeleteDialogOpen}
                                    onClose={handleCloseDialog}
                                    selectDistrictID={districtIDs}
                                    refreshFetchdata={handleRefresh} />
                                <EditDistrictCard
                                    name={districtName}
                                    districtID={districtID}
                                    isOpen={isEditDialogOpen}
                                    onClose={handleCloseDialog}
                                    refreshFetchdata={handleRefresh} />
                                <InsertDistrictCard
                                    isOpen={isInsertDialogOpen}
                                    onClose={handleCloseDialog}
                                    refreshFetchdata={handleRefresh}
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
            )
            } </div>
    )
}

export default Dashboard_district