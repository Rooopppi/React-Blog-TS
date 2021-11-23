/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState, useMemo } from "react";
import CommentData from "../../interfaces/comment.type";
import CommentService from "../../api/comment-service";
import AddComment from "../addComment/addComment";
import Button from "../../style/Button.styled";
import Services from "../../style/Services.styled";
import { ServicesWrapper } from "../../pages/SinglePost/SinglePost.styled";
import { CommentStyled, ReplyComment } from "./Comment";
import { useAppSelector } from "../App/hooks";

interface Props {
  allComments: CommentData[];
  setAllComments: (commentsData: CommentData[]) => void;
}

function Comments({
  _id,
  text,
  dateCreated,
  commentedBy,
  likes,
  allComments,
  setAllComments,
  postID,
}: Props & CommentData) {
  const UserId = useAppSelector((state) => state.auth._id);
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [commentLikes, setCommentLikes] = useState(likes.length);

  useEffect(() => {
    if (likes.includes(UserId)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [UserId, likes]);

  const handleOnDelete = (commentId: string) => {
    CommentService.deleteComment(commentId).then(() => {
      CommentService.getAllComments(postID).then((res) => {
        setAllComments(res.data);
      });
    });
  };

  const handleOnLike = (commentId: string) => {
    CommentService.likeComment(commentId);
    if (isLiked) {
      setCommentLikes(commentLikes - 1);
    } else {
      setCommentLikes(commentLikes + 1);
    }
    setIsLiked(!isLiked);
  };

  const replyComments = useMemo(() => {
    return allComments.filter((comment) => comment.followedCommentID === _id);
  }, [allComments, _id]);

  return (
    <>
      {showEdit ? (
        <AddComment
          setShowEdit={setShowEdit}
          postId={postID}
          editComment={CommentService.editComment}
          commentId={_id}
          setAllComments={setAllComments}
        />
      ) : (
        <CommentStyled>
          <div className="comment-entry">
            <p className="comment-text">{text}</p>
          </div>
          <div className="comment-meta">
            <div className="comment-author">
              commented by {commentedBy || "anon"}
            </div>
            <div className="comment-date">
              commented at
              {dateCreated}
            </div>
          </div>
          <ServicesWrapper>
            <Button
              colored
              width="fit-content"
              type="button"
              onClick={() => isLoggedIn && handleOnLike(_id)}
            >
              {isLiked ? "Unlike" : "Like"} {commentLikes}
            </Button>
            <Services>
              {isLoggedIn && (
                <Button
                  type="button"
                  width="fit-content"
                  onClick={() => setShowReply(!showReply)}
                >
                  Reply
                </Button>
              )}
              {UserId === commentedBy && (
                <>
                  <Button
                    type="button"
                    width="fit-content"
                    onClick={() => setShowEdit(true)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    width="fit-content"
                    onClick={() => handleOnDelete(_id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </Services>
          </ServicesWrapper>
          {showReply && (
            <AddComment
              followedCommentID={_id}
              postId={postID}
              setAllComments={setAllComments}
              setShowReply={setShowReply}
              addComment={CommentService.addComment}
              backgroundDark="backgroundDark"
            />
          )}
        </CommentStyled>
      )}

      <ReplyComment>
        {replyComments.map((comment) => {
          return (
            <Comments
              allComments={allComments}
              key={comment._id}
              {...comment}
              postID={postID}
              setAllComments={setAllComments}
            />
          );
        })}
      </ReplyComment>
    </>
  );
}

export default Comments;
