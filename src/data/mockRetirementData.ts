// Mock data for the Retirement Trends dashboard

export const mockRetirementData = {
  // Existing data
  retirementsByPool: [
    { label: 'Jan', value: 15000, color: '#F59E0B' },
    { label: 'Feb', value: 18000, color: '#F59E0B' },
    { label: 'Mar', value: 22000, color: '#F59E0B' },
    { label: 'Apr', value: 25000, color: '#F59E0B' },
    { label: 'May', value: 28000, color: '#F59E0B' },
  ],
  retirementsByChain: [
    { label: 'Polygon', value: 60, color: '#9333EA' },
    { label: 'Ethereum', value: 25, color: '#3B82F6' },
    { label: 'Celo', value: 15, color: '#10B981' },
  ],
  redemptionTotals: [
    {
      name: 'Solar REC',
      symbol: 'SR',
      totalRedeemed: '296,687',
      platformPercentage: '12.7',
      iconBg: '#F59E0B',
    },
    {
      name: 'Wind REC',
      symbol: 'WR',
      totalRedeemed: '156,324',
      platformPercentage: '8.4',
      iconBg: '#3B82F6',
    },
    {
      name: 'Hydro REC',
      symbol: 'HR',
      totalRedeemed: '89,456',
      platformPercentage: '6.2',
      iconBg: '#10B981',
    },
    {
      name: 'Biomass REC',
      symbol: 'BR',
      totalRedeemed: '45,789',
      platformPercentage: '4.8',
      iconBg: '#8B5CF6',
    },
    {
      name: 'Geothermal REC',
      symbol: 'GR',
      totalRedeemed: '23,456',
      platformPercentage: '3.1',
      iconBg: '#EF4444',
    }
  ],
  detailedList: [
    {
      token: 'Solar REC',
      amount: '1,000 MWh',
      date: '2024-03-15',
      beneficiary: 'Green Corp LLC',
      chain: 'Polygon',
      vintage: '2024',
      registry: 'I-REC',
    },
    {
      token: 'Wind REC',
      amount: '750 MWh',
      date: '2024-03-14',
      beneficiary: 'Eco Industries',
      chain: 'Ethereum',
      vintage: '2023',
      registry: 'Green-e',
    },
    {
      token: 'Hydro REC',
      amount: '500 MWh',
      date: '2024-03-13',
      beneficiary: 'Clean Energy Co',
      chain: 'Celo',
      vintage: '2024',
      registry: 'I-REC',
    },
    {
      token: 'Biomass REC',
      amount: '250 MWh',
      date: '2024-03-12',
      beneficiary: 'Sustainable Power',
      chain: 'Polygon',
      vintage: '2023',
      registry: 'TIGRs',
    },
    {
      token: 'Solar REC',
      amount: '1,200 MWh',
      date: '2024-03-11',
      beneficiary: 'Energy Solutions',
      chain: 'Ethereum',
      vintage: '2024',
      registry: 'Green-e',
    },
  ],

  // New data for token view
  retirementsByToken: [
    { label: 'Solar REC', value: 45, color: '#F59E0B' },
    { label: 'Wind REC', value: 30, color: '#3B82F6' },
    { label: 'Hydro REC', value: 15, color: '#10B981' },
    { label: 'Biomass REC', value: 10, color: '#8B5CF6' },
  ],
  tokenTrends: [
    { date: '2024-01', solar: 12000, wind: 8000, hydro: 4000, biomass: 2000 },
    { date: '2024-02', solar: 14000, wind: 9000, hydro: 4500, biomass: 2200 },
    { date: '2024-03', solar: 16000, wind: 10000, hydro: 5000, biomass: 2400 },
    { date: '2024-04', solar: 18000, wind: 11000, hydro: 5500, biomass: 2600 },
    { date: '2024-05', solar: 20000, wind: 12000, hydro: 6000, biomass: 2800 },
  ],
  tokenPerformance: [
    {
      name: 'Solar REC',
      symbol: 'SR',
      color: '#F59E0B',
      totalRetired: '45,000 MWh',
      growthRate: '+15.3%'
    },
    {
      name: 'Wind REC',
      symbol: 'WR',
      color: '#3B82F6',
      totalRetired: '30,000 MWh',
      growthRate: '+12.8%'
    },
    {
      name: 'Hydro REC',
      symbol: 'HR',
      color: '#10B981',
      totalRetired: '15,000 MWh',
      growthRate: '+8.4%'
    }
  ],

  // New data for chain view
  chainActivity: [
    { label: 'Jan', value: 15000 },
    { label: 'Feb', value: 18000 },
    { label: 'Mar', value: 22000 },
    { label: 'Apr', value: 25000 },
    { label: 'May', value: 28000 },
  ],
  chainStats: [
    {
      name: 'Polygon',
      symbol: 'P',
      color: '#9333EA',
      totalVolume: '120,000 MWh',
      avgGasCost: '0.001 MATIC'
    },
    {
      name: 'Ethereum',
      symbol: 'E',
      color: '#3B82F6',
      totalVolume: '50,000 MWh',
      avgGasCost: '0.005 ETH'
    },
    {
      name: 'Celo',
      symbol: 'C',
      color: '#10B981',
      totalVolume: '30,000 MWh',
      avgGasCost: '0.01 CELO'
    }
  ],

  // New data for beneficiary view
  topBeneficiaries: [
    { label: 'Green Corp LLC', value: 25000 },
    { label: 'Eco Industries', value: 20000 },
    { label: 'Clean Energy Co', value: 15000 },
    { label: 'Sustainable Power', value: 12000 },
    { label: 'Energy Solutions', value: 10000 },
  ],
  beneficiaryGrowth: [
    { date: '2024-01', value: 50 },
    { date: '2024-02', value: 75 },
    { date: '2024-03', value: 100 },
    { date: '2024-04', value: 125 },
    { date: '2024-05', value: 150 },
  ],
  beneficiaryDetails: [
    {
      name: 'Green Corp LLC',
      totalRetired: '25,000 MWh',
      mostUsedToken: 'Solar REC',
      preferredChain: 'Polygon',
      lastActivity: '2024-03-15'
    },
    {
      name: 'Eco Industries',
      totalRetired: '20,000 MWh',
      mostUsedToken: 'Wind REC',
      preferredChain: 'Ethereum',
      lastActivity: '2024-03-14'
    },
    {
      name: 'Clean Energy Co',
      totalRetired: '15,000 MWh',
      mostUsedToken: 'Hydro REC',
      preferredChain: 'Celo',
      lastActivity: '2024-03-13'
    },
    {
      name: 'Sustainable Power',
      totalRetired: '12,000 MWh',
      mostUsedToken: 'Biomass REC',
      preferredChain: 'Polygon',
      lastActivity: '2024-03-12'
    },
    {
      name: 'Energy Solutions',
      totalRetired: '10,000 MWh',
      mostUsedToken: 'Solar REC',
      preferredChain: 'Ethereum',
      lastActivity: '2024-03-11'
    }
  ]
};