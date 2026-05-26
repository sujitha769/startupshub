const InfoRow = ({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 mt-0.5">
      {icon}
    </div>
    <div>
      <p className="font-semibold text-gray-900">{label}</p>
      <div className="text-gray-600 text-base mt-0.5">{children}</div>
    </div>
  </div>
)

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const sharedDetails = (
  <div className="space-y-5">
    <InfoRow icon={<ClockIcon />} label="Hours:">
      Mon–Fri 9:00AM – 6:00PM
    </InfoRow>
    <InfoRow icon={<PhoneIcon />} label="Phone:">
      <a href="tel:9190000000" className="text-blue-600 hover:underline">+91 900000000</a>
    </InfoRow>
    <InfoRow icon={<EmailIcon />} label="Email:">
      <a href="mailto:dashboard@startupshub.in" className="text-blue-600 hover:underline">dashboard@startupshub.in</a>
    </InfoRow>
    <InfoRow icon={<CalendarIcon />} label="By Appointment Only:">
      {''}
    </InfoRow>
  </div>
)

const ContactUs = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-2xl md:text-3xl font-semibold text-gray-800 leading-snug">
            We would love to hear from you.
          </p>
          <p className="text-2xl md:text-3xl font-semibold text-gray-800 mt-1">
            Feel free to reach out using the below details:
          </p>
        </div>

        <div className="space-y-16">

          {/* Corporate Office */}
          <div>
            <h3 className="text-xl font-bold text-blue-800 mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-yellow-400 rounded-full inline-block" />
              Corporate Office
            </h3>
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 w-full h-72 md:h-80">
                <iframe
                  title="Corporate Office - Bandra Kurla Complex"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.0!2d72.8650!3d19.0590!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e5b7c3e1d%3A0x1a2b3c4d5e6f7a8b!2sBandra+Kurla+Complex%2C+Mumbai%2C+Maharashtra+400051!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="space-y-5">
                <InfoRow icon={<LocationIcon />} label="Address:">
                  Tower 4, Equinox Business Park, Bandra Kurla Complex, Visakhapatnam, Andhra Pradesh 530003
                </InfoRow>
                {sharedDetails}
              </div>
            </div>
          </div>

          



        </div>
      </div>
    </section>
  )
}

export default ContactUs