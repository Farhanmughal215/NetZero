// Data types for the REC dashboard

export interface ChartDataPoint {
  date: string;
  value: number;
  category?: string;
}

export interface MultiSeriesDataPoint {
  date: string;
  [key: string]: string | number;
}

export interface PieChartDataPoint {
  label: string;
  value: number;
  color: string;
}

export interface BarChartDataPoint {
  label: string;
  [key: string]: string | number;
}

export interface PricingCardData {
  name: string;
  icon: string;
  iconBg: string;
  availableAmount: number;
  price: string;
  selectiveCost: string | null;
  trend: number;
}

export interface ToggleTab {
  id: string;
  label: string;
}

export interface BlockchainSupplyData {
  pieData: PieChartDataPoint[];
  barData: BarChartDataPoint[];
}