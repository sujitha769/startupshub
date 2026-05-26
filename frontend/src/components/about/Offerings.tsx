import { offerings } from './data'

const Offerings = () => (
  <section className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-14">
        <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">What We Do</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 relative inline-block">
          Our Offerings
          <div className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-yellow-400 rounded-full" />
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {offerings.map((o) => (
          <div
            key={o.title}
            className="group bg-slate-50 hover:bg-blue-600 rounded-2xl p-6 border border-slate-100 hover:border-blue-600 transition-all duration-300 cursor-default"
          >
            <div className="text-3xl mb-4">{o.icon}</div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-white mb-2 transition-colors">{o.title}</h3>
            <p className="text-sm text-gray-500 group-hover:text-blue-100 leading-relaxed transition-colors">{o.desc}</p>
          </div>
        ))}
      </div>

      <p className="text-center mt-8 text-blue-600 font-semibold text-lg italic">and many more...</p>
    </div>
  </section>
)

export default Offerings