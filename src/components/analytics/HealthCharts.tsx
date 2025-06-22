import React from 'react';
import { TrendingUp, TrendingDown, Heart, Activity, Droplets, Weight } from 'lucide-react';
import { Card } from '../common/Card';

export const HealthCharts: React.FC = () => {
  const chartData = {
    heartRate: [72, 75, 71, 68, 74, 76, 73],
    bloodPressure: [
      { systolic: 120, diastolic: 80 },
      { systolic: 118, diastolic: 78 },
      { systolic: 122, diastolic: 82 },
      { systolic: 115, diastolic: 75 },
      { systolic: 121, diastolic: 81 },
      { systolic: 119, diastolic: 79 },
      { systolic: 120, diastolic: 80 },
    ],
    glucose: [95, 102, 88, 94, 91, 98, 96],
    weight: [75.2, 75.0, 74.8, 74.9, 75.1, 75.3, 75.0]
  };

  const dates = ['Jan 14', 'Jan 15', 'Jan 16', 'Jan 17', 'Jan 18', 'Jan 19', 'Jan 20'];

  const renderMiniChart = (data: number[], color: string) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    return (
      <div className="flex items-end space-x-1 h-12">
        {data.map((value, index) => {
          const height = ((value - min) / range) * 100;
          return (
            <div
              key={index}
              className={`w-2 ${color} rounded-t`}
              style={{ height: `${Math.max(height, 10)}%` }}
            />
          );
        })}
      </div>
    );
  };

  const getTrend = (data: number[]) => {
    const recent = data.slice(-3).reduce((a, b) => a + b, 0) / 3;
    const previous = data.slice(-6, -3).reduce((a, b) => a + b, 0) / 3;
    return recent > previous ? 'up' : 'down';
  };

  const metrics = [
    {
      title: 'Heart Rate',
      value: chartData.heartRate[chartData.heartRate.length - 1],
      unit: 'bpm',
      icon: Heart,
      color: 'bg-red-500',
      data: chartData.heartRate,
      trend: getTrend(chartData.heartRate)
    },
    {
      title: 'Blood Pressure',
      value: `${chartData.bloodPressure[chartData.bloodPressure.length - 1].systolic}/${chartData.bloodPressure[chartData.bloodPressure.length - 1].diastolic}`,
      unit: 'mmHg',
      icon: Activity,
      color: 'bg-blue-500',
      data: chartData.bloodPressure.map(bp => bp.systolic),
      trend: getTrend(chartData.bloodPressure.map(bp => bp.systolic))
    },
    {
      title: 'Glucose',
      value: chartData.glucose[chartData.glucose.length - 1],
      unit: 'mg/dL',
      icon: Droplets,
      color: 'bg-yellow-500',
      data: chartData.glucose,
      trend: getTrend(chartData.glucose)
    },
    {
      title: 'Weight',
      value: chartData.weight[chartData.weight.length - 1],
      unit: 'kg',
      icon: Weight,
      color: 'bg-green-500',
      data: chartData.weight,
      trend: getTrend(chartData.weight)
    }
  ];

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={metric.title}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${metric.color.replace('bg-', 'bg-opacity-10 bg-')}`}>
                  <Icon className={`w-5 h-5 ${metric.color.replace('bg-', 'text-')}`} />
                </div>
                <TrendIcon className={`w-4 h-4 ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
              </div>
              
              <div className="mb-3">
                <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {metric.value} <span className="text-sm font-normal text-gray-500">{metric.unit}</span>
                </p>
              </div>
              
              {renderMiniChart(metric.data, metric.color)}
            </Card>
          );
        })}
      </div>

      {/* Detailed Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Heart Rate Trend</h3>
          <div className="space-y-3">
            <div className="flex items-end justify-between h-32 px-2">
              {chartData.heartRate.map((rate, index) => {
                const height = ((rate - 60) / (90 - 60)) * 100;
                return (
                  <div key={index} className="flex flex-col items-center space-y-1">
                    <div className="text-xs text-gray-600">{rate}</div>
                    <div
                      className="w-8 bg-red-500 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-gray-500 px-2">
              {dates.map(date => <span key={date}>{date}</span>)}
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Blood Pressure</h3>
          <div className="space-y-3">
            <div className="flex items-end justify-between h-32 px-2">
              {chartData.bloodPressure.map((bp, index) => {
                const systolicHeight = ((bp.systolic - 100) / (140 - 100)) * 100;
                const diastolicHeight = ((bp.diastolic - 60) / (100 - 60)) * 100;
                return (
                  <div key={index} className="flex flex-col items-center space-y-1">
                    <div className="text-xs text-gray-600">{bp.systolic}/{bp.diastolic}</div>
                    <div className="flex items-end space-x-1">
                      <div
                        className="w-3 bg-blue-500 rounded-t"
                        style={{ height: `${systolicHeight * 0.8}px` }}
                      />
                      <div
                        className="w-3 bg-blue-300 rounded-t"
                        style={{ height: `${diastolicHeight * 0.8}px` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-gray-500 px-2">
              {dates.map(date => <span key={date}>{date}</span>)}
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Systolic</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-300 rounded"></div>
                <span>Diastolic</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};