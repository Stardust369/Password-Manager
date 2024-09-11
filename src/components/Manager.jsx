import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ url: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords)
            setPasswordArray(JSON.parse(passwords));
    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }


    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "icons/eyecross.png"
        }

    }

    const savePassword = () => {
        if (form.url.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))

            console.log([...passwordArray, form])
            setForm({ url: "", username: "", password: "" })

            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast('Error: Error occured!');
        }
    }

    const deletePassword = (id) => {
        console.log("Deleting password with id ", id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }
    const editPassword = (id) => {

        console.log("Editing password with id ", id)
        setForm(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))

    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-blue-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div></div>

            <h1 className='text-4xl font-bold text-center'>
                <span className='text-blue-600'>&lt;</span>
                <span>Pass</span>
                <span className='text-blue-400'>OP/&gt;</span>
            </h1>
            <p className='text-blue-800 text-lg text-center'>All your passwords safe here</p>

            <div className='flex flex-col p-4 text-black gap-7 items-center'>
                <input value={form.url} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-blue-500 w-full p-4 py-1' type="text" name="url" id="url" />

                <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                    <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-blue-500 w-full p-4 py-1' type="text" name="username" id="username" />
                    <div className="relative">

                        <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-blue-500 w-full p-4 py-1' type="password" name="password" id="password" />

                        <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                            <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
                        </span>
                    </div>

                </div>
                <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-blue-400 hover:bg-blue-300 rounded-full px-8 py-2 w-fit border border-blue-900'>
                    <lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover" >
                    </lord-icon>
                    Save</button>
            </div>

            {/*making the table to store password details*/}

            <div className='passwords'>
                <h2 className='font-bold text-2xl py-4'>Passwords</h2>
                {passwordArray.length === 0 && <div>Save some passwords to show here</div>}
                {passwordArray.length != 0 && <table className="table-auto w-full overflow-hidden mb-10">
                    <thead className='bg-blue-800 text-white'>
                        <tr>
                            <th className='py-2'>Site URL</th>
                            <th className='py-2'>Username</th>
                            <th className='py-2'>Password</th>
                            <th className='py-2'>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {passwordArray.map((item, index) => {
                            return <tr key={index}>
                                <td className="py-2 border-white text-center">
                                    <div className='flex items-center justify-center'>
                                        <a href={item.url} target='_blank'>{item.url}</a>
                                        <div className='copyicon cursor-pointer size-7' onClick={() => { copyText(item.url) }}></div>
                                        <lord-icon
                                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                            trigger="hover" >
                                        </lord-icon>
                                    </div>
                                </td>
                                <td className='py-2 border border-white text-center'>
                                    <div className='flex items-center justify-center '>
                                        <span>{item.username}</span>
                                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </div>
                                    </div>
                                </td>
                                <td className='py-2 border border-white text-center'>
                                    <div className='flex items-center justify-center '>
                                        <span>{item.password}</span>
                                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </div>
                                    </div>
                                </td>
                                <td className='justify-center py-2 border border-white text-center flex gap-2'>
                                    <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                    <img src="icons/edit.png" alt="dlt" />
                                    </span>
                                    <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                    <img src="icons/delete.png" alt="dlt" />
                                    </span>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>}
            </div>
        </>
    )
}

export default Manager