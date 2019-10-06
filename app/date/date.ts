import { Component } from '@angular/core';

@Component({
    template: require('./date.html'),
    styles: [`
        .table-scrollable {
            max-height: 420px;
            overflow-y: auto;
        }
    `]
})
export class DateComponent {
    public date: Date = new Date(2018, 4, 25, 10, 25, 13);
    public minDate: Date = new Date(2010, 0, 1, 0, 0, 0);
    public maxDate: Date = new Date(2019, 11, 31, 23, 59, 59);

    private _filter: string;
    public get filter(): string {
        return this._filter;
    }
    public set filter(filter: string) {
        if (this._filter !== filter) {
            this._filter = filter || '';
            const lowerCaseFilter = this._filter.toLowerCase();
            this.locales = this.availableLocales.filter(locale => {
                return locale.code.indexOf(lowerCaseFilter) >= 0 || locale.name.toLowerCase().indexOf(lowerCaseFilter) >= 0;
            });
        }
    }
    public locales: { code: string; name: string }[];

    constructor() {
        this.locales = this.availableLocales.slice(0);
    }

    public availableLocales: { code: string; name: string }[] = [
        { code: 'af', name: 'Afrikaans' },
        { code: 'sq', name: 'Albanian' },
        { code: 'ar', name: 'Arabic' },
        { code: 'ar-dz', name: 'Arabic (Algeria)' },
        { code: 'ar-kw', name: 'Arabic (Kuwait)' },
        { code: 'ar-ly', name: 'Arabic (Lybia)' },
        { code: 'ar-ma', name: 'Arabic (Morocco)' },
        { code: 'ar-sa', name: 'Arabic (Saudi Arabia)' },
        { code: 'ar-tn', name: 'Arabic (Tunisia)' },
        { code: 'hy-am', name: 'Armenian' },
        { code: 'az', name: 'Azerbaijani' },
        { code: 'bm', name: 'Bambara' },
        { code: 'eu', name: 'Basque' },
        { code: 'be', name: 'Belarusian' },
        { code: 'bn', name: 'Bengali' },
        { code: 'bs', name: 'Bosnian' },
        { code: 'br', name: 'Breton' },
        { code: 'bg', name: 'Bulgarian' },
        { code: 'my', name: 'Burmese' },
        { code: 'km', name: 'Cambodian' },
        { code: 'ca', name: 'Catalan' },
        { code: 'tzm', name: 'Central Atlas Tamazight' },
        { code: 'tzm-latn', name: 'Central Atlas Tamazight Latin' },
        { code: 'zh-cn', name: 'Chinese (China)' },
        { code: 'zh-hk', name: 'Chinese (Hong Kong)' },
        { code: 'zh-tw', name: 'Chinese (Taiwan)' },
        { code: 'cv', name: 'Chuvash' },
        { code: 'hr', name: 'Croatian' },
        { code: 'cs', name: 'Czech' },
        { code: 'da', name: 'Danish' },
        { code: 'nl', name: 'Dutch' },
        { code: 'nl-be', name: 'Dutch (Belgium)' },
        { code: 'en-au', name: 'English (Australia)' },
        { code: 'en-ca', name: 'English (Canada)' },
        { code: 'en-ie', name: 'English (Ireland)' },
        { code: 'en-nz', name: 'English (New Zealand)' },
        { code: 'en-gb', name: 'English (United Kingdom)' },
        { code: 'en', name: 'English (United States)' },
        { code: 'eo', name: 'Esperanto' },
        { code: 'et', name: 'Estonian' },
        { code: 'fo', name: 'Faroese' },
        { code: 'fi', name: 'Finnish' },
        { code: 'fr', name: 'French' },
        { code: 'fr-ca', name: 'French (Canada)' },
        { code: 'fr-ch', name: 'French (Switzerland)' },
        { code: 'fy', name: 'Frisian' },
        { code: 'gl', name: 'Galician' },
        { code: 'ka', name: 'Georgian' },
        { code: 'de', name: 'German' },
        { code: 'de-at', name: 'German (Austria)' },
        { code: 'de-ch', name: 'German (Switzerland)' },
        { code: 'el', name: 'Greek' },
        { code: 'gu', name: 'Gujarati' },
        { code: 'he', name: 'Hebrew' },
        { code: 'hi', name: 'Hindi' },
        { code: 'hu', name: 'Hungarian' },
        { code: 'is', name: 'Icelandic' },
        { code: 'id', name: 'Indonesian' },
        { code: 'it', name: 'Italian' },
        { code: 'ja', name: 'Japanese' },
        { code: 'jv', name: 'Javanese' },
        { code: 'kn', name: 'Kannada' },
        { code: 'kk', name: 'Kazakh' },
        { code: 'tlh', name: 'Klingon' },
        { code: 'gom-latn', name: 'Konkani Latin script' },
        { code: 'ko', name: 'Korean' },
        { code: 'ky', name: 'Kyrgyz' },
        { code: 'lo', name: 'Lao' },
        { code: 'lv', name: 'Latvian' },
        { code: 'lt', name: 'Lithuanian' },
        { code: 'lb', name: 'Luxembourgish' },
        { code: 'mk', name: 'Macedonian' },
        { code: 'ms-my', name: 'Malay' },
        { code: 'ms', name: 'Malay' },
        { code: 'ml', name: 'Malayalam' },
        { code: 'dv', name: 'Maldivian' },
        { code: 'mi', name: 'Maori' },
        { code: 'mr', name: 'Marathi' },
        { code: 'me', name: 'Montenegrin' },
        { code: 'ne', name: 'Nepalese' },
        { code: 'se', name: 'Northern Sami' },
        { code: 'nb', name: 'Norwegian Bokmål' },
        { code: 'nn', name: 'Nynorsk' },
        { code: 'fa', name: 'Persian' },
        { code: 'pl', name: 'Polish' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'pt-br', name: 'Portuguese (Brazil)' },
        { code: 'x-pseudo', name: 'Pseudo' },
        { code: 'pa-in', name: 'Punjabi (India)' },
        { code: 'ro', name: 'Romanian' },
        { code: 'ru', name: 'Russian' },
        { code: 'gd', name: 'Scottish Gaelic' },
        { code: 'sr', name: 'Serbian' },
        { code: 'sr-cyrl', name: 'Serbian Cyrillic' },
        { code: 'sd', name: 'Sindhi' },
        { code: 'si', name: 'Sinhalese' },
        { code: 'sk', name: 'Slovak' },
        { code: 'sl', name: 'Slovenian' },
        { code: 'es', name: 'Spanish' },
        { code: 'es-do', name: 'Spanish (Dominican Republic)' },
        { code: 'es-us', name: 'Spanish (United States)' },
        { code: 'sw', name: 'Swahili' },
        { code: 'sv', name: 'Swedish' },
        { code: 'tl-ph', name: 'Tagalog (Philippines)' },
        { code: 'tzl', name: 'Talossan' },
        { code: 'ta', name: 'Tamil' },
        { code: 'te', name: 'Telugu' },
        { code: 'tet', name: 'Tetun Dili (East Timor)' },
        { code: 'th', name: 'Thai' },
        { code: 'bo', name: 'Tibetan' },
        { code: 'tr', name: 'Turkish' },
        { code: 'uk', name: 'Ukrainian' },
        { code: 'ur', name: 'Urdu' },
        { code: 'uz', name: 'Uzbek' },
        { code: 'uz-latn', name: 'Uzbek Latin' },
        { code: 'vi', name: 'Vietnamese' },
        { code: 'cy', name: 'Welsh' },
        { code: 'yo', name: 'Yoruba Nigeria' },
        { code: 'ss', name: 'siSwati' },
    ];
}