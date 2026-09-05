# Shine My Car — Website Mock

Premium One-Page-Website für Shine My Car (Fahrzeugaufbereitung, Böblingen).
Reines HTML/CSS/JS ohne Build-Schritt — direkt als GitHub Pages deploybar.

## Struktur

```
index.html          Hauptseite (Hero, Leistungen, Vorher/Nachher, Ablauf, FAQ, Kontakt, Footer)
styles.css           Gesamtes Design-System (Farben, Typografie, Komponenten, Responsive)
script.js            Interaktionen: Sticky Header, Mobile-Menü, Scroll-Reveals (GSAP),
                     animierte Zähler, Vorher/Nachher-Slider, FAQ-Akkordeon
impressum.html        Platzhalter — vor Live-Schaltung rechtssicher ausfüllen
datenschutz.html      Platzhalter — vor Live-Schaltung DSGVO-konform ausfüllen
robots.txt / sitemap.xml   SEO-Grundausstattung
assets/favicon.svg    Favicon
assets/og-image.png   Social-Media-Vorschaubild (Open Graph / Twitter Card)
assets/img/           Foto-Assets (Hero, Signature-Break, Über-uns, Service-Akzente)
```

## Design-Entscheidung: Bilder

Hero, „Signature Break"-Sektion, Über-uns und zwei Service-Karten nutzen echte
Premium-Fotografie (Pexels, freie Lizenz, keine Attribution nötig) unter
`assets/img/`. Der Vorher/Nachher-Regler bleibt bewusst illustrativ (SVG-Silhouette),
bis echte Vorher/Nachher-Aufnahmen eigener Projekte vorliegen.

**Empfehlung für die finale Version:** die aktuellen Stockfotos schrittweise durch
echte eigene Werkstattfotos, Team- und Fahrzeugaufnahmen ersetzen — vor allem echte
Vorher/Nachher-Paare, laut Recherche zu Auto-Detailing-Websites der wirkungsvollste
Vertrauensfaktor. Einfach die Dateien unter `assets/img/` gleichen Namens ersetzen,
keine Code-Änderung nötig.

## Als GitHub Pages veröffentlichen (kein Build nötig)

1. Neues GitHub-Repository anlegen (z. B. `shinemycar-web`).
2. Alle Dateien aus diesem Ordner in das Repository pushen:
   ```bash
   git init
   git add .
   git commit -m "Shine My Car Website"
   git branch -M main
   git remote add origin https://github.com/<dein-user>/shinemycar-web.git
   git push -u origin main
   ```
3. Auf GitHub: **Settings → Pages → Source: Deploy from a branch**,
   Branch `main`, Ordner `/ (root)` auswählen, speichern.
4. Nach 1–2 Minuten ist die Seite unter
   `https://<dein-user>.github.io/shinemycar-web/` erreichbar.
5. Optional: eigene Domain (`shinemycar.de`) unter **Settings → Pages →
   Custom domain** eintragen und beim Domain-Provider einen CNAME/ALIAS-Eintrag
   auf `<dein-user>.github.io` setzen.

Die Datei `.nojekyll` verhindert, dass GitHub Pages die Seite unnötig durch
Jekyll verarbeitet.

## Vor dem Live-Gang noch zu tun

- [ ] Stockfotos unter `assets/img/` durch echte eigene Fotos/Videos (Werkstatt,
      Team, Vorher/Nachher) ersetzen
- [ ] Kontaktformular an einen Endpunkt anbinden (z. B. Formspree, da GitHub
      Pages rein statisch ist und PHP/Server-Code nicht ausführt)
- [ ] Echte Google-Bewertungen statt Platzhalter-Testimonials einsetzen
- [ ] Impressum & Datenschutzerklärung rechtlich prüfen/ausfüllen lassen
- [ ] Google Maps-Einbettung mit echtem Standort ergänzen
- [ ] Google Search Console + Google Business Profile verknüpfen
- [ ] Ladezeiten/Lighthouse nach Bild-Ergänzung erneut prüfen
