import React, { useState } from 'react';
import axios from 'axios';
import "./supplier.css"

const SupplierReport = () => {
  const [error, setError] = useState('');

  const getCurrentYearMonth = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
    return { year: currentYear, month: currentMonth };
  };

  const handleDownload = async () => {
    const { year, month } = getCurrentYearMonth();

    try {
      const response = await axios.get(`http://localhost:8070/supplier/report/${year}/${month}`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `supplier_report_${year}_${month}.pdf`);
      document.body.appendChild(link);
      link.click();
      setError('');
    } catch (error) {
      console.error('Error downloading supplier report:', error);
      setError('Error downloading supplier report. Please try again later.');
    }
  };



  return (
    <div>
        <div className='row'>
      <div className='col-md-10'>
     
      </div>
      <div className='col-md-1' style={{marginLeft:"-15%", marginTop:"-8%"}}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className='btn' onClick={handleDownload} id="PdfBtn1"><i className='fas fa-download' id="PdfIcon1"></i></button>
      </div>
    </div>
    </div>

  );
};

export default SupplierReport;
