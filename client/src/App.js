import { useContext } from 'react';
import { MainRoutes } from './Routes';
import { ModeContext } from './utils/setModeContext';

function App() {
    const { theme } = useContext(ModeContext);

    document.body.setAttribute('data-theme', theme);

    return (
        <div className="App bg-bg-color text-text-color">
            <MainRoutes />
        </div>
    );
}

export default App;
