import EyeIcon from './EyeIcon'
import { useChangePassword } from '../../../hooks/useChangePassword'

const btnStyle = { background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }

const ChangePassword = () => {
  const {
    pwStep, setPwStep,
    oldPassword, setOldPassword,
    newPassword, setNewPassword,
    confirmPassword, setConfirmPassword,
    showOld, setShowOld,
    showNew, setShowNew,
    showConfirm, setShowConfirm,
    pwLoading, pwError, pwSuccess,
    resetPasswordState,
    handleVerifyOld,
    handleChangePassword,
  } = useChangePassword()

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          <h2 className="text-sm font-semibold text-gray-900">Change Password</h2>
        </div>
        {pwStep === 'idle' ? (
          <button
            onClick={() => setPwStep('verify-old')}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
            style={btnStyle}
          >
            Change Password
          </button>
        ) : (
          <button onClick={resetPasswordState} className="text-xs text-gray-400 hover:text-gray-600">
            Cancel
          </button>
        )}
      </div>

      <div className="p-6">
        {pwSuccess && pwStep === 'idle' && (
          <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm border border-green-100">
            ✅ {pwSuccess}
          </div>
        )}

        {pwError && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
            {pwError}
          </div>
        )}

        {pwStep === 'verify-old' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Enter your current password. We'll verify it before proceeding.</p>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Current Password</label>
              <div className="relative">
                <input
                  type={showOld ? 'text' : 'password'}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerifyOld()}
                  placeholder="Enter current password"
                  className="w-full border border-gray-300 p-2.5 pr-10 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <button type="button" onClick={() => setShowOld(!showOld)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <EyeIcon open={showOld} />
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={handleVerifyOld} disabled={pwLoading}
                className="px-5 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-60 hover:opacity-90"
                style={btnStyle}>
                {pwLoading ? 'Verifying...' : 'Verify & Continue →'}
              </button>
            </div>
          </div>
        )}

        {pwStep === 'set-new' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-100 rounded-lg">
              <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-green-700 font-medium">Current password verified. Set your new password below.</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full border border-gray-300 p-2.5 pr-10 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <button type="button" onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <EyeIcon open={showNew} />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">Min 8 chars, 1 uppercase, 1 lowercase, 1 number</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full border border-gray-300 p-2.5 pr-10 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
              {confirmPassword && (
                <p className={`text-xs mt-1 ${newPassword === confirmPassword ? 'text-green-600' : 'text-red-500'}`}>
                  {newPassword === confirmPassword ? '✅ Passwords match' : '❌ Passwords do not match'}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center pt-1">
              <button onClick={() => setPwStep('verify-old')} className="text-xs text-gray-400 hover:text-gray-600">
                ← Back
              </button>
              <button onClick={handleChangePassword} disabled={pwLoading}
                className="px-5 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-60 hover:opacity-90"
                style={btnStyle}>
                {pwLoading ? 'Saving...' : 'Save Password'}
              </button>
            </div>
          </div>
        )}

        {pwStep === 'idle' && !pwSuccess && (
          <p className="text-sm text-gray-400">Click "Change Password" to update your password.</p>
        )}
      </div>
    </div>
  )
}

export default ChangePassword