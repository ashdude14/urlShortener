import  { useState } from 'react';
import axios from 'axios';

const Hero = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to hold error
  const [res, setRes] = useState('');

  const handleShorten = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await axios.post('https://url-shortener-wnom-git-main-ashdude14s-projects.vercel.app/url', { url: longUrl });
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error('Error shortening URL:', error);
      setError(error); // Set error state if there's an error
    }
    try {
      const getId = await axios.get(`https://url-shortener-wnom-git-main-ashdude14s-projects.vercel.app/${shortUrl}`)
      setRes(getId);
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://url-shortener-wnom-git-main-ashdude14s-projects.vercel.app/${shortUrl}`);
    alert('Short URL copied to clipboard!');
  };

  return (
    <div>
      <label className='text-white text-xl'>🌟 Short URL generator!</label>
      <div className='flex justify-center p-[10%] gap-[3%] text-xl text-white '>
        <input
          type='text'
          value={longUrl}
          placeholder='Enter long URL!'
          onChange={(e) => setLongUrl(e.target.value)}
          className='text-xl text-black rounded-lg'
        />
        <button onClick={handleShorten} className='bg-red-900 rounded-xl h-[5%] w-[40%] sm:w-[15%] p-[1%] hover:bg-red-300'>Submit 🤛🏽</button>
      </div>

      {loading ? (
        <div className='flex justify-center items-center text-white'>
          <p>⏳Loading...</p>
        </div>
      ) : error ? ( // Display error message if error state is not null
        <div className='flex justify-center items-center text-white'>
          <p>⚠️ Error: {error.message}</p>
        </div>
      ) : shortUrl && (
        <div className='flex flex-col text-white'>
          <div>
            <label className='bg-green-800 rounded-lg p-[1%] w-[10%] text-xl justify-center'>Short Url ✔️</label>
            <div className="flex items-center">
              <a className="rounded-lg p-[1%] bg-white text-black hover:text-blue-300 ml-[1%] sm:ml-[25%] mt-[2%] " href={`https://url-shortener-wnom-git-main-ashdude14s-projects.vercel.app/${shortUrl}`} target='_blank' rel='noopener noreferrer'>{`https://url-shortener-wnom-git-main-ashdude14s-projects.vercel.app/${shortUrl}`}</a>
            </div>
            <button onClick={copyToClipboard} className="ml-2 p-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none mt-[1%]">💾 Copy Url! </button>
          </div>
          <div className='mt-[1%] justify-start '>
            <label className='bg-red-300 h-[10%]  w-full text-sm sm:text-lg text-black justify-center'>🥺: `https://url-shortener-wnom-git-main-ashdude14s-projects.vercel.app/` is the 🆓 vercel domain only!</label>
            <label className='bg-red-300  h-[10%]  w-full text-sm text-black sm:text-lg justify-center '>  😉The short url id : {shortUrl} </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
