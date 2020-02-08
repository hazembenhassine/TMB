import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselIndicatorComponent } from './shared/carousel-indicator/carousel-indicator.component';
import { SponsorsComponent } from './pages/sponsors/sponsors.component';
import { MediaComponent } from './pages/media/media.component';
import { SignupComponent } from './pages/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TbmService} from './services/tbm.service';
import {ApiHeaderInterceptor} from './services/api-header.interceptor';
import {NgProgress, NgProgressModule} from 'ngx-progressbar';
import {NgProgressHttpModule} from 'ngx-progressbar/http';
import {ToastrModule} from 'ngx-toastr';
import { ImageGalleryComponent } from './shared/image-gallery/image-gallery.component';
import { VideoGalleryComponent } from './shared/video-gallery/video-gallery.component';
import { PartnersComponent } from './pages/partners/partners.component';

@NgModule({
  declarations: [
    AppComponent,
    CarouselIndicatorComponent,
    SponsorsComponent,
    MediaComponent,
    SignupComponent,
    ImageGalleryComponent,
    VideoGalleryComponent,
    PartnersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgProgressModule.withConfig({
      spinner: false,
      color: '#ffae00'
    }),
    NgProgressHttpModule,
    ToastrModule.forRoot()
  ],
  providers: [
    MatDatepickerModule,
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    DatePipe,
    TbmService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiHeaderInterceptor, multi: true }
  ],
  entryComponents: [
    ImageGalleryComponent,
    VideoGalleryComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
