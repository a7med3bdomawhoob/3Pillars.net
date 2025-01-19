import axios from 'axios'
import React, { useState } from 'react'
import joi from 'joi';
import { useNavigate } from 'react-router-dom';
export default function Register() {

    let [data, setData] = useState({
        userName: '',
        // role: '',
        email: '',
        password: '',
    })

    let [message, setMessage] = useState('');
    let [validateError, setvalidateerror] = useState([])
    let [loading, setLoading] = useState(false)
    let navigate = useNavigate();
    function routingNavigate() {
        navigate('/login')
    }
    async function submitFormData(e) {
        e.preventDefault();
        setLoading(true)
        let validationResult = validationForm();
        if (validationResult.error) {
            setLoading(false)
            setvalidateerror(validationResult.error.details)

        }
        else {
            let user = await axios.post("https://localhost:7164/api/Account/register", data);
            if (user.data.message == 'success') {
                setLoading(false)
                setMessage(user.data.message)
                routingNavigate()
                navigate('/login');
            }
            else {
                setLoading(false)
                setMessage(user.data.message)
            }
        }
        console.log(validationResult)
    }
    function validationForm() {
        const schema = joi.object({
            userName: joi.string()
                .required()
                .min(3)
                .max(20)
                .pattern(/^[a-zA-Z0-9_]+$/)  // Regex to allow letters, numbers, and underscores only
                .messages({
                    'string.pattern.base': 'Username can only contain letters, numbers, and underscores (_), no spaces allowed. like(ahmed_abdo_mawhoob)',
                    'string.min': 'Username must be at least 3 characters long.',
                    'string.max': 'Username must be at most 20 characters long.',
                }),
            //  role: joi.string().required().min(3).max(20),
            email: joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),
            password: joi.string()
                .pattern(/^[A-Z]/)  // Regex to ensure the password starts with an uppercase letter
                .required()
                .messages({
                    'string.pattern.base': 'Password must start with an uppercase letter.',
                }),
        })
        return schema.validate(data, { abortEarly: false })
    }

    function getData(e) {
        let newData = { ...data }
        let x = e.target.name
        newData[x] = e.target.value
        setData(newData)
        console.log(newData)
    }

    return (
        <>
            <div className="container my-5 w-75 m-auto">
                <h1 className='text-white my-3'>Registeration Form</h1>
                {validateError.map((error) => <div className='alert alert-danger'>{error.message}</div>)}
                {message != '' ? <div className="alert alert-success">{message}</div> : ''}
                <form onSubmit={submitFormData}>
                    <div className="input_group my-2">
                        <label htmlFor="userName">userName :</label>
                        <input onChange={getData} className='form-control ' type="text" name='userName' />
                    </div>
                    {/* <div className="input_group my-2">
                        <label htmlFor="role">role :</label>
                        <input onChange={getData} className='form-control ' type="number" name='role' />
                    </div> */}
                    <div className="input_group my-2">
                        <label htmlFor="email">email :</label>
                        <input onChange={getData} className='form-control ' type="email" name='email' />
                    </div>
                    <div className="input_group my-2">
                        <label htmlFor="password">password :</label>
                        <input onChange={getData} className='form-control ' type="password" name='password' />
                    </div>

                    <button className='float-end btn-info btn' type='submit'>{loading ? <i className='fa fa-spinner fa-spin'></i> : 'Register'}</button>
                    <div className="clearfix"></div>

                </form>
            </div>
        </>
    )
}
