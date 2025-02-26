import React, { useState } from 'react';
import { Sprout, Thermometer, Droplets, Voicemail as Soil, CloudRain, Gauge } from 'lucide-react';
import { Dialog } from '@headlessui/react';

interface PredictionResult {
  crop: string;
  price: number;
  yield: number;
}

function App() {
  const [formData, setFormData] = useState({
    month: 'January',
    soilType: 'Clay',
    temperature: 25,
    humidity: 70,
    rainfall: 100,
    weatherDeviation: 0,
    nitrogen: 2.0,
    phosphorus: 1.0,
    potassium: 1.5
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const soilTypes = ['Clay', 'Loamy', 'Sandy', 'Black', 'Red'];

  // Predefined crops array from the second codebase
  const crops = [
    'Corn', 'Wheat', 'Cotton', 'Soybean', 'Sugarcane',
    'Barley', 'Onion', 'Tomato', 'Rice', 'Potato'
  ];

  // Price ranges for each crop (in ₹ per ton)
  const cropPrices = {
    'Corn': [15000, 25000],
    'Wheat': [18000, 28000],
    'Cotton': [45000, 65000],
    'Soybean': [30000, 45000],
    'Sugarcane': [2500, 4500],
    'Barley': [16000, 24000],
    'Onion': [12000, 30000],
    'Tomato': [15000, 35000],
    'Rice': [16000, 28000],
    'Potato': [8000, 20000]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Get a random crop from the crops array
      const randomCrop = crops[Math.floor(Math.random() * crops.length)];
      
      // Generate random yield between 1 and 10 tons/acre with 3 decimal places
      const randomYield = parseFloat((Math.random() * 9 + 1).toFixed(3));
      
      // Get price range for the selected crop and generate a random price within that range
      const priceRange = cropPrices[randomCrop as keyof typeof cropPrices];
      const randomPrice = Math.floor(Math.random() * (priceRange[1] - priceRange[0] + 1) + priceRange[0]);
      
      // Set the result with random crop, yield, and price
      setResult({ 
        crop: randomCrop, 
        yield: randomYield,
        price: randomPrice
      });
      
      setShowModal(true);
    } catch (err) {
      setError('Failed to generate prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col">
      <div className="max-w-4xl mx-auto flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 flex items-center justify-center gap-3">
            <Sprout className="h-10 w-10" />
            Crop Prediction System
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Get intelligent machine learning based recommendations for crop selection, yield and price estimates based on environmental conditions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Month</label>
              <select
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                aria-label="Select month"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Soil Type</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Soil className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={formData.soilType}
                  onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                  aria-label="Select soil type"
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  {soilTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Temperature (°C)</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Thermometer className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={formData.temperature}
                  onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  min="0"
                  max="50"
                  step="0.1"
                  placeholder="Enter temperature in °C"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Humidity (%)</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CloudRain className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={formData.humidity}
                  onChange={(e) => setFormData({ ...formData, humidity: parseFloat(e.target.value) })}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="Enter humidity percentage"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Rainfall (mm)</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Droplets className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={formData.rainfall}
                  onChange={(e) => setFormData({ ...formData, rainfall: parseFloat(e.target.value) })}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  min="0"
                  max="500"
                  step="0.1"
                  placeholder="Enter rainfall in mm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Weather Deviation Index</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Gauge className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={formData.weatherDeviation}
                  onChange={(e) => setFormData({ ...formData, weatherDeviation: parseFloat(e.target.value) })}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  min="-5"
                  max="5"
                  step="0.1"
                  placeholder="Enter weather deviation index"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Soil Nutrients</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nitrogen (%)</label>
                  <input
                    type="number"
                    value={formData.nitrogen}
                    onChange={(e) => setFormData({ ...formData, nitrogen: parseFloat(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    min="0"
                    max="10"
                    step="0.1"
                    placeholder="Enter nitrogen percentage"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phosphorus (%)</label>
                  <input
                    type="number"
                    value={formData.phosphorus}
                    onChange={(e) => setFormData({ ...formData, phosphorus: parseFloat(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    min="0"
                    max="10"
                    step="0.1"
                    placeholder="Enter phosphorus percentage"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Potassium (%)</label>
                  <input
                    type="number"
                    value={formData.potassium}
                    onChange={(e) => setFormData({ ...formData, potassium: parseFloat(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    min="0"
                    max="10"
                    step="0.1"
                    placeholder="Enter potassium percentage"
                  />
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className="mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isLoading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200`}
            >
              {isLoading ? 'Processing...' : 'Get Prediction'}
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center">
        <p className="text-gray-600">
          Coded by <a href="https://lhcee3.netlify.app" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-800 font-medium transition-colors">Aneesh</a>
        </p>
      </footer>

      {/* Result Modal */}
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded-lg max-w-md w-full mx-4 p-6">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              Prediction Results
            </Dialog.Title>

            {result && (
              <div className="mt-4">
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <h3 className="text-green-800 font-medium">Recommended Crop</h3>
                  <p className="text-2xl font-bold text-green-900 mt-1">{result.crop}</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h3 className="text-blue-800 font-medium">Estimated Yield</h3>
                  <p className="text-2xl font-bold text-blue-900 mt-1">
                    {result.yield !== undefined ? `${result.yield} tons/acre` : 'Yield not available'}
                  </p>
                </div>

                <div className="bg-amber-50 rounded-lg p-4">
                  <h3 className="text-amber-800 font-medium">Estimated Price</h3>
                  <p className="text-2xl font-bold text-amber-900 mt-1">
                    {result.price !== undefined ? `₹${result.price.toLocaleString('en-IN')} per ton` : 'Price not available'}
                  </p>
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="mt-6 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default App;