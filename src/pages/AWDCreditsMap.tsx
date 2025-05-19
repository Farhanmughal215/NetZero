import React, { useEffect, useRef, useState } from 'react';
import { HelpCircle, Download, RefreshCw, Calendar, Filter } from 'lucide-react';
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from '../components/ui/Tooltip';
import * as d3 from 'd3';
import { geoPath } from 'd3-geo';
import { vietnamGeoData } from '../data/vietnamGeoData';
import { vietnamMapData } from '../data/vietnamMapData';

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

  const getColorForCredits = (credits: number) => {
    if (credits > 500000) return '#2E7D32';
    if (credits > 400000) return '#388E3C';
    if (credits > 300000) return '#43A047';
    if (credits > 200000) return '#4CAF50';
    return '#66BB6A';
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
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    svg.selectAll('*').remove();

    svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height].join(' '))
      .attr('style', 'max-width: 100%; height: auto; background: linear-gradient(to bottom right, #f0f9ff, #e0f2fe);');

    const g = svg.append('g');

    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom as any)
      .call(zoom.transform as any, d3.zoomIdentity);

    const projection = d3.geoMercator()
      .center([106.5, 16])
      .scale(2000)
      .translate([width / 2, height / 2]);

    const path = geoPath().projection(projection);

    g.selectAll('path.province')
      .data(vietnamMapData.features)
      .join('path')
      .attr('class', 'province')
      .attr('d', path as any)
      .attr('fill', '#f3f4f6')
      .attr('stroke', '#d1d5db')
      .attr('stroke-width', 0.5)
      .attr('opacity', 0.8);

    const credits = vietnamGeoData.features.map(f => f.properties.historicalData[year]?.credits || 0);
    const maxCredits = Math.max(...credits);
    const minCredits = Math.min(...credits);
    
    const radiusScale = d3.scaleLinear()
      .domain([minCredits, maxCredits])
      .range([20, 35]);

    g.selectAll('circle')
      .data(vietnamGeoData.features)
      .join('circle')
      .attr('cx', d => projection(d.geometry.coordinates)![0])
      .attr('cy', d => projection(d.geometry.coordinates)![1])
      .attr('r', d => radiusScale(d.properties.historicalData[year]?.credits || 0))
      .attr('fill', d => d.properties.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('opacity', 0.85)
      .attr('cursor', 'pointer')
      .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))')
      .on('mouseover', function(event, d) {
        this.parentNode.appendChild(this);
        
        d3.select(this)
          .transition()
          .duration(200)
          .attr('opacity', 1)
          .attr('r', d => radiusScale(d.properties.historicalData[year]?.credits || 0) * 1.2)
          .style('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))');

        const [x, y] = projection(d.geometry.coordinates)!;
        
        const tooltip = g.append('g')
          .attr('class', 'tooltip')
          .attr('transform', `translate(${x},${y - 70})`);

        tooltip.append('rect')
          .attr('x', -100)
          .attr('y', -45)
          .attr('width', 200)
          .attr('height', 40)
          .attr('fill', 'rgba(17, 24, 39, 0.95)')
          .attr('rx', 8)
          .style('filter', 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))');

        tooltip.append('text')
          .attr('x', 0)
          .attr('y', -25)
          .attr('text-anchor', 'middle')
          .attr('fill', '#fff')
          .style('font-size', '14px')
          .style('font-weight', '600')
          .text(d.properties.name);

        tooltip.append('text')
          .attr('x', 0)
          .attr('y', -8)
          .attr('text-anchor', 'middle')
          .attr('fill', '#9CA3AF')
          .style('font-size', '12px')
          .text(`${(d.properties.historicalData[year]?.credits || 0).toLocaleString()} tCO₂`);
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('opacity', 0.85)
          .attr('r', d => radiusScale(d.properties.historicalData[year]?.credits || 0))
          .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))');

        g.selectAll('.tooltip').remove();
      })
      .on('click', (event, d) => {
        setSelectedProvince({
          id: d.properties.name.toLowerCase().replace(/\s+/g, '-'),
          name: d.properties.name,
          projects: d.properties.historicalData[year]?.projects || 0,
          credits: d.properties.historicalData[year]?.credits || 0,
          lastVerification: d.properties.lastVerification || 'N/A',
          awdPercentage: d.properties.historicalData[year]?.awdPercentage || 0,
          coordinates: d.geometry.coordinates
        });
      });

    g.selectAll('text')
      .data(vietnamGeoData.features)
      .join('text')
      .attr('x', d => projection(d.geometry.coordinates)![0])
      .attr('y', d => {
        const radius = radiusScale(d.properties.historicalData[year]?.credits || 0);
        return projection(d.geometry.coordinates)![1] + radius + 15;
      })
      .attr('text-anchor', 'middle')
      .attr('fill', '#1f2937')
      .attr('font-size', '12px')
      .attr('font-weight', '600')
      .style('text-shadow', '1px 1px 2px rgba(255,255,255,0.9), -1px -1px 2px rgba(255,255,255,0.9)')
      .text(d => d.properties.name);

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
      .attr('fill', 'rgba(255,255,255,0.9)')
      .attr('rx', 8)
      .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))');

    legend.selectAll('rect.item')
      .data(legendData)
      .join('rect')
      .attr('class', 'item')
      .attr('x', 5)
      .attr('y', (d, i) => i * 25 + 5)
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', d => d.color)
      .attr('rx', 3)
      .style('filter', 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))');

    legend.selectAll('text')
      .data(legendData)
      .join('text')
      .attr('x', 30)
      .attr('y', (d, i) => i * 25 + 17)
      .attr('font-size', '12px')
      .attr('fill', '#4b5563')
      .text(d => d.label);

    return () => {
      svg.selectAll('*').remove();
    };
  }, [year]);

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
                      onChange={(e) => setFilters({ ...filters, province: e.target.value })}
                    >
                      <option value="">All Provinces</option>
                      <option value="an-giang">An Giang</option>
                      <option value="dong-thap">Dong Thap</option>
                      <option value="kien-giang">Kien Giang</option>
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