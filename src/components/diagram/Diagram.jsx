import React from 'react'
import Layout from "../common/Layout";
import { connect } from 'react-redux'
import './Diagram.css'
import { Flowpoint, Flowspace } from 'flowpoints';
import { saveDiagram } from '../../store/actions/projects'
import domtoimage from 'dom-to-image';
import { getDiagram } from '../../store/actions/projects'

class Diagram extends React.Component {

  componentDidMount() {
    this.props.getDiagram(this.props.funnelId);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("nextProps", nextProps, "\nprevState", prevState)
    if (nextProps.diagram)
      if (nextProps.diagram.snackMsg !== prevState.snackMsg)

        return {
          // showSettings: nextProps.diagram.showSettings,
          // showInfobox: nextProps.diagram.showInfobox,
          // selected: nextProps.diagram.selected,
          // selectedLine: nextProps.diagram.selectedLine,
          // connecting: nextProps.diagram.connecting,
          // inputColor: nextProps.diagram.inputColor,
          // outputColor: nextProps.diagram.outputColor,
          // lineWidth: nextProps.diagram.lineWidth,
          points: nextProps.diagram.points,
          snackMsg: 'default',
          // theme: nextProps.diagram.theme,
          // variant: nextProps.diagram.variant,
          // lastPos: nextProps.diagram.lastPos,
          // snackShow: nextProps.diagram.snackShow,
          // snackMsg: nextProps.diagram.snackMsg,
          // doFocus: nextProps.diagram.doFocus,
        };
      else
        return null;
    else
      return null;
  }

  state = {
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
    lastPos: { x: 300, y: 50 },
    snackShow: false,
    snackMsg: 'instate',
    doFocus: false,
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
    catch (error) {
      console.log(error)
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
    catch (error) {
      console.log(error)
    }
  }

  handleAddPoint1() {
    var newpoint = {
      msg: 'uno',
      pos: { x: this.state.lastPos.x, y: this.state.lastPos.y + 100 },
      outputs: {},
      style: { height: '100px' }
    }
    var points = this.state.points
    points['' + this.count] = newpoint
    this.count += 1
    this.setState({ points, selected: '' + (this.count), lastPos: { x: this.state.lastPos.x, y: this.state.lastPos.y + 100 } })
  }

  handleAddPoint2() {
    var newpoint = {
      msg: 'two',
      pos: { x: this.state.lastPos.x, y: this.state.lastPos.y + 100 },
      outputs: {},
      style: { height: '200px' }
    }
    var points = this.state.points
    points['' + this.count] = newpoint
    this.count += 1
    this.setState({ points, selected: '' + (this.count), lastPos: { x: this.state.lastPos.x, y: this.state.lastPos.y + 100 } })
  }

  handleAddPoint3() {
    var newpoint = {
      msg: 'tres',
      pos: { x: this.state.lastPos.x, y: this.state.lastPos.y + 100 },
      outputs: {},
      style: { height: '150px' }
    }
    var points = this.state.points
    points['' + this.count] = newpoint
    this.count += 1
    this.setState({ points, selected: '' + (this.count), lastPos: { x: this.state.lastPos.x, y: this.state.lastPos.y + 100 } })
  }


  render() {
    this.diagramRef = null;
    this.count = Object.keys(this.state.points).length
    // console.log('this.count: ', this.count)
    return (
      <Layout title='Diagram'>
        <div className='projects-wrapper'>
          <button onClick={() => { this.handleAddPoint1() }}>Add Point 1</button>
          <button onClick={() => { this.handleAddPoint2() }}>Add Point 2</button>
          <button onClick={() => { this.handleAddPoint3() }}>Add Point 3</button>
          <button onClick={() => console.log(this.state)}>show state</button>
          <button onClick={() => this.props.saveDiagram(this.props.funnelId, this.state)}>Save Diagram</button>
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
          {
            this.state.selected !== null && this.state.selected in this.state.points
              ? <div style={{ marginTop: 10, zIndex: 100 }}>
                <div style={{ paddingTop: 0, paddingBottom: 15 }}>

                  <textarea
                    id="msgfield"
                    autoComplete="off"
                    value={this.state.points[this.state.selected].msg}
                    onChange={(e) => {
                      var points = this.state.points
                      var point = points[this.state.selected]
                      point.msg = e.target.value
                      this.setState({ points: points })
                    }}
                    style={{ width: '100%' }}
                    margin="normal"
                  />

                  <button
                    onClick={() => {
                      let selected = this.state.selected
                      let points = {}

                      Object.keys(this.state.points).forEach(testkey => {
                        console.log(testkey, selected)
                        if (testkey !== selected) {
                          points[testkey] = this.state.points[testkey]
                        }
                      })

                      if (Object.keys(points).length === 0) {
                        this.count = 0
                      }

                      this.setState({ snackMsg: 'default' })

                      this.setState(prevState => {
                        if (prevState.snackMsg === 'default')
                          console.log('prevState.points: ', prevState.points)
                        console.log('points: ', points)
                        return {
                          points: points,
                          selected: null,
                        };
                      }, () => console.log('this.state.points: ', this.state.points));

                      // this.setState({ points }, () => console.log(this.state.points))
                    }}>
                    Delete
                  </button>

                </div>
              </div> : null
          }
          <Flowspace
            theme={this.state.theme}
            variant={this.state.variant}
            background={this.state.background}
            getDiagramRef={ref => this.diagramRef = ref}
            avoidCollisions
            style={{ height: '100%', width: 'calc(100%-100px)' }}
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
                    style={point.style}
                    startPosition={point.pos}
                    outputs={point.outputs}
                    onClick={e => { this.handleClick(key, e) }}
                    onTouch={e => { this.handleTouch(key, e) }}
                    onDrag={pos => {
                      var points = this.state.points;
                      points[key].pos = pos;
                      this.setState({ points, lastPos: pos })
                    }}
                  // onHover={(isHovering) => { console.log(isHovering ? 'Hovering' : 'Not hovering') }}
                  >
                    <div style={{ display: 'table', width: '100%', height: '100%' }}>
                      <div style={{ display: 'table-cell', verticalAlign: 'middle', textAlign: 'center', paddingLeft: 2, paddingRight: 2, whiteSpace: 'pre' }}>
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
  console.log('diagram: ', state.projects[`diagram${ownProps.match.params.funnelId}`])
  // console.log('ownProps: ', ownProps)
  return {
    diagram: state.projects[`diagram${ownProps.match.params.funnelId}`],
    funnelId: ownProps.match.params.funnelId,
    // error: state.projects.createFunnelError,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    // getDiagram: (projectId, funnelId, obj) => dispatch(getDiagram(projectId, funnelId, obj)),
    saveDiagram: (funnelId, obj) => dispatch(saveDiagram(funnelId, obj)),
    getDiagram: id => dispatch(getDiagram(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Diagram);