# Dokumentáció
Alkalmazások fejlésztese - Beadandó

# Tantárgyak felvétele (MiniNeptun)
 
## Funkcionális követelmények
 - vendégként csak a főoldal tekinthető meg
 - a vendégnek lehetősége van bejelentkezni
 - bejelentkezés után van lehetőség tárgyakat felvenni
 - bejelentkezés után van lehetőség (már felvett) tárgyakat törölni
 - bejelentkezés után van lehetőség tárgyakat módosítani
 - van lehetőség kijelentkezni

 
## Nem funkcionális követelmények
 - az oldal funckióinak megfelelő, felhasználóbarát kinézet
 - gyors, biztonságos működés
 - van lehetőség saját adataid módosítására (godmode-ban minden felhasználó adatait)
 - van lehetőség godmode-ban listázni a felhasználókat (godemode@minineptun.hu, 12345)
 
## Nem funkcionális követelmények
 - az oldal funckióinak megfelelő, felhasználóbarát kinézet
 - gyors, biztonságos működés

##### Használatieset-modell, funkcionális követelmények

**Vendég**: Csak a publikus oldalakat éri el

*	Főoldal
*	Bejelentkezés
*	Regisztráció

**Bejelentkezett felhasználó**: A publikus oldalak elérésén felül egyéb funkciókhoz is hozzáfér.

*	Új tárgy felvétele
*	Meglévő tárgyak megtekintése
*	Meglévő saját tárgyak szerkesztése
*	Meglévő saját tárgyak törlése
* Saját adatainak módosítása
* Kijelentkezés

![](diagram1.jpg)

**Egy példa az oldal használatára**:

**Meglévő recept szerkesztése:**

1.	A felhasználó az oldalra érkezve, bejelentkezik
2.	Bejelentkezés után megtekintheti a tárgyakat listázó oldalt, ahol kiválaszthatja a szerkeszteni kívánt tárgyat.
3.	Rákattint a tárgy nevére
4.	A megtekintés oldalon kiválaszthatja a „Szerkesztés” gombot
5.	Szerkesztés oldalon felviszi az új adatokat
6.	Submit gombra kattintva elmenti a változásokat

![](diagram2.jpg)

## Oldaltérkép

**Publikus:**
* Főoldal
* Bejelentkezés
* Regisztráció

**Bejelentkezett:**
* Főoldal
* Új tárgy felvétele
* Listaoldal (saját tárgyak) 
  * Tárgy megtekintése
    * Tárgy szerkesztése 
    * Tárgy törlése
* Saját adatok módosítása

**Admin:**
* Főoldal
* Új tárgy felvétele
* Listaoldal (összes tárgy) 
  * Tárgy megtekintése
    * Tárgy szerkesztése 
    * Tárgy törlése
* Listaoldal (összes felhasználó)
  * Felhasználó megtekintése
    * Felhasználó szerkesztése 
    * Felhasználó törlése
    
## Végpontok

### Bejelentkezéssel kapcsolatos

* GET/: főoldal
* GET/login: bejelentkező oldal
* POST/login: bejelentkező adatok felküldése
* GET/register: regisztrációs oldal
* POST/register: regisztrációs adatok felküldése
* GET/logout: kijelentkező oldal

### Tárgyakkal kapcsolatos

* GET/ownSubjects: tárgyak listázása
* GET/subjects/create: új tárgy felvétele
* POST/subjects/create: új tárgy felvételéhez szükséges adatok felküldése
* GET/subjects/:id tárgy adatok
* GET/subjects/:id/delete tárgy törlése
* GET/subjects/:id/edit tárgy módosítása
* POST/subjects/:id/edit tárgy módosítása, adatok felküldése

### Felhasználókkal kapcsolatos

* GET/users/list: új felhasználó felvételéhez szükséges adatok felküldése
* GET/users/:id felhasználó adatok
* GET/users/:id/delete felhasználó törlése
* GET/users/:id/edit felhasználó módosítása
* POST/users/:id/edit felhasználó módosítása, adatok felküldése

##Megjelenés (bootswatch.com)

**Főoldal bejelentkezés nélkül**

![](main.jpg)

**Főoldal bejelentkezés után**

