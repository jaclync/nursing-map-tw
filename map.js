// OpenStreetMap implementation using Leaflet
// This is a free and open-source mapping solution
// Documentation: https://leafletjs.com/

let map;
let markers = [];

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

// Add a marker to the map
function addMarker(map, location) {
    // Create custom icon for hospital
    const hospitalIcon = L.divIcon({
        className: 'custom-hospital-icon',
        html: '<div style="font-size: 24px;">🍼</div>',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
    });

    // Create marker
    const marker = L.marker([location.latitude, location.longitude], {
        icon: hospitalIcon,
        title: location.name
    }).addTo(map);

    // Add click handler to show details
    marker.on('click', function() {
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
        <h2>${location.name}</h2>
        <div class="info-item">
            <span class="info-label">地址：</span>
            <span class="info-value">${location.address}</span>
        </div>
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
    document.addEventListener('DOMContentLoaded', initMap);
} else {
    initMap();
}
