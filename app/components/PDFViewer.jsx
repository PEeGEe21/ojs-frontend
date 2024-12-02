import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import core PDF viewer components to avoid SSR issues
const Worker = dynamic(() => import('@react-pdf-viewer/core').then((mod) => mod.Worker), { ssr: false });
const Viewer = dynamic(() => import('@react-pdf-viewer/core').then((mod) => mod.Viewer), { ssr: false });

// Import default styles
import '@react-pdf-viewer/core/lib/styles/index.css';

// Optional: Import additional plugins if needed
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDFViewer = ({ 
  fileUrl, 
  height = '750px', 
  width = '100%' 
}) => {
  // State to track if the component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false);
  
  // Optional: Create default layout plugin
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If not mounted (during SSR), return null
  if (!isMounted) return null;

  return (
    <div style={{ height, width }}>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
        <Viewer 
          fileUrl={fileUrl}
          plugins={[defaultLayoutPluginInstance]}
        />
      </Worker>
    </div>
  );
};

export default PDFViewer;