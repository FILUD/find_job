import React, { useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import ReportUserForm from './report/report_user_form';
import { Select, Option } from "@material-tailwind/react";

const Dashboard_report: React.FC = () => {
    const [title, setTitle] = useState('');
    const componentRef = useRef<any>(null);
    const [showPDF, setShowPDF] = useState(false);
    const [selectReport, setSelectReport] = useState('');

    const handlePrint = () => {
        setShowPDF(true);
    };

    return (
        <div className="grid grid-cols-2 bg-primary">
            <div className='scale-[60%] transform origin-top border h-fit max-h-[65vh] mt-8'>
                <ReportUserForm componentRef={componentRef} title={title} />
            </div>

            <div className="p-8 bg-slate-700 max-h-[90svh] h-screen">
                <div className="p-8 space-y-4 bg-base-100 h-fit bg-opacity-100 rounded-2xl">
                    <h1 className="text-4xl font-bold text-center mb-2">Report</h1>
                    <div className="">
                        <select className="select select-primary w-full max-w-xs ">
                            <option>Useraccount Report</option>
                            <option>Vue</option>
                            <option>React</option>
                        </select>
                    </div>
                    <label className="input input-bordered flex items-center gap-2 outline outline-1 outline-primary">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>

                    <div className="flex justify-center pt-12">
                        <ReactToPrint
                            trigger={() => <button className="btn btn-primary btn-wide">Print this out!</button>}
                            content={() => componentRef.current} />
                        <button className="btn btn-primary btn-wide ml-4" onClick={handlePrint}>Preview PDF</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard_report;
