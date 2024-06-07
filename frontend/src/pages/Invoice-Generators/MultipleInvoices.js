import React, { useEffect, useState, useRef } from 'react';
import GenerateMultipleInvoice from './GenMultipleInvoice ';
import ReactToPrint from 'react-to-print';
import "./GenInvoice2.css";
import * as Icons from '@ant-design/icons';
const { PrinterOutlined } = Icons;

function MultipleInvoices() {
    const [allinvoices, setallinvoices] = useState([])
    const componentRef = useRef(null);

    useEffect(() => {
        const inv = localStorage.getItem("ExistingInvoice");
        const invObject = JSON.parse(inv);
        setallinvoices(invObject)
    }, [])

    console.log(allinvoices)

    // Function to generate a URL with invoice data encoded in parameters
    const generateShareableURL = () => {
        const serializedInvoices = encodeURIComponent(JSON.stringify(allinvoices));
        return `${window.location.origin}/view-monthly-invoices?data=${serializedInvoices}`;
    }

    return (
        <>
            <div className='printhead'>
                <ReactToPrint
                    trigger={() => <PrinterOutlined className='printbtn' style={{ fontSize: "30px" }} />}
                    content={() => componentRef.current}
                />
            </div>
            <div ref={componentRef} >
                {allinvoices.map((invoice, index) => (
                    <div className='page' key={index}>
                        <GenerateMultipleInvoice key={index} invoice={invoice} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default MultipleInvoices;
