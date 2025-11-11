import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
    const aboutImage = PlaceHolderImages.find(img => img.id === 'prop-2');
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            About RealEstate Insights
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            We are dedicated to revolutionizing the real estate industry by providing transparent, data-driven insights. Our mission is to empower buyers, sellers, and investors with the tools they need to make informed decisions with confidence.
          </p>
          <div className="space-y-4 text-foreground">
            <div>
              <h3 className="font-headline text-2xl font-semibold">Our Vision</h3>
              <p className="text-muted-foreground">To create a more efficient and equitable real estate market for everyone, powered by cutting-edge technology and artificial intelligence.</p>
            </div>
            <div>
              <h3 className="font-headline text-2xl font-semibold">Our Technology</h3>
              <p className="text-muted-foreground">Our platform is built on sophisticated machine learning models that analyze millions of data points, including historical sales, market trends, and property features, to deliver highly accurate price predictions and insights.</p>
            </div>
          </div>
        </div>
        <div>
        {aboutImage && (
          <Image
            src={aboutImage.imageUrl}
            alt={aboutImage.description}
            width={600}
            height={600}
            className="rounded-lg shadow-lg object-cover aspect-square"
            data-ai-hint={aboutImage.imageHint}
          />
          )}
        </div>
      </div>
    </div>
  );
}
