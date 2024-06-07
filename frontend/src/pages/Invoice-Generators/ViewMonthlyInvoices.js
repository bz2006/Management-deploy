import React, { useEffect, useState, useRef } from 'react';
import GenerateMultipleInvoice from './GenMultipleInvoice ';
import ReactToPrint from 'react-to-print';
import "./GenInvoice2.css";
import * as Icons from '@ant-design/icons';
const { PrinterOutlined } = Icons;

function MonthlyInvoices() {
    const [allinvoices, setallinvoices] = useState([])
    const componentRef = useRef(null);
    const fetchInvoicesData = async () => {
        try {
            const searchParams = new URLSearchParams(window.location.search);
            const serializedData = searchParams.get('data');
            if (serializedData) {
                const parsedInvoices = JSON.parse(serializedData);
                setallinvoices(parsedInvoices);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        fetchInvoicesData()
    }, []);


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

export default MonthlyInvoices;
