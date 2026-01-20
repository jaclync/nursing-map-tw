# nursing-map-tw
Nursing locations in Taiwan displayed on an interactive map using OpenStreetMap.

## Overview
This project provides a free map view to display nursing locations across Taiwan. The map is built using Leaflet with OpenStreetMap tiles, which is completely free and open-source with no API keys required.

## Features
- Interactive map view powered by OpenStreetMap
- Display nursing locations with markers
- Click on markers to view detailed information
- Location details include:
  - Name and full address
  - Contact information (phone)
  - Opening hours
  - Additional notes and basis information
  - Geographic coordinates

## Setup Instructions

### 1. Add Location Data
Edit the `data.json` file to add or modify nursing locations. Each location should follow this structure:

```json
{
  "name": "Location Name",
  "city": "City",
  "district": "District",
  "village": "Village",
  "road": "Road",
  "section": "",
  "lane": "",
  "number": "Number",
  "floor": "Floor",
  "phone": "Phone Number",
  "openingHours": "Opening Hours",
  "notes": "Notes",
  "basis": "Legal Basis",
  "address": "Full Address",
  "latitude": 25.031469,
  "longitude": 121.5110636
}
```

### 2. Run the Application
Since this is a static website, you can:

**Option 1: Open directly in browser**
```bash
open index.html
```

**Option 2: Use a local web server (recommended)**
```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then open your browser to `http://localhost:8000`

## File Structure
```
nursing-map-tw/
├── index.html      # Main HTML file
├── map.js          # Leaflet initialization and logic
├── data.json       # Nursing location data
└── README.md       # This file
```

## Data Format
The application expects location data in JSON format with the following fields:
- `name`: Location name
- `city`: City name
- `district`: District/area name
- `village`: Village name (optional)
- `road`: Street/road name
- `section`: Section (optional)
- `lane`: Lane (optional)
- `number`: Building number
- `floor`: Floor (optional)
- `phone`: Contact phone number (optional)
- `openingHours`: Operating hours (optional)
- `notes`: Additional notes (optional)
- `basis`: Legal or establishment basis (optional)
- `address`: Complete address
- `latitude`: Geographic latitude (required)
- `longitude`: Geographic longitude (required)

## Browser Support
- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge

## License
This project is for displaying nursing locations in Taiwan.

Map data © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors

## Resources
- [Leaflet Documentation](https://leafletjs.com/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [Leaflet Tutorials](https://leafletjs.com/examples.html)
