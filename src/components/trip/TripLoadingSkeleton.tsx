import { Skeleton } from "@/components/ui/skeleton";

const TripLoadingSkeleton = () => (
  <div className="space-y-8 animate-in fade-in">
    {/* Overview card skeleton */}
    <div className="bg-gradient-hero rounded-3xl p-8 md:p-10">
      <Skeleton className="h-4 w-32 bg-primary-foreground/20 mb-3" />
      <Skeleton className="h-10 w-48 bg-primary-foreground/20 mb-4" />
      <div className="flex gap-3">
        <Skeleton className="h-7 w-28 rounded-full bg-primary-foreground/20" />
        <Skeleton className="h-7 w-28 rounded-full bg-primary-foreground/20" />
      </div>
    </div>

    {/* Generating message */}
    <div className="text-center py-8">
      <div className="inline-flex items-center gap-3 bg-card border border-border rounded-2xl px-6 py-4 shadow-card">
        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-foreground font-medium">AI is crafting your perfect trip plan...</span>
      </div>
    </div>

    {/* Content skeleton */}
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-card rounded-2xl border border-border p-6">
        <Skeleton className="h-48 w-full rounded-xl mb-4" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
      <div className="md:col-span-2 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="w-10 h-10 rounded-xl" />
              <div>
                <Skeleton className="h-3 w-16 mb-1" />
                <Skeleton className="h-5 w-40" />
              </div>
            </div>
            <div className="space-y-3 pl-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default TripLoadingSkeleton;
