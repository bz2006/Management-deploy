import React, { useRef, useEffect, useState } from 'react'
import "./GenInvoice.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { Spin } from "antd";
import numberToWords from "number-to-words"
import ReactToPrint from 'react-to-print';
import * as Icons from '@ant-design/icons';
const { PrinterOutlined } = Icons;


const GenerateExistingInvoice = () => {

    const [spinning, setSpinning] = useState(false);
    const navigate = useNavigate()
    const componentRef = useRef(null);
    const [InvDet, setInvDet] = useState([])
    const [Items, setItems] = useState([])
    const [Markadrs, setMarkadrs] = useState([])
    const [marketid, setmarketid] = useState("")
    const [Catlog, setCatlog] = useState([])
    const [BillContent, setBillContent] = useState([])
    const [vendorcode, setvendorcode] = useState("")
    const [GSTIN, setGSTIN] = useState("")
    const [Markname, setMarkname] = useState("")
    const [Instruction, setinstruction] = useState("")
    const [VehicleNo, setVehicleNo] = useState("")
    const [Total, setTotal] = useState(0)
    const [GrandTotal, setGrandTotal] = useState(0)
    const [Tax, setTax] = useState(0)
    const [Tqty, setTqty] = useState(0)
    const [perm, setperm] = useState(true)
    const [confirm, setconfirm] = useState(false)
    
    window.addEventListener("beforeunload", function(event) {
        localStorage.removeItem('ExistingInvoice');
    });

    const FetchCatlog = async (id) => {
        console.log("calog fetch")
        try {

            setSpinning(true);
            const res = await axios.get(`/api/v1/records/markets/get-market/${id}`)
            setMarkadrs(res.data["markets"]["address"])
            setMarkname(res.data["markets"]["marketname"])
            setGSTIN(res.data["markets"]["gstNo"])
            setvendorcode(res.data["markets"]["vendorcode"])
            setSpinning(false);
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        setSpinning(true);
        const inv = localStorage.getItem("ExistingInvoice");
        const invObject = JSON.parse(inv);
        console.log(invObject)
        if (invObject !== null) {
            FetchCatlog(invObject.marketid)
            setInvDet(invObject)
            setItems(invObject["billCont"])
            // setMarkadrs(invObject[0]["marketDet"]["address"])
            // setMarkname(invObject["marketname"])

            setSpinning(false);
        } else {
            navigate("/all-invoices")
        }


    }, [])

    const amountwords = () => {
        const wordsWithDashes = numberToWords.toWords(Math.ceil(InvDet.grandtotal));
        const amountwords = wordsWithDashes.replace(/[-, ]/g, ' ')
        return amountwords.charAt(0).toUpperCase() + amountwords.slice(1)
    }
    
    return (
        <>
            <Spin spinning={spinning} fullscreen size='large' />
            <div className='printhead'>
                <ReactToPrint
                    trigger={() => <PrinterOutlined className='printbtn' style={{ fontSize: "30px" }} />}
                    content={() => componentRef.current}
                />
            </div>

            <div style={{ display: "flex", justifyContent: "center", }}>
                <div className='page' ref={componentRef} id='page'>
                    <div className='invmain'>
                        <div className='head'>
                            <img style={{ width: "45%", height: "35%" }} src='https://static.wixstatic.com/media/c1ec53_cdb43083bb05441ca9fb28a5027a7306~mv2.webp' alt='' ></img>
                            <h1 style={{ color: "black", fontSize: "xx-large" }}>Tax Invoice</h1>
                        </div>
                        <div className='subhead'>
                            <h4 className='compmadrs'>VISION INDUSTRIES</h4>
                            <h5 className='compadrs'>BRAHMAPURAM P.O, AMBALAMEDU - 682303</h5>
                            <h5 className='compadrs'>KOCHI, KERALA, INDIA</h5>
                            <h5 className='compadrs'>GSTIN NO : 32AEQPC7004Q1ZB</h5>
                            <h5 className='compadrs'>Phone : +91 9447580387, 9400990387</h5>
                            <h5 className='compadrs'>E mail : visionquartz@rediffmail.com</h5>
                            <h5 className='compadrs'>Udyog Aadhaar : UDYAM-KL-02-0018645</h5>
                        </div>
                        <h6 style={{ color: "black", marginBottom: "0px" }}>To,</h6>
                        <div className='invcontent'>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div className='marketdet'>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <h6 style={{ color: "black", textAlign: "start", marginTop: "0" }}>M/s</h6>
                                        <div style={{ marginBottom: "5px" }}>
                                            <h6 className='marketadrs1'>{Markname}</h6>
                                            {Markadrs.length > 0 && Markadrs.map((adr, index) => (
                                                <h6 key={index} className='marketadrs'>{adr}</h6>
                                            ))}
                                        </div>
                                    </div>

                                    <div className='gst'>
                                        <div>
                                            <h6 className='gst1'>GST No</h6>
                                        </div>
                                        <div>
                                            <h6 className='gst2'>{GSTIN}</h6>
                                        </div>
                                    </div>

                                </div>
                                <div className='billtype'>
                                    <div>
                                        <h6 style={{ color: "black", textAlign: "center", fontSize: "15px", fontFamily: "Rubik", fontWeight: "500" }}>CASH BILL</h6>
                                    </div>
                                </div>
                                <div className='billdet'>

                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <div className='billdet1t'>
                                            <h6 style={{ color: "black", margin: "0px", fontSize: "13px", paddingLeft: "2px", textAlign: "start", fontWeight: "500" }}>Invoice No</h6>
                                        </div>
                                        <div className='billdet2t'>
                                            <h6 style={{ color: "black", margin: "0px", fontSize: "14px", paddingLeft: "2px", justifyContent: "center", fontWeight: "600" }}>{InvDet.invNo}/24-25</h6>
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <div className='billdet1'>
                                            <h6 style={{ color: "black", margin: "0px", fontSize: "13px", textAlign: "start", paddingLeft: "2px", justifyContent: "center", fontWeight: "500" }}>Date</h6>
                                        </div>
                                        <div className='billdet2'>
                                            <h6 style={{ color: "black", margin: "0px", fontSize: "14px", justifyContent: "center", paddingLeft: "2px", fontWeight: "600" }}>{InvDet.date}</h6>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <div className='billdet1'>
                                            <h6 style={{ color: "black", margin: "0px", fontSize: "13px", textAlign: "start", paddingLeft: "2px", justifyContent: "center", fontWeight: "500" }}>PO Number</h6>
                                        </div>
                                        <div className='billdet2'>
                                            <h6 style={{ color: "black", margin: "0px", fontSize: "14px", justifyContent: "center", paddingLeft: "2px", fontWeight: "600" }}>{InvDet.poNo}</h6>
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <div className='billdet1v'>
                                            <h6 style={{ color: "black", margin: "0px", fontSize: "13px", textAlign: "start", justifyContent: "center", paddingTop: "4px", paddingLeft: "2px", fontWeight: "500" }}>Vendor code</h6>
                                        </div>
                                        <div className='billdet2v'>
                                            <h6 style={{ color: "black", margin: "0px", fontSize: "14px", justifyContent: "center", paddingLeft: "2px", paddingTop: "3px", fontWeight: "600" }}>{vendorcode}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table style={{ borderCollapse: "collapse" }}>
                                <tr>
                                    {InvDet.mrpart === "MRP" ? <th className='mrphead'>MRP</th> : <th className='mrphead'>Article No</th>}
                                    <th className='modelhead'>COMMODITY</th>
                                    <th className='hsnhead'>HSN CODE</th>
                                    <th className='unithead'>UNIT PRICE</th>
                                    <th className='qtyhead'>QUANTITY</th>
                                    <th className='grosshead'>GROSS PRICE</th>
                                </tr>
                            </table>
                            <table style={{ borderCollapse: "collapse", border: "0px" }}>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    {Items.length > 0 && Items.map((model, index) => (
                                        console.log(model.model)

                                    ))}
                                   <th className='mrp'>
                                        {Items.length > 0 && Items.map((model, index) => (
                                            InvDet.mrpart === "MRP" ? <h6 className='inovicecontent'>{model.mrp}</h6>: <h6 className='inovicecontent' style={{fontSize:"10px",marginTop:"9.5px"}}>{model.artno}</h6>

                                        ))}

                                    </th>
                                    <th className='model'>
                                        {Items.length > 0 && Items.map((model, index) => (
                                            <h6 className='inovicecontent'>{model.model}</h6>
                                        ))}
                                        <h6 className='instruction'>{Instruction}</h6>
                                    </th>
                                    <th className='hsn'>
                                        {Items.length > 0 && Items.map((model, index) => (
                                            <h6 className='inovicecontent'>9103</h6>
                                        ))}
                                    </th>
                                    <th className='unit'>
                                        {Items.length > 0 && Items.map((model, index) => (
                                            <h6 className='inovicecontent'>{model.unitPrice}.00</h6>
                                        ))}
                                    </th>
                                    <th className='qty' >
                                        {Items.length > 0 && Items.map((model, index) => (
                                            <h6 className='inovicecontent'>{model.quantity}</h6>
                                        ))}
                                        <h6 className='totalqty'>{InvDet.Tqty}</h6>
                                    </th>
                                    <th className='gross'>
                                        {Items.length > 0 && Items.map((model, index) => (
                                            <h6 className='inovicecontent'>{model.grossPrice}.00</h6>
                                        ))}
                                    </th>

                                </div>
                            </table>

                            <div style={{ display: "flex", flexDirection: "row" }}>

                                <div className='comapny'>
                                    <h6 className='comapnycont'>Amount in words:</h6>
                                    <h6 className='comapnycont'>{InvDet.grandtotal?amountwords():null}only</h6><br />
                                    <h6 className='comapnycont'>A/C No: {InvDet.AccNo}</h6>
                                    <h6 className='comapnycont'>IFS Code :SBIN0001108 </h6>
                                    <h6 className='comapnycont'>Branch: State Bank of India Ambalamedu</h6>
                                    <br /><br /><br /><br />
                                    {VehicleNo ? <h6 className='contbottom' style={{ fontWeight: "400", fontSize: "13px" }}>Vehicle No : {VehicleNo}</h6> : null}


                                </div>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <div className='amountname'>
                                        <h6 className='amtncont'>TOTAL</h6>
                                        <h6 className='amtncont'>AMOUNT</h6>
                                        {InvDet.taxmeth === "18%" ? <h6 className='amtncont'>IGST 18%</h6> :
                                            <>
                                                <h6 className='amtncont'>SGST 9%</h6>
                                                <h6 className='amtncont'>SGST 9%</h6>
                                            </>}

                                        <h6 className='amtncont'>GRAND TOTAL</h6>
                                    </div>
                                    <div className='bill'>
                                        <h6 className='billcont'>{InvDet.subtotal}.00</h6>
                                        <h6 className='billcont'>{InvDet.subtotal}.00</h6>
                                        {InvDet.taxmeth === "18%" ?
                                            <>
                                                <h6 className='billcont'>{InvDet.tax}</h6>
                                                <h6 className='billcont'>{Math.ceil(InvDet.grandtotal)}</h6>
                                                <br /><br /><br /><br />
                                            </>
                                            :
                                            <>
                                                <h6 className='billcont'>{InvDet.tax}.00</h6>
                                                <h6 className='billcont'>{InvDet.tax}.00</h6>
                                                <h6 className='billcont'>{Math.ceil(InvDet.grandtotal)}</h6>
                                                <br /><br /><br />
                                            </>}
                                        <h6 className='contbottom' style={{ fontWeight: "500", fontSize: "13px", }}>For Authorized Signatory</h6>
                                    </div>

                                </div>
                            </div>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default GenerateExistingInvoice

