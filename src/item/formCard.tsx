'use client'

import NotFound from '@/app/not-found'
import Button from '@/component/Button'
import Input from '@/component/Input'
import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '@/context/UserContext'
import { useRouter } from 'next/navigation'
type Props = {
    name: string;
    func: (i: any) => void
}

const FormCard = ({ name }: Props) => {
    const { changeI }: any = useContext(UserContext)

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [isError, setIsErrors] = useState<boolean>(true)
    const [Error, setErrors] = useState<{ username?: string, password?: string, email?: string }>({})
    const router = useRouter()
    const inputBody = {
        username, password
    }

    useEffect(() => {
        validateForm && validateForm();
    }, [username, password, email]);

    const validateForm = async () => {
        let errors: { username?: string, password?: string, email?: string } = {}

        if (username.length != 0 && 6 > username.length) {
            errors.username = 'username must be at least than 6'
        }
        if (username) {
            const isUsername = await fetch("http://localhost:3000/api/auth/checkuser?username=" + username)
                .then((res) => res.json())
                .then((data) => data)
            if (isUsername) { errors.username = "this username is existed" }
        }
        if (!/\S+@\S+\.\S+/.test(email) && email.length != 0) {
            errors.email = 'Email is invalid';
        }
        if (email) {
            const isEmail = await fetch("http://localhost:3000/api/auth/checkuser?email=" + email)
                .then((res) => res.json())
                .then((data) => data)
            if (isEmail) { errors.email = "this email is existed" }
        }
        if (password.length != 0 && password.length < 6) {
            errors.password = 'Password must be at least 6 characters.';
        }

        setIsErrors(Object.keys(errors).length || username === "" || password === "" || email === "" ? true : false);
        setErrors(errors)
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
                localStorage.token = "Bearer " + data.result
                router.push('/')
                changeI()
            })
    }

    const signup = async (body: any) => {
        await fetch("http://localhost:3000/api/signup", {
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
                setEmail("")
                console.log(data.message)
                router.push('/log/login')
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
                    />
                    <Input type='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
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
                        warn={Error.username} />
                    <Input type='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                        warn={Error.password} />
                    <Input type='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        warn={Error.email} />
                    {!isError ? <Button name='Sign Up' onClick={() => signup({ username, password, email })} /> : null}
                </div>
            )
        default:
            return <NotFound />
    }
}

export default FormCard