import Button from '@/component/Button'
import Dividers from '@/component/Dividers'
import Input from '@/component/Input'
import React, { useState } from 'react'

type Props = {
    data: {
        fullname: string,
        phone: string,
        address: string
    }
}

const EditInforCard = ({ data }: Props) => {

    const [fullname, setFullname] = useState<string>(data.fullname)
    const [phone, setPhone] = useState<string>(data.phone)
    const [address, setAddress] = useState<string>(data.address)

    const saveInfor = (body: any) => {
        console.log(body)
    }
    return (
        <div className='formcard'>
            <h1>infor</h1>
            <Input
                name='fullname'
                onChange={(e) => setFullname(e.target.value)}
                value={fullname}
                closefunc={() => setFullname("")}
                checkfunc={() => setFullname(fullname)}
            />
            <Input
                name='phone'
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                closefunc={() => setPhone("")}
                checkfunc={() => setPhone(phone)}
            />
            <Input
                name='address'
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                closefunc={() => setAddress("")}
                checkfunc={() => setAddress(address)}
            />
            <Button name='Save' onClick={() => saveInfor({ fullname, phone, address })} />
        </div>
    )
}

export default EditInforCard