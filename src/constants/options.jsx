export const SelectTravelesList=[
    {
        id:1,
        title:'Зөвхөн би',
        desc:'Ганцаараа аялах',
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'Хосоороо',
        desc:'Хоёр хүний аялал',
        icon:'🥂',
        people:'2 Хүн'
    },
    {
        id:3,
        title:'Гэр бүлээрээ',
        desc:'Гэр бүлийн олон хүний аялал',
        icon:'🏡',
        people:'3аас 5н хүн'
    },
    {
        id:4,
        title:'Найзууд',
        desc:'Найзуудаараа аялал төлөвлөх',
        icon:'⛵',
        people:'5аас 10н хүний аялал'
    },
]


export const SelectBudgetOptions=[
    {
        id:1,
        title:'Хямд',
        desc:'Байж болох хямд зардлаар аялах',
        icon:'💵',
    },
    {
        id:2,
        title:'Дундаж',
        desc:'Дундаж зардлаар аялах аялалууд',
        icon:'💰',
    },
    {
        id:3,
        title:'Тансаг',
        desc:'Үнд санаа зовохгүйгээр аялах',
        icon:'💸',
    },
]


export const AI_PROMPT='Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and  suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates,Place address, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'