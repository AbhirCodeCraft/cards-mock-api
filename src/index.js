import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { makeServer } from './modules/MirageServer'

makeServer();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

