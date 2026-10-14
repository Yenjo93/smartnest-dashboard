import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { shared } from "../theme";
import "../ui/icon";

// Short, well-known verses; one a day, the same on every screen.
const VERSES: [string, string][] = [
  ["فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", "الشرح ٥"],
  ["وَقُل رَّبِّ زِدْنِي عِلْمًا", "طه ١١٤"],
  ["أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", "الرعد ٢٨"],
  ["وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ", "الطلاق ٣"],
  ["إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", "البقرة ١٥٣"],
  ["فَاذْكُرُونِي أَذْكُرْكُمْ", "البقرة ١٥٢"],
  ["وَاللَّهُ يُحِبُّ الْمُحْسِنِينَ", "آل عمران ١٣٤"],
  ["لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا", "البقرة ٢٨٦"],
  ["وَقُولُوا لِلنَّاسِ حُسْنًا", "البقرة ٨٣"],
  ["إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِّنَ الْمُحْسِنِينَ", "الأعراف ٥٦"],
  ["وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ", "الحديد ٤"],
  ["لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ", "إبراهيم ٧"],
  ["وَاصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ", "هود ١١٥"],
  ["رَبِّ اشْرَحْ لِي صَدْرِي", "طه ٢٥"],
  ["وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ", "هود ٨٨"],
  ["ادْعُونِي أَسْتَجِبْ لَكُمْ", "غافر ٦٠"],
  ["وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ", "الأعراف ١٥٦"],
  ["وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ", "يوسف ٨٧"],
  ["وَاللَّهُ خَيْرُ الرَّازِقِينَ", "الجمعة ١١"],
  ["رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", "البقرة ٢٠١"],
  ["وَبِالْوَالِدَيْنِ إِحْسَانًا", "الإسراء ٢٣"],
  ["إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ", "الرعد ١١"],
  ["وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ", "المائدة ٢"],
  ["وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ", "البقرة ١٨٦"],
  ["حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ", "آل عمران ١٧٣"],
  ["وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ", "البقرة ٢١٦"],
  ["إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ", "هود ١١٤"],
  ["وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ", "الضحى ٥"],
  ["وَأَحْسِن كَمَا أَحْسَنَ اللَّهُ إِلَيْكَ", "القصص ٧٧"],
  ["إِنَّ اللَّهَ لَطِيفٌ بِعِبَادِهِ", "الشورى ١٩"],
];

/** The Hijri date and a verse for the day, in calligraphy-sized type. */
@customElement("sn-w-verse")
export class SnVerse extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;

  static styles = [
    shared,
    css`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 18px;
        display: grid;
        grid-template-rows: auto 1fr auto;
        gap: 10px;
        text-align: center;
        overflow: hidden;
        position: relative;
      }
      .card::before {
        content: "";
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 65%);
        pointer-events: none;
      }
      .hijri {
        font-size: 15px;
        font-weight: 600;
        color: var(--accent-text);
      }
      .greg {
        font-size: 12px;
        color: var(--text-2);
      }
      .verse {
        align-self: center;
        direction: rtl;
        font-size: clamp(20px, 4cqi, 30px);
        line-height: 1.9;
        font-weight: 500;
      }
      .ref {
        font-size: 13px;
        color: var(--text-2);
        direction: rtl;
      }
      .card {
        container-type: inline-size;
      }
    `,
  ];

  render() {
    const { lang } = this.ctx;
    const now = new Date();
    const dayIndex = Math.floor((now.getTime() - now.getTimezoneOffset() * 60_000) / 86_400_000);
    const [verse, ref] = VERSES[dayIndex % VERSES.length];
    const hijri = now.toLocaleDateString(`${lang === "en" ? "en" : lang === "he" ? "he" : "ar-SA"}-u-ca-islamic-umalqura-nu-latn`, { day: "numeric", month: "long", year: "numeric" });
    const greg = now.toLocaleDateString(lang === "ar" ? "ar-u-nu-latn" : lang, { weekday: "long", day: "numeric", month: "long" });
    return html`<div class="card glass">
      <div><div class="hijri">${hijri}</div><div class="greg">${greg}</div></div>
      <div class="verse">﴿${verse}﴾</div>
      <div class="ref">${ref}</div>
    </div>`;
  }
}
