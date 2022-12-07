import { CevapDialogComponent } from './../../dialogs/cevap-dialog/cevap-dialog.component';
import { Cevap } from './../../../models/Cevap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Sonuc } from 'src/app/models/Sonuc';
import { Soru } from 'src/app/models/Soru';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { SoruDialogComponent } from '../../dialogs/soru-dialog/soru-dialog.component';

@Component({
  selector: 'app-admin-cevap',
  templateUrl: './admin-cevap.component.html',
  styleUrls: ['./admin-cevap.component.css']
})
export class AdminCevapComponent implements OnInit {
  cevaplar: Cevap[];
  sorular: Soru[];
  secKat: Soru;
  soruId: number;
  dataSource: any;
  displayedColumns = ["Cevap", "CevapId", "detay"];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<CevapDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: AlertService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.Sorulistele();
    this.route.params.subscribe(p => {
      if (p['soruId']) {
        this.soruId = p['soruId'];
        this.Cevaplistele();
      }
    });
  }



  Cevaplistele() {
    this.apiServis.CevapSoruById(this.soruId).subscribe((d: Cevap[]) => {
      this.cevaplar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }


  Sorulistele() {
    this.apiServis.SoruListe().subscribe((d: Soru[]) => {
      this.sorular = d;

    });
  }
  SoruSec(sor: Soru) {
    this.soruId = sor.SoruId;
    this.Cevaplistele();
  }

  Ekle() {
    var yeniKayit: Cevap = new Cevap();
    this.dialogRef = this.matDialog.open(CevapDialogComponent, {
      width: "600px",
      data: {
        kayit: yeniKayit,
        islem: "ekle"
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        console.log(d);
        this.apiServis.CevapEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.Cevaplistele();
          }
        })
      }
    })
  }

  Duzenle(kayit: Cevap) {
    this.dialogRef = this.matDialog.open(CevapDialogComponent, {
      width: "600px",
      data: {
        kayit: kayit,
        islem: "duzenle"
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.Cevap=d.Cevap;
        this.apiServis.CevapDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.Cevaplistele();
          }
        })
      }
    })
  }
  Sil(kayit: Cevap) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px",
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.Cevap + " Cevap Silinecektir Onaylıyor musunuz?";

    this.dialogRefConfirm.afterClosed().subscribe(d => {
      if (d) {
        kayit.Cevap = d.Cevap;
        this.apiServis.CevapSil(kayit.CevapId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.Cevaplistele();
          }
        })
      }
    })
  }

}
