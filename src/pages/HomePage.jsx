import React from 'react'
import Hero from '../components/landing/Hero'
import Contact from '../components/landing/Contact'
import Footer from '../components/Footer'
import Features from '../components/landing/Features'
import About from '../components/landing/About'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Features />
      <About />
      <Contact />
      <Footer />

    </div>
  )
}

export default HomePage
