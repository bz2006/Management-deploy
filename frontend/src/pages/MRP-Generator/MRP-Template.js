import React, { useState, useEffect } from 'react'
import "./mrpdet.css"
function MRPTemplate({ Models ,Date}) {

    const [Details, setDetails] = useState();

    // useEffect to update Details when models prop changes
    useEffect(() => {
        setDetails(Models);
    }, []);

    console.log("det",Details,Models);
Models.map((model)=>(console.log(model)))

    return (
        <>
            {Models.map((model, index) => (
                <div id="mrp" key={index}>
                    <img src="https://bz-vision-web.visionwoodenclocks.com/uploads/LOGOgr.png" alt="" className="lggr" />
                    <h6 className="modno">Model No</h6>
                    <h6 className="col">:</h6>
                    <h6 className="modl">{model.selectValue}</h6>
                    <h6 className="mrpp">Maximum Retail Price</h6>
                    <h6 className="col2">:</h6>
                    <h6 className="mrc">{model.mrp}</h6>
                    <h6 className="incl">(Inclusive Of All Taxes)</h6>
                    <h6 className="manmy">MFD Month &amp; Year</h6>
                    <h6 className="col3">:</h6>
                    <h6 className="date">{Date}</h6>
                    <h6 className="mrpqty">Quantity</h6>
                    <h6 className="col4">:</h6>
                    <h6 className="mrpqtycon">This Box Contain Only</h6>
                    <h6 className="mrpqtycon2">One Quartz Clock</h6>
                    <h6 className="manfby">Manufatured By</h6>
                    <h6 className="col5">:</h6>
                    <h6 className="manfby1">VISION INDUSTRIES</h6>
                    <h6 className="manfby2">Brahmapuram, Cochin</h6>
                    <h6 className="manfby3">Kerala - 682303, India</h6>
                    <h6 className="custno">Customer Care No</h6>
                    <h6 className="col6">:</h6>
                    <h6 className="custnum">+91 9400990387</h6>
                    <h6 className="vuo">Visit Us On</h6>
                    <h6 className="col7">:</h6>
                    <h6 className="vuocont">www.visionwoodenclocks.com</h6>


                </div>
            ))}




        </>
    )
}

export default MRPTemplate