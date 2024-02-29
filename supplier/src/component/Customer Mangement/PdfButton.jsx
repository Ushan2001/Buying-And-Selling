import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfButton = ({ customer }) => {
  const downloadPdf = () => {
    const docDefinition = {
      content: [
        { text: ` Customer Details (${customer._id})`, style: 'header' },
        { text: '\n' }, // Add some space
        {
          layout: 'form',
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

    pdfMake.createPdf(docDefinition).download(`customer_${customer.name}.pdf`);
  };

  return (
    <button className='btn btn-primary' onClick={downloadPdf}>
      <i className='fas fa-download'></i>&nbsp;PDF
    </button>
  );
};

export default PdfButton;
