import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { Input, Button } from './index';
import { useForm } from 'react-hook-form';
import authservice from '../Appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/AuthSlice';

function Signup() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const submit = async (data) => {
    setError('');
    try {
      const user = await authservice.createAccount(data);
      if (user) {
        const savetoDB = await authservice.saveUserToDB({
          ...data,
          UserId: user.$id,
          bio: "Default Bio",          
        });
        toast.success('Account created successfully!');
        if (savetoDB) {
          const UserData = await authservice.getCurrentUser();
          if (UserData) {
            dispatch(login(UserData));
            navigate('/');
          }
        }      
      }
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    }
  };
  

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6">
        <Input
          type="text"
          label="Username"
          placeholder="Name"
          {...register('name', {
            required: true,
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters long',
            },
          })}
          className="px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Input
          type="email"
          label="Email"
          placeholder="Email"
          {...register('email', {
            required: true,
            validate: {
              matchPattern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Email address must be a valid address',
            },
          })}
          className="px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Input
          type="password"
          label="Password"
          placeholder="Password"
          {...register('password', {
            required: true,
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
          })}
          className="px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Signup
        </Button>
      </form>
      
    </div>
   
  );
}

export default Signup;
