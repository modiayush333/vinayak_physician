import images from '../Images'

export const processData = {
  title: 'Your Journey to Better Health',
  steps: [
    {
      id: '01',
      title: 'Appointment & Consultation',
      description:
        'Schedule your appointment and meet with the doctor to discuss your symptoms, medical history, and health concerns.',
      image: images.Appointment,
    },
    {
      id: '02',
      title: 'Diagnosis & Evaluation',
      description:
        'Receive a comprehensive medical examination, clinical evaluation, and any necessary diagnostic tests for an accurate diagnosis.',
      image: images.Diagnosis,
    },
    {
      id: '03',
      title: 'Personalized Treatment Plan',
      description:
        'Based on the diagnosis, receive a customized treatment plan including medications, lifestyle guidance, and preventive care.',
      image: images.treatment,
    },
    {
      id: '04',
      title: 'Follow-up & Ongoing Care',
      description:
        'Regular follow-up consultations, progress monitoring, and continued medical support to ensure long-term health and recovery.',
      image: images.followup,
    },
  ],
}
