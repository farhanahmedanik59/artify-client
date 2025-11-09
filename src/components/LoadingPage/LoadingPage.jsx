export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-base-100 transition-colors duration-300">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <h2 className="text-xl font-semibold text-primary">Loading Artworks...</h2>
        <p className="text-center text-base-content/70 max-w-sm">Please wait while we fetch the latest artworks for you.</p>
      </div>
    </div>
  );
}
