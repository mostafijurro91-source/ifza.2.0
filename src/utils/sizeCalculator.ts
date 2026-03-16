import { UserMeasurements } from '../types';

export function calculateRecommendedSize(measurements: UserMeasurements | undefined): string | null {
  if (!measurements) return null;

  const { height, weight, chest, waist } = measurements;
  
  if (!height && !weight && !chest && !waist) return null;

  // Simple logic for demonstration
  // In a real app, this would be more complex and category-specific
  
  const h = parseFloat(height || '0'); // in ft
  const w = parseFloat(weight || '0'); // in kg
  const c = parseFloat(chest || '0');  // in inches
  
  // If we have chest measurement, it's usually the best indicator for tops
  if (c > 0) {
    if (c < 36) return 'S';
    if (c < 40) return 'M';
    if (c < 44) return 'L';
    if (c < 48) return 'XL';
    return 'XXL';
  }

  // Fallback to height/weight if chest is missing
  if (w > 0) {
    if (w < 60) return 'S';
    if (w < 75) return 'M';
    if (w < 90) return 'L';
    if (w < 105) return 'XL';
    return 'XXL';
  }

  return null;
}
