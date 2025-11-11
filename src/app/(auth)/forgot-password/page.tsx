'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Logo } from "@/components/icons";
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
      toast({
        title: "Password reset email sent",
        description: "Please check your inbox for instructions to reset your password.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
         <div className="flex justify-center">
            <Logo className="h-8 w-8 mb-2" />
        </div>
        <CardTitle className="text-2xl font-headline">Forgot Your Password?</CardTitle>
        <CardDescription>
          {sent 
            ? "A reset link has been sent. Please check your email."
            : "Enter your email address and we'll send you a link to reset it."
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {!sent && (
            <form onSubmit={handlePasswordReset} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Send Reset Link"}
            </Button>
            </form>
        )}
        {sent && (
            <div className="text-center">
                 <Button variant="outline" asChild>
                    <Link href="/login">Back to Log In</Link>
                </Button>
            </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            Remembered your password?{" "}
            <Link href="/login" className="underline hover:text-primary">
              Log in
            </Link>
          </div>
      </CardFooter>
    </Card>
  );
}
