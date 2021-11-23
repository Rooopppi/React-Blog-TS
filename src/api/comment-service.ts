import axios from "./inst";
import CommentData from "../interfaces/comment.type";

const getAllComments = (postId: string) => {
  return axios.get<CommentData[]>(`/comments/post/${postId}`);
};

const addComment = (
  postId: string,
  text: string,
  followedCommentID: string
) => {
  return axios.post(`/comments/post/${postId}`, {
    text,
    followedCommentID,
  });
};

const deleteComment = (commentId: string) => {
  return axios.delete(`/comments/${commentId}`);
};

const editComment = (commentId: string, text: string) => {
  return axios.patch(`/comments/${commentId}`, {
    text,
  });
};

const likeComment = (commentId: string) => {
  return axios.put(`/comments/like/${commentId}`);
};

export default {
  getAllComments,
  addComment,
  deleteComment,
  editComment,
  likeComment,
};
