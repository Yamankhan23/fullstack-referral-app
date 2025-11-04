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

      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
        <div className="text-center p-8 rounded-2xl shadow-md bg-white max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4 text-blue-700">
            Welcome to the Referral System 🚀
          </h1>
          <p className="text-gray-600 mb-8">
            Register or login to start earning credits through referrals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/auth/register")}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition-colors"
            >
              Register
            </button>

            <button
              onClick={() => router.push("/auth/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
