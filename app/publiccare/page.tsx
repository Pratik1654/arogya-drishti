'use client';

import { useState, useEffect } from 'react';

interface HealthcareLocation {
  id: string;
  name: string;
  type: string;
  googleMapsLink: string;
}

export default function HealthcareLocationsPage() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Common types of public healthcare locations
  const healthcareLocations: HealthcareLocation[] = [
    {
      id: '1',
      name: 'Nearest Hospital',
      type: 'Hospital',
      googleMapsLink: userLocation 
        ? `https://www.google.com/maps/search/hospitals/@${userLocation.lat},${userLocation.lng},12z`
        : 'https://www.google.com/maps/search/hospitals/'
    },
    {
      id: '2',
      name: 'Urgent Care Center',
      type: 'Urgent Care',
      googleMapsLink: userLocation 
        ? `https://www.google.com/maps/search/urgent+care/@${userLocation.lat},${userLocation.lng},12z`
        : 'https://www.google.com/maps/search/urgent+care/'
    },
    {
      id: '3',
      name: 'Public Health Clinic',
      type: 'Clinic',
      googleMapsLink: userLocation 
        ? `https://www.google.com/maps/search/public+health+clinic/@${userLocation.lat},${userLocation.lng},12z`
        : 'https://www.google.com/maps/search/public+health+clinic/'
    },
    {
      id: '4',
      name: 'Community Health Center',
      type: 'Health Center',
      googleMapsLink: userLocation 
        ? `https://www.google.com/maps/search/community+health+center/@${userLocation.lat},${userLocation.lng},12z`
        : 'https://www.google.com/maps/search/community+health+center/'
    },
    {
      id: '5',
      name: 'Pharmacy',
      type: 'Pharmacy',
      googleMapsLink: userLocation 
        ? `https://www.google.com/maps/search/pharmacy/@${userLocation.lat},${userLocation.lng},12z`
        : 'https://www.google.com/maps/search/pharmacy/'
    },
    {
      id: '6',
      name: 'Dental Clinic',
      type: 'Dental',
      googleMapsLink: userLocation 
        ? `https://www.google.com/maps/search/dental+clinic/@${userLocation.lat},${userLocation.lng},12z`
        : 'https://www.google.com/maps/search/dental+clinic/'
    },
    {
      id: '7',
      name: 'Mental Health Services',
      type: 'Mental Health',
      googleMapsLink: userLocation 
        ? `https://www.google.com/maps/search/mental+health+services/@${userLocation.lat},${userLocation.lng},12z`
        : 'https://www.google.com/maps/search/mental+health+services/'
    },
    {
      id: '8',
      name: 'Women\'s Health Clinic',
      type: 'Women\'s Health',
      googleMapsLink: userLocation 
        ? `https://www.google.com/maps/search/women%27s+health+clinic/@${userLocation.lat},${userLocation.lng},12z`
        : 'https://www.google.com/maps/search/women%27s+health+clinic/'
    }
  ];

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoading(false);
        },
        {
          timeout: 10000,
          enableHighAccuracy: false
        }
      );
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLocationClick = (mapsLink: string) => {
    window.open(mapsLink, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Finding healthcare locations near you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Healthcare Locations Near You
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Find public healthcare services in your area
          </p>
          {userLocation ? (
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Using your current location
            </div>
          ) : (
            <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Location access not available - showing general locations
            </div>
          )}
        </div>

        {/* Healthcare Location Buttons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {healthcareLocations.map((location) => (
            <button
              key={location.id}
              onClick={() => handleLocationClick(location.googleMapsLink)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-left border border-gray-200 hover:border-blue-300 hover:transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {location.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{location.type}</p>
                  <div className="flex items-center text-blue-600 font-medium">
                    <span>Find on Google Maps</span>
                    <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4 p-3 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Emergency Services</h3>
              <p className="mb-2">For life-threatening emergencies, call your local emergency number immediately.</p>
              <button
                onClick={() => handleLocationClick('https://www.google.com/maps/search/emergency+room/')}
                className="text-red-600 font-medium hover:text-red-700 flex items-center"
              >
                Find Emergency Rooms
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">24/7 Hotlines</h3>
              <p className="mb-2">Mental health and crisis support available 24/7.</p>
              <div className="space-y-1 text-sm">
                <div>National Suicide Prevention: <strong>988</strong></div>
                <div>Crisis Text Line: <strong>Text HOME to 741741</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}