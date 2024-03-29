import React from 'react';
import { motion } from 'framer-motion';
import { HomeContainer, MenuContainer, RowContainer } from '.';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useStateValue } from '../context/StateProvider';
import { useState } from 'react';

const MainContainer = () => {
  const [{ foodItems }, dispatch] = useStateValue();

  const [scrollValue, setScrollValue] = useState(0);

  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
      <HomeContainer />
      <section className='w-full my-6'>
        <div className='w-full flex items-center justify-between'>
          <p className='text-2xl font-semibold uppercase text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-4 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100'>
            Our fresh & healthy fruits
          </p>
          <div className='hidden md:flex gap-3 items-center '>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className='w-8 h-8 rounded-lg bg-orange-300  cursor-pointer hover:bg-orange-500 flex items-center justify-center transition-all duration-100 ease-in-out hover:shadow-lg'
              onClick={() => setScrollValue(-200)}
            >
              <MdChevronLeft className='text-lg text-white' />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className='w-8 h-8 rounded-lg bg-orange-300 cursor-pointer  hover:bg-orange-500 flex items-center justify-center transition-all duration-100 ease-in-out hover:shadow-lg'
              onClick={() => setScrollValue(200)}
            >
              <MdChevronRight className='text-lg text-white' />
            </motion.div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={foodItems?.filter((n) => n.category === 'fruits')}
        />
      </section>

      <MenuContainer />
    </div>
  );
};

export default MainContainer;
