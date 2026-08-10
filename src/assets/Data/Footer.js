import images from '../Images'
import { servicesData } from './Services'

export const footerData = {
  brand: {
    name: 'Vinayak Heart Medicare',
    logo: images.logo,
    quote: 'Trusted care for your heart, health and well-being, delivered with compassion, expertise and modern medical support.',
  },
  hospital: {
    address: '1st Floor, Care Doctor House, Char Rasta, nr. Sahakari Jin, Sahakari Jin, Industrial Area, Himatnagar, Gujarat 383001',
    phone: '063544 15883',
    phoneHref: 'tel:+919876543210',
    email: 'care@vinayakheart.com',
    emailHref: 'mailto:care@vinayakheart.com',
    openingHours: [
      // { label: 'Mon – Sat', value: '9:00 AM – 8:00 PM' },
      // { label: 'Sunday', value: '10:00 AM – 2:00 PM' },
      { label: 'Emergency', value: '24×7 Available' },
    ],
  },
  navLinks: [
    { label: 'About Doctor', href: '#about-dr' },
    // { label: 'Conditions', href: '#conditions-treated' },
    { label: 'Services', href: '#services' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'Process', href: '#process' },
  ],
  bookOnline: {
    label: 'Book Online',
  },
  booking: {
    eyebrow: 'BOOK APPOINTMENT',
    sidebarTitle: 'Schedule Your Visit',
    formTitle: "Let's Start Your Care Journey",
    steps: [
      {
        title: 'Book Online',
        description:
          'Choose your preferred date and time, then submit your appointment request through our simple online form.',
        icon: 'calendar',
      },
      {
        title: 'Confirmation Call',
        description:
          'Our team will review your details and contact you promptly to confirm your appointment and answer questions.',
        icon: 'phone',
      },
      {
        title: 'Appointment Confirmed',
        description:
          'Once confirmed, your appointment is successfully scheduled, and you’re all set for your visit.',
        icon: 'shield',
      },
    ],
    services: servicesData.items.map((item) => item.title),
    submitLabel: 'Book Appointment',
    successTitle: 'Request Sent!',
    successText: 'Thank you. Our team will contact you shortly to confirm your appointment.',
    errorTitle: 'All fields are required',
    errorText: 'Please fill in every field correctly before submitting.',
  },
  copyright: '©2026 Vinayak Heart Medicare. All rights reserved.',
}
