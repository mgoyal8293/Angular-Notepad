import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { HelperService } from 'src/app/MyServices/helper.service';

@Component({
  selector: 'note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnChanges {
  @Input('noteDetails') public selectedNote: any;
  @Output() public updateNoteDetail = new EventEmitter();

  protected showClearButton: boolean = false;
  protected showDeleteButton: boolean = false;

  private _helper = new HelperService();

  constructor() { }

  ngOnChanges(changes: any) {
    this.showClearButton = !this._helper.isObjectEmpty(changes.selectedNote.currentValue);
  }

  saveNote() {
    let _validator = this._helper.isObjectEmpty(this.selectedNote);
    if(_validator) {
      alert('Nothing to Add.');
      return;
    }
    this.selectedNote.id ? this.updateNoteDetail.emit({ note: this.selectedNote }) :
        this.updateNoteDetail.emit({ note: this.selectedNote, isAdding: true });
  }

  deleteNote() {
    this.updateNoteDetail.emit({ note: this.selectedNote, isDeleting: true });
  }

  clearSelected() {
    this.updateNoteDetail.emit({ note: this.selectedNote, isClearing: true });
  }

  onValueChange(key: any, desc?: boolean) {
    this.showClearButton = (key !== '') ? true : false;
  }
}
