import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { kaydetVeGoster } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import "../App.css";

const schema = yup.object().shape({
  ad: yup.string().required("Ad zorunludur"),
  soyad: yup.string().required("Soyad zorunludur"),
  yas: yup
    .number()
    .required("Yaş zorunludur")
    .min(0, "Değer 0 veya daha büyük olmalıdır.")
    .integer("Ondalık sayı olamaz"),
  tc: yup
    .string()
    .required("TC Kimlik Numarası zorunludur")
    .matches(/^\d{11}$/, "TC Kimlik Numarası 11 haneli olmalıdır"),
  neden: yup.string().required("Başvuru Nedeni zorunludur"),
  adres: yup.string().required("Adres Bilgisi zorunludur"),
  fotograflar: yup.mixed().required("Fotograflar/Ekler zorunludur"),
});

function BasvuruOlustur() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const yeniKod = await kaydetVeGoster(data);
      console.log("Başvuru başarıyla kaydedildi. Başvuru Kodu:", yeniKod);
      // Formun sıfırlanması ve /basvuru-basarili sayfasına yönlendirme
      reset(); // Form sıfırlama
      navigate("/basvuru-basarili", { state: { basvuruKodu: yeniKod } }); // Başvuru kodunu ileterek yönlendirme
    } catch (error) {
      console.error("Başvuru kaydedilirken bir hata oluştu:", error);
    }
  };

  return (
    <div className="form-container">
      <form className="application-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="ad">Ad</label>
          <input type="text" id="ad" name="ad" {...register("ad")} />
          {errors.ad && (
            <span className="error-message">{errors.ad.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="soyad">Soyad</label>
          <input type="text" id="soyad" name="soyad" {...register("soyad")} />
          {errors.soyad && (
            <span className="error-message">{errors.soyad.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="yas">Yaş</label>
          <input
            type="number"
            id="yas"
            name="yas"
            {...register("yas")}
            min="0"
          />
          {errors.yas && (
            <span className="error-message">{errors.yas.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="tc">TC Kimlik Numarası</label>
          <input type="text" id="tc" name="tc" {...register("tc")} />
          {errors.tc && (
            <span className="error-message">{errors.tc.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="neden">Başvuru Nedeni</label>
          <textarea id="neden" name="neden" {...register("neden")} />
          {errors.neden && (
            <span className="error-message">{errors.neden.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="adres">Adres Bilgisi</label>
          <textarea id="adres" name="adres" {...register("adres")} />
          {errors.adres && (
            <span className="error-message">{errors.adres.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="file-upload" className="file-input-label">
            Dosyaları Seç
            <input
              type="file"
              id="file-upload"
              name="fotograflar"
              multiple
              {...register("fotograflar")}
              className="file-input"
            />
          </label>
          {errors.fotograflar && (
            <span className="error-message">{errors.fotograflar.message}</span>
          )}
        </div>

        <button type="submit" className="submit-button">
          Gönder
        </button>
      </form>
    </div>
  );
}

export default BasvuruOlustur;
