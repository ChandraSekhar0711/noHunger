import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function useDistanceCalculator(userLocation,requests) {
  const [nearbyRequests, setNearbyRequests] = useState([]);
  console.log("Requests",requests);
  console.log("total number of requests",requests.length);
  console.log(userLocation.location.loaded);
  useEffect(() => {
    if (userLocation.location.loaded && requests.length > 0) {
      const filteredRequests = requests.filter(request => {
        const distance = calculateDistance(
          userLocation.location.coordinates.lat,
          userLocation.location.coordinates.lon,
          request.coordinates._lat,
          request.coordinates._long
        );
        return distance <= 5; // 5km radius
      });
      console.log("filtered requests:",filteredRequests)
      setNearbyRequests(filteredRequests);
    }
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  const degreesToRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  return nearbyRequests;
}
