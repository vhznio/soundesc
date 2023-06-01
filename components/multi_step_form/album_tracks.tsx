'use client'

import { useState, useEffect, FormEvent, useRef } from "react"
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { AiFillMinusCircle } from 'react-icons/ai'

type Track = {
    Name: string;
    Tags: string;
    File: File | undefined;
}

type AlbumData = {
    Name: string,
    Author: string,
    Cover: File | undefined ,
    ReleaseDate: string,
    Tracks: Track[]
}

type AlbumFormProps = AlbumData & {
   UpdateFields: (fields: Partial<AlbumData>) => void
}

function Album_Tracks ({Tracks, UpdateFields} : AlbumFormProps ) {
    
    const handleAddTrack = () => {
        Tracks.push({
            Name:'',
            Tags: '',
            File: undefined
        })
        const newState = Tracks.slice();
        UpdateFields({Tracks: [...newState]})
    }

    const handleDeleteTrack = (i:number) => {
        const newState = Tracks.slice().filter((item,index) => index !== i)
        UpdateFields({Tracks: [...newState]})
    }

    const handleNames = (index: number, value: string) => {
        if (Tracks) {
          const trackCopy = [...Tracks];
          trackCopy[index] = { ...trackCopy[index], Name: value };
          UpdateFields({ Tracks: trackCopy });
        }
    };

    const handleTags = (index: number, value: string) => {
        if (Tracks) {
            const trackCopy = [...Tracks];
            trackCopy[index] = { ...trackCopy[index], Tags: value };
            UpdateFields({ Tracks: trackCopy });
        }
    }

    const handleFiles = (index: number, value: File) => {
        if (Tracks) {
            const trackCopy = [...Tracks];
            trackCopy[index] = { ...trackCopy[index], File: value };
            UpdateFields({ Tracks: trackCopy });
        }
    }


    return (
        <>
            <table className="w-full">
                <thead className="flex text-white w-full">
                    <tr className="w-full flex justify-between flex-auto text-green-400">
                        <th className="m-3 w-1/4">Name</th>
                        <th className="m-3 w-1/4">Tags</th>
                        <th className="m-3 w-1/4">File</th>
                        <th className="m-3 w-1/12">-</th>
                    </tr>
                </thead>
                <tbody className="max-h-[12rem] bg-grey-light 
                flex flex-col items-center overflow-y-scroll shadow-lg shadow-gray-900">
                    {Tracks.map((track,i) => {
                        
                    return(
                        <tr key={i} className="text-indigo-500 text-center">
                            <td className="border border-gray-500 p-1 w-1/4">
                                <input 
                                    type="text" 
                                    className="text-indigo-200 border w-full text-base px-2 py-1 rounded-lg
                                    focus:outline-none focus:ring-0 focus:border-gray-600"
                                    autoFocus={true}
                                    value={Tracks[i].Name}
                                    onChange={(e)=> handleNames(i,e.target.value)}
                                />
                            </td>
                            <td className="border border-gray-500 p-1 w-1/4">
                                <input 
                                    type="text" 
                                    className="text-indigo-200 border w-full text-base px-2 py-1 rounded-lg
                                    focus:outline-none focus:ring-0 focus:border-gray-600"
                                    placeholder="#"
                                    value={Tracks[i].Tags}
                                    onChange={(e)=> handleTags(i,e.target.value)}
                                />
                            </td>
                            <td className="border border-gray-500 p-1 w-1/4">
                                <input
                                    type="file"
                                    accept=".mp3, .wav"
                                    className='
                                    file:bg-black  
                                    file:rounded-md  
                                    file:m-1 
                                    file:border-none 
                                    file:text-white 
                                    file:cursor-pointer
                                    rounded-md w-full '
                                    onChange={(e)=> handleFiles(i,e.target.files![0])}
                                />
                            </td>
                            <td className=" border border-gray-500 p-1 w-1/12">
                                <div className="flex justify-center cursor-pointer
                                items-center p-2 hover:text-green-500 ">
                                    <AiFillMinusCircle size={30}
                                    onClick={() => handleDeleteTrack(i)}
                                    />
                                </div>
                            </td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
                 
            <div className="flex justify-center p-5">
                <button 
                    onClick={handleAddTrack}
                    type="button" className="text-green-500 p-2 hover:text-indigo-400">
                    <BsFillPlusCircleFill size={35}/>
                </button>
            </div>      
        </>
    )
}

export default Album_Tracks