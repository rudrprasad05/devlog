import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col justify-center bg-[url(/hero.png)] dark:bg-[url(/hero.png)] h-[90vh] bg-cover">
      <div className="px-32">
        <h1 className="text-6xl text-muted-foreground">
          <span className="text-primary">Dev</span>Log
        </h1>
        <h2 className="text-4xl py-3 text-muted-foreground">
          The go to <span className="text-primary">Blog</span> For Anything
          Computer
        </h2>
      </div>
    </div>
  );
};

export default Hero;
