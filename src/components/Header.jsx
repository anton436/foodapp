import React, { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdAdd, MdLogout } from 'react-icons/md';
import { motion } from 'framer-motion';

import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.config';

import Logo from '../img/logo.png';
import Avatar from '../img/avatar.png';
import { Link } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setisMenu] = useState(false);

  // функция, после нажатия на которую открывается окно авторизации
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem('user', JSON.stringify(providerData[0]));
    } else {
      setisMenu(!isMenu);
    }
  };

  const logout = () => {
    setisMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  return (
    <header className='bg-primary fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16'>
      {/* descktop & tablet */}
      <div className='hidden md:flex w-full h-full items-center justify-between'>
        <Link to={'/'} className='flex items-center gap-2'>
          <img className='w-8 object-cover' src={Logo} alt='logo' />
          <p className='text-headingColor text-xl font-bold '>City</p>
        </Link>

        <div className='flex items-center gap-8'>
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className='flex items-center gap-8'
          >
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
          </motion.ul>
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
              src={user ? user.photoURL : Avatar}
              className='cursor-pointer w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full'
              alt='user profile'
              onClick={login}
            />
            {/* dropdown menu */}

            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className='w-40 bg-gray-50 shadow-xl flex flex-col rounded-lg absolute top-12 right-0'
              >
                {user && user.email === 'oneshot436@gmail.com' && (
                  <Link to={'/createItem'}>
                    <p
                      className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base'
                      onClick={() => setisMenu(false)}
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base'
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className='flex items-center justify-between md:hidden w-full h-full'>
        <div className='relative flex items-center justify-center'>
          <AiOutlineShoppingCart className='text-textColor text-2xl cursor-pointer' />
          <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
            <p className='text-xs text-white font-semibold'>2</p>
          </div>
        </div>
        <Link to={'/'} className='flex items-center gap-2'>
          <img className='w-8 object-cover' src={Logo} alt='logo' />
          <p className='text-headingColor text-xl font-bold '>City</p>
        </Link>
        <div className='relative'>
          {/* анимацаия при нажатии на аватарку, до этого обернули App.js в компонент из библиотеки */}
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className='cursor-pointer w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full'
            alt='user profile'
            onClick={login}
          />
          {/* dropdown menu */}

          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className='w-40 bg-gray-50 shadow-xl flex flex-col rounded-lg absolute top-12 right-0'
            >
              {user && user.email === 'oneshot436@gmail.com' && (
                <Link to={'/createItem'}>
                  <p
                    onClick={() => setisMenu(false)}
                    className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base'
                  >
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <ul className='flex flex-col'>
                <li
                  className='text-base px-4 py-2 duration-100 transition-all ease-in-out text-textColor hover:bg-slate-100 cursor-pointer'
                  onClick={() => setisMenu(false)}
                >
                  Home
                </li>
                <li
                  className='text-base px-4 py-2 duration-100 transition-all ease-in-out text-textColor hover:bg-slate-100 cursor-pointer'
                  onClick={() => setisMenu(false)}
                >
                  Menu
                </li>
                <li
                  className='text-base px-4 py-2 duration-100 transition-all ease-in-out text-textColor hover:bg-slate-100 cursor-pointer'
                  onClick={() => setisMenu(false)}
                >
                  About Us
                </li>
                <li
                  className='text-base px-4 py-2 duration-100 transition-all ease-in-out text-textColor hover:bg-slate-100 cursor-pointer'
                  onClick={() => setisMenu(false)}
                >
                  Service
                </li>
              </ul>
              <p
                className='m-2 p-2 rounded-md shadow-md flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base bg-gray-200'
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
