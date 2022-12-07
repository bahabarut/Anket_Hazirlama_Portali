import { Anket } from './../../../models/Anket';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kategori } from 'src/app/models/Kategori';
import { KategoriDialogComponent } from '../kategori-dialog/kategori-dialog.component';

@Component({
  selector: 'app-anket-dialog',
  templateUrl: './anket-dialog.component.html',
  styleUrls: ['./anket-dialog.component.css']
})
export class AnketDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Anket;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<KategoriDialogComponent>,
    public frmBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;

    if (this.islem == "ekle") {
      this.dialogBaslik = "Anket Ekle";
      this.yeniKayit = new Anket();
    }
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Anket Düzenle";
      this.yeniKayit = data.kayit;

    }
    this.frm=this.FormOlustur();
  }

  ngOnInit() {
  }
  FormOlustur() {                //kullanıcının yazacağı Alanlar
    return this.frmBuild.group({
      AnketAdi: [this.yeniKayit.AnketAdi]
    });
  }

}
