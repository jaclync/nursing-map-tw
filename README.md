# nursing-map-tw
Nursing locations in Taiwan displayed on an interactive map using Apple MapKit JS.

## Overview
This project provides a free map view to display nursing locations across Taiwan. The map is built using Apple MapKit JS, which provides a free tier for web mapping services.

## Features
- Interactive map view powered by Apple MapKit JS
- Display nursing locations with markers
- Click on markers to view detailed information
- Location details include:
  - Name and full address
  - Contact information (phone)
  - Opening hours
  - Additional notes and basis information
  - Geographic coordinates
  - Apple Maps Place ID

## Setup Instructions

### 1. Get Apple MapKit JS Token (Free)
To use Apple MapKit JS, you need to create a free developer account and generate a MapKit JS token:

1. Sign up for a free Apple Developer account at [developer.apple.com](https://developer.apple.com/)
2. Create a Maps ID:
   - Go to [Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources/)
   - Click on "Identifiers" and then the "+" button
   - Select "Maps IDs" and click "Continue"
   - Enter a description and identifier (e.g., `com.yourname.nursing-map-tw`)
   - Click "Continue" and then "Register"

3. Create a Private Key:
   - Go to "Keys" section and click the "+" button
   - Enter a key name (e.g., "MapKit JS Key")
   - Check "MapKit JS" option
   - Click "Continue" and then "Register"
   - Download the private key file (.p8) - **save it securely**

4. Generate JWT Token:
   - You need to generate a JWT token using your private key
   - Use the script provided in `generate-token.js` or follow Apple's documentation
   - See: [Creating a Maps Identifier and a Private Key](https://developer.apple.com/documentation/mapkitjs/creating_a_maps_identifier_and_a_private_key)

5. Configure the token:
   - Open `map.js`
   - Replace `YOUR_MAPKIT_JS_TOKEN_HERE` with your generated JWT token

### 2. Add Location Data
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
  "longitude": 121.5110636,
  "appleMapsPlaceId": "Apple Maps Place ID"
}
```

### 3. Run the Application
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
├── map.js          # MapKit JS initialization and logic
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
- `appleMapsPlaceId`: Apple Maps Place ID (optional)

## Browser Support
- Modern browsers with ES6+ support
- Safari (recommended for best Apple Maps integration)
- Chrome, Firefox, Edge

## License
This project is for displaying nursing locations in Taiwan.

## Resources
- [Apple MapKit JS Documentation](https://developer.apple.com/documentation/mapkitjs)
- [MapKit JS API Reference](https://developer.apple.com/documentation/mapkitjs/mapkit)
- [Creating MapKit JS Tokens](https://developer.apple.com/documentation/mapkitjs/creating_and_using_tokens_with_mapkit_js)
