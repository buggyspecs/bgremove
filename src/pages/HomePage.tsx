import { useState } from 'react';
import { useImageStore } from '../lib/store';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ImageGrid from '../components/ImageGrid';

export default function HomePage() {
  const { images, searchImages } = useImageStore();
  const [searchResults, setSearchResults] = useState(images);

  const handleSearch = (query: string) => {
    setSearchResults(searchImages(query));
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="hero-gradient">
          <div className="max-w-7xl mx-auto py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block">Discover stunning</span>
                <span className="block mt-2">stock images</span>
              </h1>
              <p className="mt-6 max-w-md mx-auto text-xl text-indigo-100 sm:text-2xl md:mt-8 md:max-w-3xl">
                Find the perfect image for your next creative project
              </p>
              <div className="mt-10">
                <SearchBar onSearch={handleSearch} />
              </div>
            </div>
          </div>
        </div>
        <ImageGrid images={searchResults} />
      </main>
    </div>
  );
}