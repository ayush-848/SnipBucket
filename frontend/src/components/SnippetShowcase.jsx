import React, { useState } from "react";
import { FiCopy } from "react-icons/fi";

const snippets = [
  {
    title: "JavaScript: Debounce Function",
    description: "Improve performance by delaying rapid function calls.",
    code: `function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}`,
  },
  {
    title: "Python: Fibonacci Sequence",
    description: "Generate the Fibonacci sequence up to n terms.",
    code: `def fibonacci(n):
  sequence = [0, 1]
  for i in range(2, n):
      sequence.append(sequence[-1] + sequence[-2])
  return sequence`,
  },
  {
    title: "HTML: Responsive Card",
    description: "Showcase a responsive card layout for products.",
    code: `<div class="card">
  <img src="image.jpg" alt="Product" class="card-img">
  <h2 class="card-title">Product Name</h2>
  <p class="card-desc">This is a short description of the product.</p>
  <button class="card-btn">Learn More</button>
</div>`,
  },
];

const SnippetCard = ({ title, description, code }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-900 text-white shadow-lg">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-300 mb-4">{description}</p>
      <pre className="bg-gray-800 p-3 rounded text-sm overflow-auto">
        <code>{code}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="mt-3 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
      >
        <FiCopy />
        {copied ? "Copied!" : "Copy Code"}
      </button>
    </div>
  );
};

const SnippetShowcase = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {snippets.map((snippet, index) => (
        <SnippetCard
          key={index}
          title={snippet.title}
          description={snippet.description}
          code={snippet.code}
        />
      ))}
    </div>
  );
};

export default SnippetShowcase;
