import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// src/components/PartnerSlider.jsx
import React from 'react';
import Slider from 'react-slick';
import { FaGoogle, FaFacebookF, FaReact, FaAmazon, FaGithub, FaYoutube, FaLinkedin, FaMicrosoft } from 'react-icons/fa';

const partners = [
  { icon: <FaGoogle className="text-4xl text-blue-600" />, name: 'Google' },
  { icon: <FaFacebookF className="text-4xl text-blue-500" />, name: 'Facebook' },
  { icon: <FaReact className="text-4xl text-sky-500" />, name: 'React' },
  { icon: <FaAmazon className="text-4xl text-yellow-500" />, name: 'Amazon' },
  { icon: <FaGithub className="text-4xl text-gray-800" />, name: 'GitHub' },
  { icon: <FaMicrosoft className="text-4xl text-blue-700" />, name: 'Microsoft' },
  { icon:  <FaLinkedin className="text-4xl text-blue-800" />, name: 'Linkedin' },
  { icon: <FaYoutube className="text-4xl text-red-600" />, name: 'Youtube' },
];

const PartnerSlider = () => {
const settings = {
  infinite: true,
  speed: 2500, // faster = smoother
  slidesToShow: 8,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0, // ⬅️ this makes it scroll continuously
  cssEase: "linear", // ⬅️ smooth linear scroll
  arrows: false,
  pauseOnHover: false,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 4 } },
    { breakpoint: 768, settings: { slidesToShow: 3 } },
    { breakpoint: 480, settings: { slidesToShow: 2 } },
  ],
};
  return (
    <section >
         <h2 className="text-4xl  text-green-500 font-bold text-center mt-24 mb-6">Our Partners</h2>
      <div className="py-2 rounded-2xl bg-blue-50 my-6">
       
      <div className="max-w-11/12 mx-auto px-2">
        <Slider {...settings}>
          {partners.map((partner, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-4">
              {partner.icon}
              <p className="text-sm mt-2">{partner.name}</p>
            </div>
          ))}
        </Slider>
      </div>
      </div>
    </section>
  );
};

export default PartnerSlider;
