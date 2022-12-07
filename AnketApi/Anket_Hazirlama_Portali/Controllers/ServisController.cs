using Anket_Hazirlama_Portali.Models;
using Anket_Hazirlama_Portali.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Anket_Hazirlama_Portali.Controllers
{
    [Authorize]
    public class ServisController : ApiController
    {
        AnketDBEntities db = new AnketDBEntities();
        SonucModel sonuc = new SonucModel();

        #region Anket

        [HttpGet]
        [Route("api/anketliste")]
        public List<AnketModel> AnketListe()
        {
            List<AnketModel> liste = db.TAnket.Select(x => new AnketModel()
            {

                AnketId = x.AnketId,
                AnketAdi = x.AnketAdi,
                AnkSoruSay = x.TSoru.Count

            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/anketlistesoneklenenler/{s}")]
        public List<AnketModel> AnketListeSonEklenenler(int s)
        {
            List<AnketModel> liste = db.TAnket.OrderByDescending(o => o.AnketId).Take(s).Select(x => new AnketModel()
            {

                AnketId = x.AnketId,
                AnketAdi = x.AnketAdi

            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/anketbyid/{AnketId}")]
        public AnketModel ListById(int AnketId)
        {
            AnketModel kayit = db.TAnket.Where(s => s.AnketId == AnketId).Select(x => new AnketModel()
            {

                AnketId = x.AnketId,
                AnketAdi = x.AnketAdi,
                AnkSoruSay = x.TSoru.Count


            }).SingleOrDefault();
            return kayit;
        }


        [HttpPost]
        [Route("api/anketekle")]
        public SonucModel AnketEkle(AnketModel model)
        {
            if (db.TAnket.Count(s => s.AnketAdi == model.AnketAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Anket Adı Kayıtlıdır...";
                return sonuc;
            }

            TAnket yeni = new TAnket();
            yeni.AnketAdi = model.AnketAdi;

            db.TAnket.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Anket Eklendi";

            return sonuc;
        }


        [HttpPut]
        [Route("api/anketduzenle")]
        public SonucModel AnketDuzenle(AnketModel model)
        {
            TAnket kayit = db.TAnket.Where(s => s.AnketId == model.AnketId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı...";
                return sonuc;
            }

            kayit.AnketAdi = model.AnketAdi;
            db.SaveChanges();


            sonuc.islem = true;
            sonuc.mesaj = "Anket Düzenlendi";

            return sonuc;
        }


        [HttpDelete]
        [Route("api/anketsil/{AnketId}")]
        public SonucModel AnketSil(int AnketId)
        {
            TAnket kayit = db.TAnket.Where(s => s.AnketId == AnketId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı...";
                return sonuc;
            }
            if (db.TSoru.Count(s => s.SoruAnketId == AnketId) > 0)  //KAtegoriye Kayıtlı Soru Varsa Kategori Silinemez...
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ankete Kayıtlı Soru Olduğu İçin Anket Silinemez";
                return sonuc;
            }

            db.TAnket.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Anket Silindi";

            return sonuc;
        }


        #endregion

        #region Soru

        [HttpGet]
        [Route("api/soruliste")]
        public List<SoruModel> SoruListe()
        {
            List<SoruModel> liste = db.TSoru.Select(x => new SoruModel()
            {
                SoruId = x.SoruId,
                Soru = x.Soru,
                SoruKategoriId = x.SoruKategoriId,
                SoruAnketId = x.SoruAnketId

            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/sorulistesoneklenenler/{s}")]
        public List<SoruModel> SoruListeSonEklenenler(int s)
        {
            List<SoruModel> liste = db.TSoru.OrderByDescending(o => o.SoruId).Take(s).Select(x => new SoruModel()
            {
                SoruId = x.SoruId,
                Soru = x.Soru,
                SoruAnketId = x.SoruAnketId,
                SoruKategoriId = x.SoruKategoriId

            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/sorubyid/{SoruId}")]
        public SoruModel SoruById(int SoruId)
        {
            SoruModel kayit = db.TSoru.Where(s => s.SoruId == SoruId).Select(x => new SoruModel()
            {
                SoruId = x.SoruId,
                Soru = x.Soru,
                SoruKategoriId = x.SoruKategoriId,
                SoruAnketId = x.SoruAnketId

            }).SingleOrDefault();
            return kayit;

        }

        [HttpGet]
        [Route("api/sorulistebykategoriid/{KategoriId}")]   //Kategorinin İd ye göre soruları listele (kategorinin sorularınıı listele)
        public List<SoruModel> SoruListeByKategoriId(int KategoriId)
        {
            List<SoruModel> liste = db.TSoru.Where(s => s.SoruKategoriId == KategoriId).Select(x => new SoruModel()
            {
                SoruId = x.SoruId,
                Soru = x.Soru,
                SoruKategoriId = x.SoruKategoriId,
                SoruAnketId = x.SoruAnketId

            }).ToList();
            return liste;

        }

        [HttpGet]
        [Route("api/sorulistebyanketid/{KategoriId}")]   //Anketin İd ye göre soruları listele (kategorinin sorularınıı listele)
        public List<SoruModel> SoruListeByAnketId(int AnketId)
        {
            List<SoruModel> liste = db.TSoru.Where(s => s.SoruKategoriId == AnketId).Select(x => new SoruModel()
            {
                SoruId = x.SoruId,
                Soru = x.Soru,
                SoruKategoriId = x.SoruKategoriId,
                SoruAnketId = x.SoruAnketId

            }).ToList();
            return liste;

        }

        [HttpPost]
        [Route("api/soruekle")]
        public SonucModel SoruEkle(SoruModel model)
        {
            if (db.TSoru.Count(s => s.Soru == model.Soru) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Soru Kayıtlıdır...";
                return sonuc;
            }

            TSoru yeni = new TSoru();

            yeni.Soru = model.Soru;
            yeni.SoruKategoriId = model.SoruKategoriId;
            yeni.SoruAnketId = model.SoruAnketId;

            db.TSoru.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Soru Eklendi";

            return sonuc;
        }

        [HttpPut]
        [Route("api/soruduzenle")]
        public SonucModel SoruDuzenle(SoruModel model)
        {
            TSoru kayit = db.TSoru.Where(s => s.SoruId == model.SoruId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı...";
                return sonuc;
            }

            kayit.Soru = model.Soru;
            kayit.SoruKategoriId = model.SoruKategoriId;
            kayit.SoruAnketId = model.SoruAnketId;

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Soru Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/sorusil/{SoruId}")]
        public SonucModel SoruSil(int SoruId)
        {
            TSoru kayit = db.TSoru.Where(s => s.SoruId == SoruId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı...";
                return sonuc;
            }
            if (db.TCevap.Count(s => s.CevapSoruId == SoruId) > 0)  //KAtegoriye Kayıtlı Soru Varsa Kategori Silinemez...
            {
                sonuc.islem = false;
                sonuc.mesaj = "Sorunun Cevapları Bulunduğu İçin Soru Silinemez";
                return sonuc;
            }

            db.TSoru.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Soru Silindi";

            return sonuc;
        }
        #endregion

        #region Kategori

        [HttpGet]
        [Route("api/kategoriliste")]

        public List<KategoriModel> KategoriListe()
        {
            List<KategoriModel> liste = db.TKategori.Select(x => new KategoriModel()
            {

                KategoriId = x.KategoriId,
                KategoriTuru = x.KategoriTuru,
                KatSoruSay = x.TSoru.Count

            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/kategoribyid/{KategoriId}")]
        public KategoriModel KategoriById(int KategoriId)
        {
            KategoriModel kayit = db.TKategori.Where(s => s.KategoriId == KategoriId).Select(x => new KategoriModel()
            {
                KategoriId = x.KategoriId,
                KategoriTuru = x.KategoriTuru,
                KatSoruSay = x.TSoru.Count
            }).SingleOrDefault();

            return kayit;
        }


        [HttpPost]
        [Route("api/kategoriekle")]
        public SonucModel KategoriEkle(KategoriModel model)
        {

            if (db.TKategori.Count(s => s.KategoriTuru == model.KategoriTuru) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kategori Türü Kayıtlıdır...";
                return sonuc;
            }

            TKategori yeni = new TKategori();

            yeni.KategoriTuru = model.KategoriTuru;
            db.TKategori.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Yeni Kategori Eklendi";

            return sonuc;
        }

        [HttpPut]
        [Route("api/kategoriduzenle")]
        public SonucModel KategoriDuzenle(KategoriModel model)
        {
            TKategori kayit = db.TKategori.Where(s => s.KategoriId == model.KategoriId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kategori Bulunamadı...";
                return sonuc;
            }

            kayit.KategoriTuru = model.KategoriTuru;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/kategorisil/{KategoriId}")]
        public SonucModel KategoriSil(int KategoriId)
        {
            TKategori kayit = db.TKategori.Where(s => s.KategoriId == KategoriId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı...";
                return sonuc;
            }
            if (db.TSoru.Count(s => s.SoruKategoriId == KategoriId) > 0)  //KAtegoriye Kayıtlı Soru Varsa Kategori Silinemez...
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kategoriye Kayıtlı Soru Olduğu İçin Kategori Silinemez";
                return sonuc;
            }

            db.TKategori.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Silindi";
            return sonuc;
        }
        #endregion

        #region Cevap


        [HttpGet]
        [Route("api/cevapliste")]
        public List<CevapModel> CevapListe()
        {
            List<CevapModel> liste = db.TCevap.Select(x => new CevapModel()
            {
                CevapId = x.CevapId,
                Cevap = x.Cevap,
                CevapSoruId = x.CevapSoruId

            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/cevapsorubyid/{SoruId}")]      //Soru İd ye göre cevapları listele
        public List<CevapModel> CevapSoruById(int SoruId)

        {
            List<CevapModel> liste = db.TCevap.Where(s => s.CevapSoruId == SoruId).Select(x => new CevapModel()
            {

                CevapId = x.CevapId,
                Cevap = x.Cevap,
                CevapSoruId = x.CevapSoruId

            }).ToList();
            return liste;
        }

        [HttpPost]
        [Route("api/cevapekle")]
        public SonucModel CevapEkle(CevapModel model)

        {
            if (db.TCevap.Count(s => s.Cevap == model.Cevap) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Cevap Kayıtlıdır...";
                return sonuc;
            }

            TCevap yeni = new TCevap();

            yeni.Cevap = model.Cevap;
            yeni.CevapSoruId = model.CevapSoruId;

            db.TCevap.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Cevap Eklendi";

            return sonuc;
        }

        [HttpPut]
        [Route("api/cevapduzenle")]
        public SonucModel CevapDuzenle(CevapModel model)
        {
            TCevap kayit = db.TCevap.Where(s => s.CevapId == model.CevapId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Cevap Bulunamadı...";
                return sonuc;
            }

            kayit.Cevap = model.Cevap;
            kayit.CevapSoruId = model.CevapSoruId;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Cevap Düzenlendi";

            return sonuc;

        }

        [HttpDelete]
        [Route("api/cevapsil/{CevapId}")]
        public SonucModel CevapSil(int CevapId)
        {
            TCevap kayit = db.TCevap.Where(s => s.CevapId == CevapId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Cevap Bulunamadı...";
                return sonuc;
            }

            db.TCevap.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Cevap Silindi";


            return sonuc;
        }
        #endregion

        #region Uye


        [HttpGet]
        [Route("api/uyeliste")]
        public List<UyeModel> UyeListe()
        {
            List<UyeModel> liste = db.TUye.Select(x => new UyeModel()
            {
                UyeId = x.UyeId,
                KullaniciAdi = x.KullaniciAdi,
                AdSoyad = x.AdSoyad,
                Mail = x.Mail,
                Sifre = x.Sifre,
                Admin = x.Admin,
                UyeSoruId = x.UyeSoruId,
                UyeCevapId = x.UyeCevapId
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/uyebyid/{UyeId}")]
        public UyeModel UyeById(int UyeId)
        {
            UyeModel kayit = db.TUye.Where(s => s.UyeId == UyeId).Select(x => new UyeModel()
            {
                UyeId = x.UyeId,
                KullaniciAdi = x.KullaniciAdi,
                AdSoyad = x.AdSoyad,
                Mail = x.Mail,
                Sifre = x.Sifre,
                Admin = x.Admin,
                UyeSoruId = x.UyeSoruId,
                UyeCevapId = x.UyeCevapId

            }).SingleOrDefault();
            return kayit;
        }


        [HttpGet]
        [Route("api/uyelistebycevapid/{CevapId}")]
        public List<UyeModel> UyeListeByCevapId(int CevapId)
        {
            List<UyeModel> liste = db.TUye.Where(s => s.UyeCevapId == CevapId).Select(x => new UyeModel()
            {
                UyeId = x.UyeId,
                KullaniciAdi = x.KullaniciAdi,
                AdSoyad = x.AdSoyad,
                Mail = x.Mail,
                Sifre = x.Sifre,
                Admin = x.Admin,
                UyeSoruId = x.UyeSoruId,
                UyeCevapId = x.UyeCevapId
            }).ToList();
            return liste;
        }


        [HttpPost]
        [Route("api/uyeekle")]
        public SonucModel UyeEkle(UyeModel model)
        {
            if (db.TUye.Count(s => s.Mail == model.Mail) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen E posta Adresi Sistemde Kayıtlıdır...";
                return sonuc;
            }
            if (db.TUye.Count(s => s.KullaniciAdi == model.KullaniciAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kullanıcı Adı Kullanılmaktadır...";
                return sonuc;
            }

            TUye yeni = new TUye();

            yeni.KullaniciAdi = model.KullaniciAdi;
            yeni.AdSoyad = model.AdSoyad;
            yeni.Mail = model.Mail;
            yeni.Sifre = model.Sifre;
            yeni.Admin = model.Admin;
            //yeni.UyeCevapId = model.UyeCevapId;
            //yeni.UyeSoruId = model.UyeSoruId;

            db.TUye.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yeni Üye Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/uyeduzenle")]
        public SonucModel UyeDuzenle(UyeModel model)
        {
            TUye kayit = db.TUye.Where(s => s.UyeId == model.UyeId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı...";
                return sonuc;
            }

            kayit.KullaniciAdi = model.KullaniciAdi;
            kayit.AdSoyad = model.AdSoyad;
            kayit.Mail = model.Mail;
            kayit.Sifre = model.Sifre;
            kayit.Admin = model.Admin;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kayıt Düzenlendi";
            return sonuc;
        }


        [HttpDelete]
        [Route("api/uyesil/{UyeId}")]
        public SonucModel UyeSil(int UyeId)
        {
            TUye kayit = db.TUye.Where(s => s.UyeId == UyeId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı...";
                return sonuc;
            }

            db.TUye.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kayıt Silindi";
            return sonuc;
        }
        #endregion

    }
}
