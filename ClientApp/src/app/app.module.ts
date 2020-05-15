import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { FlightPageComponent } from './flight-page/flight-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CarPageComponent } from './car-page/car-page.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AlertComponent } from './alert/alert.component';
import { ToastrModule } from 'ngx-toastr';
import { HotelPageComponent } from './hotel-page/hotel-page.component';
import { DefaultModule } from './dashboard/layouts/default/default.module';
import { DefaultComponent } from './dashboard/layouts/default/default.component';
import { DashboardComponent } from './dashboard/modules/dashboard/dashboard.component';
import { PostsComponent } from './dashboard/modules/posts/posts.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutPageComponent,
    FlightPageComponent,
    CarPageComponent,
    AlertComponent,
    HotelPageComponent,
    LoginComponent
  ],
  imports: [
    DefaultModule,
    CommonModule,
    MatIconModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    }),
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutPageComponent },
      { path: 'flights', component: FlightPageComponent },
      { path: 'cars', component: CarPageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'hotels', component: HotelPageComponent },
      {
        path: 'dashboard', component: DefaultComponent, children: [
          { path: '', component: DashboardComponent },
          { path: 'posts', component: PostsComponent }
        ]
      }
    ])
  ],
  exports: [RouterModule, BsDropdownModule, TooltipModule, ModalModule],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
