# CampusDAO

Platforma do transparentnego zarządzania budżetem i wspólnymi decyzjami w studenckim klubie z wykorzystaniem technologii blockchain.

> **Status:** projekt w trakcie realizacji. Ten dokument opisuje planowane funkcje i architekturę. Projekt działa w środowisku testowym: nie przechowuje rzeczywistych środków klubu i nie wykonuje prawdziwych przelewów.

---

## O projekcie

CampusDAO wspiera studencki klub w prowadzeniu budżetu i podejmowaniu decyzji o wydatkach. Członkowie widzą przychody i wydatki, zgłaszają propozycje finansowania wydarzeń, głosują oraz mogą sprawdzić historię decyzji. Najważniejsze zdarzenia są rejestrowane w blockchainie, dzięki czemu można je niezależnie zweryfikować, a dokumenty finansowe są chronione przed niezauważoną zmianą za pomocą skrótów (hashy).

**Najważniejsze założenia**

- **Przejrzystość:** każdy członek widzi, na co idą pieniądze klubu.
- **Wspólne decyzje:** wydatki są zatwierdzane głosowaniem, a nie jednoosobowo.
- **Weryfikowalność:** wyniki głosowań i hashe dokumentów są zapisywane w blockchainie.
- **Prostota:** szczegółowe dane przechowywane są w zwykłej bazie danych, a blockchain jest używany tylko tam, gdzie jest naprawdę potrzebny.

---

## Technologie

| Warstwa | Technologie |
|---|---|
| Frontend | React, TypeScript |
| Backend | Node.js, Express, TypeScript |
| Baza danych | PostgreSQL |
| Smart kontrakty | Solidity, OpenZeppelin |
| Blockchain | Sepolia (lub inna testowa sieć EVM), lokalnie Hardhat |
| Web3 | ethers.js, MetaMask (lub inny portfel EVM) |
| Pliki | magazyn lokalny, opcjonalnie IPFS |

---

## Role użytkowników

| Rola | Uprawnienia |
|---|---|
| **Administrator** | zarządzanie klubem, użytkownikami, rolami i ustawieniami; generowanie raportów |
| **Skarbnik** | dodawanie przychodów i wydatków, załączanie dokumentów, aktualizacja statusów płatności |
| **Członek klubu** | przeglądanie budżetu, zgłaszanie propozycji, udział w głosowaniach |
| **Obserwator** | przeglądanie publicznych informacji o budżecie i zakończonych decyzjach (bez prawa edycji) |

---

## Planowane funkcje

### 1. Użytkownicy i uprawnienia
- [ ] Rejestracja i logowanie
- [ ] Profile użytkowników
- [ ] Model ról (administrator, skarbnik, członek, obserwator)
- [ ] Kontrola dostępu do operacji po stronie backendu
- [ ] Powiązanie adresu portfela z kontem przez podpis wiadomości

### 2. Budżet
- [ ] Podsumowanie budżetu: saldo, środki zarezerwowane i wolne
- [ ] Rejestr przychodów i wydatków z kategoriami
- [ ] Historia transakcji z filtrami (data, kategoria, typ, status)
- [ ] Rezerwacja kwoty po zaakceptowaniu propozycji
- [ ] Ochrona przed ponownym zarezerwowaniem tych samych środków

### 3. Propozycje i głosowania
- [ ] Tworzenie propozycji: cel, uzasadnienie, kwota, planowane koszty, termin
- [ ] Głosowanie „za / przeciw” z terminem zakończenia
- [ ] Konfigurowalne zasady: kworum i próg przyjęcia
- [ ] Wyświetlanie liczby głosów i bieżącego wyniku
- [ ] Publikacja wyniku i status propozycji (aktywna, przyjęta, odrzucona, zrealizowana)
- [ ] Zapis wyniku w smart kontrakcie

### 4. Wydarzenia
- [ ] Opis wydarzenia i plan kosztów
- [ ] Powiązanie propozycji z wydarzeniem
- [ ] Podsumowanie po zakończeniu (plan a rzeczywistość)

### 5. Dokumenty
- [ ] Dodawanie rachunków, faktur i innych potwierdzeń
- [ ] Obliczanie skrótu SHA-256 pliku
- [ ] Zapis skrótu w blockchainie
- [ ] Weryfikacja integralności: porównanie hasha aktualnego pliku z zapisanym

### 6. Blockchain
- [ ] Smart kontrakt propozycji i głosowania
- [ ] Zdarzenia kontraktu (utworzenie propozycji, oddanie głosu, zakończenie głosowania)
- [ ] Indeksowanie zdarzeń przez backend i zapis w bazie
- [ ] Weryfikacja potwierdzenia transakcji (samo żądanie HTTP nie jest dowodem oddania głosu)
- [ ] Linki do transakcji w Etherscan

