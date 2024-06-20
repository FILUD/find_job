import React, { useEffect, useState } from 'react';
import { Card, CardBody, IconButton, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import axios from 'axios';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface ReportProps {
    componentRef: React.MutableRefObject<HTMLDivElement | null>
    title: string
}

interface ReportData {
    visited_at: string
}

const ReportVisitForm: React.FC<ReportProps> = ({ componentRef, title }) => {

    const initialChartConfig = {
        type: "line" as "line",
        width: 480,
        height: 280,
        series: [{
            name: "ຈຳນວນເຂົ້າໃຊ້ເວັບໄຊ",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }],

        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },

            xaxis: {
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
                stroke: {
                    lineCap: "round",
                    curve: "smooth",
                },
                markers: {
                    size: 0,
                },
                categories: [
                    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ],
            },
            colors: ["#020617"],
            plotOptions: {
                bar: {
                    columnWidth: "40%",
                    borderRadius: 2,
                },
            },
            dataLabels: {
                enabled: false,
            },

            yaxis: {
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
            },
            grid: {
                show: true,
                borderColor: "#dddddd",
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 5,
                    right: 20,
                },
            },
            fill: {
                opacity: 0.8,
            },
            tooltip: {
                theme: "dark",
            },
        },
    };

    const [chartConfig, setChartConfig] = useState(initialChartConfig);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const fetchData = async (year: number) => {
        try {
            const response = await axios.post<{ data: ReportData[] }>('http://localhost:3001/report_visit', { year });
            console.log("report_posting :", response.data.data);

            // Create a temporary array to store post counts for each month
            const tempCount = new Array(12).fill(0);

            response.data.data.forEach(item => {
                const visitDate = new Date(item.visited_at);
                const month = visitDate.getMonth();
                tempCount[month]++;
            });

            console.log("Monthly post counts: ", tempCount); // Debug log

            // Update the chart series data
            setChartConfig(prevConfig => ({
                ...prevConfig,
                series: [{
                    ...prevConfig.series[0],
                    data: tempCount
                }]
            }));
        } catch (error) {
            console.error('Error fetching report_user data:', error);
        }
    };

    useEffect(() => {
        fetchData(selectedYear);
    }, [selectedYear]);

    const incrementYear = () => {
        setSelectedYear(prevYear => prevYear + 1);
    };

    const decrementYear = () => {
        setSelectedYear(prevYear => prevYear - 1);
    };

    return (
        <div ref={componentRef} className='bg-white'>
            <div id='page1' className='h-[1000px] py-16 px-16 text-black font-notoLao'>
                <h1 className="text-base font-medium text-center">
                    <p>ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</p>
                    <p>ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນະຖາວອນ</p>
                </h1>
                <h2 className='text-2xl font-semibold text-center my-6'>
                    <p>ລາຍງານການເຂົ້າໃຊ້ເວັບໄຊ</p>
                </h2>
                <h3 className='break-words text-md'>ຫົວຂໍ້ລາຍງານ: {title}</h3>
                <h3 className='break-words text-sm'>ເນື້ອໃນບົດລາຍງານ:​ ລາຍງານນີ້ມີການວິເຄາະຢ່າງລະອຽດກ່ຽວກັບຈຳນວນສະຖິຕິການເຂົ້າໃຊ້ເວັບໄຊແຕ່ລະເດືອນ, ໂດຍໃຫ້ຄວາມສໍາຄັນກັບຄວາມຖີ່ແລະການແຈກຢາຍຂອງການປະກາດທີ່ໄດ້ຮັບຕະຫຼອດປີ. ຊ່ວຍລະບຸແນວໂນ້ມ ແລະໄລຍະເວລາສູງສຸດຂອງກິດຈະກໍາ. ນຳທາງຜ່ານປຸ່ມລຸ່ມນີ້ເພື່ອສຳຫຼວດຂໍ້ມູນປະຫວັດສາດ ແລະຄົ້ນພົບຮູບແບບຕ່າງໆຕາມເວລາ. ນີ້ອະນຸຍາດໃຫ້ມີການຕັດສິນໃຈທີ່ມີຂໍ້ມູນທີ່ດີກວ່າແລະການວາງແຜນຍຸດທະສາດສໍາລັບການຄຸ້ມຄອງເນື້ອຫາໃນອະນາຄົດ.</h3>



                <Card className='font-notoLao text-black mt-4'>
                    <p className="font-semibold my-4 text-center">ສະຖິຕິການເຂົ້າໃຊ້ເວັບໄຊ</p>

                    <CardBody className="mt-2 grid place-items-center px-2 pb-0 ">
                        <Chart {...chartConfig} />
                    </CardBody>
                    <div className='w-full flex justify-center mb-6'>
                        <div className="flex items-center gap-8">
                            <IconButton
                                size="sm"
                                variant="outlined"
                                onClick={decrementYear}
                            >
                                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                            </IconButton>
                            <Typography color="gray" className="font-normal">
                                {selectedYear}
                            </Typography>
                            <IconButton
                                size="sm"
                                variant="outlined"
                                onClick={incrementYear}
                            >
                                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                            </IconButton>
                        </div>
                    </div>
                </Card>

                <div className='w-full grid grid-cols-3 mt-8'>
                    <p className='text-start text-sm'>ລາຍເຊັນຜູ້ຮັບຮູ້</p>
                    <p className='text-center text-sm'>ລາຍເຊັນໝ່ວຍງານ</p>
                    <div className='text-end text-sm'>
                        <p>ລົງວັນທີ..../..../.....</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportVisitForm;
