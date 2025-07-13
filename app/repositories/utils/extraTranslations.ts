export function getShareText(locale:string)
{
    //todo at some point put this in Dato
    const socialShareTranslations: { [key: string]: string } = {
        "en": "And/or share via social media",
        "fr": "Et/ou partager via les réseaux sociaux",
        "nl": "En/of delen via sociale media",
        "sr": "I/ili podelite putem društvenih mreža",
        "hi": "और/या सोशल मीडिया के माध्यम से साझा करें",
        "ja": "ソーシャルメディアで共有する",
        "zh": "通过社交媒体分享",
        "es": "Y/o compartir a través de las redes sociales",
        "pt": "E/ou compartilhar através das redes sociais",
        "no": "Og/eller del via sosiale medier",
    };
      

    const translation = socialShareTranslations[locale];

    if (translation) {
        return translation;
    } else {
        console.warn(`Translation for locale "${locale}" not found. Falling back to English. you need to update getShareText`);
        return socialShareTranslations["en"]; // Fallback to English
    }
}

const resultTranslations: { [key: string]: string } = {
    "en": "Result",
    "fr": "Résultat",
    "nl": "Resultaat",
    "sr": "Rezultat",
    "hi": "परिणाम",
    "ja": "結果",
    "zh": "结果",
    "es": "Resultado",
    "pt": "Resultado",
    "no": "Resultat",
    "de": "Ergebnis", //Added German
    "it": "Risultato", //Added Italian
    "ru": "Результат", //Added Russian
    "ko": "결과", // Added Korean
    "ar": "نتيجة", //Added Arabic
    "sv": "Resultat", // Added Swedish
    "da": "Resultat", // Added Danish
    "fi": "Tulos", // Added Finnish
    "pl": "Wynik", // Added Polish
    "tr": "Sonuç" //Added Turkish
};


