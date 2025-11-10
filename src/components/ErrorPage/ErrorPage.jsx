import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="text-9xl font-bold text-primary mb-4 animate-bounce">404</div>
          <div className="text-6xl mb-4 animate-pulse">🎨</div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-4 animate-fade-in">Page Not Found</h1>
          <p className="text-lg text-base-content/70 max-w-md mx-auto animate-fade-in">The page you're looking for seems to have been moved or doesn't exist.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary btn-lg hover:scale-105 transition-transform duration-200">
            Return Home
          </Link>
          <Link to="/explore" className="btn btn-outline btn-lg hover:scale-105 transition-transform duration-200">
            Browse Art
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;
