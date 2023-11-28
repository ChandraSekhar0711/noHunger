import { useEffect, useState } from "react";

export function useGeoLocation() {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lon: "" },
  });

  useEffect(() => {
    let retry = 1;
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

      if(retry === 3) {
        clearInterval(intervel);
      }

      retry = retry + 1;
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    });

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
