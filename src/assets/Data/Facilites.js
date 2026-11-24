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
    id: 'pulse-oximeter',
    title: 'Pulse Oximeter',
    image: PulseOximeter,
    fit: 'contain',
  },
  {
    id: 'glucometer',
    title: 'Digital Glucometer',
    image: Glucometer,
    fit: 'contain',
  },
  {
    id: 'defibrillator',
    title: 'Defibrillator',
    image: Defibrillator,
    fit: 'contain',
  },
  {
    id: 'oxygen',
    title: 'Oxygen Machine',
    image: OxygenMachine,
    fit: 'contain',
  },
  {
    id: 'ecg',
    title: 'ECG',
    image: ECG,
    fit: 'contain',
  },
  {
    id: 'monitor',
    title: 'Monitor',
    image: Monitor,
    fit: 'contain',
  },
  {
    id: 'icu',
    title: 'ICU',
    image: ICU,
    fit: 'cover',
  },
  {
    id: 'nebulizer',
    title: 'Medical Nebulizer',
    image: Nebulizer,
    fit: 'contain',
  },
  {
    id: 'pump',
    title: 'Infusion Syringe Pump',
    image: Pump,
    fit: 'contain',
  },
  {
    id: 'ventilator',
    title: 'Ventilator',
    image: Ventilator,
    fit: 'contain',
  },
  {
    id: 'echo',
    title: 'Echocardiography (Echo)',
    image: Echo,
    fit: 'contain',
  },
]
