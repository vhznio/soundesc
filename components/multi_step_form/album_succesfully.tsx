import React, { ChangeEvent, useState } from 'react';
import Image from "next/image"

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


function Album_Succesfully({Name, Author, Cover, ReleaseDate, Tracks, UpdateFields} : AlbumFormProps ){

    return (
        <>
            <div className="flex flex-col p-3 border-t border-gray-700 mt-5 w-auto h-auto">
                <Image
                    className="rounded-md w-auto h-auto"
                    src={URL.createObjectURL(Cover!)}
                    alt={Name}
                    priority={true}
                    width={100}
                    height={100}
                />

                <div className="flex flex-col w-full p-5 justify-center items-center">
                    <p className="text-xl font-bold text-green-500">{`${Name} - ${Author}`}</p>
                    <p className=" text-gray-800 dark:text-indigo-500">{ReleaseDate}</p>
                </div>
            </div>
            <div className='max-h-[8rem] overflow-y-scroll '>
                {Tracks.map((track,i) => {
                    return(
                        <div key={i} className='flex gap-5 p-2 bg-gray-700 mt-1 text-white text-lg'>
                            <div className='ml-5 text-green-500'>
                                {i + 1} -
                            </div>
                            <div>
                                {track.Name}
                            </div>
                        </div>
                    )
                })}
            </div>
    
        </>

    )
}

export default Album_Succesfully