export type TCookieBannerText = {
    mainText:string;
    approveText: string;
    declineText: string;
    headerText?:string;
    privacyLinkText?:string;
    resetText?:string;
}
export const getCookieBannerText = (locale: string): TCookieBannerText => {
   /* const englishMainText = "We use a single cookie for the sole purpose of protecting against misuse of the voting process.\n" +
        "We'd also like, but only if you agree, to set analytics cookies solely to understand how you use this\n" +
        "site. We do this to make the site work better.";*/

    const englishMainText = "We use cookies to give you the best online experience. Strictly necessary cookies are on by default. Additional cookies are off by default."
    const englishApproveText = "Accept non-essential cookies";
    const englishDeclineText = "Reject non-essential cookies";
    const englishPrivacyText = "See privacy policy for details";
    const englishHeaderText = "Cookies on OurPlanetOurPeople";

    const resultTranslations: { [key: string]: TCookieBannerText } = {
        "en": {
            approveText: englishApproveText,
            declineText: englishDeclineText,
            mainText: englishMainText,
            headerText: englishHeaderText,
            privacyLinkText: englishPrivacyText,
            resetText: "Reset Cookies"
        },
        "fr": {
            approveText: "Accepter les cookies non essentiels",
            declineText: "Refuser les cookies non essentiels",
            mainText: "Nous utilisons des cookies pour vous offrir la meilleure expérience en ligne. Les cookies strictement nécessaires sont activés par défaut. Les cookies supplémentaires sont désactivés par défaut.",
            headerText: "Cookies sur OurPlanetOurPeople",
            privacyLinkText: "Voir la politique de confidentialité pour plus de détails",
            resetText: "Réinitialiser les cookies"
        },
        "nl": {
            approveText: "Niet-essentiële cookies accepteren",
            declineText: "Niet-essentiële cookies weigeren",
            mainText: "We gebruiken cookies om u de beste online ervaring te bieden. Strikt noodzakelijke cookies zijn standaard ingeschakeld. Aanvullende cookies zijn standaard uitgeschakeld.",
            headerText: "Cookies op OurPlanetOurPeople",
            privacyLinkText: "Zie privacybeleid voor details",
            resetText: "Cookies resetten"
        },
        "sr": {
            approveText: "Prihvati nebitne kolačiće",
            declineText: "Odbij nebitne kolačiće",
            mainText: "Koristimo kolačiće kako bismo vam pružili najbolje online iskustvo. Strogo neophodni kolačići su uključeni po zadanom. Dodatni kolačići su isključeni po zadanom.",
            headerText: "Kolačići na OurPlanetOurPeople",
            privacyLinkText: "Pogledajte politiku privatnosti za detalje",
            resetText: "Resetuj kolačiće"
        },
        "hi": {
            approveText: "गैर-आवश्यक कुकीज़ स्वीकार करें",
            declineText: "गैर-आवश्यक कुकीज़ अस्वीकार करें",
            mainText: "हम आपको सर्वोत्तम ऑनलाइन अनुभव देने के लिए कुकीज़ का उपयोग करते हैं। सख्ती से आवश्यक कुकीज़ डिफ़ॉल्ट रूप से चालू हैं। अतिरिक्त कुकीज़ डिफ़ॉल्ट रूप से बंद हैं।",
            headerText: "OurPlanetOurPeople पर कुकीज़",
            privacyLinkText: "विवरण के लिए गोपनीयता नीति देखें",
            resetText: "कुकीज़ रीसेट करें"
        },
        "ja": {
            approveText: "不要なCookieを受け入れる",
            declineText: "不要なCookieを拒否する",
            mainText: "最高のオンライン体験を提供するためにCookieを使用します。厳密に必要なCookieはデフォルトでオンになっています。追加のCookieはデフォルトでオフになっています。",
            headerText: "OurPlanetOurPeopleのCookie",
            privacyLinkText: "詳細についてはプライバシーポリシーをご覧ください",
            resetText: "Cookieをリセット"
        },
        "zh": {
            approveText: "接受非必要 Cookie",
            declineText: "拒绝非必要 Cookie",
            mainText: "我们使用 Cookie 为您提供最佳的在线体验。严格必要的 Cookie 默认开启。额外的 Cookie 默认关闭。",
            headerText: "OurPlanetOurPeople 上的 Cookie",
            privacyLinkText: "（有关详细信息，请参阅隐私政策）",
            resetText: "重置 Cookie"
        },
        "es": {
            approveText: "Aceptar cookies no esenciales",
            declineText: "Rechazar cookies no esenciales",
            mainText: "Utilizamos cookies para ofrecerle la mejor experiencia en línea. Las cookies estrictamente necesarias están activadas de forma predeterminada. Las cookies adicionales están desactivadas de forma predeterminada.",
            headerText: "Cookies en OurPlanetOurPeople",
            privacyLinkText: "Consulte la política de privacidad para obtener más detalles",
            resetText: "Restablecer cookies"
        },
        "pt": {
            approveText: "Aceitar cookies não essenciais",
            declineText: "Rejeitar cookies não essenciais",
            mainText: "Usamos cookies para lhe proporcionar a melhor experiência online. Os cookies estritamente necessários estão ativados por padrão. Os cookies adicionais estão desativados por padrão.",
            headerText: "Cookies no OurPlanetOurPeople",
            privacyLinkText: "Consulte a política de privacidade para obter detalhes",
            resetText: "Redefinir cookies"
        },
        "no": {
            approveText: "Godta ikke-essensielle informasjonskapsler",
            declineText: "Avvis ikke-essensielle informasjonskapsler",
            mainText: "Vi bruker informasjonskapsler for å gi deg den beste online opplevelsen. Strengt nødvendige informasjonskapsler er slått på som standard. Ytterligere informasjonskapsler er slått av som standard.",
            headerText: "Informasjonskapsler på OurPlanetOurPeople",
            privacyLinkText: "Se personvernerklæringen for detaljer",
            resetText: "Tilbakestill informasjonskapsler"
        },
        "de": {
            approveText: "Nicht notwendige Cookies akzeptieren",
            declineText: "Nicht notwendige Cookies ablehnen",
            mainText: "Wir verwenden Cookies, um Ihnen die beste Online-Erfahrung zu bieten. Unbedingt erforderliche Cookies sind standardmäßig aktiviert. Zusätzliche Cookies sind standardmäßig deaktiviert.",
            headerText: "Cookies auf OurPlanetOurPeople",
            privacyLinkText: "Weitere Informationen finden Sie in der Datenschutzerklärung",
            resetText: "Cookies zurücksetzen"
        },
        "it": {
            approveText: "Accetta cookie non essenziali",
            declineText: "Rifiuta cookie non essenziali",
            mainText: "Utilizziamo i cookie per offrirti la migliore esperienza online. I cookie strettamente necessari sono attivati per impostazione predefinita. I cookie aggiuntivi sono disattivati per impostazione predefinita.",
            headerText: "Cookie su OurPlanetOurPeople",
            privacyLinkText: "Consulta l'informativa sulla privacy per i dettagli",
            resetText: "Ripristina cookie"
        },
        "ru": {
            approveText: "Принять необязательные файлы cookie",
            declineText: "Отклонить необязательные файлы cookie",
            mainText: "Мы используем файлы cookie, чтобы предоставить вам лучший онлайн-опыт. Строго необходимые файлы cookie включены по умолчанию. Дополнительные файлы cookie отключены по умолчанию.",
            headerText: "Файлы cookie на OurPlanetOurPeople",
            privacyLinkText: "Подробности см. в политике конфиденциальности",
            resetText: "Сбросить файлы cookie"
        },
        "ko": {
            approveText: "필수적이지 않은 쿠키 허용",
            declineText: "필수적이지 않은 쿠키 거부",
            mainText: "최고의 온라인 경험을 제공하기 위해 쿠키를 사용합니다. 엄격히 필요한 쿠키는 기본적으로 활성화되어 있습니다. 추가 쿠키는 기본적으로 비활성화되어 있습니다.",
            headerText: "OurPlanetOurPeople의 쿠키",
            privacyLinkText: "자세한 내용은 개인 정보 보호 정책을 참조하십시오.",
            resetText: "쿠키 재설정"
        },
        "ar": {
            approveText: "قبول ملفات تعريف الارتباط غير الضرورية",
            declineText: "رفض ملفات تعريف الارتباط غير الضرورية",
            mainText: "نستخدم ملفات تعريف الارتباط لنمنحك أفضل تجربة عبر الإنترنت. يتم تشغيل ملفات تعريف الارتباط الضرورية للغاية افتراضيًا. يتم إيقاف تشغيل ملفات تعريف الارتباط الإضافية افتراضيًا.",
            headerText: "ملفات تعريف الارتباط على OurPlanetOurPeople",
            privacyLinkText: "راجع سياسة الخصوصية للحصول على التفاصيل",
            resetText: "إعادة تعيين ملفات تعريف الارتباط"
        },
        "sv": {
            approveText: "Acceptera icke-nödvändiga cookies",
            declineText: "Avvisa icke-nödvändiga cookies",
            mainText: "Vi använder cookies för att ge dig den bästa onlineupplevelsen. Strikt nödvändiga cookies är aktiverade som standard. Ytterligare cookies är inaktiverade som standard.",
            headerText: "Cookies på OurPlanetOurPeople",
            privacyLinkText: "Se integritetspolicyn för mer information",
            resetText: "Återställ cookies"
        },
        "da": {
            approveText: "Accepter ikke-væsentlige cookies",
            declineText: "Afvis ikke-væsentlige cookies",
            mainText: "Vi bruger cookies for at give dig den bedste onlineoplevelse. Strengt nødvendige cookies er slået til som standard. Yderligere cookies er slået fra som standard.",
            headerText: "Cookies på OurPlanetOurPeople",
            privacyLinkText: "Se privatlivspolitikken for detaljer",
            resetText: "Nulstil cookies"
        },
        "fi": {
            approveText: "Hyväksy ei-välttämättömät evästeet",
            declineText: "Hylkää ei-välttämättömät evästeet",
            mainText: "Käytämme evästeitä tarjotaksemme sinulle parhaan mahdollisen verkkokokemuksen. Välttämättömät evästeet ovat oletusarvoisesti käytössä. Lisäevästeet ovat oletusarvoisesti poissa käytöstä.",
            headerText: "Evästeet sivustolla OurPlanetOurPeople",
            privacyLinkText: "Katso lisätietoja tietosuojakäytännöstä",
            resetText: "Nollaa evästeet"
        },
        "pl": {
            approveText: "Zaakceptuj nieistotne pliki cookie",
            declineText: "Odrzuć nieistotne pliki cookie",
            mainText: "Używamy plików cookie, aby zapewnić Ci najlepsze wrażenia online. Ściśle niezbędne pliki cookie są domyślnie włączone. Dodatkowe pliki cookie są domyślnie wyłączone.",
            headerText: "Pliki cookie na OurPlanetOurPeople",
            privacyLinkText: "Zobacz politykę prywatności, aby uzyskać szczegółowe informacje",
            resetText: "Zresetuj pliki cookie"
        },
        "tr": {
            approveText: "Gerekli olmayan çerezleri kabul et",
            declineText: "Gerekli olmayan çerezleri reddet",
            mainText: "Size en iyi çevrimiçi deneyimi sunmak için çerezleri kullanıyoruz. Kesinlikle gerekli çerezler varsayılan olarak açıktır. Ek çerezler varsayılan olarak kapalıdır.",
            headerText: "OurPlanetOurPeople'daki Çerezler",
            privacyLinkText: "Ayrıntılar için gizlilik politikasına bakın",
            resetText: "Çerezleri sıfırla"
        }
    };

    return resultTranslations[locale] || resultTranslations["en"];
};

