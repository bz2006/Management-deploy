import axios from "axios"

export const FetchMonthlyInvoices= async()=>{

    const currentDate = new Date();
    var lastmonth =currentDate.getMonth() 
    var year = currentDate.getFullYear();
    const startDate = `01.${lastmonth}.${year}`
    const endDatecr = new Date(year, lastmonth, 0).toLocaleDateString('en-GB');
    const endDate = endDatecr.split('/').join('.');
//console.log("check",startDate,endDate);
try {
    const res = await axios.get("http://localhost:3001/api/v1/invoices/get-monthly-invoices",{
        params: {
            startDate: startDate,
            endDate: endDate
          }
    })
    //console.log(res.data["allinvoices"])
    const serializedInvoices = encodeURIComponent(JSON.stringify(res.data["allinvoices"]));
    return `http://localhost:3000/view-monthly-invoices?data=${serializedInvoices}`;

} catch (error) {
    console.log(error)
}

}