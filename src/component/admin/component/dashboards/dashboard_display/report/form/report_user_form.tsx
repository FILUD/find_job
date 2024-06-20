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
    Role: string
    Name: string
    Profile_IMG: string
    Email: string
    Tel: string
    UserID: number
    ID: number
}

const ReportUserForm: React.FC<ReportProps> = ({ componentRef, title }) => {
    const [jobseekerLenght, setJobseekerLenght] = useState(0);
    const [employerLenght, setEmployerLenght] = useState(0);
    const [reportData, setReportData] = useState<ReportData[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post<{ data: ReportData[] }>('http://localhost:3001/report_user');
                console.log("report_user :", response.data);

                const jobseekerCount = response.data.data.filter(e => e.Role === 'Jobseeker').length;
                const employerCount = response.data.data.filter(e => e.Role === 'Employer').length;

                setReportData(response.data.data);
                setJobseekerLenght(jobseekerCount);
                setEmployerLenght(employerCount);

                console.log(`Jobseeker count: ${jobseekerCount}`);
                console.log(`Employer count: ${employerCount}`);
            } catch (error) {
                console.error('Error fetching report_user data:', error);
            }
        };
        fetchData();
    }, []);


    const chartConfig = {
        type: "pie" as "pie",
        width: 280,
        height: 280,
        series: [jobseekerLenght, employerLenght],
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
            colors: ["#6495ED", "#F1916D"],
            legend: {
                show: false,
            },
            labels: ["Jobseeker", "Employer"],
        },
    };


    return (
        <div ref={componentRef} className='bg-white  '>
            <div id='page1' className='h-[1000px] py-16 px-16 text-black font-notoLao'>
                <h1 className="text-base font-medium text-center">
                    <p>ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</p>
                    <p>ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນະຖາວອນ</p>
                </h1>
                <h2 className='text-2xl font-semibold text-center my-6 '>
                    <p>ລາຍງານສະຖິຕິຜູ້ສະໝັກບັນຊີ</p>
                </h2>
                <h3 className='break-words text-md'>ຫົວຂໍ້ລາຍງານ: {title}</h3>
                <h3 className='break-words text-sm'>ເນື້ອໃນບົດລາຍງານ:​  ຍິນດີຕ້ອນຮັບສູ່ບົດລາຍງານການໃຊ້ງານເວັບໄຊຂອງບໍລິສັດຂອງເຮົາ. ບົດລາຍງານນີ້ຈະເປັນການວິເຄາະຢ່າງລະອຽດກ່ຽວກັບການໃຊ້ງານຂອງຜູ້ໃຊ້ງານຢູ່ເວັບໄຊຂອງພວກເຮົາ. ບົດລາຍງານນີ້ໄດ້ລວມເອົາຂໍ້ມູນການເຂົ້າເບິ່ງແລະການໃຊ້ງານຕ່າງໆຢູ່ເວັບໄຊ. ພາຍໃນລະຍະເວລາການລາຍງານນີ້, ພວກເຮົາມີຜູ້ໃຊ້ງານລວມທັງໝົດ {jobseekerLenght + employerLenght} ຄົນທີ່ໄດ້ໃຊ້ງານເວັບໄຊຂອງພວກເຮົາ. ຈາກຈໍານວນນີ້, {jobseekerLenght} ຄົນເປັນຜູ້ທີ່ກໍາລັງຫາໂອກາດຫາວຽກໃໝ່, ໃນຂະນະທີ່ {employerLenght} ຄົນໄດ້ລົງທະບຽນສໍາເລັດແລ້ວເພື່ອຕ້ອນຮັບຜູ້ສະໝັກງານ. ບົດລາຍງານນີ້ຈະຄວາມໄດ້ຄວາມເຂົ້າໃຈໃນການໃຊ້ງານຂອງຜູ້ໃຊ້ງານ, ການດຶງຄວາມສົນໃຈ, ແລະສ່ວນທີ່ນິຍົມທີ່ໃຊ້ຫຼາຍທີ່ສຸດ. ເວັບໄຊຂອງພວກເຮົາພະຍາຍາມພັດທະນາເພື່ອໃຫ້ປະສົບການທີ່ດີທີ່ສຸດແກ່ຜູ້ໃຊ້ງານ ແລະ ສົ່ງເສີມການປະສົບຜົນສໍາເລັດຂອງພວກເຮົາ. </h3>
                <Card className='font-notoLao text-black'>
                    <p className="font-semibold my-4 text-center">ສະຖິຕິຜູ້ສະໝັກບັນຊີ</p>
                    <table className='m-4'>
                        <thead className="bg-slate-800  outline outline-1 outline-base-100  rounded-t-xl ">
                            <tr className="text-sm outline outline-1 rounded-t-xl hover">
                                <th className="text-gray-400 outline outline-1 rounded-tl-xl  w-1/12"></th>
                                <th className="text-gray-400 outline outline-1 w-2/6">ປະເພດ</th>
                                <th className="text-gray-400 outline outline-1 w-1/6 ">ຈຳນວນ</th>
                                <th className="text-gray-400 outline outline-1 rounded-tr-xl w-1/6">ຫົວໜ່ວຍ</th>
                                {/* <th className="outline outline-1 rounded-tr-xl w-1/6"></th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {/* jobseeker */}
                            <tr className='outline outline-1 hover '>
                                <th className='outline outline-1'>
                                    <p className='font-normal text-sm'>1</p>
                                </th>
                                <th className='outline outline-1'>
                                    <label className="flex justify-start ml-4">
                                        <div className="flex items-center ">
                                            <div>
                                                <div className="text-sm font-normal">ຜູ້ຊອກຫາວຽກ</div>
                                            </div>
                                        </div>
                                    </label>
                                </th>
                                <th className='outline outline-1'>
                                    <label className="flex justify-center">
                                        <div className="flex items-center ">
                                            <div>
                                                <div className="text-sm font-normal">{jobseekerLenght}</div>
                                            </div>
                                        </div>
                                    </label>
                                </th>
                                <th className='outline outline-1'>
                                    <label className="flex justify-center">
                                        <div className="flex items-center ">
                                            <div>
                                                <div className="text-sm font-normal">ຄົນ</div>
                                            </div>
                                        </div>
                                    </label>
                                </th>
                            </tr>
                            {/* employer */}
                            <tr className='outline outline-1 hover '>
                                <th className='outline outline-1'>
                                    <p className='font-normal text-sm'>2</p>
                                </th>
                                <th className='outline outline-1'>
                                    <label className="flex justify-start ml-4">
                                        <div className="flex items-center ">
                                            <div>
                                                <div className="text-sm font-normal ">ຜູ້ຮັບສະໝັກ</div>
                                            </div>
                                        </div>
                                    </label>
                                </th>
                                <th className='outline outline-1'>
                                    <label className="flex justify-center">
                                        <div className="flex items-center ">
                                            <div>
                                                <div className="text-sm font-normal">{employerLenght}</div>
                                            </div>
                                        </div>
                                    </label>
                                </th>
                                <th className='outline outline-1'>
                                    <label className="flex justify-center">
                                        <div className="flex items-center ">
                                            <div>
                                                <div className="text-sm font-normal">ຄົນ</div>
                                            </div>
                                        </div>
                                    </label>
                                </th>
                            </tr>
                            {/* total */}
                            <tr className='outline outline-1 hover'>
                                <th className='outline outline-1 bg-slate-800'>
                                    
                                </th>
                                <th className='outline outline-1 bg-slate-800'>
                                    <label className="flex justify-center">
                                        <div className="flex items-center ">
                                            <div>
                                                <div className="text-sm font-normal  text-gray-400">ລວມ</div>
                                            </div>
                                        </div>
                                    </label>
                                </th>
                                <th className='outline outline-1 bg-slate-800'>
                                    <label className="flex justify-center">
                                        <div className="flex items-center ">
                                            <div>
                                                <div className="text-sm font-normal  text-gray-400">{jobseekerLenght + employerLenght}</div>
                                            </div>
                                        </div>
                                    </label>
                                </th>
                                <th className='outline outline-1 bg-slate-800'>
                                    <label className="flex justify-center">
                                        <div className="flex items-center ">
                                            <div>
                                                <div className="text-sm font-normal  text-gray-400">ຄົນ</div>
                                            </div>
                                        </div>
                                    </label>
                                </th>
                                
                            </tr>
                        </tbody>
                    </table>


                    <CardBody className="mt-2 grid place-items-center px-2 ">
                        <Chart
                            options={chartConfig.options}
                            series={chartConfig.series}
                            type={chartConfig.type}
                            width={chartConfig.width}
                            height={chartConfig.height}
                        />
                    </CardBody>
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

export default ReportUserForm;
