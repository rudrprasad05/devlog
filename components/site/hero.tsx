import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="bg-repeat bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] h-[90vh] bg-opacity-50 grid place-items-center">
      <div className="h-full w-full bg-background/85 flex">
        <div className="w-4/5 mx-auto flex justify-between items-center">
          <div className="">
            <h1 className="text-6xl text-muted-foreground">
              <span className="text-primary">Dev</span>Log
            </h1>
            <h2 className="text-4xl py-3 text-muted-foreground">
              The go to <span className="text-primary">Blog</span> For Anything
              Computer
            </h2>
          </div>
          <div>
            <Image
              src={"/hero-1.png"}
              alt="hero image"
              height={250}
              width={250}
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
