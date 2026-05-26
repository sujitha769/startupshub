const VisionBanner = () => (
  <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-10 pointer-events-none" />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl opacity-10 pointer-events-none" />
    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <span className="inline-block bg-yellow-400/20 text-yellow-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-yellow-400/30 tracking-wide uppercase">
        Our Vision
      </span>
     <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug">
  Connecting the dots for India's next generation of startups — empowering{' '}
  <span className="text-yellow-400">founders, freelancers, and investors</span>{' '}
  to grow faster, raise smarter, and build something that lasts.
</p>
    </div>
  </section>
)

export default VisionBanner