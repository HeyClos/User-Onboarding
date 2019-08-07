import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const UserForm = ({ errors, touched, values, handleSubmit, status }) => {
    const [users, setUsers] = useState([]);
    console.log(users);
  
    useEffect(() => {
      if (status) {
        setUsers([...users, status]);
      }
    }, [status]);
  
    return (
      <div className="User-form">
      
        <h1>User Form</h1>
        <Form>
          <Field type="text" name="name" placeholder="Name" />
          {touched.name && errors.name && (
            <p className="error">{errors.name}</p>
          )}
  
          <Field type="email" name="email" placeholder="Email" />
          {touched.email && errors.email && <p className="error">{errors.email}</p>}
          
          <Field type="password" name="password" placeholder="Password" />
          {touched.password && errors.password && <p className="error">{errors.password}</p>}
          
          <label className="checkbox-container">
            Terms of Service
            <Field type="checkbox" name="tos" checked={values.tos} />
            <span className="checkmark" />
          </label>
  
          <button type="submit">Submit!</button>
        </Form>
  
        {users.map(user => (
          <p key={user.id}>{user.email}</p>
        ))}
      </div>
    );
  };

  const FormikForm = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
      return {
        name: name || '',
        email: email || '',
        password: password || '',
        tos: tos || false
      };
    },
  
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required('You need a name!'),
      email: Yup.string()
        .email("Email not valid")
        .required('Email is required'),
      password: Yup.string()
        .min(7, "Password must be 7 characters or longer")
        .required('You dont want just anybody logging in!'),
      tos: Yup.bool()
        .required('You dont have to read them, just accept')
    }),
  
    handleSubmit(values, { setStatus }) {
      axios
        .post('https://reqres.in/api/users/', values)
        .then(res => {
          setStatus(res.data);
        })
        .catch(err => console.log(err.response));
    }
  })(UserForm); 
  
  export default FormikForm;
