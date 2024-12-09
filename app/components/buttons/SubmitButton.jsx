import {useFormStatus} from 'react-dom'
export default function SubmitButton({ children }) {
   const {pending} =  useFormStatus()
    return (
        <div>
            <button
                type="submit"
                disabled={pending}
                className="bg-blue-500 disabled:bg-blue-200 disabled:text-gray-200 w-full text-white py-2 px-4 block mx-auto"
            >
                {children} 
            </button>
        </div>
    )
}