![](list.jpg)

**Tárgy hozzáadása**

![](create.jpg)

**Tárgy szerkesztése**

![](edit.jpg)

**Tárgy megtekintése**

![](show.jpg)

**Keresés**

![](search.jpg)

##Adatbázisterv - Adatmodell

![](database.jpg)



##Implementáció

 **Fejlesztő környezet: Visual Studio Code (node.js - adonis.js keretrendszer)**
  * Futtatás: terminál ablak nyitása (ctrl + ö) -> cd minineptun -> npm start
  * Használat: bármely böngészőben indítható a localhost:3333-on
  

##Könyvtárszerkezet
 
  **A fejlesztés szempontjából lényeges könyvtárak, fájlok:**
  
![](files.jpg)

##Felhasználói dokumentáció

**Használathoz szükséges:**
- tetszőleges operációs rendszer
- böngésző (Chrome, Firefox, stb...)
- Visual Studio Code

**Használat rövid leírása:**
- bejelentkezés/regisztráció
- tárgyak hozzáadása
- meglévő tárgyak listázása
- tárgy szerkesztése
- tárgy törlése
- felhasználói adatok módosítása

# Bővítés a 3. beadandóhoz:

**1. funkció - Popup Login**  
 - Módosított / új fájlok: *login_popup.js*, *main.njk*, *login.njk*, *UserController.js*, *routes.js*
 - Leírás: A főoldalon, ha nem vagyunk bejelentkezve, akkor egy  hívás történik mely során felugrik egy AJAX-os ablak, ahol be lehet jelentkezni (így nem kell a bejelentkező oldalra ugrani)
 
 **Szekvencia diagram:**  
 ![](szekv.jpg)
 
**2. funkció - Tárgy törlésének megerősítése**  
 - Módosított / új fájlok: *delete_subject.js*, *subjectShow.njk*, *SubjectController.js*, *routes.js*
 - Leírás: Ha egy adott tárgynál rákattintunk a törlés gombra, akkor nem törli ki azonnal, hanem felugrik egy AJAX-os ablak, amely megerősítést vár
 
**3. funkció - Felhasználó törlésének megerősítése**  
 - Módosított / új fájlok: *delete_user.js*, *userShow.njk*, *UserController.js*, *routes.js*
 - Leírás: Ha egy adott felhasználónál rákattintunk a törlés gombra, akkor nem törli ki azonnal, hanem felugrik egy AJAX-os ablak, amely megerősítést vár, ez a funkció csak Godemode-ban érhető el
 
**4. funkció - Regisztrációs adatok validálása**  
 - Módosított / új fájlok: *register.njk*
 - Leírás: Regisztráció során ellenőrzi, hogy a felhasználó megfelelő adatokat adott-e meg:  
  * Felhasználónév: csak ékezet nélküli betű és szám
  * Email: email formátumnak megfelelő
  * Jelszó: a két jelszónek meg kell egyeznie
  
**5. funkció - Tárgy adatok validálása**  
 - Módosított / új fájlok: *subjectCreate.njk*, *subjectEdit.njk*
 - Leírás: Tárgy felvétele vagy módosítása során ellenőrzi, hogy a felhasználó megfelelő adatokat adott-e meg:  
  * Tárgy neve: nem lehet üres
  * Félév: csak szám lehet
  * Kredit: csak szám lehet


**Selenium IDE telepítése**

 > A **Selenium IDE** használatához szükségünk lesz egy *FireFox*ra.  
 > Letöltés: https://www.mozilla.org/hu/firefox/new/  
 > Ha sikeresen telepítettük, akkor kiegészítőként letölthetjük hozzá a **Selenium IDE**-t.  
 > Letöltés: https://addons.mozilla.org/hu/firefox/addon/selenium-ide/  
 
 **Selenium IDE használata**
 > --Telepítés után a Ctrl+Alt+S kombminációval indíthatjuk el az IDE-t a Firefox böngészőben. Ha elindítottuk az alkalmazást, akkor a zöld nyíllal futtathatjuk a teszteket, ami a képen jelölve van. A tesztek a test alkönyvtárban találhatóak.
 
 ![](selenium.jpg)

