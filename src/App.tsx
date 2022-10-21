import React, { useEffect, useState } from 'react';
import { API_KEY, citiesList } from './constants/defaults';
import { CitiesType, DayWeatherType } from './types/weather';
import Weather from './services/weather';
import dayjs from 'dayjs';
import './App.scss';

function App() {
  const [dailyWeathers, setDailyWeathers] = useState<DayWeatherType[]>();
  const [selectedCity, setSelectedCity] = useState<CitiesType>('Tehran');
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    const lat = citiesList[selectedCity]?.lat;
    const lon = citiesList[selectedCity]?.lon;
    const exclude = 'hourly,minutely,current';
    const queryString = `lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${API_KEY}&units=metric`;
    Weather.getForecast8Days(queryString).then((res: any) => {
      setDailyWeathers(res.daily);
    });
  }, [selectedCity]);

  const handleSelectCity = (event: any) => {
    setSelectedCity(event.target.value);
  };
  const handleSelectDays = (num: number) => {
    setSelectedDay(num);
  };

  return (
    <div className='container-sm d-flex w-100 h-100 p-3 mx-auto flex-column'>
      <main>
        <div className='mb-auto'>
          <nav className='nav justify-content-center'>
            <select onChange={handleSelectCity}>
              <option value='Tehran'>Tehran</option>
              <option value='Shiraz'>Shiraz</option>
              <option value='Amsterdam'>Amsterdam</option>
              <option value='Berlin'>Berlin</option>
              <option value='Montreal'>Montreal</option>
            </select>
          </nav>
          <h1 className='display-4'>{selectedCity}</h1>
        </div>
        <h1 className='display-1 fw-normal d-flex align-baseline justify-content-center'>
          {dailyWeathers ? dailyWeathers[selectedDay].temp.day?.toFixed(0) : '__'}
          <small className='fs-4'>°C</small>
        </h1>
        <img
          src={`http://openweathermap.org/img/wn/${dailyWeathers ? dailyWeathers[selectedDay].weather[0].icon : ''}@2x.png`}
          className='my-4 rounded-circle bg-info'
          alt='Icon'
        />
        <h3 className='fs-3'>{dailyWeathers ? dailyWeathers[selectedDay].weather[0].main : ''}</h3>
        <div className='d-flex flex-column flex-md-row justify-content-center'>
          {dailyWeathers &&
            dailyWeathers?.map(
              (day, index) =>
                index < 7 && (
                  <div
                    onClick={() => handleSelectDays(index)}
                    className={`day d-flex flex-row flex-md-column m-1 m-lg-2 border rounded align-items-center justify-content-center p-0 p-md-2 ${
                      index === selectedDay && 'active'
                    }`}
                  >
                    <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} className='rounded-circle' alt='Icon' />
                    <p>{dayjs.unix(day.dt).toString().slice(0, 3)}</p>
                    <p>
                      {day.temp.min.toFixed(0)}° / {day.temp.max.toFixed(0)}°
                    </p>
                  </div>
                )
            )}
        </div>
      </main>

      <footer className='mt-auto'>
        <p>
          <a className='text-white-50' href='https://openweathermap.org/' target='_blank' rel='noreferrer'>
            open weather map API
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
