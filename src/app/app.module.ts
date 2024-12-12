import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'; 

import { FormsModule } from '@angular/forms';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { SongCardComponent } from './song-card/song-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ArtistCardComponent } from './artist-card/artist-card.component';
import { GenreCardComponent } from './genre-card/genre-card.component';
import { HeaderComponent } from './header/header.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserUpdateFormComponent } from './user-update-form/user-update-form.component';

const appRoutes: Routes = [
  {path: 'welcome', component: WelcomePageComponent }, 
  {path: 'songs', component: SongCardComponent },
  {path: 'account', component: AccountPageComponent },
  {path: '', redirectTo: 'welcome', pathMatch: 'prefix'},
]; 

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    SongCardComponent,
    WelcomePageComponent,
    ArtistCardComponent,
    GenreCardComponent,
    HeaderComponent,
    AccountPageComponent,
    UserInfoComponent,
    UserUpdateFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule, 
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule, 
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
