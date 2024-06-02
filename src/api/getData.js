import axios from 'axios';

const BASE_URL = 'https://recruiting-assessment.alphasights.com/api';

export const getAircrafts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/aircrafts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching aircrafts data:", error);
    throw error;
  }
};

export const getFlights = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/flights`);
    return response.data;
  } catch (error) {
    console.error("Error fetching flights data:", error);
    throw error;
  }
};
