import React,{useEffect,useState} from 'react'
import services from "../Appwrite/services"
import {Card,Input} from "../Components/index"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Query } from 'appwrite'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState("")
  const authStatus = useSelector((state)=>state.auth.status)
  
  
   useEffect(() => {
     services.getPosts([Query.equal("status","active")]).then((posts)=>{
       if(posts){
         setPosts(posts.documents)
       }
       })
  }, []) 
  
  
  const filteredPosts = posts.filter(post =>
    post.tittle.toLowerCase().includes(search.toLowerCase())
  );
    
  
  if(authStatus == false){
    return (
      <div className="w-screen h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
  <div className="flex flex-col items-center space-y-6">
    <img
      className="w-32 md:w-48 lg:w-56 transition-transform transform hover:scale-110 duration-300"
      src="https://cdn-icons-png.flaticon.com/512/6478/6478111.png"
      alt="No Posts Icon"
    />
    <h1 className="text-2xl md:text-3xl lg:text-4xl text-white font-mono font-bold text-center">
      No Post Available
    </h1>
    <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-light text-center">
      Please login to read posts.
    </p>
    <Link to='/login' className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300">
      Login
    </Link>
  </div>
</div>

      )
  } 
  return (
    <div className="w-screen">
       <div className='w-full p-4'>
          <Input
          label="Search"
          type="text" 
          placeholder="Search for a blog : Enter the Title"
          className=" px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
          onChange={(e)=>{setSearch(e.target.value)}}
          />
       </div>
       <div className="w-full p-4 md:flex flex-wrap gap-x-10 justify-center">
       {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.$id} className="mb-2 md:w-5/12">
              <Card {...post} />
            </div>
          ))
        ) : (
          <p className='font-bold text-white'>No Blogs found.</p>
        )}
       </div>
    </div>
    )
}

export default Home