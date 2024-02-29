import  { useState } from 'react';
import axios from 'axios';

const Hero = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleShorten = async () => {
    try {
      const response = await axios.post('https://url-shortener-wnom-git-main-ashdude14s-projects.vercel.app/url', { url: longUrl });
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };    

  return (
    <div className='hero-container'>
      <label>URL SHORTENER!</label>
      <input
        type='text'
        placeholder='Enter URL'
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />
      <button onClick={handleShorten}>Shorten</button>
      {shortUrl && (
        <div>
          <label>Shortened URL:</label>
          <a href={`https://url-shortener-wnom-git-main-ashdude14s-projects.vercel.app/${shortUrl}`} target='_blank' rel='noopener noreferrer'>{shortUrl}</a>
        </div>
      )}
    </div>
  );
};

export default Hero;
