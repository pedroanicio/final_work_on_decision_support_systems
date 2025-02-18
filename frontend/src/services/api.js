import axios from 'axios';

const API_URL = 'http://localhost:5000'; 

export const getSintomas = async () => {
  const response = await axios.get(`${API_URL}/sintomas`);
  return response.data;
};

export const getDiagnostico = async (sintomas) => {
  const response = await axios.post(`${API_URL}/api/diagnostico`, { sintomas });
  return response.data;
};
