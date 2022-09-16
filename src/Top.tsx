import React, {useState} from 'react'
import App from './App'


const Top = () : JSX.Element => {

  const [render, setRender] = useState(true);

  return (
    <div>
      <button onClick={() => setRender((p) => !p)}>Toggle</button>
      {render ? <App/> : <p>Hello Not rendering app duh!</p> }
    </div>
  )
}

export default Top