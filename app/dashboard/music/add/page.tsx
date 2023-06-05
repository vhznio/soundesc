'use client'

import Step_Form_Handler from './../../../../components/multi_step_form/add_album_form';
import Album_Data from '@/components/multi_step_form/album_data';
import Album_Tracks from '@/components/multi_step_form/album_tracks';
import Album_Succesfully from '@/components/multi_step_form/album_succesfully';
import { FormEvent, useState } from 'react';


type AlbumForm= {
    Name: string,
    Author: string,
    Cover: any,
    ReleaseDate: string,
    Tracks: Track[]
}

type Track = {
    Name: string;
    Tags: string;
    File: any;
}

const InitialData: AlbumForm = {
    Name: '',
    Author: '',
    Cover: undefined,
    ReleaseDate: '',
    Tracks: [{
        Name:'',
        Tags: '',
        File: undefined
    }]
}

function Add() {
    const [data, setData ] = useState(InitialData);
    
    function UpdateFields(fields: Partial<AlbumForm>){
        setData(prev => {
            return {...prev, ...fields}
        })
    }

    const 
        {   
            step,
            firstStep,
            lastStep, 
            currentStepIndex, 
            title, 
            next, 
            back 
        } = Step_Form_Handler([
            // eslint-disable-next-line react/jsx-key
            <Album_Data {...data} UpdateFields={UpdateFields}/>,
            // eslint-disable-next-line react/jsx-key
            <Album_Tracks {...data} UpdateFields={UpdateFields}/>,
            // eslint-disable-next-line react/jsx-key
            <Album_Succesfully {...data}  UpdateFields={UpdateFields}/>
    ])

    

    async function onSubmit(e: FormEvent){
        e.preventDefault()
        next()

        const formData = new FormData();
        formData.append('Author', data.Author);
        formData.append('Name', data.Name);
        formData.append('ReleaseDate', data.ReleaseDate);
        formData.append('Cover', data.Cover);

        data.Tracks.forEach((track, i) => {
            formData.append(track.Name, track.File)
        })

        fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
    }

    return (
        <div className="overflow-auto p-5 select-none">
             <div className="dashboard_create_album_form">
                <div className='flex flex-col justify-center'>
                    <form onSubmit={onSubmit}>
                        <div className='flex justify-center'>
                            <h1 className='justify-center text-2xl text-white'>{title[currentStepIndex]}</h1>
                        </div>
                        {step}
                        <div className="flex justify-between p-5 text-xl">
                            <button 
                            type='button'
                            onClick={() => back()}
                            
                            className={`${firstStep ? 'opacity-0 cursor-auto' : ''} dashboard_create_album_buttons`}>
                                Back
                            </button>
                            <button 
                            type='button'
                            onClick={() => !data.Cover ? '' : next()}
                            className={`
                            ${currentStepIndex > 1 ? 'hidden' : ''} 
                            ${!data.Cover ? 'bg-gray-700 cursor-auto rounded-full p-2' : 'dashboard_create_album_buttons'}`
                            }>
                                Next
                            </button>
                            <button 
                            type='submit'
                            onClick={()=> onsubmit}
                            className={`
                            ${!lastStep ? 'hidden' : ''} 
                            dashboard_create_album_buttons`
                            }>
                                Create
                            </button>
                        </div>
                    </form>
                </div>
             </div>
        </div>
    )
}

export default Add