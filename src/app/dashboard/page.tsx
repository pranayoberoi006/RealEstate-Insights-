'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { getPredictionSummaryAction } from '@/app/actions';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Loader2, ArrowUpRight } from 'lucide-react';
import type { PredictionHistoryItem } from '@/lib/types';

type PredictionHistory = PredictionHistoryItem[];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [history, setHistory] = useState<PredictionHistory>([]);
  const [summary, setSummary] = useState<string>('');
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      // We need to check for window to ensure localStorage is available
      if (typeof window !== 'undefined') {
        const storedHistory = localStorage.getItem(`predictionHistory_${user.uid}`);
        if (storedHistory) {
          const parsedHistory = JSON.parse(storedHistory);
          setHistory(parsedHistory);
          if (parsedHistory.length > 0) {
            generateSummary(parsedHistory);
          }
        }
      }
    }
  }, [user]);

  const generateSummary = async (currentHistory: PredictionHistory) => {
    setIsSummaryLoading(true);
    try {
      const result = await getPredictionSummaryAction({ history: currentHistory });
      setSummary(result.summary);
    } catch (error) {
      console.error('Error generating summary:', error);
      setSummary('Could not generate a summary at this time.');
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1 && names[1]) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading || !user) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="space-y-4">
          <Skeleton className="h-10 w-1/3" />
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-1/4" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="space-y-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">
          Dashboard
        </h1>
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.photoURL ?? ''} />
                <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xl font-semibold leading-none">{user.displayName || 'User'}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prediction History</CardTitle>
            <CardDescription>Review your past property price predictions.</CardDescription>
          </CardHeader>
          <CardContent>
            {history.length > 0 && (
                <Alert className="mb-6">
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle className="font-headline">Your Prediction Summary</AlertTitle>
                    <AlertDescription>
                        {isSummaryLoading ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Generating summary...</span>
                            </div>
                        ) : (
                            summary
                        )}
                    </AlertDescription>
                </Alert>
            )}
            {history.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>You haven't made any predictions yet.</p>
                <p>Your history will appear here once you do.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead className="text-right">Prediction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{new Date(item.timestamp).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                            <span className="font-medium">{item.input.location}</span>
                            <Badge variant="outline" className='mt-1 w-fit'>{item.input.locationType}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                            <span className="font-medium">{item.input.bedrooms} {item.input.category}</span>
                            <span className="text-sm text-muted-foreground">{item.input.area} sq ft</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end gap-1">
                            <span className="font-semibold">{formatCurrency(item.output.predictedPrice)}</span>
                             {item.output.futurePredictedPrice && (
                                <span className="text-sm text-primary font-medium flex items-center gap-1">
                                    <ArrowUpRight className="h-3 w-3" />
                                    {formatCurrency(item.output.futurePredictedPrice)}
                                    <span className="text-muted-foreground text-xs">(5yr)</span>
                                </span>
                            )}
                            <Badge variant={item.output.confidence > 0.85 ? "default" : "secondary"} className="mt-1 bg-accent text-accent-foreground">
                                {Math.round(item.output.confidence * 100)}% Conf.
                            </Badge>
                        </div>
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
