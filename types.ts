
export enum AppScreen {
  DASHBOARD = 'DASHBOARD',
  SCANNER = 'SCANNER',
  SCHEDULE = 'SCHEDULE',
  MARKETPLACE = 'MARKETPLACE',
  REWARDS = 'REWARDS',
  PROFILE = 'PROFILE',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD'
}

export enum WasteCategory {
  RECYCLABLE = 'Recyclable',
  ORGANIC = 'Organic',
  HAZARDOUS = 'Hazardous',
  TRASH = 'General Waste'
}

export interface GeoLocation {
  lat: number;
  lng: number;
  accuracy?: number;
  address?: string;
}

export interface WasteAnalysisResult {
  wasteType: string;
  category: WasteCategory;
  confidence: number;
  disposalAdvice: string;
  isRenewable: boolean;
  estimatedWeightKg?: number;
  recyclingPotential?: string; 
  reuseSuggestions?: string;
  isPlastic?: boolean; // Specific flag
  isEWaste?: boolean; // Specific flag
}

export interface CollectionPoint {
  name: string;
  address: string;
  distance: string;
  uri?: string;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  price: number;
  unit: string;
  image: string;
  seller: string;
  rating: number;
}
