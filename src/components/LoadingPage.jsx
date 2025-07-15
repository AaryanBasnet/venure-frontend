import React, { useState, useEffect } from "react";

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(
    "Preparing your experience..."
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    const textMessages = [
      "Preparing your experience...",
      "Curating premium venues...",
      "Gathering luxury details...",
      "Almost ready...",
    ];

    const textInterval = setInterval(() => {
      setLoadingText(
        textMessages[Math.floor(Math.random() * textMessages.length)]
      );
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

      {/* Main content */}
      <div className="relative z-10 text-center px-8 max-w-md">
        {/* Logo/Brand */}
        <div className="mb-12">
          <div className="inline-block p-6 border-2 border-amber-400 rounded-full mb-6 backdrop-blur-sm bg-white/5">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-black"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-serif text-white mb-2 tracking-wide">
            Venue<span className="text-amber-400">Luxe</span>
          </h1>
          <p className="text-gray-300 text-sm uppercase tracking-widest font-light">
            Premium Venue Booking
          </p>
        </div>

        {/* Loading animation */}
        <div className="mb-8">
          <div className="relative">
            {/* Outer ring */}
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full border-2 border-gray-700"></div>
              <div
                className="absolute inset-0 rounded-full border-2 border-amber-400 border-t-transparent animate-spin"
                style={{ animationDuration: "2s" }}
              ></div>
              <div
                className="absolute inset-2 rounded-full border border-amber-300 border-t-transparent animate-spin"
                style={{
                  animationDuration: "1.5s",
                  animationDirection: "reverse",
                }}
              ></div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-100 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>

            {/* Progress percentage */}
            <div className="text-amber-400 text-sm font-light mb-2">
              {progress}%
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-gray-300 text-sm font-light tracking-wide mb-8 h-6">
          <span className="inline-block animate-pulse">{loadingText}</span>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center space-x-4 opacity-50">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50"></div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-amber-400 opacity-30"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-amber-400 opacity-30"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-amber-400 opacity-30"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-amber-400 opacity-30"></div>
    </div>
  );
};

export default LoadingPage;
