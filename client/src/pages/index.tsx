"use client";
import { useEffect, useState } from "react";
import "@uploadcare/react-uploader/core.css";
import { Button } from "@/components/ui/button";

const API = "http://localhost:4000";

export default function Home() {
  const [fileUrl, setFileUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<"idle" | "ok" | "err">("idle");

  async function sendFiles(files: FileList | null) {
    const file = files?.[0];
    const fd = new FormData();

    if (!file) {
      console.log("no file");
      return;
    }

    fd.append("file", file);
    const res = await fetch(`${API}/upload`, {
      method: "POST",
      body: fd,
    });
    if (!res.ok) throw new Error("Upload échoué");
    const responseData = await res.json();
    setFileUrl(responseData.fileUrl);
    console.log("fileUrl:", responseData.fileUrl);
    setLoading(true);
  }

  useEffect(() => {
    if (fileUrl) {
      console.log(fileUrl);
    }
  }, [fileUrl]);

  function handleDownload(file: string) {
    window.location.href = `${API}/download/${encodeURIComponent(file)}`;
  }

  async function copyLink(file: string) {
    if (!file) return;
    try {
      await navigator.clipboard.writeText(file);
      setCopied("ok");
      console.log("copied");
    } catch (error) {
      setCopied("err");
      console.log(error);
    } finally {
      setTimeout(() => setCopied("idle"), 1500);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 dark:bg-[#121826] ">
      <div
        className={
          "w-auto max-w-md p-2 rounded-sm shadow-2xl flex flex-col items-center dark:bg-[#212936] hover:bg-gray-50"
        }
      >
        <div
          className={
            loading
              ? "hidden"
              : "w-full flex flex-col items-center text-center rounded-lg border-2 border-dashed px-10 py-10 sm:px-20 sm:py-25"
          }
        >
          <img className="mb-4" src="/exit.svg" alt="exit" />
          <label className="font-bold text-sm mb-1 sm:text-base">
            Drag & drop a file or {""}
            <span className="text-blue-500">
              browse file
              <input
                type="file"
                name="file"
                className="hidden"
                onChange={(event) => sendFiles(event.target.files)}
              />
            </span>
          </label>
          <p className="font-light text-xs sm:text-sm text-gray-500">
            JPG, PNG or GIF - Max file size 2Mo
          </p>
        </div>
      </div>
      <div
        className={
          loading
            ? " flex flex-col items-center w-auto max-w-sm p-2  "
            : "hidden"
        }
      >
        <img
          className="w-full h-full rounded-sm shadow-2xl  "
          src={fileUrl}
          alt="file"
        />
        <div className="flex gap-2 mt-4">
          <Button
            className="bg-blue-600 hover:bg-blue-800 transition duration-300 hover:cursor-pointer font-bold dark:text-white"
            onClick={() => {
              copyLink(fileUrl!);
            }}
          >
            <img src="/Link.svg" alt="share" /> Share
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-800 transition duration-300 hover:cursor-pointer font-bold dark:text-white"
            onClick={() => {
              handleDownload(fileUrl!);
            }}
          >
            <img src="/download.svg" alt="download" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}
