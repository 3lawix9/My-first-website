import React, {  useState } from 'react'
import './../App.css';
import axios from 'axios';
import {motion} from 'framer-motion'



function Cards() {

    const [city , setCity] = useState('');
    const [show , setShow] = useState(false)

    
    const callAxios = ()=> {
     axios.get(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=SA`).then(res => {
      const timings = res.data.data.timings
      const alyom = res.data.data.date.hijri.weekday.ar;
      const hijri = res.data.data.date.hijri;
      const date = res.data.data.date.gregorian.date;
      // const time = timings

      
        document.getElementById('today').innerHTML = alyom
        document.getElementById('hijri').innerHTML = `${hijri.day}/${hijri.month.ar}/${hijri.year } `
        document.getElementById('date').innerHTML = date
        document.getElementById('fajr').innerHTML = formatTime(timings.Fajr)
        document.getElementById('eshrag').innerHTML = formatTime(timings.Sunrise)
        document.getElementById('dhuhr').innerHTML = formatTime(timings.Dhuhr)
        document.getElementById('asr').innerHTML = formatTime(timings.Asr)
        document.getElementById('maghrib').innerHTML = formatTime(timings.Maghrib)
        document.getElementById('isha').innerHTML = formatTime(timings.Isha)
        document.getElementById('city').innerHTML = city;  


        function formatTime(timeString) {
          const [hourString, minute] = timeString.split(":");
          const hour = +hourString % 24;
          return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " ص "  : " م ");
      }
      console.log(formatTime(timings.Fajr));

     

    }) 
  };


    const searchBy = (event)=>{
     
      if (event.key === 'Enter'){
     
        callAxios()
        setShow(true)
    
      } 
      

    }
    

      

        
        
  return (
    <>
          <input className='input' value={city} onChange={event => {setCity(event.target.value);setShow() }}   type="text" placeholder=" أدخل اسم المدينه"
    onKeyPress={searchBy}  />
    
    {show?<motion.div className="container"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
        > 
        <div className='info'>
        <h1>مواقيت الصلاة في مدينة:</h1>
        <p id='city'></p>
        <p id='today'></p>
        <p id='hijri'></p>
        <p id='date'></p>
        </div>
        
       
       <>
        <div className="cards">
          <h2>الفجر</h2>
          <p id='fajr'></p>
        </div>
        <div className="cards">
          <h2>الشروق</h2>
          <p id="eshrag"></p>
        </div>
        <div className="cards">
          <h2>الظهر</h2>
          <p id="dhuhr"></p>
        </div>
        <div className="cards">
          <h2>العصر</h2>
          <p id="asr"></p>
        </div>
        <div className="cards">
          <h2>المغرب</h2>
          <p id="maghrib"></p>
        </div>
        <div className="cards">
          <h2>العشاء</h2>
          <p id="isha"></p>
        </div>
        </>
        </motion.div>:null}
        

    </>
    
  )
}

export default Cards