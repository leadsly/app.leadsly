import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexLegend, ApexStroke, ApexTooltip, ApexXAxis } from 'ng-apexcharts';

/**
 * Apex chart options model.
 */
export type ChartOptionsApex = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	stroke: ApexStroke;
	tooltip: ApexTooltip;
	dataLabels: ApexDataLabels;
	legend: ApexLegend;
};
