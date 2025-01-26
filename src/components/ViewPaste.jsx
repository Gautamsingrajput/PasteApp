import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from "../redux/pasteSlice";



const ViewPaste = () => {

  const {id} = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p) => p?._id === id)[0];



  return (
    <div>

    <div className="flex flex-row justify-around gap-8 p-4">
      <input
        className="w-32 md:w-72 lg:w-82 rounded-md p-1 bg-zinc-100 text-black mt-2 w-[67%] pl-4 shadow-[0px_0px_10px_rgba(0,0,0,0.7)] shadow-violet-500"
        type="text"
        placeholder="enter title here"
        value={paste.title}
        disabled
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>

    <div className="mt-8">
      <textarea
         className="w-65 md:w-124 lg:w-150 rounded-xl bg-zinc-100 shadow-[0px_0px_40px_rgba(0,0,0,0.7)] shadow-violet-500 text-black p-4 mt-4 min-w-[500px]"
        value={paste.content}
        placeholder="enter paste here"
        disabled
        onChange={(e) => setValue(e.target.value)}
        rows={20}
      />
    </div>
  </div>
  )
}

export default ViewPaste