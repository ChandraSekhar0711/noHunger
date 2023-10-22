import { useEffect, useState } from "react";

export function useScrollPosition() {
  const [isBottom, setIsBottom] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      //console.log(window.innerHeight + document.documentElement.scrollTop);
      setIsBottom(
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight
      );
    });
  }, []);
  return { isBottom };
}
