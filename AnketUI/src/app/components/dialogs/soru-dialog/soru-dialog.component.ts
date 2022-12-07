import { Anket } from './../../../models/Anket';
import { ApiService } from 'src/app/services/api.service';
import { Kategori } from 'src/app/models/Kategori';
import { Soru } from './../../../models/Soru';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-soru-dialog',
  templateUrl: './soru-dialog.component.html',
  styleUrls: ['./soru-dialog.component.css']
})
export class SoruDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Soru;
  islem: string;
  kategoriler: Kategori[];
  anketler: Anket[];
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<SoruDialogComponent>,
    public frmBuild: FormBuilder,
    public apiServis: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;

    if (this.islem == "ekle") {
      this.dialogBaslik = "Soru Ekle";
      this.yeniKayit = new Soru();
    }
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Soru Düzenle";
      this.yeniKayit = data.kayit;

    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.Kategorilistele();
    this.Anketlistele();

  }
  FormOlustur() {                          //kullanıcının yazacağı Alanlar
    return this.frmBuild.group({
      Soru: [this.yeniKayit.Soru],
      SoruKategoriId: [this.yeniKayit.SoruKategoriId],
      SoruAnketId: [this.yeniKayit.SoruAnketId]
    });
  }
  Kategorilistele() {
    this.apiServis.KategoriListe().subscribe((d: Kategori[]) => {
      this.kategoriler = d;

    });
  }
  Anketlistele() {
    this.apiServis.AnketListe().subscribe((d: Anket[]) => {
      this.anketler = d;

    });
  }
}
