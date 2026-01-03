import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Youtube, ArrowRight, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-8 text-brand-dark">
      <div className="container mx-auto px-6">
        {/* Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-end pb-12 border-b border-gray-100 mb-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Join the <span className="text-brand-gold">Noise.</span>
            </h2>
            <p className="text-gray-500">Get the latest gear drops and event production tips delivered to your inbox.</p>
          </div>
          <div className="w-full lg:w-auto mt-8 lg:mt-0">
            <div className="flex border-b border-brand-dark pb-2">
              <input type="email" placeholder="Enter your email" className="w-full lg:w-80 outline-none bg-transparent placeholder-gray-400" />
              <button className="text-brand-gold hover:text-brand-dark transition-colors">
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col items-center align-center ">
            <h3 className="text-xl font-serif font-bold uppercase tracking-widest mb-6">Raagadjaudio.</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              The city's premier audio rental house. We amplify human connection through precision sound.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-brand-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-brand-gold transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-brand-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-brand-gold transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Inventory</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <Link to="/equipment" className="hover:text-brand-gold">
                  Speakers & Subs
                </Link>
              </li>
              <li>
                <Link to="/equipment" className="hover:text-brand-gold">
                  Microphones
                </Link>
              </li>
              <li>
                <Link to="/equipment" className="hover:text-brand-gold">
                  DJ Consoles
                </Link>
              </li>
              <li>
                <Link to="/equipment" className="hover:text-brand-gold">
                  Lighting
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <Link to="/about" className="hover:text-brand-gold">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-gold">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-brand-gold">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-brand-gold">
                  Terms & Privacy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Visit Us</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex gap-3">
                <MapPin size={18} className="text-brand-gold" /> 123 Audio Ave, NY 10012
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="text-brand-gold" /> +1 (555) 012-3456
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="text-brand-gold" /> hello@Raagadjaudio..com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 uppercase tracking-wider">
          <p>© 2025 Raagadjaudio. Rentals. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-brand-dark">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-brand-dark">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
