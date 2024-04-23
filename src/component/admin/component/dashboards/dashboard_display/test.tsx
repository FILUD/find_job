// Test_report.js

import React, { useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import QuixotePDF from './report/component/Quixote';


function Test_report() {
    const [title, setTitle] = useState('')
    return (
        <div className=" grid grid-cols-2">
            <div className=''>
                <PDFViewer className='w-full h-screen ' >
                    <QuixotePDF title={title} />
                </PDFViewer>
            </div>
            <div className=' p-8 bg-slate-700'>
                <div className='p-8 space-y-4 bg-base-100 h-fit bg-opacity-100 rounded-2xl'>
                    <h1 className='text-4xl font-bold text-center mb-2'>Report</h1>
                    <label className="input input-bordered flex items-center gap-2 outline outline-1 outline-primary">
                        <input type="text" className="grow" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                    <textarea className="textarea textarea-bordered h-36 w-full outline outline-1 outline-primary" placeholder="Body" >
                    </textarea>
                    {/* <label className="input input-bordered flex items-center gap-2 outline outline-1 outline-primary">
                        <input type="text" className="grow" placeholder="Body" />
                    </label> */}
                    <label className="input input-bordered flex items-center gap-2 outline outline-1 outline-primary">
                        <input type="text" className="grow" placeholder="Conclusion" />
                        <span className="badge badge-info">end</span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2 outline outline-1 outline-primary ">
                        <input type="file" className="grow" placeholder="Chart Image " />
                        <kbd className="kbd kbd-sm">⌘</kbd>
                    </label>

                    <div className='flex justify-center pt-12'>
                        <button className="btn btn-primary btn-wide ">Primary</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Test_report;
