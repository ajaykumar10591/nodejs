const axios = require('axios');

const HttpError = require('../models/http-error');

// const API_KEY = 'AIzaSyDgLmMpKCzveJf1_yuA0fUzzhy0WRChvZA';

async function getCoordsForAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;

  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'NodeApp' // Nominatim requires a valid User-Agent
    }
  });

  const data = response.data;

  if (!data || data.length === 0) {
    const error = new Error('Could not find location for the specified address.');
    error.code = 422;
    throw error;
  }

  // Nominatim returns an array, take the first result
  const coordinates = {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon)
  };

  return coordinates;
}

module.exports = getCoordsForAddress;