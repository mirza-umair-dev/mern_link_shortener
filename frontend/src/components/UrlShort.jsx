import { useState } from "react";
import { HiLink } from "react-icons/hi";
import { FaRegCopy } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
import API from "../api/axios";
const UrlShort = () => {
  const [originalUrl, setoriginalUrl] = useState("");
  const [longUrl,setlongUrl] = useState('');
  const [shortUrl, setshortUrl] = useState("");
  const [clicks, setclicks] = useState("");
  const [loading, setloading] = useState(false);
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!originalUrl.trim()) {
      setError("Please enter a URL");
      return;
    }
    setloading(true);
    setError("");
    setshortUrl("");
    try {
      const response = await API.post("/api/shorten", {
        originalUrl: originalUrl.trim(),
      });

      if (response.data.shortUrl) {
        setloading(false);
        setshortUrl(response.data.shortUrl);
        setclicks(response.data.Clicks);
        console.log(response.data);
        setlongUrl(originalUrl)
        setoriginalUrl('');
      } else {
        setError("Invalid response from server");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const copyToClipboard = async () => {
    if (shortUrl) {
      try {
        await navigator.clipboard.writeText(shortUrl);
        alert("Copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy:", err);
        alert("Failed to copy to clipboard");
      }
    }
  };
  return (
    <div className="w-screen h-[80vh] flex items-center justify-center flex-col ">
      <div className="w-full h-2/3 flex items-center flex-col gap-8">
        <div className="flex items-center justify-evenly flex-col h-1/4">
          <h1 className="bg-linear-to-r from-blueClr to-pinkClr text-3xl font-bold text-shadow-2xs bg-clip-text text-transparent text-center inline font-monoplex">
            SHORTEN YOUR LOOONG LINKS:)
          </h1>
          <p className="text-[#d1d5dc] text-center">
            This is an efficient and easy-to-use URL shortening service that
            streamilines your online experience
          </p>
        </div>

        <form
          onSubmit={submitHandler}
          className="w-screen flex items-center justify-center gap-4 flex-col"
        >
          <div className="w-1/2 h-18 flex items-center justify-between bg-greyClr rounded-4xl p-1 border-bdclr border">
            <div className="w-1/10 ml-4">
              <HiLink color="#c9ced6" size={22} />
            </div>
            <div className="w-9/10 flex gap-2 justify-between h-full">
              <input
                type="text"
                placeholder="Enter the link here..."
                value={originalUrl}
                onChange={(e) => setoriginalUrl(e.target.value)}
                className="w-5/6 border-none outline-none bg-transparent"
              />
              <button
                type="submit"
                className="w-1/5 bg-blueClr rounded-4xl hover:bg-blue-800 transition-colors"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                   
                      
                        <VscLoading size={30} className="animate-spin" />
                     
                   
                  </div>
                ) : (
                  "Shorten"
                )}
              </button>
            </div>
          </div>
          {error && <div className="text-red-500 animate-bounce">Error: {error}</div>}
        </form>
      </div>

      
      {shortUrl && (
        <table className="text-center">
          <thead className="bg-greyClr border-b-3  border-darkBlack">
            <tr>
              <th className="w-2/3 th">Original URL</th>
              <th className="th">Short URL</th>
              <th className="th">Clicks</th>
           
          </tr>
          </thead>
         <tbody className="text-sm">
           <tr className="bg-greyClr border-b border-bdclr mt-2">
            <td className="td"><input type="text" readOnly value={longUrl} className=" w-full border-none outline-none" /></td>
            <td className="td"> <a href={shortUrl} target="_blank">{shortUrl}</a> <button onClick={copyToClipboard} className="ml-2 p-2 rounded-full bg-gray-600 hover:bg-gray-700 transition-colors"><FaRegCopy size={16} color="white" /></button></td>
            <td className="px-6 py-3 text-center">{clicks}</td>
          </tr>
         </tbody>
        </table>
      )}
    </div>
  );
};

export default UrlShort;
