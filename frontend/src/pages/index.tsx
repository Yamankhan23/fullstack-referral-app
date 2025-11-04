import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Referral System</title>
        <meta name="description" content="Full Stack Referral App" />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5FA] text-[#2F2E41] px-6">
        <div className="text-center p-10 rounded-2xl shadow-lg bg-white max-w-md w-full border border-[#E5E5F0]">
          <h1 className="text-3xl font-bold mb-4 text-[#6C63FF]">
            Welcome to the Referral System
          </h1>
          <p className="text-[#2F2E41]/80 mb-8">
            Earn rewards by inviting others to join. Get started below!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/auth/register")}
              className="bg-[#6C63FF] hover:bg-[#584CF8] text-white py-2 px-6 rounded-lg font-semibold transition-all duration-200 shadow-md"
            >
              Register
            </button>

            <button
              onClick={() => router.push("/auth/login")}
              className="border-2 border-[#6C63FF] hover:bg-[#6C63FF] hover:text-white text-[#6C63FF] py-2 px-6 rounded-lg font-semibold transition-all duration-200"
            >
              Login
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
