
# Başvuru/Ticket Yönetim Sistemi

Bu proje, kullanıcıların başvuru formunu doldurarak başvurularını takip edebildiği ve yetkili kullanıcıların bu başvuruları yönetebildiği bir başvuru/ticket yönetim sistemidir.

## Kullanılan Teknolojiler

-   React Hooks
-   Router (react-router/ reach router / vs.)
-   Context API
-   Form Yönetim Kütüphanesi (react-hook-form (önerilen) / formik / vs.)
-   Validation Kütüphanesi (yup (önerilen), joi, vs.)
-   Uygulama bir servise (ör. Netlify, Vercel gibi) deploy edilecek ve README dosyasında halka açık bir link bulunmalıdır.
-   Open source
-   Eslint


## Case Detayları

-   Proje, herkese açık bir başvuru formunun doldurulması ile başlar.
-   Form dolduran kullanıcılara başvuru takip kodları verilir ve bu kodlarla başvurularını takip edebilirler.
-   Yetkili kullanıcılar başvuruları görüntüleyebilir, güncelleyebilir ve cevaplayabilir.
-   Uygulama, birden fazla route/path içerir.

## Routes/Paths

-   `/basvuru-olustur` (varsayılan)
    -   Halka açık endpoint.
    -   Herhangi bir kullanıcının başvuru formunu doldurmasını sağlar.
    -   Başvuru formunda [Ad, Soyad, Yaş, TC, Başvuru Nedeni, Adres Bilgisi, Fotograflar/Ekler, Gönder] butonu yer alır.
-   `/basvuru-basarili`
    -   Başvuru formu doldurulduktan sonra gelen sayfa.
    -   Teşekkür mesajı ve başvuru detayları ile başvuru kodu bulunur.
-   `/basvuru-sorgula`
    -   Başvuru kodu girilebilen bir input ve sorgula butonu bulunur.
-   `/basvuru/{basvuruNo}`
    -   Başvuru varsa bilgileri, durumu ve cevapları içerir.
-   `/admin`
    -   Kullanıcı giriş formu bulunur.
    -   U:kodluyoruz@example.com, p:bootcamp109 bilgileri ile giriş yapılabilir.
-   `/admin/basvuru-listesi`
    -   Bekleyen başvuruların listesi yer alır.
    -   Her bir başvuruyu görüntüle butonu vardır.
-   `/admin/basvuru/{basvuruNo}`
    -   Başvurunun durumu güncellenebilir ve başvuruya cevap yazılabilir.
    -   Yazılan cevap son kullanıcı tarafından görüntülenebilir.

## Gereksinimler

-   Tüm formlarda gerekli validasyonlar olmalıdır.
-   Backend yazmak zorunlu değildir, firebase ya da mock bir API kullanılabilir.