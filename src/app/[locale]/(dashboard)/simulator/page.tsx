'use client'

import { useEffect } from 'react'
import { useSimulatorStore } from '@/store/simulator-store'
import { SimulatorControls } from '@/components/simulator/simulator-controls'
import { SimulatorSummary } from '@/components/simulator/simulator-summary'
import { SkeletonSimulator } from '@/components/simulator/skeleton-simulator'

export default function SimulatorPage() {
  const { fetchSimulatorData, loading } = useSimulatorStore()

  useEffect(() => {
    fetchSimulatorData()
  }, [fetchSimulatorData])

  if (loading) {
    return <SkeletonSimulator />
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-8">
      <div className="lg:col-span-5">
        <SimulatorControls />
      </div>

      <div className="lg:col-span-3">
        <SimulatorSummary />
      </div>
    </div>
  )
}
