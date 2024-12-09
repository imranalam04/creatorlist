'use client'
import { useState } from "react";
import SubmitButton from "../buttons/SubmitButton";
import SectionBox from "../layout/SectionBox";
import { FaPlus, FaSave, FaLink, FaCloudUploadAlt, FaGripLines, FaTrash } from "react-icons/fa";
import { ReactSortable } from "react-sortablejs";
import { upload } from "@/app/libs/upload.js";
import Image from "next/image";
import { savePageLinks } from "@/app/actions/pageActions.js";
import toast from "react-hot-toast";

export default function PageLinksForm({ page, user }) {
    const [links, setLinks] = useState(page.links || [])
    async function save() {
        console.log(links)
        await savePageLinks(links)
    }
    function addNewLink() {
        setLinks(prev => {
            return [...prev, { key: Date.now().toString(), title: '', subtitle: '', icon: '', url: '' }]
        })
    }

    function handleUpload(ev, linkKeyForUpload) {
        upload(ev, uploadedImageUrl => {
            setLinks(prevLinks => {
                const newLinks = [...prevLinks]
                newLinks.forEach((link, index) => {
                    if (link.key === linkKeyForUpload) {
                        link.icon = uploadedImageUrl
                    }
                })
                return newLinks
            })
        })
    }

    function handleLinkChange(keyOfLinkToChange, prop, ev) {
        setLinks(prevLinks => {
            const newLinks = [...prevLinks]
            newLinks.forEach((link) => {
                if (link.key === keyOfLinkToChange) {
                    link[prop] = ev.target.value
                }
            })
            return [...prevLinks]
        })
    }

    function removeLink(linkKeyToRemove) {
        setLinks(prevLinks => {
            const newLinks = [...prevLinks].filter(link => link.key !== linkKeyToRemove);
            return newLinks
        })
        toast.success('Link removed')
    }


    return (
        <div>
            <SectionBox>
                <form onSubmit={(ev) => {
                    ev.preventDefault();
                    save()
                }}>
                    <h2 className="text-2xl font-bold mb-4">Links</h2>
                    <button onClick={addNewLink} type="button" className="text-blue-500 text-lg flex gap-2 items-center cursor-pointer">
                        <FaPlus size={24} className="bg-blue-500 text-white p-1 rounded-full aspect-square" />
                        <span>Add New</span>
                    </button>
                    <div className="">
                        <ReactSortable list={links} setList={setLinks} className="flex flex-col gap-4">
                            {links.map((link) => {
                                return (
                                    <div key={link.key} className="mt-8 flex gap-6 items-center">
                                        <div>
                                            <FaGripLines size={24} className="inline-flex mr-2 cursor-ns-resize text-gray-700  " />
                                        </div>
                                        <div className="text-center">
                                            <div className="bg-gray-300 rounded-full relative aspect-square overflow-hidden w-16 h-16 inline-flex justify-center items-center">
                                                {link.icon && (
                                                    <Image className="object-cover w-full h-full " src={link.icon} alt={'icon'} width={64} height={64} />
                                                )}
                                                {!link.icon && (
                                                    <FaLink size={24} className="" />

                                                )}
                                            </div>
                                            <div>
                                                <input onChange={(ev) => handleUpload(ev, link.key)} id={'icon' + link.key} type="file" className="hidden" />
                                                <label htmlFor={'icon' + link.key} className="border-2 justify-center mt-2 p-2 flex items-center mb-2 cursor-pointer rounded-md mx-3 text-gray-600">
                                                    <FaCloudUploadAlt size={24} className="inline-flex mr-2" />
                                                    <span>Change icon</span>
                                                </label>
                                                <button onClick={() => removeLink(link.key)} type="button" className="bg-gray-300 py-2 px-2 mb-2 flex items-center gap-2 rounded-md">
                                                    <FaTrash size={20} className="cursor-pointer text-red-500" />
                                                    <span>Remove this link</span>
                                                </button>
                                            </div>

                                        </div>
                                        <div className="grow">
                                            <label className="input-label">Title:</label>
                                            <input value={link.title} onChange={ev => handleLinkChange(link.key, 'title', ev)} type="text" placeholder="title" />
                                            <label className="input-label">SubTitle:</label>
                                            <input type="text" value={link.subtitle} onChange={ev => handleLinkChange(link.key, 'subtitle', ev)} placeholder="subtitle (optional)" />
                                            <label className="input-label">Url:</label>
                                            <input type="text" value={link.url} onChange={ev => handleLinkChange(link.key, 'url', ev)} placeholder="url" />
                                        </div>

                                    </div>
                                )
                            })}
                        </ReactSortable>
                    </div>
                    <div className="border-t pt-4 mt-4 max-w-xs mx-auto">
                        <SubmitButton>
                            <FaSave className="inline-flex mr-2" />
                            <span>Save</span>
                        </SubmitButton>
                    </div>
                </form>
            </SectionBox>
        </div>
    )
}