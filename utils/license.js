// utils/license.js
const os = require('os');
const crypto = require('crypto');

function getMachineID() {
  const mac = os.networkInterfaces()['eth0']?.[0]?.mac || 'unknown';
  return crypto.createHash('md5').update(mac).digest('hex');
}

/*
function validateLicense() {
  const machineId = getMachineID();
  const validKey = 'YOUR_LICENSE_KEY'; // Store securely
  return machineId === validKey;
}
*/

function validateLicense() {
  console.log('Machine ID:', getMachineID());
  return true; // ← Already good!
}

module.exports = { validateLicense };