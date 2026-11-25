import Navbar from '../components/Navbar'
import AboutDR from '../components/AboutDR'
import AboutDROption2 from '../components/AboutDROption2'
import AboutDROption3 from '../components/AboutDROption3'
import WhyChooseUs from '../components/WhyChooseUs'
import Facilities from '../components/Facilites'
import Services from '../components/Services'
import Process from '../components/Process'
import HealthInsights from '../components/HealthInsights'
// import CTA from '../components/CTA'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
// import Hero2 from '../components/Hero2'
import Seo from '../components/Seo'

const SinglePage = () => {
  return (
    <div className="min-w-0 overflow-x-clip">
      <Seo />
      <Navbar />

      {/* ====================================================================
          HERO SECTION OPTIONS (PRESERVED - DO NOT REMOVE)
          ==================================================================== */}
      {/* Option 1: Original Family Care Hero (Preserved) */}
      <Hero />

      {/* Option 2: Doctor Ronak Modi Hero (Preserved as current - kept commented as requested) */}
      {/* <Hero2 /> */}

      <AboutDR />
      <AboutDROption2 />
      <AboutDROption3 />
      <WhyChooseUs />
      <Facilities />
      <Services />
      <Process />
      <HealthInsights />
      <div>
        {/* ====================================================================
            ORIGINAL CTA SECTION (COMMENTED OUT - INTEGRATED INTO NEW FOOTER BANNER)
            ====================================================================
        <CTA /> */}
        <Footer />
      </div>
    </div>
  )
}

export default SinglePage
