using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Anket_Hazirlama_Portali.ViewModel
{
    public class UyeModel
    {
        public int UyeId { get; set; }
        public string KullaniciAdi { get; set; }
        public string AdSoyad { get; set; }
        public string Mail { get; set; }
        public string Sifre { get; set; }
        public int Admin { get; set; }
        public Nullable<int> UyeCevapId { get; set; }
        public Nullable<int> UyeSoruId { get; set; }
    }
}