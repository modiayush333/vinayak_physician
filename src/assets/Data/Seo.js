/**
 * Central SEO config — update SITE_URL when you deploy to your live domain.
 */
export const SITE_URL = 'https://www.vinayakheart.com'

export const seoData = {
  siteName: 'Vinayak Heart Medicare',
  title: 'Cardiologist & Physician | Vinayak Heart Medicare',
  description:
    'Get expert heart, diabetes and critical care from Dr. Ronak Modi at Vinayak Heart Medicare. Book your appointment online now for trusted treatment.',
  keywords:
    'physician, cardiologist, diabetologist, heart care, diabetes treatment, ICU, Dr Ronak Modi, Vinayak Heart Medicare, book appointment',
  canonical: `${SITE_URL}/`,
  ogImage: `${SITE_URL}/favicon.webp`,
  locale: 'en_IN',
  twitterHandle: '',
  phone: '+919876543210',
  email: 'care@vinayakheart.com',
  address: {
    streetAddress: 'Vinayak Heart, Medical & Dental Hospital',
    addressLocality: 'Gandhinagar',
    addressRegion: 'Gujarat',
    postalCode: '382421',
    addressCountry: 'IN',
  },
  doctorName: 'Dr. Ronak Modi',
  doctorTitle: 'Consultant Physician, Cardiologist & Diabetologist',
  faqs: [
    {
      question: 'What services does Vinayak Heart Medicare offer?',
      answer:
        'We provide preventive cardiology, heart attack and heart failure care, chest pain evaluation, ECG, diabetes consultation, blood sugar management, metabolic syndrome care, ICU services, kidney and liver disorder management, thyroid care, and emergency medical support.',
    },
    {
      question: 'Who is the consulting doctor at Vinayak Heart Medicare?',
      answer:
        'Dr. Ronak Modi is an M.D. Medicine consultant physician, cardiologist, diabetologist, and ICU & critical care specialist with extensive experience treating critically ill patients.',
    },
    {
      question: 'How can I book an appointment online?',
      answer:
        'Click Book Appointment on the website, fill in your name, age, phone, preferred date and time, and select a service. Our team will call you to confirm your visit.',
    },
    {
      question: 'What are the clinic opening hours?',
      answer:
        'We are open Monday to Saturday from 9:00 AM to 8:00 PM, Sunday from 10:00 AM to 2:00 PM, with emergency care available 24×7.',
    },
    {
      question: 'Do you treat diabetes and heart conditions together?',
      answer:
        'Yes. Dr. Ronak Modi specializes in integrated care for heart disease, diabetes, and related metabolic conditions with personalized treatment plans and ongoing follow-up.',
    },
  ],
}
