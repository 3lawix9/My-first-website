import React, { useState, useEffect } from 'react';
import './../App.css';
import axios from 'axios';
import { motion } from 'framer-motion';

function formatTime(timeString) {
    if (timeString) {
      const [hourString, minute] = timeString.split(":");
      const hour = +hourString % 24;
      return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " ص " : " م ");
    }
  }
export default function Card() {
  const [city, setCity] = useState('Riyadh');
  const [country, setCountry] = useState('SA');
  const [show, setShow] = useState(false);
  const [today, setToday] = useState('');
  const [hijriDate, setHijriDate] = useState('');
  const [timings, setTimings] = useState({});
  const [cityNotFound, setCityNotFound] = useState(false);

  useEffect(() => {
    callAxios();
  }, []);

  const callAxios = () => {
  let cityNotFound = false; // Initialize the flag

  axios
    .get(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`)
    .then(res => {
      const { data } = res;
      if (data.status === "OK") {
        const { timings, date } = data.data;
        const { weekday, hijri } = date;

        if (weekday && weekday.ar) {
          setToday(weekday.ar);
        }
        setHijriDate(`${hijri.day}/${hijri.month.ar}/${hijri.year}`);
        setTimings(timings);
      } else {
        cityNotFound = true; // Set the flag if the city does not exist
      }

      setCityNotFound(cityNotFound); // Update the state variable
    });
};

  

const searchBy = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      callAxios();
      setShow(true);
    }
  };

  return (
    <>
    <input
      className='input'
      value={city}
      onChange={event => {
        setCity(event.target.value);
        setShow(false);
        setCityNotFound(false);
      }}
      type="text"
      placeholder=" أدخل اسم المدينه"
      onKeyDown={searchBy}
    />
    <select 
className="select-container"
  value={country}
  onChange={event => setCountry(event.target.value)}
>
<option value="SA">المملكة العربية السعودية</option>
  <option value="EG">مصر</option>
  <option value="ID">إندونيسيا</option>
  <option value="TR">تركيا</option>
  <option value="IR">إيران</option>
  <option value="IQ">العراق</option>
  <option value="PK">باكستان</option>
  <option value="BD">بنغلاديش</option>
  <option value="DZ">الجزائر</option>
  <option value="MA">المغرب</option>
  <option value="SD">السودان</option>
  <option value="YE">اليمن</option>
  <option value="TN">تونس</option>
  <option value="SY">سوريا</option>
  <option value="LY">ليبيا</option>
</select>

    {cityNotFound && <p>There is no city named like this.</p>}

      {show ?
        <motion.div
          className="container"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
        >
          <div className='info'>
            <h1>مواقيت الصلاة في مدينة:</h1>
            <p>{city}</p>
            <p>{today}</p>
            <p>{hijriDate}</p>
          </div>

          <>
            <div className="cards">
              <h2>الفجر</h2>
              <p>{formatTime(timings.Fajr)}</p>
            </div>
            <div className="cards">
              <h2>الشروق</h2>
              <p>{formatTime(timings.Sunrise)}</p>
            </div>
            <div className="cards">
              <h2>الظهر</h2>
              <p>{formatTime(timings.Dhuhr)}</p>
            </div>
            <div className="cards">
              <h2>العصر</h2>
              <p>{formatTime(timings.Asr)}</p>
            </div>
            <div className="cards">
              <h2>المغرب</h2>
              <p>{formatTime(timings.Maghrib)}</p>
            </div>
            <div className="cards">
              <h2>العشاء</h2>
              <p>{formatTime(timings.Isha)}</p>
            </div>
          </>
        </motion.div>
        : null
      }
    </>
  );
}

