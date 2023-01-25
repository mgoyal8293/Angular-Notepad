import { Injectable } from '@angular/core';
import { CONSTANTS, HttpRequestFormat } from '../MyComponents/notepad-static-data';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() {}

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
    if (_event.isDeleting) {
      _notesList = this._deleteItemFromList(_event.note.id, _notesList);
      return {notesList: _notesList, selectedNote: {}}
    } else if (_event.isAdding) {
      _event.note.id = this._addIdToItem(_notesList);
      _notesList.push(_event.note);
      return {notesList: _notesList, selectedNote: _event.note}
    } else {
      return {notesList: _notesList, selectedNote: _event.note};
    }
  }

  isObjectEmpty(obj : any) {
    let stringifyChange = JSON.stringify(obj);
    return (stringifyChange === '{}') ? true : false;
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

  _addIdToItem(_notesList: any) {
    let length = _notesList.length;
    if (!length) {
      return 1;
    }
    let lastNote = _notesList[length - 1];
    return (lastNote.id + 1);
  }
}
