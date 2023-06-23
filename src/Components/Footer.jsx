import React from "react";

export default function Footer() {
  const getYear = () => {
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    return `© ${currentYear} Sls. All rights reserved.`;
  };

  return <footer className="w-full text-center">copyright {getYear()}</footer>;
}
