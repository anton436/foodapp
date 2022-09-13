import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.config';

import Logo from '../img/logo.png';
import Avatar from '../img/avatar.png';
import { Link } from 'react-router-dom';

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // функция, после нажатия на которую открывается окно авторизации
  const login = async () => {
    const response = await signInWithPopup(firebaseAuth, provider);
    console.log(response);
  };
  return (
    <header className='fixed z-50 w-screen p-6 px-16'>
      {/* descktop & tablet */}
      <div className='hidden md:flex w-full h-full items-center justify-between'>
        <Link to={'/'} className='flex items-center gap-2'>
          <img className='w-8 object-cover' src={Logo} alt='logo' />
          <p className='text-headingColor text-xl font-bold '>City</p>
        </Link>

        <div className='flex items-center gap-8'>
          <ul className='flex items-center gap-8'>
            <li className='text-base duration-100 transition-all ease-in-out text-textColor hover:text-headingColor cursor-pointer'>
              Home
            </li>
            <li className='text-base duration-100 transition-all ease-in-out text-textColor hover:text-headingColor cursor-pointer'>
              Menu
            </li>
            <li className='text-base duration-100 transition-all ease-in-out text-textColor hover:text-headingColor cursor-pointer'>
              About Us
            </li>
            <li className='text-base duration-100 transition-all ease-in-out text-textColor hover:text-headingColor cursor-pointer'>
              Service
            </li>
          </ul>
          <div className='relative flex items-center justify-center'>
            <AiOutlineShoppingCart className='text-textColor text-2xl cursor-pointer' />
            <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
              <p className='text-xs text-white font-semibold'>2</p>
            </div>
          </div>
          <div className='relative'>
            {/* анимацаия при нажатии на аватарку, до этого обернули App.js в компонент из библиотеки */}
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={Avatar}
              className='cursor-pointer w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl'
              alt='user profile'
              onClick={login}
            />
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className='flex md:hidden w-full h-full'></div>
    </header>
  );
};

export default Header;
