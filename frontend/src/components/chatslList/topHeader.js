import React from 'react'

const TopHeader = ({name}) => {
  return (
    <div className='flex w-full px-5 py-2 items-center justify-between '>
        <h3 className=' capitalize text-base font-semibold'>{name}</h3>
        <button className=' capitalize text-xs text-[#868484]'>See All</button>
    </div>
  )
}

export default TopHeader