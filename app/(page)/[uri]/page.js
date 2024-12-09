import connectToDatabase from "@/app/connect";
import { Event } from "@/app/models/Event.js";
import { Page } from "@/app/models/Page.js";
import { User } from "@/app/models/User.js";
import Image from "next/image";
import Link from "next/link";
import {
  FaDiscord,
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaMobile,
  FaTelegram,
  FaWhatsapp,
  FaYoutube,
  FaLink,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const buttonIcons = {
  email: FaEnvelope,
  mobile: FaMobile,
  instagram: FaInstagram,
  facebook: FaFacebook,
  discord: FaDiscord,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,
  github: FaGithub,
  telegram: FaTelegram,
};

function buttonLink(key, value) {
  if (key === 'mobile') {
    return `tel:` + value;
  }
  if (key === 'email') {
    return `mailto:` + value;
  }
  return value;
}

export default async function UserPage({ params }) {

  const { uri } = await params;
  await connectToDatabase();
  const page = await Page.findOne({ uri });
  const user = await User.findOne({ email: page.owner });
  await Event.create({ type: 'view', uri: uri, page: uri });




  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="relative">
          <div
            className="h-64 rounded-t-3xl bg-cover bg-center relative overflow-hidden"
            style={
              page.bgType === "color"
                ? { backgroundColor: page.bgColor }
                : { backgroundImage: `url(${page.bgImage})` }
            }
          >
            <div className="absolute inset-0 bg-black bg-opacity-30" />
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg overflow-hidden">
                <Image
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                  src={user.image}
                  alt={"avatar"}
                  width={256}
                  height={256}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-b-3xl shadow-xl p-8 mt-20">
          <h2 className="text-3xl font-bold text-center mb-2">{page.displayName}</h2>
          <h3 className="text-lg flex gap-2 justify-center items-center text-blue-200 mb-4">
            <FaLocationDot size="20" />
            <span>{page.location}</span>
          </h3>
          <div className="max-w-md mx-auto text-center my-6">
            <p className="text-lg text-blue-100">{page.bio}</p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            {Object.keys(page.buttons).map((buttonKey) => {
              const Icon = buttonIcons[buttonKey];
              return (
                <Link
                  key={buttonKey}
                  href={buttonLink(buttonKey, page.buttons[buttonKey])}
                  className="rounded-full bg-white text-blue-900 p-3 flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-blue-100"
                >
                  <Icon size={20} />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {page.links.map((link) => {
            const encodedUrl = encodeURIComponent(btoa(link.url));
            const trackingUrl = `/api/click?url=${encodedUrl}&page=${encodeURIComponent(page.uri)}`;
            return (
              <Link
                target="_blank"
                key={link.url}
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-4 flex items-center space-x-4 transition-all duration-300 ease-in-out hover:bg-opacity-20 hover:scale-105"
                href={trackingUrl}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-700 rounded-lg relative flex items-center justify-center">
                    {link.icon ? (
                      <Image
                        className="w-full h-full object-cover rounded-lg"
                        src={link.icon}
                        alt={'icon'}
                        width={64}
                        height={64}
                      />
                    ) : (
                      <FaLink className="w-8 h-8 text-white" />
                    )}
                  </div>
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-lg font-semibold truncate">{link.title}</h3>
                  <p className="text-blue-200 truncate">{link.subtitle}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
}

