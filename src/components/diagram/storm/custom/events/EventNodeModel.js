import { NodeModel } from "storm-react-diagrams";
import { EventPortModel } from "./EventPortModel";

export class EventNodeModel extends NodeModel {
   constructor(name) {
    super(name);
    this.addPort(new EventPortModel(name, "top"));
    this.addPort(new EventPortModel(name, "left"));
    this.addPort(new EventPortModel(name, "bottom"));
    this.addPort(new EventPortModel(name, "right"));
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