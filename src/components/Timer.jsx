import { useState, useEffect } from "react";
import { DUE_DATE } from "../constants/VALUES";
import PropTypes from "prop-types";

const Timer = ({ textColor, isTimeOver }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(DUE_DATE) - new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial calculation

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const difference = new Date(DUE_DATE) - new Date();
    const timeOver = difference <= 1500;
    isTimeOver && isTimeOver(timeOver);
  }, [timeLeft, isTimeOver]);

  return (
    <div className="flex justify-center items-center px-4 py-2">
      <div className="flex gap-4">
        <div className="flex flex-row items-end">
          <span className={`text-4xl font-bold ${textColor}`}>
            {timeLeft.days}
          </span>
          <span className={`text-sm ${textColor} opacity-70`}>days</span>
        </div>
        <div className="flex flex-row items-end">
          <span className={`text-4xl font-bold ${textColor}`}>
            {timeLeft.hours}
          </span>
          <span className={`text-sm ${textColor} opacity-70`}>hrs</span>
        </div>
        <div className="flex flex-row items-end">
          <span className={`text-4xl font-bold ${textColor}`}>
            {timeLeft.minutes}
          </span>
          <span className={`text-sm ${textColor} opacity-70`}>mins</span>
        </div>
        <div className="flex flex-row items-end">
          <span className={`text-4xl font-bold ${textColor}`}>
            {timeLeft.seconds}
          </span>
          <span className={`text-sm ${textColor} opacity-70`}>secs</span>
        </div>
      </div>
    </div>
  );
};

Timer.propTypes = {
  textColor: PropTypes.string,
  isTimeOver: PropTypes.func,
};

export default Timer;
