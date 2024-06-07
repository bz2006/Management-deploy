import React, { useRef, useState, useEffect } from 'react';
import { Table, Input, Button, Spin, Space, DatePicker, message, Popconfirm } from 'antd';
import axios from "axios"
import "./allinv.css"
import Highlighter from 'react-highlight-words';
import { useNavigate } from "react-router-dom"
import moment from 'moment';
import HeaderComp from '../components/header';
import * as Icons from '@ant-design/icons';
const { SearchOutlined } = Icons;


const { RangePicker } = DatePicker;

function Allinvoices() {

    const [allinvoices, setallinvoices] = useState([])
    const [spinning, setSpinning] = useState(false);
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const searchInput = useRef(null);

    const FetchAllinvoices = async () => {
        try {
            setSpinning(true);
            const res = await axios.get("/api/v1/invoices/get-allinvoice")
            setallinvoices(res.data["Allinvoice"].map((data) => ({
                key: data["_id"],
                marketName: data["marketname"],
                invoiceNumber: data["invNo"],
                date: data["date"],
                tax: data["tax"],
                Tqty: data["Tqty"],
                subtotal: data["subtotal"],
                taxmeth: data["taxmeth"],
                grandtotal: data["grandtotal"]
            })))
            setFilteredData(res.data["Allinvoice"].map((data) => ({
                key: data["_id"],
                marketName: data["marketname"],
                invoiceNumber: data["invNo"],
                date: data["date"],
                tax: data["tax"],
                Tqty: data["Tqty"],
                subtotal: data["subtotal"],
                taxmeth: data["taxmeth"],
                grandtotal: data["grandtotal"]
            })))
            setSpinning(false);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        FetchAllinvoices()
    }, [])

    const FetchInvoice = async (id) => {
        try {
            setSpinning(true)
            const res = await axios.get(`/api/v1/invoices/get-invoice/${id}`)
            console.log(res.data["invoice"])
            setSpinning(false)
            localStorage.setItem("ExistingInvoice", JSON.stringify(res.data["invoice"]));

            window.open("/gen-existing-invoice", '_blank');
        } catch (error) {
            console.log(error);
        }
    }
    const DeleteInvoice = async (id) => {
        try {
            setSpinning(true)
            await axios.delete(`/api/v1/invoices/delete-invoice/${id}`)
            setSpinning(false)
            message.success("Invoice Deleted")
            FetchAllinvoices()
        } catch (error) {
            message.error("Request failed")
            console.log(error);
        }
    }
    const Updateinvoice = async (id) => {
        try {
            setSpinning(true)
            const res = await axios.get(`/api/v1/invoices/get-invoice/${id}`)
            console.log(res.data["invoice"])
            setSpinning(false)
            localStorage.setItem("Updateinvoice", JSON.stringify(res.data["invoice"]));
            navigate(`/update-invoice/${id}`)
        } catch (error) {
            message.error("Request failed")
            console.log(error);
        }
    }

    const UpdateAnalytics = async (date, GrandTotal, Tqty, record) => {

        const currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        day = (day < 10 ? '0' : '') + day;
        month = (month < 10 ? '0' : '') + month;
        var formattedDate = day + '.' + month + '.' + year;
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        const parts = date.split('.');
        const monthNumber = parseInt(parts[1]);
        const prft = Math.ceil(GrandTotal) * 0.53 - Math.ceil(GrandTotal)
        const profit = Math.ceil(Math.abs(prft))
        const Month = months[monthNumber - 1]
        const updateDate = formattedDate
        try {
            const res = await axios.post("/api/v1/analytics/delete-analytics", {
                profit: profit, Month: Month, year: year, updateDate: updateDate, sold: Tqty
            })
            console.log(res)
            DeleteInvoice(record);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDateFilter = (dates) => {
        if (!dates || dates.length !== 2) {
            setFilteredData(allinvoices);
            return;
        }

        let startDate = dates[0].format("YYYY.MM.DD");
        let endDate = dates[1].format("YYYY.MM.DD");

        const filteredInvoices = allinvoices.filter(invoice =>
            moment(invoice.date, "DD.MM.YYYY").isBetween(startDate, endDate, null, '[]')
        );

        setFilteredData(filteredInvoices);
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex, placeholder) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={placeholder || `Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'Invoice Number',
            dataIndex: 'invoiceNumber',

            key: 'invoiceNumber',
            ...getColumnSearchProps('invoiceNumber', 'Search Invoice Number'),
        },
        {
            title: 'Market Name',
            dataIndex: 'marketName',
            key: 'marketName',
            ...getColumnSearchProps('marketName', 'Search Market Name'),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',

        },
        {
            title: 'Grand Total',
            dataIndex: 'grandtotal',
            key: 'grandtotal',
        },

    ];




    const GenerateMRP = async (id,Date) => {
        let Models
        try {
            setSpinning(true)
            const res = await axios.get(`/api/v1/invoices/get-invoice/${id}`)
            console.log(res.data["invoice"]["billCont"])
            Models = res.data["invoice"]["billCont"]
            setSpinning(false)
            console.log(Models)
        } catch (error) {
            console.log(error)
        }

        let Combined = splitProducts(Models)
        let Organized = GroupModels(Combined)
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const ds = Date.split(".")
        const year = ds[2]
        const month = months[ds[1] - 1]
        const MrpData = [{
            Date: `${month} ${year}`,
            Models: Organized,
        }]

        console.log("orr",Organized);
        localStorage.setItem("mrp", JSON.stringify(MrpData));
        window.open("/generate-mrp", '_blank');
    }

    const splitProducts = (products) => {
        let result = [];
        products.forEach(product => {
            if (product.quantity > 1) {
                for (let i = 0; i < product.quantity; i++) {
                    result.push({ selectValue: product.model, inputValue: 1, mrp: product.mrp });
                }
            } else {
                result.push({ selectValue: product.model, inputValue: 1, mrp: product.mrp });
            }
        });
        return result;
    }


    const GroupModels = (array) => {
        const groupedObjects = [];
        for (let i = 0; i < array.length; i += 12) {
            groupedObjects[i / 12] = array.slice(i, i + 12);
        }
        return groupedObjects;
    }

    const Test = async (id) => {
        console.log(id)

    }

    return (
        <>
            <Spin spinning={spinning} fullscreen size='large' />
            <HeaderComp />
            <div>
                <div style={{ padding: '30px' }}>
                    <Space style={{ marginBottom: 5 }}>
                        <RangePicker onChange={handleDateFilter} format={"DD.MM.YYYY"} />
                    </Space>
                    <br />
                    <Table columns={columns} dataSource={filteredData} pagination={{ pageSize: 5 }}
                        expandable={{
                            expandedRowRender: (record) =>
                                <>
                                    <p style={{ margin: 0 }}>
                                        {record.taxmeth === "18%" ?
                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>

                                                <div style={{ display: "flex", alignItems: "flex-end", flexDirection: "column" }}>
                                                    <h6 className='invdet'>Total Qty : {record.Tqty}</h6>
                                                    <h6 className='invdet'>SubTotal : {record.subtotal}</h6>
                                                    <h6 className='invdet'>Tax 18% : {record.tax}</h6>
                                                    <h6 className='invdet'>Grand Total : ₹{record.grandtotal}.00</h6>
                                                </div>

                                                <Button onClick={() => { FetchInvoice(record.key) }} className='viewinv'>View Invoice</Button>
                                                <Button onClick={() => { Updateinvoice(record.key) }} className='viewinv'>Update invoice</Button>
                                                <Popconfirm
                                                    title="Are you sure you want to delete this invoice?"
                                                    description="This action cannot be undone and Invoice cannot be retrived!"
                                                    onConfirm={() => { UpdateAnalytics(record.date, record.grandtotal, record.Tqty, record.key) }}
                                                    okText="Yes"

                                                    cancelText="No"
                                                >
                                                    <Button className='viewinv'>Delete</Button>
                                                </Popconfirm>
                                            </div>
                                            :
                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>

                                                <div style={{ display: "flex", alignItems: "flex-end", flexDirection: "column" }}>
                                                    <h6 className='invdet'>Total Qty : {record.Tqty}</h6>
                                                    <h6 className='invdet'>SubTotal : {record.subtotal}</h6>
                                                    <h6 className='invdet'>Tax 9% : {record.tax}</h6>
                                                    <h6 className='invdet'>Tax 9% : {record.tax}</h6>
                                                    <h6 className='invdet'>Grand Total : {record.grandtotal}</h6>
                                                </div>

                                                <Button onClick={() => { FetchInvoice(record.key) }} className='viewinv'>View Invoice</Button>
                                                <Button onClick={() => { GenerateMRP(record.key,record.date) }} className='viewinv'>Generate MRP</Button>
                                                <Button onClick={() => { Updateinvoice(record.key) }} className='viewinv'>Update invoice</Button>
                                                <Popconfirm
                                                    title="Are you sure you want to delete this invoice?"
                                                    description="This action cannot be undone and Invoice cannot be retrived!"
                                                    onConfirm={() => { UpdateAnalytics(record.date, record.grandtotal, record.Tqty, record.key) }}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button className='viewinv'>Delete</Button>
                                                </Popconfirm>
                                            </div>
                                        }
                                    </p>
                                </>
                        }} />
                </div>
            </div>
        </>
    );
};


export default Allinvoices