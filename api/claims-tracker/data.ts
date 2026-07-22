import fs from 'fs';
import path from 'path';

export interface ClaimItem {
  id: string;
  subTitle?: string;
  mainTitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  emailText?: string;
  imageUrl?: string;
  createdAt?: string;
}

const dirPath = path.join(process.cwd(), 'data');
const filePath = path.join(dirPath, 'claims.json');

// Helper to ensure file exists
function ensureFileExists() {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]), 'utf-8');
  }
}

// 🟢 GET ALL
export function getAllClaims(): ClaimItem[] {
  try {
    ensureFileExists();
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData || '[]');
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return [];
  }
}

// 💾 SAVE TO FILE
function saveClaimsToFile(claims: ClaimItem[]) {
  try {
    ensureFileExists();
    fs.writeFileSync(filePath, JSON.stringify(claims, null, 2), 'utf-8');
  } catch (error) {
    console.error("Error writing JSON file:", error);
  }
}

// 🟢 GET BY ID
export function getClaimById(id: string) {
  const claims = getAllClaims();
  return claims.find((item) => item.id === id);
}

// 🟢 ADD
export function addClaim(newItem: Omit<ClaimItem, 'id'>) {
  const claims = getAllClaims();
  const item: ClaimItem = {
    id: Date.now().toString(),
    ...newItem,
    createdAt: new Date().toISOString()
  };
  claims.unshift(item);
  saveClaimsToFile(claims);
  return item;
}

// 🟢 UPDATE
export function updateClaim(id: string, updatedFields: Partial<ClaimItem>) {
  const claims = getAllClaims();
  const index = claims.findIndex((item) => item.id === id);
  if (index !== -1) {
    claims[index] = { ...claims[index], ...updatedFields };
    saveClaimsToFile(claims);
    return claims[index];
  }
  return null;
}

// 🟢 DELETE
export function deleteClaim(id: string) {
  const claims = getAllClaims();
  const filtered = claims.filter((item) => item.id !== id);
  saveClaimsToFile(filtered);
  return true;
}