import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
import "./login-form.css";

window.axios = axios;

function LoginForm({ errors, touched, isSubmitting }) {
  // console.log(errors);
  console.log(isSubmitting);
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
          className={errors.firstName ? "invalid" : ""}
          // defaultValue="john"
        />
        <p className="error-text">
          {touched.firstName && errors.firstName}
        </p>
      </div>

      <div className="form-group">
        <label>First Name</label>
        <Field
          autoComplete="off"
          type="text"
          id="email"
          name="email"
          className={errors.firstName ? "invalid" : ""}
          // defaultValue="john"
        />
        <p className="error-text">
          {touched.firstName && errors.firstName}
        </p>
      </div>

      <div className="form-group">
        <label>First Name</label>
        <Field
          autoComplete="off"
          type="text"
          id="password"
          name="password"
          className={errors.firstName ? "invalid" : ""}
          // defaultValue="john"
        />
        <p className="error-text">
          {touched.firstName && errors.firstName}
        </p>
      </div>
      
     <checkbox></checkbox>

      {isSubmitting && <p>Loading...</p>}
      <button
        className="submit-button"
        disabled={isSubmitting}
      >
        Submit &rarr;
      </button>
    </Form>
  );
}

export default withFormik({
  mapPropsToValues: () => {
    return {
      firstName: "",
      lastName: ""
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
    firstName: Yup.string()
      .min(
        3,
        "First Name should be at least 5 characters long"
      )
      .max(10)
      .required("First Name is required"),
    lastName: Yup.string()
      .min(3)
      .max(10)
      .required()
  })
})(LoginForm);
