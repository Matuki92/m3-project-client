// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// PAGES
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HomePageComponent } from './pages/home-page/homePage.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

// COMPONENTS
import { AppComponent } from './app.component';
import { BeerCardComponent } from './components/beer-card/beer-card.component';
import { BeerDetailPageComponent } from './pages/beer-detail-page/beer-detail-page.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AddBeerFormComponent } from './components/add-beer-form/add-beer-form.component';
import { CommentComponent } from './components/comment/comment.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { BeerListComponent } from './components/beer-list/beer-list.component';

// SERVICES
import { BeerService } from './services/beer.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { CommentService } from './services/comment.service';

// GUARDS
import { InitAuthGuardService } from './guards/init-auth-guard.service';
import { RequireAdminGuardService } from './guards/require-admin-guard.service';
import { RequireUserGuardService } from './guards/require-user-guard.service';
import { RequireAnonGuardService } from './guards/require-anon-guard.service';

const routes: Routes = [
  { path: '', component: LandingPageComponent, canActivate: [RequireAnonGuardService] },
  { path: 'beers', component: HomePageComponent, canActivate: [RequireUserGuardService] },
  { path: 'beers/:id', component: BeerDetailPageComponent, canActivate: [RequireUserGuardService] },
  { path: 'users/:id', component: ProfilePageComponent, canActivate: [RequireUserGuardService] },
  { path: 'admin', component: AdminPageComponent, canActivate: [RequireAdminGuardService] }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    BeerCardComponent,
    BeerDetailPageComponent,
    LogInComponent,
    SignUpComponent,
    AdminPageComponent,
    AddBeerFormComponent,
    CommentComponent,
    ProfilePageComponent,
    UserListComponent,
    BeerListComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [
    UserService,
    BeerService,
    AuthService,
    CommentService,
    InitAuthGuardService,
    RequireAnonGuardService,
    RequireAdminGuardService,
    RequireUserGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
