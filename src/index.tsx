import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'
import { ToastContainer } from 'react-toastify';
import * as AOS from 'aos';
import 'aos/dist/aos.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})

AOS.init({ duration: 400 });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <App />
      <ToastContainer />
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
