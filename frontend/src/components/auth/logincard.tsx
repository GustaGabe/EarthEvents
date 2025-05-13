"use client";
import { ChevronRight, LogIn } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export const LoginCard = () => {
      const { data: session, status } = useSession();
    return(
            <div className="min-h-screen flex items-center justify-center">
      <div className="bg-black rounded-xl shadow-lg p-8 w-full max-w-md border border-gray-600 transform transition duration-300 hover:shadow-xl">
        <div className="flex items-center justify-center mb-6">
          <div className="h-12 w-12 bg-blue-800 rounded-full flex items-center justify-center">
            <LogIn className="h-6 w-6 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Bem-vindo
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Acesse dados em tempo real sobre eventos naturais acontecendo ao redor do mundo
        </p>

        {!session ? (
          <button
            onClick={() => signIn('google')} // Inicia o login com o Google
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200 mb-4 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 186.69 190.5">
              <g transform="translate(1184.583 765.171)">
                <path d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z" fill="#4285f4"/>
                <path d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z" fill="#34a853"/>
                <path d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.695-24.592 31.695-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z" fill="#fbbc05"/>
                <path d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z" fill="#ea4335"/>
              </g>
            </svg>
            Faça login com o Google
            <ChevronRight className="h-4 w-4 opacity-70" />
          </button>
        ) : (
          <div className="flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200 mb-4 font-medium">
            <p>Olá, {session.user?.name}</p>
            <button onClick={() => signOut()} className="ml-4 text-red-500">Sair</button>
          </div>
        )}
      </div>
    </div>
    )
}