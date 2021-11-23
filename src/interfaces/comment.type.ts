export default interface CommentData {
  _id: string;
  commentedBy: string;
  followedCommentID: string;
  postID: string;
  text: string;
  dateCreated: string;
  likes: string[];
}
