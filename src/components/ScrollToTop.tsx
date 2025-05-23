
import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Effect for scroll to top button visibility and position
  const toggleVisibility = () => {
    // Check if user has scrolled down enough to show button
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    
    // Check if user is near the bottom of the page
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const buffer = 100; // pixels from bottom to trigger "at bottom" state
    
    setIsAtBottom(scrollTop + windowHeight >= documentHeight - buffer);
  };

  // Manual scroll to top function for the button
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Effect to scroll to top when the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Effect for scroll button visibility
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('resize', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('resize', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed z-50 p-3 rounded-full bg-ghibli-forest text-white shadow-lg hover:bg-ghibli-meadow transition-all duration-300 transform hover:-translate-y-1 ${
            isAtBottom ? 'bottom-20 right-6' : 'bottom-6 right-6'
          }`}
          aria-label="맨 위로 이동"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
