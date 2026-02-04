# How It Works - Nursing Map Taiwan

## 🔄 Application Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  1. User opens index.html in browser                           │
│     ↓                                                           │
│  2. Browser loads Leaflet JS library from CDN                  │
│     ↓                                                           │
│  3. map.js initializes Leaflet map                             │
│     ↓                                                           │
│  4. Leaflet creates map centered on Taiwan (25.03°N, 121.51°E) │
│     ↓                                                           │
│  5. Loads OpenStreetMap tiles                                  │
│     ↓                                                           │
│  6. Fetches nursing locations from data.json                   │
│     ↓                                                           │
│  7. Creates marker for each location with 🏥 emoji             │
│     ↓                                                           │
│  8. Map renders with all markers visible                       │
│     ↓                                                           │
│  9. User clicks on a marker                                    │
│     ↓                                                           │
│  10. Info panel appears with location details                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🏗️ Architecture

### Client-Side Only (No Backend Required)

```
┌──────────────────────────────────────────────────────────┐
│                      User's Browser                      │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │          index.html (UI Layer)                 │    │
│  │  • Map container                               │    │
│  │  • Header & footer                             │    │
│  │  • Loading indicators                          │    │
│  │  • CSS styling                                 │    │
│  └────────────────────────────────────────────────┘    │
│                         ↓                               │
│  ┌────────────────────────────────────────────────┐    │
│  │       map.js (Logic Layer)                     │    │
│  │  • Leaflet initialization                      │    │
│  │  • Marker creation                             │    │
│  │  • Event handling                              │    │
│  │  • Data loading                                │    │
│  └────────────────────────────────────────────────┘    │
│                         ↓                               │
│  ┌────────────────────────────────────────────────┐    │
│  │      data.json (Data Layer)                    │    │
│  │  • Location information                        │    │
│  │  • Coordinates                                 │    │
│  │  • Metadata                                    │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
└──────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│               OpenStreetMap Tile Servers                 │
│  • Map tile rendering                                    │
│  • Tile loading                                          │
│  • Open data from OSM contributors                       │
└──────────────────────────────────────────────────────────┘
```

## 📊 Data Flow

```
data.json (Static File)
    ↓
fetch() API Request
    ↓
JSON.parse()
    ↓
Array of Location Objects
    ↓
forEach(location => ...)
    ↓
Create L.marker([lat, lng])
    ↓
Create custom hospital icon
    ↓
marker.addTo(map)
    ↓
Marker visible on map
    ↓
User clicks marker
    ↓
'click' event fires
    ↓
showLocationDetails()
    ↓
Create info panel HTML
    ↓
Append to document.body
    ↓
Info panel visible to user
```

## 🔐 No Authentication Required

```
┌─────────────────────────────────────────────────────────┐
│  Simple Setup (One-time, < 5 minutes)                   │
│                                                         │
│  1. Clone or download the repository                    │
│  2. Add location data to data.json                      │
│  3. Serve with any web server                           │
│  4. Open in browser - no API keys needed!               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 🎯 Marker Interaction

```
Marker on Map
    ↓
User hovers → Cursor changes to pointer
    ↓
User clicks → 'select' event fires
    ↓
Event listener: annotation.addEventListener('select', ...)
    ↓
Extract location data from event
    ↓
Call showLocationDetails(location)
    ↓
Remove any existing info panel
    ↓
Create new div.info-panel
    ↓
Populate with location data:
    • Name (title)
    • Address (full formatted)
    • City, District, Village
    • Phone, Opening Hours
    • Notes, Basis
    • Coordinates
    ↓
Style with CSS
    ↓
Append to document.body
    ↓
Panel slides in from right side
    ↓
User sees detailed information
```

## 📱 Responsive Design

```
┌───────────────────────────────────────────────────────┐
│  Desktop (> 768px)                                    │
│  ┌─────────────────────────────────────────────────┐ │
│  │  Header (台灣護理站地圖)                          │ │
│  ├─────────────────────────────────────────────────┤ │
│  │                                      ┌──────────┐│ │
│  │         Map View                     │  Info    ││ │
│  │                                      │  Panel   ││ │
│  │         🏥 Markers                   │          ││ │
│  │                                      └──────────┘│ │
│  ├─────────────────────────────────────────────────┤ │
│  │  Footer                                         │ │
│  └─────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────┘

┌─────────────────────────────────┐
│  Mobile (< 768px)               │
│  ┌───────────────────────────┐  │
│  │ Header                    │  │
│  ├───────────────────────────┤  │
│  │                           │  │
│  │    Map View               │  │
│  │                           │  │
│  │    🏥                     │  │
│  │                           │  │
│  ├───────────────────────────┤  │
│  │ Footer                    │  │
│  └───────────────────────────┘  │
│                                 │
│  Info Panel (Full Width)        │
│  ┌───────────────────────────┐  │
│  │ Location Details          │  │
│  │ • Name                    │  │
│  │ • Address                 │  │
│  │ • Phone                   │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

## 🔄 Update Process

### Adding New Locations

```
1. Open data.json
    ↓
2. Add new object to array:
   {
     "name": "New Location",
     "latitude": XX.XXXX,
     "longitude": XXX.XXXX,
     ...
   }
    ↓
3. Save file
    ↓
4. Refresh browser
    ↓
5. New marker appears automatically
    ↓
6. Click marker to see details
```

### Updating Styling

```
1. Open index.html
    ↓
2. Find <style> section
    ↓
3. Modify CSS:
   - Colors
   - Sizes
   - Layouts
   - Fonts
    ↓
4. Save file
    ↓
5. Refresh browser
    ↓
6. See updated styles
```

## 🚀 Deployment Flow

```
Local Development
    ↓
Test locally: npm start
    ↓
Verify all features work
    ↓
Commit to Git
    ↓
Push to GitHub
    ↓
Choose deployment platform:
    ├─→ GitHub Pages
    │   • Enable in settings
    │   • Select branch
    │   • Auto-deploys
    │
    ├─→ Netlify
    │   • Connect repo
    │   • Auto-deploys on push
    │
    └─→ Vercel
        • Import project
        • Auto-deploys on push
    ↓
Site live at public URL
    ↓
Users can access map
```

## 💡 Performance

```
Initial Page Load
    ↓
HTML parsing (< 10ms)
    ↓
Load Leaflet JS from CDN (~200ms)
    ↓
Load Leaflet CSS (~50ms)
    ↓
Load map.js (~50ms)
    ↓
Initialize Leaflet (~100ms)
    ↓
Fetch data.json (~20ms)
    ↓
Create markers (~50ms per 100 locations)
    ↓
Load OSM tiles (~500ms)
    ↓
Total: ~1 second for full load
```

## 🔧 Customization Points

```
index.html
    • Page title
    • Header text
    • Footer text
    • Colors & styling
    • Layout structure

map.js
    • Initial map center
    • Initial zoom level
    • Marker color
    • Marker emoji
    • Info panel content
    • Error messages

data.json
    • Location data
    • Add/remove locations
    • Update information
```

---

**Note**: This architecture ensures:
- ✅ No backend required
- ✅ Easy to deploy
- ✅ Fast loading
- ✅ Simple to maintain
- ✅ Scalable to hundreds of locations
