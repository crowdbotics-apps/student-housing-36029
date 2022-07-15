import images from "../assets/images";

export const COUNTRIES = [
  { id: 7, name: "Afghanistan" },
  { id: 8, name: "Albania" },
  { id: 9, name: "Algeria" },
  { id: 10, name: "Andorra" },
  { id: 11, name: "Angola" },
  { id: 12, name: "Antigua and Barbuda" },
  { id: 13, name: "Argentina" },
  { id: 14, name: "Armenia" },
  { id: 15, name: "Australia" },
  { id: 16, name: "Austria" },
  { id: 17, name: "Azerbaijan" },
  { id: 18, name: "The Bahamas" },
  { id: 19, name: "Bahrain" },
  { id: 20, name: "Bangladesh" },
  { id: 21, name: "Barbados" },
  { id: 22, name: "Belarus" },
  { id: 23, name: "Belgium" },
  { id: 24, name: "Belize" },
  { id: 25, name: "Benin" },
  { id: 26, name: "Bhutan" },
  { id: 27, name: "Bolivia" },
  { id: 28, name: "Bosnia and Herzegovina" },
  { id: 29, name: "Botswana" },
  { id: 30, name: "Brazil" },
  { id: 31, name: "Brunei" },
  { id: 32, name: "Bulgaria" },
  { id: 33, name: "Burkina Faso" },
  { id: 34, name: "Burundi" },
  { id: 35, name: "Cambodia" },
  { id: 36, name: "Cameroon" },
  { id: 37, name: "Canada" },
  { id: 38, name: "Cape Verde" },
  { id: 39, name: "Central African Republic" },
  { id: 40, name: "Chad" },
  { id: 41, name: "Chile" },
  { id: 42, name: "China" },
  { id: 43, name: "Colombia" },
  { id: 44, name: "Comoros" },
  { id: 45, name: "Congo, Republic of the" },
  { id: 46, name: "Congo, Democratic Republic of the" },
  { id: 47, name: "Costa Rica" },
  { id: 48, name: "Cote d'Ivoire" },
  { id: 49, name: "Croatia" },
  { id: 50, name: "Cuba" },
  { id: 51, name: "Cyprus" },
  { id: 52, name: "Czech Republic" },
  { id: 53, name: "Denmark" },
  { id: 54, name: "Djibouti" },
  { id: 55, name: "Dominica" },
  { id: 56, name: "Dominican Republic" },
  { id: 57, name: "East Timor (Timor-Leste)" },
  { id: 58, name: "Ecuador" },
  { id: 59, name: "Egypt" },
  { id: 60, name: "El Salvador" },
  { id: 61, name: "Equatorial Guinea" },
  { id: 62, name: "Eritrea" },
  { id: 63, name: "Estonia" },
  { id: 64, name: "Ethiopia" },
  { id: 65, name: "Fiji" },
  { id: 66, name: "Finland" },
  { id: 67, name: "France" },
  { id: 68, name: "Gabon" },
  { id: 69, name: "The Gambia" },
  { id: 70, name: "Georgia" },
  { id: 71, name: "Germany" },
  { id: 72, name: "Ghana" },
  { id: 73, name: "Greece" },
  { id: 74, name: "Grenada" },
  { id: 75, name: "Guatemala" },
  { id: 76, name: "Guinea" },
  { id: 77, name: "Guinea-Bissau" },
  { id: 78, name: "Guyana" },
  { id: 79, name: "Haiti" },
  { id: 80, name: "Honduras" },
  { id: 81, name: "Hungary" },
  { id: 82, name: "Iceland" },
  { id: 83, name: "India" },
  { id: 84, name: "Indonesia" },
  { id: 85, name: "Iran" },
  { id: 86, name: "Iraq" },
  { id: 87, name: "Ireland" },
  { id: 88, name: "Israel" },
  { id: 89, name: "Italy" },
  { id: 90, name: "Jamaica" },
  { id: 91, name: "Japan" },
  { id: 92, name: "Jordan" },
  { id: 93, name: "Kazakhstan" },
  { id: 94, name: "Kenya" },
  { id: 95, name: "Kiribati" },
  { id: 96, name: "Korea, North" },
  { id: 97, name: "Korea, South" },
  { id: 98, name: "Kosovo" },
  { id: 99, name: "Kuwait" },
  { id: 100, name: "Kyrgyzstan" },
  { id: 101, name: "Laos" },
  { id: 102, name: "Latvia" },
  { id: 103, name: "Lebanon" },
  { id: 104, name: "Lesotho" },
  { id: 105, name: "Liberia" },
  { id: 106, name: "Libya" },
  { id: 107, name: "Liechtenstein" },
  { id: 108, name: "Lithuania" },
  { id: 109, name: "Luxembourg" },
  { id: 110, name: "Macedonia" },
  { id: 111, name: "Madagascar" },
  { id: 112, name: "Malawi" },
  { id: 113, name: "Malaysia" },
  { id: 114, name: "Maldives" },
  { id: 115, name: "Mali" },
  { id: 116, name: "Malta" },
  { id: 117, name: "Marshall Islands" },
  { id: 118, name: "Mauritania" },
  { id: 119, name: "Mauritius" },
  { id: 120, name: "Mexico" },
  { id: 121, name: "Micronesia, Federated States of" },
  { id: 122, name: "Moldova" },
  { id: 123, name: "Monaco" },
  { id: 124, name: "Mongolia" },
  { id: 125, name: "Montenegro" },
  { id: 126, name: "Morocco" },
  { id: 127, name: "Mozambique" },
  { id: 128, name: "Myanmar (Burma)" },
  { id: 129, name: "Namibia" },
  { id: 130, name: "Nauru" },
  { id: 131, name: "Nepal" },
  { id: 132, name: "Netherlands" },
  { id: 133, name: "New Zealand" },
  { id: 134, name: "Nicaragua" },
  { id: 135, name: "Niger" },
  { id: 136, name: "Nigeria" },
  { id: 137, name: "Norway" },
  { id: 138, name: "Oman" },
  { id: 139, name: "Palestine" },
  { id: 140, name: "Pakistan" },
  { id: 141, name: "Palau" },
  { id: 142, name: "Panama" },
  { id: 143, name: "Papua New Guinea" },
  { id: 144, name: "Paraguay" },
  { id: 145, name: "Peru" },
  { id: 146, name: "Philippines" },
  { id: 147, name: "Poland" },
  { id: 148, name: "Portugal" },
  { id: 149, name: "Qatar" },
  { id: 150, name: "Romania" },
  { id: 151, name: "Russia" },
  { id: 152, name: "Rwanda" },
  { id: 153, name: "Saint Kitts and Nevis" },
  { id: 154, name: "Saint Lucia" },
  { id: 155, name: "Saint Vincent and the Grenadines" },
  { id: 156, name: "Samoa" },
  { id: 157, name: "San Marino" },
  { id: 158, name: "Sao Tome and Principe" },
  { id: 159, name: "Saudi Arabia" },
  { id: 160, name: "Senegal" },
  { id: 161, name: "Serbia" },
  { id: 162, name: "Seychelles" },
  { id: 163, name: "Sierra Leone" },
  { id: 164, name: "Singapore" },
  { id: 165, name: "Slovakia" },
  { id: 166, name: "Slovenia" },
  { id: 167, name: "Solomon Islands" },
  { id: 168, name: "Somalia" },
  { id: 169, name: "South Africa" },
  { id: 170, name: "South Sudan" },
  { id: 171, name: "Spain" },
  { id: 172, name: "Sri Lanka" },
  { id: 173, name: "Sudan" },
  { id: 174, name: "Suriname" },
  { id: 175, name: "Swaziland" },
  { id: 176, name: "Sweden" },
  { id: 177, name: "Switzerland" },
  { id: 178, name: "Syria" },
  { id: 179, name: "Taiwan" },
  { id: 180, name: "Tajikistan" },
  { id: 181, name: "Tanzania" },
  { id: 182, name: "Thailand" },
  { id: 183, name: "Togo" },
  { id: 184, name: "Tonga" },
  { id: 185, name: "Trinidad and Tobago" },
  { id: 186, name: "Tunisia" },
  { id: 187, name: "Turkey" },
  { id: 188, name: "Turkmenistan" },
  { id: 189, name: "Tuvalu" },
  { id: 190, name: "Uganda" },
  { id: 191, name: "Ukraine" },
  { id: 192, name: "United Arab Emirates" },
  { id: 193, name: "United Kingdom" },
  { id: 194, name: "United States of America" },
  { id: 195, name: "Uruguay" },
  { id: 196, name: "Uzbekistan" },
  { id: 197, name: "Vanuatu" },
  { id: 198, name: "Vatican City (Holy See)" },
  { id: 199, name: "Venezuela" },
  { id: 200, name: "Vietnam" },
  { id: 201, name: "Yemen" },
  { id: 202, name: "Zambia" },
  { id: 203, name: "Zimbabwe" },
];

