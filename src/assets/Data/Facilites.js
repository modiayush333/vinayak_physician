import videos from '../Videos'
import Defibrillator from '../Images/Facilites/Defibrillator.webp'
import ECG from '../Images/Facilites/ECG.webp'
import Echo from '../Images/Facilites/Echo.webp'
import Glucometer from '../Images/Facilites/Glucometer.webp'
import ICU from '../Images/Facilites/ICU.webp'
import Monitor from '../Images/Facilites/Monitor.webp'
import Nebulizer from '../Images/Facilites/Nebulizer.webp'
import OxygenMachine from '../Images/Facilites/Oxygen Machine.webp'
import PulseOximeter from '../Images/Facilites/Pulse Oximeter.webp'
import Pump from '../Images/Facilites/Pump.webp'
import Ventilator from '../Images/Facilites/Ventilator.webp'
// import Emergency from '../Images/Conditions/Emergency.webp'

export const facilitiesData = {
  eyebrow: 'OUR FACILITIES',
  title: 'Technology that supports better care',
  subtitle:
    'Advanced medical equipment for accurate diagnosis and effective treatment.',
  cta: 'Explore equipment',
  video: videos.facilityVideo,
  videoAriaLabel: 'Medical facilities showcase',
}

export const facilitiesList = [
  {
    id: 'ecg',
    title: '12-Lead Digital ECG System',
    category: 'Cardiac',
    description:
      'High-precision 12-lead digital electrocardiogram for real-time cardiac rhythm diagnosis.',
    image: ECG,
    fit: 'contain',
  },
  {
    id: 'echo',
    title: 'Echocardiography (Echo)',
    category: 'Imaging',
    description:
      'Advanced cardiac ultrasound imaging for real-time valve and structural heart evaluation.',
    image: Echo,
    fit: 'contain',
  },
  {
    id: 'defibrillator',
    title: 'Defibrillator',
    category: 'Cardiac',
    description:
      'Emergency biphasic defibrillation and cardiac pacing system for critical life support.',
    image: Defibrillator,
    fit: 'contain',
  },
  {
    id: 'ventilator',
    title: 'Ventilator',
    category: 'Pulmonary',
    description:
      'Comprehensive mechanical ventilation support with multi-mode respiratory monitoring.',
    image: Ventilator,
    fit: 'contain',
  },
  {
    id: 'nebulizer',
    title: 'Medical Nebulizer',
    category: 'Pulmonary',
    description:
      'High-efficiency medication aerosolization for acute and chronic respiratory management.',
    image: Nebulizer,
    fit: 'contain',
  },
  {
    id: 'oxygen',
    title: 'Oxygen Machine',
    category: 'Pulmonary',
    description:
      'Medical-grade continuous oxygen delivery system for therapeutic respiratory support.',
    image: OxygenMachine,
    fit: 'contain',
  },
  {
    id: 'pulse-oximeter',
    title: 'Pulse Oximeter',
    category: 'Pulmonary',
    description:
      'Accurate real-time blood oxygen saturation (SpO2) and pulse rate monitoring.',
    image: PulseOximeter,
    fit: 'contain',
  },
  {
    id: 'monitor',
    title: 'Monitor',
    category: 'Lab & General',
    description:
      'Multi-parameter continuous monitoring of ECG, SpO2, NIBP, and core vitals.',
    image: Monitor,
    fit: 'contain',
  },
  {
    id: 'icu',
    title: 'ICU',
    category: 'Lab & General',
    description:
      'Fully equipped intensive care unit for comprehensive 24/7 critical patient management.',
    image: ICU,
    fit: 'cover',
  },
  {
    id: 'pump',
    title: 'Infusion Syringe Pump',
    category: 'Lab & General',
    description:
      'Precision microprocessor-controlled intravenous infusion syringe delivery system.',
    image: Pump,
    fit: 'contain',
  },
  {
    id: 'glucometer',
    title: 'Digital Glucometer',
    category: 'Lab & General',
    description:
      'Rapid, accurate point-of-care digital blood glucose analysis and tracking.',
    image: Glucometer,
    fit: 'contain',
  },
]
