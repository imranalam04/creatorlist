"use client";

import Image from "next/image";
import { useState } from "react";
import { CloudUpload } from 'lucide-react';
import { savePageSettings } from "@/app/actions/pageActions";
import toast from "react-hot-toast";
import RadioTogglers from "../formitems/radioTogglers";
import SectionBox from "../layout/SectionBox";
import { upload } from "@/app/libs/upload.js";

export default function PageSettingForm({ page, user }) {
    const [bgType, setBgType] = useState(page.bgType);
    const [bgColor, setBgColor] = useState(page.bgColor);
    const [bgImage, setBgImage] = useState(page.bgImage);
    const [avatar, setAvatar] = useState(user?.image);


    async function saveBaseSettings(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const result = await savePageSettings(formData);
        if (result) {
            toast.success('Settings saved successfully');
        }
    }


    async function handleCoverImageChange(ev) {
        await upload(ev, link => {
            setBgImage(link)
        });
    }

    async function handleAvatarImageChange(ev) {
        await upload(ev, link => {
            setAvatar(link)
        })
    }

    return (
        <div>
            <SectionBox>
                <div className="max-w-10xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <form onSubmit={saveBaseSettings} className="space-y-6">
                        <div
                            className="h-64 flex justify-center items-center bg-cover bg-center transition-all duration-300 ease-in-out"
                            style={bgType === 'color' ? { backgroundColor: bgColor } : { backgroundImage: `url(${bgImage})` }}
                        >
                            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
                                <RadioTogglers
                                    defaultValue={page.bgType}
                                    options={[
                                        { value: "color", label: "Color" },
                                        { value: "image", label: "Image" },
                                    ]}
                                    onChange={val => setBgType(val)}
                                />
                                {bgType === "color" && (
                                    <div className="mt-4 flex items-center justify-center space-x-2">
                                        <span className="text-gray-700 font-medium">Background color:</span>
                                        <input
                                            type="color"
                                            onChange={ev => setBgColor(ev.target.value)}
                                            name="bgColor"
                                            defaultValue={page.bgColor}
                                            className="w-10 h-10 rounded cursor-pointer"
                                        />
                                    </div>
                                )}
                                {bgType === 'image' && (
                                    <div className="mt-4 flex justify-center">
                                        <label className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out cursor-pointer">
                                            <input type="hidden" name="bgImage" value={bgImage} />
                                            <input type="file" onChange={handleCoverImageChange} className="hidden" />
                                            <CloudUpload className="inline-block mr-2" />
                                            Change Image
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="relative -mt-16 flex justify-center">
                            <div className="relative -top-8 w-[128px] h-[128px] ">
                                <div className="overflow-hidden h-full rounded-full border-4 border-white shadow shadow-black/50">
                                    <Image
                                        className="w-full h-full object-cover rounded-full"
                                        objectFit="cover"
                                        src={avatar}
                                        alt="User avatar"
                                        width={128}
                                        height={128}
                                    />
                                </div>
                                <label htmlFor="avatarIn" className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition duration-300 ease-in-out">
                                    <CloudUpload size={20} />
                                </label>
                                <input onChange={handleAvatarImageChange} type="file" className="hidden" id="avatarIn" />
                                <input type="hidden" name="avatar" value={avatar} />
                            </div>
                        </div>

                        <div className="px-8 pb-8 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nameIn">
                                    Display name
                                </label>
                                <input
                                    type="text"
                                    id="nameIn"
                                    placeholder="John Doe"
                                    name="displayName"
                                    defaultValue={page.displayName || ""}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="locationIn">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    id="locationIn"
                                    placeholder="Somewhere in the world"
                                    name="location"
                                    defaultValue={page.location || ""}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="bioIn">
                                    Bio
                                </label>
                                <textarea
                                    id="bioIn"
                                    placeholder="Your bio goes here..."
                                    name="bio"
                                    defaultValue={page.bio || ""}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </SectionBox>

        </div>
    );
}

