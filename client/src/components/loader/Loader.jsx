import React from 'react';

import './loader.css';

export const Loader = () => {
    return (
        <div className="block relative my-[4rem] w-full">
            <div className="dots-bars mx-auto scale-150"></div>
        </div>
    );
};
