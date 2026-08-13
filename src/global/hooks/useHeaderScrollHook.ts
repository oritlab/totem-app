import { useEffect, useState } from "react";

const SCROLL_ENTER_THRESHOLD = 24;
const SCROLL_EXIT_THRESHOLD = 8;

export default function useHeaderScrollHook() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(function () {
    function handleScroll() {
      setIsScrolled(function (previous) {
        if (!previous && window.scrollY > SCROLL_ENTER_THRESHOLD) return true;
        if (previous && window.scrollY < SCROLL_EXIT_THRESHOLD) return false;
        return previous;
      });
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return function () {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { isScrolled };
}
