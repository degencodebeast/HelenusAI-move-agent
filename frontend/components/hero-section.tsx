import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-radial from-brand-blue/10 to-transparent opacity-60 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-brand-navy/10 to-transparent opacity-60 blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6 md:pr-10 animate-slide-up opacity-0 animate-once">
            <span className="inline-block py-1 px-3 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-medium mb-2">
              Intelligent Portfolio Management
            </span>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight">
              Balance Your <span className="text-gradient">Crypto</span> Portfolio with AI
            </h1>
            <p className="text-lg md:text-xl text-brand-darkGray/80 max-w-lg">
              HelenusAI uses artificial intelligence to optimize your cryptocurrency portfolio for maximum returns and
              minimal risk.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/register" className="premium-button flex items-center justify-center gap-2 group">
                Get Started
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/demo" className="secondary-button flex items-center justify-center gap-2">
                Watch Demo
              </Link>
            </div>

            <div className="flex items-center gap-4 pt-6">
              <div className="flex -space-x-2">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              </div>
              <p className="text-sm text-brand-darkGray">
                <span className="font-semibold">1,500+</span> financial experts trust HelenusAI
              </p>
            </div>
          </div>

          <div className="md:w-1/2 mt-12 md:mt-0 animate-fade-in opacity-0 animate-once stagger-2">
            <div className="relative">
              <div className="glass-card p-8 shadow-strong">
                <img
                  src="/balance.jpg"
                  alt="Crypto Trading Dashboard"
                  className="rounded-lg shadow-md w-full h-[420px] object-cover"
                />

                <div className="absolute -bottom-6 -right-6 glass-card p-4 shadow-soft animate-float">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      <span>+32%</span>
                    </div>
                    <div>
                      <p className="text-xs text-brand-darkGray/70">Portfolio Growth</p>
                      <p className="font-semibold">Last Quarter</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-6 -left-6 glass-card p-4 shadow-soft animate-float animation-delay-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-brand-navy h-12 w-12 rounded-full flex items-center justify-center text-white">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15848 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 17H12.01"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-brand-darkGray/70">AI Assistant</p>
                      <p className="font-semibold">24/7 Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

