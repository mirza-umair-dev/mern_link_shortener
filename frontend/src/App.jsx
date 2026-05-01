import Navbar from './components/Navbar'
import UrlsHistory from './components/UrlsHistory'
import UrlShort from './components/UrlShort'

const App = () => {
  return (
    <div>
      <Navbar />
      <UrlShort />
      <UrlsHistory />
    </div>
  )
}

export default App