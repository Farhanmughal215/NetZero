// Mock data for the Supply dashboard

export const mockSupplyData = {
  networkCards: [
    {
      network: 'Polygon',
      totalSupply: '45.2M',
      totalRetired: '12.8M',
      platformRetired: '8.4M',
      trend: 15.3
    },
    {
      network: 'Ethereum',
      totalSupply: '22.6M',
      totalRetired: '6.4M',
      platformRetired: '4.2M',
      trend: 8.7
    },
    {
      network: 'Celo',
      totalSupply: '12.3M',
      totalRetired: '3.2M',
      platformRetired: '2.1M',
      trend: -2.4
    }
  ],
  supplyDistribution: [
    { label: 'Polygon', value: 45.2, color: '#9333EA' },
    { label: 'Ethereum', value: 22.6, color: '#3B82F6' },
    { label: 'Celo', value: 12.3, color: '#10B981' }
  ],
  supplyOverTime: [
    { date: '2023-Q1', Polygon: 35.2, Ethereum: 18.6, Celo: 10.3 },
    { date: '2023-Q2', Polygon: 38.4, Ethereum: 19.8, Celo: 11.1 },
    { date: '2023-Q3', Polygon: 41.6, Ethereum: 20.9, Celo: 11.8 },
    { date: '2023-Q4', Polygon: 43.8, Ethereum: 21.7, Celo: 12.1 },
    { date: '2024-Q1', Polygon: 45.2, Ethereum: 22.6, Celo: 12.3 }
  ],
  supplyByEnergyType: [
    { label: 'Solar', value: 32.5 },
    { label: 'Wind', value: 28.4 },
    { label: 'Hydro', value: 12.6 },
    { label: 'Biomass', value: 6.8 }
  ],
  supplyByRegion: [
    { label: 'North America', value: 35.2 },
    { label: 'Europe', value: 24.8 },
    { label: 'Asia Pacific', value: 15.6 },
    { label: 'Latin America', value: 4.5 }
  ],
  topProjects: [
    {
      name: 'Solar Valley Farm',
      type: 'Utility Solar',
      supply: '2.8M RECs',
      location: 'California, USA'
    },
    {
      name: 'Coastal Wind Park',
      type: 'Wind Farm',
      supply: '2.3M RECs',
      location: 'Denmark'
    },
    {
      name: 'Mountain Hydro Plant',
      type: 'Hydroelectric',
      supply: '1.9M RECs',
      location: 'Norway'
    },
    {
      name: 'Desert Sun Project',
      type: 'Solar Farm',
      supply: '1.7M RECs',
      location: 'Arizona, USA'
    },
    {
      name: 'Green Plains Wind',
      type: 'Wind Farm',
      supply: '1.5M RECs',
      location: 'Texas, USA'
    }
  ],
  vintageDistribution: [
    { label: '2020', value: 12.4 },
    { label: '2021', value: 18.6 },
    { label: '2022', value: 24.8 },
    { label: '2023', value: 28.9 },
    { label: '2024', value: 15.2 }
  ]
};