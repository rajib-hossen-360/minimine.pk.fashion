'use client';

import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex items-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <div className="wa-tooltip-bubble mr-3 bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-gray-100 whitespace-nowrap">
          Need size help? Chat with us! 👋
        </div>
      )}

      <a
        href="https://wa.me/15552345678?text=Hello%20webnibo!%20I%20have%20a%20question%20about%20your%20products."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="wa-floating-btn relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 transition-transform duration-200"
      >
        <div className="wa-pulse-ring" />
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
