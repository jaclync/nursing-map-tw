# Quick Start Guide

## 🚀 Get Started in 2 Steps

### Step 1: Add Your Locations

Edit `data.json` and add nursing locations:
```json
[
  {
    "name": "Your Location Name",
    "city": "City",
    "district": "District",
    "address": "Full Address",
    "latitude": 25.0330,
    "longitude": 121.5654,
    "phone": "Phone Number",
    "openingHours": "Opening Hours",
    ...
  }
]
```

### Step 2: Run the Application
```bash
# Option 1: Using Node.js
npm start

# Option 2: Using Python
python3 -m http.server 8000

# Option 3: Using PHP
php -S localhost:8000

# Open http://localhost:8000 in your browser
```

## 🎯 Key Features

- ✅ **Completely Free**: No API keys or tokens required
- ✅ **No Backend**: Pure client-side application
- ✅ **Fast Setup**: 2 minutes total
- ✅ **Easy Deploy**: Works on any static host
- ✅ **Open Source**: Uses OpenStreetMap

## 📚 Need Help?

- 📖 Full documentation: [README.md](README.md)
- 💻 Implementation details: [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)
- 🗺️ How it works: [HOW_IT_WORKS.md](HOW_IT_WORKS.md)

## 🌐 Deploy to Production

### GitHub Pages
```bash
# Enable GitHub Pages in repository settings
# Select branch: main or copilot/add-free-map-view
# Your site will be at: https://[username].github.io/nursing-map-tw
```

### Netlify / Vercel
1. Connect your GitHub repository
2. Deploy (no build command needed)
3. Done! Your map is live

## ⚡ Pro Tips

1. **Multiple Locations?** Just add more objects to the data.json array
2. **Customize Look?** Edit the CSS in index.html
3. **Change Markers?** Modify the icon in map.js
4. **Need More Data?** The JSON structure supports all location details

## 🎨 Customization Ideas

- Change marker icons in `map.js`
- Modify the info panel styling in `index.html`
- Add filters by city/district
- Implement search functionality
- Use different OpenStreetMap tile styles

---

**Ready?** Just add your data and run! 🚀
