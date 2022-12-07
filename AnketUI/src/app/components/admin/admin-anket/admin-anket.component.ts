import { Anket } from './../../../models/Anket';
import { AnketDialogComponent } from '../../dialogs/anket-dialog/anket-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Kategori } from 'src/app/models/Kategori';
import { Sonuc } from 'src/app/models/Sonuc';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-anket',
  templateUrl: './admin-anket.component.html',
  styleUrls: ['./admin-anket.component.css']
})
export class AdminAnketComponent implements OnInit {
  anketler: Anket[];
  dataSource: any;
  displayedColumns = ["AnketAdi", "AnkSoruSay", "detay"];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<AnketDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: AlertService
  ) { }

  ngOnInit() {
    this.Anketlistele();
  }
  Anketlistele() {
    this.apiServis.AnketListe().subscribe((d: Anket[]) => {
      this.anketler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  Ekle() {
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

  Duzenle(kayit: Anket) {
    this.dialogRef = this.matDialog.open(AnketDialogComponent, {
      width: "400px",
      data: {
        kayit: kayit,
        islem: "duzenle"
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.AnketAdi = d.AnketAdi;
        this.apiServis.AnketDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.Anketlistele();
          }
        })
      }
    })
  }
  Sil(kayit: Anket) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px",
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.AnketAdi + " Adlı Anket Silinecektir Onaylıyor musunuz?";

    this.dialogRefConfirm.afterClosed().subscribe(d => {
      if (d) {
        kayit.AnketAdi = d.AnketAdi;
        this.apiServis.AnketSil(kayit.AnketId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.Anketlistele();
          }
        })
      }
    })
  }

}
