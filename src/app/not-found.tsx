import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center px-4">
      <h1 className="text-6xl font-bold text-primary font-headline">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-muted-foreground">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Go back to Homepage</Link>
      </Button>
    </div>
  );
}
