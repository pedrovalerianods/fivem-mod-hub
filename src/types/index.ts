export interface Product {
  id: string;
  title: string;
  description: string;
  category: Category;
  price: number;
  videoUrl: string;
  imageUrl: string;
  files: ProductFile[];
  createdAt: string;
}

export interface ProductFile {
  id: string;
  productId: string;
  fileName: string;
  fileType: string;
}

export type Category = 'mods-de-som' | 'mods' | 'ruas' | 'settings' | 'configs' | 'graficos';

export const CATEGORIES: { id: Category; label: string; icon: string }[] = [
  { id: 'mods-de-som', label: 'Mods de Som', icon: '🔊' },
  { id: 'mods', label: 'Mods', icon: '🔧' },
  { id: 'ruas', label: 'Ruas', icon: '🛣️' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
  { id: 'configs', label: 'Configs', icon: '📋' },
  { id: 'graficos', label: 'Gráficos', icon: '🎨' },
];

export const CATEGORY_MAP: Record<Category, string> = {
  'mods-de-som': 'Mods de Som',
  'mods': 'Mods',
  'ruas': 'Ruas',
  'settings': 'Settings',
  'configs': 'Configs',
  'graficos': 'Gráficos',
};

export interface Order {
  id: string;
  userId: string;
  productId: string;
  status: 'COMPLETED' | 'PENDING';
  purchaseDate: string;
  product?: Product;
}

export interface User {
  id: string;
  discordId: string;
  username: string;
  avatar?: string;
}
