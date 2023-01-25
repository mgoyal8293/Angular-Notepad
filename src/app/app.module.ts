import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesListComponent } from './MyComponents/notes-list/notes-list.component';
import { NoteDetailComponent } from './MyComponents/note-detail/note-detail.component';
import { LoaderComponent } from './MyComponents/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './MyComponents/home-page/home-page.component';
import { HelperService } from './MyServices/helper.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './MyComponents/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    NoteDetailComponent,
    LoaderComponent,
    HomePageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
