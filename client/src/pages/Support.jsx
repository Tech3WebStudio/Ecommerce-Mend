import React from 'react'
import { Layout } from '../componentes/Layout/Layout'
import { useSelector } from 'react-redux';

const Support = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <Layout isAuth={isAuth}>
        <h1>Panel en desarrollo</h1>
    </Layout>
  )
}

export default Support