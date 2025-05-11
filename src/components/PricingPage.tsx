
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import Navbar from "./Navbar";

const pricingPlans = [
  {
    name: "Basic",
    description: "Essential tools for Instagram automation",
    monthlyPrice: 9.99,
    annualPrice: 99.99,
    features: [
      { name: "500 automated messages/month", included: true },
      { name: "Basic templates", included: true },
      { name: "Single Instagram account", included: true },
      { name: "Basic analytics", included: true },
      { name: "Email support", included: true },
      { name: "Audience segmentation", included: false },
      { name: "Custom templates", included: false },
      { name: "Priority support", included: false },
      { name: "API access", included: false },
    ],
    mostPopular: false,
  },
  {
    name: "Pro",
    description: "Advanced tools for growing creators",
    monthlyPrice: 19.99,
    annualPrice: 199.99,
    features: [
      { name: "2,000 automated messages/month", included: true },
      { name: "All basic templates", included: true },
      { name: "Up to 3 Instagram accounts", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Priority email support", included: true },
      { name: "Audience segmentation", included: true },
      { name: "Custom templates", included: true },
      { name: "API access", included: false },
      { name: "White-label options", included: false },
    ],
    mostPopular: true,
  },
  {
    name: "Enterprise",
    description: "Maximum power for businesses and agencies",
    monthlyPrice: 49.99,
    annualPrice: 499.99,
    features: [
      { name: "Unlimited automated messages", included: true },
      { name: "All templates + premium", included: true },
      { name: "Unlimited Instagram accounts", included: true },
      { name: "Full analytics suite", included: true },
      { name: "24/7 priority support", included: true },
      { name: "Advanced audience segmentation", included: true },
      { name: "AI-powered custom templates", included: true },
      { name: "API access", included: true },
      { name: "White-label options", included: true },
    ],
    mostPopular: false,
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="max-w-[85%] text-muted-foreground sm:text-lg">
              Choose the perfect plan for your Instagram automation needs. All plans include our core automation features.
            </p>
          </div>

          <div className="mx-auto flex max-w-[58rem] items-center justify-center space-x-2 py-8">
            <Label htmlFor="billing-switch" className={`${
              billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"
            }`}>
              Monthly
            </Label>
            <Switch
              id="billing-switch"
              checked={billingCycle === "annual"}
              onCheckedChange={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
            />
            <Label htmlFor="billing-switch" className={`${
              billingCycle === "annual" ? "text-foreground" : "text-muted-foreground"
            }`}>
              Annual <Badge className="ml-1 bg-primary/20 text-primary text-xs">20% Off</Badge>
            </Label>
          </div>

          <motion.div 
            className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {pricingPlans.map((plan, index) => (
              <Card 
                key={plan.name}
                className={`flex flex-col ${
                  plan.mostPopular ? "border-primary shadow-lg" : ""
                }`}
              >
                {plan.mostPopular && (
                  <div className="absolute inset-x-0 -top-4 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">
                      ${billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                    </span>
                    <span className="text-muted-foreground">
                      {billingCycle === "monthly" ? "/month" : "/year"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="grid gap-2">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-center gap-2">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className={`text-sm ${!feature.included ? "text-muted-foreground" : ""}`}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.mostPopular ? "default" : "outline"}
                  >
                    {index === 0 ? "Get Started" : index === 1 ? "Upgrade Now" : "Contact Sales"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </motion.div>
        </section>

        <section className="container py-12 md:py-24 lg:py-32 bg-secondary/20 rounded-lg">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <p className="text-muted-foreground sm:text-lg">
              Got questions? We've got answers.
            </p>
          </div>
          <div className="mx-auto grid max-w-[58rem] gap-6 py-8 md:grid-cols-2">
            {[
              {
                q: "What happens when I reach my monthly message limit?",
                a: "Once you reach your monthly message limit, you won't be able to send additional automated messages until your plan renews. You can always upgrade your plan mid-cycle to increase your limit."
              },
              {
                q: "Can I cancel my subscription anytime?",
                a: "Yes, you can cancel your subscription at any time. If you cancel, you'll have access to your plan features until the end of your current billing cycle."
              },
              {
                q: "Is there a free trial available?",
                a: "Yes, we offer a 14-day free trial on all plans. No credit card required to get started."
              },
              {
                q: "How many Instagram accounts can I connect?",
                a: "The Basic plan allows 1 account, Pro plan allows up to 3 accounts, and Enterprise plan offers unlimited account connections."
              },
              {
                q: "Do you offer refunds?",
                a: "We offer a 30-day money-back guarantee if you're not satisfied with our service."
              },
              {
                q: "Is my Instagram account safe?",
                a: "Yes, we use Instagram's official API and comply with all their terms of service to ensure your account remains in good standing."
              },
            ].map((faq, i) => (
              <div key={i} className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold">{faq.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t bg-secondary/20">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">AutoChirp</span>
          </div>
          <nav className="flex gap-4 sm:gap-6 md:ml-auto">
            <a href="#" className="text-sm hover:underline underline-offset-4">
              Terms
            </a>
            <a href="#" className="text-sm hover:underline underline-offset-4">
              Privacy
            </a>
            <a href="#" className="text-sm hover:underline underline-offset-4">
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
