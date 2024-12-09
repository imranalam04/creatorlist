'use client'
import React, { useState } from 'react'
import SectionBox from '../layout/SectionBox'
import { Mail, Plus, Smartphone, Instagram, Facebook } from 'lucide-react'
import { FaTiktok, FaDiscord, FaYoutube, FaWhatsapp, FaGithub, FaTrash, FaGripLines, FaTelegram, FaSave, FaFacebook, FaInstagram, FaMobile, FaEnvelope } from "react-icons/fa";
import SubmitButton from '../buttons/SubmitButton';
import { savePageButtons } from '@/app/actions/pageActions';
import toast from 'react-hot-toast';
import { ReactSortable } from "react-sortablejs";




export const allButtons = [
    { key: 'email', 'label': 'e-mail', icon: Mail, placeholder: 'test@example.com' },
    { key: 'mobile', 'label': 'mobile', icon: Smartphone, placeholder: '+1 234 567 890' },
    { key: 'instagram', 'label': 'instagram', icon: Instagram, placeholder: 'https://instagram.com/...' },
    { key: 'facebook', 'label': 'facebook', icon: Facebook },
    { key: 'tiktok', 'label': 'tiktok', icon: FaTiktok, },
    { key: 'discord', 'label': 'discord', icon: FaDiscord },
    { key: 'youtube', 'label': 'youtube', icon: FaYoutube },
    { key: 'whatsapp', 'label': 'whatsapp', icon: FaWhatsapp },
    { key: 'github', 'label': 'github', icon: FaGithub },
    { key: 'telegram', 'label': 'telegram', icon: FaTelegram },
];


const PageButtonsForm = ({ user, page }) => {

    const pageSavedButtonKeys = Object.keys(page.buttons || {})
    const pageSavedButtonInfo = pageSavedButtonKeys.map(key => allButtons.find(b => b.key === key))

    const [activeButtons, setActiveButtons] = useState(pageSavedButtonInfo)


    function addButtonToProfile(button) {
        setActiveButtons(prevButtons => [...prevButtons, button])
    }

    const availableButtons = allButtons.filter(b1 => !activeButtons.find(b2 => b1.key === b2.key));

    function upperFirst(str) {
        return str.slice(0, 1).toUpperCase() + str.slice(1)
    }

    async function saveButtons(formData) {
        await savePageButtons(formData)
        toast.success("Setting's saved")
    }

    function removeButton({ key }) {
        setActiveButtons(prevButtons => prevButtons.filter(b => b.key !== key))
    }

    return (
        <div>
            <SectionBox>
                <form action={saveButtons}>
                    <h2 className='text-2xl font-bold mb-4'>Buttons</h2>
                    <ReactSortable list={activeButtons} setList={setActiveButtons} className='flex flex-col gap-4'>
                        {activeButtons.map(b => (
                            <div key={b.key} className='mb-4 flex items-center border-2'>
                                <div className='w-48 flex p-2 gap-2 items-center text-gray-700'>
                                    <FaGripLines size={24} className='inline-flex mr-2 cursor-pointer' />
                                    <b.icon size={24} className="inline-flex" />
                                    <span>
                                        {upperFirst(b.label)}:
                                    </span>
                                </div>
                                <input defaultValue={page.buttons[b.key]} name={b.key} placeholder={b.placeholder} type='text' style={{ marginBottom: 0 }} />
                                <button onClick={() => removeButton(b)} type='button' className='py-2 px-4 border-2 bg-gray-300 cursor-pointer'>
                                    <FaTrash size={20} className='mx-1 text-red-500' />
                                </button>
                            </div>
                        ))}
                    </ReactSortable>

                    <div className='flex flex-wrap gap-2 mt-4 border-y pt-4'>
                        {availableButtons.map((button) => {
                            return (
                                <div className='' key={button.key}>
                                    <button  type='button' onClick={() => addButtonToProfile(button)} className='flex gap-1 p-2 items-center bg-gray-200'>
                                        <button.icon size={24} />
                                        <span className=''>{upperFirst(button.label)}</span>
                                        <Plus size={24} />
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                    <div className='max-w-xs mx-auto mt-8'>
                        <SubmitButton >
                            <FaSave className="inline-flex mr-2" />
                            <span>Save</span>
                        </SubmitButton>
                    </div>
                </form>

            </SectionBox>
        </div>
    )
}

export default PageButtonsForm