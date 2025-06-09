'use client'
import { PixabayImage } from '@/types/blog';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Page() {
  const { blogId } = useParams();
  const [img, setImg] = useState<PixabayImage | null>(null);

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXBE_URL}&id=${blogId}`)
      .then(res => res.json())
      .then(data => {
        if (data.hits && data.hits.length > 0) {
          setImg(data.hits[0]);
        }
      });
  }, [blogId]);

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
          <div>
            <div className="max-w-lg md:max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                {img?.tags}
              </h2>
              <p className="mt-4 text-gray-700">
                {img?.type === 'photo' ? `Photo by ${img?.user}` : `Illustration by ${img?.user}`}
              </p>
            </div>
          </div>
          {img && (
            <div>
              <Image
                src={img.webformatURL}
                className="rounded"
                alt={img.tags}
                width={img.webformatWidth}
                height={img.webformatHeight}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

