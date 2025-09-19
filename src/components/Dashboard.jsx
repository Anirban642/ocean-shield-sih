import React, { useState, useEffect, useRef } from 'react';
import { Waves, MapPin, AlertTriangle, Bell, Plus, BarChart3, Twitter, Facebook, Instagram, Activity, TrendingUp, X, Users, Menu } from 'lucide-react';

const OceanDashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [activeAlert, setActiveAlert] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ hazardType: '', location: 'Chennai, Tamil Nadu', description: '' });
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);

  const hazards = [
  { id: 1, name: "Marina Beach", type: "critical", lat: 13.0478, lng: 80.2619, severity: "Tsunami Warning" },
  { id: 2, name: "Fort Kochi", type: "warning", lat: 9.9666, lng: 76.2427, severity: "High Waves" },
  { id: 3, name: "Paradip Port", type: "info", lat: 20.3156, lng: 86.6239, severity: "Storm Watch" },
  { id: 4, name: "Visakhapatnam", type: "critical", lat: 17.6868, lng: 83.2185, severity: "Coastal Flooding" },
  { id: 5, name: "Goa Beach", type: "warning", lat: 15.2993, lng: 74.1240, severity: "Tidal Surge" }
];

  const alerts = [
  { id: 1, type: "critical", title: "Tsunami Warning - East Coast", time: "10:30 AM", areas: "Tamil Nadu, Andhra Pradesh" },
  { id: 2, type: "warning", title: "High Wave Alert - West Coast", time: "09:15 AM", areas: "Kerala, Karnataka" },
  { id: 3, type: "info", title: "Storm Watch - Bay of Bengal", time: "08:00 AM", areas: "Odisha, West Bengal" },
  { id: 4, type: "advisory", title: "Fishing Ban - Rough Seas", time: "07:45 AM", areas: "Goa, Maharashtra" },
  { id: 5, type: "update", title: "Rainfall Advisory - Coastal Region", time: "07:00 AM", areas: "Gujarat, Daman & Diu" }
];

  const reports = [
  { id: 1, time: '10:45 AM', location: 'Marina Beach, Chennai', type: 'High Waves', reporter: 'Citizen User', status: 'investigating' },
  { id: 2, time: '10:30 AM', location: 'Fort Kochi, Kerala', type: 'Coastal Flooding', reporter: 'Local Authority', status: 'verified' },
  { id: 3, time: '09:15 AM', location: 'Paradip Port', type: 'Storm Surge', reporter: 'Weather Station', status: 'verified' },
  { id: 4, time: '08:50 AM', location: 'Goa Beach, Goa', type: 'Tidal Waves', reporter: 'Tourist Report', status: 'investigating' },
  { id: 5, time: '08:20 AM', location: 'Visakhapatnam Coast', type: 'Unusual Currents', reporter: 'Fishermen', status: 'unverified' }
];

  const socialPosts = [
    { platform: 'Twitter', time: '2 mins ago', location: 'Chennai', content: 'Unusual high waves at Marina Beach. Water levels rising rapidly. #ChennaiAlert' },
    { platform: 'Facebook', time: '5 mins ago', location: 'Kochi', content: 'Strange tidal patterns near Fort Kochi. Local fishermen advised caution.' },
    { platform: 'Instagram', time: '12 mins ago', location: 'Visakhapatnam', content: 'Massive waves hitting the coast! Stay safe everyone. #Tsunami' },
    { platform: 'Facebook', time: '17 mins ago', location: 'Goa', content: 'Some large waves are being seen in the Goa side. #Tsunami #StaySafe' },
    { platform: 'Twitter', time: '20 mins ago', location: 'Puri', content: 'Strong currents and sudden wave surges near Puri Beach. Authorities monitoring closely. #OdishaAlert' }
  ];

  const trendingKeywords = [
  { keyword: '#Tsunami', mentions: '2.3k', trend: 'Spike in last 2 hours' },
  { keyword: '#ChennaiAlert', mentions: '1.8k', trend: 'Growing trend' },
  { keyword: '#HighWaves', mentions: '1.2k', trend: 'Steady mentions' },
  { keyword: '#CoastalFlooding', mentions: '950', trend: 'Rising concern' },
  { keyword: '#StaySafe', mentions: '1.5k', trend: 'Community awareness increasing' }
];

  const sentimentData = [
  { category: 'Critical Alerts', positive: 15, negative: 85, neutral: 0, color: 'bg-red-500' },
  { category: 'General Reports', positive: 45, negative: 25, neutral: 30, color: 'bg-blue-500' },
  { category: 'Weather Updates', positive: 60, negative: 15, neutral: 25, color: 'bg-green-500' },
  { category: 'Safety Tips', positive: 75, negative: 5, neutral: 20, color: 'bg-purple-500' },
  { category: 'Community Support', positive: 80, negative: 10, neutral: 10, color: 'bg-yellow-500' }
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

  const navPages = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'reports', label: 'Reports' },
    { key: 'analytics', label: 'Analytics' },
    { key: 'alerts', label: 'Alerts' },
    { key: 'about', label: 'About Us' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-2">
              {navPages.map((page) => (
                <button
                  key={page.key}
                  onClick={() => {
                    setCurrentPage(page.key);
                    closeMenu();
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 capitalize text-sm transform hover:scale-103 hover:shadow-lg ${
                    currentPage === page.key 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700'
                  }`}
                >
                  {page.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 right-4 w-48 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-200">
              {navPages.map((page) => (
                <button
                  key={page.key}
                  onClick={() => {
                    setCurrentPage(page.key);
                    closeMenu();
                  }}
                  className={`w-full text-left px-6 py-3 text-sm font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 ${
                    currentPage === page.key 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                      : 'text-gray-700 hover:text-blue-700'
                  }`}
                >
                  {page.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-4 px-4 pb-8">
        
        {/* Dashboard Page */}
{currentPage === 'dashboard' && (
  <div className="space-y-5 px-2 md:px-6 lg:px-16 py-4">
    <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-5">
      Ocean Hazard Dashboard
    </h1>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-5">
      {[
        { number: '247', label: 'Active Reports' },
        { number: '15', label: 'Critical Alerts' },
        { number: '1.2k', label: 'Social Mentions' },
        { number: '98%', label: 'System Uptime' }
      ].map((stat, index) => (
        <div
          key={index}
          className="bg-white/90 backdrop-blur-sm rounded-xl p-3 md:p-5 text-center shadow-lg transform hover:scale-102 transition-all duration-300"
        >
          <div className="text-lg md:text-xl font-bold text-blue-600">{stat.number}</div>
          <div className="text-xs md:text-sm lg:text-base text-gray-700 font-medium mt-1">
            {stat.label}
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Map */}
      <div className="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-xl p-3 md:p-5 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <div className="flex items-center space-x-3 mb-3">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Live Hazard Map</h2>
        </div>
        <div
          ref={mapRef}
          className="h-48 md:h-72 lg:h-80 rounded-lg overflow-hidden border"
        />
      </div>

      {/* Social Feed only */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 md:p-5 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-lg font-semibold mb-3">Social Media Feed</h2>
        <div className="space-y-3">
          {socialPosts.map((post, index) => (
            <div
              key={index}
              className="bg-gray-50 p-2 md:p-3 rounded-lg border-l-4 border-blue-500 hover:bg-gray-100 transition-colors duration-300"
            >
              <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                {getPlatformIcon(post.platform)}
                <span className="font-medium">
                  {post.platform} • {post.time}
                </span>
              </div>
              <p className="text-gray-800 text-xs md:text-sm">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}

        {/* Reports Page */}
          {currentPage === 'reports' && (
            <div className="space-y-6 px-2 md:px-[70px]">
              <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">Hazard Reports</h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {/* Submit Report Section */}
                <div className="lg:col-span-1">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 md:p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
                    <h2 className="text-lg md:text-xl font-semibold mb-4">Submit New Report</h2>
                    <form onSubmit={submitReport} className="space-y-3 md:space-y-4 flex-1">
                      <select
                        value={formData.hazardType}
                        onChange={(e) => setFormData({ ...formData, hazardType: e.target.value })}
                        className="w-full p-2 md:p-3 border rounded-lg text-sm md:text-base focus:ring-2 focus:ring-blue-500 transition-all"
                        required
                      >
                        <option value="">Select Hazard Type</option>
                        <option value="tsunami">Tsunami</option>
                        <option value="high-waves">High Waves</option>
                        <option value="storm-surge">Storm Surge</option>
                        <option value="coastal-flooding">Coastal Flooding</option>
                        <option value="rip-current">Rip Current</option>
                        <option value="marine-pollution">Marine Pollution</option>
                      </select>

                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Enter location"
                        className="w-full p-2 md:p-3 border rounded-lg text-sm md:text-base focus:ring-2 focus:ring-blue-500 transition-all"
                        required
                      />

                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe what you observed..."
                        rows="4"
                        className="w-full p-2 md:p-3 border rounded-lg text-sm md:text-base resize-none focus:ring-2 focus:ring-blue-500 transition-all"
                        required
                      />

                      {/* Buttons row */}
                      <div className="grid grid-cols-3 gap-2 md:flex md:space-x-2">
                        <button
                          type="button"
                          className="col-span-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 md:py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 text-sm md:text-base transform hover:scale-103 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          Camera
                        </button>
                        <button
                          type="button"
                          className="col-span-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 md:py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 text-sm md:text-base transform hover:scale-103 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          Location
                        </button>
                        <button
                          type="submit"
                          className="col-span-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 md:py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 text-sm md:text-base transform hover:scale-103 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* All Reports Table */}
                <div className="lg:col-span-1">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 md:p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
                    <h2 className="text-lg md:text-xl font-semibold mb-4">All Reports</h2>
                    <div className="overflow-x-auto flex-1">
                      <table className="w-full min-w-[400px] md:min-w-full">
                        <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                          <tr>
                            <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm lg:text-base">Time</th>
                            <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm lg:text-base">Location</th>
                            <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm lg:text-base">Type</th>
                            <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm lg:text-base">Reporter</th>
                            <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm lg:text-base">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {reports.map((report) => (
                            <tr
                              key={report.id}
                              className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                            >
                              <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm lg:text-base">{report.time}</td>
                              <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm lg:text-base">{report.location}</td>
                              <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm lg:text-base">{report.type}</td>
                              <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm lg:text-base">{report.reporter}</td>
                              <td className="px-2 md:px-4 py-2 md:py-3">
                                <span
                                  className={`px-1 md:px-2 py-1 rounded-full text-xs transform hover:scale-103 transition-all duration-300 ${getStatusColor(
                                    report.status
                                  )}`}
                                >
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
              </div>
            </div>
          )}

        {/* Analytics Page */}
        {currentPage === 'analytics' && (
          <div className="space-y-4 px-2 md:px-[70px]">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">Social Media Analytics</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Trending Keywords */}
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <h2 className="text-lg md:text-xl font-semibold">Trending Keywords</h2>
                </div>
                <div className="space-y-3 md:space-y-4">
                  {trendingKeywords.map((item, index) => (
                    <div 
                      key={index} 
                      className="border-b pb-3 md:pb-4 hover:bg-gray-50 p-2 md:p-3 rounded transition-colors duration-300"
                    >
                      <div className="font-semibold text-sm md:text-base">{item.keyword}</div>
                      <div className="text-xs md:text-sm text-gray-600">{item.mentions} mentions</div>
                      <div className="text-xs md:text-sm text-gray-500">{item.trend}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sentiment Analysis */}
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  <h2 className="text-lg md:text-xl font-semibold">Sentiment Analysis</h2>
                </div>
                <div className="space-y-4 md:space-y-5">
                  {sentimentData.map((data, index) => (
                    <div key={index} className="space-y-2 md:space-y-3">
                      <div className="flex justify-between text-sm md:text-base">
                        <span className="font-medium">{data.category}</span>
                        <span className="text-gray-600">Total Posts</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
                        <div className="flex h-2 md:h-3 rounded-full overflow-hidden">
                          <div className="bg-red-500" style={{width: `${data.negative}%`}}></div>
                          <div className="bg-gray-400" style={{width: `${data.neutral}%`}}></div>
                          <div className="bg-green-500" style={{width: `${data.positive}%`}}></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs md:text-sm text-gray-600 flex-wrap gap-1">
                        <span>Negative: {data.negative}%</span>
                        <span>Neutral: {data.neutral}%</span>
                        <span>Positive: {data.positive}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Alerts Page */}
        {currentPage === 'alerts' && (
          <div className="space-y-3 md:space-y-4 px-2 md:px-[70px]">
            <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">Emergency Alerts</h1>
            <div className="space-y-2 md:space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className={`bg-white rounded-xl p-2 md:p-4 border-l-8 shadow-xl hover:shadow-2xl transform hover:scale-103 transition-all duration-300 ${getAlertColor(alert.type)}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="w-5 h-5" />
                        <span className="font-semibold capitalize">{alert.type} Alert</span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold mb-2">{alert.title}</h3>
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
          <div className="space-y-4 md:space-y-6 px-2 md:px-[70px]">
            <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">About Ocean Shield</h1>
            
            {/* Mission Section */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 md:p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl md:text-2xl font-semibold">Our Mission</h2>
              </div>
              <p className="text-gray-700 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                Ocean Shield is a cutting-edge coastal hazard monitoring platform designed to protect communities along India's vast coastline. 
                We combine real-time data analysis, social media monitoring, and citizen reporting to provide early warning systems for tsunamis, 
                storm surges, and other ocean-related hazards.
              </p>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                Founded in 2023, our platform serves over 2 million coastal residents across 13 Indian states and union territories. 
                We process more than 50,000 data points daily from various sources including satellite imagery, oceanographic sensors, 
                weather stations, and social media platforms to ensure comprehensive coastal safety coverage.
              </p>
            </div>

            {/* Key Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-blue-50 p-3 md:p-6 rounded-xl hover:bg-blue-100 transition-colors duration-300 shadow-lg">
                <h3 className="font-semibold text-blue-800 mb-2 md:mb-3 text-base md:text-lg">Real-time Monitoring</h3>
                <p className="text-xs md:text-sm text-blue-700 leading-relaxed">
                  24/7 surveillance of coastal conditions using advanced sensors, satellite data, and AI-powered analysis. 
                  Our system monitors wave heights, tidal patterns, and atmospheric conditions across 7,500 km of Indian coastline.
                </p>
              </div>
              <div className="bg-purple-50 p-3 md:p-6 rounded-xl hover:bg-purple-100 transition-colors duration-300 shadow-lg">
                <h3 className="font-semibold text-purple-800 mb-2 md:mb-3 text-base md:text-lg">Community Engagement</h3>
                <p className="text-xs md:text-sm text-purple-700 leading-relaxed">
                  Empowering citizens to report hazards and contribute to coastal safety through our mobile app and web platform. 
                  Over 45,000 registered community reporters help us validate and cross-reference hazard information.
                </p>
              </div>
              <div className="bg-green-50 p-3 md:p-6 rounded-xl hover:bg-green-100 transition-colors duration-300 shadow-lg">
                <h3 className="font-semibold text-green-800 mb-2 md:mb-3 text-base md:text-lg">Early Warning System</h3>
                <p className="text-xs md:text-sm text-green-700 leading-relaxed">
                  Rapid alert distribution through SMS, mobile notifications, and local emergency services to save lives and minimize property damage. 
                  Our alerts reach affected areas within 3-5 minutes of hazard detection.
                </p>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-3 md:p-6 text-white shadow-xl">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-center">Platform Impact</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-2">2M+</div>
                  <div className="text-xs md:text-sm opacity-90">Protected Citizens</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-2">13</div>
                  <div className="text-xs md:text-sm opacity-90">States Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-2">45K+</div>
                  <div className="text-xs md:text-sm opacity-90">Community Reporters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-2">99.7%</div>
                  <div className="text-xs md:text-sm opacity-90">Alert Accuracy</div>
                </div>
              </div>
            </div>

            {/* Technology Section */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 md:p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">Advanced Technology Stack</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 md:mb-3">Data Sources</h3>
                  <ul className="text-xs md:text-sm text-gray-700 space-y-1">
                    <li>• ISRO satellite imagery and ocean color data</li>
                    <li>• INCOIS buoy network and tide gauge stations</li>
                    <li>• IMD weather radar and atmospheric sensors</li>
                    <li>• Social media APIs from major platforms</li>
                    <li>• Crowd-sourced citizen reports and images</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 md:mb-3">AI & Analytics</h3>
                  <ul className="text-xs md:text-sm text-gray-700 space-y-1">
                    <li>• Machine learning for pattern recognition</li>
                    <li>• Natural language processing for social media</li>
                    <li>• Predictive modeling for hazard forecasting</li>
                    <li>• Real-time image analysis and verification</li>
                    <li>• Automated alert generation and distribution</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 md:p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">Our Commitment</h2>
              <p className="text-gray-700 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
                Ocean Shield is developed by a dedicated team of oceanographers, data scientists, software engineers, and emergency management experts. 
                We work closely with the National Disaster Management Authority (NDMA), Indian National Centre for Ocean Information Services (INCOIS), 
                and state disaster management departments to ensure our platform meets the highest standards for public safety.
              </p>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                Our vision is to create a safer coastal India where communities are prepared, informed, and protected from marine hazards. 
                Through continuous innovation and community partnership, we strive to minimize the impact of natural disasters on coastal populations.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => showNotificationMessage('success', 'Emergency report activated')}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-red-300 to-pink-300 text-black p-3 md:p-4 rounded-full shadow-2xl hover:text-white hover:from-red-600 hover:to-pink-700 transform hover:scale-103 transition-all duration-300 hover:shadow-2xl z-40"
      >
        <Plus className="w-5 md:w-6 h-5 md:h-6" />
      </button>

      {/* Mobile Backdrop for Menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden" 
          onClick={closeMenu}
        />
      )}

      {/* Notifications */}
      {showNotification && (
        <div className={`fixed top-20 right-4 bg-white rounded-lg shadow-2xl p-3 md:p-4 z-50 border-l-4 transform hover:scale-103 transition-all duration-300 ${
          notification.type === 'success' ? 'border-green-500' : 'border-red-500'
        }`}>
          <div className="flex items-center justify-between">
            <p className="text-gray-800 text-xs md:text-sm">{notification.message}</p>
            <button onClick={() => setShowNotification(false)} className="ml-2 text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Alert Modal */}
      {activeAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setActiveAlert(null)}>
          <div className="bg-white rounded-2xl p-3 md:p-6 m-4 max-w-md w-full transform hover:scale-103 transition-all duration-300 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-base md:text-lg font-bold mb-2">{activeAlert.name}</h3>
            <p className="text-gray-700 mb-4 text-sm md:text-base">{activeAlert.severity}</p>
            <button 
              onClick={() => setActiveAlert(null)} 
              className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 py-2 rounded-lg transform hover:scale-103 transition-all duration-300 text-sm md:text-base"
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