import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  @Input('noteDetails') public selectedNote : any;
  @Output() public updateNoteDetail = new EventEmitter();
  
  constructor () {}

  ngOnInit() {

  }

  saveNote() {
    this.updateNoteDetail.emit({note: this.selectedNote});
  }

  deleteNote() {
    this.updateNoteDetail.emit({note: this.selectedNote, isDeleting: true});
  }

  addNote() {
    this.updateNoteDetail.emit({note: this.selectedNote, isAdding: true});
  }
}
