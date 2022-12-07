import { CevapDialogComponent } from './components/dialogs/cevap-dialog/cevap-dialog.component';
import { AdminCevapComponent } from './components/admin/admin-cevap/admin-cevap.component';
import { UyeDialogsComponent } from './components/dialogs/uye-dialog/uye-dialogs.component';
import { SoruComponent } from './components/soru/soru.component';
import { Soru } from './models/Soru';
import { AnketComponent } from './components/anket/anket.component';
import { SafeHTMLPipe } from './pipes/safeHtml-pipe.pipe';
import { Authinterceptor } from './services/Authinterceptor';
import { ApiService } from './services/api.service';
import { SoruDialogComponent } from './components/dialogs/soru-dialog/soru-dialog.component';
import { AnketDialogComponent } from './components/dialogs/anket-dialog/anket-dialog.component';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { AdminAnketComponent } from './components/admin/admin-anket/admin-anket.component';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './material.module';
import { AlertService } from 'src/app/services/alert.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminSoruComponent } from './components/admin/admin-soru/admin-soru.component';
import { AuthGuard } from './services/AuthGuards';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    LoginComponent,
    SoruDialogComponent,
    AnketComponent,
    SoruComponent,
    

    //Admin 
    AdminComponent,
    AdminAnketComponent,
    AdminKategoriComponent,
    AdminUyeComponent,
    AdminSoruComponent,
    AdminCevapComponent,


    //dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    AnketDialogComponent,
    SafeHTMLPipe,
    UyeDialogsComponent,
    CevapDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule

  ],

  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    AnketDialogComponent
  ],
  providers: [AlertService, ApiService, SafeHTMLPipe, AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: Authinterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
