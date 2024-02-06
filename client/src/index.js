import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ModeProvider } from './utils/setModeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ModeProvider>
            <App />
        </ModeProvider>
    </React.StrictMode>,
);
