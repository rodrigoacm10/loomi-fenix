import api from '@/lib/api'
import { SimulatorResponse } from '@/types/simulator'

export const simulatorService = {
  getSimulatorData: async (): Promise<SimulatorResponse> => {
    const response = await api.get<SimulatorResponse>(
      '/nortus-v1/simulador-planos',
    )
    return response.data
  },
}

export const MOCK_ADDONS = [
  { id: 'theft', label: 'Cobertura contra roubo e furto', price: 25.0 },
  { id: 'collision', label: 'Danos por colisão', price: 35.0 },
  { id: 'fire', label: 'Cobertura contra incêndio', price: 20.0 },
  {
    id: 'natural',
    label: 'Fenômenos naturais (granizo, enchente)',
    price: 30.0,
  },
]
