
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button, Select, } from './index'
import services from '../Appwrite/services'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import authservice from '../Appwrite/auth'

function PostForm({ post }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      tittle: post?.tittle || "",
      content: post?.content || "",
      status: post?.status || "active",
      slug: post?.$id || "",
    },
  })

  const navigate = useNavigate()
  const [wordCount, setWordCount] = useState(0);
  const [fileSelected, setFileSelected] = useState(post ? true : false);


  const handleContentChange = (e) => {
    const words = e.target.value.trim().split(/\s+/);
    const count = words.length;
    setWordCount(count);

    if (count > 150) {
      e.target.value = words.slice(0, 150).join(' ');
      setWordCount(150);
    }
  };




  const submit = async (data) => {
    if (post) {
      if (!fileSelected) {
        toast.error("Please select a file to update the post");
        return;
      }
      const delfile = services.deleteFile(post.featureImage)

      if (delfile) {
        const newfile = data.image[0] ? await services.uploadFile(data.image[0]) : null;

        if (newfile) {
          const updatedPost = await services.updatePost(post.$id, {
            ...data,
            featureImage: newfile.$id,
          })
          if (updatedPost) {
            toast.success("Post updated successfully")
            navigate("/")
          }
        }
      }
    } else {
      const file = await services.uploadFile(data.image[0])
      if (file) {
        data.featureImage = file.$id
        const currentUser = await authservice.getCurrentUser()
        const createpost = await services.createPost({
          ...data,
          UserId: currentUser.$id
        })
        if (createpost) {
          toast.success("Post created successfully")
          navigate("/")
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className='w-full p-4 flex flex-col gap-2 bg-black md:flex-row'>
        <div className='w-full p-2'>
          <Input
            label="Title"
            placeholder="Enter your Title"
            type="text"
            className="mb-3"
            {...register("tittle", {
              required: true,
            })}
          />
          {/*  <Input 
              label="slug"
              placeholder="dont type anything here"
              type="text"
               className="mb-3"
              disabled
              {...register("slug",{
                
              })}
              /> */}
          <textarea
            label="Description"
            placeholder="Enter your Blog Description"
            className="h-[40vh] mb-3 p-2 text-left break-words w-full resize-none rounded-md"
            {...register("content", {
              required: true,
              onChange: handleContentChange
            })}
          />

          <div className="text-sm text-gray-500 mt-1">
            {wordCount}/150 words maximum
          </div>

        </div>
        <div className='w-full p-2'>
          <Input
            label="Image"
            type="file"
            className="mb-3"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", {
              required: !post,
              onChange: (e) => setFileSelected(e.target.files.length > 0)
            })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={services.getFilePreview(post.featureImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}

          <Select
            options={["active", "inactive"]}
            label="status"
            className="mb-3"
            {...register("status", {
              required: true,
            })}

          />

          <Button
            type='submit'
            className=' w-full'
          >{post ? "Update" : " Submit"}</Button>
        </div>
      </div>

    </form>
  )
}

export default PostForm