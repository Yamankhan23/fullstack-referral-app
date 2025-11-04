import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Referral System</title>
        <meta name="description" content="Full Stack Referral App" />
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">
          Referral System 🚀
        </h1>
        <p className="text-lg">Frontend is up and running successfully!</p>
      </main>
    </>
  );
}
