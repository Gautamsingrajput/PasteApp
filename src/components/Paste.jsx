import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes, updateToPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const disptach = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste && paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    disptach(removeFromPastes(pasteId));
  }

  return (
    <div className="mt-3 flex flex-col items-center">
      <input
        className="rounded-md p-2 bg-zinc-100 text-black mt-2 w-[67%] pl-4 focus:outline-none focus:shadow-[0px_0px_10px_rgba(0,0,0,0.7)] shadow-violet-500"
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className=" flex flex-col gap-5 m-7">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className="flex flex-col bg-white m-2 rounded-lg px-8 py-4 shadow-[0px_0px_20px_rgba(0,0,0,0.7)] shadow-violet-500 text-black" key={paste?._id}>
                <div className="ml-2 font-bold text-neutral-700">{paste.title}</div>
                <div className="ml-2 text-neutral-600">{paste.content}</div>
                <div className="flex flex-row place-content-evenly gap-4">


                  <button className="rounded-md bg-lime-300 px-5 py-1 m-2 text-[15px] hover:inset-ring-1 hover:inset-ring-lime-500 hover:shadow-[0px_0px_10px_rgba(0,0,0,0.7)] hover:shadow-lime-300" >
                    <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                  </button>


                  <button className="rounded-md bg-lime-300 px-5 py-1 m-2 text-[15px] hover:inset-ring-1 hover:inset-ring-lime-500 hover:shadow-[0px_0px_10px_rgba(0,0,0,0.7)] hover:shadow-lime-300">
                    <a href={`/pastes/${paste?._id}`}>View</a>
                  </button>


                  <button 
                  className="rounded-md bg-lime-300 px-5 py-1 m-2 text-[15px] hover:inset-ring-1 hover:inset-ring-lime-500 hover:shadow-[0px_0px_10px_rgba(0,0,0,0.7)] hover:shadow-lime-300"
                  onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>


                  <button
                  className="rounded-md bg-lime-300 px-5 py-1 m-2 text-[15px] hover:inset-ring-1 hover:inset-ring-lime-500 hover:shadow-[0px_0px_10px_rgba(0,0,0,0.7)] hover:shadow-lime-300"
                    onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard");
                    }}>Copy</button>


                  <button 
                  className="rounded-md bg-lime-300 px-5 py-1 m-2 text-[15px] hover:inset-ring-1 hover:inset-ring-lime-500 hover:shadow-[0px_0px_10px_rgba(0,0,0,0.7)] hover:shadow-lime-300"
                  onClick={() => {navigator.clipboard.writeText(window.location.href +`/${paste?._id}`);
                    toast.success("Link copied to clipboard");
                  }}
                  >
                    Share
                    </button>

                </div>

                <div>{Paste.createdAt}</div>
              </div>
            );
          })}
      </div>

    </div>
  );
};

export default Paste;
