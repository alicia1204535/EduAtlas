export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="animate-pulse space-y-8">
        <div className="h-8 w-64 bg-muted rounded" />
        <div className="h-4 w-96 bg-muted rounded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
