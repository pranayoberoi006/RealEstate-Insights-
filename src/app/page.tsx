import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { properties } from "@/lib/dummy-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa"; // ✅ import icons

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-1");
  const featuredProperties = properties
    .filter((p) => PlaceHolderImages.some((img) => img.id === p.imageId))
    .slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative w-full pt-12 md:pt-24 lg:pt-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unlock Smarter Real Estate Decisions
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our AI-powered platform provides accurate price predictions
                    and market insights to help you navigate the property market
                    with confidence.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/how-it-works">Get Started</Link>
                  </Button>
                </div>
              </div>
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={600}
                  height={400}
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                  data-ai-hint={heroImage.imageHint}
                />
              )}
            </div>
          </div>
        </section>

        {/* FEATURED PROPERTIES */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                  Featured Properties
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore a selection of properties from our platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-sm gap-6 py-12 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            <div className="flex justify-center">
              <Button variant="outline" asChild>
                <Link href="/properties">View More Properties</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">
                How It Works
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform leverages cutting-edge AI to give you personalized
                real estate guidance. Discover how we can help you achieve your
                goals.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button asChild>
                <Link href="/how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 👇 OUR DEVELOPERS SECTION 👇 */}
        <section className="py-16 bg-gray-50 text-center">
          <h2 className="font-headline text-3xl font-bold text-gray-800 mb-10">
            Our Developers
          </h2>

          <div className="flex flex-wrap justify-center gap-10">
            {/* Pranay Oberoi */}
            <div className="bg-white shadow-lg rounded-2xl p-6 w-72">
              <img
                src="/pranay.jpg"
                alt="Pranay Oberoi"
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-blue-500"
              />
              <h3 className="mt-4 text-lg font-semibold">Pranay Oberoi</h3>
              <p className="text-gray-600 text-sm mb-4">
                Full Stack Developer (AI & Web Integration)
              </p>
              <div className="flex justify-center gap-5">
                <a
                  href="https://www.linkedin.com/in/pranay-oberoi-058747312/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-110"
                  title="LinkedIn"
                >
                  <FaLinkedin size={22} />
                </a>
                <a
                  href="mailto:oberoipranay0@gmail.com"
                  className="text-red-500 hover:text-red-700 transition-transform transform hover:scale-110"
                  title="Email"
                >
                  <FaEnvelope size={22} />
                </a>
                <a
                  href="https://github.com/pranayoberoi006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-black transition-transform transform hover:scale-110"
                  title="GitHub"
                >
                  <FaGithub size={22} />
                </a>
              </div>
            </div>

            {/* Raghav Sharma */}
            <div className="bg-white shadow-lg rounded-2xl p-6 w-72">
              <img
                src="/raghav.jpg"
                alt="Raghav Sharma"
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-green-500"
              />
              <h3 className="mt-4 text-lg font-semibold">Raghav Sharma</h3>
              <p className="text-gray-600 text-sm mb-4">
                Backend Developer (Flask & Prediction Systems)
              </p>
              <div className="flex justify-center gap-5">
                <a
                  href="https://www.linkedin.com/in/raghav-sharma-9861a6347/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-110"
                  title="LinkedIn"
                >
                  <FaLinkedin size={22} />
                </a>
                <a
                  href="mailto:raghav8569.beaift24@chitkara.edu.in"
                  className="text-red-500 hover:text-red-700 transition-transform transform hover:scale-110"
                  title="Email"
                >
                  <FaEnvelope size={22} />
                </a>
                <a
                  href="https://github.com/Raghavvvvvvvvvvv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-black transition-transform transform hover:scale-110"
                  title="GitHub"
                >
                  <FaGithub size={22} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
