import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import ScrollShowcase from './components/ScrollShowcase'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import './index.css'

export default function App() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <ScrollShowcase />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </>
  )
}
