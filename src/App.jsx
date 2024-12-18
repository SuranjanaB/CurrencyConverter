import { useState } from 'react'
import { InputBox } from './components'
import useCurrency from './hooks/useCurrency'
import money from './assets/money.jpg'
import logo from './assets/logo.png'

function App() {
  const [amount, setAmount] = useState(0)
  const[from,setFrom]=useState("usd")
  const[to,setTo]=useState("inr")
  const[conAmount,setConAmount]=useState(0)
  const currencyInfo=useCurrency(from)
  const options=Object.keys(currencyInfo)

  const swap = () => {
    // Store the current values before updating state
    const tempFrom = from;
    const tempTo = to;
    const tempAmount = amount;
  
    // Swap the currencies
    setFrom(tempTo);
    setTo(tempFrom);
  
    // Swap the amounts
    setAmount(conAmount); // Set amount to converted amount
    setConAmount(tempAmount); // Set converted amount to original amount
  };

  const convert=()=>{
    setConAmount(amount*currencyInfo[to])
  }
  return (
    <>
      <div className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat'
      style={{
        backgroundImage: `url(${money})`, // Using imported image path
        backgroundSize: 'cover',
      }}>
        <div className='h-36 w-36 rounded-full relative ml-[1090px] mb-[200px]' 
          style={{
            backgroundImage: `url(${logo})`, // Using imported image path
            backgroundSize: 'cover',
          }}
        />
        <div className='w-full'>
          <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
            <form onSubmit={(e)=>{
              e.preventDefault();
              convert()
            }}
            >
              <div className='w-full mb-1'>
              <InputBox label="From" amount={amount} currencyOptions={options} onCurrencyChange={(currency)=>setFrom(currency)} selectCurrency={from} onAmountChange={(amount)=>setAmount(amount)}/>

              </div>
              <div className='relative w-full h-0.5'>
                <button type='button' className='absolute left-1/2 translate-x-1/2 translate-y-1/2 border-2 border-white rounded-md bg-blue-500 text-white px-2 py-0.5' onClick={swap}>swap</button>
              </div>
              <div className='w-full mt-1 mb-4'>
              <InputBox label="To" amount={conAmount} currencyOptions={options} onCurrencyChange={(currency)=>setTo(currency)} selectCurrency={to}/>

              </div>
              <button type="submit" className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg'>Convert {from.toUpperCase()} to {to.toUpperCase()}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default App