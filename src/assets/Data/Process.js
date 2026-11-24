import step1 from '../Images/Process/step1.jpg'
import step2 from '../Images/Process/step2.jpg'
import step3 from '../Images/Process/step3.jpg'
import step4 from '../Images/Process/step4.jpg'

import stethoscope3D from '../Images/process_3d_stethoscope.png'
import heart3D from '../Images/organ_heart_3d.png'
import capsules3D from '../Images/organ_medicine_capsules.png'
import shield3D from '../Images/process_3d_shield.png'

export const processData = {
  title: 'Your Journey to Better Health',
  subtitle:
    'A comprehensive, patient-centered roadmap designed to guide you from initial consultation to full recovery and lasting vitality.',
  steps: [
    {
      id: '01',
      title: 'Appointment & Consultation',
      description:
        'Schedule your appointment and meet with Dr. Ronak Modi to discuss your symptoms, medical history, and health concerns.',
      image: step1,
      object3D: stethoscope3D,
      tag: 'Effortless Booking',
    },
    {
      id: '02',
      title: 'Diagnosis & Evaluation',
      description:
        'Receive comprehensive clinical evaluation, 2D Echo, digital ECG, and accurate diagnostic assessments.',
      image: step2,
      object3D: heart3D,
      tag: 'Precision Diagnosis',
    },
    {
      id: '03',
      title: 'Personalized Treatment Plan',
      description:
        'Based on your diagnosis, receive a customized treatment plan including medications, lifestyle guidance, and preventive care.',
      image: step3,
      object3D: capsules3D,
      tag: 'Custom Protocol',
    },
    {
      id: '04',
      title: 'Follow-up & Ongoing Care',
      description:
        'Regular follow-up consultations, continuous progress monitoring, and dedicated medical support for long-term health.',
      image: step4,
      object3D: shield3D,
      tag: 'Lifelong Support',
    },
  ],
}
