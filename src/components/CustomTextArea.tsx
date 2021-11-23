/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { FieldProps } from "formik";
import Warn from "../style/Warn.styled";
import TextArea from "../style/TextArea.styled";

interface CustomTextAreaProps {
  backgroundDark?: string;
  type?: string;
}

const CustomTextArea: React.FC<CustomTextAreaProps & FieldProps> = ({
  field,
  form: { touched, errors },
  backgroundDark,
  ...props
}) => (
  <div>
    <TextArea
      type="text"
      backgroundDark={backgroundDark}
      {...field}
      {...props}
    />
    {touched[field.name] && errors[field.name] && (
      <Warn>{errors[field.name]}</Warn>
    )}
  </div>
);

export default CustomTextArea;
