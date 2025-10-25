import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PricingCardsSkeleton() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="text-center space-y-4">
            <Skeleton className="h-8 w-32 mx-auto" />
            <Skeleton className="h-12 w-24 mx-auto" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((j) => (
                <div key={j} className="flex items-start gap-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
              ))}
              {[1, 2].map((j) => (
                <div key={j} className="flex items-start gap-3 opacity-50">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export function FAQSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-64 mx-auto" />
          <Skeleton className="h-6 w-96 mx-auto mt-4" />
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}