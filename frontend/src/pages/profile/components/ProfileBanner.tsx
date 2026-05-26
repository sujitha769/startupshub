interface ProfileBannerProps {
  name?: string
  email?: string
  initials: string
}

const ProfileBanner = ({ name, email, initials }: ProfileBannerProps) => (
  <div
    className="relative rounded-2xl overflow-hidden p-8"
    style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #3b82f6 100%)' }}
  >
    <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
      style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
    <div className="absolute bottom-0 left-20 w-40 h-40 rounded-full opacity-5"
      style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />
    <div className="relative flex items-center gap-5">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-blue-700 shadow-lg flex-shrink-0"
        style={{ background: 'rgba(255,255,255,0.95)' }}
      >
        {initials}
      </div>
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">{name || 'Your Profile'}</h1>
        <p className="text-blue-200 text-sm mt-0.5">{email}</p>
      </div>
    </div>
  </div>
)

export default ProfileBanner