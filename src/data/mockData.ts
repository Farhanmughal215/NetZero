// Mock data for the REC dashboard

// Total Certified RECs data
export const mockTotalCertifiedRECs = [
  { date: '2023-01', value: 15000000 },
  { date: '2023-02', value: 17500000 },
  { date: '2023-03', value: 19000000 },
  { date: '2023-04', value: 20500000 },
  { date: '2023-05', value: 22000000 },
  { date: '2023-06', value: 22500000 },
  { date: '2023-07', value: 24000000 },
  { date: '2023-08', value: 25500000 },
  { date: '2023-09', value: 27000000 },
  { date: '2023-10', value: 28500000 },
  { date: '2023-11', value: 30000000 },
  { date: '2023-12', value: 31500000 },
  { date: '2024-01', value: 33000000 },
  { date: '2024-02', value: 35500000 },
  { date: '2024-03', value: 39000000 },
  { date: '2024-04', value: 41500000 },
  { date: '2024-05', value: 45000000 },
];

// Tokenized REC Prices data
export const mockTokenizedRECPrices = [
  { date: '2023-01', value: 4.5 },
  { date: '2023-02', value: 4.7 },
  { date: '2023-03', value: 4.6 },
  { date: '2023-04', value: 4.8 },
  { date: '2023-05', value: 4.9 },
  { date: '2023-06', value: 5.1 },
  { date: '2023-07', value: 5.0 },
  { date: '2023-08', value: 4.8 },
  { date: '2023-09', value: 4.6 },
  { date: '2023-10', value: 4.5 },
  { date: '2023-11', value: 4.3 },
  { date: '2023-12', value: 4.1 },
  { date: '2024-01', value: 3.9 },
  { date: '2024-02', value: 3.8 },
  { date: '2024-03', value: 3.7 },
  { date: '2024-04', value: 3.75 },
  { date: '2024-05', value: 3.8 },
];

// Historical REC Prices by Type
export const mockHistoricalPrices = [
  { date: '2023-01', solar: 5.2, wind: 4.8, hydro: 4.1, biomass: 3.9 },
  { date: '2023-02', solar: 5.3, wind: 4.9, hydro: 4.2, biomass: 3.8 },
  { date: '2023-03', solar: 5.4, wind: 5.0, hydro: 4.3, biomass: 3.7 },
  { date: '2023-04', solar: 5.5, wind: 5.1, hydro: 4.4, biomass: 3.6 },
  { date: '2023-05', solar: 5.6, wind: 5.2, hydro: 4.5, biomass: 3.5 },
  { date: '2023-06', solar: 5.7, wind: 5.3, hydro: 4.6, biomass: 3.4 },
  { date: '2023-07', solar: 5.8, wind: 5.2, hydro: 4.7, biomass: 3.3 },
  { date: '2023-08', solar: 5.7, wind: 5.1, hydro: 4.6, biomass: 3.2 },
  { date: '2023-09', solar: 5.6, wind: 5.0, hydro: 4.5, biomass: 3.1 },
  { date: '2023-10', solar: 5.5, wind: 4.9, hydro: 4.4, biomass: 3.0 },
  { date: '2023-11', solar: 5.4, wind: 4.8, hydro: 4.3, biomass: 2.9 },
  { date: '2023-12', solar: 5.3, wind: 4.7, hydro: 4.2, biomass: 2.8 },
  { date: '2024-01', solar: 5.2, wind: 4.6, hydro: 4.1, biomass: 2.7 },
  { date: '2024-02', solar: 5.1, wind: 4.5, hydro: 4.0, biomass: 2.6 },
  { date: '2024-03', solar: 5.0, wind: 4.4, hydro: 3.9, biomass: 2.5 },
  { date: '2024-04', solar: 4.9, wind: 4.3, hydro: 3.8, biomass: 2.4 },
  { date: '2024-05', solar: 4.8, wind: 4.2, hydro: 3.7, biomass: 2.3 },
];

// REC Supply by Blockchain
export const mockSupplyByBlockchain = {
  pieData: [
    { label: 'Polygon', value: 60, color: '#9333EA' },
    { label: 'Ethereum', value: 30, color: '#3B82F6' },
    { label: 'Celo', value: 10, color: '#10B981' },
  ],
  barData: [
    { label: 'Jan', polygon: 12000000, ethereum: 6000000, celo: 2000000 },
    { label: 'Feb', polygon: 13000000, ethereum: 6500000, celo: 2200000 },
    { label: 'Mar', polygon: 14000000, ethereum: 7000000, celo: 2400000 },
    { label: 'Apr', polygon: 15000000, ethereum: 7500000, celo: 2600000 },
    { label: 'May', polygon: 16000000, ethereum: 8000000, celo: 2800000 },
  ],
};

// On-Chain Retirement Volume
export const mockOnChainRetirementVolume = [
  { month: 'Jan', value: 2500000 },
  { month: 'Feb', value: 2700000 },
  { month: 'Mar', value: 3000000 },
  { month: 'Apr', value: 3200000 },
  { month: 'May', value: 3500000 },
];

// Pricing Panel Data
export const mockPricingData = [
  {
    name: 'Solar REC',
    icon: 'SR',
    iconBg: '#F59E0B',
    availableAmount: 21414438.29,
    price: '0.33',
    selectiveCost: '$0.35',
    trend: -47,
  },
  {
    name: 'Wind REC',
    icon: 'WR',
    iconBg: '#3B82F6',
    availableAmount: 2363716.48,
    price: '0.44',
    selectiveCost: '$0.48',
    trend: -7,
  },
  {
    name: 'Hydro REC',
    icon: 'HR',
    iconBg: '#10B981',
    availableAmount: 2492731.36,
    price: '0.19',
    selectiveCost: null,
    trend: -3,
  },
  {
    name: 'Biomass REC',
    icon: 'BR',
    iconBg: '#8B5CF6',
    availableAmount: 109667.6,
    price: '0.07',
    selectiveCost: '$0.07',
    trend: -1,
  },
  {
    name: 'Geothermal REC',
    icon: 'GR',
    iconBg: '#EF4444',
    availableAmount: 31690.31,
    price: '0.11',
    selectiveCost: '$0.11',
    trend: 0,
  },
];