import React, { useState } from 'react';
import axios from 'axios';
import SnippetCard from '../components/SnippetCard';
import Navbar from '../components/Navbar'

const Explore = () => {

    const [query, setQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]); // State to hold filtered posts

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setQuery(value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`);
            const fetchedPosts = response.data;

            // Filter posts based on query in the title
            const filtered = fetchedPosts.filter(post => 
                post.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPosts(filtered);     // Set filtered posts based on search term

        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    return (
        <div className=" min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            <Navbar/>
            <div className=''>
            <form onSubmit={handleSearchSubmit} className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg w-96">
                <input
                    type="text"
                    placeholder="Enter search term..."
                    value={query}
                    onChange={handleSearchChange}
                    className="p-3 w-4/5 mb-4 border border-gray-300 rounded-md text-lg"
                />
                <button 
                    type="submit" 
                    className="p-3 w-4/5 bg-green-500 text-white rounded-md text-lg hover:bg-green-600 transition-colors"
                >
                    Search
                </button>
            </form>

            <div className="items-center mx-10">
            {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-12 mx-auto px-6">
          {filteredPosts.map((post) => (
            <div className="w-full" key={post.id}>
              <SnippetCard post={post} />
            </div>
          ))}
        </div>): (
                    <p>No results found</p>
                )}
      </div>
            </div>

        </div>
    );
};

export default Explore;
