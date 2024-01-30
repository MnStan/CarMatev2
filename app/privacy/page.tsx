import Footer from "@/components/Footer";
import Header from "@/components/Header"
import { InfoComponent } from "@/components/Informations"

export default function PrivacyPolicyPage() {
    return (
        <>
        <Header />
      <div className="flex justify-center">
        <InfoComponent
          title="Polityka Prywatności" 
          content={`
Wprowadzenie

Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych przekazanych przez Użytkowników w związku z korzystaniem ze serwisu internetowego "CarMate". Administratorem danych osobowych jest [nazwa firmy/podmiot odpowiedzialny], z siedzibą w [adres]. Korzystanie ze Strony jest równoznaczne z akceptacją niniejszego regulaminu oraz zobowiązuje do jego przestrzegania.

Rodzaje gromadzonych danych

Dane osobowe

Podczas korzystania ze Strony mogą być gromadzone dane osobowe Użytkowników, takie jak:
- Imię i nazwisko,
- Adres e-mail,
- Numer telefonu,
- Dane dotyczące transakcji.

Dane przeglądania

Podczas korzystania ze Strony gromadzone są także dane dotyczące przeglądania, takie jak adres IP, typ przeglądarki, czas spędzony na Stronie oraz inne informacje zbierane za pomocą plików cookie i podobnych technologii.

Cel gromadzenia danych

Dane osobowe Użytkowników są gromadzone w celu:
- Realizacji zamówień i umów,
- Obsługi zapytań i reklamacji,
- Dostarczania informacji marketingowych, jeśli Użytkownik wyrazi na to zgodę,
- Udoskonalania Strony i dostosowywania jej do potrzeb Użytkowników.

Pliki cookie

Strona wykorzystuje pliki cookie w celu zapewnienia prawidłowego funkcjonowania, analizy ruchu oraz personalizacji treści. Użytkownik ma możliwość zarządzania ustawieniami dotyczącymi plików cookie za pomocą ustawień przeglądarki internetowej.

Udostępnianie danych osobowych

Dane osobowe Użytkowników mogą być udostępniane podmiotom współpracującym z Administratorem w zakresie niezbędnym do realizacji usług świadczonych za pośrednictwem Strony.

Bezpieczeństwo danych

Administrator podejmuje wszelkie niezbędne środki techniczne i organizacyjne w celu ochrony danych osobowych Użytkowników przed utratą, nieuprawnionym dostępem, zniszczeniem lub ujawnieniem.

Kontakt

W przypadku pytań lub wątpliwości dotyczących Polityki Prywatności, prosimy o kontakt pod adresem [adres e-mail] lub [numer telefonu].
          `} 
        />
      </div>
      <Footer />
      </>
    );
  }
