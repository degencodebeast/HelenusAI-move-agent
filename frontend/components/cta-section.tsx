import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-premium relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIG9wYWNpdHk9IjAuMDUiPgo8cGF0aCBkPSJNMCAwSDEwMFYxMDBIMFYwWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTEwMCAwSDIwMFYxMDBIMTAwVjBaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMCAxMDBIMTAwVjIwMEgwVjEwMFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMDAgMTAwSDIwMFYyMDBIMTAwVjEwMFoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPC9zdmc+Cg==')]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-slide-up opacity-0 animate-once">
            Ready to Transform Your Crypto Investment Strategy?
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto animate-slide-up opacity-0 animate-once stagger-1">
            Join thousands of investors who are leveraging AI to optimize their portfolios and achieve their financial
            goals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up opacity-0 animate-once stagger-2">
            <Link
              href="/register"
              className="bg-white text-brand-navy font-medium py-3 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] flex items-center gap-2 group"
            >
              Get Started Now
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/demo"
              className="bg-transparent text-white border border-white/30 font-medium py-3 px-8 rounded-xl transition-all duration-300 hover:bg-white/10 active:scale-[0.98]"
            >
              Schedule a Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

