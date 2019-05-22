# PRAKTIK UGE 20 - EDUCATION SYSTEM MANAGER

### TEMPLATE

* html-struktur
* dummy CSS.

### DATA

* hvor er min data?

### EDUCATION SYSTEM OBJECTS

* Manager
* Institutions
* Educations
* Schoolclasses
* Students

### SINGLE APP PAGE 

* css
* NavManager (object?)


### STATS

* StatsManger (object?)
* array-lengths på alle ESM-classes. 
* title-attributter på HTML-stats
* css

<!-- edit data -->

Jeg skal ha tilføjet et dataset-indexpath til alle de elementer som udskriver schoolclasses.

til static classes tilføj: this.indexpath = 0;
når jeg looper mine students, for at udskrive navn + index,
skal jeg huske at starte studentindex ved 0, hver gang.
og sende studentindex til this.indexpath, så denne starter ved 0.
derefter increments
til createHtml tilføj dataset.indexpath = this.indexpath

Nu skulle jeg kunne hente dataset.indexpath på click-event og matche med studentarray[dataset.indexpath]





