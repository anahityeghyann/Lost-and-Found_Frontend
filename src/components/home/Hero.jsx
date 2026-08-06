import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Reunite people with
            <br className="hidden sm:block" /> what matters most
          </h1>
          <p className="mt-3 text-brand-100 text-base md:text-lg leading-relaxed">
            Report lost items, share found belongings, and help your community recover valuables quickly and safely.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/post?type=lost" className="inline-flex items-center gap-2 bg-white text-brand-700 px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition">
              <span className="w-2 h-2 rounded-full bg-lost" />
              I Lost Something
            </Link>
            <Link to="/post?type=found" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/20 transition">
              <span className="w-2 h-2 rounded-full bg-found" />
              I Found Something
            </Link>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-6 md:gap-10">
          <div>
            <p className="text-2xl md:text-3xl font-extrabold">12,480</p>
            <p className="text-brand-200 text-sm">Active listings</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-extrabold">8,920</p>
            <p className="text-brand-200 text-sm">Items reunited</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-extrabold">94%</p>
            <p className="text-brand-200 text-sm">Success rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}
