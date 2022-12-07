import { Cevap } from './../../models/Cevap';
import { Anket } from './../../models/Anket';
import { Soru } from './../../models/Soru';
import { ApiService } from 'src/app/services/api.service';
import { AlertDialogComponent } from './../dialogs/alert-dialog/alert-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { AlertService } from 'src/app/services/alert.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { AnketDialogComponent } from '../dialogs/anket-dialog/anket-dialog.component';
import { SoruDialogComponent } from '../dialogs/soru-dialog/soru-dialog.component';
import { CevapDialogComponent } from '../dialogs/cevap-dialog/cevap-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sorular: Soru[];
  anketler: Anket[];
  cevaplar: Cevap[];
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<unknown, any>;
  constructor(
    public alert: AlertService,
    public matDialog: MatDialog,
    public apiServis: ApiService
  ) { }

  ngOnInit() {
    this.SonEklenenlerSoru();
    this.SonEklenenlerAnket();
  }

  SonEklenenlerSoru() {
    this.apiServis.SoruListeSonEklenenler(5).subscribe((d: Soru[]) => {
      this.sorular = d;
    });
  }
  SonEklenenlerAnket() {
    this.apiServis.AnketListeSonEklenenler(5).subscribe((d: Anket[]) => {
      this.anketler = d;
    });
  }

  AlertGoster(p: number) {

    var s = new Sonuc();
    if (p == 1) {
      s.islem = true;
    }
    else {
      s.islem = false;
    }
    s.mesaj = "Alert Test";

    this.alert.AlertUygula(s);
  }

  ConfirmUygulama() {

    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = "Kayıt Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      console.log(d);
      if (d) {
        // kayıt silme rutine
        console.log("Kayıt Silindi");
      }
    });

  }
  EkleAnket() {
    var yeniKayit: Anket = new Anket();
    this.dialogRef = this.matDialog.open(AnketDialogComponent, {
      width: "400px",
      data: {
        kayit: yeniKayit,
        islem: "ekle"
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.AnketEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.Anketlistele();
          }
        })
      }
    })
  }
  EkleSoru() {
    var yeniKayit: Soru = new Soru();
    this.dialogRef = this.matDialog.open(SoruDialogComponent, {
      width: "400px",
      data: {
        kayit: yeniKayit,
        islem: "ekle"
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.SoruEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.Sorulistele();
          }
        })
      }
    })
  }

  EkleCevap() {
    var yeniKayit: Cevap = new Cevap();
    this.dialogRef = this.matDialog.open(CevapDialogComponent, {
      width: "400px",
      data: {
        kayit: yeniKayit,
        islem: "ekle"
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.CevapEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.Sorulistele();
          }
        })
      }
    })
  }
  Anketlistele() {
    this.apiServis.AnketListe().subscribe((d: Anket[]) => {
      this.anketler = d;

    });
  }
  Sorulistele() {
    this.apiServis.SoruListe().subscribe((d: Soru[]) => {
      this.sorular = d;

    });
  }

}
