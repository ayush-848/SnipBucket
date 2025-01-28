import React from 'react'
import Hero from '../components/Hero'
import SnippetShowcase from '../components/SnippetShowcase'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div >
      <Navbar/>
      <Hero />
      <SnippetShowcase/>
      <Footer/>
    </div>
  )
}

export default Home
