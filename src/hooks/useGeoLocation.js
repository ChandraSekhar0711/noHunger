import { useEffect, useState } from "react";

export function useGeoLocation() {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lon: "" },
  });

  useEffect(() => {
    const intervel = setInterval(() => {
      if (!("geolocation" in navigator)) {
        console.log("Geolocation is not supported");
        onError({
          code: 0,
          message: "geolocation not supported",
        });
        clearInterval(intervel);
        return;
      }
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, 3000);

    function onSuccess (location){
      //console.log("Location fetched successfully:", location);
      setLocation({
        loaded: true,
        coordinates: {
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        },
      });
      clearInterval(intervel);
    };

    function onError(error){
      console.error("Error getting geolocation:", error);
      setLocation((prevState) => ({
        ...prevState,
        loaded: false,
        error,
      }));
      clearInterval(intervel);
    };


    return () => clearInterval(intervel);
  }, []); // Empty dependency array to run this effect only once

  return { location };
}
