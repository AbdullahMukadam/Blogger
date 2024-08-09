import React, { useEffect, useState } from 'react';
import services from '../Appwrite/services';
import authservice from '../Appwrite/auth';
import { Link } from 'react-router-dom';

function Card({ $id, featureImage, tittle, content }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    services.getPost($id).then((userDetails) => {
      if (userDetails) {
        setUser(userDetails);
   
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full h-60 flex gap-4 bg-gray-800 p-4 overflow-hidden rounded-xl shadow-lg border border-gray-700 hover:bg-gray-700 transition-colors duration-300">
        <div className="w-1/3 h-full">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={services.getFilePreview(featureImage)}
            alt={tittle}
          />
        </div>
        <div className="w-2/3 flex flex-col justify-center p-2">
        <h1 className="text-lg md:text-xl font-bold text-white mb-2">{tittle}</h1>
          <h2 className="md:text-lg text-sm text-white font-semibold mb-2">{content}</h2>
          {user && (
            <h3 className="text-sm text-gray-400">{user.name}</h3>
          )}
        </div>
      </div>
    </Link>
  );
}

export default Card;
