import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfButton = ({ product }) => {
  const downloadPdf = () => {
    const docDefinition = {
      content: [
        { text: ` Customer Details (${product._id})`, style: 'header' },
        { text: '\n' }, // Add some space
        {
          layout: 'form',
          table: {
            widths: ['auto', '*'],
            body: [
              [{ text: 'Product Name', style: 'label' }, product.name],
              [{ text: 'Product Code', style: 'label' }, product.pid],
              [{ text: 'Product Category', style: 'label' }, product.type],
              [{ text: 'Description', style: 'label' }, product.description],
              [{ text: 'Price', style: 'label' }, product.price],
              [{ text: 'Quantity', style: 'label' }, product.quantity],
              [{ text: 'Add Date', style: 'label' }, product.date],
              
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

    pdfMake.createPdf(docDefinition).download(`customer_${product.pid}.pdf`);
  };

  return (
    <button className='btn btn-primary' onClick={downloadPdf}>
      <i className='fas fa-download'></i>&nbsp;PDF
    </button>
  );
};

export default PdfButton;
