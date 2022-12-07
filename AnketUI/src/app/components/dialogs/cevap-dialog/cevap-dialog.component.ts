import { Cevap } from './../../../models/Cevap';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Anket } from 'src/app/models/Anket';
import { Kategori } from 'src/app/models/Kategori';
import { Soru } from 'src/app/models/Soru';
import { ApiService } from 'src/app/services/api.service';
import { SoruDialogComponent } from '../soru-dialog/soru-dialog.component';

@Component({
  selector: 'app-cevap-dialog',
  templateUrl: './cevap-dialog.component.html',
  styleUrls: ['./cevap-dialog.component.css']
})
export class CevapDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Cevap;
  islem: string;
  sorular: Soru[];
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<SoruDialogComponent>,
    public frmBuild: FormBuilder,
    public apiServis: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;

    if (this.islem == "ekle") {
      this.dialogBaslik = "Cevap Ekle";
      this.yeniKayit = new Cevap();
    }
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Cevap Düzenle";
      this.yeniKayit = data.kayit;

    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.Sorulistele();
  }
  FormOlustur() {                          //kullanıcının yazacağı Alanlar
    return this.frmBuild.group({
      Cevap: [this.yeniKayit.Cevap],
      CevapSoruId: [this.yeniKayit.CevapSoruId]
    });
  }
  Sorulistele() {
    this.apiServis.SoruListe().subscribe((d: Soru[]) => {
      this.sorular = d;

    });
  }

}
