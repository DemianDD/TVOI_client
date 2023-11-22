import React from 'react'
import CountdownTimer from '../Timer/Countdown'

const BlackFriday = () => {
    const targerTime = '2023-11-21 00:00:00';
    return (
        <div className='m-4 rounded-xl relative'>
            <div className='h-full flex flex-col items-center justify-center'>
                <span className='gilroy text-[40px] uppercase text-[#111111]'>Black Friday</span>
                <span className='gilroy text-[18px] md:text-[25px] text-[#bebebe]'>залишилось</span>
                <span><CountdownTimer targetDate={targerTime}/></span>
            </div>
        </div>
    )
}

export default BlackFriday