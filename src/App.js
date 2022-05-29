import './App.css';
import { Routes, Route } from 'react-router-dom'
import Categories from './components/Categories';
import Items from './components/Items';
import ItemsDetails from './components/ItemsDetails';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Categories />} />
        <Route path='test/:category' element={<Items />} />
        <Route path = 'details' element={<ItemsDetails />}>
          <Route path=":title" element={<ItemsDetails />}>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
