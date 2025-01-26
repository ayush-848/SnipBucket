import React from 'react'
import Hero from '../components/Hero'
import SnippetShowcase from '../components/SnippetShowcase'
import Navbar from '../components/Navbar'


const Home = () => {
  return (
    <div >
      <Navbar/>
      <Hero />
      <SnippetShowcase/>
    </div>
  )
}

export default Home
