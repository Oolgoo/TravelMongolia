import CommentSection from '@/Comments';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GallerySlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  if (!images || images.length === 0) return null;

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="relative">
      <img
        className="w-full h-64 object-cover rounded cursor-pointer"
        src={`http://localhost:1337${images[currentIndex].url}`}
        alt={`Gallery Image ${currentIndex + 1}`}
        onClick={handleImageClick}
      />
      <button
        onClick={handleNext}
        className="absolute top-2 right-2 bg-white bg-opacity-75 p-2 rounded-full hover:bg-opacity-100 transition"
      >
        &#x27A1;
      </button>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <img
            className="max-w-full max-h-full object-contain"
            src={`http://localhost:1337${images[currentIndex].url}`}
            alt={`Enlarged Gallery Image ${currentIndex + 1}`}
          />
        </div>
      )}
    </div>
  );
};

const TravelPlanDetail = () => {
  const { id } = useParams(); // URL-оос id-г авч байна
  const [travelPlan, setTravelPlan] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderData, setOrderData] = useState({ name: '', phone: '', email: '' });
  // orderStatus: '' – анх хоосон, 'pending' – илгээсэн ба баталгаажуулахыг хүлээж байгаа, 'approved' – баталгаажсан
  const [orderStatus, setOrderStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Travel plan-ыг Strapi-аас авах
  useEffect(() => {
    fetch('http://localhost:1337/api/travel-plans?populate=*')
      .then(response => response.json())
      .then(data => {
        const foundPlan = data.data.find(plan => plan.id.toString() === id);
        setTravelPlan(foundPlan);
      })
      .catch(error => console.error('Error fetching travel plans:', error));
  }, [id]);

  // Жишээ болгон: хэрэв статус "pending" бол 5 секунд дараа "approved"-г шинэчилнэ
  useEffect(() => {
    let timer;
    if (orderStatus === 'pending') {
      timer = setTimeout(() => {
        // Энд API-аас статусыг шалгаж шинэчилж болно.
        setOrderStatus('approved');
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [orderStatus]);

  if (!travelPlan) {
    return <div className="p-8">Loading...</div>;
  }

  // Strapi-аас ирж буй талбаруудыг задлан авч байна.
  const {
    planTitle,
    planDesc,
    coverImage,
    planContent,
    gallery,
    companyImage,
    description,
    budget,
  } = travelPlan;

  const renderContent = (content) => {
    if (!content) return null;
    return content.map((item, index) => {
      if (item.type === 'paragraph') {
        return (
          <p key={index}>
            {item.children.map(child => child.text).join('')}
          </p>
        );
      }
      return null;
    });
  };

  // Формын утгуудыг өөрчлөх
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({ ...prev, [name]: value }));
  };

  // Form илгээх функц. Strapi руу POST хүсэлт илгээнэ.
  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    fetch('http://localhost:1337/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Илгээх үед статусыг "pending" болгож өгч байна.
      body: JSON.stringify({ data: { ...orderData, status: 'pending' } }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Order submitted:', data);
        setOrderStatus('pending');
        setIsSubmitting(false);
      })
      .catch(error => {
        console.error('Error submitting order:', error);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="w-full bg-[#f9f9f9] py-8">
      <div className="max-w-[1240px] mx-auto px-4 text-black">
        {/* Том cover зураг */}
        {coverImage && coverImage.url && (
          <img
            className="w-full h-96 object-cover rounded mb-8"
            src={`http://localhost:1337${coverImage.url}`}
            alt={planTitle || 'Cover Image'}
          />
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Зүүн багана: үндсэн мэдээлэл */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{planTitle}</h1>
            <p className="text-gray-600 mt-4 mb-4">{planDesc}</p>
            {description && (
              <div className="bg-white p-4 rounded shadow mb-4">
                <h2 className="font-semibold mb-2">Аялалын танилцуулга</h2>
                <p className="text-gray-700">{description}</p>
              </div>
            )}
            {/* Шинэчилсэн budget хэсэг */}
            {budget && (
              <div className="flex flex-col items-start mb-4">
                <div className="bg-green-100 p-2 rounded shadow transition-transform duration-300 hover:scale-105 w-full">
                  <h2 className="text-green-700 text-sm font-semibold mb-1">Үнэ</h2>
                  <p className="text-green-600 text-sm">{budget}</p>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setShowOrderForm(true)}
                    className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-300"
                  >
                    Захиалах
                  </button>
                  <button
                    onClick={() => window.location.href = "https://bftour.mn/"}
                    className="bg-gray-500 text-white text-xs px-3 py-1 rounded hover:bg-gray-600 transition-colors duration-300"
                  >
                    Дэлгэрэнгүй
                  </button>
                </div>
              </div>
            )}
            <div className="text-gray-800 text-base">
              {renderContent(planContent)}
            </div>
          </div>

          {/* Баруун багана: Галерей болон Our Company хэсэг */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            {gallery && Array.isArray(gallery) && gallery.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-2">Аялалын зурагнууд</h2>
                <GallerySlider images={gallery} />
              </div>
            )}

            {companyImage && companyImage.url && (
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold mb-2">Аялалын зохион байгуулж буй компань</h2>
                <img
                  className=" h-20 object-cover rounded-full"
                  src={`http://localhost:1337${companyImage.url}`}
                  alt="Company Logo"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Захиалах Form-ийн Modal хэсэг */}
      {showOrderForm && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setShowOrderForm(false)}
        >
          <div
            className="bg-white p-6 rounded shadow-md w-80 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowOrderForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              X
            </button>
            <h2 className="text-lg font-bold mb-4 text-center">Захиалах</h2>
            <form onSubmit={handleOrderSubmit}>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Нэр</label>
                <input
                  type="text"
                  name="name"
                  value={orderData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 py-1"
                  required
                  disabled={orderStatus === 'pending'}
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Утас</label>
                <input
                  type="text"
                  name="phone"
                  value={orderData.phone}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 py-1"
                  required
                  disabled={orderStatus === 'pending'}
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={orderData.email}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 py-1"
                  required
                  disabled={orderStatus === 'pending'}
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting || orderStatus === 'pending'}
                  className={`text-white text-sm px-4 py-2 rounded transition-colors duration-300 ${
                    orderStatus === 'pending'
                      ? 'bg-green-500'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {orderStatus === 'pending'
                    ? 'Хүсэлт илгээсэн, зөвшөөрөл хүлээж байна'
                    : orderStatus === 'approved'
                    ? 'Хүсэлт зөвшөөрөгдсөн'
                    : 'Илгээх'}
                </button>
              </div>
            </form>
          </div>
          
        </div>
      )}
        <div><CommentSection  /></div>
    </div>
  );
};

export default TravelPlanDetail;
