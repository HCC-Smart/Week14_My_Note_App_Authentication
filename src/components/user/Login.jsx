import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../store/api/authSlice';
const Login = () => {

  const [login ] = useLoginMutation();

  const initialValues = {
    email: '',
    password: '',
  };
  const navigate = useNavigate();


  const validationSchema = Yup.object({
    email: Yup.string().required('email is required'),
    password: Yup.string().required('password is required'),

  });
   
  const handleSubmit =  async (values, { resetForm }) => {
    login({
        email: values.email,
        password: values.password,
    }).unwrap().then(() => {
      navigate("/");
      window.location.reload();
    }
    );


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
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
