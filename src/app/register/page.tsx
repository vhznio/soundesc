'use client'

import { useFormik } from 'formik'
import { useState, useEffect } from 'react';
import { IoPeopleCircle } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

import * as Yup from 'yup'
import Link from 'next/link';

interface FormValues {
  name: string;
  email: string;
  password: string;
  cpassword: string | null;
  conditions: boolean;
}


function Register() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  
  const formik = useFormik<FormValues>({
    initialValues: {
      name:'',
      email:'',
      password:'',
      cpassword:'',
      conditions: false
    }, 
    validationSchema: Yup.object({
      name: Yup.string().required().max(10),
      email: Yup.string().required('Email Required').email(),
      password: Yup.string()
      .required('No password provided.') 
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
      cpassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
    }),
    onSubmit
  })

  async function onSubmit(values:any) {
    const req = await fetch('api/users',{
      method: 'POST',
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      if(res.ok){
        alert(JSON.stringify("Successful registration!", null, 2));
        router.push('/signin')
      }
    })
  }

  return (
    <>
      <div className='flex justify-center items-center h-screen bg-gradient-to-b from-indigo-900 to-slate-800'>
        <div className='w-96 p-6 shadow-lg bg-gray-100 rounded-md'>
          <div className='flex justify-center items-center text-7xl'>
            <IoPeopleCircle />
          </div>
          <hr className='mt-3' />
          <form onSubmit={formik.handleSubmit}>
            <div className='mt-3'>
              <label className='block text-base mb-2 '>UserName</label>
              <input
                type="text"
                placeholder='Enter UserName'
                {...formik.getFieldProps('name')}
                className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' />
                {formik.errors.name && formik.touched.name ? <span className='text-rose-500'>{formik.errors.name}</span> : <></>}
            </div>
            <div className='mt-3'>
              <label className='block text-base mb-2 '>Email</label>
              <input
                type="email"
                placeholder='Enter Email'
                {...formik.getFieldProps('email')}
                className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' />
                {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>}
            </div>
            <div className='mt-3'>
              <label className='block text-base mb-2 '>password</label>
              <input
                type="password"
                placeholder='Enter password'
                {...formik.getFieldProps('password')}
                className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' />
                {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>}
            </div>
            <div className='mt-3'>
              <label className='block text-base mb-2 '>Confirm password</label>
              <input
                type="password"
                placeholder='Enter password'
                {...formik.getFieldProps('cpassword')}
                className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' />
                {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{formik.errors.cpassword}</span> : <></>}
            </div>
            <div className='mt-10 flex justify-between items-center'>
              <div>
                <input 
                type="checkbox"
                {...formik.getFieldProps('conditions')}
                checked={isChecked} onChange={() => setIsChecked(!isChecked)}
                />
                <label className='ml-3'>Accept Conditions</label>
              </div>
              <div>
                <a href="#" className='text-indigo-800 font-semibold'>Conditions!</a>
              </div>
            </div>
            <div>
              <button 
                type="submit"
                disabled={!isChecked}
                className={
                !isChecked || !formik.values.name || !formik.values.email || !formik.values.password || !formik.values.cpassword || formik.errors.cpassword == "password Not Match...!" ? 
                "border-2 mt-3 text-xlborder-indigo-200 bg-green-300 text-white py-1 w-full rounded-md"
                : 
                "border-2 mt-3 text-xlborder-indigo-200 bg-green-600 text-white py-1 w-full rounded-md hover:bg-transparent hover:bg-green-200 hover:text-black hover:border-green-500"
                }>REGISTER
              </button>
            </div>
            <p className='text-center text-gray-400 '>
                Have an account? <Link href={'/signin'} className='text-indigo-800 hover:text-indigo-500'>Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register