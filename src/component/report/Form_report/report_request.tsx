import React, { useEffect, useState } from 'react';
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import axios from 'axios';


interface ReportProps {
    componentRef: React.MutableRefObject<HTMLDivElement | null>
    title: string
}
interface ReportData {
    // Role: string
    // Name: string
    // Profile_IMG: string
    // Email: string
    // Tel: string
    // UserID: number
    // ID: number
    JobseekerID: number,
    EmployerID: number,
    Status: string,
    CreatedAt: string,
    UpdatedAt: string,
    UserInfo: userInfo
}
interface userInfo {
    Name: string
    Title: string
    Tel: string
    Email: string
    VillageName: string
    DistrictName: string
    ProvinceName: string
}

const ReportEmployer: React.FC<ReportProps> = ({ componentRef, title }) => {
    const [employerLenght, setEmployerLenght] = useState(0);
    const [reportData, setReportData] = useState<ReportData[]>([]);
    const myID = localStorage.getItem('ID')
    const myRole = localStorage.getItem('Role')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post<{ data: ReportData[] }>('http://localhost:3001/report_user_detail', { userID: myID, role: myRole });
                console.log("report_user :", response.data);

                // const employerCount = response.data.data.filter(e => e.Role === 'Employer').length;
                // const employerList = response.data.data.filter(e => e.Role === 'Employer');
                const employerCount = response.data.data.length;
                const employerList = response.data.data
                setReportData(employerList);
                setEmployerLenght(employerCount);
                console.log(`employer count: ${employerCount}`);
            } catch (error) {
                console.error('Error fetching report employer data:', error);
            }
        };
        fetchData();
    }, []);


    const chartConfig = {
        type: "pie" as "pie",
        width: 280,
        height: 280,
        series: [employerLenght],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: true,
                text: "",
            },
            dataLabels: {
                enabled: true,
                formatter: (val: number, opts: any) => {
                    return `${opts.w.config.labels[opts.seriesIndex]} \n ${val.toFixed(0)} %`
                },
                style: {
                    fontSize: '12.5px',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: '300',
                    colors: ['#000000'],
                },
            },
            colors: ["#FF4500", "#2482C6"],
            legend: {
                show: false,
            },
            labels: ["Jobseeker", "Employer"],
        },
    };


    return (
        <div ref={componentRef} className='bg-white  '>
            <div id='page1' className='h-[1000px] py-16 px-10 text-black font-notoLao'>
                <h1 className="text-base font-medium text-center">
                    <p>ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</p>
                    <p>ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນະຖາວອນ</p>
                </h1>
                <h2 className='text-2xl font-semibold text-center my-6 '>
                    <p>ລາຍງານຂໍ້ມູນຄຳຂໍເຂົ້າເຮັດວຽກ</p>
                </h2>
                <h3 className='break-words text-md'>ຫົວຂໍ້ລາຍງານ: {title}</h3>
                <h3 className='break-words text-sm'>ເນື້ອໃນບົດລາຍງານ:​  ຍິນດີຕ້ອນຮັບສູ່ບົດລາຍງານການໃຊ້ງານເວັບໄຊຂອງບໍລິສັດຂອງເຮົາ. ບົດລາຍງານນີ້ຈະເປັນການວິເຄາະຢ່າງລະອຽດກ່ຽວກັບການໃຊ້ງານຂອງຜູ້ໃຊ້ງານຢູ່ເວັບໄຊຂອງພວກເຮົາ. ບົດລາຍງານນີ້ໄດ້ລວມເອົາຂໍ້ມູນການເຂົ້າເບິ່ງແລະການໃຊ້ງານຕ່າງໆຢູ່ເວັບໄຊ. ພາຍໃນລະຍະເວລາການລາຍງານນີ້, ພວກເຮົາມີຜູ້ຮັບສະໝັກລວມທັງໝົດ {employerLenght} ຄົນທີ່ໄດ້ໃຊ້ງານເວັບໄຊຂອງພວກເຮົາ.  {employerLenght} ຄົນໄດ້ລົງທະບຽນສໍາເລັດແລ້ວເພື່ອຕ້ອນຮັບຜູ້ສະໝັກງານ. ບົດລາຍງານນີ້ຈະຄວາມໄດ້ຄວາມເຂົ້າໃຈໃນການໃຊ້ງານຂອງຜູ້ໃຊ້ງານ, ການດຶງຄວາມສົນໃຈ, ແລະສ່ວນທີ່ນິຍົມທີ່ໃຊ້ຫຼາຍທີ່ສຸດ. ເວັບໄຊຂອງພວກເຮົາພະຍາຍາມພັດທະນາເພື່ອໃຫ້ປະສົບການທີ່ດີທີ່ສຸດແກ່ຜູ້ໃຊ້ງານ ແລະ ສົ່ງເສີມການປະສົບຜົນສໍາເລັດຂອງພວກເຮົາ. </h3>
                <Card className='font-notoLao text-black'>
                    <p className="font-semibold my-4 text-center">ຂໍ້ມູນຜູ້ຊອກຫາວຽກທີ່ຕອບຮັບທັງໝົດ</p>

                    <table className=''>
                        <thead className="bg-slate-800  outline outline-1 outline-base-100  ">
                            <tr className="text-sm outline outline-1 hover">
                                <th className="text-gray-400 outline outline-1 w-1/12"></th>
                                <th className="text-gray-400 outline outline-1 w-2/6">ຊຶ່</th>
                                <th className="text-gray-400 outline outline-1 w-2/5">ທີ່ຢູ່</th>
                                <th className="text-gray-400 outline outline-1 w-2/6">ເບີໂທ</th>
                                {/* <th className="outline outline-1 rounded-tr-xl w-1/6"></th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {/* jobseeker */}
                            {Array.isArray(reportData) && reportData.map((e, index) => (
                                <tr className='outline outline-1 hover ' key={index}>
                                    <th className='outline outline-1'>
                                        <p className='font-normal text-sm'>{index + 1}</p>
                                    </th>
                                    <th className='outline outline-1'>
                                        <label className="flex justify-start ml-4">
                                            <div className="flex items-center ">
                                                <div>
                                                    <div className="text-sm font-normal">{e.UserInfo.Name}</div>
                                                </div>
                                            </div>
                                        </label>
                                    </th>
                                    <th className='outline outline-1'>
                                        <label className="flex justify-start ml-2">
                                            <div className="flex items-center ">
                                                <div>
                                                    {e.UserInfo.VillageName && e.UserInfo.DistrictName != '' ? (
                                                        <div className="text-sm font-normal">ບ້ານ {e.UserInfo.VillageName}, ເມືອງ {e.UserInfo.DistrictName}</div>
                                                    ) : (
                                                        <div className="text-sm font-normal">ຍັງບໍ່ມີຂໍ້ມູນກ່ຽວກັບທີ່ຢູ່ຂອງຜູ້ໃຊ້ດັ່ງກ່າວ</div>
                                                    )}

                                                </div>
                                            </div>
                                        </label>
                                    </th>
                                    <th className='outline outline-1'>
                                        <label className="flex justify-start ml-1">
                                            <div className="flex items-center ">
                                                <div>
                                                    <div className="text-sm font-normal">{e.UserInfo.Tel}</div>
                                                </div>
                                            </div>
                                        </label>
                                    </th>
                                </tr>
                            ))}
                            <tr className='outline outline-1 hover bg-slate-800'>
                                <th className='outline outline-1'>
                                    <p className='font-normal text-sm'></p>
                                </th>
                                <th className='outline outline-1'>
                                    <label className="flex justify-center">
                                        <div className="flex items-center ">
                                            <div>
                                                <div className="text-sm font-semibold text-gray-400">ລວມ</div>
                                            </div>
                                        </div>
                                    </label>
                                </th>
                                <th className='outline outline-1'>
                                    <label className="flex justify-center">
                                        <div className="flex items-center ">
                                            <div>
                                                <div className="text-sm font-semibold text-gray-400">{employerLenght} ຄົນ</div>
                                            </div>
                                        </div>
                                    </label>
                                </th>
                                <th className='outline outline-1'>
                                    <label className="flex justify-center">
                                        <div className="flex items-center ">
                                            <div>
                                                <div className="text-sm font-semibold text-gray-400"> </div>
                                            </div>
                                        </div>
                                    </label>
                                </th>
                            </tr>

                        </tbody>
                    </table>

                    {/* <CardBody className="mt-2 grid place-items-center px-2 ">
                        <Chart
                            options={chartConfig.options}
                            series={chartConfig.series}
                            type={chartConfig.type}
                            width={chartConfig.width}
                            height={chartConfig.height}
                        />
                    </CardBody> */}
                </Card>

                <div className='w-full grid grid-cols-3 mt-8'>
                    <p className='text-start text-sm'>   ລາຍເຊັນຜູ້ຮັບຮູ້</p>
                    <p className='text-center text-sm'>  ລາຍເຊັນໝ່ວຍງານ</p>
                    <div className='text-end text-sm'>
                        <p>ລົງວັນທີ..../..../.....</p>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default ReportEmployer;
