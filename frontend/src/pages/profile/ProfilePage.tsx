import { useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { useAuth } from '../../context/AuthContext'
import SubscriptionPlansModal from '../../components/subscription/SubscriptionPlansModal'
import ProfileBanner from './components/ProfileBanner'
import AccountDetails from './components/AccountDetails'
import ChangePassword from './components/ChangePassword'
import SubscriptionSection from './components/SubscriptionSection'

const ProfilePage = () => {
  const { user } = useAuth()
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const isUser = user?.role === 'USER'

  const getInitials = () => {
    if (user?.name) return user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    if (user?.email) return user.email[0].toUpperCase()
    return 'U'
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

          <ProfileBanner name={user?.name} email={user?.email} initials={getInitials()} />
          <AccountDetails name={user?.name} email={user?.email} />
          <ChangePassword />
          {isUser && (
            <SubscriptionSection
              subscription={user?.subscription ?? undefined}
              onManage={() => setShowSubscriptionModal(true)}
            />
          )}

        </div>
      </div>
      <SubscriptionPlansModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />
    </DashboardLayout>
  )
}

export default ProfilePage