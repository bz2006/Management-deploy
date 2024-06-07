import React, { useState, useEffect } from 'react'
import "../pages/Records.css"
import axios from "axios"
import { Select, Table, Modal, message, Button, Popconfirm, Input, Spin } from "antd";
import * as Icons from '@ant-design/icons';
const { PlusOutlined } = Icons;
const { DeleteOutlined } = Icons;


function Catlogs() {



    const [fetchcatlog, setFetchcatlog] = useState("")
    const [Catlog, setCatlog] = useState([])
    const [catname, setcatname] = useState("")
    const [spinning, setSpinning] = useState(false);
    const [tcatname, settcatname] = useState("")
    const [Catlogid, setCatlogid] = useState("")
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
    //console.log(Catlog)
    useEffect(() => {
        GetCatlog()
    }, [])

    const AddCatlog = async () => {
        setaddcatlog(false)
        try {
            setSpinning(true);
            await axios.post(`/api/v1/records/catlog/${catname}`, Models)
            setSpinning(false);
            window.location.reload();
        } catch (error) {

        }
    }
    const UpdateCatlog = async () => {
        setupdatecatlog(false)
        try {
            setSpinning(true);
            await axios.post(`/api/v1/records/catlog/update-catlog/${Catlogid}`, { catname, Models })
            setSpinning(false);
            window.location.reload();
        } catch (error) {

        }
    }
    console.log(Catlogid)
    const FetchCatlog = async () => {
        try {
            let keyvalue = 0
            setSpinning(true);
            const res = await axios.get(`/api/v1/records/catlog/get-catlog/${fetchcatlog}`)
            setSpinning(false);
            setCatlogid(res.data[0]["_id"])
            settcatname(res.data[0]["catlogname"])
            setcatname(res.data[0]["catlogname"])
            setCatlog(res.data[0]["products"].map((data) => ({
                key: keyvalue++,
                Model: data["model"],
                MRP: data["mrp"],
                unitprice: data["unitPrice"],
                artno: data["articleNo"]
            })))
        } catch (error) {
            console.log(error)
        }
    }
    const handleCatlogtDelete = async (id) => {
        try {
            console.log(id, "delete")
            setSpinning(true);
            await axios.delete(`/api/v1/records/catlog/delete-catlog/${Catlogid}`);
            setSpinning(false);
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    };

    const handleAddupdate = async () => {
        const newModel = { Model: '', MRP: 0, unitprice: 0, artno: '' };
        setModels([...Models, newModel]);
    };

    const handleChangeupdate = (value, index, field) => {
        const updatedModels = [...Models];
        updatedModels[index][field] = value;
        setModels(updatedModels);
    };

    const handleChange = (value, index, field) => {
        const updatedModels = [...Models];
        updatedModels[index] = { ...updatedModels[index], [field]: value };
        setModels(updatedModels);
    };

    const handleAdd = () => {
        setModels([...Models, { Model: "", MRP: "", unitprice: "", artno: "" }]);
    };

    const handledel = (index) => {
        const updatedModels = [...Models];
        updatedModels.splice(index, 1);
        setModels(updatedModels);
    };
    const confirm = (e) => {
        console.log(e);
        message.success('Market Place deleted');
    };

    const prcolumns = [
        {
            title: 'Model',
            dataIndex: 'Model',
            key: 'Model',
        },
        {
            title: 'MRP',
            dataIndex: 'MRP',
            key: 'MRP',
        },
        {
            title: 'Unit Price',
            dataIndex: 'unitprice',
            key: 'unitprice',
        },
        {
            title: 'Article No',
            dataIndex: 'artno',
            key: 'artno',
        },
    ];


    return (
        <>
     
            <div>
                <Spin spinning={spinning} fullscreen size='large' />
                <Select
                    size='large'
                    value={fetchcatlog}
                    onChange={(value) => setFetchcatlog(value)}
                    defaultValue="Market Place"
                    style={{
                        width: 200, marginRight: "5%"
                    }}
                    options={options}
                />
                <Button type="primary" style={{ marginRight: "50px" }} onClick={FetchCatlog}>Fetch Catlog</Button>
                <div>
                    <div style={{ display: "flex" }}>
                        <h1 style={{ color: "white", marginRight: "450px" }}>Catlog : {tcatname}</h1>
                        <Button type="primary" style={{ marginRight: "50px" }} onClick={() => setaddcatlog(true)}>Add</Button>
                        <Button type="primary" style={{ marginRight: "50px" }} onClick={() => { setModels(Catlog); setupdatecatlog(true) }}>Update</Button>
                        <Popconfirm
                            title="Delete Market Place"
                            description="Are you sure to delete this Market Place?"
                            onConfirm={handleCatlogtDelete}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>
                    </div>

                    <div className="table-container">
                        <Table columns={prcolumns} dataSource={Catlog} style={{ width: "fit-content", fontSize: "50px" }} />
                    </div>
                </div>
            </div>
            <>
                <Modal
                    title="Add Catlog"
                    centered
                    open={addcatlog}
                    onOk={AddCatlog}
                    onCancel={() => setaddcatlog(false)}
                    width={1000}
                >
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <div style={{ display: "flex", flexDirection: "column", minWidth: "600px", alignItems: "center" }}>
                            <Input
                                value={catname}
                                onChange={(event) => setcatname(event.target.value)}
                                placeholder="Catlog Name"
                                size='large'
                                style={{ width: "200px", marginBottom: "30px" }}
                            />
                            {Models.map((model, index) => {
                                return (
                                    <div style={{ display: "flex", marginBottom: "10px" }} key={index}>
                                        <Input
                                            value={model.model}
                                            onChange={(e) => handleChange(e.target.value, index, 'model')}
                                            placeholder="Model"
                                            size='large'
                                            style={{ width: "200px", marginRight: "10px" }}
                                        />
                                        <Input
                                            value={model.mrp}
                                            onChange={(e) => handleChange(e.target.value, index, 'mrp')}
                                            placeholder="MRP"
                                            type='number'
                                            size='large'
                                            style={{ width: "150px", marginRight: "10px" }}
                                        />
                                        <Input
                                            value={model.unitPrice}
                                            size='large'
                                            onChange={(e) => handleChange(e.target.value, index, 'unitPrice')}
                                            placeholder="Unit Price"
                                            type='number'
                                            style={{ width: "150px", marginRight: "10px" }}
                                        />
                                        <Input
                                            value={model.articleNo}
                                            size='large'
                                            onChange={(e) => handleChange(e.target.value, index, 'articleNo')}
                                            placeholder="Article No"
                                            style={{ width: "150px", marginRight: "10px" }}
                                        />
                                        <DeleteOutlined onClick={() => handledel(index)} style={{ fontSize: "20px", marginTop: "5px" }} />
                                    </div>
                                );
                            })}
                            <PlusOutlined style={{ fontSize: "30px", marginBottom: "10px" }} onClick={handleAdd} />
                        </div>
                    </div>
                </Modal>
            </>
            {/* --------------------------------- */}
            <>
                <Modal
                    title="Update Catlog"
                    centered
                    open={updatecatlog}
                    onOk={UpdateCatlog}
                    onCancel={() => setupdatecatlog(false)}
                    width={1000}
                >
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <div style={{ display: "flex", flexDirection: "column", minWidth: "600px", alignItems: "center" }}>
                            <Input
                                value={catname}
                                onChange={(event) => setcatname(event.target.value)}
                                placeholder="Catalog Name"
                                size='large'
                                style={{ width: "200px", marginBottom: "30px" }}
                            />
                            {Models.map((model, index) => (
                                <div style={{ display: "flex", marginBottom: "10px" }} key={index}>
                                    <Input
                                        value={model.Model}
                                        onChange={(e) => handleChangeupdate(e.target.value, index, 'Model')}
                                        placeholder="Model"
                                        size='large'
                                        style={{ width: "200px", marginRight: "10px" }}
                                    />
                                    <Input
                                        value={model.MRP}
                                        onChange={(e) => handleChangeupdate(e.target.value, index, 'MRP')}
                                        placeholder="MRP"
                                        type='number'
                                        size='large'
                                        style={{ width: "150px", marginRight: "10px" }}
                                    />
                                    <Input
                                        value={model.unitprice}
                                        onChange={(e) => handleChangeupdate(e.target.value, index, 'unitprice')}
                                        placeholder="Unit Price"
                                        type='number'
                                        size='large'
                                        style={{ width: "150px", marginRight: "10px" }}
                                    />
                                    <Input
                                        value={model.artno}
                                        onChange={(e) => handleChangeupdate(e.target.value, index, 'artno')}
                                        placeholder="Article No"
                                        size='large'
                                        style={{ width: "150px", marginRight: "10px" }}
                                    />
                                    <Button onClick={() => handledel(index)} style={{ marginTop: "5px" }} icon={<DeleteOutlined />} />
                                </div>
                            ))}
                            <Button onClick={handleAddupdate} style={{ fontSize: "30px", marginBottom: "10px" }} icon={<PlusOutlined />} />
                        </div>
                    </div>
                </Modal>
            </>
        </>
    )
}

export default Catlogs