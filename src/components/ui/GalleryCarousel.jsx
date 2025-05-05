// GalleryCarousel.jsx
import React from 'react';
import Slider from 'react-slick';

// Slick-ийн үндсэн CSS-үүдийг импортлох
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Зүүн товч (Prev)
function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full p-2 z-10"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}

// Баруун товч (Next)
function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full p-2 z-10"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}

const GalleryCarousel = ({ images }) => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {images.map((imgUrl, index) => (
          <div key={index} className="relative">
            <img
              src={imgUrl}
              alt={`Gallery slide ${index + 1}`}
              className="w-full h-40 object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GalleryCarousel;