### 7. Raporty i powiadomienia
- [ ] Raport: planowany budżet, rzeczywiste wydatki, pozostałe środki, koszty wydarzeń
- [ ] Wykresy i zestawienia
- [ ] Powiadomienia o nowych propozycjach i zakończonych głosowaniach

---

## Model głosowania

Głosowanie odbywa się **on-chain**: użytkownik podpisuje transakcję w portfelu, a jego głos jest zapisywany w smart kontrakcie. Backend nasłuchuje zdarzeń kontraktu i zapisuje je w PostgreSQL, aby ułatwić wyszukiwanie i prezentację historii.

Zasady:
- Prawo głosu wynika z adresu portfela powiązanego z członkiem klubu.
- Jedna osoba oddaje jeden głos.
- Wynik wyznacza smart kontrakt według ustalonych reguł (kworum, próg).
- Backend nie jest źródłem prawdy o głosach, a jedynie indeksuje dane.

---

## Architektura

```
Przeglądarka (React)
     │  REST API
     ▼
Backend (Node.js + Express)
     │                     │
     │ SQL                 │ ethers.js
     ▼                     ▼
PostgreSQL          Smart kontrakt (Sepolia)
     ▲                     │
     └──── indeksowanie zdarzeń ────┘
```

- Frontend wysyła żądania HTTP do REST API.
- Backend weryfikuje uprawnienia, pracuje z PostgreSQL i komunikuje się z kontraktem.
- Zdarzenia kontraktu są odczytywane przez backend i zapisywane w bazie.
- Pliki przechowywane są poza blockchainem, a w kontrakcie zapisywany jest tylko ich hash.

---

## REST API (planowane endpointy)

| Metoda | Ścieżka | Opis |
|---|---|---|
| GET | `/api/budget` | Podsumowanie budżetu |
| GET | `/api/transactions` | Lista transakcji z filtrowaniem |
| POST | `/api/transactions` | Dodanie transakcji (skarbnik) |
| GET | `/api/proposals` | Lista propozycji i ich statusów |
| POST | `/api/proposals` | Utworzenie propozycji |
| POST | `/api/proposals/:id/votes` | Rejestracja głosu |
| GET | `/api/proposals/:id/results` | Wynik głosowania |
| POST | `/api/expenses/:id/documents` | Dodanie dokumentu i obliczenie hasha |
| GET | `/api/reports/budget` | Dane do raportu budżetowego |

Wszystkie endpointy modyfikujące dane wymagają uwierzytelnienia i kontroli ról.

---

## Baza danych

Główne tabele PostgreSQL:

- `users`: konta użytkowników
- `clubs`: kluby
- `club_members`: członkostwo i role
- `transactions`: przychody i wydatki
- `proposals`: propozycje finansowania
- `votes`: głosy lub referencje do transakcji głosowania
- `events`: wydarzenia
- `documents`: metadane plików, lokalizacja i hash
- `blockchain_events`: hash transakcji, adres kontraktu, numer bloku, typ zdarzenia
- `notifications`: powiadomienia

---

## Plan rozwoju

### Wersja 1 (MVP)
- Logowanie i role
- Podsumowanie budżetu
- Rejestr przychodów i wydatków
- Propozycje i głosowania
- Podstawowy smart kontrakt
- Historia zdarzeń
- Prosty raport

### Wersja 2
- Weryfikacja dokumentów
- Powiadomienia
- Rozbudowana analityka
- Obsługa wielu klubów
- Opcjonalne przechowywanie plików w IPFS

---

## Bezpieczeństwo

- Sprawdzanie ról przy każdym endpoincie modyfikującym dane
- Walidacja danych wejściowych
- Potwierdzenie transakcji on-chain przed aktualizacją statusów
- Hashowanie haseł (np. bcrypt lub argon2)
- Sekrety i klucze prywatne wyłącznie w zmiennych środowiskowych, nigdy w repozytorium
- Używanie wyłącznie sieci testowych i środków testowych

---

## Planowana struktura repozytorium

```
campusdao/
├── contracts/      # Solidity, testy, skrypty wdrożeniowe (Hardhat)
├── backend/        # Node.js + Express + TypeScript
├── frontend/       # React + TypeScript
├── docs/           # dokumentacja i diagramy
└── README.md
```

---

## Uruchomienie (zostanie uzupełnione)

Instrukcje instalacji, konfiguracji środowiska, wdrożenia kontraktu i uruchomienia projektu pojawią się w trakcie prac.

---

## Oczekiwany rezultat

Działająca aplikacja demonstracyjna, która ułatwia studentom wspólne podejmowanie decyzji o wydatkach i zapewnia przejrzysty wgląd w finanse klubu. Projekt łączy programowanie backendu, projektowanie relacyjnej bazy danych, tworzenie REST API oraz praktyczne wykorzystanie smart kontraktów i technologii blockchain.

---

## Licencja

Zostanie określona później.
