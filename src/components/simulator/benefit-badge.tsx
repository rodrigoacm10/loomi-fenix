import Container from "../global/container";
import { benefitColors } from "@/utils/benefit-colors";

export function BenefitBadge({ benefit }: { benefit: string }) {
    return (
        // Adicionado 'w-fit' aqui para ajustar a largura ao conteúdo
        <Container className="w-fit bg-[#23293b] text-sm flex rounded-full items-center gap-1 px-3 py-2">
            <div
                className="mr-1 h-1.5 w-1.5 rounded-full"
                style={{
                    backgroundColor: benefitColors[benefit as keyof typeof benefitColors],
                    boxShadow: `0px 0px 7px 0px ${benefitColors[benefit as keyof typeof benefitColors]}`
                }}
            />
            {benefit}
        </Container >
    );
}