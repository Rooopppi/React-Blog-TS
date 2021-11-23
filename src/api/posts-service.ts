import PostData from "../interfaces/post.type";
import axios from "./inst";

interface AllPosts {
  data: PostData[];
}

interface PostsTotal {
  pagination: { total: number };
}

const getAllPosts = (limit?: number, skip?: number, postedBy?: string) => {
  return axios.get<AllPosts>("/posts", {
    params: { postedBy, limit, skip },
  });
};

const getPostsTotal = () => {
  return axios.get<PostsTotal>("/posts");
};

const addPost = (title: string, description: string, fullText: string) => {
  return axios.post("/posts", {
    title,
    description,
    fullText,
  });
};

const deletePost = (postId: string) => {
  return axios.delete(`/posts/${postId}`);
};

const editPost = (
  postId: string,
  title: string,
  description: string,
  fullText: string
) => {
  return axios.patch(`/posts/${postId}`, {
    title,
    description,
    fullText,
  });
};

const likePost = (postId: string) => {
  return axios.put(`/posts/like/${postId}`);
};

const getSinglePost = (postId: string) => {
  return axios.get<PostData>(`/posts/${postId}`);
};

const uploadImage = (postId: string, imageData: any) => {
  const formData = new FormData();
  formData.append("image", imageData);
  return axios.put(`/posts/upload/${postId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default {
  getAllPosts,
  getPostsTotal,
  addPost,
  getSinglePost,
  deletePost,
  editPost,
  likePost,
  uploadImage,
};
