export default function SchoolsLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-pulse">
      <div className="h-4 w-32 bg-muted rounded mb-6" />
      <div className="h-10 w-80 bg-muted rounded mb-2" />
      <div className="h-5 w-64 bg-muted rounded mb-8" />
      <div className="flex gap-3 mb-6">
        <div className="h-10 w-64 bg-muted rounded" />
        <div className="h-10 w-40 bg-muted rounded" />
        <div className="h-10 w-40 bg-muted rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-32 bg-muted rounded-xl" />
        ))}
      </div>
    </div>
  );
}
