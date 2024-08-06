import React from 'react'
import Header from '../components/Header'
import MainLayout from '../components/MainLayout'

const Home = ({children}) => {
  return (
    <>
      <div className="w-full ">
        {children}  
      </div>
    </>
  )
}

export default Home
