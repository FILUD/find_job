import React, { useEffect, useState } from 'react';
import { Card, CardBody, IconButton, Typography } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

interface ReportProps {
    componentRef: React.MutableRefObject<HTMLDivElement | null>;
    number: number;
}

interface ReportData {
    IMG_Card: string;
}

const Report_info_jsk: React.FC<ReportProps> = ({ componentRef, number }) => {
    const [count, setCount] = useState(number);
    const [dataInfo, setDataInfo] = useState<ReportData[]>([]);
    const [length, setLength] = useState(0);
    const myID = localStorage.getItem('ID');
    const myRole = localStorage.getItem('Role');

    const incrementCount = () => {
        setCount(prevCount => (prevCount < length - 1 ? prevCount + 1 : prevCount + number));
    };

    const decrementCount = () => {
        setCount(prevCount => (prevCount > 0 ? prevCount - 1 : prevCount));
    };
    useEffect(() => {
        if (number < length) {
            setCount(number);
        }
    }, [number, length]);
    const fetchData = async () => {
        try {
            const response = await axios.post<{ data: ReportData[] }>('http://localhost:3001/report_info', { userID: myID, role: myRole });
            console.log("report_info:", response.data.data);
            setDataInfo(response.data.data);
            setLength(response.data.data.length);
        } catch (error) {
            console.error('Error fetching report_info data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='bg-slate-500'>
            <div ref={componentRef} className='bg-white'>
                <div id='page1' className='h-[1000px] py-16 px-16  text-black font-notoLao flex justify-center'>
                    {dataInfo.length > 0 && count >= 0 && count < dataInfo.length && (
                        <img src={dataInfo[count].IMG_Card} alt={`Report ${count}`} />
                    )}
                </div>
            </div>
            <div className='w-full flex justify-center mb-6 mt-2'>
                <div className="flex items-center gap-8">
                    <IconButton
                        size="md"
                        variant="outlined"
                        onClick={decrementCount}
                    >
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                    </IconButton>

                    <span className="text-2xl">{count + 1}/{length}</span>

                    <IconButton
                        size="md"
                        variant="outlined"
                        onClick={incrementCount}
                    >
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default Report_info_jsk;
