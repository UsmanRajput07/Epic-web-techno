
const products = [
    {
        name: "Basic Tee",
        href: "#",
        imageSrc: "https://d118ps6mg0w7om.cloudfront.net/media/catalog/product/a/w/fit-in/1000x1333/aw-24_4000x5000-10-10-24_mfs-15451-t-02-white_1_mfs-15451-t-02-white.jpg",
        imageAlt: "Front of men's Basic Tee in white.",
        price: "$35",
    },
    {
        name: "Denim Jacket",
        href: "#",
        imageSrc: "https://d1pdzcnm6xgxlz.cloudfront.net/tops/8905875022275-9.jpg",
        imageAlt: "Front of men's Denim Jacket in navy blue.",
        price: "$75",
    },
]
export function ProductList({add = () => {}, remove = () => {}}) {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products?.map((product) => (
                        <div key={product.name} className="group">
                            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-80 xl:aspect-w-80">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                            <div className="flex items-center justify-between mt-4">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => add(product)}
                                >
                                    Add to cart
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    onClick={() => remove(product)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}