import { useEffect, useState } from "react"
import API from "../api/axios";
import { FaRegCopy } from "react-icons/fa";


const UrlsHistory = () => {
    const [urls, seturls] = useState([]);
    const backend_url = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
     const getUrlHistory = async () => {
        try {
            const response = await API.get('/api/urls');
            console.log(response.data)
           if(response.data){
            
                console.log("Response data:", response.data);
                seturls(response.data)
            
           }
           console.log(urls)
            
        } catch (error) {
            console.error(error)
        }
        
     }
     getUrlHistory();
    }, []);
    useEffect(() => {
        console.log("URLs state updated:", urls);
        console.log("Number of URLs in state:", urls.length);
    }, [urls]);

    const copyToClipboard = async (url) => {
    if (urls) {
      try {
        await navigator.clipboard.writeText(`${backend_url}/${url.UrlId}`);
        alert("Copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy:", err);
        alert("Failed to copy to clipboard");
      }
    }
  };
    
  return (
    <div className="w-screen flex items-center flex-col p-10">
       
         <h1 className="font-bold text-xl">History({urls.length})</h1>
       
       {urls.length > 0 &&
        <table className="text-center w-full mt-6">
                 <thead className="bg-greyClr border-b-3   rounded border-darkBlack">
                   <tr>
                     <th className="w-2/3 th rounded-tl-2xl">Original URL</th>
                     <th className="th">Short URL</th>
                     <th className="th rounded-tr-2xl">Clicks</th>
                  
                 </tr>
                 </thead>
                <tbody className="text-sm">
                    {urls.map(url => 
                    <tr
                    key={url.UrlId}
                     className="bg-greyClr border-b border-bdclr mt-2">
                         <td className="td"><input type="text" readOnly value={url.OriginalUrl} className=" w-full border-none outline-none" /></td>
                   <td className="td"> <a href={`${backend_url}/${url.UrlId}`} target="_blank">{`${backend_url}/${url.UrlId}`}</a> <button onClick={() => copyToClipboard(url)} className="ml-2 p-2 rounded-full bg-gray-600 hover:bg-gray-700 transition-colors"><FaRegCopy size={16} color="white" /></button></td>
                   <td className="px-6 py-2 text-center">{url.Clicks}</td>
                    </tr>
                    )}
                </tbody>
               </table>
       }
    </div>
   
  )
}

export default UrlsHistory