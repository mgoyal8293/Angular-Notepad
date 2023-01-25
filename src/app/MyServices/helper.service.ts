import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS, HttpRequestFormat } from '../MyComponents/notepad-static-data';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private _httpClient: HttpClient) {}

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

  saveToLocalStorage(user: any) {
    sessionStorage.setItem(CONSTANTS.objectId, user._id);
    sessionStorage.setItem(CONSTANTS.userName, user.userName);
    sessionStorage.setItem(CONSTANTS.password, user.password);
    sessionStorage.setItem(CONSTANTS.notes, JSON.stringify(user.notes));
  }

  getDataFromLocalStorage(key: string) {
    if (CONSTANTS.notes === key) {
      let array: any = sessionStorage.getItem(key);
      return JSON.parse(array);
    }
    return sessionStorage.getItem(key);
  }

  getAllDataFromLocalStorage() {
    return {
      _id: this.getDataFromLocalStorage(CONSTANTS.objectId),
      password: this.getDataFromLocalStorage(CONSTANTS.password),
      notes: this.getDataFromLocalStorage(CONSTANTS.notes),
      userName: this.getDataFromLocalStorage(CONSTANTS.userName)
    }
  }

  getAuthUserData(usersList : HttpRequestFormat[], userName: string) {
    for (let user of usersList) {
      if (user.userName === userName) {
        return user;
      }
    }
    return {error: true};
  }

  getFormattedData(_event: any, _notesList: any) {
    let NOTES_LIST = 'notesList';
    let SELECTED_NOTE = 'selectedNote';    

    if (_event.isDeleteing) {
      _notesList = this._deleteItemFromList(_event.note.id, _notesList);
      return {NOTES_LIST: _notesList, SELECTED_NOTE: {}}
    } else if (_event.isAdding) {
      _event.note.id = this._addIdToItem(_notesList);
      _notesList.push(_event.note);
      return {NOTES_LIST: _notesList, SELECTED_NOTE: _event.note}
    } else {
      return {NOTES_LIST: _notesList, SELECTED_NOTE: _event.note};
    }
  }

  _deleteItemFromList(deletedNoteId: number, _notesList: any) {
    let indexOfNote : any;
    _notesList.forEach((_note: any, currentIndex: number) => {
      if(_note.id === deletedNoteId) {
        indexOfNote = currentIndex;
        return;
      }
    });
    _notesList.splice(indexOfNote, 1);
    return _notesList;
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

  _addIdToItem(_notesList: any) {
    let length = _notesList.length;
    let lastNote = _notesList[length - 1];
    return (lastNote.id + 1);
  }
}
