import PostService from "../api/posts-service";
import { latestPosts } from "../constants/common";

const getAllPostsOrdered = (id?: string) => {
  return PostService.getPostsTotal()
    .then((res) => {
      return res.data.pagination.total;
    })
    .then((total) => {
      const skip = id ? 0 : total - latestPosts;
      return PostService.getAllPosts(latestPosts, skip, id).then((res) => {
        return res.data.data.reverse();
      });
    });
};

export default getAllPostsOrdered;
