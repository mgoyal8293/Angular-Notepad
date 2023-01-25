import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS, HttpRequestFormat } from '../MyComponents/notepad-static-data';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private _httpClient: HttpClient) {}

  getConstantData() {
    return {
      url : CONSTANTS.url,
      options: { headers: new HttpHeaders(CONSTANTS.headers) }
    }
  }

  getUserURL(id : any) {
    return CONSTANTS.url + '/' + id;
  }

  getDataFromDB() {
    return this._httpClient.get<HttpRequestFormat[]>(this.getConstantData().url, this.getConstantData().options);
  }

  saveToLocalStorage(user: any) {
    sessionStorage.setItem(CONSTANTS.userId, user.userId);
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
      userId: this.getDataFromLocalStorage(CONSTANTS.userId),
      password: this.getDataFromLocalStorage(CONSTANTS.password),
      notes: this.getDataFromLocalStorage(CONSTANTS.notes),
      userName: this.getDataFromLocalStorage(CONSTANTS.userName)
    }
  }

  updateDataInDB(user: any) {
    let _url = this.getUserURL(user._id);
    return this._httpClient.put(_url, user, this.getConstantData().options);
  }

  getAuthUserData(usersList : HttpRequestFormat[]) {
    for (let user of usersList) {
      if (user.userName === 'mgoyal8293') {
        return user;
      }
    }
    return;
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

  _addIdToItem(_notesList: any) {
    let length = _notesList.length;
    let lastNote = _notesList[length - 1];
    return (lastNote.id + 1);
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
}
