import React from 'react'
import Hero from '../components/Hero'
import SnippetShowcase from '../components/SnippetShowcase'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import About from '../components/About'


const Home = () => {
  return (
    <div >
      <Navbar/>
      <Hero />
      <About/>
      <SnippetShowcase/>
      <Footer/>
    </div>
  )
}

export default Home
