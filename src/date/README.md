# Date

Date-Time picker strongly based on [Moment.js](http://momentjs.com/).

## Parameters

Name | Type | Default | Description
---|---|---|---
value | `Date` | | Component's model.
disabled | `boolean` | `false` | Whether the input is disabled.
placeholder | `string` | | Placeholder text.
format | `string` | `"L LTS"` | Format of the view model. See [available tokens](#format-tokens).
locale | `string` | `"en"` | Locale code. See [available locales](#locales).
minView | `ViewType` * | `"decade"` | Minimum navigable view.
maxView | `ViewType` * | `"minute"` | Maximum navigable view.
startView | `ViewType` * | `"month"` | Initial view when the picker is open.
minDate | `Date` | | Minimum selectable date.
maxDate | `Date` | | Maximum selectable date.
startDate | `Date` | | Initial date to be shown in picker.

(*) Type `ViewType` is an alias for `"decade" | "year" | "month" | "day" | "hour" | "minute"`.

## Format tokens

Supported tokens. Credits by [Moment.js](http://momentjs.com/docs/#/displaying/format/).

&nbsp; | Token | Output
---:|---|---
**Month** | M | 1 2 ... 11 12
&nbsp; | Mo | 1st 2nd ... 11th 12th
&nbsp; | MM | 01 02 ... 11 12
&nbsp; | MMM | Jan Feb ... Nov Dec
&nbsp; | MMMM | January February ... November December
**Quarter** | Q | 1 2 3 4
&nbsp; | Qo | 1st 2nd 3rd 4th
**Day of Month** | D | 1 2 ... 30 31
&nbsp; | Do | 1st 2nd ... 30th 31st
&nbsp; | DD | 01 02 ... 30 31
**Day of Year** | DDD | 1 2 ... 364 365
&nbsp; | DDDo | 1st 2nd ... 364th 365th
&nbsp; | DDDD | 001 002 ... 364 365
**Day of Week** | d | 0 1 ... 5 6
&nbsp; | do | 0th 1st ... 5th 6th
&nbsp; | dd | Su Mo ... Fr Sa
&nbsp; | ddd | Sun Mon ... Fri Sat
&nbsp; | dddd | Sunday Monday ... Friday Saturday
**Day of Week (Locale)** | e | 0 1 ... 5 6
**Day of Week (ISO)** | E | 1 2 ... 6 7
**Week of Year** | w | 1 2 ... 52 53
&nbsp; | wo | 1st 2nd ... 52nd 53rd
&nbsp; | ww | 01 02 ... 52 53
**Week of Year (ISO)** | W | 1 2 ... 52 53
&nbsp; | Wo | 1st 2nd ... 52nd 53rd
&nbsp; | WW | 01 02 ... 52 53
**Year** | YY | 70 71 ... 29 30
&nbsp; | YYYY | 1970 1971 ... 2029 2030
&nbsp; | Y | 1970 1971 ... 9999 +10000 +10001
**Week Year** | gg | 70 71 ... 29 30
&nbsp; | gggg | 1970 1971 ... 2029 2030
**Week Year (ISO)** | GG | 70 71 ... 29 30
&nbsp; | GGGG | 1970 1971 ... 2029 2030
**AM/PM** | A | AM PM
&nbsp; | a | am pm
**Hour** | H | 0 1 ... 22 23
&nbsp; | HH | 00 01 ... 22 23
&nbsp; | h | 1 2 ... 11 12
&nbsp; | hh | 01 02 ... 11 12
&nbsp; | k | 1 2 ... 23 24
&nbsp; | kk | 01 02 ... 23 24
**Minute** | m | 0 1 ... 58 59
&nbsp; | mm | 00 01 ... 58 59
**Second** | s | 0 1 ... 58 59
&nbsp; | ss | 00 01 ... 58 59

### Localized formats

&nbsp; | Token | Output
---:|---|---
**Time** | LT | 8:30 PM
**Time with seconds** | LTS | 8:30:25 PM
**Month numeral, day of month, year** | L | 09/04/1986
&nbsp; | l | 9/4/1986
**Month name, day of month, year** | LL | September 4, 1986
&nbsp; | ll | Sep 4, 1986
**Month name, day of month, year, time** | LLL | September 4, 1986 8:30 PM
&nbsp; | lll | Sep 4, 1986 8:30 PM
**Month name, day of month, day of week, year, time** | LLLL | Thursday, September 4, 1986 8:30 PM
&nbsp; | llll | Thu, Sep 4, 1986 8:30 PM

## Locales

Code | Name
---:|---
af | Afrikaans
sq | Albanian
ar | Arabic
ar-dz | Arabic (Algeria)
ar-kw | Arabic (Kuwait)
ar-ly | Arabic (Lybia)
ar-ma | Arabic (Morocco)
ar-sa | Arabic (Saudi Arabia)
ar-tn | Arabic (Tunisia)
hy-am | Armenian
az | Azerbaijani
bm | Bambara
eu | Basque
be | Belarusian
bn | Bengali
bs | Bosnian
br | Breton
bg | Bulgarian
my | Burmese
km | Cambodian
ca | Catalan
tzm | Central Atlas Tamazight
tzm-latn | Central Atlas Tamazight Latin
zh-cn | Chinese (China)
zh-hk | Chinese (Hong Kong)
zh-tw | Chinese (Taiwan)
cv | Chuvash
hr | Croatian
cs | Czech
da | Danish
nl | Dutch
nl-be | Dutch (Belgium)
en-au | English (Australia)
en-ca | English (Canada)
en-ie | English (Ireland)
en-nz | English (New Zealand)
en-gb | English (United Kingdom)
en | English (United States)
eo | Esperanto
et | Estonian
fo | Faroese
fi | Finnish
fr | French
fr-ca | French (Canada)
fr-ch | French (Switzerland)
fy | Frisian
gl | Galician
ka | Georgian
de | German
de-at | German (Austria)
de-ch | German (Switzerland)
el | Greek
gu | Gujarati
he | Hebrew
hi | Hindi
hu | Hungarian
is | Icelandic
id | Indonesian
it | Italian
ja | Japanese
jv | Javanese
kn | Kannada
kk | Kazakh
tlh | Klingon
gom-latn | Konkani Latin script
ko | Korean
ky | Kyrgyz
lo | Lao
lv | Latvian
lt | Lithuanian
lb | Luxembourgish
mk | Macedonian
ms-my | Malay
ms | Malay
ml | Malayalam
dv | Maldivian
mi | Maori
mr | Marathi
me | Montenegrin
ne | Nepalese
se | Northern Sami
nb | Norwegian Bokmål
nn | Nynorsk
fa | Persian
pl | Polish
pt | Portuguese
pt-br | Portuguese (Brazil)
x-pseudo | Pseudo
pa-in | Punjabi (India)
ro | Romanian
ru | Russian
gd | Scottish Gaelic
sr | Serbian
sr-cyrl | Serbian Cyrillic
sd | Sindhi
si | Sinhalese
sk | Slovak
sl | Slovenian
es | Spanish
es-do | Spanish (Dominican Republic)
es-us | Spanish (United States)
sw | Swahili
sv | Swedish
tl-ph | Tagalog (Philippines)
tzl | Talossan
ta | Tamil
te | Telugu
tet | Tetun Dili (East Timor)
th | Thai
bo | Tibetan
tr | Turkish
uk | Ukrainian
ur | Urdu
uz | Uzbek
uz-latn | Uzbek Latin
vi | Vietnamese
cy | Welsh
yo | Yoruba Nigeria
ss | siSwati