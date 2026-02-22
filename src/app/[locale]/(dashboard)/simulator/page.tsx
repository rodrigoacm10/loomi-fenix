import { Metadata } from 'next'
import { SimulatorPageContent } from '@/components/simulator/simulator-page-content'

export const metadata: Metadata = {
  title: 'Simulator | Nortus',
  description: 'Simulate and customize insurance plans in real-time.',
}

export default function SimulatorPage() {
  return <SimulatorPageContent />
}
