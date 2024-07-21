import React, { useRef, useState } from 'react'
import Report_info_jsk from './Form_report/report_info_jobseeker';
import Report_info_emp from './Form_report/report_info_emp';
import ReactToPrint from 'react-to-print';
import { Card, CardBody, IconButton, Typography } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import SetNavbar from '../navbar/SetNavbar';
import { useTheme } from '../../theme/theme';
import ReportEmployer from './Form_report/report_request';
import ReportJobseeker from './Form_report/report_invitation';

function ReportJob() {
    const myRole = localStorage.getItem('Role');
    const [title, setTitle] = useState('');
    const componentRef = useRef<any>(null);
    const [showPDF, setShowPDF] = useState(false);
    const { theme } = useTheme()
    const [selectReport, setSelectReport] = useState(`${myRole == `"Jobseeker"` ? "report_info_emp" : "report_info_jsk"}`);

    const handlePrint = () => {
        setShowPDF(true);
    };

    const [count, setCount] = useState(0);
    const incrementCount = () => {
        setCount(count + 1)
    }
    const decrementCount = () => {
        setCount(count > 0 ? count - 1 : 0);
    };

    const handleSelect = async (e: any) => {
        setSelectReport(e)
        setCount(0)
        setTitle("");
    }
    const [printAll, setPrintAll] = useState(false)

    return (
        <html data-theme={theme}>
            <SetNavbar />
            <div className="grid grid-cols-2 bg-primary">
                <div className='scale-[55%] transform origin-top border h-fit max-h-[65vh] mt-8'>
                    {selectReport === "report_info_jsk" && (
                        <Report_info_jsk componentRef={componentRef} number={count} />
                    )}
                    {selectReport === "report_info_emp" && (
                        <Report_info_emp componentRef={componentRef} title={title} number={count} />
                    )}


                    {selectReport === "report_invite" && (
                        <ReportJobseeker componentRef={componentRef} title={title} />
                        // <ReportVisitForm componentRef={componentRef} title={title} />
                    )}
                    {selectReport === "report_request" && (
                        <ReportEmployer componentRef={componentRef} title={title} />
                        // <ReportUserForm componentRef={componentRef} title={title} />
                    )}

                </div>

                <div className="p-8 bg-slate-700 max-h-[85svh] h-screen">
                    <div className="p-8 space-y-4 bg-base-100 h-fit bg-opacity-100 rounded-2xl">
                        <h1 className="text-4xl font-bold text-center mb-2">Report</h1>

                        <div className="flex justify-center">
                            <select className="select select-primary w-full max-w-xs font-notoLao"
                                value={selectReport}
                                onChange={(e) => handleSelect(e.target.value)}
                            >
                                {myRole == `"Jobseeker"` && (
                                    <>
                                        <option value={"report_info_emp"} >ລາຍງານຂໍ້ມູນຜູ້ຮັບສະໝັກ</option>
                                        <option value={"report_invite"} >ລາຍງານຂໍ້ມູນຄຳເຊີນເຂົ້າເຮັດວຽກ</option>
                                    </>
                                )}
                                {myRole == `"Employer"` && (
                                    <>
                                        <option value={"report_info_jsk"} >ລາຍງານຂໍ້ມູນຜູ້ຊອກຫາວຽກ</option>
                                        <option value={"report_request"} >ລາຍງານຂໍ້ມູນຄຳຂໍເຂົ້າເຮັດວຽກ</option>
                                    </>
                                )}


                            </select>
                        </div>
                        {selectReport === "report_request" && (
                            <label className="input input-bordered flex items-center gap-2 outline outline-1 outline-primary">
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </label>
                        )}
                        {selectReport === "report_invite" && (
                            <label className="input input-bordered flex items-center gap-2 outline outline-1 outline-primary">
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </label>
                        )}
                        {/* {selectReport === "report_info_jsk" && (
                            <div className='w-full flex justify-center mb-6 mt-2' >
                                <div className="flex items-center gap-8">
                                    <IconButton
                                        size="md"
                                        variant="outlined"
                                        onClick={decrementCount}
                                    >
                                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                                    </IconButton>

                                    <IconButton
                                        size="md"
                                        variant="outlined"
                                        onClick={incrementCount}
                                    >
                                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                                    </IconButton>
                                </div>
                            </div>
                        )} */}





                        <div className="flex justify-center pt-12 space-x-2">
                            <ReactToPrint
                                trigger={() => <button className="btn btn-primary btn-wide">Print this out</button>}
                                content={() => componentRef.current} />

                            {/* <button className="btn btn-primary btn-wide ml-4" onClick={handlePrint}>Preview PDF</button> */}
                        </div>
                    </div>
                </div>
            </div >
        </html>


    )
}

export default ReportJob