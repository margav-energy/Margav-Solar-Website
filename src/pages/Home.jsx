import React from 'react'
import Hero from '../components/Hero'
import Process from '../components/Process'
import Services from '../components/Services'
// import FeaturesSection from '../components/Features'
// import ProductsSection from '../components/Products'
// import Statistics from '../components/Statistics'
import SavingsCalculator from '../components/SavingsCalculator'

const Home = () => {
  return (
    <>
      <Hero />
      <Process />
      <Services />
      {/* <FeaturesSection /> */}
      {/* <ProductsSection /> */}
      {/* <Statistics /> */}
      <SavingsCalculator />
    </>
  )
}

export default Home

