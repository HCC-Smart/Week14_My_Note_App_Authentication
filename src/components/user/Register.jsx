import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRegisterMutation } from '../../store/api/authSlice';
import { useNavigate } from 'react-router-dom';
const Register = () => {

  const [register ] = useRegisterMutation();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Title is required'),
    email: Yup.string().required('Content is required'),
    password: Yup.string().required('Content is required'),

  });
  const navigate = useNavigate();

  const handleSubmit = (values, { resetForm }) => {
    // Send the data to the server (localhost:9000/create_note)
    console.log(values);
    register({
      name: values.name,
      email: values.email,
      password: values.password,

    }).unwrap().then(()=>{
        navigate("/login")
        window.location.reload();

    })
    

    // Reset the form after submission
    resetForm();
  };

  return (
    
    <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-5">
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="name"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="name" component="div" className="text-red-500" />
          </div>

          <div className="mb-5">
            <Field
              type="text"
              name="email"
              placeholder="emal"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="email" component="div" className="text-red-500" />
          </div>
          <div className="mb-5">
            <Field
              type="text"
              name="password"
              placeholder="password"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="password" component="div" className="text-red-500" />
          </div>

          <button
            type="submit"
            className="block w-full bg-yellow-400 text-black font-bold p-4 rounded-lg hover:bg-yellow-500"
          >
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
