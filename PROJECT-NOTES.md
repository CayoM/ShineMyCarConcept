# Shine My Car — Website-Projekt: Kontext & Regeln

Diese Datei fasst alles zusammen, was in dieser Session recherchiert, entschieden und gebaut
wurde — gedacht als Übergabe an eine neue Session (z. B. Claude Code lokal), damit nichts
verloren geht.

---

## 1. Auftrag

Extrem hochwertige, SEO-freundliche, GitHub-Pages-deploybare Website für **Shine My Car**
(Fahrzeugaufbereitung, Böblingen) — als Mock zur Feedback-Runde, danach Feinschliff.
Anforderungen: eigenständige Recherche, Bilder/Videos, SEO, GitHub-Pages-Deploybarkeit.

## 2. Fakten zur Firma (recherchiert von shinemycar.de)

- **Adresse:** Wolf-Hirth-Straße 28, 71034 Böblingen
- **Telefon:** +49 1575 2471319
- **Facebook:** https://www.facebook.com/Shine-My-Car-405880823537123/
- **Leistungen:** Außenwäsche (Hand/maschinell), Felgenreinigung, Teerentfernung,
  3-Stufen-Lackpolitur, Nanoversiegelung, Motorwäsche, Keramikversiegelung, Wax-Versiegelung,
  Lederreinigung/-reparatur, Ozon-Geruchsneutralisation (Tier-/Rauchgeruch),
  Flugrost-/Kratzerentfernung, Ausbeultechnik, Beilackierung.
  Spezialisierung: **Leasingrückläufer & Messefahrzeuge**.
- **Preise:** keine Angaben, alles "auf Anfrage"
- **Bewertungen:** online keine auffindbar (→ im Mock nur klar markierte Platzhalter-Testimonials)
- **Ton der bestehenden Seite:** kundenorientiert, vertrauensbildend, freundlich-deutsch

## 3. SEO-Recherche (Kernbegriffe)

Fahrzeugaufbereitung Böblingen, Autoaufbereitung Stuttgart, Keramikversiegelung,
Lackaufbereitung, Innenreinigung Auto, Politur, Nanoversiegelung,
Leasingrückläufer-Aufbereitung. JSON-LD-Typ gewählt: `AutoWash` (schema.org).

## 4. Design-Historie — WICHTIG, bitte lesen bevor weitergebaut wird

1. **Entwurf 1 (verworfen):** Dunkles Onyx + Champagner-Gold, Serife (Fraunces) + Sans,
   Glass-Cards, Scroll-Counter, Drag-Regler für Vorher/Nachher.
   → **Cayos Feedback:** sieht fast identisch aus wie ein früheres Projekt ("LichtKonzept"),
   obwohl das Thema komplett anders ist — selbes Muster, selbe Farben, selbe Regler-Animation.
   Berechtigte Kritik: das ist ein generisches "AI-Premium-Template" (dunkel + Gold + Glass),
   das ich unabhängig vom Thema reflexhaft baue, statt es aus dem Thema abzuleiten.

2. **Entwurf 2 ("Ceramic Clean", freigegeben als Richtung):** Helles Design, EIN kräftiger
   Blau-Akzent (`#0e7fe1`, Anspielung auf Keramikversiegelung/Wassertropfen), viel Weißraum,
   glänzende statt dunkle Flächen. Typografie zunächst Space Grotesk + Inter, dann auf
   **Archivo + Inter** geändert (Space Grotesk gilt laut Artifact-Design-Skill als
   überstrapazierter "AI-Standardpick").
   → **Cayos Feedback danach:** wirkt weder premium noch hat es Wow-Effekte. Zu clean/generic,
   zu brav bei Bildkomposition, Maßstab, Typografie, Bewegung.

3. **Regel für alle zukünftigen Aufträge (auch andere Kunden!):**
   - NICHT automatisch zu dunklem Gold/Glass-Luxus-Muster greifen, wenn "premium" gefordert ist.
   - Farbpalette/Typografie/Motive IMMER explizit aus dem konkreten Thema/Produkt ableiten,
     nicht aus einem generischen "Premium"-Reflex.
   - "Sauber und hell" ist nicht automatisch "premium" — für echten Wow-Faktor braucht es
     i. d. R. entweder (a) echtes, dramatisches Bild-/Videomaterial, oder (b) mutigere
     Art-Direction (große Typografie, generative/lebendige Bewegung, Tiefe/Kontrast) —
     ein braves Corporate-SaaS-Layout reicht nicht.
   - Space Grotesk, Inter als "sichere" Wahl, warmes Creme+Terracotta, dunkel+Neon-Akzent,
     zentrierte Layouts, `rounded-lg` überall — das sind laut Artifact-Design-Skill bekannte
     AI-Cliché-Muster. Bewusst vermeiden, wenn nicht explizit vom Kunden gewünscht.

## 5. Technische Einschränkungen dieser Cloud-Sandbox (gelten NICHT zwingend lokal)

- Externe Bild-/Video-CDNs (Pexels, Unsplash, Wikimedia Commons, Pixabay) sind über die
  Bash-Egress-Policy dieser Sandbox blockiert (`connect_rejected`, Organisationsrichtlinie).
  → Deshalb enthält der aktuelle Mock **keine echten Fotos**, nur eigene SVG-Illustration
  (stilisierte Fahrzeugsilhouette) + CSS/Gradients.
