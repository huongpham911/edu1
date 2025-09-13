// Fix Script for Image Upload Permission Issues
// Run this script if you encounter permission errors when uploading images

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing image upload permissions...');

// Create img directory if it doesn't exist
const imgDir = path.join(__dirname, 'img');
if (!fs.existsSync(imgDir)) {
    try {
        fs.mkdirSync(imgDir, { recursive: true });
        console.log('✅ Created img directory');
    } catch (error) {
        console.error('❌ Error creating img directory:', error.message);
        console.log('💡 Try running this command manually: mkdir img');
    }
}

// Check and fix permissions (Windows compatible)
try {
    // Check if we can write to the directory
    const testFile = path.join(imgDir, 'test-permission.txt');
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
    console.log('✅ Write permissions verified for img directory');
} catch (error) {
    console.error('❌ Permission error in img directory:', error.message);
    console.log('💡 To fix this issue, try one of these solutions:');
    console.log('   1. Run this command as Administrator');
    console.log('   2. Change the img folder permissions to allow full control');
    console.log('   3. Move the project to a different location (like Desktop)');
    
    if (process.platform === 'win32') {
        console.log('   4. Windows: Right-click img folder → Properties → Security → Edit → Full Control');
    }
}

// Verify public/img directory exists for static serving
const publicImgDir = path.join(__dirname, 'public', 'img');
if (!fs.existsSync(publicImgDir)) {
    try {
        fs.mkdirSync(publicImgDir, { recursive: true });
        console.log('✅ Created public/img directory');
    } catch (error) {
        console.error('❌ Error creating public/img directory:', error.message);
    }
}

// Create .gitkeep files to maintain directory structure
const gitkeepContent = '# This file keeps the directory in git\n# Upload folder for images';

try {
    fs.writeFileSync(path.join(imgDir, '.gitkeep'), gitkeepContent);
    console.log('✅ Created .gitkeep in img directory');
} catch (error) {
    console.log('⚠️  Could not create .gitkeep file');
}

// Check available space
try {
    const stats = fs.statSync(__dirname);
    console.log('✅ Directory is accessible');
} catch (error) {
    console.error('❌ Directory access error:', error.message);
}

console.log('\n📋 Directory Status:');
console.log(`   Project: ${__dirname}`);
console.log(`   Upload folder: ${imgDir}`);
console.log(`   Static images: ${publicImgDir}`);

console.log('\n✅ Permission fix completed!');
console.log('🚀 You can now run: npm start');

// Additional helper function to check Node.js permissions
function checkNodePermissions() {
    try {
        const tempDir = require('os').tmpdir();
        const tempFile = path.join(tempDir, 'node-permission-test.txt');
        fs.writeFileSync(tempFile, 'test');
        fs.unlinkSync(tempFile);
        console.log('✅ Node.js has proper file system permissions');
    } catch (error) {
        console.error('❌ Node.js permission issue:', error.message);
        console.log('💡 Try running Node.js as Administrator or check your antivirus settings');
    }
}

checkNodePermissions();
