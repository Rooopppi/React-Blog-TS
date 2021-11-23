/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { FieldProps } from "formik";
import Warn from "../../style/Warn.styled";
import Input from "../../style/Input.styled";

interface CustomInputProps {
  backgroundDark?: string;
  type?: string;
}

const CustomInputComponent: React.FC<CustomInputProps & FieldProps> = ({
  field,
  form: { touched, errors },
  type = "text",
  backgroundDark,
  ...props
}) => (
  <div>
    <Input backgroundDark={backgroundDark} type={type} {...field} {...props} />
    {touched[field.name] && errors[field.name] && (
      <Warn>{errors[field.name]}</Warn>
    )}
  </div>
);

export default CustomInputComponent;
