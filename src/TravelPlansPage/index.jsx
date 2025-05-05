// src/TravelPlansPage.jsx
import React, { useState } from 'react';
import GalleryCarousel from '@/components/ui/GalleryCarousel';
import { Link } from 'react-router-dom';
const TravelPlansPage = () => {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [budget, setBudget] = useState('');
  const [travelPlans, setTravelPlans] = useState([]);

  // Аяллын хайлт хийх функц
  const handleSearch = async () => {
    let url = 'http://localhost:1337/api/travel-plans?populate=*';
    const filters = [];
    if (destination) {
      filters.push(`filters[destination][$eq]=${encodeURIComponent(destination)}`);
    }
    if (duration) {
      filters.push(`filters[duration][$eq]=${duration}`);
    }
    if (budget) {
      filters.push(`filters[budget][$eq]=${budget}`);
    }
    if (filters.length > 0) {
      url += '&' + filters.join('&');
    }
    try {
      const res = await fetch(url);
      const data = await res.json();
      setTravelPlans(data.data || []);
    } catch (error) {
      console.error('Error fetching travel plans:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Хайлтын хэсэг */}
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <h2 className="text-2xl font-bold mb-4">Аяллын хайлт</h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Аялах газар</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Жишээ: Улаанбаатар"
              className="border p-2 w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Хэдэн өдрийн аялал</label>
            <input
              type="number"
              min="1"
              max="30"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="1-30 хоног"
              className="border p-2 w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Аялалын төсөв</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Жишээ: 5000000"
              className="border p-2 w-full"
            />
          </div>
        </div>
        <button onClick={handleSearch} className="bg-blue-500 text-white py-2 px-4 rounded">
          Хайх
        </button>
      </div>

      {/* Хайлтын үр дүнгийн хэсэг */}
      {travelPlans.length === 0 ? (
        <p>Тохирох аялал олдсонгүй.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {travelPlans.map((plan) => {
            // Өгөгдлийг шууд plan-оос авна (attributes давхарцгүй)
            const { id, destination, duration, budget, description, coverImage, gallery } = plan;
            // coverImage URL үүсгэж байна
            const coverImageUrl =
              coverImage && coverImage.url ? `http://localhost:1337${coverImage.url}` : null;
            // galleryImages: хэрэв gallery байгаа бол массив, байхгүй бол coverImage-г нэг элементийн массив болгон ашиглана
            const galleryImages =
              gallery && Array.isArray(gallery) && gallery.length > 0
                ? gallery.map((img) => `http://localhost:1337${img.url}`)
                : coverImageUrl
                ? [coverImageUrl]
                : [];

            return (
              <div key={id} className="bg-white rounded-md shadow-md overflow-hidden flex flex-col sm:flex-row">
                {/* Зүүн талд зураг/галерей */}
                <div className="sm:w-1/3 relative">
                  {galleryImages.length > 0 && (
                    <GalleryCarousel images={galleryImages} />
                  )}
                </div>
                {/* Баруун талд мэдээлэл */}
                <div className="sm:w-2/3 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{destination || 'Нэргүй аялал'}</h3>
                    <p className="text-gray-600 mb-1">Хугацаа: {duration} хоног</p>
                    <p className="text-gray-600 mb-1">Төсөв: {budget} ₮</p>
                    
                  </div>
                  <div>
                  <Link to={`/plan/${id}`}>
                  <button className="bg-green-500 text-white py-1 px-4 rounded">
                    Дэлгэрэнгүй үзэх
                  </button>
                  </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TravelPlansPage;
