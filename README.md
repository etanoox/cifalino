# Cifalino Apartment — MVP

Landing single-page in inglese, dedicata a un solo appartamento a Cibali, Catania. React + TypeScript + Vite + Tailwind CSS 4 + framer-motion + lucide-react. Nessun backend richiesto. Nessuna pubblicazione o modifica al server effettuata.

## Avvio

Richiede Node.js 22.12 o successivo e npm (verificato con Node 24).

```bash
npm ci
npm run dev
```

Apri `http://localhost:4173`. Per la versione ottimizzata:

```bash
npm run build
npm run preview
```

`npm run check` esegue TypeScript. La build genera in `dist/` HTML completo prerenderizzato, CSS, JavaScript e tutte le risorse locali. Il contenuto principale, le FAQ, i contatti e i codici restano disponibili nell'HTML anche senza JavaScript. Menu mobile e galleria richiedono JavaScript; senza JavaScript si possono usare le ancore e i contatti telefonici/email. `dist/` si serve via HTTP, non aprendo direttamente index.html con file://.

## Dove modificare

| Contenuto | File |
| --- | --- |
| Alloggio, contatti, collegamenti, testimonianze, FAQ, feature flag | `src/data/site.ts` |
| Catalogo fotografie, originali, descrizioni, didascalie e dimensioni | `src/data/photos.ts` |
| Dotazioni principali e gruppi espandibili | `src/data/amenities.ts` |
| Palette esatta e collegamento al tema Tailwind | `src/styles.css`, blocchi `:root` e `@theme inline` |
| Riferimenti tipizzati ai token CSS | `src/data/brand.ts` |
| Form soggiorno e presentazione | `src/components/Stay.tsx` |
| Validazione delle date e costruzione della bozza WhatsApp | `src/lib/stay.ts` |
| Meta title, description, canonical e Open Graph | `index.html` |
| Dati strutturati fattuali | `structuredData` in `src/data/site.ts` |
| Prerender | `src/entry-server.tsx`, `scripts/prerender.mjs` |

## Foto, font e brand

Le 12 fotografie, la planimetria e la foto della Fontana dell'Elefante sono copie locali degli asset pubblicati su cifalino.com. Tutte le fotografie sono state esaminate visivamente; nessuna stanza o caratteristica è stata generata o modificata. L'immagine della città è indicata come destinazione, non vista dall'appartamento. Le sorgenti esatte sono nel catalogo TypeScript.

`public/images/logo.svg` è l'SVG originale, non ridisegnato né ricolorato; SHA-256: `f962f86bcc7a181bdce739bce433f533331fff39109d276ceef8b282d0511939`.

CircularStd è stato identificato nel CSS del sito originale e recuperato dagli stessi URL pubblici in `/wp-content/uploads/2024/04/`: Medium, Bold e Black, in WOFF2. È servito localmente con font-display swap. La famiglia e i tre pesi sono sostituibili nel CSS. Non è stato inventato un font o un ulteriore brandbook.

Le copie WebP originali sono conservate, con varianti responsive WebP/AVIF a 480 e 800 px quando la sorgente lo consente, più AVIF a risoluzione originale. Nessun ingrandimento dei file. Il lightbox usa i WebP originali e object-fit contain. Solo la foto principale della hero ha priorità alta; le altre usano lazy loading e dimensioni riservate. Le fotografie originali sono già compresse: le varianti servono a ridurre il download sui display più piccoli.

I colori di base della UI corrispondono ai token forniti. Gli altri colori di superficie sono esclusivamente trasparenze o miscele della palette. Testo scuro sul turchese; testo bianco sul fondo scuro. Il pulsante fucsia usa testo bianco di 20 px, peso 700; il rapporto di contrasto viene verificato per testo grande. Il logo mantiene i propri colori originali.

## Richiesta disponibilità

Il form accetta arrivo e partenza nel futuro, con partenza successiva all'arrivo. Il giorno corrente è calcolato nel fuso Europe/Rome. Nessun vincolo commerciale di durata, capienza o prenotabilità è dedotto. Nessuna data viene inviata a WordPress o ad altri motori.

Un invio valido apre `wa.me/393341924709` con una bozza codificata; il visitatore deve inviarla personalmente. Un collegamento di riserva permette di riaprire la bozza se il browser blocca la nuova scheda. Non vengono simulati disponibilità, prenotazioni, pagamenti, tariffe o conferme. Nessun database, cookie applicativo, analytics o raccolta dati remota è stato aggiunto. Telefono ed email sono sempre alternative visibili.

