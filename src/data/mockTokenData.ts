// Mock data for the Token Details dashboard

export const mockTokenData = {
  toucan: {
    totalVolume: '15.2M tonnes CO2e',
    tokenizedState: [
      { label: 'Retired', value: 45, color: '#22C55E' },
      { label: 'Outstanding', value: 35, color: '#3B82F6' },
      { label: 'Bridged', value: 20, color: '#8B5CF6' },
    ],
    pooledTokens: [
      { label: 'BCT', value: 40, color: '#0891B2' },
      { label: 'NCT', value: 35, color: '#059669' },
      { label: 'Not Pooled', value: 25, color: '#6366F1' },
    ],
    volumeOverTime: [
      { date: '2024-01', BCT: 1200, NCT: 800, Other: 400 },
      { date: '2024-02', BCT: 1400, NCT: 900, Other: 500 },
      { date: '2024-03', BCT: 1600, NCT: 1100, Other: 600 },
      { date: '2024-04', BCT: 1800, NCT: 1300, Other: 700 },
      { date: '2024-05', BCT: 2000, NCT: 1500, Other: 800 },
    ],
    vintageDistribution: [
      { label: '2019', value: 10 },
      { label: '2020', value: 15 },
      { label: '2021', value: 25 },
      { label: '2022', value: 30 },
      { label: '2023', value: 20 },
    ],
    methodologies: [
      { label: 'AMS-I.D', value: 30 },
      { label: 'ACM0002', value: 25 },
      { label: 'VM0007', value: 20 },
      { label: 'VM0006', value: 15 },
      { label: 'Others', value: 10 },
    ],
    creditOrigins: [
      { label: 'India', value: 25 },
      { label: 'Brazil', value: 20 },
      { label: 'China', value: 15 },
      { label: 'Indonesia', value: 12 },
      { label: 'Others', value: 28 },
    ],
    projectDistribution: [
      { label: 'Solar Energy', value: 30 },
      { label: 'Wind Power', value: 25 },
      { label: 'Hydropower', value: 15 },
      { label: 'Forest Conservation', value: 12 },
      { label: 'Agriculture', value: 10 },
      { label: 'Others', value: 8 },
    ],
  },
  moss: {
    totalVolume: '8.7M tonnes CO2e',
    tokenizedState: [
      { label: 'Retired', value: 40, color: '#22C55E' },
      { label: 'Outstanding', value: 40, color: '#3B82F6' },
      { label: 'Bridged', value: 20, color: '#8B5CF6' },
    ],
    pooledTokens: [
      { label: 'MCO2', value: 60, color: '#0891B2' },
      { label: 'Not Pooled', value: 40, color: '#6366F1' },
    ],
    volumeOverTime: [
      { date: '2024-01', MCO2: 800, Other: 300 },
      { date: '2024-02', MCO2: 1000, Other: 400 },
      { date: '2024-03', MCO2: 1200, Other: 500 },
      { date: '2024-04', MCO2: 1400, Other: 600 },
      { date: '2024-05', MCO2: 1600, Other: 700 },
    ],
    vintageDistribution: [
      { label: '2019', value: 15 },
      { label: '2020', value: 20 },
      { label: '2021', value: 25 },
      { label: '2022', value: 25 },
      { label: '2023', value: 15 },
    ],
    methodologies: [
      { label: 'VM0015', value: 35 },
      { label: 'VM0007', value: 25 },
      { label: 'VM0006', value: 20 },
      { label: 'Others', value: 20 },
    ],
    creditOrigins: [
      { label: 'Brazil', value: 45 },
      { label: 'Peru', value: 25 },
      { label: 'Colombia', value: 20 },
      { label: 'Others', value: 10 },
    ],
    projectDistribution: [
      { label: 'Forest Conservation', value: 45 },
      { label: 'Reforestation', value: 25 },
      { label: 'Avoided Deforestation', value: 20 },
      { label: 'Others', value: 10 },
    ],
  },
  c3: {
    totalVolume: '5.4M tonnes CO2e',
    tokenizedState: [
      { label: 'Retired', value: 35, color: '#22C55E' },
      { label: 'Outstanding', value: 45, color: '#3B82F6' },
      { label: 'Bridged', value: 20, color: '#8B5CF6' },
    ],
    pooledTokens: [
      { label: 'UBO', value: 45, color: '#0891B2' },
      { label: 'NBO', value: 35, color: '#059669' },
      { label: 'Not Pooled', value: 20, color: '#6366F1' },
    ],
    volumeOverTime: [
      { date: '2024-01', UBO: 600, NBO: 400, Other: 200 },
      { date: '2024-02', UBO: 800, NBO: 500, Other: 300 },
      { date: '2024-03', UBO: 1000, NBO: 600, Other: 400 },
      { date: '2024-04', UBO: 1200, NBO: 700, Other: 500 },
      { date: '2024-05', UBO: 1400, NBO: 800, Other: 600 },
    ],
    vintageDistribution: [
      { label: '2019', value: 10 },
      { label: '2020', value: 20 },
      { label: '2021', value: 30 },
      { label: '2022', value: 25 },
      { label: '2023', value: 15 },
    ],
    methodologies: [
      { label: 'ACM0002', value: 30 },
      { label: 'AMS-I.D', value: 25 },
      { label: 'VM0007', value: 25 },
      { label: 'Others', value: 20 },
    ],
    creditOrigins: [
      { label: 'China', value: 30 },
      { label: 'India', value: 25 },
      { label: 'Vietnam', value: 25 },
      { label: 'Thailand', value: 15 },
      { label: 'Others', value: 5 },
    ],
    projectDistribution: [
      { label: 'Solar Energy', value: 35 },
      { label: 'Wind Power', value: 30 },
      { label: 'Forest Conservation', value: 20 },
      { label: 'Others', value: 15 },
    ],
  },
};