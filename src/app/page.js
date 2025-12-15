'use client'
import { useEffect, useState, useRef } from "react";
import Hero from "@/components/Hero/Hero";
import Header from "@/components/Header/header";
import Why from "@/components/Why/why";
import Project from "@/components/Project/project"
import Stats from "@/components/Stats/stats"
import Rooms from "@/components/Rooms/rooms"
import Infrastructure from "@/components/Infrastructure/infrastructure"
import Trust from "@/components/Trust/trust"
import About from "@/components/About/about"
import FAQ from "@/components/FAQ/faq"
import Footer from "@/components/Footer/Footer";

export default function Home() {

  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  }, [])

  const heroVidRef = useRef(null)

  return (
    <main data-scroll-container>
    <Header/>
    <Hero cursorRef={heroVidRef}/>
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
