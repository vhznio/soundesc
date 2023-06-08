'use client'

import Step_Form_Handler from './../../../../components/multi_step_form/add_album_form';
import Album_Data from '@/src/components/multi_step_form/album_data';
import Album_Tracks from '@/src/components/multi_step_form/album_tracks';
import Album_Succesfully from '@/src/components/multi_step_form/album_succesfully';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';


type AlbumForm= {
    name: string,
    author: string,
    cover: any,
    releaseDate: string,
    tracks: Track[]
}

type Track = {
    name: string;
    tags: string;
    file: any;
}

const InitialData: AlbumForm = {
    name: '',
    author: '',
    cover: undefined,
    releaseDate: '',
    tracks: [{
        name:'',
        tags: '',
        file: undefined
    }]
}

function Add() {
    const router = useRouter();
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
        formData.append('author', data.author);
        formData.append('name', data.name);
        formData.append('releaseDate', data.releaseDate);
        formData.append('cover', data.cover);

        data.tracks.forEach((track, i) => {
            formData.append(track.name, track.file)
        })

        fetch('/api/upload', {
            method: 'POST',
            body: formData
        }).then((res) => {
            if(res.ok){
              alert(JSON.stringify("Successful registration!", null, 2));
              router.push('/dashboard/music')
            }
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
                            onClick={() => !data.cover ? '' : next()}
                            className={`
                            ${currentStepIndex > 1 ? 'hidden' : ''} 
                            ${!data.cover ? 'bg-gray-700 cursor-auto rounded-full p-2' : 'dashboard_create_album_buttons'}`
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