export const COUNTRIES_POPULAR = [
  { id: 15, name: "Australia" },
  { id: 37, name: "Canada" },
  { id: 42, name: "China" },
  { id: 67, name: "France" },
  { id: 71, name: "Germany" },
  { id: 83, name: "India" },
  { id: 85, name: "Iran" },
  { id: 86, name: "Iraq" },
  { id: 89, name: "Italy" },
  { id: 91, name: "Japan" },
  { id: 113, name: "Malaysia" },
  { id: 140, name: "Pakistan" },
  { id: 151, name: "Russia" },
  { id: 159, name: "Saudi Arabia" },
  { id: 169, name: "South Africa" },
  { id: 192, name: "United Arab Emirates" },
  { id: 193, name: "United Kingdom" },
  { id: 194, name: "United States of America" },
];

export const LANGUAGES = [
  { id: 1, name: "Arabic" },
  { id: 2, name: "Balochi" },
  { id: 3, name: "Bangla" },
  { id: 4, name: "Cantonese" },
  { id: 5, name: "Dutch" },
  { id: 6, name: "English" },
  { id: 31, name: "Icelandic" },
  { id: 7, name: "Farsi" },
  { id: 8, name: "French" },
  { id: 9, name: "German" },
  { id: 10, name: "Gujarati" },
  { id: 11, name: "Hindi" },
  { id: 12, name: "Italian" },
  { id: 13, name: "Karanese" },
  { id: 14, name: "Kashmiri" },
  { id: 15, name: "Korean" },
  { id: 16, name: "Kurdish" },
  { id: 17, name: "Malyalam" },
  { id: 18, name: "Mandarin" },
  { id: 19, name: "Marathi" },
  { id: 20, name: "Pashto" },
  { id: 21, name: "Portuguese" },
  { id: 22, name: "Punjabi" },
  { id: 23, name: "Sindhi" },
  { id: 24, name: "Spanish" },
  { id: 25, name: "Tamil" },
  { id: 26, name: "Telugu" },
  { id: 27, name: "Turkish" },
  { id: 28, name: "Urdu" },
  { id: 29, name: "Uzbek" },
  { id: 30, name: "Other" },
];

export const EXPERIENCE = [
  { id: 1, name: "< 1 year" },
  { id: 2, name: "1 year" },
  { id: 3, name: "2 years" },
  { id: 4, name: "3 years" },
  { id: 5, name: "4 years" },
  { id: 6, name: "5 years" },
  { id: 7, name: "6 years" },
  { id: 8, name: "7 years" },
  { id: 9, name: "8 years" },
  { id: 10, name: "9 years" },
  { id: 11, name: "10 years" },
  { id: 11, name: "10+ years" },
];


export const PROPERTIES = [
  { id: 1, image: images.dummy1, name: 'Property name', description: 'Some short descriptive text about the property.',  rating: 5},
  { id: 2, image: images.dummy1, name: 'Property name', description: 'Some short descriptive text about the property.',  rating: 5},
  { id: 3, image: images.dummy1, name: 'Property name', description: 'Some short descriptive text about the property.',  rating: 5},
]; 