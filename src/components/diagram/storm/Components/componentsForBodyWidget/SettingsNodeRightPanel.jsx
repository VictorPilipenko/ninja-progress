import * as React from "react";
import randomString from "random-string";
import ModalNodeWidget from "../../../../common/ModalNodeWidget";
import { ReactComponent as SelectSVG } from '../../../../../assets/select.svg'

export default class SettingsNodeRightPanel extends React.Component {
  state = {
    labelNode: '',
    script: '',
    toggleTriggerStyle: false,
    toggleGoalStyle: false,
    copied: false,
  };

  saveDiagramHandle = file => {
    this.setState(
      {
        snackMsg: "next",
        converted: this.props.app.serialization(
          this.props.app.getDiagramEngine().getDiagramModel()
        ),
      },
      () => {
        this.props.work.saveDiagram(this.props.work.funnelId, this.state, file);
      }
    );
  }
   

  handleToggleTriggerStyle = () => {
    this.setState(prev => {
      return {
        toggleTriggerStyle: !prev.toggleTriggerStyle,
        toggleGoalStyle: false,
      }
    }, () => {
       (this.props.work.showSettingsWidgetModel.extras.setTriggerExtras &&
          this.props.work.showSettingsWidgetModel.extras.setTriggerExtras(
            this.state.toggleTriggerStyle
          )) 
          ||
        (this.props.work.showSettingsWidgetModel.setTrigger &&
          this.props.work.showSettingsWidgetModel.setTrigger(this.state.toggleTriggerStyle));

        (this.props.work.showSettingsWidgetModel.extras.setGoalExtras &&
          this.props.work.showSettingsWidgetModel.extras.setGoalExtras(
            this.state.toggleGoalStyle
          )) 
          ||
        (this.props.work.showSettingsWidgetModel.setGoal &&
          this.props.work.showSettingsWidgetModel.setGoal(this.state.toggleGoalStyle))
    })

    const name = randomString({ length: 10 });
    const file = new File([], name, {
      type: "image/svg"
    });
    this.saveDiagramHandle(file);
  }

  handleToggleGoalStyle = () => {
    this.setState(prev => {
      return {
        toggleGoalStyle: !prev.toggleGoalStyle,
        toggleTriggerStyle: false,
      }
    }, () => {
       (this.props.work.showSettingsWidgetModel.extras.setTriggerExtras &&
          this.props.work.showSettingsWidgetModel.extras.setTriggerExtras(
            this.state.toggleTriggerStyle
          )) 
          ||
        (this.props.work.showSettingsWidgetModel.setTrigger &&
          this.props.work.showSettingsWidgetModel.setTrigger(this.state.toggleTriggerStyle));

        (this.props.work.showSettingsWidgetModel.extras.setGoalExtras &&
          this.props.work.showSettingsWidgetModel.extras.setGoalExtras(
            this.state.toggleGoalStyle
          )) 
          ||
        (this.props.work.showSettingsWidgetModel.setGoal &&
          this.props.work.showSettingsWidgetModel.setGoal(this.state.toggleGoalStyle))
    })

    const name = randomString({ length: 10 });
    const file = new File([], name, {
      type: "image/svg"
    });
    this.saveDiagramHandle(file);
  }

  handleChangeNode = e =>
    this.setState(
      {
        labelNode: e.target.value
      },
      () =>
        (this.props.work.showSettingsWidgetModel.extras.setNameExtras &&
          this.props.work.showSettingsWidgetModel.extras.setNameExtras(
            this.state.labelNode
          )) 
          ||
        (this.props.work.showSettingsWidgetModel.setName &&
          this.props.work.showSettingsWidgetModel.setName(this.state.labelNode))
    );

  saveDiagramThenCloseSettingModal = file =>
    this.setState(
      {
        snackMsg: "next",
        converted: this.props.app.serialization(
          this.props.work.showSettingsWidgetEngine
        )
      },
      () => {
        this.props.work.saveDiagramThenShowOrHideSettingsModal(
          this.props.work.funnelId,
          this.state,
          file,
          false
        );
        this.setState({ labelNode: '' })
      }
    );

  handleScriptChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  copyToClipboard = e => {
    this.script.select();
    document.execCommand("copy");
    e.target.focus();
    this.setState({
      copied: true
    })
  };

