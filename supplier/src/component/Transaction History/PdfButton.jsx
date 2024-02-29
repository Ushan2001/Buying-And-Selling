import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfButton = ({ history }) => {
  const downloadPdf = () => {
    const docDefinition = {
      content: [
        { text: ` History Details (${history._id})`, style: 'header' },
        { text: '\n' }, // Add some space
        {
          layout: 'form',
          table: {
            widths: ['auto', '*'],
            body: [
              [{ text: 'History Code', style: 'label' }, history.tid],
              [{ text: 'Date', style: 'label' }, history.date],
              [{ text: 'Buyer Name', style: 'label' }, history.bname],
              [{ text: 'Seller Name', style: 'label' }, history.sname],
              [{ text: 'Product Name', style: 'label' }, history.pname],
              [{ text: 'Quantity', style: 'label' }, history.quantity],
              [{ text: 'Address', style: 'label' }, history.address],
              [{ text: 'Total Cost', style: 'label' }, history.cost],
              
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

    pdfMake.createPdf(docDefinition).download(`History_${history.tid}.pdf`);
  };

  return (
    <button className='btn btn-primary' onClick={downloadPdf}>
      <i className='fas fa-download'></i>&nbsp;PDF
    </button>
  );
};

export default PdfButton;
