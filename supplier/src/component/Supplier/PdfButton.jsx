import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfButton = ({ supplier }) => {
  const downloadPdf = () => {
    const docDefinition = {
      content: [
        { text: ` Supplier Details (${supplier._id})`, style: 'header' },
        { text: '\n' }, // Add some space
        {
          layout: 'form',
          table: {
            widths: ['auto', '*'],
            body: [
              [{ text: 'Supplier Code', style: 'label' }, supplier.sid],
              [{ text: 'Name', style: 'label' }, supplier.name],
              [{ text: 'Address', style: 'label' }, supplier.address],
              [{ text: 'Product Name', style: 'label' }, supplier.product],
              [{ text: 'Amount', style: 'label' }, supplier.amount],
              [{ text: 'Quantity', style: 'label' }, supplier.quantity],
              [{ text: 'Date', style: 'label' }, supplier.date],
              [{ text: 'Additional Note', style: 'label' }, supplier.note],
              [{ text: 'Total Amount', style: 'label' }, supplier.totalAmount],
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

    pdfMake.createPdf(docDefinition).download(`supplier_${supplier.sid}_form.pdf`);
  };

  return (
    <button className='btn' id="PdfBtn" onClick={downloadPdf}>
      <i className='fas fa-download' id="PdfIcon"></i>
    </button>
  );
};

export default PdfButton;