// Example usage:
export function getResultTranslation(languageCode: string): string {
    return resultTranslations[languageCode] || resultTranslations["en"]; // Default to English if not found
}

const yesTranslations: { [key: string]: string } = {
    "en": "Yes",
    "fr": "Oui",
    "nl": "Ja",
    "sr": "Da",
    "hi": "हाँ",
    "ja": "はい",
    "zh": "是",
    "es": "Sí",
    "pt": "Sim",
    "no": "Ja",
    "de": "Ja",
    "it": "Sì",
    "ru": "Да",
    "ko": "예",
    "ar": "نعم",
    "sv": "Ja",
    "da": "Ja",
    "fi": "Kyllä",
    "pl": "Tak",
    "tr": "Evet"
};

const noTranslations: { [key: string]: string } = {
    "en": "No",
    "fr": "Non",
    "nl": "Nee",
    "sr": "Ne",
    "hi": "नहीं",
    "ja": "いいえ",
    "zh": "否",
    "es": "No",
    "pt": "Não",
    "no": "Nei",
    "de": "Nein",
    "it": "No",
    "ru": "Нет",
    "ko": "아니요",
    "ar": "لا",
    "sv": "Nej",
    "da": "Nej",
    "fi": "Ei",
    "pl": "Nie",
    "tr": "Hayır"
};

