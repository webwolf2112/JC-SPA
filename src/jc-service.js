const axios = require('axios');

// GET /api/systemusers
// GET /api/systemusers/{id}
// POST /api/systemusers
// PUT /api/systemusers/{id}
// DELETE /api/systemusers/{id}

const API_PATH = `http://localhost:8005/api/systemusers`;

export const getUsers = async() => {
    try {
      const response = await axios.get(API_PATH);
      return response.data.results;

    } catch (error) {
      return error;
    }
}

export const getUserById = async(id) => {
    try {
      const response = await axios.get(`${API_PATH}/${id}`);
      return response.data.results;

    } catch (error) {
      return error;
    }
}

export const deleteUser = async(id) => {
    try {
      const response = await axios.delete(`${API_PATH}/${id}`);
      return response.data.results;

    } catch (error) {
      return error;
    }
}

export const createUser = async() => {
    try {
      const response = await axios.post(`${API_PATH}/systemusers`);
      return response.data.results;

    } catch (error) {
      return error;
    }
}

export const updateUser = async(id) => {
    try {
      const response = await axios.update(`${API_PATH}/${id}`);
      return response.data.results;

    } catch (error) {
      return error;
    }
}
