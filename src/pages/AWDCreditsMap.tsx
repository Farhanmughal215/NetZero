import React, { useEffect, useRef, useState } from 'react';
import { HelpCircle, Download, RefreshCw, Calendar, Filter, ChevronDown, Map } from 'lucide-react';
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from '../components/ui/Tooltip';
import * as d3 from 'd3';
import { geoPath } from 'd3-geo';
import { vietnamGeoData } from '../data/vietnamGeoData';
import { vietnamMapData } from '../data/vietnamMapData';
import LineChart from '../components/charts/LineChart';

interface Province {
  id: string;
  name: string;
  projects: number;
  credits: number;
  lastVerification: string;
  awdPercentage: number;
  coordinates: [number, number];
}

const AWDCreditsMap: React.FC = () => {
  const mapRef = useRef<SVGSVGElement>(null);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [year, setYear] = useState(2023);
  const [isPlaying, setIsPlaying] = useState(false);
  const playTimeoutRef = useRef<number | null>(null);
  const [filters, setFilters] = useState({
    province: '',
    status: 'all',
    minCredits: 0,
    maxCredits: 1000000,
    startDate: '2019-01-01',
    endDate: '2025-12-31'
  });

  const provinces = vietnamGeoData.features.map(feature => ({
    id: feature.properties.name.toLowerCase().replace(/\s+/g, '-'),
    name: feature.properties.name
  }));

  const mockStats = {
    totalCredits: '3,271,233',
    verifiedProjects: 156,
    verifiedPercentage: 78,
    topProvinces: [
      { name: 'An Giang', credits: '523,450' },
      { name: 'Dong Thap', credits: '486,230' },
      { name: 'Kien Giang', credits: '412,780' }
    ]
  };

  const totalCreditsPerYear = React.useMemo(() => {
    const years = ['2019', '2020', '2021', '2022', '2023'];
    return years.map(year => ({
      date: year,
      value: vietnamGeoData.features.reduce((sum, province) => {
        return sum + (province.properties.historicalData[year]?.credits || 0);
      }, 0) / 1000
    }));
  }, []);

  const getTrendData = (provinceName: string | null) => {
    if (!provinceName) {
      return totalCreditsPerYear.map(d => ({
        date: d.date,
        'Total Credits': d.value
      }));
    }

    const province = vietnamGeoData.features.find(
      f => f.properties.name === provinceName
    );

    if (!province) return [];

    return Object.entries(province.properties.historicalData)
      .map(([year, data]) => ({
        date: year,
        [provinceName]: (data.credits || 0) / 1000
      }))
      .sort((a, b) => Number(a.date) - Number(b.date));
  };

  const getColorForCredits = (credits: number) => {
    if (credits > 500000) return '#2E7D32';
    if (credits > 400000) return '#388E3C';
    if (credits > 300000) return '#43A047';
    if (credits > 200000) return '#4CAF50';
    return '#66BB6A';
  };

  const zoomToProvince = (coordinates: [number, number]) => {
    if (!mapRef.current) return;

    const svg = d3.select(mapRef.current);
    const width = 800;
    const height = 800;

    const projection = d3.geoMercator()
      .center([106.5, 16])
      .scale(2200)
      .translate([width / 2, height / 2]);

    const x = projection(coordinates)[0];
    const y = projection(coordinates)[1];
    const scale = 4;

    const transform = d3.zoomIdentity
      .translate(width / 2, height / 2)
      .scale(scale)
      .translate(-x, -y);

    svg.transition()
      .duration(750)
      .call(
        (d3.zoom() as any).transform,
        transform
      );
  };

  const handleProvinceSelect = (provinceId: string) => {
    const selectedFeature = vietnamGeoData.features.find(
      feature => feature.properties.name.toLowerCase().replace(/\s+/g, '-') === provinceId
    );

    if (selectedFeature) {
      setSelectedProvince({
        id: provinceId,
        name: selectedFeature.properties.name,
        projects: selectedFeature.properties.historicalData[year]?.projects || 0,
        credits: selectedFeature.properties.historicalData[year]?.credits || 0,
        lastVerification: selectedFeature.properties.lastVerification || 'N/A',
        awdPercentage: selectedFeature.properties.historicalData[year]?.awdPercentage || 0,
        coordinates: selectedFeature.geometry.coordinates
      });

      if (mapRef.current) {
        const svg = d3.select(mapRef.current);
        svg.selectAll('circle')
          .attr('fill', (d: any) => {
            if (d.properties.name === selectedFeature.properties.name) {
              return '#49E1C3';
            }
            const yearData = d.properties.historicalData?.[year];
            return getColorForCredits(yearData?.credits || 0);
          });

        zoomToProvince(selectedFeature.geometry.coordinates);
      }
    } else {
      setSelectedProvince(null);
      
      if (mapRef.current) {
        const svg = d3.select(mapRef.current);
        svg.transition()
          .duration(750)
          .call(
            (d3.zoom() as any).transform,
            d3.zoomIdentity
          );
      }
    }

    setFilters({ ...filters, province: provinceId });
  };

  const updateMapData = (selectedYear: number) => {
    if (!mapRef.current) return;

    const svg = d3.select(mapRef.current);
    
    svg.selectAll('circle')
      .transition()
      .duration(500)
      .attr('fill', (d: any) => {
        const yearData = d.properties.historicalData?.[selectedYear];
        return getColorForCredits(yearData?.credits || 0);
      })
      .attr('r', (d: any) => {
        const yearData = d.properties.historicalData?.[selectedYear];
        return 20 + ((yearData?.credits || 0) / 50000);
      });

    svg.selectAll('.tooltip text')
      .text((d: any) => {
        const yearData = d.properties.historicalData?.[selectedYear];
        return `${d.properties.name}: ${(yearData?.credits || 0).toLocaleString()} tCO₂`;
      });
  };

  const playTimeline = () => {
    setIsPlaying(true);
    const animate = () => {
      setYear(prevYear => {
        const nextYear = prevYear + 1;
        if (nextYear > 2025) {
          setIsPlaying(false);
          return 2019;
        }
        playTimeoutRef.current = window.setTimeout(animate, 1000);
        return nextYear;
      });
    };
    animate();
  };

  const stopTimeline = () => {
    setIsPlaying(false);
    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current);
    }
  };

  useEffect(() => {
    updateMapData(year);
  }, [year]);

  useEffect(() => {
    return () => {
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const svg = d3.select(mapRef.current);
    const width = 800;
    const height = 800;
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };

    svg.selectAll('*').remove();

    svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height].join(' '))
      .attr('style', 'max-width: 100%; height: auto; background: #eef2f7;');

    const g = svg.append('g');

    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom as any);

    const projection = d3.geoMercator()
      .center([106.5, 16])
      .scale(2200)
      .translate([width / 2, height / 2]);

    const path = geoPath().projection(projection);

    g.selectAll('path.country')
      .data(vietnamMapData.features.filter(f => f.properties.region === 'country'))
      .join('path')
      .attr('class', 'country')
      .attr('d', path as any)
      .attr('fill', '#ffffff')
      .attr('stroke', '#e2e8f0')
      .attr('stroke-width', 1.5)
      .attr('stroke-opacity', 0.8);

    const markerGroup = g.append('g').attr('class', 'markers');

    const defs = svg.append('defs');
    const filter = defs.append('filter')
      .attr('id', 'marker-shadow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    filter.append('feDropShadow')
      .attr('dx', 0)
      .attr('dy', 2)
      .attr('stdDeviation', 2)
      .attr('flood-color', '#000')
      .attr('flood-opacity', 0.15);

    vietnamGeoData.features.forEach(feature => {
      const [x, y] = projection(feature.geometry.coordinates)!;
      const credits = feature.properties.historicalData[year]?.credits || 0;
      
      const markerGroup = g.append('g')
        .attr('transform', `translate(${x},${y})`)
        .attr('cursor', 'pointer')
        .style('filter', 'url(#marker-shadow)')
        .on('mouseover', function(event) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('transform', `translate(${x},${y}) scale(1.1)`);
            
          const tooltip = g.append('g')
            .attr('class', 'tooltip')
            .attr('transform', `translate(${x},${y - 60})`);

          tooltip.append('rect')
            .attr('x', -100)
            .attr('y', -40)
            .attr('width', 200)
            .attr('height', 50)
            .attr('rx', 8)
            .attr('fill', 'white')
            .attr('stroke', '#e2e8f0')
            .style('filter', 'url(#marker-shadow)');

          tooltip.append('text')
            .attr('x', 0)
            .attr('y', -20)
            .attr('text-anchor', 'middle')
            .attr('fill', '#1a202c')
            .style('font-weight', '600')
            .style('font-size', '14px')
            .text(feature.properties.name);

          tooltip.append('text')
            .attr('x', 0)
            .attr('y', 0)
            .attr('text-anchor', 'middle')
            .attr('fill', '#4a5568')
            .style('font-size', '12px')
            .text(`${credits.toLocaleString()} tCO₂`);
        })
        .on('mouseout', function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('transform', `translate(${x},${y})`);
          g.selectAll('.tooltip').remove();
        })
        .on('click', () => {
          const provinceId = feature.properties.name.toLowerCase().replace(/\s+/g, '-');
          handleProvinceSelect(provinceId);
        });

      markerGroup.append('path')
        .attr('d', 'M0-20c-4.4 0-8 3.6-8 8 0 5.2 8 13 8 13s8-7.8 8-13c0-4.4-3.6-8-8-8z')
        .attr('fill', feature.properties.color)
        .attr('stroke', 'white')
        .attr('stroke-width', 2);

      markerGroup.append('text')
        .attr('y', 30)
        .attr('text-anchor', 'middle')
        .attr('fill', '#1a202c')
        .style('font-size', '12px')
        .style('font-weight', '500')
        .style('text-shadow', '1px 1px 2px white, -1px -1px 2px white')
        .text(feature.properties.name);
    });

    const legendData = [
      { color: '#2E7D32', label: '> 500,000 tCO₂' },
      { color: '#388E3C', label: '> 400,000 tCO₂' },
      { color: '#43A047', label: '> 300,000 tCO₂' },
      { color: '#4CAF50', label: '> 200,000 tCO₂' },
      { color: '#66BB6A', label: '< 200,000 tCO₂' }
    ];

    const legend = svg.append('g')
      .attr('transform', `translate(${width - 160}, ${height - 160})`);

    legend.append('rect')
      .attr('x', -10)
      .attr('y', -10)
      .attr('width', 150)
      .attr('height', 140)
      .attr('fill', 'white')
      .attr('rx', 8)
      .style('filter', 'url(#marker-shadow)');

    legendData.forEach((d, i) => {
      const legendItem = legend.append('g')
        .attr('transform', `translate(5, ${i * 25 + 5})`);

      legendItem.append('path')
        .attr('d', 'M0,0 c-2,0-3.6,1.6-3.6,3.6 0,2.3 3.6,5.9 3.6,5.9s3.6-3.5,3.6-5.9c0-2-1.6-3.6-3.6-3.6z')
        .attr('fill', d.color)
        .attr('stroke', 'white')
        .attr('stroke-width', 1);

      legendItem.append('text')
        .attr('x', 25)
        .attr('y', 7)
        .attr('font-size', '12px')
        .attr('fill', '#4b5563')
        .text(d.label);
    });

    return () => {
      svg.selectAll('*').remove();
    };
  }, [year, selectedProvince]);

  return (
    <TooltipProvider>
      <div className="flex flex-col space-y-6 min-h-screen bg-gradient-to-br from-nz-green-50 via-nz-blue-50 to-nz-teal-50 animate-gradient-xy">
        <div className="max-w-[2000px] mx-auto w-full px-6 py-4 space-y-6">
          {/* Header */}
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-secondary">
                  Vietnam AWD Credits Map
                </h1>
                <div className="flex items-center mt-2">
                  <TooltipRoot>
                    <TooltipTrigger asChild>
                      <button className="text-sm flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                        <span>About AWD Credits</span>
                        <HelpCircle size={16} className="ml-1" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-xs">
                      Alternate Wetting and Drying (AWD) is a rice farming technique that reduces water usage and methane emissions while maintaining yields.
                    </TooltipContent>
                  </TooltipRoot>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
                <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <RefreshCw size={16} className="mr-2" />
                  Sync Data
                </button>
                <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Download size={16} className="mr-2" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Updated Province Selection Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-full md:w-1/2">
                  <label className="block text-xl font-bold text-gray-900 mb-3">
                    Select Province
                  </label>
                  <div className="relative">
                    <select
                      className="w-full h-14 pl-5 pr-12 text-lg bg-white border-2 border-primary rounded-xl shadow-sm 
                               focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all
                               appearance-none cursor-pointer hover:bg-gray-50"
                      value={filters.province}
                      onChange={(e) => handleProvinceSelect(e.target.value)}
                    >
                      <option value="">All Provinces</option>
                      {provinces.map((province) => (
                        <option key={province.id} value={province.id}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <ChevronDown size={24} className="text-primary" />
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    Select a province to view detailed carbon credit data and statistics
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Quick Access</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Hanoi', 'Da Nang', 'Ho Chi Minh City', 'An Giang'].map((city) => (
                      <button
                        key={city}
                        onClick={() => handleProvinceSelect(city.toLowerCase().replace(/\s+/g, '-'))}
                        className="px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl text-sm font-medium 
                                 transition-colors border border-gray-200 hover:border-gray-300 flex items-center justify-center"
                      >
                        <Map size={16} className="mr-2 text-primary" />
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add Trend Graph before Main Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-medium text-gray-700">
                {selectedProvince ? `${selectedProvince.name} AWD Credits Trend` : 'Total AWD Credits Trend'}
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Credits (thousands tCO₂)</span>
                <TooltipRoot>
                  <TooltipTrigger asChild>
                    <button className="text-gray-400 hover:text-gray-600">
                      <HelpCircle size={16} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    {selectedProvince 
                      ? `AWD credits issued in ${selectedProvince.name} per year`
                      : 'Total AWD credits issued across all provinces per year'
                    }
                  </TooltipContent>
                </TooltipRoot>
              </div>
            </div>
            <div className="p-4 h-64">
              <LineChart 
                data={getTrendData(selectedProvince?.name || null)}
                selectedProvince={selectedProvince?.name || null}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map Section */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4">
                <svg ref={mapRef} className="w-full h-auto" />
              </div>
              {/* Time Slider */}
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={isPlaying ? stopTimeline : playTimeline}
                      className="px-3 py-1 bg-primary text-white rounded-md text-sm"
                    >
                      {isPlaying ? 'Stop' : 'Play'}
                    </button>
                    <span className="text-sm text-gray-600">2019</span>
                  </div>
                  <input
                    type="range"
                    min="2019"
                    max="2025"
                    value={year}
                    onChange={(e) => {
                      stopTimeline();
                      setYear(parseInt(e.target.value));
                    }}
                    className="flex-1 mx-4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-gray-600">2025</span>
                </div>
                <div className="mt-2 text-center text-sm text-gray-600">
                  Year: {year}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Filters */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="font-medium text-gray-700">Filters</h2>
                  <Filter size={16} className="text-gray-400" />
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Province
                    </label>
                    <select
                      className="w-full border-gray-200 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                      value={filters.province}
                      onChange={(e) => handleProvinceSelect(e.target.value)}
                    >
                      <option value="">All Provinces</option>
                      {provinces.map((province) => (
                        <option key={province.id} value={province.id}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date Range
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        className="border-gray-200 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                        value={filters.startDate}
                        onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                      />
                      <input
                        type="date"
                        className="border-gray-200 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                        value={filters.endDate}
                        onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Verification Status
                    </label>
                    <div className="flex space-x-2">
                      {['all', 'verified', 'unverified'].map((status) => (
                        <button
                          key={status}
                          className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                            filters.status === status
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                          onClick={() => setFilters({ ...filters, status })}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Credit Volume
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        className="border-gray-200 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                        value={filters.minCredits}
                        onChange={(e) => setFilters({ ...filters, minCredits: parseInt(e.target.value) })}
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        className="border-gray-200 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                        value={filters.maxCredits}
                        onChange={(e) => setFilters({ ...filters, maxCredits: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="font-medium text-gray-700">Statistics</h2>
                </div>
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-500">Total Credits</p>
                      <p className="text-xl font-bold text-gray-900">{mockStats.totalCredits}</p>
                      <p className="text-xs text-gray-500">tCO₂</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-500">Verified Projects</p>
                      <p className="text-xl font-bold text-gray-900">{mockStats.verifiedProjects}</p>
                      <p className="text-xs text-gray-500">{mockStats.verifiedPercentage}% of total</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Top Provinces</h3>
                    <div className="space-y-2">
                      {mockStats.topProvinces.map((province, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                          <span className="text-sm text-gray-600">{province.name}</span>
                          <span className="text-sm font-medium text-gray-900">{province.credits} tCO₂</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Province Info */}
              {selectedProvince && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <h2 className="font-medium text-gray-700">{selectedProvince.name}</h2>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Projects</span>
                      <span className="text-sm font-medium">{selectedProvince.projects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Credits Issued</span>
                      <span className="text-sm font-medium">{selectedProvince.credits.toLocaleString()} tCO₂</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Last Verification</span>
                      <span className="text-sm font-medium">{selectedProvince.lastVerification}</span>
                    </div>
                    <div className="flex justify-between">
                      
                      <span className="text-sm text-gray-500">AWD Coverage</span>
                      <span className="text-sm font-medium">{selectedProvince.awdPercentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Coordinates</span>
                      <span className="text-sm font-medium">
                        {selectedProvince.coordinates[0].toFixed(4)}, {selectedProvince.coordinates[1].toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AWDCreditsMap;