import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-700 text-white'>
          <div className='container flex justify-between items-center px-4 py-5 h-14'>
              <div className='logo text-white text-3xl font-bold'>
                  <span className='text-blue-500'> &lt; </span>
                  <span>Pass</span>
                  <span className='text-blue-500'>OP/&gt;</span>
              </div>
            
              <button className='text-white bg-blue-600 my-5 mx-2 rounded-full flex justify-between items-center ring-1'>
                  <img className='invert w-10 p-1' src="icons/github.png" alt="" />
                <span></span>
              </button>
          </div>    
    </nav>
  )
}

export default Navbar