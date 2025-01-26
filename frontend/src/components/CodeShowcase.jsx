import React, { useState } from 'react';

const CodeShowcase = () => {
  const [activeLanguage, setActiveLanguage] = useState("javascript");

  const codeSnippets = {
    javascript: `// Simple JavaScript Example
function greet(name) {
  console.log('Hello, ' + name + '!');
}

greet('World');`,
    cpp: `// Simple C++ Example
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    python: `# Simple Python Example
def greet(name):
    print(f"Hello, {name}!")

greet("World")`,
    java: `// Simple Java Example
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  };

  const languageColors = {
    javascript: "text-yellow-400",
    cpp: "text-blue-500",
    python: "text-green-500",
    java: "text-red-500",
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-2xl w-full max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-between items-center mb-4 border-b border-gray-800 pb-3">
        <div className="flex flex-wrap space-x-2">
          {Object.keys(codeSnippets).map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLanguage(lang)}
              className={`px-4 py-2 rounded-md text-sm uppercase tracking-wider font-medium transition-all duration-300 ease-in-out ${
                activeLanguage === lang
                  ? `${languageColors[lang]} bg-gray-800 shadow-md`
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2 text-gray-400 mt-3 sm:mt-0">
          <span className="text-sm">Snippet</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="relative h-[320px]">
        <pre
          className="bg-gray-800 p-6 rounded-lg text-sm font-mono overflow-y-auto border border-gray-700 shadow-inner absolute inset-0 w-full"
        >
          <code className={`block ${languageColors[activeLanguage]}`}>
            {codeSnippets[activeLanguage]}
          </code>
        </pre>
        <div className="absolute top-4 right-4 opacity-50 hover:opacity-100 transition-opacity">
          <button className="bg-gray-700 text-gray-300 px-3 py-1 rounded text-xs flex items-center space-x-1 hover:bg-gray-600 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>Copy</span>
          </button>
        </div>
      </div>
    </div>
  );
};


export default CodeShowcase;
