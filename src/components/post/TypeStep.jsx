function TypeCheck({ selected, color }) {
  if (selected) {
    return (
      <span className={`absolute top-4 right-4 w-5 h-5 rounded-full flex items-center justify-center ${color}`}>
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      </span>
    );
  }
  return <span className="absolute top-4 right-4 w-5 h-5 rounded-full border-2 border-slate-300" />;
}

export default function TypeStep({ itemType, onTypeChange }) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 md:p-8">
      <h2 className="text-xl font-bold text-slate-800">What would you like to post?</h2>
      <p className="mt-1 text-sm text-slate-500">Choose whether you lost something or found an item.</p>

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onTypeChange('lost')}
          className={`group relative p-6 rounded-2xl border-2 text-left transition ${
            itemType === 'lost'
              ? 'border-lost bg-lost-light ring-2 ring-lost ring-offset-2'
              : 'border-slate-200 bg-white hover:border-lost hover:bg-lost-light'
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-lost/10 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-lost" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="font-bold text-lg text-slate-800">I Lost Something</h3>
          <p className="mt-1 text-sm text-slate-500">Report a missing item and ask the community for help finding it.</p>
          <TypeCheck selected={itemType === 'lost'} color="bg-lost" />
        </button>

        <button
          type="button"
          onClick={() => onTypeChange('found')}
          className={`group relative p-6 rounded-2xl border-2 text-left transition ${
            itemType === 'found'
              ? 'border-found bg-found-light ring-2 ring-found ring-offset-2'
              : 'border-slate-200 bg-white hover:border-found hover:bg-found-light'
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-found/10 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-found" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-lg text-slate-800">I Found Something</h3>
          <p className="mt-1 text-sm text-slate-500">Share a found item so the owner can identify and claim it.</p>
          <TypeCheck selected={itemType === 'found'} color="bg-found" />
        </button>
      </div>
    </section>
  );
}
