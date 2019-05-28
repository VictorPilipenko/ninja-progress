import React from 'react'
import Layout from "../common/Layout";
import { connect } from 'react-redux'
import './Diagram.css'
import { Flowpoint, Flowspace } from 'flowpoints';
import { saveDiagram } from '../../store/actions/projects'
import domtoimage from 'dom-to-image';

class Diagram extends React.Component {

  componentDidMount() {
    if (this.props.diagram) {
      let newLib = this.props.diagram
      this.count = newLib.count
      Object.keys(newLib.points).forEach(p_key => {
        Object.keys(newLib.points[p_key].outputs).forEach(o_key => {
          if (!("dash" in newLib.points[p_key].outputs[o_key])) {
            newLib.points[p_key].outputs[o_key].dash = 0
          }
        })
      })
      this.setState({
        variant: newLib.variant,
        lineWidth: newLib.lineWidth,
        points: newLib.points,
        snackShow: true,
        snackMsg: 'Loaded model from redux',
      })
    }
  }


  constructor(props) {
    super(props);
    this.state = {
      showSettings: true,
      showInfobox: false,
      selected: null,
      selectedLine: null,
      connecting: null,
      inputColor: '#00fff2',
      outputColor: '#0c00ff',
      lineWidth: 4,
      points: {},
      theme: 'indigo',
      variant: 'outlined',
      // background: 'black',
      lastPos: { x: 300, y: 50 },
      snackShow: false,
      snackMsg: '',
      // snackColor: blue[500],
      doFocus: false
    }

    // Helper variables
    this.diagramRef = null;
    this.baseUrl = window.location.href.split('/?p=')[0]
    if (this.baseUrl[this.baseUrl.length - 1] !== '/') this.baseUrl += '/'
    this.count = Object.keys(this.state.points).length
    this.currentQuery = ''

    // Binding class methods
    // this.handleClick = this.handleClick.bind(this)
    // this.handleTouch = this.handleTouch.bind(this)
    // this.settingsBox = this.settingsBox.bind(this)
    // thi/s.infoBox = this.infoBox.bind(this)
    // this.handleAddPoint = this.handleAddPoint.bind(this)

    // Adding dash
    // Object.keys(this.state.points).forEach(p_key => {
    //   Object.keys(this.state.points[p_key].outputs).forEach(o_key => {
    //     if (!("dash" in this.state.points[p_key].outputs[o_key])) {
    //       this.state.points[p_key].outputs[o_key].dash = 0
    //     }
    //   })
    // })
  }

  handleAddPoint() {
    var newpoint = {
      msg: '',
      pos: { x: this.state.lastPos.x, y: this.state.lastPos.y + 100 },
      outputs: {},
    }
    var points = this.state.points
    points['' + this.count] = newpoint
    this.count += 1
    this.setState({ points, selected: '' + (this.count), lastPos: { x: this.state.lastPos.x, y: this.state.lastPos.y + 100 } })
  }

  handleClick = (id, e) => {
    try {
      this.doFocus = true;
      var selected = this.state.selected
      var points = this.state.points
      if (e.shiftKey) {
        if (selected === null) {
          selected = id
        } else {
          if (selected !== id) {
            var p1 = points[selected]
            if (id in p1.outputs) {
              delete p1.outputs[id]
            } else {
              p1.outputs[id] = {
                output: 'auto',
                input: 'auto',
                // dash: 10
              }
            }
          }
        }
      } else {
        selected = (selected === null ? id : (selected === id ? null : id))
      }
      this.setState({ selected, points })
    }
    catch{
      console.log('fuck you, idiot')
    }
  }

  handleTouch = (id, e) => {
    try {
      this.doFocus = false;
      var selected = this.state.selected
      var points = this.state.points
      if (selected === null) {
        selected = id
      } else {
        if (selected !== id) {
          var p1 = points[selected]
          if (id in p1.outputs) {
            delete p1.outputs[id]
          } else {
            p1.outputs[id] = {
              output: 'auto',
              input: 'auto',
              // dash: 10
            }
          }
        }
      }
      this.setState({ selected, points })

    }
    catch{
      console.log('fuck you, idiot')
    }
  }


  render() {
    // console.log(this.props)
    return (
      <Layout title='Diagram'>
        <div className='projects-wrapper'>

          <button
            onClick={() => { this.handleAddPoint() }}>
            Add Point
            </button>

          <button onClick={() => console.log(this.state)}>show state</button>

          <button onClick={() => this.props.saveDiagram(this.props.projectId, this.props.funnelId, this.state)}>Save Diagram</button>

          <button
            onClick={(e) => {
              domtoimage.toPng(this.diagramRef)
                .then(function (dataUrl) {
                  var img = new Image();
                  img.src = dataUrl;
                  var link = document.createElement('a');
                  link.download = 'my-diagram.png';
                  link.href = img.src;
                  link.click();
                })
                .catch(function (error) {
                  console.error('oops, something went wrong!', error);
                });
            }}>

            Export PNG
              </button>

          <p>hold SHIFT and click left mouse to connect</p>


          <Flowspace
            theme={this.state.theme}
            variant={this.state.variant}
            background={this.state.background}
            getDiagramRef={ref => this.diagramRef = ref}
            avoidCollisions
            style={{ height: '100%', width: '100%' }}
            connectionSize={this.state.lineWidth}
            selected={this.state.selected}
            selectedLine={this.state.selectedLine}
            onClick={e => { this.setState({ selected: null, selectedLine: null }) }}
            onLineClick={(key_a, key_b) => { this.setState({ selectedLine: { a: key_a, b: key_b } }) }}>

            {
              Object.keys(this.state.points).map(key => {
                var point = this.state.points[key]

                return (

                  <Flowpoint
                    key={key}
                    snap={{ x: 10, y: 10 }}
                    style={{ height: Math.max(50, Math.ceil(point.msg.length / 20) * 30) }}
                    startPosition={point.pos}
                    outputs={point.outputs}
                    onClick={e => { this.handleClick(key, e) }}
                    onTouch={e => { this.handleTouch(key, e) }}
                    onDrag={pos => {
                      var points = this.state.points;
                      points[key].pos = pos;
                      this.setState({ points, lastPos: pos })
                    }}>
                    <div style={{ display: 'table', width: '100%', height: '100%' }}>
                      <div style={{ display: 'table-cell', verticalAlign: 'middle', textAlign: 'center', paddingLeft: 2, paddingRight: 2 }}>
                        {
                          point.msg !== '' ? point.msg : 'empty'
                        }
                      </div>
                    </div>
                  </Flowpoint>

                )

              })
            }

          </Flowspace>

        </div>
      </Layout >
    )
  }
}

function mapStateToProps(state, ownProps) {
  console.log('state: ', state)
  // console.log('ownProps: ', ownProps)
  return {
    diagram: state.projects[`diagram${ownProps.match.params.projectId}${ownProps.match.params.funnelId}`],
    projectId: ownProps.match.params.projectId,
    funnelId: ownProps.match.params.funnelId,
    // error: state.projects.createFunnelError,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    // getDiagram: (projectId, funnelId, obj) => dispatch(getDiagram(projectId, funnelId, obj)),
    saveDiagram: (projectId, funnelId, obj) => dispatch(saveDiagram(projectId, funnelId, obj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Diagram);