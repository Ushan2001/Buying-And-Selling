import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import companyLogo from '../../images/BuySell Nexus.png';


pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfButton = ({ history }) => {
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
          { text: `Transaction History Details`, style: 'header' },
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
              [{ text: 'History Code', style: 'label', fillColor: '#f2f2f2'  },{ text: history.tid, fillColor: '#ffffff' }],
              [{ text: 'Date', style: 'label', fillColor: '#f2f2f2'  },{ text: history.date, fillColor: '#ffffff' }],
              [{ text: 'Buyer Name', style: 'label',fillColor: '#f2f2f2'  },{ text: history.bname, fillColor: '#ffffff' }],
              [{ text: 'Seller Name', style: 'label' ,fillColor: '#f2f2f2'  },{ text: history.sname, fillColor: '#ffffff' }],
              [{ text: 'Product Name', style: 'label',fillColor: '#f2f2f2'  },{ text: history.pname, fillColor: '#ffffff' }],
              [{ text: 'Quantity', style: 'label',fillColor: '#f2f2f2'  },{ text: history.quantity, fillColor: '#ffffff' }],
              [{ text: 'Price', style: 'label',fillColor: '#f2f2f2'  },{ text: history.price, fillColor: '#ffffff' }],
              [{ text: 'Address', style: 'label',fillColor: '#f2f2f2'  },{ text: history.address, fillColor: '#ffffff' }],
              [{ text: 'Total Cost', style: 'label',fillColor: '#f2f2f2'  },{ text: history.totalAmount, fillColor: '#ffffff' }],
              
            ],
          },
        },
        { text: '\n' }, { text: '\n' }, { text: '\n' }, { text: '\n' }, { text: '\n' },
          { text: 'This report Contains Transaction History details for BuySell Nexus company (PVT) LTD.' },
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

    pdfMake.createPdf(docDefinition).download(`History_${history.tid}.pdf`);
  };
};

  return (
    <button className='btn' id="PdfBtn" onClick={downloadPdf}>
      <i className='fas fa-download'></i>&nbsp;
    </button>
  );
};

export default PdfButton;
