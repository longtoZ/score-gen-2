import React from 'react'
import reactLogo from '../../assets/img/react-logo.png'
import nodeLogo from '../../assets/img/node-logo.png'
import expressLogo from '../../assets/img/express-logo.png'
import mysqlLogo from '../../assets/img/mysql-logo.png'
import tailwindLogo from '../../assets/img/tailwind-logo.png'
import chartLogo from '../../assets/img/chart-logo.png'


export const Tech = () => {
  return (
    <div className='Tech mt-[30rem] px-[20%]'>
        <h1 className='text-center font-semibold text-4xl'>Công cụ xây dựng</h1>

        <div className='tech-grid mt-[5rem] grid grid-cols-6 gap-4'>
            <div className='text-center rounded-lg p-4 logo relative'>
                <img src={reactLogo} className='h-[5rem] mx-auto react-logo' />
                <h1 className='font-semibold text-lg mt-2' >ReactJS</h1>
            </div>
            <div className='text-center rounded-lg p-4 logo relative'>
                <img src={nodeLogo} className='h-[5rem] mx-auto node-logo' />
                <h1 className='font-semibold text-lg mt-2' >NodeJS</h1>
            </div>
            <div className='text-center rounded-lg p-4 logo relative'>
                <img src={expressLogo} className='h-[5rem] mx-auto express-logo' />
                <h1 className='font-semibold text-lg mt-2' >ExpressJS</h1>
            </div>
            <div className='text-center rounded-lg p-4 logo relative'>
                <img src={mysqlLogo} className='h-[5rem] mx-auto mysql-logo' />
                <h1 className='font-semibold text-lg mt-2' >MySQL</h1>
            </div>
            <div className='text-center rounded-lg p-4 logo relative'>
                <img src={tailwindLogo} className='mb-[1rem] h-[4rem] mx-auto tailwind-logo' />
                <h1 className='font-semibold text-lg mt-2' >Tailwind</h1>
            </div>
            <div className='text-center rounded-lg p-4 logo relative'>
                <img src={chartLogo} className='h-[5rem] mx-auto mysql-logo' />
                <h1 className='font-semibold text-lg mt-2' >ChartJS</h1>
            </div>
        </div>

    </div>
  )
}
