export const mockOffVsOnChainData = {
  topPanels: [
    {
      title: 'Total RECs Issued (Off-Chain)',
      value: '120M',
      subtitle: 'All-time volume',
      trend: 15.3
    },
    {
      title: 'Total RECs Tokenized',
      value: '8.5M',
      subtitle: '7.1% of total issued',
      trend: 24.8
    },
    {
      title: 'Off-Chain Retired',
      value: '65M',
      subtitle: '54.2% retirement rate',
      trend: 8.4
    },
    {
      title: 'On-Chain Retired',
      value: '1.2M',
      subtitle: '14.1% of tokenized',
      trend: 32.6
    }
  ],
  cumulativeIssuance: [
    { date: '2005', value: 5000000 },
    { date: '2010', value: 15000000 },
    { date: '2015', value: 45000000 },
    { date: '2020', value: 85000000 },
    { date: '2025', value: 120000000 }
  ],
  tokenizedByRegistry: [
    { date: '2023-Q1', 'I-REC': 2500000, 'Green-e': 1800000, 'TIGRs': 800000 },
    { date: '2023-Q2', 'I-REC': 2800000, 'Green-e': 2000000, 'TIGRs': 900000 },
    { date: '2023-Q3', 'I-REC': 3100000, 'Green-e': 2300000, 'TIGRs': 1100000 },
    { date: '2023-Q4', 'I-REC': 3500000, 'Green-e': 2600000, 'TIGRs': 1300000 },
    { date: '2024-Q1', 'I-REC': 3800000, 'Green-e': 2900000, 'TIGRs': 1500000 }
  ],
  recsByBlockchain: [
    { label: 'Polygon', value: 65, color: '#9333EA' },
    { label: 'Ethereum', value: 25, color: '#3B82F6' },
    { label: 'Celo', value: 10, color: '#10B981' }
  ],
  recsByType: [
    { label: 'Solar', value: 45, color: '#F59E0B' },
    { label: 'Wind', value: 30, color: '#3B82F6' },
    { label: 'Hydro', value: 15, color: '#10B981' },
    { label: 'Biomass', value: 10, color: '#8B5CF6' }
  ],
  tokenizedByBridge: [
    { label: 'EnergyWeb', value: 3200000, color: '#2563EB' },
    { label: 'Toucan', value: 2800000, color: '#7C3AED' },
    { label: 'Others', value: 2500000, color: '#10B981' }
  ],
  vintageDistribution: [
    { year: '2020', value: 1200000 },
    { year: '2021', value: 1800000 },
    { year: '2022', value: 2500000 },
    { year: '2023', value: 3000000 }
  ],
  projectTypes: [
    { type: 'Utility Solar', value: 35 },
    { type: 'Wind Farm', value: 25 },
    { type: 'Residential Solar', value: 20 },
    { type: 'Hydro Plant', value: 15 },
    { type: 'Biomass', value: 5 }
  ]
};