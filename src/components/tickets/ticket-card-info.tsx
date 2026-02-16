import Image from "next/image";
import Container from "../global/container";

export function TicketCardInfo({ title, type = 'number', data, icon }: { title: string, type?: 'number' | 'hour', data: number | string, icon: string }) {
    return (
        <Container className="space-y-8 px-6 py-4">
            <p className="text-sm">{title}</p>
            <div className="flex items-center justify-between">
                <p className="font-bold text-2xl">{data}</p>
                <div className="relative h-8 w-8">

                    <Image src={icon} alt="Logo" fill className="object-contain" />
                </div>
            </div>
        </Container>
    );
}