import React, { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from "../redux/pasteSlice";


const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  const allPastes = useSelector((state) => state.paste.pastes);

  console.log("All paste ids",allPastes);
  console.log("Paste Id: ",pasteId);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p?._id == pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      } else {
        console.warn('No paste found with the given pasteId:', pasteId);
      }
    }
  }, [pasteId, allPastes]);

  function createPaste(){
    const paste = {
        title: title,
        content: value,
        _id: pasteId ||
        Date.now().toString(36), 
        createdAt: new Date().toISOString(),
    }

  if(pasteId){
    //update
    dispatch(updateToPastes(paste));
  }
  else{
    //create
    dispatch(addToPastes(paste));
  }

  //after creation or updation
    setTitle("");
    setValue("");
    setSearchParams({});

}

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className="flex flex-row justify-around gap-8 p-4">
        <input
          className="w-32 md:w-72 lg:w-82 rounded-md p-1 bg-zinc-100 text-black mt-2 pl-4 focus:outline-none focus:shadow-[0px_0px_10px_rgba(0,0,0,0.7)] shadow-violet-500"
          type="text"
          placeholder="enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className=" md:w-32 lg:w-48 rounded-xl bg-zinc-100  hover:shadow-[0px_0px_10px_rgba(0,0,0,0.7)] shadow-violet-500 hover:inset-ring-1 inset-ring-violet-500 text-black p-2 mt-2" onClick={createPaste}>
          {pasteId ? "Update" : "Create"}
        </button>
      </div>

      <div className="mt-8">
        <textarea
          className="w-65 md:w-124 lg:w-150 rounded-xl bg-zinc-100 focus:outline-none focus:shadow-[0px_0px_40px_rgba(0,0,0,0.7)] shadow-violet-500 text-black p-4 mt-4"
          value={value}
          placeholder="enter paste here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
