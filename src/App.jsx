import { useState } from 'react'
import axios from 'axios';
import './App.css'

const LOCATION_IQ_API_KEY = import.meta.env.VITE_LOC_IQ_API_KEY;

function App() {
  const [responseData, setResponseData] = useState({});
  const [city, setCity] = useState('');

  const handleInput = (event) => {
    let value = event.target.value;
    setCity(value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.length === 0) {
      alert("Please enter a city name.")
    } else {
      getLocation(city);
    }
    
  }
  const getLocation = async (cityName) => {
    let response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${LOCATION_IQ_API_KEY}&q=${cityName}&format=json`);
    console.log(response)
    setResponseData(response.data[0]);
  }

  return (
    <>
      <header>
        <h1>Geolocation</h1>
        <form>
          <input type="text" placeholder="Enter a city name" onChange={handleInput} />
          <button onClick={handleSubmit}>
            Explore!
          </button>
        </form>
      </header>
      <div className="card">
        {responseData.display_name
        ? <ol>
            <p>{responseData.display_name}</p>
            <p>{`Latitude: ${responseData.lat}, Longitude: ${responseData.lon}`}</p>
            <img src={`https://maps.locationiq.com/v3/staticmap?key=${LOCATION_IQ_API_KEY}&center=${responseData.lat},${responseData.lon}&zoom=12`}/>
          </ol>
        : <p>Please Click the Explore</p>
        }
      </div>
    </>
  )
}

export default App
