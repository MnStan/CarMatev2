import Footer from "@/components/Footer";
import Header from "@/components/Header"
import { InfoComponent } from "@/components/Informations"

export default function TermsPage() {
    return (
        <>
        <Header />
      <div className="flex justify-center">
        <InfoComponent
          title="Regulamin" 
          content={`
          Regulamin Strony Internetowej CarMate

§1. Postanowienia ogólne

Niniejszy regulamin określa zasady korzystania ze strony internetowej CarMate (dalej zwanej Stroną), prowadzonej przez [nazwa firmy/podmiot odpowiedzialny], z siedzibą w [adres] (dalej zwanej Administratorem).
Korzystanie ze Strony jest równoznaczne z akceptacją niniejszego regulaminu oraz zobowiązuje do jego przestrzegania.
§2. Definicje

Użyte w regulaminie terminy oznaczają:
a) Strona - witryna internetowa CarMate, dostępna pod adresem ,
b) Użytkownik - osoba fizyczna lub prawna, korzystająca ze Strony,
c) Administrator -  z siedzibą w ,
d) Oferta - informacje o wynajmie samochodu udostępniane przez Użytkowników na Stronie.
§3. Zasady ogólne

Strona CarMate służy do publikowania ofert wynajmu samochodu.
Korzystanie ze Strony jest możliwe po założeniu konta użytkownika.
Każdy Użytkownik jest odpowiedzialny za treść publikowanych ofert oraz za zachowanie zgodności z obowiązującym prawem.
Administrator zastrzega sobie prawo do usuwania ofert niezgodnych z prawem lub z zasadami określonymi w regulaminie.
§4. Rejestracja i konto użytkownika

Aby korzystać ze Strony w pełnym zakresie, Użytkownik musi założyć konto.
Rejestracja wymaga podania prawdziwych danych osobowych.
Użytkownik jest zobowiązany do zachowania poufności danych logowania oraz do nieudostępniania ich osobom trzecim.
Każdy Użytkownik może posiadać tylko jedno konto.
Administrator zastrzega sobie prawo do zablokowania lub usunięcia konta użytkownika w przypadku naruszenia postanowień regulaminu.
§5. Publikowanie ofert

Oferty wynajmu samochodu mogą być publikowane wyłącznie przez zarejestrowanych Użytkowników.
Treść oferty musi być zgodna z prawem oraz nie może naruszać dóbr osobistych innych osób.
Użytkownik jest odpowiedzialny za aktualność i wiarygodność informacji zawartych w ofercie.
Administrator zastrzega sobie prawo do moderacji i usuwania ofert niezgodnych z regulaminem.
§6. Postanowienia końcowe

Administrator zastrzega sobie prawo do zmiany regulaminu.
Wszelkie spory wynikłe z korzystania ze Strony będą rozpatrywane zgodnie z prawem obowiązującym na terytorium Rzeczypospolitej Polskiej.
Niniejszy regulamin wchodzi w życie z dniem opublikowania na Stronie.      
          `} 
        />
      </div>
      <Footer />
      </>
    );
  }