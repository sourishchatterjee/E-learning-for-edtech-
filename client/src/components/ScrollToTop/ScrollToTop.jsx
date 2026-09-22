// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const ScrollToTop = () => {
//   const { pathname } = useLocation();

//   // useEffect(() => {
//   //   // Scroll to top on every route change
//   //   window.scrollTo({ top: 0, behavior: "smooth" });
//   //    AOS.init({ duration: 1000 }); 
//   // }, [pathname]);

//   useEffect(() => {
//   if ('scrollRestoration' in window.history) {
//     window.history.scrollRestoration = 'manual';
//   }

//   window.scrollTo({ top: 0, behavior: 'instant' });

//   AOS.init({ duration: 1000 });
// }, [pathname]);


//   return null;
// };

// export default ScrollToTop;

















import { useEffect } from "react";
import { useLocation } from "react-router-dom";


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Prevent browser scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Instantly scroll to top first (avoids flash of old scroll position)
    window.scrollTo({ top: 0, behavior: "instant" });

    // Then allow a smooth scroll a few ms later to ensure better UX
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50); // You can adjust the delay as needed

    AOS.init({ duration: 1000 });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
