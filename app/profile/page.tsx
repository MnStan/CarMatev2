import { apiGetAuthUser } from "@/lib/api-requests";
import { cookies } from "next/headers";
import { AuthPageInvisible } from "@/lib/protect-page";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

async function getToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return token?.value || undefined ;
}

export default async function ProfilePage() {
  const tokenValue = await getToken();
  const user = await apiGetAuthUser(tokenValue);

  return (
    <div className='flex flex-col min-h-screen'>
    <Header />
    <div className="flex flex-col items-center justify-center py-2">
      <div className="bg-gray-200 rounded-xl p-5 w-full max-w-sm sm:w-2/3 md:max-w-2/3 lg:max-w-xl flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2">Profile Page</h2>
        <div className="mt-4 text-left">
          <p><strong>Email:</strong> {user.user.email}</p>
          <p><strong>Name:</strong> {user.userInfo.name}</p>
          <p><strong>Surname:</strong> {user.userInfo.surname}</p>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
  }