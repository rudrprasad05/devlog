"use client";

import Image from "next/image";
import { IoMenuOutline } from "react-icons/io5";
import MobileNav from "./MobileNav";
import { NavigationMenuDemo } from "./NavigationMenu";
import AuthButton from "./authButton";

const DropDownNav = () => {
  return (
    <nav className="z-50 w-screen bg-card">
      <main className="hidden md:flex z-50 items-center justify-between h-[15vh]  mx-auto w-4/5">
        <div className="">
          <Image src={"/logo.png"} alt="MC Tech" height={30} width={30} />
        </div>
        <div className="flex gap-10">
          <NavigationMenuDemo />
        </div>

        <div>
          <AuthButton />
        </div>
      </main>

      <main className="flex items-center justify-between w-4/5 mx-auto pt-10 md:hidden">
        <div>McTech</div>
        <div className="flex gap-5">
          <MobileNav>
            <IoMenuOutline className="h-8 w-8" />
          </MobileNav>
        </div>
      </main>
    </nav>
  );
};

export default DropDownNav;
