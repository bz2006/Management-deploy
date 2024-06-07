import React, { useState, useEffect } from 'react'
import "../pages/Records.css"
import axios from "axios"
import { Select, Table, Modal, message, Button, Popconfirm, Spin, Input } from "antd";
import * as Icons from '@ant-design/icons';
const { PlusOutlined } = Icons;
const { DeleteOutlined } = Icons;
const { SearchOutlined } = Icons

function MarketPlaces() {


    const [fetchcatlog, setFetchcatlog] = useState("")
    const [catname, setcatname] = useState("")
    const [tcatname, settcatname] = useState("")
    const [spinning, setSpinning] = useState(false);


    const [marketname, setmarketname] = useState("")
    const [gst, setgst] = useState("")
    const [address, setaddress] = useState([""])
    const [vendorcode, setvendorcode] = useState("")
    const [Catlog, setCatlog] = useState("")
    const [Markets, setMarkets] = useState([])

    const [upmarketname, setupmarketname] = useState("")
    const [upgst, setupgst] = useState("")
    const [upaddress, setupaddress] = useState([""])
    const [upvendorcode, setupvendorcode] = useState("")
    const [upCatlog, setupCatlog] = useState("")
    const [marketupdates, setmarketupdates] = useState([])


    const [Marketid, setMarketid] = useState("")

    const [updatemp, setupdatemp] = useState(false);
    const [addmp, setaddmp] = useState(false);
    const [updatecatlog, setupdatecatlog] = useState(false);
    const [addcatlog, setaddcatlog] = useState(false);
    const [Models, setModels] = useState([])
    const [options, setoptions] = useState([])

    const GetCatlog = async () => {
        setaddcatlog(false)
        try {
            const res = await axios.get("/api/v1/records/catlog/get-catlogs")
            setoptions(res.data.map(catlog => ({ value: catlog.catlogname, label: catlog.catlogname })))
        } catch (error) {

        }
    }
    const FetchMarkets = async () => {
        try {
            setSpinning(true);
            const res = await axios.get("/api/v1/records/markets/get-markets")
            setSpinning(false);
            setMarkets(res.data["markets"].map((data) => ({
                key: data["_id"],
                market: data["marketname"],
                gst: data["gstNo"],
                address: data["address"],
                vendor: data["vendorcode"],
                catlog: data["linkedcatlog"]
            })))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        FetchMarkets()
    }, [])


    const AddMarket = async () => {
        setaddmp(false)
        try {
            setSpinning(true);
            await axios.post("/api/v1/records/markets/new-market", { marketname, gst, address, vendorcode, Catlog })
            setSpinning(false);
            window.location.reload();
        } catch (error) {

        }
    }
    const handlemarketDelete = async (id) => {
        try {
            console.log(id, "delete")
            setSpinning(true);
            await axios.delete(`/api/v1/records/markets/delete-market/${id}`);
            FetchMarkets()
            setSpinning(false);
        } catch (error) {
            console.log(error)
        }
    };


    const HandleUpdateinit = (record) => {
        GetCatlog()
        setupdatemp(true)
        setMarketid(record["key"])
        setupmarketname(record["market"])
        setupgst(record["gst"])
        setupvendorcode(record["vendor"])
        setupaddress(record["address"])
        setupCatlog(record["catlog"])
    }
    const UpdateMarket = async () => {
        setupdatemp(false)
        console.log(upmarketname, upgst, upaddress, upvendorcode, upCatlog)
        try {
            setSpinning(true);
            await axios.post(`/api/v1/records/markets/update-market/${Marketid}`, { upmarketname, upgst, upaddress, upvendorcode, upCatlog })
            setSpinning(false);
            window.location.reload();
        } catch (error) {

        }
    }

    const handleChangeUpdate = (value, index) => {
        const updatedAddresses = [...upaddress];
        updatedAddresses[index] = value;
        setupaddress(updatedAddresses);
    };


    const handleAddUpdate = () => {
        const updatedAddresses = [...upaddress, ""];
        setupaddress(updatedAddresses);
    };


    const handleDeleteUpdate = (index) => {
        const updatedAddresses = [...upaddress];
        updatedAddresses.splice(index, 1);
        setupaddress(updatedAddresses);
    };

    const handleChange = (value, index) => {
        const updatedAddresses = [...address];
        updatedAddresses[index] = value;
        setaddress(updatedAddresses);
    };

    // Function to add a new input field
    const handleAdd = () => {
        setaddress([...address, ""]);
    };

    // Function to delete an input field
    const handleDelete = (index) => {
        const updatedAddresses = [...address];
        updatedAddresses.splice(index, 1);
        setaddress(updatedAddresses);
    };





    const mpcolumns = [
        {
            title: 'Market Name',
            dataIndex: 'market',
            key: 'market',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Search Market Name"
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => { confirm(); }}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={() => { confirm(); }}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Search
                    </Button>
                    <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </div>
            ),
            onFilter: (value, record) => record.market.toLowerCase().includes(value.toLowerCase()),
            filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        },
        {
            title: 'GST No',
            dataIndex: 'gst',
            key: 'gst',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Search GST No"
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => { confirm(); }}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={() => { confirm(); }}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Search
                    </Button>
                    <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </div>
            ),
            onFilter: (value, record) => record.gst ? record.gst.toLowerCase().includes(value.toLowerCase()) : false,
            filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        },

        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Vendor Code',
            dataIndex: 'vendor',
            key: 'vendor',
        },
        {
            title: 'Catlog',
            dataIndex: 'catlog',
            key: 'catlog',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button type="primary" onClick={() => { HandleUpdateinit(record) }} style={{marginRight:"10px"}}>Update</Button>
                    <Popconfirm
                        title="Delete Market Place"
                        description="Are you sure to delete this Market Place?"
                        onConfirm={() => handlemarketDelete(record["key"])}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger >Delete</Button>
                    </Popconfirm>
                </>
            ),
        },
    ];


    return (
        <>
            <Spin spinning={spinning} fullscreen size='large' />
            <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
            <Button type="primary" style={{margin:"20px"}} onClick={() => { GetCatlog(); setaddmp(true); }}>Add New Market</Button><br/><br/>
            </div>
            <div className="table-container">
                <Table pagination={{ pageSize: 5 }} columns={mpcolumns} dataSource={Markets} style={{ width: "fit-content", fontSize: "50px" }} />
            </div>
            <>
                <Modal
                    title="Add Market Place"
                    centered
                    open={addmp}
                    onOk={AddMarket}
                    onCancel={() => setaddmp(false)}
                    width={800}
                >
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <h5 style={{ marginRight: "24%" }}>Market Name</h5>
                            <h5 style={{ marginRight: "28%" }}>GST No</h5>
                            <h5 >Vendor Code</h5>
                        </div>

                        <div >
                            <Input
                                value={marketname}
                                onChange={(event) => setmarketname(event.target.value)}
                                placeholder="Market Name"
                                size='large'
                                style={{ width: "200px", marginRight: "50px" }}
                            />
                            <Input
                                value={gst}
                                onChange={(event) => setgst(event.target.value)}
                                placeholder="GST No"
                                size='large'
                                style={{ width: "200px", marginRight: "50px" }}
                            />
                            <Input
                                value={vendorcode}
                                onChange={(event) => setvendorcode(event.target.value)}
                                placeholder="Vendor Code"
                                size='large'
                                style={{ width: "200px", marginRight: "50px" }}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <h5 style={{ marginRight: "30%" }}>Address</h5>
                            <h5 >Link Catlog</h5>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ display: "flex", flexDirection: "column", marginRight: "20px", alignItems: "center" }}>
                                {address.map((address, index) => (
                                    <div key={index} style={{ marginBottom: "10px" }}>
                                        <Input
                                            value={address}
                                            onChange={(e) => handleChange(e.target.value, index)}
                                            placeholder="Address"
                                            size='large'
                                            style={{ width: "250px", marginRight: "10px" }}
                                        />
                                        <DeleteOutlined onClick={() => handleDelete(index)} style={{ fontSize: "20px", marginTop: "5px" }} />
                                    </div>
                                ))}
                                <PlusOutlined style={{ fontSize: "40px", marginRight: "100px", marginLeft: "30px" }} onClick={handleAdd} />


                            </div>

                            <Select
                                size='large'
                                value={Catlog}
                                onChange={(value) => setCatlog(value)}
                                defaultValue="Market Place"
                                style={{
                                    width: 200, marginRight: "5%"
                                }}
                                options={options}
                            />
                        </div>
                    </div>
                </Modal>
            </>
            <>
                <Modal
                    title="Update Market Place"
                    centered
                    open={updatemp}
                    onOk={UpdateMarket}
                    onCancel={() => setupdatemp(false)}
                    width={1000}
                >
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <h5 style={{ marginRight: "24%" }}>Market Name</h5>
                            <h5 style={{ marginRight: "28%" }}>GST No</h5>
                            <h5 >Vendor Code</h5>
                        </div>

                        <div >
                            <Input
                                value={upmarketname}
                                onChange={(event) => setupmarketname(event.target.value)}
                                placeholder="Market Name"
                                maxLength={22}
                                size='large'
                                style={{ width: "200px", marginRight: "50px" }}
                            />
                            <Input
                                value={upgst}
                                onChange={(event) => setupgst(event.target.value)}
                                placeholder="GST No"
                                size='large'
                                style={{ width: "200px", marginRight: "50px" }}
                            />
                            <Input
                                value={upvendorcode}
                                onChange={(event) => setupvendorcode(event.target.value)}
                                placeholder="Vendor Code"
                                size='large'
                                style={{ width: "200px", marginRight: "50px" }}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <h5 style={{ marginRight: "30%" }}>Address</h5>
                            <h5 >Link Catlog</h5>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ display: "flex", flexDirection: "column", marginRight: "20px", alignItems: "center" }}>
                                {upaddress.map((address, index) => (
                                    <div key={index} style={{ marginBottom: "10px" }}>
                                        <Input
                                            value={address}
                                            onChange={(e) => handleChangeUpdate(e.target.value, index)}
                                            placeholder="Address"
                                          
                                            size='large'
                                            style={{ width: "250px", marginRight: "10px" }}
                                        />
                                        <DeleteOutlined onClick={() => handleDeleteUpdate(index)} style={{ fontSize: "20px", marginTop: "5px" }} />
                                    </div>
                                ))}
                                <PlusOutlined style={{ fontSize: "40px", marginRight: "100px", marginLeft: "30px" }} onClick={handleAddUpdate} />
                            </div>

                            <Select
                                size='large'
                                value={upCatlog}
                                onChange={(value) => setupCatlog(value)}
                                defaultValue="Market Place"
                                style={{
                                    width: 200, marginRight: "5%"
                                }}
                                options={options}
                            />
                        </div>
                    </div>
                </Modal>
            </>
        </>
    )
}

export default MarketPlaces