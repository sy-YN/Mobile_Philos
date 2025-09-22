
'use client';

import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/app-shell';

export default function LoginPage() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/home');
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background p-4 sm:p-8">
        <AppShell>
            <div
                className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center overflow-hidden bg-gray-900 text-white"
                onClick={handleStart}
            >
                <div className="absolute inset-0 z-0">
                    <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
                    <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center text-center">
                    <h1 className="mb-4 font-headline text-6xl font-bold tracking-tighter text-white animate-fade-in-down">
                    Philos
                    </h1>
                    <p className="font-body text-lg text-gray-300 animate-fade-in-up">
                    タップで始める
                    </p>
                </div>

                <style jsx>{`
                    @keyframes fade-in-down {
                    0% {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    }
                    @keyframes fade-in-up {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    }
                    .animate-fade-in-down {
                    animation: fade-in-down 0.8s ease-out both;
                    animation-delay: 0.2s;
                    }
                    .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out both;
                    animation-delay: 0.4s;
                    }
                `}</style>
            </div>
        </AppShell>
    </main>
  );
}
