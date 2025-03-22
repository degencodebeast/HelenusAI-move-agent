import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Basic",
    description: "For crypto beginners",
    price: "$0",
    duration: "Free forever",
    features: [
      "Portfolio tracking",
      "Basic market insights",
      "Limited AI chat queries",
      "Single portfolio",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "For active traders",
    price: "$19",
    duration: "per month",
    features: [
      "Everything in Basic",
      "Automated rebalancing",
      "Advanced analytics",
      "Unlimited AI chat",
      "Multiple portfolios",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For institutions",
    price: "$99",
    duration: "per month",
    features: [
      "Everything in Pro",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "Team collaboration",
      "24/7 phone support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary/20 px-3 py-1 text-sm text-secondary">Pricing</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that fits your needs. All plans include a 14-day free trial.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`bg-card/50 backdrop-blur-sm border-border/50 flex flex-col ${
                plan.popular ? "border-secondary/50 shadow-lg shadow-secondary/10" : ""
              }`}
            >
              <CardHeader>
                {plan.popular && (
                  <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    Most Popular
                  </div>
                )}
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground"> {plan.duration}</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className={`w-full ${plan.popular ? "bg-secondary hover:bg-secondary/90" : ""}`}>
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

