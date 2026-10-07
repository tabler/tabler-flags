<p align="center">
<a href="https://tabler.io/flags?ref=tabler-flags-readme"><img src="https://raw.githubusercontent.com/tabler/tabler-flags/main/.github/og.png" alt="Tabler Flags" width="838"></a>
</p>

<p align="center">
A set of <!--flags-count-->292<!--/flags-count--> free MIT-licensed high-quality country, territory and organisation flags, shipped as SVG and PNG assets and as components for React, Vue, Preact and Astro. Each flag comes in four variants: rounded, plain, gradient and shiny.
</p>

<p align="center">
<a href="https://github.com/tabler/tabler-flags/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@tabler/flags-react.svg?label=License&message=MIT&color=1c7ed6" alt="License"></a>
<a href="https://github.com/tabler/tabler-flags/actions/workflows/ci.yml" target="__blank"><img alt="CI" src="https://github.com/tabler/tabler-flags/actions/workflows/ci.yml/badge.svg"></a>
<a href="https://github.com/tabler/tabler-flags/actions/workflows/release.yml" target="__blank"><img alt="Release" src="https://github.com/tabler/tabler-flags/actions/workflows/release.yml/badge.svg"></a>
<a href="https://github.com/tabler/tabler-flags" target="__blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/tabler/tabler-flags?style=social"></a>
</p>

## 💛 Sponsors

