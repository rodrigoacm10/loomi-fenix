import { MOCK_ADDONS } from "@/services/simulator";
import { useSimulatorStore } from "@/store/simulator-store";
import Container from "../global/container";
import { BenefitBadge } from "./benefit-badge";
import { planCalculatePrice } from "@/utils/plan-calculate-price";
import { useTranslations } from "next-intl";

export function SimulatorSummary() {
    const t = useTranslations("Simulator");
    const {
        plans,
        includedBenefits,
        vehicleValue,
        clientAge,
        selectedAddons
    } = useSimulatorStore();

    return (
        <div className="space-y-[40px] h-full flex flex-col">
            <Container className="bg-[#171d30] space-y-[32px]">
                <h2 className="text-xl font-semibold">{t("includedBenefits")}</h2>
                <div className="flex flex-wrap gap-2">
                    {includedBenefits.map((benefit, index) => (
                        <BenefitBadge key={index} benefit={benefit} />
                    ))}
                </div>
            </Container>

            <Container className="flex-1 flex flex-col">
                <h2 className="text-xl font-semibold mb-[32px]">{t("indicators")}</h2>
                <div className="space-y-[32px]  flex-1 flex flex-col">
                    {plans.map((plan) => {
                        const calculatedPrice = planCalculatePrice({ planValue: plan.value, vehicleValue, clientAge, selectedAddons });

                        return (
                            <Container key={plan.name} className="bg-[#23293b] flex-1 flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-xl font-semibold">{plan.name}</p>
                                    <div className="flex gap-3 text-sm">
                                        <span className="text-white/60">
                                            {t("conversion")} <span className="text-green-400 drop-shadow-[0_0_8px_rgba(3,200,9,0.8)]">{plan.conversion}%</span>
                                        </span>
                                        <span className="text-white/60">
                                            {t("roi")} <span className="text-green-400 drop-shadow-[0_0_8px_rgba(3,200,9,0.8)]">{plan.roi}%</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-white">
                                        R$ {calculatedPrice.toFixed(2).replace('.', ',')}
                                    </p>
                                </div>
                            </Container>
                        );
                    })}
                </div>
            </Container>
        </div>
    );
}
