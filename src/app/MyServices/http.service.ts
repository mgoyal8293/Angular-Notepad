import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS, HttpRequestFormat } from '../MyComponents/notepad-static-data';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _httpClient: HttpClient) { }

  getDataFromDB() {
    let inputs = this._getConstantData();
    return this._httpClient.get<HttpRequestFormat[]>(inputs.url, inputs.options);
  }

  updateDataInDB(user: any) {
    let _url = this._getUserURL(user._id);
    return this._httpClient.put(_url, user, this._getConstantData().options);
  }

  addNewUserToDB(name: string, password: string) {
    let inputs = this._getConstantData();
    let user = this._createNewUser(name, password);
    return this._httpClient.post<HttpRequestFormat[]>(inputs.url, user, inputs.options);
  }

  _createNewUser(name: string, password: string) {
    return {
      password: password,
      notes : [],
      userName : name
    }
  }

  _getConstantData() {
    return {
      url : CONSTANTS.url,
      options: { headers: new HttpHeaders(CONSTANTS.headers) }
    }
  }

  _getUserURL(id : any) {
    return CONSTANTS.url + '/' + id;
  }
}
