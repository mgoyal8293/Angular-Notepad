import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  @Input('listItems') public notesList: any;
  @Input('highlightPresent') public noteDetails : object = {};
  @Output() public showNoteDetail = new EventEmitter();
  public noteActive : number = 0;

  constructor( private router: Router, private route: ActivatedRoute) {};

  ngOnInit() {
    if (Object.keys(this.noteDetails).length !== 0) {
      this.onNoteClick(this.noteDetails);
    }
  }

  onNoteClick(selectedNote : any) {
    console.log(selectedNote);
    if (this.noteActive === selectedNote.id) {
      this.noteActive = 0;
      this.showNoteDetail.emit({});
    } else {
      this.noteActive = selectedNote.id;
      this.showNoteDetail.emit(selectedNote);
    }
  }
}
