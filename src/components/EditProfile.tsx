import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { EditUserData } from "interfaces/user.type";
import { useDispatch } from "react-redux";
import { getUser } from "../actions/auth";
import UserService from "../api/user-service";
import CustomInputComponent from "./CustomInputComponent/CustomInputComponent";
import CustomTextArea from "./CustomTextArea";
import Button from "../style/Button.styled";
import InputWrapper from "../style/InputWrapper.styled";
import { useAppSelector } from "./App/hooks";

const editProfileShema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  details: Yup.string()
    .min(5, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  extra_details: Yup.string()
    .min(5, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  profession: Yup.string()
    .min(5, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  skills: Yup.string()
    .min(5, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
});

function EditProfile() {
  const { _id } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleEditProfile = (values: EditUserData, { resetForm }: any) => {
    UserService.editUser(_id, values).then(() => {
      dispatch(getUser());
      resetForm();
    });
  };

  return (
    <div className="editProfile-wrapper">
      <div className="editProfile">
        <Formik
          initialValues={{
            name: "",
            extra_details: "",
            skills: "",
            profession: "",
            details: "",
          }}
          validationSchema={editProfileShema}
          onSubmit={handleEditProfile}
        >
          {() => (
            <Form>
              <InputWrapper>
                <Field
                  name="name"
                  component={CustomInputComponent}
                  placeholder="Enter name"
                  backgroundDark="backgroundDark"
                />
              </InputWrapper>
              <InputWrapper>
                <Field
                  name="profession"
                  component={CustomInputComponent}
                  placeholder="Enter profession"
                  backgroundDark="backgroundDark"
                />
              </InputWrapper>
              <InputWrapper>
                <Field
                  name="extra_details"
                  component={CustomTextArea}
                  placeholder="Enter extraDetails"
                  backgroundDark="backgroundDark"
                />
              </InputWrapper>
              <InputWrapper>
                <Field
                  name="skills"
                  placeholder="Enter skills"
                  component={CustomTextArea}
                  backgroundDark="backgroundDark"
                />
              </InputWrapper>
              <InputWrapper>
                <Field
                  name="details"
                  placeholder="Enter details"
                  component={CustomTextArea}
                  backgroundDark="backgroundDark"
                />
              </InputWrapper>
              <Button type="submit" colored width="fit-content">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default EditProfile;
