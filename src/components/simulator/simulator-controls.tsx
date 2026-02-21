import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useSimulatorStore } from "@/store/simulator-store";
import { MOCK_ADDONS } from "@/services/simulator";
import { PlanCard } from "./plan-card";
import Container from "../global/container";
import { useTranslations } from "next-intl";

export function SimulatorControls() {
    const t = useTranslations("Simulator");
    const {
        plans,
        selectedPlan,
        setSelectedPlan,
        vehicleValue,
        setVehicleValue,
        clientAge,
        setClientAge,
        selectedAddons,
        toggleAddon,
        calculatePlanPrice
    } = useSimulatorStore();

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    return (
        <Container className="space-y-10 py-7 h-full">
            <div>
                <h3 className="mb-4 text-xl font-semibold">{t("customPlans")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {plans.map((plan) => (
                        <PlanCard
                            key={plan.name}
                            name={plan.name}
                            price={calculatePlanPrice({ ...plan, value: plan.value })}
                            isSelected={selectedPlan === plan.name}
                            isRecommended={plan.name === 'Premium'}
                            onSelect={() => setSelectedPlan(plan.name)}
                        />
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <div className="flex">
                        <p className="tex-sm font-semibold">{t("vehicleValue")} {formatCurrency(vehicleValue)}</p>
                    </div>
                    <Slider
                        value={[vehicleValue]}
                        min={10000}
                        max={500000}
                        step={1000}
                        onValueChange={(vals) => setVehicleValue(vals[0])}
                    />
                    <div className="flex justify-between text-sm text-white">
                        <span>R$ 10.000</span>
                        <span>R$ 500.000</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex">
                        <p className="tex-sm font-semibold">{t("clientAge")} {clientAge} {t("years")}</p>
                    </div>
                    <Slider
                        value={[clientAge]}
                        min={18}
                        max={90}
                        step={1}
                        onValueChange={(vals) => setClientAge(vals[0])}
                    />
                    <div className="flex justify-between text-sm text-white">
                        <span>18 {t("years")}</span>
                        <span>90 {t("years")}</span>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="mb-3 tex-sm font-semibold">{t("additionalCoverages")}</h3>
                <div className="space-y-3">
                    {MOCK_ADDONS.map((addon) => (
                        <div key={addon.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={addon.id}
                                className="data-[state=checked]:bg-loomi-primary data-[state=checked]:border-loomi-primary border-white"
                                checked={selectedAddons.includes(addon.id)}
                                onCheckedChange={() => toggleAddon(addon.id)}
                            />
                            <div className="flex flex-1 items-center justify-between">
                                <Label htmlFor={addon.id} className="text-sm font-normal cursor-pointer">
                                    {addon.label}
                                </Label>
                                <span className="text-sm font-bold text-white">
                                    + {formatCurrency(addon.price)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
}
