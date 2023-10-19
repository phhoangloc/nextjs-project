'use client'
import React from 'react'
import { useContext, useState } from 'react'
import { UserContext } from '@/context/UserContext'
import PageDetail from '@/item/PageDetail'

import EditInforCard from '@/item/editInforCard'
const Profile = () => {

    const { id, username, infor }: any = useContext(UserContext)
    const [avata, setAvata] = useState<any>("")

    const reCom =
        id ?
            <PageDetail
                name={username}
                img={avata ? avata : infor.avata ? '/img/avata/' + infor.avata : "/img/login.jpg"}
                component={<EditInforCard data={infor} preAvata={(data) => setAvata(data)} />}
            /> :
            <div className='main center'>
                <h1>Profile</h1>
                <h2>you are not login</h2>
            </div>
    return reCom
}

export default Profile