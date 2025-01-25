import React from "react";

const products = [
  {
    id: 1,
    name: "Markdown Snippets",
    description: "Convert snippets to markdown for documentation.",
    badge: "Free",
  },
  {
    id: 2,
    name: "Syntax Highlighting",
    description: "Supports over 100 programming languages.",
    badge: "Free",
  },
  {
    id: 3,
    name: "Snippet Analytics",
    description: "Track snippet views and usage trends.",
    badge: "Free",
  },
  {
    id: 4,
    name: "Code Export",
    description: "Download your snippets in multiple formats.",
    badge: "Free",
  },
];

const ProductShowcase = () => {
  return (
    <section className="py-10 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold text-center mb-6">Our Free Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {products.map((product) => (
          <div key={product.id} className="p-4 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <p className="text-sm text-gray-400">{product.description}</p>
            <span className="mt-4 inline-block bg-green-500 text-xs text-black px-2 py-1 rounded">
              {product.badge}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductShowcase;
