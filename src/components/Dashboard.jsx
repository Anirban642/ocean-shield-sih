import React, { useState, useEffect, useRef } from 'react';
import { Waves, MapPin, AlertTriangle, Bell, Plus, BarChart3, Twitter, Facebook, Instagram, Activity, TrendingUp, X, Users } from 'lucide-react';

const OceanDashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [activeAlert, setActiveAlert] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '' });
  const [formData, setFormData] = useState({ hazardType: '', location: 'Chennai, Tamil Nadu', description: '' });
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);

  const hazards = [
    { id: 1, name: "Marina Beach", type: "critical", lat: 13.0478, lng: 80.2619, severity: "Tsunami Warning" },
    { id: 2, name: "Fort Kochi", type: "warning", lat: 9.9666, lng: 76.2427, severity: "High Waves" },
    { id: 3, name: "Paradip Port", type: "info", lat: 20.3156, lng: 86.6239, severity: "Storm Watch" },
    { id: 4, name: "Visakhapatnam", type: "critical", lat: 17.6868, lng: 83.2185, severity: "Coastal Flooding" }
  ];

  const alerts = [
    { id: 1, type: "critical", title: "Tsunami Warning - East Coast", time: "10:30 AM", areas: "Tamil Nadu, Andhra Pradesh" },
    { id: 2, type: "warning", title: "High Wave Alert - West Coast", time: "09:15 AM", areas: "Kerala, Karnataka" },
    { id: 3, type: "info", title: "Storm Watch - Bay of Bengal", time: "08:00 AM", areas: "Odisha, West Bengal" }
  ];

  const reports = [
    { id: 1, time: '10:45 AM', location: 'Marina Beach, Chennai', type: 'High Waves', reporter: 'Citizen User', status: 'investigating' },
    { id: 2, time: '10:30 AM', location: 'Fort Kochi, Kerala', type: 'Coastal Flooding', reporter: 'Local Authority', status: 'verified' },
    { id: 3, time: '09:15 AM', location: 'Paradip Port', type: 'Storm Surge', reporter: 'Weather Station', status: 'verified' }
  ];

  const socialPosts = [
    { platform: 'Twitter', time: '2 mins ago', location: 'Chennai', content: 'Unusual high waves at Marina Beach. Water levels rising rapidly. #ChennaiAlert' },
    { platform: 'Facebook', time: '5 mins ago', location: 'Kochi', content: 'Strange tidal patterns near Fort Kochi. Local fishermen advised caution.' },
    { platform: 'Instagram', time: '12 mins ago', location: 'Visakhapatnam', content: 'Massive waves hitting the coast! Stay safe everyone. #Tsunami' }
  ];

  const trendingKeywords = [
    { keyword: '#Tsunami', mentions: '2.3k', trend: 'Spike in last 2 hours' },
    { keyword: '#ChennaiAlert', mentions: '1.8k', trend: 'Growing trend' },
    { keyword: '#HighWaves', mentions: '1.2k', trend: 'Steady mentions' }
  ];

  useEffect(() => {
    if (currentPage === 'dashboard') {
      const loadLeaflet = async () => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
        script.onload = initializeMap;
        document.head.appendChild(script);
      };

      const initializeMap = () => {
        if (!window.L || leafletMapRef.current || !mapRef.current) return;

        const map = window.L.map(mapRef.current, {
          center: [20.5937, 78.9629],
          zoom: 5,
          zoomControl: true
        });

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const createCustomIcon = (type) => {
          const color = type === 'critical' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#3b82f6';
          return window.L.divIcon({
            html: `<div style="width: 20px; height: 20px; border-radius: 50%; background-color: ${color}; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); animation: pulse 2s infinite;"></div>`,
            className: 'custom-hazard-marker',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          });
        };

        hazards.forEach(hazard => {
          const marker = window.L.marker([hazard.lat, hazard.lng], {
            icon: createCustomIcon(hazard.type)
          }).addTo(map);

          marker.bindPopup(`<div><h3>${hazard.name}</h3><p>${hazard.severity}</p></div>`);
          marker.on('click', () => setActiveAlert(hazard));
        });

        leafletMapRef.current = map;
      };

      loadLeaflet();
    }

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [currentPage]);

  const showNotificationMessage = (type, message) => {
    setNotification({ type, message });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const submitReport = (e) => {
    e.preventDefault();
    if (!formData.hazardType || !formData.description) {
      showNotificationMessage('error', 'Please fill in all required fields');
      return;
    }
    showNotificationMessage('success', 'Report submitted successfully!');
    setFormData({ hazardType: '', location: 'Chennai, Tamil Nadu', description: '' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'bg-green-500 text-white';
      case 'pending': return 'bg-yellow-500 text-white';
      case 'investigating': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'border-l-red-500 bg-red-50';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'Twitter': return <Twitter className="w-4 h-4" />;
      case 'Facebook': return <Facebook className="w-4 h-4" />;
      case 'Instagram': return <Instagram className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Navigation */}
      <nav className="sticky top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50 px-4">
        <div className="max-w-full mx-auto">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Waves className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Ocean Shield</span>
            </div>
            <div className="flex space-x-2">
              {['dashboard', 'reports', 'analytics', 'alerts', 'about'].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 capitalize text-sm transform hover:scale-103 hover:shadow-lg ${
                    currentPage === page 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700'
                  }`}
                >
                  {page === 'about' ? 'About Us' : page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-4 px-4 pb-8">
        
        {/* Dashboard Page */}
        {currentPage === 'dashboard' && (
          <div className="space-y-4 px-10">
            <h1 className="text-3xl font-bold text-white text-center mb-4">Ocean Hazard Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {[
                { number: '247', label: 'Active Reports' },
                { number: '15', label: 'Critical Alerts' },
                { number: '1.2k', label: 'Social Mentions' },
                { number: '98%', label: 'System Uptime' }
              ].map((stat, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg transform hover:scale-103 transition-all duration-300">
                  <div className="text-2xl font-bold text-blue-600">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Map */}
              <div className="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold">Live Hazard Map</h2>
                </div>
                <div ref={mapRef} className="h-80 rounded-xl overflow-hidden border" />
              </div>

              {/* Quick Report & Social Feed */}
              <div className="space-y-4">
                {/* Quick Report */}
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <h2 className="text-lg font-semibold mb-3">Quick Report</h2>
                  <form onSubmit={submitReport} className="space-y-3">
                    <select
                      value={formData.hazardType}
                      onChange={(e) => setFormData({...formData, hazardType: e.target.value})}
                      className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                    >
                      <option value="">Select Hazard Type</option>
                      <option value="tsunami">Tsunami</option>
                      <option value="high-waves">High Waves</option>
                      <option value="storm-surge">Storm Surge</option>
                    </select>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Describe what you observed..."
                      rows="3"
                      className="w-full p-2 border rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                    />
                    <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 text-sm transform hover:scale-103 transition-all duration-300 shadow-lg hover:shadow-xl">
                      Submit Report
                    </button>
                  </form>
                </div>

                {/* Social Feed */}
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <h2 className="text-lg font-semibold mb-3">Social Media Feed</h2>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {socialPosts.slice(0, 3).map((post, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg border-l-4 border-blue-500 hover:bg-gray-100 transition-colors duration-300">
                        <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                          {getPlatformIcon(post.platform)}
                          <span>{post.platform} • {post.time}</span>
                        </div>
                        <p className="text-gray-800 text-sm">{post.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports Page */}
        {currentPage === 'reports' && (
          <div className="space-y-4 px-10">
            <h1 className="text-3xl font-bold text-white text-center mb-4">Hazard Reports</h1>
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-lg font-semibold mb-3">All Reports</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs">Time</th>
                      <th className="px-4 py-2 text-left text-xs">Location</th>
                      <th className="px-4 py-2 text-left text-xs">Type</th>
                      <th className="px-4 py-2 text-left text-xs">Reporter</th>
                      <th className="px-4 py-2 text-left text-xs">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reports.map((report) => (
                      <tr key={report.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                        <td className="px-4 py-3 text-xs">{report.time}</td>
                        <td className="px-4 py-3 text-xs">{report.location}</td>
                        <td className="px-4 py-3 text-xs">{report.type}</td>
                        <td className="px-4 py-3 text-xs">{report.reporter}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs transform hover:scale-103 transition-all duration-300 ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Page */}
        {currentPage === 'analytics' && (
          <div className="space-y-4 px-10">
            <h1 className="text-3xl font-bold text-white text-center mb-4">Social Media Analytics</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold">Trending Keywords</h2>
                </div>
                <div className="space-y-3">
                  {trendingKeywords.map((item, index) => (
                    <div key={index} className="border-b pb-3 hover:bg-gray-50 p-2 rounded transition-colors duration-300">
                      <div className="font-semibold text-sm">{item.keyword}</div>
                      <div className="text-xs text-gray-600">{item.mentions} mentions</div>
                      <div className="text-xs text-gray-500">{item.trend}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold">Sentiment Analysis</h2>
                </div>
                <div className="h-40 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-white hover:from-blue-500 hover:to-purple-600 transition-all duration-300">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">Real-time sentiment tracking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alerts Page */}
        {currentPage === 'alerts' && (
          <div className="space-y-4 px-10">
            <h1 className="text-3xl font-bold text-white text-center mb-4">Emergency Alerts</h1>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className={`bg-white rounded-xl p-4 border-l-8 shadow-xl hover:shadow-2xl transform hover:scale-103 transition-all duration-300 ${getAlertColor(alert.type)}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="w-5 h-5" />
                        <span className="font-semibold capitalize">{alert.type} Alert</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{alert.title}</h3>
                      <div className="text-xs text-gray-600">
                        <p>Issued: {alert.time} | Areas: {alert.areas}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About Us Page */}
        {currentPage === 'about' && (
          <div className="space-y-4 px-10">
            <h1 className="text-3xl font-bold text-white text-center mb-4">About Ocean Shield</h1>
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold">Our Mission</h2>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Ocean Shield is a cutting-edge coastal hazard monitoring platform designed to protect communities along India's vast coastline. 
                We combine real-time data analysis, social media monitoring, and citizen reporting to provide early warning systems for tsunamis, 
                storm surges, and other ocean-related hazards.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors duration-300">
                  <h3 className="font-semibold text-blue-800 mb-2">Real-time Monitoring</h3>
                  <p className="text-sm text-blue-700">24/7 surveillance of coastal conditions using advanced sensors and satellite data.</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition-colors duration-300">
                  <h3 className="font-semibold text-purple-800 mb-2">Community Engagement</h3>
                  <p className="text-sm text-purple-700">Empowering citizens to report hazards and contribute to coastal safety.</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg hover:bg-green-100 transition-colors duration-300">
                  <h3 className="font-semibold text-green-800 mb-2">Early Warning System</h3>
                  <p className="text-sm text-green-700">Rapid alert distribution to save lives and minimize property damage.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => showNotificationMessage('success', 'Emergency report activated')}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-red-300 to-pink-300 text-black p-4 rounded-full shadow-2xl hover:text-white hover:from-red-600 hover:to-pink-700 transform hover:scale-103 transition-all duration-300 hover:shadow-2xl"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Notifications */}
      {showNotification && (
        <div className={`fixed top-20 right-4 bg-white rounded-lg shadow-2xl p-4 z-50 border-l-4 transform hover:scale-103 transition-all duration-300 ${
          notification.type === 'success' ? 'border-green-500' : 'border-red-500'
        }`}>
          <div className="flex items-center justify-between">
            <p className="text-gray-800 text-sm">{notification.message}</p>
            <button onClick={() => setShowNotification(false)} className="ml-2 text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Alert Modal */}
      {activeAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setActiveAlert(null)}>
          <div className="bg-white rounded-2xl p-6 m-4 max-w-md w-full transform hover:scale-103 transition-all duration-300 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-2">{activeAlert.name}</h3>
            <p className="text-gray-700 mb-4">{activeAlert.severity}</p>
            <button 
              onClick={() => setActiveAlert(null)} 
              className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 py-2 rounded-lg transform hover:scale-103 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OceanDashboard;