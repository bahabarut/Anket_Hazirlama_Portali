import { Sonuc } from './../models/Sonuc';
import { Uye } from './../models/Uye';
import { Cevap } from './../models/Cevap';
import { Kategori } from './../models/Kategori';
import { Soru } from './../models/Soru';
import { Anket } from './../models/Anket';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiurl = "http://localhost:55889/api/";

  constructor(
    public http: HttpClient
  ) { }

  /*Oturum İşlemler Başlangıc */
  tokenAl(kadi: string, parola: string) {
    var data = "username=" + kadi + "&password=" + parola + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiurl + "/token", data, { headers: reqHeader });
  }
  oturumKontrol() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  yetkiKontrol(yetkiler) {
    var sonuc: boolean = false;
    var uyeYetkiler: string[] = JSON.parse(localStorage.getItem("uyeYetkileri"));

    if (uyeYetkiler) {
      yetkiler.forEach(element => {
        if (uyeYetkiler.indexOf(element) > -1) {
          sonuc = true;
          return false;
        }

      });
    }
    return sonuc;
  }
  /* Oturum İşlemler Bitiş */

  /* API */

  AnketListe() {
    return this.http.get<Anket[]>(this.apiurl + "/anketliste");
  }
 AnketListeSonEklenenler(s: number) {
    return this.http.get<Anket[]>(this.apiurl + "/anketlistesoneklenenler/" + s);
  }
  AnketById(AnketId: number) {
    return this.http.get(this.apiurl + "/anketbyid/" + AnketId);
  }
  AnketEkle(ank: Anket) {
    return this.http.post(this.apiurl + "/anketekle", ank);
  }
  AnketDuzenle(ank: Anket) {
    return this.http.put(this.apiurl + "/anketduzenle", ank);
  }
  AnketSil(AnketId: number) {
    return this.http.delete(this.apiurl + "/anketsil/" + AnketId);
  }

  SoruListe() {
    return this.http.get<Soru[]>(this.apiurl + "/soruliste");
  }
  SoruListeSonEklenenler(s: number) {
    return this.http.get<Soru[]>(this.apiurl + "/sorulistesoneklenenler/" + s);
  }
  SoruById(SoruId: number) {
    return this.http.get(this.apiurl + "/sorubyid/" + SoruId);
  }
  SoruListeByKategoriId(KatId: number) {
    return this.http.get<Soru[]>(this.apiurl + "/sorulistebykategoriid/" + KatId);
  }
  SoruListeByAnketId(AnkId: number) {
    return this.http.get<Soru[]>(this.apiurl + "/sorulistebyanketid/" + AnkId);
  }
  SoruEkle(sru: Soru) {
    return this.http.post(this.apiurl + "/soruekle", sru);
  }
  SoruDuzenle(sru: Soru) {
    return this.http.put(this.apiurl + "/soruduzenle", sru);
  }
  SoruSil(SoruId: number) {
    return this.http.delete(this.apiurl + "/sorusil/" + SoruId);
  }

  KategoriListe() {
    return this.http.get<Kategori[]>(this.apiurl + "/kategoriliste");
  }
  KategoriById(KategoriId: number) {
    return this.http.get(this.apiurl + "/kategoribyid/" + KategoriId);
  }
  KategoriEkle(kat: Kategori) {
    return this.http.post(this.apiurl + "/kategoriekle", kat);
  }
  KategoriDuzenle(kat: Kategori) {
    return this.http.put(this.apiurl + "/kategoriduzenle", kat);
  }
  KategoriSil(KategoriId: number) {
    return this.http.delete(this.apiurl + "/kategorisil/" + KategoriId);
  }

  CevapListe() {
    return this.http.get<Cevap[]>(this.apiurl + "/cevapliste");
  }
  CevapSoruById(SoruId: number) {
    return this.http.get<Cevap[]>(this.apiurl + "/cevapsorubyid/" + SoruId);
  }
  CevapEkle(cvp: Cevap) {
    return this.http.post(this.apiurl + "/cevapekle", cvp);
  }
  CevapDuzenle(cvp: Cevap) {
    return this.http.put(this.apiurl + "/cevapduzenle", cvp);
  }
  CevapSil(CevapId: number) {
    return this.http.delete(this.apiurl + "/cevapsil/" + CevapId);
  }

  UyeListe() {
    return this.http.get<Uye[]>(this.apiurl + "/uyeliste");
  }
  UyeById(UyeId: number) {
    return this.http.get(this.apiurl + "/uyebyid/" + UyeId);
  }
  UyeSoruById(SoruId: number) {
    return this.http.get(this.apiurl + "/uyesorubyid/" + SoruId);
  }
  UyeEkle(uye: Uye) {
    return this.http.post(this.apiurl + "/uyeekle", uye);
  }
  UyeDuzenle(uye: Uye) {
    return this.http.put(this.apiurl + "/uyeduzenle", uye);
  }
  UyeSil(UyeId: number) {
    return this.http.delete(this.apiurl + "/uyesil/" + UyeId);
  }
}