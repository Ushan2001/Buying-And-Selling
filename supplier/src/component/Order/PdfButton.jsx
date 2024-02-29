import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfButton = ({ order }) => {
  const downloadPdf = () => {
    const docDefinition = {
      content: [
        { text: ` Order Details (${order._id})`, style: 'header' },
        { text: '\n' }, // Add some space
        {
          layout: 'form',
          table: {
            widths: ['auto', '*'],
            body: [
              [{ text: 'Order Code', style: 'label' }, order.oid],
              [{ text: 'Customer Name', style: 'label' }, order.name],
              [{ text: 'Contact Number', style: 'label' }, order.number],
              [{ text: 'Quantity', style: 'label' }, order.quantity],
              [{ text: 'Date', style: 'label' }, order.date],
              [{ text: 'Address', style: 'label' }, order.address],
              [{ text: 'Additional Comments', style: 'label' }, order.note],
              
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

    pdfMake.createPdf(docDefinition).download(`order_${order.oid}_form.pdf`);
  };

  return (
    <button className='btn btn-primary' onClick={downloadPdf}>
      <i className='fas fa-download'></i>&nbsp;PDF
    </button>
  );
};

export default PdfButton;
