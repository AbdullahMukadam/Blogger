import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdPostAdd } from "react-icons/md";
import { FaHome, FaUser, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';
import { LogoutBtn } from './index';
import { MdArticle } from "react-icons/md";

function Navbar() {
  const authstatus = useSelector((state) => state.auth.status);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavItem = [
    {
      name: 'Home',
      link: '/',
      status: "active",
      icon: <FaHome className="mr-2" />,
    },
    {
      name: 'Add-Blog',
      link: '/add-blog',
      status: authstatus,
      icon: <MdPostAdd className="mr-2" />,
    },
    {
      name: 'Hidden-Blogs',
      link: '/hidden-blog',
      status: authstatus,
      icon: <MdArticle className="mr-2" />,
    },
    {
      name: 'Profile',
      link: '/profile',
      status: authstatus,
      icon: <FaUser className="mr-2" />,
    },
    {
      name: 'Login',
      link: '/login',
      status: !authstatus,
      icon: <FaSignInAlt className="mr-2" />,
    },
    {
      name: 'Signup',
      link: '/signup',
      status: !authstatus,
      icon: <FaUserPlus className="mr-2" />,
    },
  ];

  return (
    <nav className='sticky top-0 z-50 w-full p-4 bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-lg'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='w-1/4'>
          <Link to="/">
            <img
              className="h-12 rounded-lg transition-transform duration-300 hover:scale-110"
              src="/blog logo.png"
              alt="Logo"
            />
          </Link>
        </div>
        <div className='w-3/4 flex justify-end items-center'>
          {/* Desktop Navigation */}
          <div className='hidden md:flex'>
            {NavItem.map((item, index) => (
              item.status ? (
                <Link key={index} to={item.link} className='mx-3'>
                  <div className='flex items-center text-white hover:text-yellow-300 transition-colors duration-300'>
                    {item.icon}
                    <span className='font-semibold'>{item.name}</span>
                  </div>
                </Link>
              ) : null
            ))}
            {authstatus && <LogoutBtn />}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className='md:hidden'>
            <button onClick={toggleMenu} className='text-white'>
              {isMenuOpen ? <FaTimes className='text-2xl' /> : <FaBars className='text-2xl' />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden mt-2 transition ease-in'>
          {NavItem.map((item, index) => (
            item.status ? (
              <Link key={index} to={item.link} className='block py-2 px-4 text-white hover:bg-gray-800'>
                <div className='flex items-center'>
                  {item.icon}
                  <span className='ml-2'>{item.name}</span>
                </div>
              </Link>
            ) : null
          ))}
          {/* Add the LogoutBtn component here */}
          {authstatus && <LogoutBtn className={'mt-2'} />}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
