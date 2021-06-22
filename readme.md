## DominoCamp 2021 Demos ##

Ich habe hoffentlich alle Demos angepasst um den Domino Server außen vor zu lassen.
### ServerSide Rendering Demo ###
Vor dem Start `npm install` ausführen und dann das Projekt mit `node src/app.js` starten.
Die Webanwendung ist unter http://localhost:5000/ erreichbar.

### eleventy Demo ##
Vor dem Start `npm install` ausführen und dann das Projekt mit `npx @11ty/eleventy --serve` starten.

Initial sind 500 Datensätze in der `_data/fakenames.json` hinterlegt. Mit dem Skript src/sort.js kann die Datei `_data/fakenames.json` erweitert werden.
Einfach den Eintrag `docs.length = 500;` in Zeile 45 anpassen.

Bei der Suche hilft eventuell ein * hinter dem Suchbegriff.

### charts Demo ###
Vor dem Start `npm install` ausführen und dann das Projekt mit `node src/index.js` starten.
Die Webanwendung ist unter http://localhost:3000/ erreichbar.

Zum Erstellen des Demo pdfs `node src\genpdfNunjucks.js` ausführen.