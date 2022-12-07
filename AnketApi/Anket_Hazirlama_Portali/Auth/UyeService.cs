using Anket_Hazirlama_Portali.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Anket_Hazirlama_Portali.Models;
using Anket_Hazirlama_Portali.ViewModel;

namespace Anket_Hazirlama_Portali.Auth
{
    public class UyeService
    {
        AnketDBEntities db = new AnketDBEntities();

        public UyeModel UyeOturumAc(string kadi,string parola)
        {
            UyeModel uye = db.TUye.Where(s => s.KullaniciAdi == kadi && s.Sifre == parola).Select(x => new UyeModel()
            {
                UyeId = x.UyeId,
                KullaniciAdi = x.KullaniciAdi,
                AdSoyad = x.AdSoyad,
                Mail = x.Mail,
                Sifre = x.Sifre,
                Admin = x.Admin
                //UyeSoruId = x.UyeSoruId,
                //UyeCevapId = x.UyeCevapId
                
            }).SingleOrDefault();
            return uye;
        }
    }
}