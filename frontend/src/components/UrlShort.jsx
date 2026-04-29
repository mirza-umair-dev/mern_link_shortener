import React, { useState } from "react";
import { HiLink } from "react-icons/hi";
import { FaRegCopy } from "react-icons/fa";
import API from "../api/axios";
const UrlShort = () => {
  const [originalUrl, setoriginalUrl] = useState("");
  const [shortUrl, setshortUrl] = useState("");
  const [loading,setloading] = useState(true);
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

     if (!originalUrl.trim()) {
            setError('Please enter a URL');
            return;
        } 
        setloading(true);
        setError('');
        setshortUrl('');
    try {
      const response = await API.post("/api/shorten", { originalUrl: originalUrl.trim()  });

      if(response.data.shortUrl){
        setloading(false)
      setshortUrl(response.data.shortUrl)
      console.log(response.data);
      }else {
                setError('Invalid response from server');
            }
      

    } catch (error) {
      console.error(error);
    }
  };
const copyToClipboard = async () => {
        if (shortUrl) {
            try {
                await navigator.clipboard.writeText(shortUrl);
                alert('Copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy:', err);
                alert('Failed to copy to clipboard');
            }
        }
    };
  return (
    <div className="urlShortDiv">
      <div className="outer-shorter">
        <div className="gradient">
          <h1>Shorten your loong Links:)</h1>
        </div>
        <div className="p-div">
          <p>
            This is an efficient and easy-to-use URL shortening service that
            streamilines{" "}
          </p>
          <p>your online experience</p>
        </div>
      </div>

      <form onSubmit={submitHandler}>
        <div className="input-div">
          <div className="icon">
            <HiLink color="#c9ced6" size={22} />
          </div>
          <div className="input-button">
            <input
              type="text"
              placeholder="Enter the link here..."
              value={originalUrl}
              onChange={(e) => setoriginalUrl(e.target.value)}
            />
            <button type="submit">Shorten Now!</button>
          </div>
        </div>
      </form>

       {error && (
                <div style={{ color: 'red', marginTop: '10px', padding: '10px', backgroundColor: '#ffeeee', borderRadius: '5px' }}>
                    Error: {error}
                </div>
            )}
     {shortUrl && (
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#181e29', borderRadius: '5px' }}>
                    <p style={{color:'white'}}><strong>Shortened URL:</strong></p>
                    <a href={shortUrl} target="_blank" style={{ color: '#c9ced6', textDecoration:'none' }}>
                        {shortUrl}
                    </a>
                    <button onClick={copyToClipboard} style={{ marginLeft: '10px',backgroundColor:'#5e606198',border:'none',padding:'5px',borderRadius:'100%' }}>
                        <FaRegCopy size={16} color="white"/>
                    </button>
                </div>
            )}
      </div>
  );
};

export default UrlShort;
