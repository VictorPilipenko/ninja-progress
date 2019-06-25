import { NodeModel } from "storm-react-diagrams";
import { BigPortModel } from "./BigPortModel";

export class BigNodeModel extends NodeModel {
  constructor(name) {
    super(name);
    this.addPort(new BigPortModel(name, "top"));
    this.addPort(new BigPortModel(name, "left"));
    this.addPort(new BigPortModel(name, "bottom"));
    this.addPort(new BigPortModel(name, "right"));
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
  }z

  setNotes(notes) {
    this.extras.notesd = notes;
  }
}