export function getYesTranslation(languageCode: string): string {
    return yesTranslations[languageCode] || yesTranslations["en"];
}

export function getNoTranslation(languageCode: string): string {
    return noTranslations[languageCode] || noTranslations["en"];
}

const donateTranslations: { [key: string]: string } = {
    "en": "Donate",
    "fr": "Faire un don",
    "nl": "Doneren",
    "sr": "Doniraj",
    "hi": "दान करें",
    "ja": "寄付する",
    "zh": "捐赠",
    "es": "Donar",
    "pt": "Doar",
    "no": "Doner",
    "de": "Spenden",
    "it": "Donare",
    "ru": "Пожертвовать",
    "ko": "기부하다",
    "ar": "تبرع",
    "sv": "Donera",
    "da": "Donér",
    "fi": "Lahjoita",
    "pl": "Podaruj",
    "tr": "Bağış Yap"
};

// Example usage:
export function getDonateTranslation(languageCode: string): string {
    return donateTranslations[languageCode] || donateTranslations["en"]; // Default to English if not found
}


const nextTranslations: { [key: string]: string } = {
    "en": "Video summary",
    "fr": "Résumé de la vidéo",
    "nl": "Videosamenvatting",
    "sr": "Резиме видео снимка",
    "hi": "वीडियो सारांश",
    "ja": "ビデオの要約",
    "zh": "视频摘要",
    "es": "Resumen del video",
    "pt": "Resumo do vídeo",
    "no": "Videosammendrag",
    "de": "Videozusammenfassung",
    "it": "Riepilogo del video",
    "ru": "Краткое содержание видео",
    "ko": "비디오 요약",
    "ar": "ملخص الفيديو",
    "sv": "Videosammanfattning",
    "da": "Videosammendrag",
    "fi": "Videon yhteenveto",
    "pl": "Podsumowanie wideo",
    "tr": "Video özeti",
    "el": "Περίληψη βίντεο",
    "id": "Ringkasan video",
    "uk": "Короткий зміст відео",
    "vi": "Tóm tắt video",
    "th": "สรุปวิดีโอ",
    "he": "סיכום וידאו",
    "hu": "Videó összefoglaló",
    "ro": "Rezumat video",
    "cs": "Shrnutí videa",
    "sk": "Zhrnutie videa"
};

