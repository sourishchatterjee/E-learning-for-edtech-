import React from 'react'
import Layout from '../../../layout/Layout'
import Banner from '../../../components/homeComponent/banner/Banner'; 
import FeatureSection from '../../../components/homeComponent/PopularTopic/FeatureSection';
import AboutUs from '../../../components/homeComponent/PopularTopic/AboutUs';
import TopicComponent from '../../../components/homeComponent/PopularTopic/TopicComponent';
import Review from '../../../components/homeComponent/review/Review';
import Testimonials from '../../../components/homeComponent/Testimonials/Testimonials'
import DownloadApp from '../../../components/homeComponent/downloadApp/DownloadApp';
import PopularCourses from '../../../components/homeComponent/popularCourses/PopularCourses';

const Home = () => {
  return (
    <>
  <Layout>
      <Banner />
      <FeatureSection />
      <AboutUs />
      <TopicComponent />
      <PopularCourses/>
      <Review/>
      <Testimonials/>
      <DownloadApp/>
      </Layout>
    </>
  );
};

export default Home;
