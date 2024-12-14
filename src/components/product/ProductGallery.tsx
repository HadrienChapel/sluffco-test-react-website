import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="aspect-w-1 aspect-h-1 w-full">
        <img
          src={mainImage}
          alt={name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {images.map((image) => (
          <button
            key={image}
            onClick={() => setMainImage(image)}
            className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
              mainImage === image ? 'ring-2 ring-black' : ''
            }`}
          >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}