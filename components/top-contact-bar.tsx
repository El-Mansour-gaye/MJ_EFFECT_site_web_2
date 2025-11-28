import { Phone, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export function TopContactBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A] text-[#F5F5F5] px-4 py-2 text-xs md:text-sm">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 md:gap-6">
          <a href="tel:+221787565050" className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone size={14} />
            <span>+221 78 756 50 50</span>
          </a>
          <a href="https://wa.me/221787565050" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
            <FaWhatsapp size={16} />
            <span className="hidden md:inline">WhatsApp</span>
          </a>
        </div>
        <a href="mailto:contact@mj-effect.com" className="flex items-center gap-2 hover:text-white transition-colors mt-2 md:mt-0">
          <Mail size={14} />
          <span>contact@mj-effect.com</span>
        </a>
      </div>
    </div>
  );
}
