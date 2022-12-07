import { Uye } from '../../../models/Uye';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-uye-dialogs',
  templateUrl: './uye-dialogs.component.html',
  styleUrls: ['./uye-dialogs.component.css']
})
export class UyeDialogsComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Uye;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UyeDialogsComponent>,
    public frmBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;

    if (this.islem == "ekle") {
      this.dialogBaslik = "Üye Ekle";
      this.yeniKayit = new Uye();
    }
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Üye Düzenle";
      this.yeniKayit = data.kayit;

    }
    this.frm=this.FormOlustur();
  }

  ngOnInit() {
  }
  FormOlustur() {                //kullanıcının yazacağı Alanlar
    return this.frmBuild.group({
      KullaniciAdi: [this.yeniKayit.KullaniciAdi],
      AdSoyad: [this.yeniKayit.AdSoyad],
      Mail: [this.yeniKayit.Mail],
      Sifre: [this.yeniKayit.Sifre],
      Admin: [this.yeniKayit.Admin]
    });
  }

}

