import React from 'react';
import { useGetUserQuery } from '../../store/api/userSlice';

const Profile = () => {
  const { data : user = {} } = useGetUserQuery();
  return (
    <div className='bg-teal-900 text-white text-center m-auto mt-16 rounded-2xl w-64 h-64 m-5 shadow-2xl overflow-hidden'>
      <p>Name : {user.email}</p>
      <p>Email : {user.password}</p>
    </div>
  )
}

export default Profile