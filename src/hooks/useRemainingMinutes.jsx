import { useEffect, useState } from "react";

const useRemainingMinutes = (expiryTimestamps) => {
  const [remainingMinutes, setRemainingMinutes] = useState({});

  useEffect(() => {
    const calculateRemainingMinutes = () => {
      const now = Date.now();
      const newRemainingMinutes = expiryTimestamps.reduce((acc, { id, expiryAt }) => {
        const remainingSeconds = Math.floor((expiryAt.seconds * 1000 - now) / 1000);
        acc[id] = Math.max(Math.floor(remainingSeconds / 60), 0);
        return acc;
      }, {});
      setRemainingMinutes(newRemainingMinutes);
    };

    calculateRemainingMinutes();
    const interval = setInterval(calculateRemainingMinutes, 60000); // Update every minute
    return () => clearInterval(interval); // Clean up interval on unmount
  }, [expiryTimestamps]);

  return remainingMinutes;
};

export default useRemainingMinutes;
