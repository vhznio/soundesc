import Post from '@/src/components/post'

const fetchData = async () => {
  const data = await fetch(`http://localhost:3000/api/albums`)
  return data.json()
}

export default async function Dashboard() {
  const usersData:any[] = await fetchData();

  return (
    <>
      <div className="overflow-auto">
        <div className="dashboard_feed_container">
          {usersData.map((item, i) => (
            <div key={i} className="dashboard_feed_post">
              <Post item={item}/>
            </div>
          ))}
        </div>
      </div>
    </>
  )
} 