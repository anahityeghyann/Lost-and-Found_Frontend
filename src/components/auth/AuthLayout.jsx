import { Link } from 'react-router-dom';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Form side */}
      <div className="flex-1 flex flex-col bg-slate-50">
        <div className="px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center shadow-md shadow-brand-600/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <span className="text-lg font-extrabold text-brand-700">FindIt</span>
          </Link>
          <Link to="/" className="text-sm text-slate-500 hover:text-brand-600 transition">
            ← Back to home
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-md">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">{title}</h1>
            {subtitle && <p className="mt-2 text-slate-500">{subtitle}</p>}
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>

      {/* Branding side */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 -right-20 w-80 h-80 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-20 -left-20 w-96 h-96 rounded-full bg-brand-300/20 blur-3xl" />
        </div>
        <div className="relative flex flex-col justify-center px-12 xl:px-16">
          <h2 className="text-3xl xl:text-4xl font-extrabold leading-tight">
            Your community&apos;s<br />lost & found hub
          </h2>
          <p className="mt-4 text-brand-100 text-lg leading-relaxed max-w-md">
            Join thousands of people helping reunite lost items with their owners every day.
          </p>
          <div className="mt-10 space-y-5">
            {[
              { stat: '12,480+', label: 'Active listings' },
              { stat: '8,920', label: 'Items reunited' },
              { stat: '94%', label: 'Success rate' },
            ].map(({ stat, label }) => (
              <div key={label} className="flex items-center gap-4">
                <span className="text-2xl font-extrabold w-24">{stat}</span>
                <span className="text-brand-200">{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 p-5 rounded-2xl bg-white/10 backdrop-blur border border-white/10">
            <p className="text-sm text-brand-100 leading-relaxed italic">
              &ldquo;Found my wallet within 2 hours thanks to a kind stranger who posted it here.&rdquo;
            </p>
            <p className="mt-3 text-sm font-semibold">— Anna K., Yerevan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
