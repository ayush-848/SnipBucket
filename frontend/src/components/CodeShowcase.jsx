import React, { useState, useEffect } from 'react';
import { CopyIcon } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeShowcase = () => {
  const [activeLanguage, setActiveLanguage] = useState("javascript");
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [codeTheme, setCodeTheme] = useState(nightOwl); // Code theme state for dynamic styling

  useEffect(() => {
    // Change code theme based on active language
    if (activeLanguage === 'python') {
      setCodeTheme({ ...nightOwl, background: '#2d2d2d' }); // Example theme change for Python
    } else {
      setCodeTheme(nightOwl);
    }
  }, [activeLanguage]);

  const handleCopy = () => {
    // Copy the active code snippet to the clipboard
    navigator.clipboard.writeText(codeSnippets[activeLanguage]);
    setCopyButtonText('Copied');
    setTimeout(() => setCopyButtonText("Copy"), 1000);
  };

  const handleLanguageChange = (lang) => {
    setIsLoading(true); // Show loading when language is being changed
    setTimeout(() => {
      setActiveLanguage(lang); // Set the active language
      setIsLoading(false); // Hide loading after language is updated
    }, 500); // Adjusted timeout for smoother transition
  };

  const codeSnippets = {
    javascript: `// Simple JavaScript Example
function greet(name) {
  console.log('Hello, ' + name + '!');
}

greet('World');

function calculateSum(a, b) {
  return a + b;
}

const sum = calculateSum(10, 20);
console.log("Sum:", sum);`,

    cpp: `// Simple C++ Example
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    int a = 5, b = 10;
    cout << "Sum: " << a + b << endl;
    return 0;
}`,

    python: `# Simple Python Example
def greet(name):
    print(f"Hello, {name}!")

greet("World")

def calculate_sum(a, b):
    return a + b

result = calculate_sum(10, 20)
print("Sum:", result)`,

    java: `// Simple Java Example
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        int a = 5;
        int b = 10;
        System.out.println("Sum: " + (a + b));
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
              onClick={() => handleLanguageChange(lang)}
              className={`px-4 py-2 rounded-md text-sm uppercase cursor-pointer tracking-wider font-medium transition-all duration-300 ease-in-out ${
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

      <div className="relative h-[400px]"> {/* Increased height for code box */}
        <div className="bg-gray-800 p-6 rounded-lg text-sm font-mono overflow-y-auto border border-gray-700 shadow-inner absolute inset-0 w-full">
          {isLoading ? (
            // Skeleton Loader with added detail
            <div className="animate-pulse">
              <div className="h-4 bg-gray-700 rounded mb-2 w-full"></div>
              <div className="h-4 bg-gray-700 rounded mb-2 w-full"></div>
              <div className="h-4 bg-gray-700 rounded mb-2 w-4/5"></div>
              <div className="h-4 bg-gray-700 rounded mb-2 w-3/5"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-700 rounded mb-2 w-full"></div> {/* Extra loader */}
            </div>
          ) : (
            <SyntaxHighlighter
              language={activeLanguage}
              wrapLongLines
              style={codeTheme} // Use dynamic theme based on active language
              customStyle={{
                padding: '20px',
                borderRadius: '8px',
                fontSize: '0.875rem',
                background: '#1e1e1e', // Set a default dark background for code box
              }}
            >
              {codeSnippets[activeLanguage]}
            </SyntaxHighlighter>
          )}
        </div>
        <div className="absolute top-4 right-4 opacity-50 hover:opacity-100 transition-opacity">
          <button
            onClick={handleCopy}
            className="bg-gray-700 text-gray-300 px-3 py-1 rounded text-xs flex items-center space-x-1 hover:bg-gray-600 hover:text-white cursor-pointer"
          >
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
            <span>{copyButtonText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeShowcase;
