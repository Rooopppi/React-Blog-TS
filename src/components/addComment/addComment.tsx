/* eslint-disable react/require-default-props */
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CommentService from "../../api/comment-service";
import CustomTextArea from "../CustomTextArea";
import Button from "../../style/Button.styled";
import InputWrapper from "../../style/InputWrapper.styled";
import AddCommentTitle from "./addComment.styled";
import CommentData from "../../interfaces/comment.type";

interface Props {
  postId: string;
  followedCommentID?: string;
  setAllComments: (commentData: CommentData[]) => void;
  setShowReply?: (showReply: boolean) => void;
  setShowEdit?: (showEdit: boolean) => void;
  commentId?: string;
  backgroundDark?: string;
}

interface FormValues {
  text: string;
}

const addCommentSchema = Yup.object().shape({
  text: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

function AddComment({
  postId,
  followedCommentID,
  setAllComments,
  setShowReply,
  setShowEdit,
  commentId,
  backgroundDark,
}: Props) {
  const initialValues: FormValues = { text: "" };

  const handleOnSubmit = async (values: FormValues, { resetForm }: any) => {
    if (commentId) {
      await CommentService.editComment(commentId, values.text);
      setShowEdit!(false);
    } else {
      await CommentService.addComment(postId, values.text, followedCommentID!);
      if (setShowReply) {
        setShowReply(false);
      }
    }
    const { data: comments } = await CommentService.getAllComments(postId);
    setAllComments(comments);

    resetForm();
  };

  return (
    <div>
      <div>
        {!commentId &&
          (postId === followedCommentID ? (
            <AddCommentTitle>Add your comment</AddCommentTitle>
          ) : (
            <AddCommentTitle>Reply</AddCommentTitle>
          ))}

        <Formik
          initialValues={initialValues}
          validationSchema={addCommentSchema}
          onSubmit={handleOnSubmit}
        >
          {() => (
            <Form>
              <InputWrapper>
                <Field
                  name="text"
                  placeholder="Enter text"
                  component={CustomTextArea}
                  backgroundDark={backgroundDark}
                />
              </InputWrapper>
              <Button type="submit" colored width="fit-content">
                Submit
              </Button>
              {setShowEdit && (
                <Button
                  type="button"
                  width="fit-content"
                  onClick={() => setShowEdit(false)}
                >
                  Edit
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddComment;
