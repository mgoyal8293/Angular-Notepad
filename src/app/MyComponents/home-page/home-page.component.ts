import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/MyServices/helper.service';
import { HttpService } from 'src/app/MyServices/http.service';
import { CONSTANTS, HttpRequestFormat } from '../notepad-static-data';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  private _helperService = new HelperService();
  private _httpHelper = new HttpService(this._httpClient);
  private _hero: {} | any;

  public appLoading: boolean = true;

  public notesList: [] = [];
  public capturedNote: Object = {};
  private _helper = new HelperService;

  constructor(private route: ActivatedRoute, private _httpClient: HttpClient, private router: Router) { };

  ngOnInit() {
    let _urlId = this.route.snapshot.paramMap.get(CONSTANTS.urlParam);
    let _userId = this._helperService.getDataFromLocalStorage(CONSTANTS.objectId);
    if (_urlId !== _userId) {
      sessionStorage.clear();
      this.router.navigate(['/' + CONSTANTS.loginPageRoute]);
      return;
    }
    this._hero = this._helperService.getAllDataFromLocalStorage();
    this.notesList = this._hero.notes;
    this.appLoading = false;
  }

  updateNote(_event: any) {
    if (_event.isClearing) {
      this.capturedNote = {};
      return;
    }
    let formattedData = this._helperService.getFormattedData(_event, this._hero.notes);

    this.appLoading = true;

    this._hero.notes = formattedData.notesList;
    this.capturedNote = formattedData.selectedNote;
    this._httpHelper.updateDataInDB(this._hero).subscribe(_response => {
      sessionStorage.clear();
      this._helper.saveToLocalStorage(this._hero);
      this.appLoading = false;
    });
  }
}
