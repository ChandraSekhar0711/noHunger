import axios from "axios";
const BASE_URL = "http://localhost:3200/posts";
export class postsAPI {
  static async createPosts(post) {
    return (await axios.post(`${BASE_URL}`, post)).data;
  }
  static async fetchAll() {
    return (await axios.get(`${BASE_URL}`)).data;
  }
  static async fetchById(postId) {
    return (await axios.get(`${BASE_URL}/${postId}`)).data;
  }
  static async deleteById(postId) {
    return (await axios.delete(`${BASE_URL}/${postId}`)).data;
  }
  //   static async updateById(post) {
  //     return await axios.patch(`${BASE_URL}/${postId}`, post);
  //   }
}
