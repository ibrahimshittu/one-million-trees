"use client";

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:justify-between md:items-start">
          {/* Left side - Logo/Brand */}
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-xl font-bold">One Million Trees</h3>
            <p className="text-gray-300 text-sm max-w-md mx-auto md:mx-0">
              Leading Nigeria&apos;s largest reforestation initiative to combat
              climate change, restore ecosystems, and empower local communities
              through sustainable tree planting programs.
            </p>
            <div className="flex gap-4 pt-2 justify-center md:justify-start">
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right side - Contact Info */}
          <div className="text-center md:text-right space-y-2">
            <div className="text-sm text-gray-300">
              <p>Lagos, Nigeria</p>
              <p>contact@onemilliontrees.ng</p>
              <p>(+234) 901-234-5678</p>
            </div>
          </div>
        </div>

        {/* Bottom border and copyright */}
        <div className="border-t border-gray-800 mt-6 md:mt-8 pt-4 md:pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} One Million Trees Initiative. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