**If you want to support our project and help us grow it, you can [become a sponsor on GitHub](https://github.com/sponsors/codecalm) or just [donate on PayPal](https://paypal.me/codecalm) :)**

<p align="center">
	<a href="https://github.com/sponsors/codecalm">
		<img src="https://raw.githubusercontent.com/tabler/sponsors/main/sponsors.svg" alt="Tabler sponsors">
	</a>
</p>

## 📦 Packages

Each framework package ships one tree-shakable component per flag (`FlagPoland`, plus an ISO alias `FlagPL`), a dynamic `Flag` component for rendering by slug or ISO code, and a `flagsList` of every slug. See each package's own README for its exact API:

| Package | Version | What | README |
| --- | --- | --- | --- |
| [`@tabler/flags`](packages/flags) | [![npm](https://img.shields.io/npm/v/@tabler/flags?color=1864ab&label=%20)](https://www.npmjs.com/package/@tabler/flags) | SVG files, four variants | [README](packages/flags/README.md) |
| [`@tabler/flags-png`](packages/flags-png) | [![npm](https://img.shields.io/npm/v/@tabler/flags-png?color=1864ab&label=%20)](https://www.npmjs.com/package/@tabler/flags-png) | PNG files, four variants, seven sizes | [README](packages/flags-png/README.md) |
| [`@tabler/flags-react`](packages/flags-react) | [![npm](https://img.shields.io/npm/v/@tabler/flags-react?color=1864ab&label=%20)](https://www.npmjs.com/package/@tabler/flags-react) | React | [README](packages/flags-react/README.md) |
| [`@tabler/flags-vue`](packages/flags-vue) | [![npm](https://img.shields.io/npm/v/@tabler/flags-vue?color=1864ab&label=%20)](https://www.npmjs.com/package/@tabler/flags-vue) | Vue 3 | [README](packages/flags-vue/README.md) |
| [`@tabler/flags-preact`](packages/flags-preact) | [![npm](https://img.shields.io/npm/v/@tabler/flags-preact?color=1864ab&label=%20)](https://www.npmjs.com/package/@tabler/flags-preact) | Preact | [README](packages/flags-preact/README.md) |
| [`@tabler/flags-astro`](packages/flags-astro) | [![npm](https://img.shields.io/npm/v/@tabler/flags-astro?color=1864ab&label=%20)](https://www.npmjs.com/package/@tabler/flags-astro) | Astro | [README](packages/flags-astro/README.md) |

## 🗂️ Repo structure

```
tabler-flags/
  flags.json             # canonical list: slug -> { name, category, iso }
  src/*.svg              # source SVG, one per flag, plain paths on a 30x24 canvas
  .build/
    helpers.mjs          # getAllFlags(), parseFlag() (adds rounded/border/gradient
                         # decorations per variant), svgToNodes()
    build-flags.mjs      # shared generator every framework package's build.mjs calls
    rollup-plugins.mjs   # shared Rollup config (esbuild, license banner, ...)
    import-flags.mjs     # import/*.svg -> src/*.svg via svgo
    validate.mjs         # structural checks on src/*.svg
    update-readme.mjs    # refreshes the count and table below
  packages/
    flags/               # @tabler/flags (SVG)
    flags-png/           # @tabler/flags-png (PNG)
    flags-react/         # @tabler/flags-react
    flags-vue/           # @tabler/flags-vue
    flags-preact/        # @tabler/flags-preact
    flags-astro/         # @tabler/flags-astro
  preview/               # local-only Astro page listing every flag in every variant
```

## 🛠 Development

```bash
pnpm install
pnpm build          # update README, build every package, typecheck
pnpm test           # vitest in every framework package (via turbo)
pnpm dev            # preview page at http://localhost:4321
pnpm import-flags   # import/*.svg -> src/*.svg, then validate
```

## 🏳️ Flags

<!--flags-table-->
### Countries

| Name | Slug | ISO | Component |
| --- | --- | --- | --- |
| Afghanistan | `afghanistan` | `AF` | `FlagAfghanistan`, `FlagAF` |
| Albania | `albania` | `AL` | `FlagAlbania`, `FlagAL` |
| Algeria | `algeria` | `DZ` | `FlagAlgeria`, `FlagDZ` |
| Andorra | `andorra` | `AD` | `FlagAndorra`, `FlagAD` |
| Angola | `angola` | `AO` | `FlagAngola`, `FlagAO` |
| Antigua and Barbuda | `antigua-and-barbuda` | `AG` | `FlagAntiguaAndBarbuda`, `FlagAG` |
| Argentina | `argentina` | `AR` | `FlagArgentina`, `FlagAR` |
| Armenia | `armenia` | `AM` | `FlagArmenia`, `FlagAM` |
| Australia | `australia` | `AU` | `FlagAustralia`, `FlagAU` |
| Austria | `austria` | `AT` | `FlagAustria`, `FlagAT` |
| Azerbaijan | `azerbaijan` | `AZ` | `FlagAzerbaijan`, `FlagAZ` |
| Bahamas | `bahamas` | `BS` | `FlagBahamas`, `FlagBS` |
| Bahrain | `bahrain` | `BH` | `FlagBahrain`, `FlagBH` |
| Bangladesh | `bangladesh` | `BD` | `FlagBangladesh`, `FlagBD` |
| Barbados | `barbados` | `BB` | `FlagBarbados`, `FlagBB` |
| Belarus | `belarus` | `BY` | `FlagBelarus`, `FlagBY` |
| Belgium | `belgium` | `BE` | `FlagBelgium`, `FlagBE` |
| Belize | `belize` | `BZ` | `FlagBelize`, `FlagBZ` |
| Benin | `benin` | `BJ` | `FlagBenin`, `FlagBJ` |
| Bhutan | `bhutan` | `BT` | `FlagBhutan`, `FlagBT` |
| Bolivia | `bolivia` | `BO` | `FlagBolivia`, `FlagBO` |
| Bosnia and Herzegovina | `bosnia-and-herzegovina` | `BA` | `FlagBosniaAndHerzegovina`, `FlagBA` |
| Botswana | `botswana` | `BW` | `FlagBotswana`, `FlagBW` |
| Brazil | `brazil` | `BR` | `FlagBrazil`, `FlagBR` |
| Brunei | `brunei` | `BN` | `FlagBrunei`, `FlagBN` |
| Bulgaria | `bulgaria` | `BG` | `FlagBulgaria`, `FlagBG` |
| Burkina Faso | `burkina-faso` | `BF` | `FlagBurkinaFaso`, `FlagBF` |
| Burundi | `burundi` | `BI` | `FlagBurundi`, `FlagBI` |
| Cambodia | `cambodia` | `KH` | `FlagCambodia`, `FlagKH` |
| Cameroon | `cameroon` | `CM` | `FlagCameroon`, `FlagCM` |
| Canada | `canada` | `CA` | `FlagCanada`, `FlagCA` |
| Cape Verde | `cape-verde` | `CV` | `FlagCapeVerde`, `FlagCV` |
| Central African Republic | `central-african-republic` | `CF` | `FlagCentralAfricanRepublic`, `FlagCF` |
| Chad | `chad` | `TD` | `FlagChad`, `FlagTD` |
| Chile | `chile` | `CL` | `FlagChile`, `FlagCL` |
| China | `china` | `CN` | `FlagChina`, `FlagCN` |
| Colombia | `colombia` | `CO` | `FlagColombia`, `FlagCO` |
| Comoros | `comoros` | `KM` | `FlagComoros`, `FlagKM` |
| Costa Rica | `costa-rica` | `CR` | `FlagCostaRica`, `FlagCR` |
| Croatia | `croatia` | `HR` | `FlagCroatia`, `FlagHR` |
| Cuba | `cuba` | `CU` | `FlagCuba`, `FlagCU` |
| Cyprus | `cyprus` | `CY` | `FlagCyprus`, `FlagCY` |
| Czechia | `czechia` | `CZ` | `FlagCzechia`, `FlagCZ` |
| Democratic Republic of the Congo | `democratic-republic-congo` | `CD` | `FlagDemocraticRepublicCongo`, `FlagCD` |
| Denmark | `denmark` | `DK` | `FlagDenmark`, `FlagDK` |
| Djibouti | `djibouti` | `DJ` | `FlagDjibouti`, `FlagDJ` |
| Dominica | `dominica` | `DM` | `FlagDominica`, `FlagDM` |
| Dominican Republic | `dominican-republic` | `DO` | `FlagDominicanRepublic`, `FlagDO` |
| East Timor | `east-timor` | `TL` | `FlagEastTimor`, `FlagTL` |
| Ecuador | `ecuador` | `EC` | `FlagEcuador`, `FlagEC` |
| Egypt | `egypt` | `EG` | `FlagEgypt`, `FlagEG` |
| El Salvador | `el-salvador` | `SV` | `FlagElSalvador`, `FlagSV` |
| Equatorial Guinea | `equatorial-guinea` | `GQ` | `FlagEquatorialGuinea`, `FlagGQ` |
| Eritrea | `eritrea` | `ER` | `FlagEritrea`, `FlagER` |
| Estonia | `estonia` | `EE` | `FlagEstonia`, `FlagEE` |
| Eswatini | `eswatini` | `SZ` | `FlagEswatini`, `FlagSZ` |
| Ethiopia | `ethiopia` | `ET` | `FlagEthiopia`, `FlagET` |
| Fiji | `fiji` | `FJ` | `FlagFiji`, `FlagFJ` |
| Finland | `finland` | `FI` | `FlagFinland`, `FlagFI` |
| France | `france` | `FR` | `FlagFrance`, `FlagFR` |
| Gabon | `gabon` | `GA` | `FlagGabon`, `FlagGA` |
| Gambia | `gambia` | `GM` | `FlagGambia`, `FlagGM` |
| Georgia | `georgia` | `GE` | `FlagGeorgia`, `FlagGE` |
| Germany | `germany` | `DE` | `FlagGermany`, `FlagDE` |
| Ghana | `ghana` | `GH` | `FlagGhana`, `FlagGH` |
| Greece | `greece` | `GR` | `FlagGreece`, `FlagGR` |
| Grenada | `grenada` | `GD` | `FlagGrenada`, `FlagGD` |
| Guatemala | `guatemala` | `GT` | `FlagGuatemala`, `FlagGT` |
| Guinea | `guinea` | `GN` | `FlagGuinea`, `FlagGN` |
| Guinea-Bissau | `guinea-bissau` | `GW` | `FlagGuineaBissau`, `FlagGW` |
| Guyana | `guyana` | `GY` | `FlagGuyana`, `FlagGY` |
| Haiti | `haiti` | `HT` | `FlagHaiti`, `FlagHT` |
| Honduras | `honduras` | `HN` | `FlagHonduras`, `FlagHN` |
| Hungary | `hungary` | `HU` | `FlagHungary`, `FlagHU` |
| Iceland | `iceland` | `IS` | `FlagIceland`, `FlagIS` |
| India | `india` | `IN` | `FlagIndia`, `FlagIN` |
| Indonesia | `indonesia` | `ID` | `FlagIndonesia`, `FlagID` |
| Iran | `iran` | `IR` | `FlagIran`, `FlagIR` |
| Iraq | `iraq` | `IQ` | `FlagIraq`, `FlagIQ` |
| Ireland | `ireland` | `IE` | `FlagIreland`, `FlagIE` |
| Israel | `israel` | `IL` | `FlagIsrael`, `FlagIL` |
| Italy | `italy` | `IT` | `FlagItaly`, `FlagIT` |
| Ivory Coast | `ivory-coast` | `CI` | `FlagIvoryCoast`, `FlagCI` |
| Jamaica | `jamaica` | `JM` | `FlagJamaica`, `FlagJM` |
| Japan | `japan` | `JP` | `FlagJapan`, `FlagJP` |
| Jordan | `jordan` | `JO` | `FlagJordan`, `FlagJO` |
| Kazakhstan | `kazakhstan` | `KZ` | `FlagKazakhstan`, `FlagKZ` |
| Kenya | `kenya` | `KE` | `FlagKenya`, `FlagKE` |
| Kiribati | `kiribati` | `KI` | `FlagKiribati`, `FlagKI` |
| Kosovo | `kosovo` | `XK` | `FlagKosovo`, `FlagXK` |
| Kuwait | `kuwait` | `KW` | `FlagKuwait`, `FlagKW` |
| Kyrgyzstan | `kyrgyzstan` | `KG` | `FlagKyrgyzstan`, `FlagKG` |
| Laos | `laos` | `LA` | `FlagLaos`, `FlagLA` |
| Latvia | `latvia` | `LV` | `FlagLatvia`, `FlagLV` |
| Lebanon | `lebanon` | `LB` | `FlagLebanon`, `FlagLB` |
| Lesotho | `lesotho` | `LS` | `FlagLesotho`, `FlagLS` |
| Liberia | `liberia` | `LR` | `FlagLiberia`, `FlagLR` |
| Libya | `libya` | `LY` | `FlagLibya`, `FlagLY` |
| Liechtenstein | `liechtenstein` | `LI` | `FlagLiechtenstein`, `FlagLI` |
| Lithuania | `lithuania` | `LT` | `FlagLithuania`, `FlagLT` |
| Luxembourg | `luxembourg` | `LU` | `FlagLuxembourg`, `FlagLU` |
| Madagascar | `madagascar` | `MG` | `FlagMadagascar`, `FlagMG` |
| Malawi | `malawi` | `MW` | `FlagMalawi`, `FlagMW` |
| Malaysia | `malaysia` | `MY` | `FlagMalaysia`, `FlagMY` |
| Maldives | `maldives` | `MV` | `FlagMaldives`, `FlagMV` |
| Mali | `mali` | `ML` | `FlagMali`, `FlagML` |
| Malta | `malta` | `MT` | `FlagMalta`, `FlagMT` |
| Marshall Islands | `marshall-islands` | `MH` | `FlagMarshallIslands`, `FlagMH` |
| Mauritania | `mauritania` | `MR` | `FlagMauritania`, `FlagMR` |
| Mauritius | `mauritius` | `MU` | `FlagMauritius`, `FlagMU` |
| Mexico | `mexico` | `MX` | `FlagMexico`, `FlagMX` |
| Micronesia | `micronesia` | `FM` | `FlagMicronesia`, `FlagFM` |
| Moldova | `moldova` | `MD` | `FlagMoldova`, `FlagMD` |
| Monaco | `monaco` | `MC` | `FlagMonaco`, `FlagMC` |
| Mongolia | `mongolia` | `MN` | `FlagMongolia`, `FlagMN` |
| Montenegro | `montenegro` | `ME` | `FlagMontenegro`, `FlagME` |
| Morocco | `morocco` | `MA` | `FlagMorocco`, `FlagMA` |
| Mozambique | `mozambique` | `MZ` | `FlagMozambique`, `FlagMZ` |
| Myanmar | `myanmar` | `MM` | `FlagMyanmar`, `FlagMM` |
| Namibia | `namibia` | `NA` | `FlagNamibia`, `FlagNA` |
| Nauru | `nauru` | `NR` | `FlagNauru`, `FlagNR` |
| Nepal | `nepal` | `NP` | `FlagNepal`, `FlagNP` |
| Netherlands | `netherlands` | `NL` | `FlagNetherlands`, `FlagNL` |
| New Zealand | `new-zealand` | `NZ` | `FlagNewZealand`, `FlagNZ` |
| Nicaragua | `nicaragua` | `NI` | `FlagNicaragua`, `FlagNI` |
| Niger | `niger` | `NE` | `FlagNiger`, `FlagNE` |
| Nigeria | `nigeria` | `NG` | `FlagNigeria`, `FlagNG` |
| North Korea | `north-korea` | `KP` | `FlagNorthKorea`, `FlagKP` |
| North Macedonia | `north-macedonia` | `MK` | `FlagNorthMacedonia`, `FlagMK` |
| Norway | `norway` | `NO` | `FlagNorway`, `FlagNO` |
| Oman | `oman` | `OM` | `FlagOman`, `FlagOM` |
| Pakistan | `pakistan` | `PK` | `FlagPakistan`, `FlagPK` |
| Palau | `palau` | `PW` | `FlagPalau`, `FlagPW` |
| State of Palestine | `palestine` | `PS` | `FlagPalestine`, `FlagPS` |
| Panama | `panama` | `PA` | `FlagPanama`, `FlagPA` |
| Peru | `peru` | `PE` | `FlagPeru`, `FlagPE` |
| Philippines | `philippines` | `PH` | `FlagPhilippines`, `FlagPH` |
| Poland | `poland` | `PL` | `FlagPoland`, `FlagPL` |
| Portugal | `portugal` | `PT` | `FlagPortugal`, `FlagPT` |
| Qatar | `qatar` | `QA` | `FlagQatar`, `FlagQA` |
| Romania | `romania` | `RO` | `FlagRomania`, `FlagRO` |
| Russia | `russia` | `RU` | `FlagRussia`, `FlagRU` |
| Rwanda | `rwanda` | `RW` | `FlagRwanda`, `FlagRW` |
| Saudi Arabia | `saudi-arabia` | `SA` | `FlagSaudiArabia`, `FlagSA` |
| Senegal | `senegal` | `SN` | `FlagSenegal`, `FlagSN` |
| Serbia | `serbia` | `RS` | `FlagSerbia`, `FlagRS` |
| Singapore | `singapore` | `SG` | `FlagSingapore`, `FlagSG` |
| Slovakia | `slovakia` | `SK` | `FlagSlovakia`, `FlagSK` |
| Slovenia | `slovenia` | `SI` | `FlagSlovenia`, `FlagSI` |
| South Africa | `south-africa` | `ZA` | `FlagSouthAfrica`, `FlagZA` |
| South Korea | `south-korea` | `KR` | `FlagSouthKorea`, `FlagKR` |
| Spain | `spain` | `ES` | `FlagSpain`, `FlagES` |
| Sri Lanka | `sri-lanka` | `LK` | `FlagSriLanka`, `FlagLK` |
| Sweden | `sweden` | `SE` | `FlagSweden`, `FlagSE` |
| Switzerland | `switzerland` | `CH` | `FlagSwitzerland`, `FlagCH` |
| Syria | `syria` | `SY` | `FlagSyria`, `FlagSY` |
| Thailand | `thailand` | `TH` | `FlagThailand`, `FlagTH` |
| Turkey | `turkey` | `TR` | `FlagTurkey`, `FlagTR` |
| Ukraine | `ukraine` | `UA` | `FlagUkraine`, `FlagUA` |
| United Arab Emirates | `united-arab-emirates` | `AE` | `FlagUnitedArabEmirates`, `FlagAE` |
| United Kingdom | `united-kingdom` | `GB` | `FlagUnitedKingdom`, `FlagGB` |
| United States | `united-states` | `US` | `FlagUnitedStates`, `FlagUS` |
| Uruguay | `uruguay` | `UY` | `FlagUruguay`, `FlagUY` |
| Vietnam | `vietnam` | `VN` | `FlagVietnam`, `FlagVN` |
| Zimbabwe | `zimbabwe` | `ZW` | `FlagZimbabwe`, `FlagZW` |
| Zambia | `zambia` | `ZM` | `FlagZambia`, `FlagZM` |
| Yemen | `yemen` | `YE` | `FlagYemen`, `FlagYE` |
| Venezuela | `venezuela` | `VE` | `FlagVenezuela`, `FlagVE` |
| Vatican | `vatican` | `VA` | `FlagVatican`, `FlagVA` |
| Vanuatu | `vanuatu` | `VU` | `FlagVanuatu`, `FlagVU` |
| Uzbekistan | `uzbekistan` | `UZ` | `FlagUzbekistan`, `FlagUZ` |
| Uganda | `uganda` | `UG` | `FlagUganda`, `FlagUG` |
| Tuvalu | `tuvalu` | `TV` | `FlagTuvalu`, `FlagTV` |
| Turkmenistan | `turkmenistan` | `TM` | `FlagTurkmenistan`, `FlagTM` |
| Tunisia | `tunisia` | `TN` | `FlagTunisia`, `FlagTN` |
| Trinidad and Tobago | `trinidad-tobago` | `TT` | `FlagTrinidadTobago`, `FlagTT` |
| Tonga | `tonga` | `TO` | `FlagTonga`, `FlagTO` |
| Togo | `togo` | `TG` | `FlagTogo`, `FlagTG` |
| Tanzania | `tanzania` | `TZ` | `FlagTanzania`, `FlagTZ` |
| Tajikistan | `tajikistan` | `TJ` | `FlagTajikistan`, `FlagTJ` |
| Suriname | `suriname` | `SR` | `FlagSuriname`, `FlagSR` |
| Sudan | `sudan` | `SD` | `FlagSudan`, `FlagSD` |
| South Sudan | `south-sudan` | `SS` | `FlagSouthSudan`, `FlagSS` |
| Somalia | `somalia` | `SO` | `FlagSomalia`, `FlagSO` |
| Sierra Leone | `sierra-leone` | `SL` | `FlagSierraLeone`, `FlagSL` |
| Seychelles | `seychelles` | `SC` | `FlagSeychelles`, `FlagSC` |
| São Tomé and Príncipe | `sao-tome-and-principe` | `ST` | `FlagSaoTomeAndPrincipe`, `FlagST` |
| San Marino | `san-marino` | `SM` | `FlagSanMarino`, `FlagSM` |
| Samoa | `samoa` | `WS` | `FlagSamoa`, `FlagWS` |
| Saint Vincent and the Grenadines | `saint-vincent-and-grenadines` | `VC` | `FlagSaintVincentAndGrenadines`, `FlagVC` |
| Saint Lucia | `saint-lucia` | `LC` | `FlagSaintLucia`, `FlagLC` |
| Saint Kitts and Nevis | `saint-kitts-and-nevis` | `KN` | `FlagSaintKittsAndNevis`, `FlagKN` |
| Republic of the Congo | `republic-congo` | `CG` | `FlagRepublicCongo`, `FlagCG` |
| Paraguay | `paraguay` | `PY` | `FlagParaguay`, `FlagPY` |
| Papua New Guinea | `papua-new-guinea` | `PG` | `FlagPapuaNewGuinea`, `FlagPG` |

### Unions

| Name | Slug | ISO | Component |
| --- | --- | --- | --- |
| African Union | `african-union` |  | `FlagAfricanUnion` |
| Arab League | `arab-league` |  | `FlagArabLeague` |
| ASEAN Union | `asean-union` | `ASEAN` | `FlagAseanUnion`, `FlagASEAN` |
| Commonwealth of Independent States | `commonwealth-of-independent-states` |  | `FlagCommonwealthOfIndependentStates` |
| Commonwealth of Nations | `commonwealth-of-nations` |  | `FlagCommonwealthOfNations` |
| NATO | `nato` | `NATO` | `FlagNato`, `FlagNATO` |
| United Nations | `un` | `UN` | `FlagUn`, `FlagUN` |
| Turkic States | `turkic-states` |  | `FlagTurkicStates` |
| South American Union | `south-american-union` |  | `FlagSouthAmericanUnion` |
| Pan-European Union | `paneuropean-union` |  | `FlagPaneuropeanUnion` |
| Central European Free Trade Agreement | `cefta` |  | `FlagCefta` |
| Pacific Community | `pacific-community` | `PC` | `FlagPacificCommunity`, `FlagPC` |
| European Union | `european-union` | `EU` | `FlagEuropeanUnion`, `FlagEU` |
| Nordic Council | `nordic-council` |  | `FlagNordicCouncil` |
| Mercosur | `mercosur` | `MERCOSUR` | `FlagMercosur`, `FlagMERCOSUR` |
| East African Community | `east-african-community` | `EAC` | `FlagEastAfricanCommunity`, `FlagEAC` |

### Territories

| Name | Slug | ISO | Component |
| --- | --- | --- | --- |
| Åland Islands | `aland-islands` | `AX` | `FlagAlandIslands`, `FlagAX` |
| American Samoa | `american-samoa` | `AS` | `FlagAmericanSamoa`, `FlagAS` |
| Anguilla | `anguilla` | `AI` | `FlagAnguilla`, `FlagAI` |
| Antarctica | `antarctica` | `AQ` | `FlagAntarctica`, `FlagAQ` |
| Aruba | `aruba` | `AW` | `FlagAruba`, `FlagAW` |
| Ascension Island | `ascension-island` | `SH-AC` | `FlagAscensionIsland`, `FlagSHAC` |
| Bermuda | `bermuda` | `BM` | `FlagBermuda`, `FlagBM` |
| British Virgin Islands | `british-virgin-islands` | `VG` | `FlagBritishVirginIslands`, `FlagVG` |
| Canary Islands | `canary-islands` | `IC` | `FlagCanaryIslands`, `FlagIC` |
| Catalonia | `catalonia` | `ES-CT` | `FlagCatalonia`, `FlagESCT` |
| Cayman Islands | `cayman-islands` | `KY` | `FlagCaymanIslands`, `FlagKY` |
| Christmas Island | `christmas-island` | `CX` | `FlagChristmasIsland`, `FlagCX` |
| Cocos (Keeling) Islands | `cocos-keeling-islands` | `CC` | `FlagCocosKeelingIslands`, `FlagCC` |
| Cook Islands | `cook-islands` | `CK` | `FlagCookIslands`, `FlagCK` |
| Curaçao | `curacao` | `CW` | `FlagCuracao`, `FlagCW` |
| Diego Garcia | `diego-garcia` | `DG` | `FlagDiegoGarcia`, `FlagDG` |
| England | `england` | `GB-ENG` | `FlagEngland`, `FlagGBENG` |
| Falkland Islands | `falkland-islands` | `FK` | `FlagFalklandIslands`, `FlagFK` |
| Faroe Islands | `faroe-islands` | `FO` | `FlagFaroeIslands`, `FlagFO` |
| French Guiana | `french-guiana` | `GF` | `FlagFrenchGuiana`, `FlagGF` |
| French Polynesia | `french-polynesia` | `PF` | `FlagFrenchPolynesia`, `FlagPF` |
| French Southern Territories | `french-southern-territories` | `TF` | `FlagFrenchSouthernTerritories`, `FlagTF` |
| Gibraltar | `gibraltar` | `GI` | `FlagGibraltar`, `FlagGI` |
| Greenland | `greenland` | `GL` | `FlagGreenland`, `FlagGL` |
| Guadeloupe | `guadeloupe` | `GP` | `FlagGuadeloupe`, `FlagGP` |
| Guam | `guam` | `GU` | `FlagGuam`, `FlagGU` |
| Guernsey | `guernsey` | `GG` | `FlagGuernsey`, `FlagGG` |
| Heard and McDonald Islands | `heard-and-mcdonald-islands` | `HM` | `FlagHeardAndMcdonaldIslands`, `FlagHM` |
| Hong Kong | `hong-kong` | `HK` | `FlagHongKong`, `FlagHK` |
| Isle of Man | `isle-of-man` | `IM` | `FlagIsleOfMan`, `FlagIM` |
| Jersey | `jersey` | `JE` | `FlagJersey`, `FlagJE` |
| Macau | `macau` | `MO` | `FlagMacau`, `FlagMO` |
| Martinique | `martinique` | `MQ` | `FlagMartinique`, `FlagMQ` |
| Mayotte | `mayotte` | `YT` | `FlagMayotte`, `FlagYT` |
| Montserrat | `montserrat` | `MS` | `FlagMontserrat`, `FlagMS` |
| New Caledonia | `new-caledonia` | `NC` | `FlagNewCaledonia`, `FlagNC` |
| Niue | `niue` | `NU` | `FlagNiue`, `FlagNU` |
| Norfolk Island | `norfolk-island` | `NF` | `FlagNorfolkIsland`, `FlagNF` |
| Northern Mariana Islands | `northern-mariana-islands` | `MP` | `FlagNorthernMarianaIslands`, `FlagMP` |
| Taiwan | `taiwan` | `TW` | `FlagTaiwan`, `FlagTW` |
| Western Sahara | `western-sahara` | `EH` | `FlagWesternSahara`, `FlagEH` |
| Wallis and Futuna | `wallis-and-futuna` | `WF` | `FlagWallisAndFutuna`, `FlagWF` |
| Wales | `wales` | `GB-WLS` | `FlagWales`, `FlagGBWLS` |
| Virgin Islands | `virgin-islands` | `VI` | `FlagVirginIslands`, `FlagVI` |
| Turks and Caicos Islands | `turks-and-caicos-islands` | `TC` | `FlagTurksAndCaicosIslands`, `FlagTC` |
| Tristan da Cunha | `tristan-da-cunha` | `SH-TA` | `FlagTristanDaCunha`, `FlagSHTA` |
| Tokelau | `tokelau` | `TK` | `FlagTokelau`, `FlagTK` |
| South Georgia and the South Sandwich Islands | `south-georgia-and-south-sandwich-islands` | `GS` | `FlagSouthGeorgiaAndSouthSandwichIslands`, `FlagGS` |
| Solomon Islands | `solomon-islands` | `SB` | `FlagSolomonIslands`, `FlagSB` |
| Sint Maarten | `sint-maarten` | `SX` | `FlagSintMaarten`, `FlagSX` |
| Sint Eustatius | `sint-eustatius` | `BQ3` | `FlagSintEustatius`, `FlagBQ3` |
| Scotland | `scotland` | `GB-SCT` | `FlagScotland`, `FlagGBSCT` |
| Saint Pierre and Miquelon | `saint-pierre-and-miquelon` | `PM` | `FlagSaintPierreAndMiquelon`, `FlagPM` |
| Saint Helena | `saint-helena` | `SH-HL` | `FlagSaintHelena`, `FlagSHHL` |
| Saint Barthélemy | `saint-barthelemy` | `BL` | `FlagSaintBarthelemy`, `FlagBL` |
| Saba | `saba` | `BQ2` | `FlagSaba`, `FlagBQ2` |
| Réunion | `reunion` | `RE` | `FlagReunion`, `FlagRE` |
| Puerto Rico | `puerto-rico` | `PR` | `FlagPuertoRico`, `FlagPR` |
| Pitcairn Islands | `pitcairn-islands` | `PN` | `FlagPitcairnIslands`, `FlagPN` |
| Transnistria | `transnistria` |  | `FlagTransnistria` |
| South Ossetia | `south-ossetia` |  | `FlagSouthOssetia` |
| Northern Cyprus | `northern-cyprus` |  | `FlagNorthernCyprus` |
| Abkhazia | `abkhazia` |  | `FlagAbkhazia` |
| Somaliland | `somaliland` |  | `FlagSomaliland` |
| Bonaire | `bonaire` | `BQ1` | `FlagBonaire`, `FlagBQ1` |
| Tatarstan | `tatarstan` |  | `FlagTatarstan` |
| Jubaland | `jubaland` |  | `FlagJubaland` |
| Tibet | `tibet` |  | `FlagTibet` |
| Chechnya | `chechnya` |  | `FlagChechnya` |
| Sealand | `sealand` |  | `FlagSealand` |
| Cabinda | `cabinda` |  | `FlagCabinda` |
| Kurdistan | `kurdistan` |  | `FlagKurdistan` |
| Basque Country | `basque-country` | `ES-PV` | `FlagBasqueCountry`, `FlagESPV` |
| Galicia | `galicia` | `ES-GA` | `FlagGalicia`, `FlagESGA` |
| Northern Ireland | `northern-ireland` | `GB-NIR` | `FlagNorthernIreland`, `FlagGBNIR` |

### Other

| Name | Slug | ISO | Component |
| --- | --- | --- | --- |
| Chequered | `chequered` |  | `FlagChequered` |
| Pirate | `pirate` |  | `FlagPirate` |
| Paraolympic | `paraolympic` |  | `FlagParaolympic` |
| Olympic | `olympic` |  | `FlagOlympic` |
| Diver Down | `diver-down` |  | `FlagDiverDown` |
| Semaphore Signal | `semaphore-signal` |  | `FlagSemaphoreSignal` |
| Maltese Cross | `maltese-cross` |  | `FlagMalteseCross` |
| Rainbow | `rainbow` |  | `FlagRainbow` |
| Red Cross | `red-cross` |  | `FlagRedCross` |
| Red Crescent | `red-crescent` |  | `FlagRedCrescent` |
| Unknown | `unknown` |  | `FlagUnknown` |
<!--/flags-table-->

## 📝 License

tabler-flags is licensed under the [MIT License](https://github.com/tabler/tabler-flags/blob/main/LICENSE).
