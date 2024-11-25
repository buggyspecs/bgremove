import { create } from 'zustand';
import { Image, ImageFormData } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

interface ImageState {
  images: Image[];
  addImage: (imageData: ImageFormData) => void;
  updateImage: (id: string, imageData: ImageFormData) => void;
  deleteImage: (id: string) => void;
  searchImages: (query: string) => Image[];
}

const aspectRatios = ['16/9', '4/5', '1/1', '4/3', '3/4'];
const categories = ['Nature', 'Architecture', 'People', 'Technology'];
const tags = ['landscape', 'urban', 'portrait', 'wildlife', 'travel', 'food', 'abstract'];

// Generate more diverse sample images
const sampleImages = Array.from({ length: 50 }, (_, i) => {
  const width = 800;
  const ratio = aspectRatios[i % aspectRatios.length];
  const [w, h] = ratio.split('/').map(Number);
  const height = Math.floor((width * h) / w);
  
  const category = categories[i % categories.length];
  const imageType = category.toLowerCase();
  
  const selectedTags = tags
    .sort(() => 0.5 - Math.random())
    .slice(0, 2 + (i % 2))
    .concat([imageType]);

  return {
    id: `${i + 1}`,
    title: `${category} Image ${i + 1}`,
    description: `Beautiful ${category.toLowerCase()} image for your projects`,
    url: `https://source.unsplash.com/random/${width}x${height}?${imageType}&sig=${i}`,
    tags: selectedTags,
    category,
    uploadedAt: new Date(Date.now() - i * 86400000).toISOString(),
    aspectRatio: ratio,
  };
});

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: (username: string, password: string) => {
    if (username === 'Sandeep' && password === 'Sandeep123') {
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },
  logout: () => set({ isAuthenticated: false }),
}));

export const useImageStore = create<ImageState>((set, get) => ({
  images: sampleImages,
  addImage: (imageData: ImageFormData) => {
    const newImage: Image = {
      id: Math.random().toString(36).substr(2, 9),
      ...imageData,
      tags: imageData.tags.split(',').map(tag => tag.trim()),
      uploadedAt: new Date().toISOString(),
      aspectRatio: aspectRatios[Math.floor(Math.random() * aspectRatios.length)],
    };
    set((state) => ({ images: [newImage, ...state.images] }));
  },
  updateImage: (id: string, imageData: ImageFormData) => {
    set((state) => ({
      images: state.images.map((image) =>
        image.id === id
          ? {
              ...image,
              ...imageData,
              tags: imageData.tags.split(',').map(tag => tag.trim()),
            }
          : image
      ),
    }));
  },
  deleteImage: (id: string) => {
    set((state) => ({
      images: state.images.filter((image) => image.id !== id),
    }));
  },
  searchImages: (query: string) => {
    const { images } = get();
    if (!query) return images;
    
    const lowercaseQuery = query.toLowerCase();
    return images.filter((image) => 
      image.title.toLowerCase().includes(lowercaseQuery) ||
      image.description.toLowerCase().includes(lowercaseQuery) ||
      image.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      image.category.toLowerCase().includes(lowercaseQuery)
    );
  },
}));