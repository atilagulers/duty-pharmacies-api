//import cities from './data/cities.js';
//import axios from 'axios';

//import fs from 'fs';
//const data = [];

//app.get('/api/v1/create', async (req, res) => {
//  for (let i = 0; i < cities.length; i++) {
//    const currCity = cities[i];

//    const response = await axios.get(
//      `https://www.nosyapi.com/apiv2/pharmacy/city?city=${currCity.citySlug}`,
//      {
//        headers: {
//          Authorization: `Bearer 8uovHXdzU79oSNU6i13AuzOeKno1NkKGtI96RxZt2Mko1Nx7joqTJpIoRi6r`,
//        },
//      }
//    );

//    const apiData = response.data.data;

//    const counties = apiData.map((county) => ({
//      countyName: county.ilceAd,
//      countySlug: county.ilceSlug,
//    }));

//    const newCity = {
//      cityName: currCity.cityName,
//      citySlug: currCity.citySlug,
//      counties: counties,
//    };

//    data.push(newCity);
//    console.log(data);
//  }

//  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

//  res.send('JSON Saved.');
//});
