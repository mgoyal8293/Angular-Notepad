import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { HelperService } from 'src/app/MyServices/helper.service';

@Component({
  selector: 'notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnChanges, OnInit {

  @Input('listItems') public notesList: any;
  @Input('highlightPresent') public noteDetails : object = {};
  @Output() public showNoteDetail = new EventEmitter();
  public noteActive : number = 0;
  private _helper = new HelperService();

  constructor() {};

  ngOnChanges(changes: any) {
    if (this._helper.isObjectEmpty(changes.noteDetails.currentValue)) {
      this.noteActive = 0;
    }
  }

  ngOnInit() {
    if (!this._helper.isObjectEmpty(this.noteDetails)) {
      this.onNoteClick(this.noteDetails);
    }
  }

  onNoteClick(selectedNote : any) {
    if (this.noteActive === selectedNote.id) {
      this.noteActive = 0;
      this.showNoteDetail.emit({});
    } else {
      this.noteActive = selectedNote.id;
      this.showNoteDetail.emit(selectedNote);
    }
  }
}
