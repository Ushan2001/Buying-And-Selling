import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfButton = ({ payment }) => {
  const downloadPdf = () => {
    const docDefinition = {
      content: [
        { text: ` Payment Details (${payment._id})`, style: 'header' },
        { text: '\n' }, // Add some space
        {
          layout: 'form',
          table: {
            widths: ['auto', '*'],
            body: [
              [{ text: 'Payment Code', style: 'label' }, payment.tcode],
              [{ text: 'Seller Name', style: 'label' }, payment.sname],
              [{ text: 'Buyer Name', style: 'label' }, payment.bname],
              [{ text: 'Selling Amount', style: 'label' }, payment.samount],
              [{ text: 'Buying Amount', style: 'label' }, payment.bamount],
              [{ text: 'Payment Method', style: 'label' }, payment.method],
              [{ text: 'Date', style: 'label' }, payment.date],
              
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        label: {
          bold: true,
        },
      },
    };

    pdfMake.createPdf(docDefinition).download(`Payment_${payment.tcode}.pdf`);
  };

  return (
    <button className='btn btn-primary' onClick={downloadPdf}>
      <i className='fas fa-download'></i>&nbsp;PDF
    </button>
  );
};

export default PdfButton;
