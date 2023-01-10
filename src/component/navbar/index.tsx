import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import truncAddress from 'truncate-eth-address'
import { AiOutlineWallet } from 'react-icons/ai'
import  { RxCaretDown } from 'react-icons/rx'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Navbar = () => {

    const { address, isConnected } = useAccount()

    const { connect } = useConnect({
      connector: new InjectedConnector(),
      onError: (e) =>  toast.error(e.message)
    })

    const { disconnect } = useDisconnect()

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
                    <div onClick={() => disconnect()} className='w-44 flex items-center cursor-pointer'>

                        <AiOutlineWallet className='mr-2' size={"2em"} />

                        <span> {truncAddress(String(address))}  </span>    

                        <RxCaretDown className='ml-2' />

                    </div>
                )

            }

        </nav>
    )
}

export default Navbar