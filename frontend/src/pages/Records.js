import React from 'react'
import HeaderComp from '../components/header'
import "./Records.css"
import { Tabs } from "antd";
import Catlogs from '../components/Catlogs';
import MarketPlaces from '../components/MarketPlaces';
const { TabPane } = Tabs;

function Records() {
    return (
        <>
            <HeaderComp />
            <div className='tabdiv'>
                <Tabs defaultActiveKey="1" >

                    <TabPane tab={<span style={{ color: 'white' }}>Market Places</span>} key="1">

                        <MarketPlaces />

                    </TabPane>

                    <TabPane tab={<span style={{ color: 'white' }}>Product Records</span>} key="2">

                        <Catlogs />

                    </TabPane>
                </Tabs>
            </div>

        </>

    )
}

export default Records