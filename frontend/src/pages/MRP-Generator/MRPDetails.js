import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Select, InputNumber, Spin, DatePicker, Button } from "antd";
import HeaderComp from '../../components/header';
import "./mrpdet.css"
import * as Icons from '@ant-design/icons';
const { PlusOutlined } = Icons;
const { DeleteOutlined } = Icons;

function MRPDetails() {

    const [Models, setModels] = useState([])
    const [Modellist, setModellist] = useState([])
    const [Markets, setMarkets] = useState([])
    const [Marketplc, setMarketplc] = useState("")
    const [Date, setDate] = useState("")
    const [spinning, setSpinning] = useState(false);
    console.log(Marketplc);

    const GenerateMRP = () => {
        let Combined = splitProducts(Models)
        let Organized = GroupModels(Combined)

        const MrpData = [{
            Date: Date,
            Models: Organized,
        }]

        console.log(Organized);
        localStorage.setItem("mrp", JSON.stringify(MrpData));
        window.open("/generate-mrp", '_blank');
    }

    const splitProducts = (products) => {
        let result = [];
        products.forEach(product => {
            if (product.inputValue > 1) {
                for (let i = 0; i < product.inputValue; i++) {
                    result.push({ selectValue: product.selectValue, inputValue: 1, mrp: product.mrp });
                }
            } else {
                result.push(product);
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


    const FetchMarkets = async () => {
        try {
            setSpinning(true);
            const res = await axios.get("/api/v1/records/markets/get-markets")
            console.log(res)
            setSpinning(false);
            setMarkets(res.data["markets"].map(market => ({ value: market._id, label: market.marketname })))

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        FetchMarkets()
    }, [])

    const FetchCatlog = async (id) => {
        console.log("calog fetch")
        try {

            setSpinning(true);
            const res = await axios.get(`/api/v1/records/markets/get-market/${id}`)
            let catlog = (res.data["linkedcatlog"])
            // setFetchcatlog(catlog)
            const rescatlog = await axios.get(`/api/v1/records/catlog/get-catlog/${catlog}`)
            setSpinning(false);
            console.log(rescatlog.data)
            setModellist(rescatlog.data[0]["products"].map(catlog => ({ value: catlog.model, label: catlog.model, mrp: catlog.mrp })))
        } catch (error) {
            console.log(error)
        }
    }
    console.log(Modellist);
    const onChangeDate = (date, dateString) => {


        if (dateString) {
            //     const formattedDate = dateString.format('MMMM YYYY');
            // console.log(formattedDate); 
            setDate(dateString);
        }

    };

    

    const handleChange = (value, index, field) => {
        const updatedModels = [...Models];
       
        if (field === 'selectValue') {
            // Find the corresponding model object from Modellist
            const selectedModel = Modellist.find(model => model.value === value);
            if (selectedModel) {
                updatedModels[index] = {
                    selectValue: selectedModel.value,
                    inputValue: 1, // Default quantity to 1 when model is selected
                    mrp: selectedModel.mrp // Set MRP from Modellist
                };
            }
        } else {
            updatedModels[index] = { ...updatedModels[index], [field]: value };
        }
        setModels(updatedModels);
    };

    const handleAdd = () => {
       
        setModels([...Models, { selectValue: null, inputValue: 1 }]);
    };
    const handledel = (index) => {
        const updatedModels = [...Models];
        updatedModels.splice(index, 1);
        setModels(updatedModels);
    };

    console.log(Date, Models);
    return (
        <>
            <Spin spinning={spinning} fullscreen size='large' />
            <HeaderComp />
            <div style={{ display: "flex", flexDirection: "column", minWidth: "450px", alignItems: "flex-start", padding: "30px" }}>
                <div className='initselect'>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <Select
                            showSearch
                            style={{
                                width: 250, marginRight: "5%"
                            }}
                            size='large'
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label?.toLowerCase() ?? '').includes(input.toLowerCase())
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            defaultValue={Marketplc} // Assuming Marketplc is the default value
                            onChange={(value) => {
                                setMarketplc(value);
                                FetchCatlog(value);
                            }}
                        >

                            {Markets.map((market) => (
                                <Select.Option key={market.value} value={market.value} label={market.label}>
                                    {market.label}
                                </Select.Option>
                            ))}
                        </Select>
                        <DatePicker style={{
                            width: 250
                        }} onChange={onChangeDate} picker="month" size='large' format={"MMMM YYYY"} />
                    </div>
                </div>
                <div className='modelselect'>
                    {Models.map((model, index) => {
                        return (
                            <div style={{ display: "flex", marginBottom: "10px" }} key={index}>
                                <Select
                                    size='large'
                                    placeholder="Select Model"
                                    value={model.selectValue}
                                    onChange={(value) => handleChange(value, index, 'selectValue')}
                                    defaultValue="Model"
                                    style={{ width: "230px", marginTop: "5%", marginRight: "5%" }}
                                    options={Modellist}
                                />
                                <InputNumber
                                    min={1}
                                    value={model.inputValue}
                                    onChange={(value) => handleChange(value, index, 'inputValue')}
                                    defaultValue={1}
                                    style={{ width: "230px", marginRight: "5%", marginTop: "5%" }}
                                    size='large'
                                />
                                <DeleteOutlined onClick={() => { handledel(index) }} style={{ fontSize: "30px", marginBottom: "-28px" }} />
                            </div>
                        )
                    })}
                    <PlusOutlined style={{ fontSize: "40px", margin: "10px" }} onClick={handleAdd} />
                </div>
            </div>
            <Button className="genbtn" onClick={GenerateMRP}>Generate</Button>

        </>
    )
}

export default MRPDetails