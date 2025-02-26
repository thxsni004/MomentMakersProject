import { useEffect, useState } from "react";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Front from './Front';
import Contact from './Contact';
import Aboutus from './Aboutus';
import Muslim from './Muslim';
import Christian from './Christian';
import Hindu from './Hindu';
import Destination from './Destination';
import Hindubridepack from './Hindubridepack';
import Hindugroompack from './Hindugroompack';
import Muslimbridepack from './Muslimbridepack';
import Muslimgroompack from './Muslimgroompack';
import Christianbride from './Christianbride';
import Christiangroom from './Christiangroom';
import Services from './Services';
import Admin from './Admin';
import AdminPanel from './Admin';
import AdminStage from './AdminStage';
import AddList from './AddList';
import AdminPage from './AdminPage';
import Orders from './Orders';
import HinduBrideOrder from './HinduBrideOrder';
import HinduGroomOrder from './HinduGroomOrder';
import ChristianBrideOrder from './ChristianBrideOrder';
import ChristianGroomOrder from './ChristianGroomOrder';
import MuslimBrideOrder from './MuslimBrideOrder';
import MuslimGroomOrder from './MuslimGroomOrder';
import DestinationOrder from './DestinationOrder';
import PackageList from './PackageList';
import SettingList from './SettingList';
import CameraList from './CameraList';
import Adminlogin from './Adminlogin';
import Logout from './Logout';
import CartPage from './CartPage';
import ViewHistory from './ViewHistory';
import OtherEvent from "./OtherEvent";
import AdminStagePrograms from "./AdminStagePrograms";
import BookingDetails from "./BookingDetails";





function App() {

  

  return (
<div>
  
<BrowserRouter>
<Routes>
  
 <Route path="/signup" element={<Signup />} />
 <Route path="/login" element={<Login />} />
 <Route path='/logout' element={<Logout/>}/>
 <Route path="/home" element={<Home />} />
 <Route path="/" element={<Front />} />
 <Route path="/contact" element={<Contact />} />
 <Route path="/about" element={<Aboutus />} />
 <Route path="/muslim" element={<Muslim />} />
 <Route path="/chrstian" element={<Christian />} />
 <Route path="/hindu" element={<Hindu />} />
 {/* <Route path="/dest" element={<Destination />} /> */}
 <Route path="/bridepack" element={<Hindubridepack />} />
 <Route path="/groompack" element={<Hindugroompack />} />
 <Route path="/mbride" element={<Muslimbridepack />} />
 <Route path="/mgroom" element={<Muslimgroompack />} />
 <Route path="/cbride" element={<Christianbride />} />
 <Route path="/cgroom" element={<Christiangroom />} />
 <Route path="/service" element={<Services />} />
 <Route path='/other' element={<OtherEvent/>}/>
 <Route path='/adstageprg' element={<AdminStagePrograms/>}/>

 <Route path="/admin" element={<AdminPanel />} />
 <Route path="/stagelist" element={<AdminStage />} />
 <Route path="/addlist" element={<AddList />} />
 <Route path="/packlist" element={<PackageList />} />
 <Route path="/adminpage" element={<AdminPage />} />
 <Route path="/order" element={<Orders />} />
 <Route path="/setting" element={<SettingList />} />
 <Route path="/camera" element={<CameraList />} />


 <Route path="/orders/hindubride" element={<HinduBrideOrder />} />
 <Route path="/orders/hindugroom" element={<HinduGroomOrder />} />
 <Route path="/orders/christianbride" element={<ChristianBrideOrder />} />
 <Route path="/orders/christiangroom" element={<ChristianGroomOrder />} />
 <Route path="/orders/muslimbride" element={<MuslimBrideOrder />} />
 <Route path="/orders/muslimgroom" element={<MuslimGroomOrder />} />
 {/* <Route path="/orders/destination" element={<DestinationOrder />} /> */}

<Route path='/adminlogin' element={<Adminlogin/>}/>

<Route path='/book' element={<BookingDetails/>}/>

<Route path='/cart' element={<CartPage/>}/>
<Route path='/ViewHistory' element={<ViewHistory/>}/>

</Routes>
</BrowserRouter>

</div>
  )
  
}

export default App
