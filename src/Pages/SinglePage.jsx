import Navbar from '../components/Navbar'
import AboutDR from '../components/AboutDR'
import Facilities from '../components/Facilites'
import Services from '../components/Services'
import Process from '../components/Process'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Seo from '../components/Seo'

const SinglePage = () => {
  return (
    <div className="min-w-0 overflow-x-clip">
      <Seo />
      <Navbar />
      <Hero />
      <AboutDR />
      <Facilities />
      <Services />
      <Process />
      <div className="bg-[#051d39]">
        <CTA />
        <Footer />
      </div>
    </div>
  )
}

export default SinglePage
