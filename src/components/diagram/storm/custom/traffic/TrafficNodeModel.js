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

    this.extras.notes = this.notesd;
    this.extras.setNotesExtras = this.setNotesExtras;
    this.setNotes = this.setNotes;
  }

  setNameExtras(name) {
    this.named = name;
  }

  setName(name) {
    this.extras.named = name;
  }

  setNotesExtras(notes) {
    this.notesd = notes;
  }

  setNotes(notes) {
    this.extras.notesd = notes;
  }
}