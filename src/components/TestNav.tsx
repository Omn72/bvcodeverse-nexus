import React, { useState } from 'react';

const TestNav = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-4 bg-red-500 text-white">
      <h1>Test Navigation - Count: {count}</h1>
      <button 
        onClick={() => {
          console.log('Test button clicked!');
          setCount(count + 1);
          alert('Button works!');
        }}
        className="bg-blue-500 px-4 py-2 rounded ml-4"
      >
        Test Button
      </button>
      
      <button 
        onClick={() => {
          console.log('Mobile menu test');
          alert('Mobile menu test works!');
        }}
        className="bg-green-500 px-4 py-2 rounded ml-4"
      >
        Mobile Test
      </button>
    </div>
  );
};

export default TestNav;
