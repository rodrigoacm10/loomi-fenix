export function createCustomTooltip({ series, seriesIndex, dataPointIndex, w, activeMetric, isCurrency = false }: {
    series: any;
    seriesIndex: number;
    dataPointIndex: number;
    w: any;
    activeMetric: string;
    isCurrency?: boolean;
}) {
    const value = series[seriesIndex][dataPointIndex];
    let formattedValue = value;

    if (isCurrency || activeMetric === 'arpu') {
        formattedValue = `R$ ${value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value}`;
    }

    const totalPoints = series[seriesIndex].length;
    const isRightSide = (dataPointIndex + 1) > (totalPoints / 2);

    let metricNameStr = '';
    switch (activeMetric) {
        case 'conversion': metricNameStr = 'novos clientes'; break;
        case 'arpu': metricNameStr = ''; break;
        case 'retention': metricNameStr = 'retidos'; break;
        case 'churn': metricNameStr = 'perdidos'; break;
        default: metricNameStr = activeMetric; break;
    }

    return `
        <div class="relative flex items-center h-10 px-4 ${isRightSide ? 'mr-2' : 'ml-2'} bg-[#383d4e] rounded-lg shadow-lg">
            <div class="absolute ${isRightSide ? '-right-[6px]' : '-left-[6px]'} top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent ${isRightSide ? 'border-l-[6px] border-l-[#383d4e]' : 'border-r-[6px] border-r-[#383d4e]'}"></div>
            <span class="text-white font-medium text-[15px] whitespace-nowrap">
                ${formattedValue} ${metricNameStr}
            </span>
        </div>
    `;
}
