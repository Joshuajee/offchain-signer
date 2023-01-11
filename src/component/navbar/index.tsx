import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import truncAddress from 'truncate-eth-address'
import { AiOutlineWallet } from 'react-icons/ai'
import  { RxCaretDown } from 'react-icons/rx'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'


const Navbar = () => {

    const { address, isConnected } = useAccount()
    const [show, setShow] = useState(false)

    const { connect } = useConnect({
      connector: new InjectedConnector(),
      onError: (e) =>  toast.error(e.message)
    })

    const { disconnect } = useDisconnect()

    const close  = () => {
        setShow(false)
    }

    return (
        <nav className="px-4 py-4 md:py-4 md:px-20 w-full flex justify-between shadow-lg">
            
            <div className="py-2 md:py-0 text-xl md:text-2xl">
                Offchain Signer
            </div>

            {

                !isConnected && <button
                    onClick={() => connect()}
                    className="rounded-lg px-10 py-2 bg-cyan-600 hover:bg-cyan-500"
                    > Connect </button>
            }

            {

                isConnected &&  (
                    <div onClick={() => setShow(!show)} className='w-44 flex items-center cursor-pointer'>

                        <AiOutlineWallet className='mr-2' size={"2em"} />

                        <span> {truncAddress(String(address))}  </span>    

                        <RxCaretDown className='ml-2' />

                    </div>
                )

            }

            <div className={`${show ? "" : "hidden"} absolute right-10 top-20 w-4/5 border-solid border-2 bg-[#1f2229] max-w-[400px] z-10`}>
                
                <h2 className='border-b-2 text-sm p-2 border-r-slate-800'>ACTIVE ACCOUNT</h2>

                <div className='p-4'>
         
                    <div className='flex justify-between my-2'> 

                        <div>Metamask</div>
                     
                        <p>{truncAddress(String(address))} </p>
                        
                    </div> 

                    <button 
                        onClick={() => { disconnect(); close(); }} 
                        className='w-full bg-red-500 hover:bg-red-600 rounded-lg p-2'> Disconnect Wallet </button>

                </div>

            </div>

        </nav>
    )
}

export default Navbar