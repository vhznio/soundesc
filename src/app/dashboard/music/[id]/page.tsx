function Album({ params }: { params: { id: string}}){
    return(
        <div>Album {params.id}</div>
    )
}

export default Album