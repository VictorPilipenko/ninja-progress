import { NodeModel } from "@projectstorm/react-diagrams";
import { CustomPortModel } from "./CustomPortModel";

export class CustomNodeModel extends NodeModel {
  constructor(name) {
    super(name);
    this.addPort(new CustomPortModel(name, "top"));
    this.addPort(new CustomPortModel(name, "left"));
    this.addPort(new CustomPortModel(name, "bottom"));
    this.addPort(new CustomPortModel(name, "right"));
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