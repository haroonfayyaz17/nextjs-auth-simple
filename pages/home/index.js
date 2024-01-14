"use client";
import { getUserInfo } from "@/utils";

function Home() {
  return (
    <div className="min-h-screen flex col items-center justify-center">
      You have logged in successfully! This is the home page. Welcome
      &nbsp;<span className="font-bold text-blue-700">{getUserInfo()?.email}</span>!
    </div>
  );
}

export default Home;
