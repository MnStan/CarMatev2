import { apiGetAuthUser } from "@/lib/api-requests";
import { cookies } from "next/headers";
import { AuthPageInvisible } from "@/lib/protect-page";
import Header from "@/components/Header";

async function getToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return token?.value || undefined ;
}

export default async function ProfilePage() {
  const tokenValue = await getToken();
  const user = await apiGetAuthUser(tokenValue);

  return (
    <>
    <Header />
      <section className="bg-ct-blue-600  min-h-screen pt-20">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          <div>
            <p className="mb-3 text-5xl text-center font-semibold">
              Profile Page
            </p>
            <div className="mt-8">
              <p className="mb-3">Id: {user.user.user_id}</p>
              <p className="mb-3">Email: {user.user.email}</p>
              <p className="mb-3">Name: {user.userInfo.name}</p>
              <p className="mb-3">Surname: {user.userInfo.surname}</p>
              <p className="mb-3 w-80">token: {tokenValue}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
  }