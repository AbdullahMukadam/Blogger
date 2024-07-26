import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '../Components/index.js';
import services from '../Appwrite/services.js';
import authservice from '../Appwrite/auth.js';
import {toast} from'react-toastify';

const Post = () => {
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    authservice.getCurrentUser().then((userData) => {
      setUser(userData);
    });
  }, []);

  const isAuthor = post && user ? post.UserId === user.$id : false;

  useEffect(() => {
    if (slug) {
      services.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate('/');
      });
    } else navigate('/');
  }, [slug, navigate]);

  const deletePost = () => {
    services.deletePost(post.$id).then((status) => {
      if (status) {
        services.deleteFile(post.featureImage);
        toast.success('Post deleted successfully!');
        navigate('/');
      }
    });
  };

  return post ? (
    <div className='w-full h-fit'>
       <div className="w-full h-fit max-w-4xl mx-auto p-6 bg-gradient-to-r from-slate-400 to-slate-700 rounded-lg shadow-lg mt-6 mb-6">
      <div className="flex flex-col items-center">
        <img
          className="rounded-xl h-[80%] object-cover mb-4"
          src={services.getFilePreview(post.featureImage)}
          alt={post.title}
        />
        <h1 className="text-2xl font-semibold text-center text-black mb-4">{post.content}</h1>
        {isAuthor && (
          <div className="flex gap-4">
            <Link to={`/edit-post/${post.$id}`}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Edit Post
              </Button>
            </Link>
            <Button onClick={deletePost} className="bg-red-600 hover:bg-red-700 text-white">
              Delete Post
            </Button>
          </div>
        )}
      </div>
    </div>
    </div>
  ) : null;
};

export default Post;
