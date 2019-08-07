import React from 'react'

const UserForm = ({ errors, touched, values, handleSubmit, status }) => {
    const [animals, setAnimals] = useState([]);
    console.log(animals);
  
    useEffect(() => {
      if (status) {
        setAnimals([...animals, status]);
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
  
        {animals.map(animal => (
          <p key={animal.id}>{animal.species}</p>
        ))}
      </div>
    );
  };
  
  // Higher Order Component - HOC
  // Hard to share component / stateful logic (custom hooks)
  // Function that takes in a component, extends some logic onto that component,
  // returns a _new_ component (copy of the passed in component with the extended logic)
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
        .required('You dont want just anybody logging in!')
    }),
  
    handleSubmit(values, { setStatus }) {
      axios
        .post('https://reqres.in/api/users/', values)
        .then(res => {
          setStatus(res.data);
        })
        .catch(err => console.log(err.response));
    }
  })(UserForm); // currying functions in Javascript
  
  export default FormikForm;
