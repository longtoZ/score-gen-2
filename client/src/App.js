import React from 'react';
import { useContext, useEffect } from 'react';

import { MainRoutes } from './Routes';
import { ModeContext } from './utils/setModeContext';

function App() {
    const { theme } = useContext(ModeContext);

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div className="App bg-bg-color text-text-color overflow-hidden">
            <MainRoutes />
        </div>
    );
}

export default App;
