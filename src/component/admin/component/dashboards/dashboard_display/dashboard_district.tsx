import axios from "axios";
import { useEffect, useState } from "react";
import DeleteDistrictCard from "./card/district_card/district_delete_card";
import EditDistrictCard from "./card/district_card/district_edit_card";
import InsertDistrictCard from "./card/district_card/district_insert_card";
import PacmanLoader from "react-spinners/PacmanLoader";

function Dashboard_district() {
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const api = 'http://localhost:3001';
    const [isDistrictDashboardOpen, setIsDistrictDashboardOpen] = useState(false);

    interface AddressProps {
        DistrictID: string,
        DistrictName: string,
        ProvinceID: string,
        ProvinceName: string,
    }

    const [districtID, setDistrictID] = useState<string>("");
    const [districtName, setDistrictName] = useState<string>("");
    const [provinceName, setProvinceName] = useState<string>("");
    const [provinceID, setProvinceID] = useState<string>('');
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
        setIsDeleteDialogOpen(false);
        setIsEditDialogOpen(false);
        setIsInsertDialogOpen(false);
    }

    //edit part
    const toggleEditDialog = (districtID: string, districtName: string, provinceID: string) => {
        setDistrictID(districtID);
        setDistrictName(districtName);
        setProvinceID(provinceID);
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
        if (isDistrictDashboardOpen) {
            fetchData();
        }
    }, [isDistrictDashboardOpen]);

    useEffect(() => {
        setIsDistrictDashboardOpen(true);

        return () => {
            setIsDistrictDashboardOpen(false);
        };
    }, []);

    const handleRefresh = () => {
        setLoading(true);
        setSelectedDistrictIDs([]);
        fetchData();
    };

    return (
        <div>
            {isLoading ? (
                <div className="flex justify-center items-center max-h-screen h-screen bg-white" >
                    <PacmanLoader color="#36d7b7" />
                </div>
            ) : error ? (
                <div className="flex justify-center items-center max-h-screen h-screen bg-white">
                    <div className="text-center">
                        <p>{error}</p>
                        <div className="btn btn-primary" onClick={handleRefresh}>Refresh</div>
                    </div>
                </div>

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

                                        <th className="space-x-2 flex justify-center">
                                            <button className="btn btn-primary btn-outline btn-md" onClick={() => toggleEditDialog(address.DistrictID, address.DistrictName, address.ProvinceID)} >Edit</button>
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
                                    getProvinceID={provinceID}
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