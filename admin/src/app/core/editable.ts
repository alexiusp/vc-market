import { Selectable } from './selectable'

export class Editable extends Selectable {
  private _editMode : boolean;
  get inEdit() {
    return !!this._editMode;
  }
  set inEdit(val : boolean) {
    this._editMode = !!val;
  }
  constructor() {
		super();
    this._editMode = false;
  }
}
