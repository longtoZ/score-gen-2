import React from 'react';
import reactLogo from '../../assets/img/react-logo.png';
import nodeLogo from '../../assets/img/node-logo.png';
import expressLogo from '../../assets/img/express-logo.png';
import mysqlLogo from '../../assets/img/mysql-logo.png';
import tailwindLogo from '../../assets/img/tailwind-logo.png';
import chartLogo from '../../assets/img/chart-logo.png';

export const Tech = () => {
    return (
        <div className="Tech mt-[30rem] px-[20%]">
            <h1 className="text-center font-semibold text-4xl">
                Công cụ xây dựng
            </h1>

            <div className="mt-[5rem] flex justify-center flex-wrap gap-4">
                <div className="text-center rounded-lg p-4 logo relative">
                    <a href="https://react.dev/">
                        <img
                            src={reactLogo}
                            className="h-[5rem] mx-auto react-logo"
                        />
                    </a>
                    <h1 className="font-semibold text-lg mt-2">ReactJS</h1>
                </div>
                <div className="text-center rounded-lg p-4 logo relative">
                    <a href="https://nodejs.org/">
                        <img
                            src={nodeLogo}
                            className="h-[5rem] mx-auto node-logo"
                        />
                    </a>
                    <h1 className="font-semibold text-lg mt-2">NodeJS</h1>
                </div>
                <div className="text-center rounded-lg p-4 logo relative">
                    <a href="https://expressjs.com/">
                        <img
                            src={expressLogo}
                            className="h-[5rem] mx-auto express-logo"
                        />
                    </a>
                    <h1 className="font-semibold text-lg mt-2">ExpressJS</h1>
                </div>
                <div className="text-center rounded-lg p-4 logo relative">
                    <a href="https://www.mysql.com/">
                        <img
                            src={mysqlLogo}
                            className="h-[5rem] mx-auto mysql-logo"
                        />
                    </a>
                    <h1 className="font-semibold text-lg mt-2">MySQL</h1>
                </div>
                <div className="text-center rounded-lg p-4 logo relative">
                    <a href="https://tailwindcss.com/">
                        <img
                            src={tailwindLogo}
                            className="mb-[1rem] h-[4rem] mx-auto tailwind-logo"
                        />
                    </a>
                    <h1 className="font-semibold text-lg mt-2">Tailwind</h1>
                </div>
                <div className="text-center rounded-lg p-4 logo relative">
                    <a href="https://www.chartjs.org/">
                        <img
                            src={chartLogo}
                            className="h-[5rem] mx-auto mysql-logo"
                        />
                    </a>
                    <h1 className="font-semibold text-lg mt-2">ChartJS</h1>
                </div>
            </div>
        </div>
    );
};
