export interface Image {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  category: string;
  uploadedAt: string;
  aspectRatio: string;
}

export interface ImageFormData {
  title: string;
  description: string;
  url: string;
  tags: string;
  category: string;
}