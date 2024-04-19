import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import "./order.css"
import pdfFonts from 'pdfmake/build/vfs_fonts';
import companyLogo from '../../images/BuySell Nexus.png';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfButton = ({ order }) => {
  const downloadPdf = () => {
    // get Currunt Date
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
          { text: `Order Details`, style: 'header' },
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
                [{ text: 'Order Code :', style: 'label', fillColor: '#f2f2f2' }, { text: order.oid, fillColor: '#ffffff' }],
                [{ text: 'Customer Name :', style: 'label', fillColor: '#f2f2f2' }, { text: order.name, fillColor: '#ffffff' }],
                [{ text: 'Address :', style: 'label', fillColor: '#f2f2f2' }, { text: order.address, fillColor: '#ffffff' }],
                [{ text: 'Quantity :', style: 'label', fillColor: '#f2f2f2' }, { text: order.quantity, fillColor: '#ffffff' }],
                [{ text: 'Date :', style: 'label', fillColor: '#f2f2f2' }, { text: order.date, fillColor: '#ffffff' }],
                [{ text: 'Additional Note :', style: 'label', fillColor: '#f2f2f2' }, { text: order.note, fillColor: '#ffffff' }],
                [{ text: 'Total Amount :', style: 'label', fillColor: '#f2f2f2' }, { text: order.totalAmount, fillColor: '#ffffff' }],
              ],
            },
          },
          { text: '\n' }, { text: '\n' }, { text: '\n' }, { text: '\n' }, { text: '\n' },
          { text: 'This report Contains Order details for BuySell Nexus company (PVT) LTD.' },
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

      pdfMake.createPdf(docDefinition).download(`order_${order.oid}.pdf`);
  };
};

  return (
    <button className='btn' id="PdfBtn" onClick={downloadPdf}>
      <i className='fas fa-download' id="PdfIcon"></i>
    </button>
  );
}
export default PdfButton;
