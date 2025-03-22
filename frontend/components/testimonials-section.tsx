import { Star } from "lucide-react"

const testimonials = [
  {
    content:
      "HelenusAI has transformed how I manage my crypto portfolio. The AI suggestions have been spot-on and helped me maximize my returns.",
    author: "Sarah K.",
    role: "Crypto Investor",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    content:
      "The intuitive interface and powerful AI tools make portfolio management so much easier. I've seen a 25% increase in my returns since I started using HelenusAI.",
    author: "Michael Chen",
    role: "Day Trader",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    content:
      "As someone new to crypto investing, HelenusAI has been invaluable. The AI assistant guides me through complex decisions with clear, actionable advice.",
    author: "Jessica T.",
    role: "Beginner Investor",
    avatar: "/placeholder.svg?height=48&width=48",
  },
]

const TestimonialCard = ({ content, author, role, avatar }: { content: string, author: string, role: string, avatar: string }) => {
  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="fill-brand-blue text-brand-blue" />
        ))}
      </div>
      <p className="text-brand-darkGray/90 flex-grow mb-6">{content}</p>
      <div className="flex items-center">
        <img src={avatar || "/placeholder.svg"} alt={author} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-brand-darkGray/70">{role}</p>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-brand-gray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up opacity-0 animate-once">
          <span className="inline-block py-1 px-3 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            What Our <span className="text-gradient">Users</span> Say
          </h2>
          <p className="text-lg text-brand-darkGray/80">
            Join thousands of satisfied users who have transformed their investment strategies with HelenusAI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="animate-scale-in opacity-0 animate-once"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

