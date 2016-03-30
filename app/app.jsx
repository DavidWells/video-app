import React from "react"
import ReactDom from "react-dom"

require('../index.scss')

ReactDom.render(
  <div>
    <video style={{height:'100%', width: '100%'}} id="camera" autoPlay={true} />
  </div>
  , document.querySelector("#main"));

