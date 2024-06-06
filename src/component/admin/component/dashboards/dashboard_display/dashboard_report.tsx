import React, { useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';

const Dashboard_report: React.FC = () => {
    const [title, setTitle] = useState('');
    const componentRef = useRef<HTMLDivElement>(null);
    const [showPDF, setShowPDF] = useState(false);

    const handlePrint = () => {
        setShowPDF(true);
    };


    return (
        <div className="grid grid-cols-2">
            <div className=' h-screen mx-16 -'>
                <div ref={componentRef} className='bg-white h-screen py-8 px-16'>
                    <h1 className="text-xl font-medium text-center font-notoLao ">
                        ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ
                        <br></br>
                        ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນະຖາວອນ
                    </h1>

                </div>
            </div>



            <div className="p-8 bg-slate-700">
                <div className="p-8 space-y-4 bg-base-100 h-fit bg-opacity-100 rounded-2xl">
                    <h1 className="text-4xl font-bold text-center mb-2">Report</h1>
                    <label className="input input-bordered flex items-center gap-2 outline outline-1 outline-primary">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <textarea
                        className="textarea textarea-bordered h-36 w-full outline outline-1 outline-primary"
                        placeholder="Body"
                    />
                    <label className="input input-bordered flex items-center gap-2 outline outline-1 outline-primary">
                        <input type="text" className="grow" placeholder="Conclusion" />
                        <span className="badge badge-info">end</span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2 outline outline-1 outline-primary">
                        <input type="file" className="grow" placeholder="Chart Image" />
                        <kbd className="kbd kbd-sm">⌘</kbd>
                    </label>
                    <div className="flex justify-center pt-12">
                        <ReactToPrint
                            trigger={() => <button className="btn btn-primary btn-wide">Print this out!</button>}
                            content={() => componentRef.current}
                        />
                        <button className="btn btn-primary btn-wide ml-4" onClick={handlePrint}>Preview PDF</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard_report;
