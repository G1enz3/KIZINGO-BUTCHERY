
export interface Product {
  id: string;
  name: string;
  category: 'Meat' | 'Dairy';
  subcategory: 'Beef' | 'Mutton' | 'Poultry' | 'Pork' | 'Milk' | 'Cheese' | 'Yogurt' | 'Butter';
  pricePerKg: number;
  description: string;
  imageUrl: string;
  isActive: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantityKg: number;
}

export interface Recipe {
    recipeName: string;
    description: string;
    ingredients: string[];
    instructions: string[];
}
