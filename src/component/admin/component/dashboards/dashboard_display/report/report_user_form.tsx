import React from 'react';
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";

interface ReportProps {
    componentRef: React.MutableRefObject<HTMLDivElement | null>
    title: string
}

const ReportUserForm: React.FC<ReportProps> = ({ componentRef, title }) => {

    const chartConfig = {
        type: "pie" as "pie",
        width: 280,
        height: 280,
        series: [3, 6],
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
                    // return `${opts.w.config.labels[opts.seriesIndex]}: ${val.toFixed(1)}%`
                    return `${opts.w.config.labels[opts.seriesIndex]}: ${val.toFixed(0)} %`
                },
                style: {
                    fontSize: '16px',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold',
                    colors: ['#000000'],
                },
            },
            colors: ["#E2F72D", "#2482C6"],
            legend: {
                show: false,
            },
            labels: ["Jobseeker", "Employer"],
        },
    };

    return (
        <div ref={componentRef} className='bg-white  '>
            <div id='page1' className='h-[1000px] py-24 px-16 text-black font-notoLao'>
                <h1 className="text-base font-medium text-center">
                    <p>ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</p>
                    <p>ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນະຖາວອນ</p>
                </h1>
                <h2 className='text-2xl font-semibold text-center my-6 '>
                    <p>ບົດລາຍງານ</p>
                </h2>
                <h3 className='break-words text-md'>ຫົວຂໍ້ລາຍງານ: {title}</h3>
                <h3 className='break-words text-sm'>ເນື້ອໃນບົດລາຍງານ:​  ຍິນດີຕ້ອນຮັບສູ່ບົດລາຍງານການໃຊ້ງານເວັບໄຊຂອງບໍລິສັດຂອງເຮົາ. ບົດລາຍງານນີ້ຈະເປັນການວິເຄາະຢ່າງລະອຽດກ່ຽວກັບການໃຊ້ງານຂອງຜູ້ໃຊ້ງານຢູ່ເວັບໄຊຂອງພວກເຮົາ. ບົດລາຍງານນີ້ໄດ້ລວມເອົາຂໍ້ມູນການເຂົ້າເບິ່ງແລະການໃຊ້ງານຕ່າງໆຢູ່ເວັບໄຊ. ພາຍໃນລະຍະເວລາການລາຍງານນີ້, ພວກເຮົາມີຜູ້ໃຊ້ງານລວມທັງໝົດ 22 ຄົນທີ່ໄດ້ໃຊ້ງານເວັບໄຊຂອງພວກເຮົາ. ຈາກຈໍານວນນີ້, 15 ຄົນເປັນຜູ້ທີ່ກໍາລັງຫາໂອກາດຫາວຽກໃໝ່, ໃນຂະນະທີ່ 7 ຄົນໄດ້ລົງທະບຽນສໍາເລັດແລ້ວເພື່ອຕ້ອນຮັບຜູ້ສະໝັກງານ. ບົດລາຍງານນີ້ຈະຄວາມໄດ້ຄວາມເຂົ້າໃຈໃນການໃຊ້ງານຂອງຜູ້ໃຊ້ງານ, ການດຶງຄວາມສົນໃຈ, ແລະສ່ວນທີ່ນິຍົມທີ່ໃຊ້ຫຼາຍທີ່ສຸດ. ເວັບໄຊຂອງພວກເຮົາພະຍາຍາມພັດທະນາເພື່ອໃຫ້ປະສົບການທີ່ດີທີ່ສຸດແກ່ຜູ້ໃຊ້ງານ ແລະ ສົ່ງເສີມການປະສົບຜົນສໍາເລັດຂອງພວກເຮົາ. </h3>
                <Card className='font-notoLao text-black'>
                    {/* <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                >
                    <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                        <Square3Stack3DIcon className="h-6 w-6" />
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray">
                            Pie Chart
                        </Typography>
                        <Typography
                            variant="small"
                            color="gray"
                            className="max-w-sm font-normal"
                        >
                            Visualize your data in a simple way using the
                            @material-tailwind/react chart plugin.
                        </Typography>
                    </div>
                </CardHeader> */}
                    <CardBody className="mt-8 grid place-items-center px-2 ">
                        <p className="">ສະຖິຕິຜູ້ສະໝັກເວັບໄຊ</p>
                        <Chart
                            options={chartConfig.options}
                            series={chartConfig.series}
                            type={chartConfig.type}
                            width={chartConfig.width}
                            height={chartConfig.height}
                        />
                    </CardBody>
                </Card>

                <div className='w-full grid grid-cols-3 mt-20'>
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
