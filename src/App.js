import { useState } from 'react';
import './App.css';
import DisplayBlock from './DisplayBlock';
import PriceEntryField from './PriceEntryField';
import VatRateField from './VatRateField';

function App() {
  const [netPrice, setNetPrice] = useState(0.0);
  const [grossPrice, setGrossPrice] = useState(0.0);
  const [vatToPay, setVatToPay] = useState(0.0);
  const [vatRate, setVatRate] = useState(20.0);

  const handleNetPriceChange = (price) => {
    const gross_price = price * ((vatRate / 100) + 1);
    setNetPrice(price);
    setGrossPrice(gross_price);
    setVatToPay(gross_price - price);
  };

  const handleGrossPriceChange = (price) => {
    const net_price = price / ((vatRate / 100) + 1);
    setNetPrice(net_price);
    setGrossPrice(price);
    setVatToPay(price - net_price);
  };

  const handleVatRateChanged = (rate) => {
    setVatRate(rate);
    updatePrices();
  };

  const updatePrices = () => {
    handleNetPriceChange(netPrice);
  };

  return (
    <div className='header field'>
      VAT CALCULATOR
      <table>
        <tr>
            <td colspan="4"><button id="screen"></button></td>
            <div className='colour-border'>
        <VatRateField customstyle="field" vatRateChanged={handleVatRateChanged} value={vatRate} updatePrices={updatePrices} />
        <PriceEntryField customstyle="field" label="Price excl VAT: " priceChanged={handleNetPriceChange} price={netPrice === 0.0 ? "" : netPrice} />
        <DisplayBlock customstyle="field" label="VAT to pay: " value={vatToPay} />
        <PriceEntryField customstyle="field" label="Price incl VAT: " priceChanged={handleGrossPriceChange} price={grossPrice === 0.0 ? "" : grossPrice} />
        
      </div>
      </tr>
            
        <tr>
            <td><button id="small_button">Num Lock</button></td>
            <td><button id="small_button">/</button></td>
            <td><button id="small_button">*</button></td>
            <td><button id="small_button">-</button></td>
        </tr>
        <tr>
            <td><button id="small_button_cross">7Home</button></td>
            <td><button id="small_button_flag">8&#8593;</button></td>
            <td><button id="small_button_cross">9Pg Up</button></td>
            <td rowspan="2"><button id="tall_button">+</button></td>
        </tr>
        <tr>
            <td><button id="small_button_flag">4 &#8592;</button></td>
            <td><button id="small_button_cross">5</button></td>
            <td><button id="small_button_flag">6 &#8594;</button></td>
        </tr>
        <tr>
            <td><button id="small_button_cross">1 End</button></td>
            <td><button id="small_button_flag">2 &#8595;</button></td>
            <td><button id="small_button_cross">3 Pg Dn</button></td>
            <td rowspan="2"><button id="tall_button">Enter</button></td>
        </tr>
        <tr>
            <td colspan="2"><button id="long_button">0 Ins</button></td>
            <td><button id="small_button">. Del</button></td>
        </tr>

    </table>
    </div>



  );
}

export default App;
