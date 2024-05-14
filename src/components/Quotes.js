import React, { useState, useEffect } from 'react';

const quotes = [
    "Where style meets substance.",
    "Because everyone deserves to feel beautiful.",
    "Style without gender.",
    "Empowering beauty for all.",
    "Unleash your inner beauty.",
    "Hair today, gorgeous tomorrow.",
    "Transforming looks, boosting confidence.",
    "Beauty knows no boundaries.",
    "A salon for every soul.",
    "Hair today, fabulous tomorrow.",
    "Where trends come to life.",
    "Step in, strut out.",
    "Discover your signature style.",
    "Your beauty destination awaits.",
    "Instaura: Your partner in beauty.",
    "Step into Instaura and step out in style.",
    "Experience luxury at Instaura.",
    "Instaura: Where beauty begins.",
    "Transform with Instaura.",
];

function QuoteDisplay() {
  const [currentQuote, setCurrentQuote] = useState('');
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Randomly select a quote from the quotes array
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  return (
    <div style={{ textAlign:'center', padding:'30px'}} >
      <div className='quoteCard'><h3>{currentQuote}</h3></div>
    </div>
  );
}

export default QuoteDisplay;
