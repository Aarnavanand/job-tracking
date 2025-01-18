import { SignIn } from "@clerk/nextjs";
// import { Logo } from '@/components/logo'; // Assuming you have a logo component

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center py-16 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <SignIn afterSignInUrl="/dashboard" />
      </div>
    </div>
  );
}
