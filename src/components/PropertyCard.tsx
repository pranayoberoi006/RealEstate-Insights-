import Link from "next/link";
import Image from "next/image";
import type { Property } from "@/lib/dummy-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === property.imageId);

  return (
    <Link href={`/properties/${property.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        {image && (
          <Image
            src={image.imageUrl}
            alt={property.name}
            width={600}
            height={400}
            className="w-full object-cover aspect-video"
            data-ai-hint={image.imageHint}
          />
        )}
        <CardHeader>
          <CardTitle className="font-headline text-xl">{property.name}</CardTitle>
          <CardDescription>{property.location}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
            <p className="text-lg font-semibold">
                {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                }).format(property.price)}
            </p>
            <Badge variant="secondary">{property.category}</Badge>
        </CardContent>
      </Card>
    </Link>
  );
}
