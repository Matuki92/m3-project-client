// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// PAGES
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

// SERVICES
import { BeerService } from './services/beer.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { CommentService } from './services/comment.service';

// GUARDS
import { InitAuthGuardService } from './guards/init-auth-guard.service';
import { RequireAdminGuardService } from './guards/require-admin-guard.service';
import { RequireUserGuardService } from './guards/require-user-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'beers', pathMatch: 'full' },
  { path: 'beers', component: HomePageComponent, canActivate: [InitAuthGuardService] },
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
    ProfilePageComponent
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
    RequireAdminGuardService,
    RequireUserGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
