
import React, { useState } from 'react';
import {  Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';



function TestPDF() {
  const pdfUrl = '/TestPDF/Clover.pdf';

  return (
    <center>
      <div style={{ width: '200px', height: '200px' }}>
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${'^3.11.174/build/pdf.worker.min.js'}`}>
          <Viewer fileUrl={pdfUrl} />
        </Worker>
      </div>
    </center>
  );
}

export default TestPDF;