export function getNextTranslation(languageCode: string): string {
    return nextTranslations[languageCode] || nextTranslations["en"];
}

const summaryTranslations: { [key: string]: string } = {
    "en": "PDF summary",
    "fr": "Résumé PDF",
    "nl": "PDF-samenvatting",
    "sr": "PDF резиме",
    "hi": "PDF सारांश",
    "ja": "PDF要約",
    "zh": "PDF摘要",
    "es": "Resumen PDF",
    "pt": "Resumo PDF",
    "no": "PDF-sammendrag",
    "de": "PDF-Zusammenfassung",
    "it": "Riepilogo PDF",
    "ru": "PDF резюме",
    "ko": "PDF 요약",
    "ar": "ملخص PDF",
    "sv": "PDF-sammanfattning",
    "da": "PDF-resumé",
    "fi": "PDF-yhteenveto",
    "pl": "Podsumowanie PDF",
    "tr": "PDF özeti",
    "el": "PDF περίληψη",
    "id": "Ringkasan PDF",
    "uk": "PDF резюме",
    "vi": "Tóm tắt PDF",
    "th": "สรุป PDF",
    "he": "תקציר PDF",
    "hu": "PDF összefoglaló",
    "ro": "Rezumat PDF",
    "cs": "PDF souhrn",
    "sk": "PDF zhrnutie"
};

export function getSummaryTranslation(languageCode: string): string {
    return summaryTranslations[languageCode] || summaryTranslations["en"];
}

const detailTranslations: { [key: string]: string } = {
    "en": "The involvement of the people",
    "fr": "L'implication des gens",
    "nl": "De betrokkenheid van het volk",
    "sr": "Укључивање народа",
    "hi": "लोगों की भागीदारी",
    "ja": "人々の関与",
    "zh": "人民的参与",
    "es": "La participación del pueblo",
    "pt": "O envolvimento do povo",
    "no": "Folkets engasjement",
    "de": "Die Beteiligung der Menschen",
    "it": "Il coinvolgimento del popolo",
    "ru": "Участие народа",
    "ko": "사람들의 참여",
    "ar": "مشاركة الناس",
    "sv": "Folkets engagemang",
    "da": "Folkets engagement",
    "fi": "Ihmisten osallistuminen",
    "pl": "Zaangażowanie ludzi",
    "tr": "Halkın katılımı",
    "el": "Η εμπλοκή του λαού",
    "id": "Keterlibatan rakyat",
    "uk": "Залучення людей",
    "vi": "Sự tham gia của người dân",
    "th": "การมีส่วนร่วมของประชาชน",
    "he": "מעורבות האנשים",
    "hu": "Az emberek részvétele",
    "ro": "Implicarea oamenilor",
    "cs": "Zapojení lidí",
    "sk": "Zapojenie ľudí"
};

export function getDetailTranslation(languageCode: string): string {
    return detailTranslations[languageCode] || detailTranslations["en"];
}

interface CountryResultsTranslations {
    [languageCode: string]: string;
}

const countryResultsTranslations: CountryResultsTranslations = {
    "en": "All Countries Results",
    "fr": "Résultats de tous les pays",
    "nl": "Resultaten van alle landen",
    "sr": "Rezultati svih zemalja",
    "hi": "सभी देशों के परिणाम",
    "ja": "すべての国の結果",
    "zh": "所有国家的结果",
    "es": "Resultados de todos los países",
    "pt": "Resultados de todos os países",
    "no": "Resultater for alle land"
};

export function getCountryResultsTranslation(languageCode: string): string {
    return countryResultsTranslations[languageCode] || countryResultsTranslations["en"];
}


interface LanguageTranslations {
    [key: string]: string; // Allows any string key with a string value
}

interface Translations {
    [languageCode: string]: LanguageTranslations;
}

