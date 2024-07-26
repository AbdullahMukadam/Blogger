import React, { useEffect, useState } from 'react';
import authservice from '../Appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/AuthSlice';
import { Button, Input } from '../Components/index.js';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: user?.email || '',
      password: '',
    }
  });

  const handleUpdate = async (data) => {
    try {
      const updatedUser = await authservice.updateAccount({
        email: data.email,
        password: data.password,
      });
      if (updatedUser) {
        setUser(updatedUser);
        toast.success('Profile updated successfully!, please login again for better experience!');
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const currentUser = await authservice.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const status = await authservice.logout();
      if (status) {
        dispatch(logout());
        navigate('/login');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Profile</h1>
      {user && (
        <div className="flex flex-col items-center">
          <img
            src="../avatar.png"
            alt={`${user.name}'s Avatar`}
            className="w-24 h-24 rounded-full mb-4"
          />
          <p className="text-lg text-white">
            <strong>Name:</strong> {user.name}
          </p>

          <p className="text-lg text-white">
            <strong>Email:</strong> {user.email}
          </p>

          <form onSubmit={handleSubmit(handleUpdate)} className="mt-4 w-full">
            <Input
              {...register("email", {
                required: "New email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              type="email"
              label="New Email"
              placeholder="New Email"
              className="w-full p-2 mb-2 rounded"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            <Input
              type="password"
              {...register("password", {
                required: "Current password is required"
              })}
              placeholder="Current Password"
              label="Current Password"
              className="w-full p-2 mb-2 rounded"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            <Button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded w-full"
            >
              Update Email
            </Button>
          </form>



          <button
            onClick={handleLogout}
            className="bg-red-500 text-white hover:bg-red-600 mt-4 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
