const axios = require('axios');

const API_PATH = `http://localhost:8005/api/systemusers`;

export const getUsers = async() => {
    try {
      const response = await axios.get(API_PATH);
      return response.data.results;

    } catch (error) {
      return error;
    }
}

export const createUser = async (formValues ) => {
    try {
        await axios.post(API_PATH, formValues);
    } catch (error) {
        console.log( error );
    }

}

export const updateUser = async(id, formValues) => {
    try {
      const response = await axios.put(`${API_PATH}/${id}`, formValues);
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
      await axios.delete(`${API_PATH}/${id}`);
    } catch (error) {
      return error;
    }
}
