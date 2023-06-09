import { AiOutlineLoading } from 'react-icons/ai'

export default function Loading(){
    return (
        <>
        <div className="flex justify-between items-center text-xl p-10 h-32"></div>
        <span className="border-b-[1px] border-gray-600 w-full "></span>
        <div className="w-full  p-10">
            <div className="text-xl flex flex-col gap-4">
                <div className="flex h-20 justify-center 
                animate-pulse items-center p-5 rounded-md bg-gray-600">
                        <p>...</p>
                </div>
                <div className="flex h-20 justify-center 
                animate-pulse items-center p-5 rounded-md bg-gray-600">
                        <p>...</p>
                </div>
                <div className="flex h-20 justify-center 
                animate-pulse items-center p-5 rounded-md bg-gray-600">
                        <p>...</p>
                </div>
            </div>
        </div>
        </>
    )
}