  render() { 
    // console.log(
    //   this.props.work.showSettingsWidgetModel && 
    //   this.props.work.showSettingsWidgetModel.type
    // )   
    // console.log('state: ', this.state.toggleTriggerStyle)
    // console.log('props: ', this.props.work.showSettingsWidgetModel &&
    //             this.props.work.showSettingsWidgetModel.extras.triggerd)
    return (
      <ModalNodeWidget
        show={this.props.work.showSettingsWidgetBoolean}
        handleClose={() => {
          const name = randomString({ length: 10 });
          const file = new File(["test"], name, {
            type: "image/png"
          });
          this.saveDiagramThenCloseSettingModal(file);
        }}
      >
        <label className="label-create-widget-settings">Settings</label>
        <div className="modal-content-wrapper">
          <label htmlFor="Name" className="label-input">
            Name
          </label>
          <textarea
            className='node-panel-textarea-input'
            style={{ height: 40 }}
            id="Name"
            placeholder="Label Name"
            type="text"
            value={
              this.state.labelNode === '' ?

                this.props.work.showSettingsWidgetModel &&
                this.props.work.showSettingsWidgetModel.extras.named === undefined ?

                this.props.work.showSettingsWidgetModel &&
                // this.props.work.showSettingsWidgetModel.type :
                '' : 

                this.props.work.showSettingsWidgetModel &&
                this.props.work.showSettingsWidgetModel.extras.named

              : this.state.labelNode
            }
            onChange={this.handleChangeNode}
          />
        </div>

        {
          this.props.work.showTypeOfNode && 
          this.props.work.showTypeOfNode === 'small' ? 
          <>
            <label className="label-create-widget-settings">Tracking</label>
            <div style={{ padding: 15 }}>
            <label htmlFor="UTMLink" className="label-input">
              Generate UTM link
            </label>
            <input
              id="UTMLink"
              type="text"
              // value={this.state.UTMLink}
              // onChange={() => {}}
            />
            {this.props.work.changeFunnelNameMessage && (
              <div className={`input-group`}>
                {this.props.work.changeFunnelNameMessage}
              </div>
            )}
            <button
              className="btn-generate-utm"
              onClick={() => {}}
            >
              Generate
            </button>
            </div>
            <button
              className="btn-set-as-a-trigger"
              onClick={this.handleToggleTriggerStyle}
              style={{
                margin: '30px auto'
              }}
            >
              {
                this.props.work.showSettingsWidgetModel.extras.triggerd &&
                <SelectSVG />
              }
              Set as a trigger
            </button>
          </>
          : 
          <>
            <label className="label-create-widget-settings">Tracking</label>
            <div style={{ padding: 15 }}>
              <label htmlFor="UTMLink" className="label-input">
                Generate UTM link
              </label>
              <input
                id="UTMLink"
                type="text"
                // value={this.state.UTMLink}
                // onChange={() => {}}
              />
              {this.props.work.changeFunnelNameMessage && (
                <div className={`input-group`}>
                  {this.props.work.changeFunnelNameMessage}
                </div>
              )}
              <button
                className="btn-generate-utm"
                onClick={() => {}}
              >
                Generate
              </button>
            </div>

            <div style={{ padding: 15 }}>
              <label htmlFor="GenerateScript" className="label-input">
                Generate script
              </label>
              <textarea
                className='node-panel-textarea-input'
                style={{ 
                  height: 120,
                  marginBottom: 15,
                }}
                id="GenerateScript"
                name="script"
                ref={ref => this.script = ref}
                type="text"
                placeholder="Enter product name and click Generate"
                value={this.state.scriptD ? this.state.scriptD : this.state.script}
                onChange={this.handleScriptChange}
              />
              {
                this.state.copied && <span className="label-input">Copied!</span>
              }
              {
                this.state.scriptD ?
                <>
                  <button
                    className="btn-generate-utm"
                    onClick={this.copyToClipboard}
                  >
                    Copy
                  </button>
                  <button
                    className="btn-generate-utm"
                    onClick={() => {
                      this.setState({
                        scriptD: null,
                        copied: false,
                        script: '',
                      })
                    }}
                  >
                    Clear
                  </button>
                </>
                :
                <button
                  className="btn-generate-utm"
                  disabled={this.state.script.length === 0}
                  onClick={() => {
                    this.setState({
                      copied: false,
                      scriptD: 
                      `<script type="text/javascript"> 
                          window.onload = function() { 
                            (async () => {
                              await fetch('https://httpbin.org/post', {
                                method: 'POST',
                                headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(
                                  {
                                    cardType: '${
                                      this.props.work.showSettingsWidgetModel && 
                                      this.props.work.showSettingsWidgetModel.type
                                    }',
                                    product: '${this.state.script}'
                                  }
                                )
                              });
                            })();
                          }; 
                        </script>`
                    })
                  }}
                >
                  Generate
                </button>
              }
            
            </div>

            <div className='buttons-set-wrapper'>
              <button
                className="btn-set-as-a-trigger"
                onClick={this.handleToggleTriggerStyle}
              >
                {
                  this.props.work.showSettingsWidgetModel &&
                  this.props.work.showSettingsWidgetModel.extras.triggerd && 
                  <SelectSVG />
                }
                Set as a trigger
              </button>
              <button
                className="btn-set-as-a-goal"
                onClick={this.handleToggleGoalStyle}
              >
                {
                  this.props.work.showSettingsWidgetModel &&
                  this.props.work.showSettingsWidgetModel.extras.goald && 
                  <SelectSVG />
                }
                Set as a goal
              </button>


            </div>
          </>
        }
      </ModalNodeWidget>
    );
  }
}



