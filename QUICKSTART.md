# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Get Your Apple MapKit Token (5 minutes)
1. Create a free Apple Developer account: [developer.apple.com](https://developer.apple.com)
2. Go to: Certificates, Identifiers & Profiles → Keys
3. Create a new key with MapKit JS enabled
4. Download the `.p8` file (keep it secure!)
5. Note your Team ID and Key ID

### Step 2: Generate Your Token
```bash
# Install dependencies
npm install jsonwebtoken

# Edit generate-token.js with your details
# Update: teamId, keyId, and privateKeyPath

# Run the script
node generate-token.js

# Copy the generated token
```

### Step 3: Configure and Run
```bash
# 1. Open map.js
# 2. Replace 'YOUR_MAPKIT_JS_TOKEN_HERE' with your token
# 3. Save the file

# Start the server
npm start

# Open http://localhost:3000 in your browser
```

## 📍 Add Your Own Locations

Edit `data.json` and add more locations:
```json
[
  {
    "name": "Your Location Name",
    "city": "City",
    "district": "District",
    "address": "Full Address",
    "latitude": 25.0330,
    "longitude": 121.5654,
    ...
  }
]
```

## 🎯 Key Features

- ✅ **Free**: Up to 250,000 map views/day
- ✅ **No Backend**: Pure client-side application
- ✅ **Fast Setup**: 10 minutes total
- ✅ **Easy Deploy**: Works on any static host

## 📚 Need Help?

- 📖 Full documentation: [README.md](README.md)
- 🔧 Visual setup guide: Open `setup.html` in browser
- 💻 Implementation details: [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)

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

1. **Token Expires?** Run `generate-token.js` again to create a new one
2. **Multiple Locations?** Just add more objects to the data.json array
3. **Customize Look?** Edit the CSS in index.html
4. **Need More Data?** The JSON structure supports all location details

## 🎨 Customization Ideas

- Change marker colors in `map.js`
- Modify the info panel styling in `index.html`
- Add filters by city/district
- Implement search functionality
- Add custom map styles

---

**Ready?** Follow Step 1 above to get started! 🚀
