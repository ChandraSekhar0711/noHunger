// Suggested code may be subject to a license. Learn more: ~LicenseLog:363945543.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1411816351.
import { useState, useEffect } from "react";
import { useGeoLocation } from "./useGeoLocation";

const KM_RADIUS = 5; // Define the radius for nearby requests

export default function useDistanceCalculator(requests) {
  const userLocation = useGeoLocation();
  const [nearbyRequests, setNearbyRequests] = useState([]);

  useEffect(() => {
    if (requests.length > 0) {
      const filteredRequests = requests.filter(request => {
        const distance = calculateDistance(
          userLocation.location.coordinates.lat,
          userLocation.location.coordinates.lon,
          request.coordinates._lat,
          request.coordinates._long
        );
        return distance <= KM_RADIUS; 
      });
      console.log("filtered requests:",filteredRequests)
      setNearbyRequests(filteredRequests);
    }
  }, [requests, userLocation]); // Include userLocation in dependency array

  // Helper function to calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2,
 lon2) => {
    const EARTH_RADIUS_KM = 6371; 
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return EARTH_RADIUS_KM * c; 
  };

  // Helper function to convert degrees to radians
  const degreesToRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  return nearbyRequests;
}
