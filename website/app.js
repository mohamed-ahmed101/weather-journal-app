/* Global Variables */
const openWeatherBaseURL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&zip=';
const apiKey = '&appid=c7d9583e2cc781ea296a35ab652862f0';
const weatherAppBaseUrl = "http://localhost:3000/";

document.getElementById('generate').addEventListener('click', _clickHandle);

let getDate = () => {
  let d = new Date();
  return ((d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear());
}

function _clickHandle() {
  const zipCode = document.getElementById('zip').value;
  const user_response = document.getElementById('feelings').value;
  if (!user_response) return alert("Please Enter your feelings !!!");
  getCurrentWeather(openWeatherBaseURL, zipCode, apiKey)
    .then(temperature => {
      postUserData("addData", { temperature, date: getDate(), user_response });
    }).then(() => {
      getAll("getAll");
    }).catch(error => {
      alert(error.message || error)
    });
}

const getCurrentWeather = async (openWeatherBaseURL, zipCode, key) => {
  const res = await fetch(openWeatherBaseURL + zipCode + key)
  try {
    const { cod, message, ...rest } = await res.json();
    if (cod != 200) throw (message)
    return rest.main.temp;
  } catch (error) {
    throw (error.message || error);
  }
}

const postUserData = async (path, data) => {

  const response = await fetch(weatherAppBaseUrl + path, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  try {
    if (!response.ok) throw (await response.text());
    const newData = await response.json();
    return newData
  } catch (error) {
    throw (error.message || error);
  }
}

const getAll = async (path) => {
  const res = await fetch(weatherAppBaseUrl + path)
  try {
    const { temperature, date, user_response } = await res.json();
    document.getElementById('date').innerHTML = date;
    document.getElementById('temp').innerHTML = temperature;
    document.getElementById('content').innerHTML = user_response;
  } catch (error) {
    throw (error.message || error);
  }
}

// Create a new date instance dynamically with JS




