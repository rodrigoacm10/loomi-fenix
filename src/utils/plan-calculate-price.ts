import { MOCK_ADDONS } from '@/services/simulator'

export const planCalculatePrice = ({
  planValue,
  vehicleValue,
  clientAge,
  selectedAddons,
}: {
  planValue: number
  vehicleValue: number
  clientAge: number
  selectedAddons: string[]
}) => {
  let finalPrice = planValue

  const vehicleDiff = Math.max(0, vehicleValue - 10000)
  const vehicleSurcharge = (vehicleDiff / 10000) * 15
  finalPrice += vehicleSurcharge

  if (clientAge < 25) finalPrice += 60
  else if (clientAge > 60) finalPrice += 30

  const addonsCost = selectedAddons.reduce((acc, addonId) => {
    const addon = MOCK_ADDONS.find((a) => a.id === addonId)
    return acc + (addon ? addon.price : 0)
  }, 0)

  finalPrice += addonsCost

  return parseFloat(finalPrice.toFixed(2))
}
