import { Bot, LineChart, Shield, Zap, ArrowUpRight } from "lucide-react"

const features = [
  {
    icon: <Bot className="text-brand-blue" size={24} />,
    title: "AI-Powered Assistant",
    description: "Get personalized investment advice and portfolio recommendations from our advanced AI assistant.",
  },
  {
    icon: <LineChart className="text-brand-blue" size={24} />,
    title: "Real-time Analytics",
    description: "Monitor your portfolio performance with real-time data and comprehensive analytics.",
  },
  {
    icon: <Shield className="text-brand-blue" size={24} />,
    title: "Risk Management",
    description: "Advanced risk assessment tools to help you make informed investment decisions.",
  },
  {
    icon: <Zap className="text-brand-blue" size={24} />,
    title: "Automated Rebalancing",
    description: "Automatically rebalance your portfolio to maintain your desired asset allocation.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white to-brand-gray/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-radial from-brand-lightBlue/5 to-transparent opacity-60 blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up opacity-0 animate-once">
          <span className="inline-block py-1 px-3 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-medium mb-4">
            Powerful Features
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Everything You Need for <span className="text-gradient">Smart</span> Investing
          </h2>
          <p className="text-lg text-brand-darkGray/80">
            Our platform combines cutting-edge AI technology with intuitive design to provide you with a seamless
            investing experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-6 transition-all duration-300 hover:shadow-strong hover:-translate-y-1 animate-scale-in opacity-0 animate-once"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="bg-brand-blue/10 w-12 h-12 rounded-xl flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-brand-darkGray/80 mb-4">{feature.description}</p>
              <a href="#" className="inline-flex items-center text-brand-blue font-medium group">
                Learn more
                <ArrowUpRight
                  size={16}
                  className="ml-1 transition-transform group-hover:translate-x-1 group-hover:translate-y-[-2px]"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

