import React, { useEffect, useState } from 'react';
import { Card, CardBody, IconButton, Typography } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

interface ReportProps {
    componentRef: React.MutableRefObject<HTMLDivElement | null>;
    title: string;
    number: number;
}

interface ReportData {
    IMG_Card: string;
    UserInfo: UserInfo
}

interface UserInfo {
    Name: string,
    Title: string,
    Tel: string,
    Profile_IMG: string,
    VillageName: string,
    DistrictName: string,
    ProvinceName: string,
    Email: string,
    Role: string
}

const Report_info_emp: React.FC<ReportProps> = ({ componentRef, title, number }) => {
    const [count, setCount] = useState(number);
    const [dataInfo, setDataInfo] = useState<ReportData[]>([]);
    const [length, setLength] = useState(0);
    const [page, setPage] = useState(0);
    const itemsPerPage = 4; // Adjust the number of items per page as needed
    const myID = localStorage.getItem('ID');
    const myRole = localStorage.getItem('Role');

    const incrementCount = () => {
        if (count < length - 1) {
            setCount(count + 1);
        }
    };

    const decrementCount = () => {
        setCount(count > 0 ? count - 1 : 0);
    };

    const nextPage = () => {
        if ((page + 1) * itemsPerPage < length) {
            setPage(page + 1);
        }
    };

    const prevPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.post<{ data: ReportData[] }>('http://localhost:3001/report_info', { userID: myID, role: myRole });
            console.log("report_info:", response.data.data);
            setLength(response.data.data.length);
            setDataInfo(response.data.data);
        } catch (error) {
            console.error('Error fetching report_info data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='bg-white'>
            <div ref={componentRef} className='bg-white'>
                <div className='h-[1020px] py-16 px-16 text-black font-notoLao overflow-hidden'>
                    <h1 className='text-xl text-center font-semibold mb-4'>
                        ລາຍງານຂໍ້ມູນຜູ້ຮັບສະໝັກ
                    </h1>
                    {dataInfo.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((data, index) => (
                        <div key={index} className='mb-8'>
                            <p className='font-semibold text-lg mb-1'>{index + 1}. {data.UserInfo.Name}</p>
                            <div className='grid grid-cols-2'>
                                {data.UserInfo.Profile_IMG != '' ? (
                                    <img src={data.UserInfo.Profile_IMG} alt={`Report ${index}`} className='w-[100%] h-[250px]  rounded-l-xl' />
                                ) : (
                                    <img src="/Icon/user.png" alt={`Report ${index}`} className='w-[100%] h-[250px]  rounded-l-xl' />
                                )}
                                <div className='bg-slate-300 rounded-r-xl'>
                                    <div className='ml-5 mt-4'>
                                        <p className='text-center text-lg font-semibold underline'>ລາຍລະອຽດ </p>
                                        <p>ຊື່: {data.UserInfo.Name}</p>
                                        <p>ເບີໂທ:​ {data.UserInfo.Tel}</p>
                                        <p>ອີເມວ:​ {data.UserInfo.Email}</p>
                                        <p className=''>ລາຍລະອຽດ: {data.UserInfo.Title}</p>
                                        {data.UserInfo.VillageName && data.UserInfo.DistrictName && data.UserInfo.ProvinceName != '' ? (
                                            <p>ບ້ານ {data.UserInfo.VillageName}, ເມືອງ {data.UserInfo.DistrictName}, ແຂວງ {data.UserInfo.ProvinceName}</p>
                                        ) : (
                                            <p>ທີຢູ່:​ ຍັງບໍ່ມີຂໍ້ມູນກ່ຽວກັບທີ່ຢູ່ຂອງຜູ້ໃຊ້ດັ່ງກ່າວ</p>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>


                    ))}

                </div>
            </div>
            <div className='flex justify-center py-4 space-x-4 '>
                <IconButton onClick={prevPage}>
                    <ArrowLeftIcon className='h-5 w-5' />
                </IconButton>
                <Typography>{`${page + 1} / ${Math.ceil(length / itemsPerPage)}`}</Typography>
                <IconButton onClick={nextPage}>
                    <ArrowRightIcon className='h-5 w-5' />
                </IconButton>
            </div>
        </div>
    );
}

export default Report_info_emp;
