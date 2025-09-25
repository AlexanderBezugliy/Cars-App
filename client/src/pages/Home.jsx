import React from "react";
import Hero from "../components/Hero";
import FeaturedSection from "../components/FeaturedSection";
import Banner from "../components/Banner";
import Testimonials from "../components/Testimonials";
import NewsLetter from "../components/NewsLetter";
import Cars from "./Cars";

const Home = () => {
    return (
        <>
            <Hero />
            <FeaturedSection />
            <Banner />
            <Testimonials />
            <NewsLetter />
            <Cars />
        </>
    );
};

export default Home;
