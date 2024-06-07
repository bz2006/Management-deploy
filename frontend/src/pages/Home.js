import React, { useState, useEffect } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Statistic } from 'antd';
import Header from '../components/header'
import axios from 'axios';
import "./home.css"
import Chart from '../components/areaGraph';

function HomePage() {

    const [Data, setData] = useState([])
    const [Profit, setprofit] = useState(0)
    const [invNo, setinvNo] = useState(0)
    const [Sold, setSold] = useState(0)
    const [Monthname, setMonthname] = useState("")

    const [LastmProfit, setLastmprofit] = useState(0)
    const [LastminvNo, setLastminvNo] = useState(0)
    const [LastmSold, setLastmSold] = useState(0)

    const [LastordSold, setLastordSold] = useState(0)
    const [webrods, setwebrods] = useState(0)

    var currentDate = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var currentMonthName = months[currentDate.getMonth()];
    var lastMonthName = months[currentDate.getMonth() - 1];


    const FetchAnalytics = async () => {
        try {
            const res = await axios.get("/api/v1/analytics/get-analytics")
            console.log(res);
            const webord =""
            console.log(webord.data);
            setData(res.data.length > 0 && res.data.map((anlyct) => ({
                month: anlyct.monthname,
                Profit: anlyct.profit,
                Invs: anlyct.noinv

            })))
            for (let i of res.data) {
                if (i.monthname === currentMonthName) {
                    setprofit(i.profit)
                    setinvNo(i.noinv)
                    setSold(i.sold)
                }
                if (i.monthname === lastMonthName) {
                    setLastmprofit(i.profit)
                    setLastminvNo(i.noinv)
                    setLastmSold(i.sold)
                }
            }

            for (let i of webord.data) {
                if (i.monthname === currentMonthName) {
                    setwebrods(i.sold)
                }
                if (i.monthname === lastMonthName) {
                    setLastordSold(i.sold)
                }
            }

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {

        FetchAnalytics()
        setMonthname(currentMonthName)


    }, [])
console.log(Data);

    return (
        <>
            <Header />
            <div >
                <div className='anmain'>
                    {Data === false ?
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: "-40px", marginTop: "-40px" }}>
                            <img style={{ width: "400px" }} src='https://static-vision.s3.ap-south-1.amazonaws.com/%E2%80%94Pngtree%E2%80%94404+not+found+or+page_5595003.png' />
                        </div>
                        :

                        <div className='graphdiv'>
                            <Chart Data={Data} />
                        </div>}
                    <div className='bottomstat'>
                        <div className='stat'>
                            {Profit > LastmProfit ?
                                <Card bordered={false}>
                                    <Statistic
                                        title={`Profit Gained in ${Monthname}`}
                                        value={"₹" + Profit + ".00"}
                                        precision={2}
                                        valueStyle={{
                                            color: '#3f8600',
                                        }}
                                        prefix={<ArrowUpOutlined />}
                                    />
                                </Card> :
                                <Card bordered={false}>
                                    <Statistic
                                        title={`Profit Gained in ${Monthname}`}
                                        value={"₹" + Profit + ".00"}
                                        precision={2}
                                        valueStyle={{ color: '#cf1322' }}
                                        prefix={<ArrowDownOutlined />}
                                    />
                                </Card>
                            }

                        </div>
                        <div className='stat'>
                            {invNo > LastminvNo ?
                                <Card bordered={false}>
                                    <Statistic
                                        title={`No: of Invoices in ${Monthname}`}
                                        value={invNo}
                                        valueStyle={{
                                            color: '#3f8600',
                                        }}
                                        prefix={<ArrowUpOutlined />}
                                    />
                                </Card>
                                :
                                <Card bordered={false}>
                                    <Statistic
                                        title={`No: of Invoices in ${Monthname}`}
                                        value={invNo}
                                        valueStyle={{ color: '#cf1322' }}
                                        prefix={<ArrowDownOutlined />}
                                    />
                                </Card>
                            }

                        </div>
                        <div className='stat'>
                            {Sold > LastmSold ?
                                <Card bordered={false}>
                                    <Statistic
                                        title={`Clocks Sold in ${Monthname}`}
                                        value={Sold}
                                        valueStyle={{
                                            color: '#3f8600',
                                        }}
                                        prefix={<ArrowUpOutlined />}
                                        suffix="Clocks"
                                    />
                                </Card>
                                :
                                <Card bordered={false}>
                                    <Statistic
                                        title={`Clocks Sold in ${Monthname}`}
                                        value={Sold}
                                        valueStyle={{ color: '#cf1322' }}
                                        prefix={<ArrowDownOutlined />}
                                        suffix="Clocks"
                                    />
                                </Card>
                            }

                        </div>
                        <div className='stat'>
                            {webrods > LastordSold ?
                                <Card bordered={false}>
                                    <Statistic
                                        title={`Website Orders in ${Monthname}`}
                                        value={webrods}
                                        valueStyle={{
                                            color: '#3f8600',
                                        }}
                                        prefix={<ArrowUpOutlined />}
                                        suffix="Orders"
                                    />
                                </Card>
                                :
                                <Card bordered={false}>
                                    <Statistic
                                        title={`Website Orders in ${Monthname}`}
                                        value={webrods}
                                        valueStyle={{ color: '#cf1322' }}
                                        prefix={<ArrowDownOutlined />}
                                        suffix="Orders"
                                    />
                                </Card>
                            }
                        </div>
                        <div className='stat'>
                            <Card bordered={false}>
                                <Statistic
                                    title="Amazon Orders"
                                    value={0}
                                    valueStyle={{ color: '#cf1322' }}
                                    prefix={<ArrowDownOutlined />}
                                    suffix="Orders"
                                />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage