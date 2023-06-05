import { AiOutlineLoading } from 'react-icons/ai'

export default function Loading(){
    return (
        <div className="flex w-screen h-screen items-center justify-center">
            <div className='animate-spin text-indigo-400'>
              <AiOutlineLoading size={75}/>
            </div>
        </div>

    )
}