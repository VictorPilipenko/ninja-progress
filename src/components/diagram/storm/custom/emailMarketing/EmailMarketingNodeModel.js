import { NodeModel } from "storm-react-diagrams";
import { EmailMarketingPortModel } from "./EmailMarketingPortModel";

export class EmailMarketingNodeModel extends NodeModel {
  constructor(name) {
    super(name);
    this.addPort(new EmailMarketingPortModel(name, "top"));
    this.addPort(new EmailMarketingPortModel(name, "left"));
    this.addPort(new EmailMarketingPortModel(name, "bottom"));
    this.addPort(new EmailMarketingPortModel(name, "right"));
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