Privacy: collegamento alla pagina WordPress esistente, verificata raggiungibile. L'informativa esistente va adeguata separatamente ai servizi effettivamente mantenuti. La mappa Google si carica soltanto dopo la richiesta del visitatore; è sempre presente anche il collegamento esterno. Il centro della mappa non è usato come coordinate dell'immobile.

WordPress Booking, Airbnb e Booking.com sono conservati in `bookingAlternatives` con `enabled: false`: la prenotabilità non è stata verificata operativamente. Per abilitarli, verificare destinazione e servizio, quindi modificare il flag. Nessun parametro di date viene aggiunto. Le integrazioni future rimangono separate dalla presentazione.

## Journal e continuità WordPress

`features.journal = false`, `journalArticles = []`. `JournalSection` è predisposto tra ospitalità/testimonianze e FAQ; non produce markup se non ci sono articoli. Non esistono chiamate alla REST API, articoli importati, link al blog o spazi vuoti nella landing. La voce Journal compare soltanto con flag attivo e contenuti reali. Non sono state create pagine articolo o un CMS.

Il rilascio dovrà servire la nuova landing esclusivamente alla home e ai percorsi statici che le appartengono. Non installare un fallback SPA globale. Preservare WordPress, privacy, booking eventualmente mantenuto, `/wp-admin/`, `/wp-json/`, upload, blog e tutti i permalink editoriali già esistenti. Questo pacchetto non contiene riscritture Apache/Nginx né modifiche al server o redirect editoriali.

`public/sitemap-landing.xml` descrive solo la nuova home. Non sostituisce l'indice sitemap di WordPress: mantenere l'indice e le sitemap delle pagine/articoli già presenti, evitando una doppia voce home se si integra questo file nell'indice. Nessun articolo è importato per creare la sitemap. Canonical e Open Graph puntano alla destinazione finale cifalino.com; su un eventuale staging configurare separatamente l'esclusione dall'indicizzazione. L'immagine Open Graph è una foto reale dell'alloggio, copiata localmente.

## Sole condizioni commerciali ancora da confermare

- Listino e promozione novembre: sul sito sorgente convivono €60, €40/giorno e un riferimento a sconto 15%. Nessuna tariffa è stata riportata nell'MVP.
- Pagamenti, caparra e cancellazioni: le condizioni pubblicate sono incoerenti; confermare una sola politica prima di renderla pubblica.
- Minimo 2 notti, massimo 29 notti e prenotabilità entro 6 mesi risultano pubblicati, ma non sono confermati operativamente e non vincolano il form.
- Concordare per le date richieste orari di arrivo/partenza, prezzo totale e condizioni prima della conferma del soggiorno.

## Verifica finale

- TypeScript e build di produzione completati; HTML prerenderizzato con un solo H1, sezioni, FAQ, contatti, CIR/CIN e JSON-LD. Lo script di build fallisce se mancano i punti di inserimento o il contenuto principale.
- Controllo visivo desktop (circa 1348 px) e mobile in viewport incorporato a 390 e 320 px: hero, fotografie, form e footer. Nessuna eccedenza orizzontale rilevata a 320 px.
- Menu mobile: apertura, Escape, chiusura dopo selezione e ancore sotto l'header. Galleria: foto intere, contatore, avanti/indietro, frecce tastiera, Escape e ritorno del focus al pulsante iniziale. Planimetria ingrandita e collegamento all'originale.
- Date: campi obbligatori, date passate, partenza precedente/uguale all'arrivo, date impossibili, anno bisestile e messaggio codificato. Provata apertura di una bozza con date di test; nessun messaggio inviato.
- Controllati href di telefono, email, firma e privacy; mappa assente prima del click e iframe con titolo accessibile dopo la richiesta.
- Palette: tutti gli 11 token esatti. Contrasto testo/turchese 4,51:1; bianco/scuro 11,04:1; bianco/fucsia 4,17:1 (CTA con testo grande, 20 px e grassetto).
- Journal disattivato, elenco vuoto e nessuna sezione/link/articolo nell'HTML prodotto. Nessuna chiamata al blog.
- Movimento ridotto: verificati nel codice MotionConfig, regole CSS, disattivazione del tilt e transizioni della galleria. Non effettuata emulazione del sistema operativo. Swipe implementato; prova su un dispositivo touch fisico non eseguita.

Verifica mirata in Chromium, non un audit completo WCAG o una matrice di dispositivi/browser reali. Prenotazioni, pagamenti, disponibilità live e integrazioni con portali restano disattivati. Nessun cambiamento al sito pubblico. Tutti gli asset elencati per l'MVP sono stati scaricati correttamente; la consultazione Google Maps dipende dal servizio esterno e dispone del link alternativo.
