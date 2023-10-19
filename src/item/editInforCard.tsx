'use client'
import Button from '@/component/Button'
import Dividers from '@/component/Dividers'
import Input from '@/component/Input'
import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import EditIcon from '@mui/icons-material/Edit';
import ButtonUpload from '@/component/ButtonUpload'
import { UserContext } from '@/context/UserContext'
type Props = {
    data: {
        fullname: string,
        avata: string,
        address: string,
        phone: string,

    },
    preAvata: (e: any) => void
}

const EditInforCard = ({ data, preAvata }: Props) => {

    const { changeI }: any = useContext(UserContext)

    const route = useRouter()
    const [fullname, setFullname] = useState<string>(data.fullname)
    const [avata, setAvata] = useState<string>(data.avata)
    const [phone, setPhone] = useState<string>(data.phone)
    const [address, setAddress] = useState<string>(data.address)
    const [edit, setEdit] = useState<Boolean>(false)

    const [avataFile, setAvataFile] = useState<any>()
    const [avataPre, setAvataPre] = useState()

    const getFile = async (e: any) => {
        var file = e.target.files[0];
        var reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setAvataPre(reader.result)
            setAvataFile(file)
            setAvata(file.name)
        }
    }

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append("file", avataFile);
        await fetch('http://localhost:3000/api/auth/image', {
            method: 'POST',
            body: formData,
        })

    }

    const saveInfor = async (infor: any) => {
        await uploadImage()
        const body: any = { infor }
        await fetch('http://localhost:3000/api/auth/user',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.token}`,
                },
                method: 'PUT',
                body: JSON.stringify(body)

            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                route.refresh()
            })
        changeI()
    }

    useEffect(() => {
        preAvata(avataPre)
    }, [avataPre])

    return (
        <div className='formcard'>
            <h1>infor {<EditIcon onClick={() => setEdit(!edit)} />}</h1>
            <Input
                name='fullname'
                onChange={(e) => setFullname(e.target.value)}
                value={fullname}
                dis={!edit}
            />
            <div className="avata">
                <Input
                    name='avata'
                    onChange={(e) => setAvata(e.target.value)}
                    value={avata}
                    dis={true}
                />
                {edit ? <ButtonUpload onChange={(e) => getFile(e)} /> : null}
            </div>
            <Input
                name='phone'
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                dis={!edit}
            />
            <Input
                name='address'
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                dis={!edit}
            />
            {edit ? <Button name='Save' onClick={() => saveInfor({ fullname, avata, phone, address })} /> : null}
        </div>
    )
}

export default EditInforCard