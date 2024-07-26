import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { PostForm } from '../Components'
import services from '../Appwrite/services'
import { useNavigate } from 'react-router-dom'


const EditPost = () => {
    const {slug} = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    
    useEffect(() => {
      services.getPost(slug).then((post)=>{
        if(post){
          setPost(post)
        } else{
         navigate("/")
        }
      })
    }, [slug,navigate])
    
    return post ? (
      <div className="">
        <PostForm post={post}/>
      </div>
    ) : null
  }
  
  export default EditPost