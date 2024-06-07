import React, { useRef, useEffect, useState } from 'react'
import "./GenInvoice.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import numberToWords from "number-to-words"
import { Spin, Button, Modal } from "antd";
import ReactToPrint from 'react-to-print';

const GenerateUpdatedInvoice = () => {

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
    const [Invid, setinvid] = useState("")
    const [Markname, setMarkname] = useState("")
    const [Instruction, setinstruction] = useState("")
    const [Accno, setAccno] = useState("")
    const [VehicleNo, setVehicleNo] = useState("")
    const [Total, setTotal] = useState(0)
    const [GrandTotal, setGrandTotal] = useState(0)
    const [Tax, setTax] = useState(0)
    const [Tqty, setTqty] = useState(0)
    const [perm, setperm] = useState(true)
    const [confirm, setconfirm] = useState(false)
    // const wordsWithDashes = numberToWords.toWords(Math.ceil(GrandTotal));
    // const amountwords = wordsWithDashes.replace(/[-, ]/g, ' ');

    useEffect(() => {
        setSpinning(true);
        const inv = localStorage.getItem("Invdet");
        const invObject = JSON.parse(inv);
        if (invObject !== null) {
            setinvid(invObject[0]["invId"])
            setInvDet(invObject[0])
            setItems(invObject[0]["items"])
            setMarkadrs(invObject[0]["marketDet"]["address"])
            setCatlog(invObject[0]["catlog"])
            setvendorcode(invObject[0]["marketDet"]["vendorcode"])
            setGSTIN(invObject[0]["marketDet"]["gstNo"])
            setMarkname(invObject[0]["marketDet"]["marketname"])
            setinstruction(invObject[0]["Instructions"])
            setAccno(invObject[0]["AccNo"])
            setVehicleNo(invObject[0]["VehicleNo"])
            setmarketid(invObject[0]["marketid"])
            if (invObject[0]["addgstrec"] === false) {
                setconfirm(true)
            }
            setSpinning(false);
        } else {
            navigate("/new-invoice")
        }


    }, [])

    window.addEventListener("beforeunload", function (event) {
        localStorage.removeItem('Updateinvoice');
        localStorage.removeItem('Invdet');
    });
    function Organize(input) {
        const productInfo = [];
        input.forEach(item => {
            const product = Catlog.find(p => p.model === item.model);
            if (product) {
                const grossPrice = item.quantity * product.unitPrice;
                const info = {
                    model: item.model,
                    mrp: product.mrp,
                    unitPrice: product.unitPrice,
                    artno: product.articleNo || null,
                    quantity: item.quantity,
                    grossPrice: grossPrice
                };
                productInfo.push(info);
            }
        });
        return productInfo;
    }
    const Calculate = (Bill) => {
        let total = 0
        let tax = 0
        let quantity = 0
        for (let cal of Bill) {
            total = total + cal.grossPrice
            quantity = quantity + cal.quantity
        }
        setTqty(quantity)
        setTotal(total)
        if (InvDet.taxmeth === "18%") {
            tax = total * 0.18;
            setTax(tax)
            setGrandTotal(total + tax)
        } else {
            tax = total * 0.09;
            setTax(tax)
            setGrandTotal(total + tax + tax)
        }

    }

    const Bill = Organize(Items);
    console.log(Bill)
    useEffect(() => {
        if (Bill.length !== 0 || perm === true) {
            setBillContent(Bill);
            setperm(false);
            Calculate(Bill)
            //localStorage.removeItem('Invdet');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [perm]);

    console.log(BillContent)

    const UpdateAnalytics = async (OldTqty, Oldgtotal) => {
        console.log(OldTqty, Oldgtotal)

        const currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        day = (day < 10 ? '0' : '') + day;
        month = (month < 10 ? '0' : '') + month;
        var formattedDate = day + '.' + month + '.' + year;
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        const parts = InvDet.Date.split('.');
        const monthNumber = parseInt(parts[1]);
        const prft = Math.ceil(GrandTotal) * 0.53 - Math.ceil(GrandTotal)
        const profit = Math.ceil(Math.abs(prft))
        const Month = months[monthNumber - 1]
        const updateDate = formattedDate

        const Oldprft = Math.ceil(Oldgtotal) * 0.53 - Math.ceil(Oldgtotal)
        const Oldprofit = Math.ceil(Math.abs(Oldprft))
        // const updatedqty = Math.abs(OldTqty - Tqty)
        // const updatedprofit = Math.abs(Oldgtotal-GrandTotal)
        // console.log("oldg",Oldgtotal)
        // console.log("gt",GrandTotal);
        // console.log("uppr",updatedprofit,"profit",prft)

      

        try {
            await axios.post("/api/v1/analytics/update-analytics-invinit", {
                profit: Oldprofit, Month: Month, sold:OldTqty
            })
            const res = await axios.post("/api/v1/analytics/update-analytics-inv", {
                profit: profit, Month: Month, year: year, updateDate: updateDate, sold:Tqty
            })
            console.log(res)
        } catch (error) {
            console.log(error);
        }
    }


    const amountwords = () => {
        const wordsWithDashes = numberToWords.toWords(Math.ceil(GrandTotal));
        const words = wordsWithDashes.replace(/[-, ]/g, ' ')
        return words.charAt(0).toUpperCase() + words.slice(1)
    }

    const AddtoGSTrecord = async () => {
        setconfirm(true)
        try {
            setSpinning(true);
            const invData = {
                marketname: Markname,
                marketid: marketid,
                Markadrs: Markadrs,
                invNo: InvDet.invNo,
                date: InvDet.Date,
                poNo: InvDet.PO,
                mrpart: InvDet.mrp,
                billCont: BillContent,
                subtotal: Total,
                grandtotal: Math.ceil(GrandTotal),
                tax: Tax.toFixed(2),
                vehicleNo: VehicleNo,
                AccNo: Accno,
                instruction: Instruction,
                Tqty: Tqty,
                taxmeth: InvDet.taxmeth
            }
            const res = await axios.get(`/api/v1/invoices/get-invoice/${Invid}`)
            const OldTqty = res.data.invoice["Tqty"]
            const Oldgtotal = res.data.invoice["grandtotal"]
            await axios.post(`/api/v1/invoices/update-invoice/${Invid}`, invData)
            UpdateAnalytics(OldTqty, Oldgtotal)
            setSpinning(false);
            window.open("/all-invoices", '_blank');
        } catch (error) {

        }
    }
    const handleConfirm = async () => {
        try {
            await Modal.confirm({
                title: 'Update GST Records',
                content: (
                    <div style={{ fontSize: '16px' }}>
                        <p>{`Are you sure to update ${InvDet.invNo} Invoice for ${Markname}`}</p>
                        <p>{"This procces cannot be undone!"}</p>
                    </div>
                ),
                centered: true,
                okText: 'Yes',
                cancelText: 'No',
                onOk: () => AddtoGSTrecord(),
            });

        } catch (error) {
            console.error('An error occurred: ', error);
        }
    };



    return (
        <>
            <Spin spinning={spinning} fullscreen size='large' />
            {InvDet.addgstrec === false || (InvDet.addgstrec === true && confirm === true) ?
                <ReactToPrint
                    trigger={() => <Button className='printbtn' >Print</Button>}
                    content={() => componentRef.current}
                /> : <Button className='printbtn' onClick={handleConfirm}>Verify & Confirm the Invoice</Button>}


            <div style={{ display: "flex", justifyContent: "center", }}>
                <div className='page' ref={componentRef}>
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
                                            <h6 style={{ color: "black", margin: "0px", fontSize: "14px", justifyContent: "center", paddingLeft: "2px", fontWeight: "600" }}>{InvDet.Date}</h6>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <div className='billdet1'>
                                            <h6 style={{ color: "black", margin: "0px", fontSize: "13px", textAlign: "start", paddingLeft: "2px", justifyContent: "center", fontWeight: "500" }}>PO Number</h6>
                                        </div>
                                        <div className='billdet2'>
                                            <h6 style={{ color: "black", margin: "0px", fontSize: "14px", justifyContent: "center", paddingLeft: "2px", fontWeight: "600" }}>{InvDet.PO}</h6>
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
                                    {InvDet.mrp === "MRP" ? <th className='mrphead'>MRP</th> : <th className='mrphead'>Article No</th>}
                                    <th className='modelhead'>COMMODITY</th>
                                    <th className='hsnhead'>HSN CODE</th>
                                    <th className='unithead'>UNIT PRICE</th>
                                    <th className='qtyhead'>QUANTITY</th>
                                    <th className='grosshead'>GROSS PRICE</th>
                                </tr>
                            </table>
                            <table style={{ borderCollapse: "collapse", border: "0px" }}>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    {BillContent.length > 0 && BillContent.map((model, index) => (
                                        console.log(model.model)

                                    ))}
                                    <th className='mrp'>
                                        {BillContent.length > 0 && BillContent.map((model, index) => (
                                            InvDet.mrp === "MRP" ? <h6 className='inovicecontent'>{model.mrp}</h6> : <h6 className='inovicecontent' style={{ fontSize: "10px", marginTop: "9.5px" }}>{model.artno}</h6>

                                        ))}

                                    </th>
                                    <th className='model'>
                                        {BillContent.length > 0 && BillContent.map((model, index) => (
                                            <h6 className='inovicecontent'>{model.model}</h6>
                                        ))}
                                        <h6 className='instruction'>{Instruction}</h6>
                                    </th>
                                    <th className='hsn'>
                                        {BillContent.length > 0 && BillContent.map((model, index) => (
                                            <h6 className='inovicecontent'>9103</h6>
                                        ))}
                                    </th>
                                    <th className='unit'>
                                        {BillContent.length > 0 && BillContent.map((model, index) => (
                                            <h6 className='inovicecontent'>{model.unitPrice}.00</h6>
                                        ))}
                                    </th>
                                    <th className='qty' >
                                        {BillContent.length > 0 && BillContent.map((model, index) => (
                                            <h6 className='inovicecontent'>{model.quantity}</h6>
                                        ))}
                                        <h6 className='totalqty'>{Tqty}</h6>
                                    </th>
                                    <th className='gross'>
                                        {BillContent.length > 0 && BillContent.map((model, index) => (
                                            <h6 className='inovicecontent'>{model.grossPrice}.00</h6>
                                        ))}
                                    </th>

                                </div>
                            </table>




                            <div style={{ display: "flex", flexDirection: "row" }}>


                                <div className='comapny'>
                                    <h6 className='comapnycont'>Amount in words:</h6>
                                    <h6 className='comapnycont'>{GrandTotal ? amountwords() : null} only</h6><br />
                                    <h6 className='comapnycont'>A/C No: {Accno}</h6>
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
                                        <h6 className='billcont'>{Total}.00</h6>
                                        <h6 className='billcont'>{Total}.00</h6>
                                        {InvDet.taxmeth === "18%" ?
                                            <>
                                                <h6 className='billcont'>{Tax.toFixed(2)}</h6>
                                                <h6 className='billcont'>{Math.ceil(GrandTotal)}</h6>
                                                <br /><br /><br /><br />
                                            </>
                                            :
                                            <>
                                                <h6 className='billcont'>{Tax.toFixed(2)}</h6>
                                                <h6 className='billcont'>{Tax.toFixed(2)}</h6>
                                                <h6 className='billcont'>{Math.ceil(GrandTotal)}</h6>
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

export default GenerateUpdatedInvoice

