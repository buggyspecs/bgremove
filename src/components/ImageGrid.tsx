import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-css';
import { Image } from '../types';

interface ImageGridProps {
  images: Image[];
}

export default function ImageGrid({ images }: ImageGridProps) {
  const [visibleImages, setVisibleImages] = useState<Image[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);
  const IMAGES_PER_PAGE = 12;

  useEffect(() => {
    // Reset state when images prop changes (e.g., during search)
    setVisibleImages([]);
    setPage(1);
    setHasMore(true);
  }, [images]);

  useEffect(() => {
    const loadMoreImages = () => {
      const start = (page - 1) * IMAGES_PER_PAGE;
      const end = start + IMAGES_PER_PAGE;
      const newImages = images.slice(start, end);
      
      if (newImages.length > 0) {
        setVisibleImages(prev => [...prev, ...newImages]);
        setPage(prev => prev + 1);
      }
      
      if (end >= images.length) {
        setHasMore(false);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreImages();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [images, page, hasMore]);

  const breakpointColumns = {
    default: 4,
    1536: 3,
    1024: 2,
    640: 1
  };

  return (
    <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-8 w-auto"
        columnClassName="pl-8 bg-clip-padding"
      >
        {visibleImages.map((image) => (
          <div key={image.id} className="mb-8 group">
            <div className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-auto object-cover transform transition-all duration-300 ease-in-out group-hover:scale-105"
                style={{ aspectRatio: image.aspectRatio.replace('/', '/') }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        ))}
      </Masonry>
      
      <div ref={loaderRef} className="h-20 flex items-center justify-center">
        {hasMore ? (
          <div className="animate-pulse text-gray-500">Loading more images...</div>
        ) : images.length > 0 ? (
          <div className="text-gray-500 font-medium">You have seen all the images</div>
        ) : (
          <div className="text-gray-500 font-medium">No images found</div>
        )}
      </div>
    </div>
  );
}