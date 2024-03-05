import { useState } from 'react'
import axios from 'axios';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const LOCATION_IQ_API_KEY = import.meta.env.VITE_LOC_IQ_API_KEY;

function App() {
  const [responseData, setResponseData] = useState({});
  const [city, setCity] = useState('');

  const handleInput = (event) => {
    let value = event.target.value;
    setCity(value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    getLocation(city);
  
    
  }
  const getLocation = async (cityName) => {
    try {
      let response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${LOCATION_IQ_API_KEY}&q=${cityName}&format=json`);
      console.log(response)
      setResponseData(response.data[0]);
    } catch(error) {
      console.log(error)
      alert(`${error}. Please try again.`)
    }
    
  }

  return (
    <>
      <header>
        <h1>City Geolocator !!</h1>
        <form id='city-input-form'>
          <input id='city-input' type="text" placeholder="Enter a city name" onChange={handleInput} />
          <button onClick={handleSubmit}>
            Explore!
          </button>
        </form>
      </header>
      <div className="display-card">
        {responseData.display_name
        ? <ol>
            <h3>{responseData.display_name}</h3>
            <p>{`Latitude: ${responseData.lat}, Longitude: ${responseData.lon}`}</p>
            <img src={`https://maps.locationiq.com/v3/staticmap?key=${LOCATION_IQ_API_KEY}&center=${responseData.lat},${responseData.lon}&zoom=12`}/>
          </ol>
        : <p> Please Click the Explore Button </p>
        }
      </div>
    </>
  )
}

export default App
