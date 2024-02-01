import Footer from "@/components/Footer";
import Header from "@/components/Header"
import { InfoComponent } from "@/components/Informations"

export default function ContactPage() {
    return (
        <>
        <Header />
      <div className="flex justify-center">
        <InfoComponent
          title="Kontakt" 
          content={`
Kontakt

Jeśli masz jakiekolwiek pytania, sugestie lub uwagi, zachęcamy do kontaktu z nami. Jesteśmy dostępni za pomocą różnych kanałów komunikacji.

Adres:

[Nazwa Firmy/Podmiotu]
[Adres Firmy]
[Kod pocztowy, Miasto]

Telefon: [Numer Telefonu]
E-mail: [Adres E-mail]

Formularz kontaktowy:

[Formularz kontaktowy]

Godziny pracy:

Poniedziałek - Piątek: [Godziny otwarcia]
Sobota - Niedziela: [Godziny otwarcia]

Czekamy na Twoją wiadomość!
          `} 
        />
      </div>
      <Footer />
      </>
    );
  }
