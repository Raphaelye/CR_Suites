
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import TopNavbar from "./components/TopNavbar"

function App() {
  return (
    <main className="overflow-x-hidden bg-bg text-white ">
      <TopNavbar />
      <Home />
      <Navbar />
    </main>
  )
}



export default App;