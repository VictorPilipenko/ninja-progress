import { NodeModel } from "storm-react-diagrams";
import { TrafficPortModel } from "./TrafficPortModel";

export class TrafficNodeModel extends NodeModel {
  constructor(name) {
    super(name);
    this.addPort(new TrafficPortModel(name, "top"));
    this.addPort(new TrafficPortModel(name, "left"));
    this.addPort(new TrafficPortModel(name, "bottom"));
    this.addPort(new TrafficPortModel(name, "right"));
    this.extras.name = this.named;
    this.extras.setNameExtras = this.setNameExtras;
    this.setName = this.setName;
    
    this.extras.note = this.notesd;
    this.extras.setNotesExtras = this.setNotesExtras;
    this.setNotes = this.setNotes;

  }

  setNameExtras(name) {
    this.named = name;
  }

  setName(name) {
    this.extras.named = name;
  }

  setNotesExtras(note) {
    this.notesd = note;
  }

  setNotes(note) {
    this.extras.notesd = note;
  }
}