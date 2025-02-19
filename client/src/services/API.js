import axios from "axios";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export default {
  post: {
    fetchCodeReviewResponse: async (lang, code) => {
      try
      {
        const response = await axios.post(`${SERVER_URL}/review`, {lang, code});
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
