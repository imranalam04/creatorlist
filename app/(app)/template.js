import { getServerSession } from "next-auth"
import '../globals.css'
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Image from "next/image"
import AppSidebar from "../components/layout/AppSidebar"
import { Toaster } from "react-hot-toast"
import connectToDatabase from "../connect"
import { Page } from "../models/Page.js"
import { FaLink } from "react-icons/fa"
import Link from "next/link"

export const metadata = {
  title: 'Creators Hub',
  description: 'Generated by Next.js',
}

export default async function AppTemplate({ children }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/')
  }

  connectToDatabase()
  const page = await Page.findOne({ owner: session.user.email })

  return (
    <html lang="en">
      <body className="bg-gray-900">
        <Toaster />
        <div className="flex">
          <aside className="w-64 bg-white border-r shadow-sm pt-7 ">
            <div className="sticky top-0 pt-2">
              <div className="flex flex-col h-full">
                <div className="p-4">
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <Image
                      src={session.user.image}
                      alt="User avatar"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  {page && (
                    <Link target="_blank" href={"/" + page.uri} className="text-center mt-4 flex gap-2 items-center justify-center">
                      <FaLink size={16} className="inline-flex mr-2 cursor-ns-resize text-blue-500  " />
                      <span>/</span>
                      <span>{page.uri}</span>
                    </Link>
                  )}

                  <h2 className="text-xl font-semibold text-center text-gray-800">
                    {session.user.name}
                  </h2>
                  <p className="text-sm text-center text-gray-500">
                    {session.user.email}
                  </p>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <AppSidebar />
                </div>
              </div>
            </div>
          </aside>
          <div className="grow">
            {children}
          </div>

        </div>
      </body>
    </html>
  )
}
