# How It Works - Nursing Map Taiwan

## 🔄 Application Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  1. User opens index.html in browser                           │
│     ↓                                                           │
│  2. Browser loads Apple MapKit JS library from CDN             │
│     ↓                                                           │
│  3. map.js initializes with JWT token authentication           │
│     ↓                                                           │
│  4. MapKit creates map centered on Taiwan (25.03°N, 121.51°E)  │
│     ↓                                                           │
│  5. Fetches nursing locations from data.json                   │
│     ↓                                                           │
│  6. Creates marker for each location with 🏥 emoji             │
│     ↓                                                           │
│  7. Map renders with all markers visible                       │
│     ↓                                                           │
│  8. User clicks on a marker                                    │
│     ↓                                                           │
│  9. Info panel appears with location details                   │
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
│  │  • MapKit initialization                       │    │
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
│               Apple MapKit JS API                        │
│  • Map rendering                                         │
│  • Tile loading                                          │
│  • User interactions                                     │
│  • Geocoding services                                    │
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
Create mapkit.Coordinate(lat, lng)
    ↓
Create mapkit.MarkerAnnotation()
    ↓
map.addAnnotation()
    ↓
Marker visible on map
    ↓
User clicks marker
    ↓
'select' event fires
    ↓
showLocationDetails()
    ↓
Create info panel HTML
    ↓
Append to document.body
    ↓
Info panel visible to user
```

## 🔐 Authentication Flow

```
┌─────────────────────────────────────────────────────────┐
│  Setup (One-time)                                       │
│                                                         │
│  1. Create Apple Developer Account (Free)              │
│  2. Generate Maps ID                                   │
│  3. Create Private Key (.p8 file)                      │
│  4. Note Team ID and Key ID                            │
│                                                         │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  Token Generation (Every ~6 months)                    │
│                                                         │
│  1. Run generate-token.js                              │
│  2. Script reads .p8 private key                       │
│  3. Creates JWT with Team ID, Key ID, expiry           │
│  4. Signs with ES256 algorithm                         │
│  5. Outputs token string                               │
│                                                         │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  Runtime (Every page load)                             │
│                                                         │
│  1. map.js contains token string                       │
│  2. mapkit.init() called with token                    │
│  3. Token sent to Apple servers                        │
│  4. Apple validates signature                          │
│  5. If valid, map tiles load                           │
│  6. User sees interactive map                          │
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
    • Apple Maps Place ID
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
Load MapKit JS from CDN (~200ms)
    ↓
Load map.js (~50ms)
    ↓
Initialize MapKit (~100ms)
    ↓
Fetch data.json (~20ms)
    ↓
Create markers (~50ms per 100 locations)
    ↓
Render map tiles (~500ms)
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
