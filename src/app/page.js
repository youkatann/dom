'use client'
import { useEffect, useState, useRef } from "react";
import Hero from "@/components/Hero/hero";
import Header from "@/components/Header/header";
import Why from "@/components/Why/why";
import MainButton from "@/components/common/Button/button";
import Project from "@/components/Project/project"
import Stats from "@/components/Stats/stats"
import Rooms from "@/components/Rooms/rooms"
import Infrastructure from "@/components/Infrastructure/infrastructure"
import Trust from "@/components/Trust/trust"
import About from "@/components/About/about"
import FAQ from "@/components/FAQ/faq"
import Footer from "@/components/Footer/Footer";

export default function Home() {

  const [isLoading, setIsLoading] = useState(true)

  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();

          setTimeout( () => {
            setIsLoading(false);
            document.body.style.cursor = 'default'
            window.scrollTo(0,0);
          }, 2000)
      }
    )()
  }, [])

  const stickyElement = useRef(null)
  const heroVidRef = useRef(null)

  return (
    <main data-scroll-container>
    <Header ref={stickyElement}/>
    <Hero cursorRef={heroVidRef} isLoading={isLoading} />
    <Why/>
    <Project/>
    <Stats/>
    <Rooms/>
    <Infrastructure/>
    <Trust/>
    <About/>
    <FAQ/>
    <Footer/>
    </main>
  );
}
