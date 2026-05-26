import { socials } from './data'

const SpreadTheLove = () => (
  <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-950 relative overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-[600px] h-[600px] bg-yellow-400 rounded-full blur-3xl opacity-5" />
    </div>
    <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
      <span className="text-yellow-400 font-semibold text-sm uppercase tracking-widest">Connect With Us</span>
      <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Spread the Love 💛</h2>
      <p className="text-slate-400 mb-12 text-lg">
        Follow us on social media and be part of India's fastest growing startup community.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 justify-center bg-slate-800 hover:bg-blue-600 rounded-2xl p-4 transition-colors"
          >
            {s.icon}
            <span className="text-white text-sm font-semibold">{s.name}</span>
          </a>
        ))}
      </div>
    </div>
  </section>
)

export default SpreadTheLove