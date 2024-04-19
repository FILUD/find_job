import axios from "axios";
import { useEffect, useState } from "react";
import InsertOccupationCard from "./card/occupation_card/occupation_insert_card";
import DeleteOccupationCard from "./card/occupation_card/occupation_delete_card";
import EditOccupationCard from "./card/occupation_card/occupation_edit_card";
import PacmanLoader from "react-spinners/PacmanLoader";

function DashboardOccupation() {
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const api = 'http://localhost:3001';
    const [isOccupationDashboardOpen, setIsOccupationDashboardOpen] = useState(false);

    interface OccupationProps {
        OccupationID: string,
        OccupationName: string,
        CategoryID: number,
        CategoryName: string,
    }

    const [occupationID, setOccupationID] = useState<string>("");
    const [occupationName, setOccupationName] = useState<string>("");
    const [workCategoryName, setWorkCategoryName] = useState<string>("");
    const [occupations, setOccupations] = useState<OccupationProps[]>([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isInsertDialogOpen, setIsInsertDialogOpen] = useState(false);
    const [selectedOccupationIDs, setSelectedOccupationIDs] = useState<string[]>([]);
    const [occupationIDs, setOccupationIDs] = useState<string>("");


    //selected part
    const toggleOccupationSelection = (occupationID: string) => {
        const isSelected = selectedOccupationIDs.includes(occupationID);
        setSelectedOccupationIDs(prevSelected =>
            isSelected ?
                prevSelected.filter(id => id !== occupationID) :
                [...prevSelected, occupationID]
        );
    };
    const getSelectedOccupationIDsString = () => {
        return selectedOccupationIDs.join(',');
    };

    //delete part
    const toggleDeleteDialog = (occupationID: string, occupationName: string) => {
        setOccupationID(occupationID);
        setOccupationName(occupationName);
        setIsDeleteDialogOpen(true);
    }
    const toggleSelectedDeleteDialog = () => {
        setOccupationIDs(getSelectedOccupationIDsString())
        setIsDeleteDialogOpen(true);
    }
    const handleCloseDialog = () => {
        setOccupationID('');
        setOccupationIDs('');
        setOccupationName('');
        setIsDeleteDialogOpen(false);
        setIsEditDialogOpen(false);
        setIsInsertDialogOpen(false);
    }

    //edit part
    const toggleEditDialog = (occupationID: string, occupationName: string) => {
        setOccupationID(occupationID);
        setOccupationName(occupationName);
        setIsEditDialogOpen(true);
    }

    //insert part
    const toggleInsertDialog = () => {
        setIsInsertDialogOpen(true);
    }


    // fetch part
    const fetchData = async () => {
        try {
            const response = await axios.get<{ data: OccupationProps[] }>(`${api}/showOccupation`);
            setOccupations(response.data.data || []);
        } catch (error) {
            setError("An error occurred while fetching data.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (isOccupationDashboardOpen) {
            fetchData();
        }
    }, [isOccupationDashboardOpen]);

    useEffect(() => {
        setIsOccupationDashboardOpen(true);

        return () => {
            setIsOccupationDashboardOpen(false);
        };
    }, []);

    const handleRefresh = () => {
        setLoading(true);
        setSelectedOccupationIDs([]);
        fetchData();
    };

    return (
        <div>
            {isLoading ? (
                <div className="flex justify-center items-center max-h-screen h-screen bg-white">
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
                <div className="">
                    <div className="overflow-x-auto ">
                        <div className="flex justify-between">
                            <div className="flex place-items-center ml-16">
                                <p className="font-bold text-2xl ">Occupation Manage</p>
                            </div>
                            <div className=" space-x-2 flex justify-end m-2 mr-16">
                                <button className="btn btn-primary" onClick={() => toggleInsertDialog()}>Add an occupation</button>
                                <button className="btn btn-error" onClick={() => toggleSelectedDeleteDialog()}>Delete all selected</button>
                            </div>
                        </div>

                        <table className="table ">
                            {/* head */}
                            <thead className="bg-slate-800 text-gray-400 outline outline-1 outline-white">
                                <tr className="text-sm font-sans">
                                    <th className="outline outline-1 outline-base-100 w-20 "></th>
                                    <th className="outline outline-1 w-52">Occupation ID</th>
                                    <th className="outline outline-1  ">Occupation</th>
                                    <th className="outline outline-1 ">Work Category</th>
                                    <th className="outline outline-1 w-72">Settings</th>
                                </tr>
                            </thead>
                            <tbody >
                                {Array.isArray(occupations) && occupations.map((occupation) => (
                                    <tr className="outline outline-1 hover" key={occupation.OccupationID}  >
                                        <th>
                                            <label className="flex justify-center">
                                                <input
                                                    type="checkbox"
                                                    className="checkbox checkbox-info"
                                                    onClick={() => toggleOccupationSelection(occupation.OccupationID)}
                                                    checked={selectedOccupationIDs.includes(occupation.OccupationID)}
                                                />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center ">
                                                <div>
                                                    <div className="text-lg ">{occupation.OccupationID}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <div className="text-lg font-notoLao">{occupation.OccupationName}</div>
                                                    <div className="text-sm opacity-50"></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-lg font-notoLao">{occupation.CategoryName}</span>
                                        </td>

                                        <th className="space-x-2 flex justify-center ">
                                            <button className="btn btn-primary btn-outline btn-md" onClick={() => toggleEditDialog(occupation.OccupationID, occupation.OccupationName)} >Edit</button>
                                            <button className="btn btn-error btn-outline btn-md" onClick={() => toggleDeleteDialog(occupation.OccupationID, occupation.OccupationName)}>Delete</button>
                                        </th>
                                    </tr>
                                ))
                                }
                                <DeleteOccupationCard
                                    name={occupationName}
                                    occupationID={occupationID}
                                    isOpen={isDeleteDialogOpen}
                                    onClose={handleCloseDialog}
                                    selectOccupationID={occupationIDs}
                                    refreshFetchdata={handleRefresh} />
                                <EditOccupationCard
                                    name={occupationName}
                                    occupationID={occupationID}
                                    isOpen={isEditDialogOpen}
                                    onClose={handleCloseDialog}
                                    refreshFetchdata={handleRefresh} />
                                <InsertOccupationCard
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

export default DashboardOccupation;
