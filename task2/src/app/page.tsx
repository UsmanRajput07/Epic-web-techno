"use client"
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { PixabayImage } from '@/types/blog';

export default function Page() {
  const [images, setImages] = useState<PixabayImage[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXBE_URL}&q=${searchTerm}&image_type=photo&page=${page}`)
      .then(res => res.json())
      .then(data => {
        setImages(data.hits);
        setTotalPages(Math.ceil(data.totalHits / 20));
      });
  }, [page, searchTerm]);

  const handlePagination = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  return (
    <>
      <div className="my-4 w-1/3 mx-auto">
        <input
          type="text"
          className="border border-gray-300 rounded p-2 w-full"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 lg:gap-6 mt-8 mx-auto max-w-screen-xl min-h-screen p-4">
        {images?.map((image) => (
          <Link href={`/blog/${image?.id}/`} className="no-underline" key={image?.id}>
            <article className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg">
              <Image
                alt={`blog`}
                src={image?.largeImageURL}
                className="h-56 w-full object-cover"
                width={image?.webformatWidth}
                height={image?.webformatHeight}
                priority={true}
              />

              <div className="bg-white p-4 sm:p-6">
                <h3 className="mt-0.5 text-lg text-gray-900">{image.tags}</h3>
                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                  {image?.description || 'No description available.'}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
      <ul className="flex justify-center gap-1 text-gray-900">
        {[...Array(totalPages)].map((_, i) => (
          <li key={i + 1}>
            <a
              href="#"
              className={`block size-8 rounded border border-gray-200 text-center text-sm/8 font-medium transition-colors hover:bg-gray-50 ${i + 1 === page ? "bg-indigo-600 text-white" : ""}`}
              onClick={() => handlePagination(i + 1)}
            >
              {i + 1}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

