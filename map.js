// Apple MapKit JS initialization and map rendering

// Note: For production use, you need to obtain a MapKit JS token from Apple Developer Portal
// This is a free implementation that uses the MapKit JS library
// Setup instructions: https://developer.apple.com/documentation/mapkitjs

const MAPKIT_TOKEN = 'YOUR_MAPKIT_JS_TOKEN_HERE';

// Initialize MapKit
async function initMapKit() {
    try {
        // Setup MapKit with JWT token
        // For development/testing, you'll need to replace this with your actual token
        // Free tier: https://developer.apple.com/documentation/mapkitjs/creating_a_maps_identifier_and_a_private_key
        
        if (MAPKIT_TOKEN === 'YOUR_MAPKIT_JS_TOKEN_HERE') {
            showError('Please configure your Apple MapKit JS token in map.js');
            return;
        }

        mapkit.init({
            authorizationCallback: function(done) {
                done(MAPKIT_TOKEN);
            }
        });

        const map = new mapkit.Map("map", {
            center: new mapkit.Coordinate(25.031469, 121.5110636),
            zoom: 0.05,
            showsUserLocation: true,
            showsUserLocationControl: true,
            showsZoomControl: true,
            showsMapTypeControl: true,
            showsCompass: mapkit.FeatureVisibility.Visible
        });

        // Load and display nursing locations
        await loadNursingLocations(map);
        
        hideLoading();
    } catch (error) {
        console.error('Error initializing map:', error);
        showError('Failed to initialize map: ' + error.message);
    }
}

// Load nursing locations from data.json
async function loadNursingLocations(map) {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Failed to load location data');
        }
        
        const locations = await response.json();
        
        // Add markers for each location
        locations.forEach(location => {
            addMarker(map, location);
        });
        
        // Fit map to show all markers if multiple locations
        if (locations.length > 1) {
            const coordinates = locations.map(loc => 
                new mapkit.Coordinate(loc.latitude, loc.longitude)
            );
            const region = mapkit.BoundingRegion.fromCoordinates(coordinates);
            map.region = region;
        }
    } catch (error) {
        console.error('Error loading locations:', error);
        showError('Failed to load nursing locations: ' + error.message);
    }
}

// Add a marker to the map
function addMarker(map, location) {
    const coordinate = new mapkit.Coordinate(location.latitude, location.longitude);
    
    // Create annotation
    const annotation = new mapkit.MarkerAnnotation(coordinate, {
        color: "#007AFF",
        title: location.name,
        subtitle: location.address,
        glyphText: "🏥"
    });
    
    // Add click handler to show details
    annotation.addEventListener('select', function(event) {
        showLocationDetails(location);
    });
    
    map.addAnnotation(annotation);
}

// Show location details in info panel
function showLocationDetails(location) {
    // Remove existing info panel if any
    const existingPanel = document.querySelector('.info-panel');
    if (existingPanel) {
        existingPanel.remove();
    }
    
    // Create info panel
    const panel = document.createElement('div');
    panel.className = 'info-panel';
    
    panel.innerHTML = `
        <h2>${location.name}</h2>
        <div class="info-item">
            <span class="info-label">地址：</span>
            <span class="info-value">${location.address}</span>
        </div>
        <div class="info-item">
            <span class="info-label">城市：</span>
            <span class="info-value">${location.city}</span>
        </div>
        <div class="info-item">
            <span class="info-label">區域：</span>
            <span class="info-value">${location.district}</span>
        </div>
        ${location.village ? `
        <div class="info-item">
            <span class="info-label">里：</span>
            <span class="info-value">${location.village}</span>
        </div>` : ''}
        ${location.phone ? `
        <div class="info-item">
            <span class="info-label">電話：</span>
            <span class="info-value">${location.phone}</span>
        </div>` : ''}
        ${location.openingHours ? `
        <div class="info-item">
            <span class="info-label">營業時間：</span>
            <span class="info-value">${location.openingHours}</span>
        </div>` : ''}
        ${location.notes ? `
        <div class="info-item">
            <span class="info-label">備註：</span>
            <span class="info-value">${location.notes}</span>
        </div>` : ''}
        ${location.basis ? `
        <div class="info-item">
            <span class="info-label">設置依據：</span>
            <span class="info-value">${location.basis}</span>
        </div>` : ''}
        <div class="info-item">
            <span class="info-label">座標：</span>
            <span class="info-value">${location.latitude}, ${location.longitude}</span>
        </div>
        ${location.appleMapsPlaceId ? `
        <div class="info-item">
            <span class="info-label">Apple Maps ID：</span>
            <span class="info-value">${location.appleMapsPlaceId}</span>
        </div>` : ''}
    `;
    
    document.body.appendChild(panel);
}

// Hide loading indicator
function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'none';
    }
}

// Show error message
function showError(message) {
    hideLoading();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.innerHTML = `
        <h3>錯誤 / Error</h3>
        <p>${message}</p>
    `;
    document.body.appendChild(errorDiv);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMapKit);
} else {
    initMapKit();
}
