import { UyeDialogsComponent } from '../../dialogs/uye-dialog/uye-dialogs.component';
import { Uye } from './../../../models/Uye';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-uye',
  templateUrl: './admin-uye.component.html',
  styleUrls: ['./admin-uye.component.css']
})
export class AdminUyeComponent implements OnInit {
  uyeler: Uye[];
  dataSource: any;
  displayedColumns = ["KullaniciAdi", "AdSoyad", "Mail", "Sifre", "Admin", "detay"];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<UyeDialogsComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: AlertService
  ) { }

  ngOnInit() {
    this.Uyelistele();
  }
  Uyelistele() {
    this.apiServis.UyeListe().subscribe((d: Uye[]) => {
      this.uyeler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  Ekle() {
    var yeniKayit: Uye = new Uye();
    this.dialogRef = this.matDialog.open(UyeDialogsComponent, {
      width: "400px",
      data: {
        kayit: yeniKayit,
        islem: "ekle"
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.UyeEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.Uyelistele();
          }
        })
      }
    })
  }

  Duzenle(kayit: Uye) {
    this.dialogRef = this.matDialog.open(UyeDialogsComponent, {
      width: "400px",
      data: {
        kayit: kayit,
        islem: "duzenle"
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.KullaniciAdi = d.KullaniciAdi;
        kayit.AdSoyad = d.AdSoyad;
        kayit.Mail = d.Mail;
        kayit.Sifre = d.Sifre;
        kayit.Admin = d.Admin;
        this.apiServis.UyeDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.Uyelistele();
          }
        })
      }
    })
  }
  Sil(kayit: Uye) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px",
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.KullaniciAdi + " Adlı Üye Silinecektir Onaylıyor musunuz?";

    this.dialogRefConfirm.afterClosed().subscribe(d => {
      if (d) {
        kayit.KullaniciAdi = d.KullaniciAdi;
        this.apiServis.UyeSil(kayit.UyeId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.Uyelistele();
          }
        })
      }
    })
  }

}


