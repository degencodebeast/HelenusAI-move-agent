import Link from "next/link"
import { Logo } from "@/components/logo"
import { Twitter, Facebook, Instagram, Linkedin, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <Logo className="mb-6" />
            <p className="text-brand-darkGray/80 mb-6">
              HelenusAI helps you optimize your cryptocurrency portfolio with advanced AI technology and smart
              rebalancing strategies.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-brand-darkGray/60 hover:text-brand-blue transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-brand-darkGray/60 hover:text-brand-blue transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-brand-darkGray/60 hover:text-brand-blue transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-brand-darkGray/60 hover:text-brand-blue transition-colors">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-brand-darkGray/60 hover:text-brand-blue transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-brand-darkGray/80 hover:text-brand-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-brand-darkGray/80 hover:text-brand-blue transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-brand-darkGray/80 hover:text-brand-blue transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-brand-darkGray/80 hover:text-brand-blue transition-colors">
                  Press Kit
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-brand-darkGray/80 hover:text-brand-blue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/documentation" className="text-brand-darkGray/80 hover:text-brand-blue transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-brand-darkGray/80 hover:text-brand-blue transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-brand-darkGray/80 hover:text-brand-blue transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-brand-darkGray/80 hover:text-brand-blue transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-brand-darkGray/80 hover:text-brand-blue transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-brand-darkGray/80 hover:text-brand-blue transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-brand-darkGray/80 hover:text-brand-blue transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-brand-darkGray/80 hover:text-brand-blue transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-brand-darkGray/80 hover:text-brand-blue transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-brand-darkGray/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} HelenusAI. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/terms" className="text-brand-darkGray/60 hover:text-brand-blue transition-colors text-sm">
              Terms
            </Link>
            <Link href="/privacy" className="text-brand-darkGray/60 hover:text-brand-blue transition-colors text-sm">
              Privacy
            </Link>
            <Link href="/cookies" className="text-brand-darkGray/60 hover:text-brand-blue transition-colors text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

