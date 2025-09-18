Ocean Shield
Ocean Shield is a cutting-edge coastal hazard monitoring platform designed to safeguard communities along India's coastline. By integrating real-time data analysis, social media monitoring, and citizen reporting, it provides early warning systems for tsunamis, storm surges, and other ocean-related hazards.
Features

Real-time Hazard Map: Visualizes live coastal hazard locations with severity indicators using Leaflet.js.
Quick Report System: Enables users to submit hazard reports with details such as type and description.
Social Media Feed: Aggregates and displays relevant posts from platforms like Twitter, Facebook, and Instagram.
Analytics Dashboard: Tracks trending keywords and provides sentiment analysis for social media mentions.
Emergency Alerts: Displays critical, warning, and info-level alerts for coastal regions.
Responsive Design: Optimized for seamless use on both desktop and mobile devices with a modern, interactive UI.

Tech Stack

Frontend: 
React
JSX
Tailwind CSS


Map Integration: 
Leaflet.js for interactive hazard mapping


Icons: 
Lucide React for UI icons


External Libraries:
Leaflet.js (CDN: https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js)
Lucide React (CDN: https://cdn.jsdelivr.net/npm/lucide-react@0.263.0/dist/umd/lucide-react.min.js)


Dependencies: 
Managed via CDN (React, ReactDOM, Babel)



Installation

Clone the Repository:
git clone https://github.com/your-username/ocean-shield.git
cd ocean-shield


Set Up a Local Server:Since the project uses CDN-hosted dependencies, serve the project using a simple HTTP server. For example, with Python:
python -m http.server 8000


Open in Browser:Navigate to http://localhost:8000 to view the application.


Usage

Dashboard: 
View live hazard locations on an interactive map.
Submit quick reports for observed hazards.


Reports: 
Browse submitted hazard reports, including details like time, location, and status.


Analytics: 
Monitor trending keywords and sentiment analysis for social media posts.


Alerts: 
Check active emergency alerts with severity levels and affected areas.


About: 
Learn about the Ocean Shield mission and its key features.



Project Structure
ocean-shield/
├── index.html              # Main HTML file with CDN imports
├── src/
│   └── OceanDashboard.jsx  # Main React component
├── README.md               # Project documentation
└── package.json            # Basic project metadata (optional)

Running the Project

Ensure you have a modern browser (Chrome, Firefox, or Edge recommended).
Serve the index.html file using a local server as described in the Installation section.
Use the navigation bar to switch between pages (Dashboard, Reports, Analytics, Alerts, About).

Dependencies
The project relies on CDN-hosted libraries to simplify setup:

React: https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js
ReactDOM: https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js
Babel: https://cdn.jsdelivr.net/npm/@babel/standalone@7.22.5/babel.min.js
Leaflet: https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js
Lucide React: https://cdn.jsdelivr.net/npm/lucide-react@0.263.0/dist/umd/lucide-react.min.js

Contributing
We welcome contributions to enhance Ocean Shield! To contribute, follow these steps:

Fork the repository.
Create a new branch:git checkout -b feature/your-feature


Make your changes and commit:git commit -m "Add your feature"


Push to the branch:git push origin feature/your-feature


Open a Pull Request on GitHub.

License
This project is licensed under the MIT License. See the LICENSE file for details.
Acknowledgments

Leaflet.js: For providing an open-source mapping solution.
Lucide React: For the intuitive icon library.
Tailwind CSS: For the flexible and responsive styling framework.
