'use client'

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Link from 'next/link';
import * as Yup from 'yup'

import { IoPeopleCircle } from 'react-icons/io5';
import { AiOutlineLoading } from 'react-icons/ai'

import { signIn } from 'next-auth/react';





interface FormValues {
  Email: string;
  Password: string;
}

function Signin() {
  //formik hook
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      Email: '',
      Password: '',
    },
    validationSchema: Yup.object({
      Email: Yup.string().required('Required').email(),
      Password: Yup.string().required('Required').min(8),
    }),
    onSubmit
  })

  async function onSubmit(values: any) {
    setLoader(true)
    const status = await signIn('credentials', {
      Email: values.Email,
      Password: values.Password,
      redirect: false,
      callbackUrl: '/dashboard'
    })
    if (!status?.error) {
      router.push('/dashboard')
    } else {
      formik.errors.Password = "Email or password is incorrect."
      setLoader(false)
    }
  }

  return (
    <>
      {loader ? 
      <div className='z-10 absolute flex w-full h-screen items-center justify-center text-2xl'>
          <div className='animate-spin text-indigo-400'>
            <AiOutlineLoading size={75} />
          </div>
      </div>
      :
      ''
      }
      <div className={`${loader ? 'blur-sm' : ''} flex justify-center items-center h-screen bg-gradient-to-b from-indigo-800 to-slate-800`} >
        <div className='w-96 p-6 shadow-lg bg-gray-100 rounded-md'>
          <div className='flex justify-center items-center text-7xl'>
            <IoPeopleCircle />
          </div>
          <hr className='mt-3' />
          <form onSubmit={formik.handleSubmit}>
            <div className='mt-3'>
              <label className='block text-base mb-2 text-center'>Email</label>
              <input
                type="email"
                placeholder='Enter Email'
                {...formik.getFieldProps('Email')}
                autoFocus={true}
                className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' />
              {formik.errors.Email && formik.touched.Email ? <span className='text-red-500'>{formik.errors.Email}</span> : <></>}
            </div>
            <div className='mt-3'>
              <label className='block text-base mb-2 text-center'>Password</label>
              <input
                type="password"
                placeholder='Enter Password'
                {...formik.getFieldProps('Password')}
                className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' />
              {formik.errors.Password && formik.touched.Password ? <span className='text-red-500'>{formik.errors.Password}</span> : <></>}
            </div>
            <div className='mt-10 flex justify-end items-center'>
              <div>
                <a href="#" className='text-green-400 font-semibold'>Forget Password?</a>
              </div>
            </div>
            <div>
              <button type='submit'
                className='
                        border-2 
                        mt-5
                        mb-5 
                        text-xl
                      border-indigo-200 
                      bg-gray-400 
                      text-black
                        py-1 
                        w-full 
                        rounded-full
                        hover:bg-indigo-300 
                        hover:shadow-md'>
                LOGIN
              </button>
            </div>
          </form>
          <p className='text-center text-gray-400 '>
            You do not have an account? <Link href={'/register'} className='text-indigo-800 hover:text-indigo-500'>Register</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Signin