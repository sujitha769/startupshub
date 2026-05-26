import { stats } from './data'

const KnowUs = () => (
  <section className="py-20 bg-white">
    <div className="max-w-5xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Who We Are</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-2 relative inline-block">
            Know Us
            <div className="absolute -bottom-2 left-0 w-16 h-1 bg-yellow-400 rounded-full" />
          </h2>
          <div className="mt-8 space-y-4 text-gray-600 leading-relaxed">
            <p>
  StartupsHub is a <strong className="text-gray-800">founder-focused, all-in-one startup ecosystem</strong> built to help entrepreneurs, freelancers, and professionals turn ideas into successful ventures.
</p>
<p>
  We connect startups with the right leads, investors, talent, and resources — all in one place. Whether you're looking to raise funds, find clients, hire talent, or grow your network, StartupsHub has you covered.
</p>
<p>
  Built by founders, for founders — StartupsHub is backed by a team of seasoned entrepreneurs and industry experts committed to making the startup journey <strong className="text-gray-800">faster, smarter, and less lonely.</strong>
</p>
            <p className="text-blue-700 font-semibold text-lg">We help you execute the life you want.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-blue-50 rounded-2xl p-6 text-center border border-blue-100">
              <div className="text-3xl font-extrabold text-blue-700">{stat.num}</div>
              <div className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default KnowUs