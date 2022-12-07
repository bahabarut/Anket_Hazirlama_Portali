import { SoruDialogComponent } from './../../dialogs/soru-dialog/soru-dialog.component';
import { Soru } from './../../../models/Soru';
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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-soru',
  templateUrl: './admin-soru.component.html',
  styleUrls: ['./admin-soru.component.css']
})
export class AdminSoruComponent implements OnInit {
  sorular: Soru[];
  kategoriler: Kategori[];
  secKat: Kategori;
  katId: number;
  dataSource: any;
  displayedColumns = ["Soru", "SoruKategoriId","SoruAnketId", "detay"];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<SoruDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: AlertService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.Kategorilistele();
    this.route.params.subscribe(p => {
      if (p['katId']) {
        this.katId = p['katId'];
        this.Sorulistele();
      }
    });
  }



  Sorulistele() {
    this.apiServis.SoruListeByKategoriId(this.katId).subscribe((d: Soru[]) => {
      this.sorular = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }


  Kategorilistele() {
    this.apiServis.KategoriListe().subscribe((d: Kategori[]) => {
      this.kategoriler = d;

    });
  }
  KategoriSec(kat: Kategori) {
    this.katId = kat.KategoriId;
    this.Sorulistele();
  }

  Ekle() {
    var yeniKayit: Soru = new Soru();
    this.dialogRef = this.matDialog.open(SoruDialogComponent, {
      width: "600px",
      data: {
        kayit: yeniKayit,
        islem: "ekle"
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        console.log(d);
        this.apiServis.SoruEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.Sorulistele();
          }
        })
      }
    })
  }

  Duzenle(kayit: Soru) {
    this.dialogRef = this.matDialog.open(SoruDialogComponent, {
      width: "600px",
      data: {
        kayit: kayit,
        islem: "duzenle"
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.Soru = d.Soru;
        kayit.SoruKategoriId = d.SoruKategoriId;
        kayit.SoruAnketId = d.SoruAnketId;
        this.apiServis.SoruDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.Sorulistele();
          }
        })
      }
    })
  }
  Sil(kayit: Soru) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px",
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.Soru + " Sorusu Silinecektir Onaylıyor musunuz?";

    this.dialogRefConfirm.afterClosed().subscribe(d => {
      if (d) {
        kayit.Soru = d.Soru;
        this.apiServis.SoruSil(kayit.SoruId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.Sorulistele();
          }
        })
      }
    })
  }

}


