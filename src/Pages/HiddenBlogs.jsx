import React,{useEffect,useState} from 'react'
import services from "../Appwrite/services"
import {Card} from "../Components/index"
import { Query } from 'appwrite'


const HiddenBlogs = () => {
  const [posts, setPosts] = useState([])
  
  
  
  useEffect(() => {
     services.getHiddenPosts([Query.equal("status","inactive")]).then((posts)=>{
       if(posts){
         setPosts(posts.documents)
       }
       })
  }, [])
  
    
  
  if(posts.length == 0){
    return (
      <div className="w-screen h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
  <div className="flex flex-col items-center space-y-6">
    <img
      className="w-32 md:w-48 lg:w-56 transition-transform transform hover:scale-110 duration-300"
      src="https://cdn-icons-png.flaticon.com/512/6478/6478111.png"
      alt="No Posts Icon"
    />
    <h1 className="text-2xl md:text-3xl lg:text-4xl text-white font-mono font-bold text-center">
      No  Inactive Blogs Available
    </h1>
    
    
  </div>
</div>

      )
  } 
  return (
    <div className="w-screen">
       <div className="w-full p-4 md:flex flex-wrap gap-x-10 justify-center">
           {posts.map((post)=>(
            <div key={post.$id} className="mb-2 md:w-5/12">
              <Card {...post} />
            </div>
            ))}
       </div>
    </div>
    )
}

export default HiddenBlogs