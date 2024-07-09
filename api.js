import axios from "axios";

const shopAround = axios.create({
  baseURL: "https://shop-around-be.onrender.com/api/",
  // withCredentials: true,  // Include credentials if needed
});

export const getStores = (lat,lng,rad) => {
  console.log('getStores is being invoked');
  const params = {params: {rad}}
  return shopAround.get(`stores/${lat}/${lng}`, params)
    .then(( {data} ) => {
      console.log(data)
      return data;
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
};

export const getProducts = () => {
  // console.log('getProducts is being invoked now');
  return shopAround.get(`products`)
    .then(( {data} ) => {
      // console.log(data, 'here is all the data');
      return data;
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
};

export const getCoordinatesFromPostCode = async (postcode) => {
  const API_KEY = "AIzaSyDug2H25Ibza9XgkDvk3zLtEWwbxK0LCxA";
  console.log('postcode',postcode);

  return (response = await axios
    .get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address: postcode,
        key: API_KEY,
      },
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }));
};

// export const getTopics = () => {
//   return shopAround.get("/topics").then(({ data }) => {
//     return data;
//   });
// };

// export const patchArticle = (articleId, increment) => {
//   return shopAround
//     .patch(`articles/${articleId}`, {
//       inc_votes: increment,
//     })
//     .then(({ data }) => {
//       return data;
//     });
// };

// export const postComment = (articleId, commentObj) => {
//   return shopAround
//     .post(`/articles/${articleId}/comments`, { comment: commentObj })
//     .then(({ data }) => {
//       return data;
//     });
// };

// export const deleteComment = (commentIdToDelete) => {
//   return shopAround
//   .delete(`/comments/${commentIdToDelete}`);
// };
