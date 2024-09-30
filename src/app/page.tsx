import { Button } from "@/components/ui/button";
import { SignedOut, SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";
import { BarChart, Menu, TreePalm, Users2 } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-black text-white">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TreePalm className="h-8 w-8" />
            <span className="text-2xl font-bold">Field Focus</span>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link
              href="#features"
              className="hover:text-gray-300 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="hover:text-gray-300 transition-colors"
            >
              Pricing
            </Link>

            <Link
              href="#contact"
              className="hover:text-gray-300 transition-colors"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <SignedIn>
              <Link href="/profile">
                <Button variant="ghost">
                  Profile
                </Button>
                </Link>
              <UserButton />

            </SignedIn>
            <SignedOut>
              <Link href="/sign-up">
                <Button className="bg-blue-700 text-white font-semibold hover:bg-gray-200 hover:text-zinc-700">
                  Sign Up
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button className="bg-white text-black hover:bg-gray-200 font-semibold">
                  Log In
                </Button>
              </Link>
            </SignedOut>

            <Button variant="ghost" className="md:hidden text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-white text-black py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Manage Your Farm with Precision
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Field Focus helps small-scale commercial farmers optimize
              operations, increase yields, and boost profitability.
            </p>
            <Link href="/sign-up">
              <Button className="bg-black text-white hover:bg-gray-800 text-lg py-2 px-6">
                Sign Up
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-16 bg-gray-100" id="features">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<TreePalm className="h-10 w-10" />}
                title="Crop Management"
                description="Track and optimize your crop cycles, from planting to harvest."
              />
              <FeatureCard
                icon={<Users2 className="h-10 w-10" />}
                title="Staff Management"
                description="Manage your farm staff, assign tasks, and track progress."
              />
              <FeatureCard
                icon={<BarChart className="h-10 w-10" />}
                title="Track Inputs"
                description="Monitor the usage of fertilizers, pesticides, and other inputs."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Field Focus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }:{icon: React.ReactNode, title: string, description: string}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="text-black mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
