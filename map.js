// OpenStreetMap implementation using Leaflet
// This is a free and open-source mapping solution
// Documentation: https://leafletjs.com/

let map;
let markers = [];
let userLocationMarker = null;
let selectedMarker = null;

// Pin colors
const PIN_COLOR = '#8E44AD'; // Purple - good contrast with milk bottle emoji
const PIN_SELECTED_COLOR = '#E74C3C'; // Coral red for selected state

// Initialize Leaflet Map
async function initMap() {
    try {
        // Create map centered on Taiwan
        map = L.map('map').setView([25.031469, 121.5110636], 13);

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);

        // Load and display nursing locations
        await loadNursingLocations(map);

        // Request user location after map is ready
        getUserLocation();

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
            const bounds = L.latLngBounds(markers.map(m => m.getLatLng()));
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    } catch (error) {
        console.error('Error loading locations:', error);
        showError('Failed to load nursing locations: ' + error.message);
    }
}

// Create custom pin icon
function createPinIcon(color) {
    return L.divIcon({
        className: 'custom-hospital-icon',
        html: `
            <div style="
                background-color: ${color};
                width: 36px;
                height: 36px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                border: 3px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            ">
                <div style="
                    transform: rotate(45deg);
                    font-size: 20px;
                    line-height: 1;
                ">🍼</div>
            </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36]
    });
}

// Add a marker to the map
function addMarker(map, location) {
    // Create marker with default color
    const marker = L.marker([location.latitude, location.longitude], {
        icon: createPinIcon(PIN_COLOR),
        title: location.name
    }).addTo(map);

    // Store location data with marker for later use
    marker.locationData = location;

    // Add click handler to show details
    marker.on('click', function() {
        // Reset previously selected marker
        if (selectedMarker && selectedMarker !== marker) {
            selectedMarker.setIcon(createPinIcon(PIN_COLOR));
        }

        // Highlight this marker
        marker.setIcon(createPinIcon(PIN_SELECTED_COLOR));
        selectedMarker = marker;

        showLocationDetails(location);
    });

    // Add popup with basic info
    marker.bindPopup(`
        <strong>${location.name}</strong><br>
        ${location.address}
    `);

    markers.push(marker);
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
        <button class="close-panel" onclick="closeInfoPanel()" style="
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
            line-height: 1;
            padding: 5px;
        ">&times;</button>
        <h2>${location.name}</h2>
        <div class="info-item">
            <span class="info-label">地址</span>
            <span class="info-value">${location.address}</span>
        </div>
        ${location.phone ? `
        <div class="info-item">
            <span class="info-label">電話</span>
            <span class="info-value">${location.phone}</span>
        </div>` : ''}
        ${location.openingHours ? `
        <div class="info-item">
            <span class="info-label">營業時間</span>
            <span class="info-value">${location.openingHours}</span>
        </div>` : ''}
        ${location.notes ? `
        <div class="info-item">
            <span class="info-label">備註</span>
            <span class="info-value">${location.notes}</span>
        </div>` : ''}
        ${location.basis ? `
        <div class="info-item">
            <span class="info-label">設置依據</span>
            <span class="info-value">${location.basis}</span>
        </div>` : ''}
    `;

    document.body.appendChild(panel);
}

// Close info panel and reset marker color
function closeInfoPanel() {
    // Remove info panel
    const panel = document.querySelector('.info-panel');
    if (panel) {
        panel.remove();
    }

    // Reset selected marker color
    if (selectedMarker) {
        selectedMarker.setIcon(createPinIcon(PIN_COLOR));
        selectedMarker = null;
    }
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

// Get user's current location
function getUserLocation() {
    if (!navigator.geolocation) {
        console.log('Geolocation is not supported by this browser');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        // Success callback
        function(position) {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            // Create custom icon for user location
            const userIcon = L.divIcon({
                className: 'user-location-icon',
                html: `
                    <div style="
                        background-color: #007AFF;
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        border: 3px solid white;
                        box-shadow: 0 0 0 2px #007AFF, 0 2px 8px rgba(0,0,0,0.3);
                    "></div>
                `,
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });

            // Add user location marker
            userLocationMarker = L.marker([userLat, userLng], {
                icon: userIcon,
                title: 'Your Location'
            }).addTo(map);

            userLocationMarker.bindPopup('您的位置 / Your Location');

            // Center map on user location
            map.setView([userLat, userLng], 14);
        },
        // Error callback
        function(error) {
            console.log('Error getting location:', error.message);
            // Silently fail - map will stay at default Taiwan center
        },
        // Options
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
} else {
    initMap();
}
