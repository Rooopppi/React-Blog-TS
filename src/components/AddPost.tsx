import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PostService from "../api/posts-service";
import CustomInputComponent from "./CustomInputComponent/CustomInputComponent";
import CustomTextArea from "./CustomTextArea";
import getAllPostsOrdered from "../utils/getAllPostsOrdered";
import Button from "../style/Button.styled";
import InputWrapper from "../style/InputWrapper.styled";
import Title from "../style/Title.styled";
import { PostData } from "../interfaces/post.type";

interface Props {
  _id?: string;
  setPostData?: (postData: PostData) => void;
  setAllPosts?: (allPosts: PostData[]) => void;
}

interface FormValues {
  title: string;
  description: string;
  fullText: string;
}

const addPostSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  fullText: Yup.string()
    .min(30, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
});

function AddPost({ _id, setPostData, setAllPosts }: Props) {
  const initialValues: FormValues = {
    title: "",
    description: "",
    fullText: "",
  };

  const handleOnSubmit = async (values: FormValues, { resetForm }: any) => {
    if (_id) {
      await PostService.editPost({ _id, ...values });
      const { data: post } = await PostService.getSinglePost(_id);
      setPostData!(post);
    } else {
      await PostService.addPost(
        values.title,
        values.description,
        values.fullText
      );
      getAllPostsOrdered().then(setAllPosts);
    }
    resetForm();
  };

  return (
    <div>
      <div>
        {_id && <Title>Add your post</Title>}
        <Formik
          initialValues={initialValues}
          validationSchema={addPostSchema}
          onSubmit={handleOnSubmit}
        >
          {() => (
            <Form className="addPost-form">
              <InputWrapper>
                <Field
                  name="title"
                  component={CustomInputComponent}
                  placeholder="Enter title"
                />
              </InputWrapper>
              <InputWrapper>
                <Field
                  name="description"
                  component={CustomInputComponent}
                  placeholder="Enter description"
                />
              </InputWrapper>
              <InputWrapper>
                <Field
                  name="fullText"
                  placeholder="Enter text"
                  component={CustomTextArea}
                />
              </InputWrapper>
              <Button colored width="100px" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddPost;
