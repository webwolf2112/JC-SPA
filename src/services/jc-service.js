const axios = require('axios');

const API_PATH = `http://localhost:8005/api/systemusers`;

export const getUsers = async() => {
    try {
      const response = await axios.get(API_PATH);
      return response.data.results;

    } catch (error) {
      return { error };
    }
}

export const createUser = async (formValues ) => {

    try {
        return await axios.post(API_PATH, formValues);
    } catch (error) {
        console.error( error );
        return { error };
    }

}

export const updateUser = async(id, formValues) => {
    try {
      return await axios.put(`${API_PATH}/${id}`, formValues);
    } catch (error) {
        console.error( error );
        return { error };
    }
}

/**This was not used. If I were to use it I would have added in an additional modal that shows all 
 * of the user information in the UI.
**/
export const getUserById = async(id) => {
    try {
      const response = await axios.get(`${API_PATH}/${id}`);
      return response.data.results;

    } catch (error) {
        return { error };
    }
}

export const deleteUser = async(id) => {
    try {
      return await axios.delete(`${API_PATH}/${id}`);
    } catch (error) {
      return { error };
    }
}
