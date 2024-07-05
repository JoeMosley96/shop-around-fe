import axios from "axios"

const shopAround = axios.create({ baseURL: "127.0.0.1:8000/api" });

// export const getArticles = (chosenArticleId, topic_slug, sort_by, order) => {
//   const url1 = "/articles";
//   const url2 = chosenArticleId ? `/${chosenArticleId}` : "";
//   console.log(topic_slug);
//   console.log(sort_by);

//   return shopAround.get(url1 + url2, 
//     {params: 
//       { topic: topic_slug,
//         sort_by: sort_by,
//         order: order
//       }}
//     )
// .then(({ data }) => {
//   console.log(data)
//     return data;
//   });
// };

export const getProducts = () => {
  return shopAround.get(`/products`).then(({ data }) => {
    
    return data;
  });
};

export const getStores = () => {
    return shopAround.get(`/stores`).then(({ data }) => {
      console.log(data)
      return data;
    });
  };

// export const getUsers = () => {
//   return shopAround.get("/users").then(({ data }) => {
//     return data;
//   });
// };

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
