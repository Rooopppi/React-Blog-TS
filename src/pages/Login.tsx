import { Link, Redirect } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAppSelector } from "components/App/hooks";
import { useDispatch } from "react-redux";
import CustomInputComponent from "../components/CustomInputComponent/CustomInputComponent";
import Button from "../style/Button.styled";
import FormWrapper from "../style/FormWrapper.styled";
import Title from "../style/Title.styled";
import FormEntry from "../style/FormEntry.styled";
import InputWrapper from "../style/InputWrapper.styled";
import Warn from "../style/Warn.styled";
import { login } from "../actions/auth";

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
});

function Login() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogin = (values: { email: string; password: string }) => {
    dispatch(login(values.email, values.password));
  };

  return (
    <FormWrapper>
      <FormEntry>
        <Title>Login</Title>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SigninSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <Form>
              <InputWrapper>
                <Field
                  name="email"
                  component={CustomInputComponent}
                  placeholder="Enter email"
                  backgroundDark="backgroundDark"
                />
              </InputWrapper>
              <InputWrapper>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  className="password"
                />
                {errors.password && touched.password ? (
                  <Warn>{errors.password}</Warn>
                ) : null}
              </InputWrapper>
              <Button colored type="submit">
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <span>or</span>
        <Link to="/register">
          <Button colored type="button">
            Register
          </Button>
        </Link>

        {isLoggedIn && <Redirect to="/profile" />}
      </FormEntry>
    </FormWrapper>
  );
}

export default Login;
