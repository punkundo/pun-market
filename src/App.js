import './App.css';
import { Route, Routes } from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from './components/Footer/Footer';

import MainContainer from './components/MainContainer/MainContainer';
import { AnimatePresence } from 'framer-motion';
import { getAllItems, getSectionDataFindId } from './utils/firebaseFunctions';
import { useStateValue } from './context/StateProvider';
import { actionType } from './context/reducer';
import { useEffect } from 'react';
import CreateItemContainer from './components/CreateItemContainer/CreateItemContainer';
import DetailItem from './components/DetailItem/DetailItem';
import { PaymentContainer } from './components';

function App() {

  const [{user, sectionData}, dispatch] = useStateValue()
  const fetchData = async() => {
    await getAllItems().then(data => {
      dispatch({
        type: actionType.SET_MARKET_ITEMS,
        marketItems: data,
      })
    })
    // await getSectionDataFindId(user.uid).then(data => {
    //   const newData = data.filter(d => d.uid == user.uid)
    //   console.log('data', newData)
    //   dispatch({
    //     type: actionType.SET_SECTION_DATA,
    //     sectionData: newData,
    //   })
    // })
  }

  // console.log(sectionData)

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateItemContainer />} />
            <Route path="/payment" element={<PaymentContainer />} />
            <Route exact path="/item/:id" element={<DetailItem />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </AnimatePresence>
    
  );
}

export default App;
