import './App.css'
import brickImage from './assets/Bricks023_4K-JPG/Bricks023_4K_Color.jpg'
import SVGComponent from './SVGComponent'
function App() {

  return (<>
  <div 
    className="fixed inset-0 bg-repeat bg-size-[450px_auto] grayscale-[0.4] brightness-[0.75] contrast-[1.0] backdrop-blur-[1.5px] -z-10"
    style={{ backgroundImage: `url(${brickImage})` }}
  ></div>
    <div className=''>
        <SVGComponent />
        </div>
  </>)
}

export default App
