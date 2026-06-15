export default function SchoolLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl animate-pulse">
      <div className="h-4 w-48 bg-muted rounded mb-8" />
      <div className="flex gap-6 mb-8">
        <div className="w-24 h-24 rounded-xl bg-muted shrink-0" />
        <div className="space-y-3 flex-1">
          <div className="h-8 w-80 bg-muted rounded" />
          <div className="h-5 w-96 bg-muted rounded" />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-3 mb-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-20 bg-muted rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2 space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-muted rounded-xl" />
          ))}
        </div>
        <div className="space-y-4">
          <div className="h-40 bg-muted rounded-xl" />
          <div className="h-32 bg-muted rounded-xl" />
        </div>
      </div>
    </div>
  );
}
