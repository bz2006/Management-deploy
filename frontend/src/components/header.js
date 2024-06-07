import React, { useState, useEffect } from 'react';
import { Button, Layout, Avatar, Dropdown, Modal, Input, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from "axios"
import "./header.css"
import { useAuth } from '../context/auth';
const { Header } = Layout;


const HeaderComp = () => {

    const [auth, setAuth] = useAuth();
    const [open, setOpen] = useState(false);
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("***************");


    const [opennewad, setOpennewad] = useState(false);
    const [newadusername, setnewadusername] = useState("");
    const [newademail, setnewademail] = useState("");
    const [newadpassword, setnewadpassword] = useState("");


    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");

    };
    const items = [
        {
            key: '1',
            label: (
                <a >
                    Hi,
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a onClick={() => { GetUser(); setOpen(true) }}>
                    Account Settings
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a onClick={() => { setOpennewad(true) }}>
                    Add New Admin
                </a>
            ),
        },
        {
            key: '4',
            label: (
                <a onClick={handleLogout} href=''>
                    Log Out
                </a>
            ),
        },
    ];

    const AddnewAdmin = async () => {
        try {
            console.log(newadusername, newademail, newadpassword);
            const res = await axios.post("/api/v1/auth/signup", { username:newadusername,email:newademail,password:newadpassword });
            if (res && res.data.success) {
                message.success("New admin Added");
                setnewademail("")
                setnewadpassword("")
                setnewadusername("")
                setOpennewad(false)
            }
            console.log(res);
        } catch (error) {
            message.error("Request Failed")
            console.log(error)
        }

    }



const GetUser = async () => {
    try {
        const user = await axios.get(`/vm-api/v1/users/get-user/${auth.user._id}`)
        setusername(user.data.user.username)
        setemail(user.data.user.email)
    } catch (error) {
    }
}



const updtaename = async () => {
    try {
        await axios.post(`/vm-api/v1/users/update-username/${auth.user._id}`, username);
        GetUser()
        message.success("Username Updated")
    } catch (error) {
        message.error("Request Failed")
    }
}

const UpdatePass = async () => {
    try {
        await axios.post(`/vm-api/v1/users/update-pass/${auth.user._id}`, password);
        GetUser()
        message.success("Password Updated")

    } catch (error) {
        message.error("Request Failed")
    }
}

return (
    <>
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: "black"
                }}
            >
                <div className='imgdiv' href="/" >
                    <img style={{ width: "40%" }} src='https://static.wixstatic.com/media/c1ec53_3ff24b6f338749c3abbc5b0bc2ae6317~mv2.webp/v1/fill/w_375,h_94,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/LOGOw-min.webp' alt='' />
                </div>
                <div>
                    <Button className='navbtn' href='/'>Home</Button>
                    <Button className='navbtn' href='/web-management'>Website</Button>
                    <Button className='navbtn' href='/new-invoice'>New Invoice</Button>
                    <Button className='navbtn' href='/all-invoices'>All Invoices</Button>
                    <Button className='navbtn' href='/mrp-gen-details'>Generate MRP</Button>
                    <Button className='navbtn' href='/records'>Markets & Catlog</Button>

                </div>
                <Dropdown
                    menu={{
                        items,
                    }}
                    placement="bottomRight"
                    arrow
                >
                    <div className='avt'>
                        <Avatar icon={<UserOutlined />} size={'large'} />
                    </div>
                </Dropdown>

            </Header>
        </Layout>

        <>
            <Modal
                title="Account Settings"
                centered
                open={open}
                footer={null}
                onCancel={() => setOpen(false)}
                width={450}
            >

                <div className='accsettings'>
                    <div style={{ marginBottom: "20px", marginTop: "20px" }}>
                        <Input value={username} onChange={(event) => { setusername(event.target.value) }} size='large' style={{ width: "200px", marginRight: "5%" }} />
                        <Button size='large' onClick={updtaename}>Change username</Button>
                    </div>
                    <Input style={{ marginRight: "5%", width: "200px" }} value={email} size='large' readOnly />
                    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <Input value={password} type="password" onChange={(event) => { setpassword(event.target.value) }} size='large' style={{ width: "200px", marginRight: "5%" }} />
                        <Button size='large' onClick={UpdatePass}>Change Password</Button>
                    </div>
                </div>
            </Modal>
            <Modal
                title="Add New Admin"
                centered
                open={opennewad}
                footer={null}
                onCancel={() => setOpennewad(false)}
                width={450}
            >

                <div className='newadmin'>
                    <div style={{ marginBottom: "20px", marginTop: "20px" }}>
                        <Input value={newadusername} placeholder='Username' onChange={(event) => { setnewadusername(event.target.value) }} size='large' style={{ width: "250px", marginRight: "5%" }} />
                    </div>
                    <Input value={newademail} type="email" placeholder='Email' onChange={(event) => { setnewademail(event.target.value) }} size='large' style={{ width: "250px" }} />
                    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <Input value={newadpassword} type="password" placeholder='Password' onChange={(event) => { setnewadpassword(event.target.value) }} size='large' style={{ width: "250px", marginRight: "5%" }} />

                    </div>
                    <Button size='large' onClick={AddnewAdmin} style={{ width: "250px" }}>Add Admin</Button>
                </div>
            </Modal>
        </>
    </>
);
};
export default HeaderComp;