- `device_bash` (Ausführung auf dem verbundenen Gerät) erfordert mindestens einen
  verbundenen Ordner (Freigabe über den Desktop-App-Ordner-Picker) und unterliegt laut
  Tool-Beschreibung derselben oder einer noch engeren Netzwerk-Policy — ist also KEINE
  garantierte Lösung für Bildzugriff, nur ein möglicher Ausweg.
- Versuch, `~/Claude/context` zu mounten, ist fehlgeschlagen ("kann nicht gewährt werden") —
  vermutlich existiert der Pfad auf diesem Gerät nicht oder wurde nicht freigegeben.
- **Lokal in Claude Code (dein eigener Rechner) gilt das alles wahrscheinlich NICHT** —
  normaler Internetzugriff sollte echtes Bild-/Video-Material erlauben. Das ist der Hauptgrund,
  warum ein Wechsel dorthin für den Wow-Faktor tatsächlich hilfreich sein kann.

## 6. Aktueller Stand der Dateien

Projektordner (in dieser Session: `/home/claude/shinemycar-site/`):

```
index.html          Hauptseite (Hero, Leistungen, Vorher/Nachher, Ablauf, FAQ, Kontakt, Footer)
styles.css           Design-System "Ceramic Clean" (Blau-Akzent, Archivo+Inter)
script.js            Sticky Header, Mobile-Menü, Scroll-Reveals (GSAP/ScrollTrigger von cdnjs),
                     animierte Zähler, Vorher/Nachher-Regler, FAQ-Akkordeon
preview.html         Selbst-enthaltene Version (CSS/JS inline) — nur für die Artefakt-Vorschau,
                     NICHT für den echten Deploy nötig
impressum.html / datenschutz.html   Platzhalter, rechtlich vor Live-Gang prüfen (lassen)
robots.txt / sitemap.xml            SEO-Grundausstattung
assets/favicon.svg, assets/og-image.png   selbst generiert (kein externes Bildmaterial)
README.md            Deploy-Anleitung für GitHub Pages (kein Build-Schritt nötig)
```

Ausgeliefert an Cayo: `shinemycar-website.zip` (alles außer preview.html) + Artefakt-Link
zur Live-Vorschau (im Chat).

## 7. Entscheidung gefallen (lokale Session, Claude Code, 2026-09-05)

Lokal besteht echter Internetzugriff (Cloud-Sandbox-Einschränkung aus Abschnitt 5 gilt hier
nicht). Gewählt: **Premium-Stockfotos jetzt einbinden** (Pexels, freie Lizenz, keine
Attribution nötig) + Ceramic-Clean-Richtung beibehalten, aber mutiger ausgeführt. Als
Referenz zusätzlich winax-detailing.de (Menüpunkt „AUTO") recherchiert — bestätigt: hell,
viel Weißraum, echte Profi-Fotos statt Illustration ist in dieser Branche der richtige Weg,
kein Dark-Gold-Luxury nötig.

Umgesetzt:
- Hero: SVG-Auto-Illustration ersetzt durch echtes Foto (Politur mit Rotationsmaschine),
  Ken-Burns-Zoom + Cursor-unabhängiger Glanz-Sweep, Typografie vergrößert (h-display jetzt
  bis 5.4rem, Gewicht 800).
- Neue Sektion **„Signature Break"** direkt nach Hero/Ticker: kantenloses Foto
  (Politur-Nahaufnahme), dunkler Verlaufs-Overlay, großes Wort „Bis der Lack atmet." —
  der zuvor fehlende Wow-Moment zwischen den Content-Blöcken.
- Über-uns: echtes Workshop-Foto statt CSS-Grid-Linien-Platzhalter.
- Service-Karten „Lackaufbereitung" und „Innenreinigung/Lederpflege": dezente
  Foto-Akzente (Ecke, niedrige Deckkraft, Hover verstärkt).
- Stats-Band: Chrom/Wassertropfen-Foto als maskierte Textur rechts, sehr subtil.
- Vorher/Nachher-Regler bewusst **unverändert illustrativ** gelassen (wie in Abschnitt 4
  entschieden) — wird erst durch echte Kunden-Vorher/Nachher-Paare ersetzt.

Alle Bildquellen: Pexels-Fotografen Bulat843, Khunkorn Laowisit, WAVYVISUALS,
Carlos Mazorra, Mike Bird, Hasan Gulec — Free-License, kommerzielle Nutzung ohne
Attribution erlaubt.

## 8. Nächste Schritte / TODO vor Live-Gang (unabhängig vom Wow-Faktor)

- [x] Design-Richtung für Wow-Faktor festlegen (siehe Punkt 7)
- [x] Premium-Stockfotos einbinden (Hero, Signature-Break, Über-uns, 2 Service-Karten, Stats)
- [ ] Stockfotos perspektivisch durch echte eigene Fotos/Videos von Shine My Car ersetzen
      (Werkstatt, Team, eigene Fahrzeuge — Stock bleibt bis dahin Platzhalter mit echtem
      Wow-Effekt, ist aber nicht firmenspezifisch)
- [ ] Kontaktformular an echten Endpunkt anbinden (z. B. Formspree — GitHub Pages ist statisch)
- [ ] Echte Google-Bewertungen statt Platzhalter-Testimonials
- [ ] Impressum & Datenschutzerklärung rechtlich prüfen/ausfüllen lassen
- [ ] Google Maps-Einbettung mit echtem Standort
- [ ] Google Search Console + Google Business Profile verknüpfen
- [ ] Lighthouse-Check nach Bild-Ergänzung
