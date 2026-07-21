# 💸 Cash-Splitter

Eine einfache Web-App zur Verwaltung von Reisekosten – erstelle Reisen, füge Teilnehmer hinzu und behalte den Überblick über gemeinsame Ausgaben.

---

## 🚀 Features

- **Mehrere Reisen verwalten** – Erstelle beliebig viele Trips und wechsle schnell zwischen ihnen
- **Teilnehmer hinzufügen** – Füge Personen zu einer Reise hinzu
- **Persistente Datenspeicherung** – Alle Daten werden im `localStorage` des Browsers gespeichert (kein Backend nötig)
- **Responsive Navigation** – Ein- und ausblendbares Seitenmenü für mobile Nutzung
- **Rein clientseitig** – Keine Abhängigkeiten, kein Server, läuft direkt im Browser

---

## 🛠️ Tech Stack

| Technologie | Einsatz |
|-------------|---------|
| HTML5       | Struktur & Markup |
| CSS3        | Layout, Navbar, Modals |
| JavaScript (Vanilla) | Logik, DOM-Manipulation, localStorage |

---

## 📁 Projektstruktur

```
cash-splitter/
├── index.html   # Haupt-UI mit Formularen und Navigationsleiste
├── script.js    # App-Logik (Trips, Personen, Rendering, Storage)
├── style.css    # Styling aller Komponenten
└── README.md    # Diese Datei
```

---

## ⚙️ Installation & Nutzung

Es wird kein Build-Tool oder Server benötigt:

1. Repository klonen oder herunterladen:
   ```bash
   git clone https://github.com/daniel13745/cash-splitter.git
   ```
2. `index.html` direkt im Browser öffnen – fertig.

---

## 📖 Bedienung

1. **Reise erstellen** – Klicke auf „+ Reise hinzufügen" und vergib einen Namen
2. **Reise auswählen** – Klicke im Menü auf den Reisenamen
3. **Teilnehmer hinzufügen** – Klicke auf „Benutzer" und trage einen Namen ein
4. **Kosten erfassen** *(in Entwicklung)* – Über den Button „Kosten" können Buchungsbeträge pro Person erfasst werden

> 💡 Alle Daten bleiben auch nach dem Schließen des Browsers erhalten, da `localStorage` genutzt wird.

---

## 🔮 Geplante Features

- [ ] Kostenaufteilung berechnen (wer schuldet wem wie viel)
- [ ] Ausgaben pro Person eintragen
- [ ] Reise löschen / bearbeiten
- [ ] Export als PDF oder CSV
- [ ] Optionales Backend / Cloud-Sync

---

## 👤 Autor

**Daniel** – [@daniel13745](https://github.com/daniel13745)
