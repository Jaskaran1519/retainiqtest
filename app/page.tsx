import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Link href="/demo">
        <h1 className="text-3xl">Demo</h1>
      </Link>
    </div>
  );
};

export default page;
