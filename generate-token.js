#!/usr/bin/env node

/**
 * Generate JWT Token for Apple MapKit JS
 * 
 * This script helps generate a JWT token for authenticating with Apple MapKit JS.
 * 
 * Requirements:
 * - Node.js installed
 * - Install jsonwebtoken: npm install jsonwebtoken
 * 
 * Usage:
 * 1. Download your .p8 private key from Apple Developer Portal
 * 2. Update the configuration below with your details
 * 3. Run: node generate-token.js
 */

const jwt = require('jsonwebtoken');
const fs = require('fs');

// Configuration - Update these values with your Apple Developer account details
const CONFIG = {
    // Your Team ID (found in Apple Developer account)
    teamId: 'YOUR_TEAM_ID',
    
    // Your Key ID (from the key you created)
    keyId: 'YOUR_KEY_ID',
    
    // Path to your .p8 private key file
    privateKeyPath: './AuthKey_YOUR_KEY_ID.p8',
    
    // Token expiration time (in seconds)
    // Apple recommends tokens that expire in less than a year
    expirationTime: 15777000 // ~6 months
};

function generateToken() {
    try {
        // Read the private key
        const privateKey = fs.readFileSync(CONFIG.privateKeyPath, 'utf8');
        
        // Current time
        const now = Math.floor(Date.now() / 1000);
        
        // Create the token payload
        const payload = {
            iss: CONFIG.teamId,
            iat: now,
            exp: now + CONFIG.expirationTime
        };
        
        // Create the token options
        const options = {
            algorithm: 'ES256',
            keyid: CONFIG.keyId
        };
        
        // Generate the token
        const token = jwt.sign(payload, privateKey, options);
        
        console.log('\n✅ Token generated successfully!\n');
        console.log('Copy the token below and paste it into map.js:\n');
        console.log('─'.repeat(80));
        console.log(token);
        console.log('─'.repeat(80));
        console.log('\nToken will expire on:', new Date((now + CONFIG.expirationTime) * 1000).toISOString());
        console.log('\n⚠️  Remember to keep your token secure and never commit it to version control!\n');
        
        return token;
    } catch (error) {
        console.error('\n❌ Error generating token:', error.message);
        console.error('\nMake sure you have:');
        console.error('1. Installed jsonwebtoken: npm install jsonwebtoken');
        console.error('2. Downloaded your .p8 private key file');
        console.error('3. Updated the CONFIG object with your Team ID, Key ID, and key file path\n');
        process.exit(1);
    }
}

// Check if configuration is updated
if (CONFIG.teamId === 'YOUR_TEAM_ID' || CONFIG.keyId === 'YOUR_KEY_ID') {
    console.error('\n❌ Please update the CONFIG object in this script with your Apple Developer details.\n');
    console.error('You need to set:');
    console.error('- teamId: Your Apple Developer Team ID');
    console.error('- keyId: Your MapKit JS Key ID');
    console.error('- privateKeyPath: Path to your .p8 private key file\n');
    process.exit(1);
}

// Generate the token
generateToken();
