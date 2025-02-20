import axios from "axios";
// const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const SERVER_URL = window.location.origin;

export default {
  post: {
    fetchCodeReviewResponse: async (lang, code) => {
      try
      {
        // const response = await axios.post(`${SERVER_URL}/review`, {lang, code});
        const response = await axios.post(`${SERVER_URL}/v1/api/review`, {lang, code});
        return response.data;
      }
      catch(err)
      {
        console.log(err, "from BE-API");
        throw err;
      }
    },
  },
};
