import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import App from './App';
import { ModeProvider } from './utils/setModeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ModeProvider>
            <App />
        </ModeProvider>
    </React.StrictMode>,
);
