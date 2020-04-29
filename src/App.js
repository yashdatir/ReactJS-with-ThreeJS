import React from 'react';
import * as THREE from 'three';
class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      x: 0.01,
      y: 0.01
    }
  }
  componentDidMount(){
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 )
    this.camera.position.z = 4
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#f1f1f1')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: '#433F81' })
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)
    this.start()
  }
componentWillUnmount(){
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }
start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }
stop = () => {
    cancelAnimationFrame(this.frameId)
  }
animate = () => {
   this.cube.rotation.x += this.state.x
   this.cube.rotation.y += this.state.y
   this.renderScene()
   this.frameId = window.requestAnimationFrame(this.animate)
 }
renderScene = () => {
  this.renderer.render(this.scene, this.camera)
}
render(){
    return(
      <div className="container">
      <div className="row">
      <div className="col-sm-6">
        <div style={{margin:'10%'}}>
          <button style={{margin:'5px'}} onClick={()=>this.setState({x: (this.state.x+0.01), y: (this.state.y+0.01) })}>INCREASE SPEED</button><br />
          <button style={{margin:'5px'}} onClick={()=>this.setState({x: (this.state.x-0.01), y: (this.state.y-0.01) })}>DECREASE SPEED</button><br />
          <p>X:{this.state.x + ', Y:' + this.state.y}</p>
        </div>
      </div>
      <div className="col-sm-6" style={{ width: '400px', height: '400px' }} ref={(mount) => { this.mount = mount }}/>
      </div>
      </div>
    )
  }
}
export default App;