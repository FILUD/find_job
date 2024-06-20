import axios from 'axios';
import debounce from 'lodash/debounce';

const API_BASE_URL = 'http://localhost:3001';

// Debounce the sendVisitData function to prevent rapid successive calls
const debouncedSendVisitData = debounce(async (pageUrl: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/store-visit`, { pageUrl });
    console.log('Visit data sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending visit data:', error);
  }
}, 1000); // Adjust the debounce delay as per your needs (e.g., 1000ms)

// Function to send visit data with debounce
export const sendVisitData = (pageUrl: string) => {
  debouncedSendVisitData(pageUrl);
};
