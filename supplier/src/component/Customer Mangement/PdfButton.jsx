import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import companyLogo from '../../images/BuySell Nexus.png';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfButton = ({ customer }) => {
  const downloadPdf = () => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });


    const logoImage = new Image();
    logoImage.src = companyLogo;
    logoImage.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = logoImage.width;
      canvas.height = logoImage.height;
      ctx.drawImage(logoImage, 0, 0);
      const logoDataURL = canvas.toDataURL('image/png');
     
      const docDefinition = {
        content: [
          { text: `Report Created: ${currentDate}`, style: 'date' }, // Add current date
          {
            alignment: 'center', 
            image: logoDataURL,
            width: 200,
            margin: [0, 20], 
          },
          { text: 'BuySell Nexus,' },
          { text: 'Malabe,' },
          { text: 'Colombo,' },
          { text: '\n' },
          { text: `Customer Details`, style: 'header' },
          { text: '\n' },
          {

          layout: {
              fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex % 2 === 0) ? '#f2f2f2' : null; // Alternate row colors
              },
              hLineWidth: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 2 : 1; // Add thicker border at top and bottom
              },
              vLineWidth: function (i) {
                return (i === 0 || i === 9) ? 2 : 1; // Add thicker border at left and right
              },
            },

          table: {
            widths: ['auto', '*'],
            body: [
              [{ text: 'Customer Name', style: 'label' }, customer.name],
              [{ text: 'Contact Number', style: 'label' }, customer.number],
              [{ text: 'Address', style: 'label' }, customer.address],
              [{ text: 'Gender', style: 'label' }, customer.gender],
              [{ text: 'Email', style: 'label' }, customer.email],
              [{ text: 'Customer Type', style: 'label' }, customer.ctype],
              [{ text: 'Additional Information', style: 'label' }, customer.note],
              
            ],
          },
        },
        { text: '\n' }, { text: '\n' }, { text: '\n' }, { text: '\n' }, { text: '\n' },
        { text: 'This report Contains customer details for BuySell Nexus company (PVT) LTD.' },
        { text: '\n' },
        { text: '\n' },
        { text: '_____________', style:"space" }, // Signature line
        { text: '\n' },
        { text: 'Signature', style:"space" }, // Signature text

      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        label: {
          bold: true,
        },
        date: {
          fontSize: 10,
          alignment: "right",
        },
        space:{
          alignment: "right",
        }
      },
    };

    pdfMake.createPdf(docDefinition).download(`customer_${customer.name}.pdf`);
  };
};


  return (
    <button className='btn' id="PdfBtn" onClick={downloadPdf}>
      <i className='fas fa-download' id="PdfIcon"></i>
    </button>
  );
};

export default PdfButton;
