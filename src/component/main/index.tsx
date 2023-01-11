import React, { useState } from "react"
import { useAccount } from 'wagmi'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Main = () => {

    const { address, isConnected } = useAccount()

    const [text, setText] = useState("")
    const [sig, setSig] = useState("")

    const handleChange = (e:  React.FormEvent<HTMLTextAreaElement>) =>{
        setText(e.currentTarget.value)
    }

    const sign =  async () => {

        if (window.ethereum) {

            try {

                const result = await  window.ethereum.request({ 
                    method: "personal_sign" as any, params: [address as any, text]
                })
                
                setSig(String(result))
                
            } catch (error) {
                toast.error("eer")
            }

        } else {
            toast.error("Please Install Metamask or an injected provider")
        }
   
    }

    const copyContent = async () => {
        try {
          await navigator.clipboard.writeText(sig);
          toast.success("Signature Copied!!!")
        } catch (err) {
          console.error('Failed to copy: ', err);
          toast.error("Error copying signature!!!")
        }
      }


    return (
        <div className="flex justify-center">

            <div className="max-w-[1024px]">

                <div className="grid grid-cols-1 md:grid-cols-2">

                    <div data-aos="slide-right" className="rounded-lg mt-10 p-10 mix-blend-hard-light shadow-lg">
    
                        <h2 className="mb-4 text-xl">Enter Message you want to sign </h2>

                        <textarea 
                            onChange={handleChange}
                            value={text}
                            placeholder="Paste the message you want to sign here"
                            className="rounded-lg w-full h-40 bg-[#313336] outline-none p-2 md:p-4 resize-none"/>

                        <button 
                            disabled={!isConnected}
                            onClick={sign}
                            className="mt-4 w-full h-12 rounded-lg px-10 py-2 bg-cyan-600 hover:bg-cyan-500"
                            > Sign Transaction </button>

                    </div>

                    <div data-aos="slide-left" className="rounded-lg mt-10 p-10 mix-blend-hard-light shadow-lg">
    
                        <h2 className="mb-4 text-lg">Output Signature </h2>

                        <textarea value={sig} className="rounded-lg w-full h-40 bg-[#313336] outline-none p-2 md:p-4 resize-none" />

                        <button 
                            onClick={copyContent}
                            className="mt-4 w-32 h-12 rounded-lg px-10 py-2 bg-yellow-600 hover:bg-yellow-500"
                            > Copy </button>

                        </div>

                </div>

            </div>


        </div>
    )
}

export default Main