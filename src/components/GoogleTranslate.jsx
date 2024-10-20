import React, { useEffect, useState } from "react";

const GoogleTranslate = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    window.googleTranslateInit = () => {
      if (!window.google?.translate?.TranslateElement) {
        setTimeout(window.googleTranslateInit, 100);
      } else {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,hi,pa,sa,mr,ur,bn,es,ja,ko,zh-CN,nl,fr,de,it,ta,te',
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          defaultLanguage: 'en',
          autoDisplay: false,
        }, 'google_element');
      }
    };

    const loadGoogleTranslateScript = () => {
      if (!document.getElementById("google_translate_script")) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateInit";
        script.id = "google_translate_script";
        script.onerror = () => console.error('Error loading Google Translate script');
        document.body.appendChild(script);
      }
    };

    loadGoogleTranslateScript();

    if (window.google && window.google.translate) {
      window.googleTranslateInit();
    }

    const handleScroll = () => {
      setIsVisible(window.scrollY < 100); // Adjust the scroll amount as needed
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    
  }, []);

  return (
    <div id="google_element" className="google-translate-container" style={{ marginLeft: '20px' }}>
      <style jsx>{`
        .goog-te-combo {
          background-color: white; /* White background */
          border: 2px solid #ff4464; /* Updated border color */
          border-radius: 0.5rem; /* Slightly more rounded */
          padding: 0.5rem 1rem; /* Tailwind: p-2 */
          font-size: 0.875rem; /* Tailwind: text-sm */
          transition: all 0.3s ease; /* Smooth transition */
          outline: none;
          color: #ff4464; /* Updated text color */
          font-weight: 500; /* Tailwind: font-medium */
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Slight shadow */
        }

        .goog-te-combo:hover {
          background-color: #ffebee; /* Light pink on hover */
          border-color: #ff4464; /* Teal border on hover */
          color: #ff4464; /* Updated text color on hover */
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.25); /* Stronger shadow on hover */
        }

        .goog-logo-link {
          display: none !important; /* Hide Google logo */
        }

        .goog-te-gadget {
          color: transparent !important;
        }

        .goog-te-gadget > span > a {
          display: none !important;
        }

        .goog-te-gadget .goog-te-combo {
          color: #ff4464 !important; /* Updated text color */
        }

        #google_translate_element .goog-te-gadget-simple .goog-te-menu-value span:first-child {
          display: none;
        }

        #google_translate_element .goog-te-gadget-simple .goog-te-menu-value:before {
          content: 'Translate'; /* Change the default text */
          color: #ff4464; /* Updated text color */
        }

        .goog-te-banner-frame {
          display: none !important; /* Hide the banner frame */
        }

        .goog-te-menu-frame {
          max-height: 400px !important;
          overflow-y: auto !important;
          background-color: white; /* White background for dropdown */
          border: 1px solid #ff4464; /* Updated border color */
          border-radius: 0.5rem; /* Slightly more rounded */
        }

        /* Customize the iframe */
        .skiptranslate > iframe {
          height: 0 !important;
          border-style: none;
          box-shadow: none;
        }

        /* Ensure the body margin isn't affected by Google Translate */
        body {
          top: 0px !important;
          position: relative;
        }
      `}
      </style>
    </div>
  );
};

export default GoogleTranslate;
