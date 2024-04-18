import axios from "axios";
import { useEffect, useState } from "react";
import DeleteProvinceCard from "./card/province_card/province_delete_card";
import EditProvinceCard from "./card/province_card/province_edit_card";
import InsertProvinceCard from "./card/province_card/province_insert_card";

function Dashboard_province() {
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const api = 'http://localhost:3001';

    interface AddressProps {
        ProvinceID: string,
        ProvinceName: string,
    }

    const [provinceID, setProvinceID] = useState<string>("");
    const [provinceName, setProvinceName] = useState<string>("");
    const [provinces, setProvinces] = useState<AddressProps[]>([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isInsertDialogOpen, setIsInsertDialogOpen] = useState(false);
    const [selectedProvinceIDs, setSelectedProvinceIDs] = useState<string[]>([]);
    const [provinceIDs, setProvinceIDs] = useState<string>("");

    //selected part
    const toggleProvinceSelection = (provinceID: string) => {
        const isSelected = selectedProvinceIDs.includes(provinceID);
        setSelectedProvinceIDs(prevSelected =>
            isSelected ?
                prevSelected.filter(id => id !== provinceID) :
                [...prevSelected, provinceID]
        );
    };
    const getSelectedProvinceIDsString = () => {
        return selectedProvinceIDs.join(',');
    };

    //delete part
    const toggleDeleteDialog = (provinceID: string, provinceName: string) => {
        setProvinceID(provinceID);
        setProvinceName(provinceName);
        setIsDeleteDialogOpen(true);
    }
    const toggleSelectedDeleteDialog = () => {
        setProvinceIDs(getSelectedProvinceIDsString())
        setIsDeleteDialogOpen(true);
    }
    const handleCloseDialog = () => {
        setProvinceID('');
        setProvinceIDs('');
        setProvinceName('');
        setSelectedProvinceIDs([]);
        setIsDeleteDialogOpen(false);
        setIsEditDialogOpen(false);
        setIsInsertDialogOpen(false);
    }

    //edit part
    const toggleEditDialog = (provinceID: string, provinceName: string) => {
        setProvinceID(provinceID);
        setProvinceName(provinceName);
        setIsEditDialogOpen(true);
    }

    //insert part
    const toggleInsertDialog = () => {
        setIsInsertDialogOpen(true);
    }


    // fetch part
    const fetchData = async () => {
        try {
            const response = await axios.get<{ data: AddressProps[] }>(`${api}/showProvince`);
            setProvinces(response.data.data || []);
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
                <div className="">
                    <div className="overflow-x-auto ">
                        <div className="flex justify-between">
                            <div className="flex place-items-center ml-48">
                                <p className="font-bold text-3xl ">Province Manage</p>
                            </div>
                            <div className=" space-x-2 flex justify-end m-2 mr-16">
                                <button className="btn btn-primary" onClick={() => toggleInsertDialog()}>Add a province</button>
                                <button className="btn btn-error" onClick={() => toggleSelectedDeleteDialog()}>delete all select</button>
                            </div>
                        </div>
                        <div className="flex justify-center mx-48 mt-2">
                            <div className="w-full shadow-2xl shadow-black">
                                <table className="table  ">
                                    <thead className="bg-slate-800 text-gray-400 outline outline-1   rounded-t-xl ">
                                        <tr className="text-sm font-sans">
                                            <th className="outline outline-1 rounded-tl-xl outline-base-100 w-1/12"></th>
                                            <th className="outline outline-1 w-1/6">Province_ID</th>
                                            <th className="outline outline-1 w-2/6 ">Province</th>
                                            <th className="outline outline-1 rounded-tr-xl w-1/6">Setting</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {Array.isArray(provinces) && provinces.map((province) => (
                                            <tr className="outline outline-1 hover" key={province.ProvinceID}  >
                                                <th>
                                                    <label className="flex justify-center">
                                                        <input
                                                            type="checkbox"
                                                            className="checkbox checkbox-info"
                                                            onClick={() => toggleProvinceSelection(province.ProvinceID)}
                                                            checked={selectedProvinceIDs.includes(province.ProvinceID)}
                                                        />
                                                    </label>
                                                </th>
                                                <td>
                                                    <div className="flex items-center ">
                                                        <div>
                                                            <div className="text-lg ">{province.ProvinceID}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center gap-3 ">
                                                        <div className="">
                                                            <div className="text-lg font-notoLao ">{province.ProvinceName}</div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <th className="space-x-2 flex justify-center ">
                                                    <button className="btn btn-primary btn-outline btn-md" onClick={() => toggleEditDialog(province.ProvinceID, province.ProvinceName)} >Edit</button>
                                                    <button className="btn btn-error btn-outline btn-md" onClick={() => toggleDeleteDialog(province.ProvinceID, province.ProvinceName)}>Delete</button>
                                                </th>
                                            </tr>
                                        ))
                                        }
                                        <DeleteProvinceCard
                                            name={provinceName}
                                            provinceID={provinceID}
                                            isOpen={isDeleteDialogOpen}
                                            onClose={handleCloseDialog}
                                            selectProvinceID={provinceIDs}
                                            refreshFetchdata={handleRefresh} />
                                        <EditProvinceCard
                                            name={provinceName}
                                            provinceID={provinceID}
                                            isOpen={isEditDialogOpen}
                                            onClose={handleCloseDialog}
                                            refreshFetchdata={handleRefresh} />
                                        <InsertProvinceCard
                                            isOpen={isInsertDialogOpen}
                                            onClose={handleCloseDialog}
                                            refreshFetchdata={handleRefresh}
                                        />
                                    </tbody>
                                </table></div>

                        </div>

                    </div>
                </div>
            )
            } </div>
    )
}

export default Dashboard_province
