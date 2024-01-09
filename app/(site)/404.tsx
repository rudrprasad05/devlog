import DropDownNav from "@/components/navbar/DropDownNav";
import Footer from "@/components/navbar/Footer";
import React from "react";

const Custom404 = () => {
  return (
    <div>
      <DropDownNav />
      <div className="h-[85vh]">404 error</div>
      <Footer />
    </div>
  );
};

export default Custom404;
