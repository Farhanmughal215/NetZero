import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200/50">
      <div className="max-w-[2000px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <img 
              src="https://media.ourwebprojects.pro/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-13-at-2PM-1.png"
              alt="NetZero Carbon Logo"
              className="h-12 w-auto"
            />
            <p className="text-sm text-gray-600">
              Leading the transition to a carbon-neutral future through renewable energy certification.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-secondary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Contact', 'Documentation'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-accent transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium text-secondary mb-4">Legal</h4>
            <ul className="space-y-2">
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-accent transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-secondary mb-4">Contact</h4>
            <a
              href="mailto:contact@netzerocarbon.com"
              className="text-sm text-gray-600 hover:text-accent transition-colors"
            >
              contact@netzerocarbon.com
            </a>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-gray-600 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            © {new Date().getFullYear()} NetZero Carbon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;