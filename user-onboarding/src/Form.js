import React from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
//import "./login-form.css";

window.axios = axios;

function LoginForm({ touched, isSubmitting, handleSubmit }) {
  // console.log(errors);
  // console.log(isSubmitting);
  // console.log(touched);
  return (
    <Form className="login-form">
      <h2>Create User</h2>
      <div className="form-group">
        <label htmlFor="username">Name</label>
        <Field
          autoComplete="off"
          type="text"
          id="name"
          name="name"
          placeholder="Enter name here"
          //className={errors.firstName ? "invalid" : ""}
          // defaultValue="john"
        />
        {/* <p className="error-text">
          {touched.firstName && errors.firstName}
        </p> */}
      </div>

      <div className="form-group">
        <label>Email</label>
        <Field
          // autoComplete="off"
          type="email"
          id="email"
          name="email"
          // placeholder="Enter email here"
          // className={errors.firstName ? "invalid" : ""}
          // defaultValue="john"
        />
        {/* <p className="error-text">
          {touched.firstName && errors.firstName}
        </p> */}
      </div>

      <div className="form-group">
        <label>Password</label>
        <Field
          autoComplete="off"
          type="password"
          id="password"
          name="password"
          placeholder="Enter pasword here"
          // className={errors.firstName ? "invalid" : ""}
          // defaultValue="john"
        />
        {/* <p className="error-text">
          {touched.firstName && errors.firstName}
        </p> */}
      </div>

      <label>
        <Field type="checkbox" name="tos" />
        I read the terms!
      </label>

      {isSubmitting && <p>Loading...</p>}
      <button type="submit"
        className="submit-button"
        disabled={isSubmitting}
      >
        Submit
      </button>
    </Form>
  );
}

export default withFormik({
  mapPropsToValues: ({name, email, password, tos}) => {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false
    };
  },
  handleSubmit: (values, formikBag) => {
    formikBag.resetForm();
    console.log("FORM SUCCESSFULLY SUBMITTED");
    const url = "https://reqres.in/api/users";
    formikBag.setSubmitting(true);
    axios.post(url, values).then(response => {
      console.log(response.data);
      window.alert(
        "Form submitted " + response.data.firstName
      );
      formikBag.setSubmitting(false);
    });
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(3, "First Name should be at least 3 characters long")
      .max(10)
      .required("First Name is required"),
    email: Yup.string()
      .min(3)
      .max(20)
      .required(),
    password: Yup.string()
    .min(3, "your password must have at least 3 characters")
    .max(10)
    .required("password is required"),
    tos: Yup.boolean().oneOf([true], "gotta be true bro")
  })
})(LoginForm);
