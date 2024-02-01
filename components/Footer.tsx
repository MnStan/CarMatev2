"use client"

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white mt-auto">
      <div className="flex-grow"></div>
      <nav className="container mx-auto py-4 flex justify-center">
        <ul className="flex flex-wrap justify-center gap-4 sm:flex-nowrap">
          <li>
            <Link href="/terms" className="text-ct-dark-600">
              Regulamin
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="text-ct-dark-600">
              Polityka Prywatności
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-ct-dark-600">
              Kontakt
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
