import axios from "axios";
import { useEffect, useState } from "react";
import DeleteWorkCategoryCard from "./card/workcategory_card/workcategory_delete_card";
import InsertWorkCategoryCard from "./card/workcategory_card/workcategory_insert_card";
import EditWorkCategoryCard from "./card/workcategory_card/workcategory_edit_card";
import PacmanLoader from "react-spinners/PacmanLoader";


function Dashboard_workcategory() {
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const api = 'http://localhost:3001';
    const [isWorkCategoryDashboardOpen, setIsWorkCategoryDashboardOpen] = useState(false);

    interface WorkCategoryProps {
        CategoryID: string,
        CategoryName: string,
    }

    const [workCategoryID, setWorkCategoryID] = useState<string>("");
    const [workCategoryName, setWorkCategoryName] = useState<string>("");
    const [workCategories, setWorkCategories] = useState<WorkCategoryProps[]>([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isInsertDialogOpen, setIsInsertDialogOpen] = useState(false);
    const [selectedWorkCategoryIDs, setSelectedWorkCategoryIDs] = useState<string[]>([]);
    const [workCategoryIDs, setWorkCategoryIDs] = useState<string>("");

    //selected part
    const toggleWorkCategorySelection = (workCategoryID: string) => {
        const isSelected = selectedWorkCategoryIDs.includes(workCategoryID);
        setSelectedWorkCategoryIDs(prevSelected =>
            isSelected ?
                prevSelected.filter(id => id !== workCategoryID) :
                [...prevSelected, workCategoryID]
        );
    };
    const getSelectedWorkCategoryIDsString = () => {
        return selectedWorkCategoryIDs.join(',');
    };

    //delete part
    const toggleDeleteDialog = (workCategoryID: string, workCategoryName: string) => {
        setWorkCategoryID(workCategoryID);
        setWorkCategoryName(workCategoryName);
        setIsDeleteDialogOpen(true);
    }
    const toggleSelectedDeleteDialog = () => {
        setWorkCategoryIDs(getSelectedWorkCategoryIDsString())
        setIsDeleteDialogOpen(true);
    }
    const handleCloseDialog = () => {
        setWorkCategoryID('');
        setWorkCategoryIDs('');
        setWorkCategoryName('');
        setIsDeleteDialogOpen(false);
        setIsEditDialogOpen(false);
        setIsInsertDialogOpen(false);
    }

    //edit part
    const toggleEditDialog = (workCategoryID: string, workCategoryName: string) => {
        setWorkCategoryID(workCategoryID);
        setWorkCategoryName(workCategoryName);
        setIsEditDialogOpen(true);
    }

    //insert part
    const toggleInsertDialog = () => {
        setIsInsertDialogOpen(true);
    }


    // fetch part
    const fetchData = async () => {
        try {
            const response = await axios.get<{ data: WorkCategoryProps[] }>(`${api}/showWorkCategory`);
            setWorkCategories(response.data.data || []);
        } catch (error) {
            setError("An error occurred while fetching data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isWorkCategoryDashboardOpen) {
            fetchData();
        }
    }, [isWorkCategoryDashboardOpen]);

    useEffect(() => {
        setIsWorkCategoryDashboardOpen(true);

        return () => {
            setIsWorkCategoryDashboardOpen(false);
        };
    }, []);

    const handleRefresh = () => {
        setLoading(true);
        setSelectedWorkCategoryIDs([]);
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
                            <div className="flex place-items-center ml-48">
                                <p className="font-bold text-3xl ">Work Category Manage</p>
                            </div>
                            <div className=" space-x-2 flex justify-end m-2 mr-16">
                                <button className="btn btn-primary" onClick={() => toggleInsertDialog()}>Add a Work Category</button>
                                <button className="btn btn-error" onClick={() => toggleSelectedDeleteDialog()}>delete all select</button>
                            </div>
                        </div>
                        <div className="flex justify-center mx-48 mt-2">
                            <div className="w-full shadow-2xl shadow-black">
                                <table className="table  ">
                                    <thead className="bg-slate-800 text-gray-400 outline outline-1   rounded-t-xl ">
                                        <tr className="text-sm font-sans">
                                            <th className="outline outline-1 rounded-tl-xl outline-base-100 w-1/12"></th>
                                            <th className="outline outline-1 w-1/6">WorkCategory_ID</th>
                                            <th className="outline outline-1 w-2/6 ">WorkCategory</th>
                                            <th className="outline outline-1 rounded-tr-xl w-1/6">Setting</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {Array.isArray(workCategories) && workCategories.map((workCategory) => (
                                            <tr className="outline outline-1 hover" key={workCategory.CategoryID}  >
                                                <th>
                                                    <label className="flex justify-center">
                                                        <input
                                                            type="checkbox"
                                                            className="checkbox checkbox-info"
                                                            onClick={() => toggleWorkCategorySelection(workCategory.CategoryID)}
                                                            checked={selectedWorkCategoryIDs.includes(workCategory.CategoryID)}
                                                        />
                                                    </label>
                                                </th>
                                                <td>
                                                    <div className="flex items-center ">
                                                        <div>
                                                            <div className="text-lg ">{workCategory.CategoryID}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center gap-3 ">
                                                        <div className="">
                                                            <div className="text-lg font-notoLao ">{workCategory.CategoryName}</div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <th className="space-x-2 flex justify-center ">
                                                    <button className="btn btn-primary btn-outline btn-md" onClick={() => toggleEditDialog(workCategory.CategoryID, workCategory.CategoryName)} >Edit</button>
                                                    <button className="btn btn-error btn-outline btn-md" onClick={() => toggleDeleteDialog(workCategory.CategoryID, workCategory.CategoryName)}>Delete</button>
                                                </th>
                                            </tr>
                                        ))
                                        }
                                        <DeleteWorkCategoryCard
                                            name={workCategoryName}
                                            workCategoryID={workCategoryID}
                                            isOpen={isDeleteDialogOpen}
                                            onClose={handleCloseDialog}
                                            selectWorkCategoryID={workCategoryIDs}
                                            refreshFetchdata={handleRefresh} />
                                        <EditWorkCategoryCard
                                            name={workCategoryName}
                                            workCategoryID={workCategoryID}
                                            isOpen={isEditDialogOpen}
                                            onClose={handleCloseDialog}
                                            refreshFetchdata={handleRefresh} />
                                        <InsertWorkCategoryCard
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

export default Dashboard_workcategory;
