import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Reusable Input Component (text-base prevents iOS zoom on focus)
const FormInput = ({ label, type, name, value, onChange, placeholder, required = false }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">{label} {required && "*"}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full min-h-11 sm:min-h-12 text-base border border-gray-300 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-gray-50"
    />
  </div>
);

function AppointmentForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "",
    message: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Function to check if WhatsApp is installed
  const isWhatsAppInstalled = () => {
    // For mobile devices
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      return true; // Assume WhatsApp is installed on mobile devices
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format the message for WhatsApp
    const whatsappMessage = `
Hello Sir, I would like to book an appointment for an eye consultation.
Here's my details:

*Name:* ${formData.fullName}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Preferred Date:* ${formData.preferredDate}
*Additional Message:* ${formData.message || "No additional message"}

Thank you!
    `.trim();

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // WhatsApp phone number
    const whatsappNumber = "918300905773";
    
    // Check if WhatsApp is installed
    const hasWhatsApp = isWhatsAppInstalled();
    
    if (hasWhatsApp) {
      // Open WhatsApp app directly
      const whatsappAppUrl = `whatsapp://send?phone=${whatsappNumber}&text=${encodedMessage}`;
      window.location.href = whatsappAppUrl;
      
      // Fallback to WhatsApp Web after a delay if app doesn't open
      setTimeout(() => {
        if (!document.hidden) {
          const whatsappWebUrl = `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
          window.open(whatsappWebUrl, '_blank');
        }
      }, 2000);
    } else {
      // Directly open WhatsApp Web for desktop or devices without WhatsApp
      const whatsappWebUrl = `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
      window.open(whatsappWebUrl, '_blank');
    }
    
    // Reset form and close modal
    setFormData({ fullName: "", email: "", phone: "", preferredDate: "", message: "" });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="appointment-dialog-title"
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center overflow-y-auto overscroll-contain bg-black/60 backdrop-blur-sm p-0 sm:p-4 pt-[env(safe-area-inset-top)] pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className="bg-white shadow-2xl w-full max-w-[min(100%,28rem)] sm:max-w-lg relative flex flex-col max-h-[min(92dvh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-0.5rem))] sm:max-h-[min(90dvh,44rem)] rounded-t-2xl sm:rounded-2xl border border-gray-200 border-b-0 sm:border-b overflow-hidden"
            initial={{ scale: 0.96, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 px-4 sm:px-6 py-4 sm:py-5 flex gap-3 justify-between items-start shrink-0">
              <div className="min-w-0 pr-2">
                <h2
                  id="appointment-dialog-title"
                  className="text-lg sm:text-2xl font-bold text-white leading-tight"
                >
                  Book Your Appointment
                </h2>
                <p className="text-teal-100 text-xs sm:text-sm mt-1 leading-snug">
                  Get expert eye care consultation
                </p>
              </div>
              <button
                type="button"
                className="shrink-0 text-white hover:bg-white/20 rounded-full p-2 min-w-11 min-h-11 flex items-center justify-center transition-all duration-200 hover:rotate-90 touch-manipulation"
                onClick={onClose}
                aria-label="Close Appointment Form"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form: scrollable body + sticky submit for short viewports */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
              <div className="overflow-y-auto overscroll-contain flex-1 min-h-0 px-4 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-5">
                <FormInput
                  label="Full Name"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
                <FormInput
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
                <FormInput
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 1234567890"
                  required
                />
                <FormInput
                  label="Preferred Date"
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  required
                />

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any specific concerns or additional information..."
                    rows={3}
                    className="w-full min-h-[5.5rem] text-base border border-gray-300 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-gray-50 resize-y max-h-40"
                  />
                </div>
              </div>

              <div className="shrink-0 px-4 sm:px-6 pt-2 pb-4 sm:pb-5 sm:pt-3 bg-white border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
                <button
                  type="submit"
                  className="w-full min-h-12 sm:min-h-[3.25rem] text-sm sm:text-base bg-gradient-to-r from-blue-800 to-blue-600 text-white py-3 sm:py-3.5 rounded-xl font-bold hover:from-blue-700 hover:to-blue-600 active:scale-[0.99] sm:hover:scale-[1.01] transition-all duration-200 shadow-lg hover:shadow-xl touch-manipulation"
                >
                  Request Appointment via WhatsApp
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AppointmentForm;