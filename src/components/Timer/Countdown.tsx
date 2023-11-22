import React, { useState, useEffect } from 'react';
import moment from 'moment';

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function calculateTimeLeft() {
    const now = moment();
    const target = moment(targetDate, 'YYYY-MM-DD HH:mm:ss');
    const duration = moment.duration(target.diff(now));

    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  return (
    <div>
      <p className='text-[#ffb4c1] text-[20px] md:text-[60px] uppercase gilroy text-center'>
        {`${timeLeft.days} днів, 
        ${timeLeft.hours} годин, 
        ${timeLeft.minutes} хвилин`} 
        <p>{`${timeLeft.seconds} секунд`}</p>
      </p>
    </div>
  );
};

export default CountdownTimer;
