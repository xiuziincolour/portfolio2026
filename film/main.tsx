import React from 'react';
import ReactDOM from 'react-dom/client';
import VideoPage from '../components/VideoPage';
import Footer from '../components/Footer';
import '../index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <VideoPage />
    <Footer variant="dark" />
  </React.StrictMode>
);
