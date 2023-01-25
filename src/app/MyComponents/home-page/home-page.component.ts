import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/MyServices/helper.service';
import { CONSTANTS, HttpRequestFormat } from '../notepad-static-data';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  private _helperService = new HelperService(this._httpClient);
  private _constantData = this._helperService.getConstantData();
  private _hero: {} | any;

  public appLoading: boolean = true;

  public notesList: [] = [];
  public capturedNote: Object = {};

  constructor(private route: ActivatedRoute, private _httpClient: HttpClient, private router: Router) { };

  ngOnInit() {
    let _urlId = this.route.snapshot.paramMap.get(CONSTANTS.urlParam);
    let _userId = this._helperService.getDataFromLocalStorage(CONSTANTS.objectId);
    if(_urlId !== _userId) {
      sessionStorage.clear();
      this.router.navigate(['/' + CONSTANTS.loginPageRoute]);
      return;
    }
    this._hero = this._helperService.getAllDataFromLocalStorage();
    this.notesList = this._hero.notes;
    this.appLoading = false;
  }

  updateNote(_event: any) {
    let formattedData = this._helperService.getFormattedData(_event, this._hero.notes);

    this.appLoading = true;

    this._hero.notes = formattedData.NOTES_LIST;
    this.capturedNote = formattedData.SELECTED_NOTE;
    this._helperService.updateDataInDB(this._hero).subscribe(_response => {
      this.appLoading = false;
    });
  }
}
