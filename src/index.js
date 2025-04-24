import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './main/App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App titulo="cadastro" />);