import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaWhatsapp, FaStar, FaEye, FaGlasses, FaUserMd, FaUsers } from "react-icons/fa";
import logo from "../assets/Raj-opticals-logo.png";
import { mapsOpenUrl, STORE_ADDRESS, mapsReviewsUrl } from "../constants/storeLocation";
import { useNavigate, Link } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const [reviewsCount, setReviewsCount] = useState(80);

  useEffect(() => {
    // Live fetching from Google Maps via AllOrigins CORS proxy with cache-busting
    const fetchLiveReviews = async () => {
      try {
        // Appending a unique timestamp parameter forces the proxy to bypass its 24-hour cache
        const targetUrl = `${mapsOpenUrl}&cb=${Date.now()}`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
        
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error("Proxy response failed");
        
        const data = await response.json();
        const html = data.contents;
        let parsedCount = 0;

        // Pattern 1: Schema.org microdata (meta tag)
        const schemaMatch = html.match(/itemprop="reviewCount"\s+content="(\d+)"/i) || 
                            html.match(/content="(\d+)"\s+itemprop="reviewCount"/i);
        if (schemaMatch && schemaMatch[1]) {
          parsedCount = parseInt(schemaMatch[1], 10);
        }

        // Pattern 2: JSON-LD metadata format
        if (!parsedCount) {
          const jsonLdMatch = html.match(/"reviewCount":\s*"?(\d+)"?/i);
          if (jsonLdMatch && jsonLdMatch[1]) {
            parsedCount = parseInt(jsonLdMatch[1], 10);
          }
        }

        // Pattern 3: Google Maps window.APP_INITIALIZATION_STATE array
        if (!parsedCount) {
          const appStateMatch = html.match(/\[null,null,\d+\.\d+,\s*(\d+)\]/);
          if (appStateMatch && appStateMatch[1]) {
            parsedCount = parseInt(appStateMatch[1], 10);
          }
        }

        console.log("Parsed dynamic Google Maps review count:", parsedCount);

        // Guard: Only update if we successfully found a realistic number of reviews
        if (parsedCount >= 80) {
          setReviewsCount(parsedCount);
        }
      } catch (error) {
        console.warn("Could not fetch live Google reviews count, using baseline 80 reviews:", error);
      }
    };

    fetchLiveReviews();
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">

        {/* Column 1: Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg md:text-xl font-bold mb-4">Contact Us</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2 hover:text-blue-300 transition-colors">
              <FaMapMarkerAlt className="text-blue-400 text-base md:text-lg flex-shrink-0 mt-0.5" />
              <a
                href={mapsOpenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs md:text-sm break-words"
              >
                {STORE_ADDRESS}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-green-400 text-base md:text-lg flex-shrink-0" />
              <span className="text-xs md:text-sm">
                Mon - Sat: 9:00 AM - 8:00 PM<br />
              </span>
            </div>
            <div className="flex items-center gap-2 hover:text-green-300 transition-colors">
              <FaPhoneAlt className="text-green-400 text-base md:text-lg flex-shrink-0" />
              <a href="tel:+918300905773" className="text-xs md:text-sm font-medium">Mob 83009 05773</a>
            </div>
            <div className="flex items-center gap-2 hover:text-blue-400 transition-colors">
              <FaStar className="text-yellow-400 text-base md:text-lg flex-shrink-0" />
              <a
                href={mapsReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs md:text-sm font-semibold flex items-center gap-1"
              >
                <span>5.0 ({reviewsCount} Google Reviews)</span>
                <span className="text-[10px] opacity-75">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg md:text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-xs md:text-sm">
            <li><Link to="/" className="hover:text-blue-300 transition-colors block">Home</Link></li>
            <li><Link to="/Aboutus" className="hover:text-blue-300 transition-colors block">About Us</Link></li>
            <li><Link to="/service" className="hover:text-blue-300 transition-colors block">Services</Link></li>
            <li><Link to="/Products" className="hover:text-blue-300 transition-colors block">Brands</Link></li>
            <li>
              <button
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  } else {
                    // If you're on a different page, navigate home first and then scroll
                    navigate("/", { replace: false });
                    setTimeout(() => {
                      const section = document.getElementById("contact");
                      if (section) section.scrollIntoView({ behavior: "smooth" });
                    }, 500);
                  }
                }}
                className="hover:text-blue-300 transition-colors block"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div className="space-y-4">
          <h3 className="text-lg md:text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex gap-3">
            <a
              href="https://wa.me/918300905773"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-400 transition-colors p-2 bg-gray-800 rounded-lg"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="text-base md:text-lg" />
            </a>
            <a
              href={mapsOpenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-400 transition-colors p-2 bg-gray-800 rounded-lg"
              aria-label="Google Maps"
            >
              <FaMapMarkerAlt className="text-base md:text-lg" />
            </a>
          </div>
        </div>

        {/* Column 4: Why Choose Us & Logo */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-lg md:text-xl font-bold mb-4">Why Choose Us</h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li className="flex items-center gap-2"><FaEye className="text-blue-400 text-xs md:text-sm flex-shrink-0" /> Advanced Eye Testing</li>
              <li className="flex items-center gap-2"><FaGlasses className="text-green-400 text-xs md:text-sm flex-shrink-0" /> Premium Frames & Lenses</li>
              <li className="flex items-center gap-2"><FaUserMd className="text-purple-400 text-xs md:text-sm flex-shrink-0" /> Expert Optometrists</li>
              <li className="flex items-center gap-2"><FaUsers className="text-yellow-400 text-xs md:text-sm flex-shrink-0" /> 20,000+ Satisfied Patients</li>
            </ul>
          </div>
          <div className="flex justify-left">
            <img src={logo} alt="VEL OPTICALS" className="w-24 md:w-28 h-auto" />
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-800 text-gray-400 py-3 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-xs md:text-sm">
            <p>&copy; {new Date().getFullYear()} VEL OPTICALS. All rights reserved.</p>
            <button
              type="button"
              onClick={() => navigate('/PrivacyPolicy')}
              className="text-blue-400 hover:text-blue-300 font-medium underline transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;