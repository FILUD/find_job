import React from 'react'
import SetNavbar from '../component/navbar/SetNavbar'
import { useTheme } from './../theme/theme';
import Footer from '../component/footer/Footer';

function About_Page() {

  const { theme } = useTheme();


  return (
    <html className='font-notoLao' data-theme={theme}>
      <div className='grid'>
        <SetNavbar />
        <div className='container justify-center justify-self-center'>
          <div className='w-full h-full'>
            <h1 className='bg-purple-900 w-full my-5 p-3 rounded-2xl text-2xl text-white text-center'>ກ່ຽວກັບເວບໄຊ້ພວກເຮົາ</h1>
            <div className='text-center'>
              <p className='text-xl font-bold pb-3'>ເວັບໄຊຮັບສະໝັກ ແລະ ຊອກຫາວຽກ</p>
              <p>ເວບໄຊນີ້ ຂຽນຂື້ນເພື່ອເປັນສ່ວນໜຶ່ງຂອງການຈົບການສຶກສາປະລິນຍາຕີ ສາຂາການສ້າງໂປຣແກມຄອມພິວເຕີ ສະຖາບັນ ເຕັກໂນໂລຊີ ສຸດສະກະ ລຸ້ນທີ 7</p>
              <p>ຂຽນໂດຍ :</p>
            </div>
            <div className='grid grid-cols-3 justify-items-center pt-7 text-center'>
              <div>
                <img className='rounded-full' src="/Image/george.jpg" alt="" />
                <p className='font-bold pt-3'>ທ. ພຸດທະສອນ ບຸນທະວົງ</p>
                <p>Georgebounthavong@icloud.com</p>
                <p>+856 20 56 591 696</p>
              </div>
              <div>
                <img className='rounded-full' src="/Image/kong.jpg" alt="" />
                <p className='font-bold pt-3'>ທ. ປະກາດເພັດ ໂພທະລາດ</p>
                <p>kongphotilad@gmail.com</p>
                <p>+856 20 92 436 968</p>
              </div>
              <div>
                <img className='rounded-full' src="/Image/tiktok.jpg" alt="" />
                <p className='font-bold pt-3'>ທ. ໄຟລັດ ມະຫາໂຄດ</p>
                <p>ticwoc@gmail.com</p>
                <p>+856 20 56 595 957</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </html>
  )
}

export default About_Page