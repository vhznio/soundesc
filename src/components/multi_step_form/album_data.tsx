
type AlbumData = {
    name: string,
    author: string,
    cover: any,
    releaseDate: string
}

type AlbumFormProps = AlbumData & {
   UpdateFields: (fields: Partial<AlbumData>) => void
}


function Album_Data ({name, author, releaseDate, UpdateFields} : AlbumFormProps ){

    const handleCover = (value: any) => {
       UpdateFields({cover: value})
    }

    return(
        <>
            <div className='mt-3'>
                <label className='block text-base text-indigo-500 mb-2 ml-2'>Author Name</label>
                <input
                    type="text"
                    placeholder='Enter Author Name'
                    value={author}
                    required
                    autoFocus={true}
                    onChange={e => UpdateFields({ author: e.target.value })}
                    className='text-indigo-200 border w-full text-base px-2 py-1 rounded-lg
                    focus:outline-none focus:ring-0 focus:border-gray-600' 
                />
            </div>

            <div className='mt-3'>
                <label className='block text-base text-indigo-500 mb-2 ml-2'>Album Name</label>
                <input
                    type="text"
                    placeholder='Enter Album Name'
                    value={name}
                    onChange={e => UpdateFields({ name: e.target.value})}
                    className='text-indigo-200 border w-full text-base px-2 py-1 rounded-lg
                    focus:outline-none focus:ring-0 focus:border-gray-600' 
                />
            </div>

            <div className='mt-3'>
                <label className='block text-base text-indigo-500 mb-2 ml-2'>Release Date</label>
                <input
                    type="text"
                    placeholder='Enter Release Date'
                    value={releaseDate}
                    onChange={e => UpdateFields({ releaseDate: e.target.value})}
                    className='text-indigo-200 border w-full text-base px-2 py-1 rounded-lg
                    focus:outline-none focus:ring-0 focus:border-gray-600' 
                />
            </div>

            <div className='mt-3 '>
                <label className='block text-base text-indigo-500 mb-2 ml-2'>Cover</label>
                
                <input
                    type="file"
                    id="Cover_Input"
                    accept=".jpg, .png"
                    onChange={e => handleCover(e.target.files![0])}
                    className='file:bg-black  
                    file:rounded-md  
                    file:py-3 
                    file:m-2 
                    file:border-none 
                    file:text-white 
                    file:cursor-pointer
                    bg-gradient-to-b from-gray-900 to-transparent
                    rounded-md w-full  
                    text-indigo-500
                    '
                />
            </div>
        </>
    )
}

export default Album_Data