const microCopyTranslations: Translations = {
    "en": {
        "videoPrompt": "To share our site via social media or direct contacts, visit our",
        "shareButton": "sharing page",
        "inDepthLink": "visiting our In Depth page",
        "orFindOutMore": "Or find out more by",
        "registrationHelper": "To reach me directly, please use the following email address"
    },
    "fr": {
        "videoPrompt": "Pour partager notre site via les réseaux sociaux ou des contacts directs, visitez notre",
        "shareButton": "page de partage",
        "inDepthLink": "en visitant notre page Approfondie",
        "orFindOutMore": "Ou découvrez-en plus en",
        "registrationHelper": "Pour toute question relative au processus d'inscription ou de désinscription, veuillez nous envoyer votre demande par e-mail à"
    },
    "nl": {
        "videoPrompt": "Om onze site te delen via sociale media of directe contacten, ga naar onze",
        "shareButton": "deelpagina",
        "inDepthLink": "door onze In Depth-pagina te bezoeken",
        "orFindOutMore": "Of kom meer te weten door",
        "registrationHelper": "Voor vragen over het registratie- of deregistratieproces kunt u ons een e-mail sturen op"
    },
    "sr": {
        "videoPrompt": "Da biste podelili naš sajt putem društvenih mreža ili direktnih kontakata, posetite našu",
        "shareButton": "stranicu za deljenje",
        "inDepthLink": "posetom našoj In Depth stranici",
        "orFindOutMore": "Ili saznajte više tako što ćete",
        "registrationHelper": "Za sva pitanja u vezi sa procesom registracije ili odjave, pošaljite nam svoj upit putem e-pošte na"
    },
    "hi": {
        "videoPrompt": "हमारी साइट को सोशल मीडिया या सीधे संपर्कों के माध्यम से साझा करने के लिए, कृपया हमारी",
        "shareButton": "साझा करने वाला पृष्ठ",
        "inDepthLink": "हमारे इन डेप्थ पेज पर जाकर",
        "orFindOutMore": "या अधिक जानने के लिए",
        "registrationHelper": "पंजीकरण या डीरजिस्ट्रेशन प्रक्रिया से संबंधित किसी भी प्रश्न के लिए, कृपया हमें इस ईमेल पते पर अपनी क्वेरी भेजें"
    },
    "ja": {
        "videoPrompt": "当サイトをSNSや直接の連絡で共有するには、こちらの",
        "shareButton": "共有ページ",
        "inDepthLink": "詳細ページをご覧ください",
        "orFindOutMore": "または詳細ページをご覧ください",
        "registrationHelper": "登録または登録解除の手続きに関するご質問は、以下のメールアドレスまでお問い合わせください"
    },
    "zh": {
        "videoPrompt": "若要通过社交媒体或直接联系人分享我们的网站，请访问我们的",
        "shareButton": "分享页面",
        "inDepthLink": "访问我们的深入页面",
        "orFindOutMore": "或访问我们的深入页面以了解更多信息",
        "registrationHelper": "如有关于注册或取消注册流程的任何疑问，请通过电子邮件将您的问题发送至"
    },
    "es": {
        "videoPrompt": "Para compartir nuestro sitio a través de redes sociales o contactos directos, visite nuestra",
        "shareButton": "página de compartir",
        "inDepthLink": "visitando nuestra página En profundidad",
        "orFindOutMore": "O descubra más visitando nuestra página En profundidad",
        "registrationHelper": "Para cualquier consulta relacionada con el proceso de registro o cancelación de registro, envíenos su consulta por correo electrónico a"
    },
    "pt": {
        "videoPrompt": "Para compartilhar nosso site via redes sociais ou contatos diretos, visite nossa",
        "shareButton": "página de compartilhamento",
        "inDepthLink": "visitando nossa página Detalhada",
        "orFindOutMore": "Ou saiba mais visitando nossa página Detalhada",
        "registrationHelper": "Para quaisquer dúvidas relacionadas ao processo de registro ou cancelamento, envie sua pergunta por e-mail para"
    },
    "no": {
        "videoPrompt": "For å dele nettstedet vårt via sosiale medier eller direkte kontakter, besøk vår",
        "shareButton": "delingsside",
        "inDepthLink": "ved å besøke vår In Depth-side",
        "orFindOutMore": "Eller finn ut mer ved å",
        "registrationHelper": "For spørsmål knyttet til registrerings- eller avregistreringsprosessen, vennligst send oss din forespørsel på e-post til"
    }
};

export function getTranslation(languageCode: string, key: string): string {
   
    const languageTranslations = microCopyTranslations[languageCode];
    if (languageTranslations && languageTranslations[key]) {
        return languageTranslations[key];
    }
    return microCopyTranslations["en"][key]; // Fallback to English
}