export const mockReports = [
  { id: 1, lat: 13.08, lng: 80.27, type: 'High Waves', title: 'Strong waves at Marina Beach', desc: 'Unusual surge observed', media: null, timestamp: '2025-09-18T10:00:00Z', verified: true },
  { id: 2, lat: 12.97, lng: 77.59, type: 'Storm Surge', title: 'Flooding near Chennai coast', desc: 'Water rising fast', media: 'https://via.placeholder.com/300x200?text=Wave+Photo', timestamp: '2025-09-18T09:30:00Z', verified: false },
  // Add 8 more similar entries for density (e.g., tsunamis in Kerala, swells in Mumbai)...
  // (Omit for brevity; copy-paste pattern with varied lat/lng from Indian coast: e.g., Mumbai 19.07/72.88, Kerala 10.85/76.27)
];

export const mockSocialPosts = [
  { id: 1, platform: 'X', text: 'High waves hitting Chennai! #OceanHazard', sentiment: 'urgent', timestamp: '2025-09-18T10:15:00Z', location: { lat: 13.08, lng: 80.27 } },
  { id: 2, platform: 'Facebook', text: 'Tsunami warning? Stay safe Kerala.', sentiment: 'aware', timestamp: '2025-09-18T09:45:00Z', location: { lat: 10.85, lng: 76.27 } },
  // Add 3 more...
];