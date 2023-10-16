'use client'

import NotFound from '@/app/not-found'
import Button from '@/component/Button'
import Input from '@/component/Input'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
type Props = {
    name: string;
    func: (i: any) => void
}

const FormCard = ({ name, func }: Props) => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const router = useRouter()
    const inputBody = {
        username, password
    }
    const login = async (body: any) => {
        await fetch("http://localhost:3000/api/login", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then((data) => {
                setUsername("")
                setPassword("")
                localStorage.token = "Bearer " + data.token
                router.push('/')
            })
    }

    switch (name) {
        case "login":
            return (
                <div className="formcard">
                    <h1>LogIn</h1>
                    <Input type='text'
                        name='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        closefunc={() => setUsername("")}
                        checkfunc={() => setUsername(username)} />
                    <Input type='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        closefunc={() => setPassword("")}
                        checkfunc={() => setPassword(password)} />
                    <Button name='Log In' onClick={() => login(inputBody)} />
                </div>
            )
        case "signup":
            return (
                <div className="formcard">
                    <h1>Sign Up</h1>
                    <Input type='text'
                        name='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        closefunc={() => setUsername("")}
                        checkfunc={() => setUsername(username)} />
                    <Input type='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        closefunc={() => setPassword("")}
                        checkfunc={() => setPassword(password)} />
                    <Input type='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        closefunc={() => setEmail("")}
                        checkfunc={() => setEmail(email)} />
                    <Button name='Sign Up' onClick={() => func({ username, password, email })} />
                </div>
            )
        default:
            return <NotFound />
    }
}

export default FormCard