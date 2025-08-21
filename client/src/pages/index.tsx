"use client";
import { use, useEffect, useState } from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

export default function Home() {
  const [files, setFiles] = useState([]);

  function handleClick() {
    console.log("coucou");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 ">
      <div className="w-auto max-w-md p-2 rounded-sm shadow-2xl flex flex-col items-center hover:bg-gray-50">
        <div className="w-full flex flex-col items-center text-center rounded-lg border-2 border-dashed px-10 py-10 sm:px-20 sm:py-25 ">
          <img
            onClick={handleClick}
            className="mb-4"
            src="/exit.svg"
            alt="exit"
          />
          <label className="font-bold text-sm mb-1 sm:text-base">
            Drag & drop a file or {""}
            <span className="text-blue-500">
              browse file
              <input type="file" name="file" />
            </span>
          </label>
          <p className="font-light text-xs sm:text-sm text-gray-500">
            JPG, PNG or GIF - Max file size 2MB
          </p>
        </div>
      </div>
    </div>
  );
}
