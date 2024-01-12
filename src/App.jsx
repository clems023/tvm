import WelcomePage from "./components/welcome/WelcomePage"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Search from "./components/Search/Search"
import Update from "./components/Update/Update"

function App() {

  const isTokenPresent = !!localStorage.getItem("accessToken")

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/update" element={<Update />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
