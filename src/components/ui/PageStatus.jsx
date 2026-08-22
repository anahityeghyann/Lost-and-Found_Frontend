import React from 'react';

export default function PageStatus({ 
  loading, 
  error, 
  onRetry, 
  loadingMessage = "Loading items from server..." 
}) {
  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
        <p className="mt-3 text-slate-500 font-medium text-sm">{loadingMessage}</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl max-w-md mx-auto">
          <p className="text-red-600 font-medium text-sm">Error: {error}</p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-3 text-xs font-semibold text-red-700 underline hover:text-red-800"
            >
              Try Again
            </button>
          )}
        </div>
      </main>
    );
  }

  return null;
}