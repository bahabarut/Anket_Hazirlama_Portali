import { Kategori } from './../../../models/Kategori';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-kategori-dialog',
  templateUrl: './kategori-dialog.component.html',
  styleUrls: ['./kategori-dialog.component.css']
})
export class KategoriDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Kategori;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<KategoriDialogComponent>,
    public frmBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;

    if (this.islem == "ekle") {
      this.dialogBaslik = "Kategori Ekle";
      this.yeniKayit = new Kategori();
    }
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Kategori Düzenle";
      this.yeniKayit = data.kayit;

    }
    this.frm=this.FormOlustur();
  }

  ngOnInit() {
  }
  FormOlustur() {                //kullanıcının yazacağı Alanlar
    return this.frmBuild.group({
      KategoriTuru: [this.yeniKayit.KategoriTuru]
    });
  }

}
