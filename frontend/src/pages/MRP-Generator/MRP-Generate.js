import React, { useEffect, useState, useRef } from 'react';
import "./mrpdet.css"
import ReactToPrint from 'react-to-print';
import * as Icons from '@ant-design/icons';
import MRPTemplate from './MRP-Template';
const { PrinterOutlined } = Icons;

function MRPGenerate() {
  const [Models, setModels] = useState([])
  const [Date, setDate] = useState("")
  const componentRef = useRef(null);

  useEffect(() => {
    const mrpdet = localStorage.getItem("mrp");
    const mrpObject = JSON.parse(mrpdet);
    console.log("onj",mrpObject[0]);
    setModels(mrpObject[0]["Models"])
    setDate(mrpObject[0]["Date"])
  }, [])


  window.addEventListener("beforeunload", function (event) {
    localStorage.removeItem('mrp');
});
console.log(Models,Date);
  return (
    <>
      <div className='printhead'>
        <ReactToPrint
          trigger={() => <PrinterOutlined className='printbtn' style={{ fontSize: "30px" }} />}
          content={() => componentRef.current}
        />
      </div>
      <div ref={componentRef} >
        {Models.map((Model, index) => (
          
            <div className='mpage' key={index} >
              <MRPTemplate key={index} Models={Model} Date={Date} />
            </div>
          

         ))} 
      </div>
    </>
  )
}

export default MRPGenerate;




