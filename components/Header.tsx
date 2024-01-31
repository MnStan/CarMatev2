"use client";

import Link from "next/link";
import useSession from "@/lib/useSession";
import useStore from "@/store";
import { apiLogoutUser } from "@/lib/api-requests";
import { useRouter } from "next/navigation";

const Header = () => {
  const store = useStore();
  const user = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    store.setRequestLoading(true);
    try {
      await apiLogoutUser();
    } catch (error) {
    } finally {
      store.reset();
      router.push("/login");
    }
  };

  return (
    <>
      <header className="bg-white h-20">
        <nav className="h-full flex justify-between container items-center">
          <div>
            <Link href="/" className="text-ct-dark-600 text-2xl font-semibold">
              CarMate
            </Link>
          </div>
          <ul className="hidden sm:flex items-center gap-4">
            <li>
              <Link href="/" className="text-ct-dark-600">
                Strona główna
              </Link>
            </li>
            {!user && (
              <>
                <li>
                  <Link href="/register" className="text-ct-dark-600">
                    Rejestracja
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-ct-dark-600">
                    Logowanie
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <Link href="/addCar" className="text-ct-dark-600">
                    Dodaj ogłoszenie
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="text-ct-dark-600">
                    Profil
                  </Link>
                </li>
                <li className="cursor-pointer" onClick={handleLogout}>
                  Wyloguj
                </li>
              </>
            )}
          </ul>
          {/* Ikona menu dla urządzeń mobilnych */}
          <div className="sm:hidden">
            <button className="text-ct-dark-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
