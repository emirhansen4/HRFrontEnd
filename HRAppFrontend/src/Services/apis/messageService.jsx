import axios from 'axios';

export const sendMessage = async (data, callback) => {
    let message = null;
    let badResponse = null;
    try {
        const response = await axios.post(
            `https://localhost:7048/api/ContactUs/sendmail`,
            data,
        );
        message = response.data;
    } catch (error) {
        badResponse = error.message;
    }
    callback(message, badResponse);
};
