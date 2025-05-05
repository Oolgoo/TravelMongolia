import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';
import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
  const navigation = useNavigation();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    getUserTrips();
  }, []);

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigation('/');
      return;
    }

    const q = query(collection(db, 'AITrips'), where('userEmail', '==', user.email));
    const querySnapshot = await getDocs(q);
    const trips = querySnapshot.docs.map(doc => ({
      id: doc.id, // Save the document ID for reference in deletions
      ...doc.data()
    }));
    setUserTrips(trips);
  };

  const deleteTrip = async (tripId) => {
    try {
      await deleteDoc(doc(db, 'AITrips', tripId));
      setUserTrips(currentTrips => currentTrips.filter(trip => trip.id !== tripId)); // Update state to reflect deletion
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>My Trips</h2>
      <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
        {userTrips.length > 0 ? userTrips.map(trip => (
          <UserTripCardItem key={trip.id} trip={trip} onDelete={() => deleteTrip(trip.id)} />
        )) : <p>No trips found. Start adding some!</p>}
      </div>
    </div>
  );
}

export default MyTrips;
