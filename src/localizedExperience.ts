import type { LocaleCode } from './i18n';

export type LocalizedExperienceCopy = {
  diagnostic: { eyebrow: string; title: string; body: string; question: string; yes: string; partial: string; no: string; result: string; complete: string };
  exposure: { eyebrow: string; title: string; body: string; capital: string; days: string; rate: string; result: string };
  states: { eyebrow: string; title: string; body: string; actions: [string, string, string, string] };
  roles: { eyebrow: string; title: string; body: string; labels: [string, string, string] };
  detail: { label: string; note: string };
};

const en: LocalizedExperienceCopy = {
  diagnostic: { eyebrow: 'A 60-second test', title: 'Is the next capital decision ready to be defended?', body: 'Test the decision basis before urgency turns missing context into exposure.', question: 'Question', yes: 'Yes', partial: 'Partly', no: 'No', result: 'Decision readiness', complete: 'Answer each question to reveal the current position.' },
  exposure: { eyebrow: 'Capital decision exposure', title: 'Make the cost of decision delay visible.', body: 'This indicative view isolates the carrying exposure while a capital decision remains unresolved.', capital: 'Capital affected', days: 'Days unresolved', rate: 'Annual carrying rate', result: 'Indicative carrying exposure' },
  states: { eyebrow: 'State has consequence', title: 'A decision state should change what can happen next.', body: 'Clear state language distinguishes readiness from the human authority to act.', actions: ['Release', 'Conditional release', 'Hold', 'Stop / review'] },
  roles: { eyebrow: 'Permissioned collaboration', title: 'One programme reality. Different responsibilities.', body: 'Shared context does not mean shared authority. Each participant sees the decision through the responsibility they hold.', labels: ['Capital owner', 'Execution owner', 'Assurance & audit'] },
  detail: { label: 'Review the full detail', note: 'Detailed product pages are currently available in English.' },
};

export const localizedExperienceCopy: Record<LocaleCode, LocalizedExperienceCopy> = {
  'en-gb': en,
  'en-us': en,
  es: {
    diagnostic: { eyebrow: 'Una prueba de 60 segundos', title: '¿Está la próxima decisión de capital lista para defenderse?', body: 'Ponga a prueba la base de la decisión antes de que la urgencia convierta el contexto ausente en exposición.', question: 'Pregunta', yes: 'Sí', partial: 'En parte', no: 'No', result: 'Preparación de la decisión', complete: 'Responda cada pregunta para revelar la posición actual.' },
    exposure: { eyebrow: 'Exposición de la decisión de capital', title: 'Haga visible el coste de retrasar una decisión.', body: 'Esta vista indicativa aísla la exposición financiera mientras la decisión sigue sin resolverse.', capital: 'Capital afectado', days: 'Días sin resolver', rate: 'Coste anual de financiación', result: 'Exposición financiera indicativa' },
    states: { eyebrow: 'El estado tiene consecuencias', title: 'El estado de una decisión debe cambiar lo que puede ocurrir después.', body: 'Un lenguaje claro separa la preparación de la autoridad humana para actuar.', actions: ['Liberar', 'Liberación condicionada', 'Mantener', 'Detener / revisar'] },
    roles: { eyebrow: 'Colaboración con permisos', title: 'Una misma realidad del programa. Responsabilidades distintas.', body: 'Compartir contexto no significa compartir autoridad. Cada participante ve la decisión desde su responsabilidad.', labels: ['Responsable del capital', 'Responsable de ejecución', 'Auditoría y aseguramiento'] },
    detail: { label: 'Ver el detalle completo', note: 'Las páginas detalladas del producto están disponibles por ahora en inglés.' },
  },
  de: {
    diagnostic: { eyebrow: 'Der 60-Sekunden-Test', title: 'Lässt sich die nächste Kapitalentscheidung belastbar vertreten?', body: 'Prüfen Sie die Entscheidungsbasis, bevor Zeitdruck fehlenden Kontext in Risiko verwandelt.', question: 'Frage', yes: 'Ja', partial: 'Teilweise', no: 'Nein', result: 'Entscheidungsreife', complete: 'Beantworten Sie jede Frage, um die aktuelle Position sichtbar zu machen.' },
    exposure: { eyebrow: 'Kapitalentscheidungsrisiko', title: 'Machen Sie die Kosten einer verzögerten Entscheidung sichtbar.', body: 'Diese indikative Sicht isoliert die Finanzierungsexposition, solange die Entscheidung offen bleibt.', capital: 'Betroffenes Kapital', days: 'Offene Tage', rate: 'Jährlicher Finanzierungssatz', result: 'Indikative Finanzierungsexposition' },
    states: { eyebrow: 'Status hat Konsequenzen', title: 'Ein Entscheidungsstatus muss den nächsten Schritt verändern.', body: 'Klare Statussprache trennt Entscheidungsreife von der menschlichen Befugnis zu handeln.', actions: ['Freigeben', 'Bedingt freigeben', 'Halten', 'Stoppen / prüfen'] },
    roles: { eyebrow: 'Berechtigte Zusammenarbeit', title: 'Eine Programmrealität. Unterschiedliche Verantwortung.', body: 'Gemeinsamer Kontext bedeutet nicht gemeinsame Befugnis. Jede Rolle sieht die Entscheidung durch ihre Verantwortung.', labels: ['Kapitalverantwortung', 'Umsetzungsverantwortung', 'Assurance & Audit'] },
    detail: { label: 'Vollständige Details ansehen', note: 'Detaillierte Produktseiten sind derzeit auf Englisch verfügbar.' },
  },
  it: {
    diagnostic: { eyebrow: 'Un test di 60 secondi', title: 'La prossima decisione sul capitale è pronta per essere difesa?', body: 'Verifica la base decisionale prima che l’urgenza trasformi il contesto mancante in esposizione.', question: 'Domanda', yes: 'Sì', partial: 'In parte', no: 'No', result: 'Prontezza decisionale', complete: 'Rispondi a ogni domanda per mostrare la posizione attuale.' },
    exposure: { eyebrow: 'Esposizione della decisione', title: 'Rendi visibile il costo del ritardo decisionale.', body: 'Questa vista indicativa isola l’esposizione finanziaria mentre la decisione resta aperta.', capital: 'Capitale interessato', days: 'Giorni irrisolti', rate: 'Tasso annuo di finanziamento', result: 'Esposizione finanziaria indicativa' },
    states: { eyebrow: 'Lo stato ha conseguenze', title: 'Lo stato di una decisione deve cambiare ciò che può accadere dopo.', body: 'Un linguaggio chiaro separa la prontezza dall’autorità umana ad agire.', actions: ['Rilascia', 'Rilascio condizionato', 'Sospendi', 'Ferma / verifica'] },
    roles: { eyebrow: 'Collaborazione autorizzata', title: 'Una realtà di programma. Responsabilità diverse.', body: 'Condividere il contesto non significa condividere l’autorità. Ogni partecipante vede la decisione dalla propria responsabilità.', labels: ['Responsabile del capitale', 'Responsabile dell’esecuzione', 'Assurance e audit'] },
    detail: { label: 'Esplora tutti i dettagli', note: 'Le pagine di dettaglio del prodotto sono attualmente disponibili in inglese.' },
  },
  pt: {
    diagnostic: { eyebrow: 'Um teste de 60 segundos', title: 'A próxima decisão de capital está pronta para ser defendida?', body: 'Teste a base da decisão antes que a urgência transforme contexto em falta em exposição.', question: 'Pergunta', yes: 'Sim', partial: 'Em parte', no: 'Não', result: 'Prontidão da decisão', complete: 'Responda a cada pergunta para revelar a posição atual.' },
    exposure: { eyebrow: 'Exposição da decisão de capital', title: 'Torne visível o custo de adiar uma decisão.', body: 'Esta vista indicativa isola a exposição financeira enquanto a decisão permanece por resolver.', capital: 'Capital afetado', days: 'Dias por resolver', rate: 'Taxa anual de financiamento', result: 'Exposição financeira indicativa' },
    states: { eyebrow: 'O estado tem consequências', title: 'O estado de uma decisão deve alterar o que pode acontecer a seguir.', body: 'Uma linguagem clara distingue a prontidão da autoridade humana para agir.', actions: ['Libertar', 'Libertação condicionada', 'Reter', 'Parar / rever'] },
    roles: { eyebrow: 'Colaboração com permissões', title: 'Uma realidade do programa. Responsabilidades diferentes.', body: 'Contexto partilhado não significa autoridade partilhada. Cada participante vê a decisão pela sua responsabilidade.', labels: ['Responsável pelo capital', 'Responsável pela execução', 'Garantia e auditoria'] },
    detail: { label: 'Ver o detalhe completo', note: 'As páginas detalhadas do produto estão atualmente disponíveis em inglês.' },
  },
  fr: {
    diagnostic: { eyebrow: 'Un test de 60 secondes', title: 'La prochaine décision de capital est-elle prête à être défendue ?', body: 'Testez le fondement de la décision avant que l’urgence ne transforme le contexte manquant en exposition.', question: 'Question', yes: 'Oui', partial: 'En partie', no: 'Non', result: 'Préparation de la décision', complete: 'Répondez à chaque question pour révéler la position actuelle.' },
    exposure: { eyebrow: 'Exposition de la décision', title: 'Rendez visible le coût d’une décision retardée.', body: 'Cette vue indicative isole l’exposition financière tant que la décision reste ouverte.', capital: 'Capital concerné', days: 'Jours non résolus', rate: 'Taux annuel de financement', result: 'Exposition financière indicative' },
    states: { eyebrow: 'L’état a des conséquences', title: 'L’état d’une décision doit changer ce qui peut suivre.', body: 'Un langage clair distingue la préparation de l’autorité humaine à agir.', actions: ['Débloquer', 'Déblocage conditionnel', 'Maintenir', 'Arrêter / réviser'] },
    roles: { eyebrow: 'Collaboration sous autorisation', title: 'Une réalité de programme. Des responsabilités distinctes.', body: 'Un contexte partagé ne signifie pas une autorité partagée. Chaque participant voit la décision selon sa responsabilité.', labels: ['Responsable du capital', 'Responsable de l’exécution', 'Assurance et audit'] },
    detail: { label: 'Voir le détail complet', note: 'Les pages produit détaillées sont actuellement disponibles en anglais.' },
  },
  cs: {
    diagnostic: { eyebrow: 'Test na 60 sekund', title: 'Lze další kapitálové rozhodnutí obhájit?', body: 'Prověřte podklady dříve, než naléhavost promění chybějící kontext v riziko.', question: 'Otázka', yes: 'Ano', partial: 'Částečně', no: 'Ne', result: 'Připravenost rozhodnutí', complete: 'Odpovězte na každou otázku a odhalte současnou pozici.' },
    exposure: { eyebrow: 'Expozice kapitálového rozhodnutí', title: 'Zviditelněte náklady odkládaného rozhodnutí.', body: 'Tento orientační pohled odděluje finanční expozici po dobu, kdy rozhodnutí zůstává otevřené.', capital: 'Dotčený kapitál', days: 'Dny bez rozhodnutí', rate: 'Roční sazba financování', result: 'Orientační finanční expozice' },
    states: { eyebrow: 'Stav má důsledky', title: 'Stav rozhodnutí musí změnit to, co může následovat.', body: 'Jasné názvy stavů oddělují připravenost od lidské pravomoci jednat.', actions: ['Uvolnit', 'Podmíněně uvolnit', 'Pozastavit', 'Zastavit / prověřit'] },
    roles: { eyebrow: 'Spolupráce podle oprávnění', title: 'Jedna realita programu. Různé odpovědnosti.', body: 'Sdílený kontext neznamená sdílenou pravomoc. Každý účastník vidí rozhodnutí svou odpovědností.', labels: ['Vlastník kapitálu', 'Vlastník realizace', 'Ověření a audit'] },
    detail: { label: 'Prohlédnout úplný detail', note: 'Podrobné produktové stránky jsou zatím dostupné v angličtině.' },
  },
  hu: {
    diagnostic: { eyebrow: '60 másodperces teszt', title: 'Védhető a következő tőkedöntés?', body: 'Tesztelje a döntési alapot, mielőtt a sürgősség kitettséggé változtatja a hiányzó kontextust.', question: 'Kérdés', yes: 'Igen', partial: 'Részben', no: 'Nem', result: 'Döntési készültség', complete: 'Válaszoljon minden kérdésre az aktuális helyzet feltárásához.' },
    exposure: { eyebrow: 'Tőkedöntési kitettség', title: 'Tegye láthatóvá a döntési késedelem költségét.', body: 'Ez a jelzésértékű nézet elkülöníti a finanszírozási kitettséget, amíg a döntés nyitott.', capital: 'Érintett tőke', days: 'Nyitott napok', rate: 'Éves finanszírozási ráta', result: 'Jelzésértékű finanszírozási kitettség' },
    states: { eyebrow: 'Az állapotnak következménye van', title: 'A döntési állapotnak meg kell változtatnia a következő lépést.', body: 'Az egyértelmű állapotnyelv elválasztja a készültséget az emberi cselekvési jogosultságtól.', actions: ['Felszabadítás', 'Feltételes felszabadítás', 'Visszatartás', 'Leállítás / felülvizsgálat'] },
    roles: { eyebrow: 'Jogosultság alapú együttműködés', title: 'Egy programvalóság. Eltérő felelősségek.', body: 'A közös kontextus nem közös jogosultság. Minden résztvevő a saját felelősségén keresztül látja a döntést.', labels: ['Tőketulajdonos', 'Végrehajtási felelős', 'Biztosítás és audit'] },
    detail: { label: 'Teljes részletek megtekintése', note: 'A részletes termékoldalak jelenleg angolul érhetők el.' },
  },
  sr: {
    diagnostic: { eyebrow: 'Test od 60 sekundi', title: 'Da li je sledeća kapitalna odluka spremna za odbranu?', body: 'Proverite osnov odluke pre nego što hitnost pretvori nedostajući kontekst u izloženost.', question: 'Pitanje', yes: 'Da', partial: 'Delimično', no: 'Ne', result: 'Spremnost odluke', complete: 'Odgovorite na svako pitanje da biste videli trenutnu poziciju.' },
    exposure: { eyebrow: 'Izloženost kapitalne odluke', title: 'Učinite cenu odlaganja odluke vidljivom.', body: 'Ovaj ilustrativni prikaz izdvaja finansijsku izloženost dok odluka ostaje nerešena.', capital: 'Kapital u obimu', days: 'Dani bez odluke', rate: 'Godišnja stopa finansiranja', result: 'Ilustrativna finansijska izloženost' },
    states: { eyebrow: 'Stanje ima posledicu', title: 'Stanje odluke mora promeniti ono što može da sledi.', body: 'Jasan jezik stanja odvaja spremnost od ljudskog ovlašćenja za delovanje.', actions: ['Oslobodi', 'Uslovno oslobodi', 'Zadrži', 'Zaustavi / pregledaj'] },
    roles: { eyebrow: 'Saradnja prema ovlašćenju', title: 'Jedna realnost programa. Različite odgovornosti.', body: 'Zajednički kontekst ne znači zajedničko ovlašćenje. Svaki učesnik vidi odluku kroz svoju odgovornost.', labels: ['Vlasnik kapitala', 'Vlasnik izvršenja', 'Kontrola i revizija'] },
    detail: { label: 'Pogledajte potpune detalje', note: 'Detaljne stranice proizvoda su trenutno dostupne na engleskom.' },
  },
  ar: {
    diagnostic: { eyebrow: 'اختبار في 60 ثانية', title: 'هل يمكن الدفاع عن قرار رأس المال التالي؟', body: 'اختبر أساس القرار قبل أن يحوّل الاستعجال السياق الناقص إلى تعرض.', question: 'سؤال', yes: 'نعم', partial: 'جزئياً', no: 'لا', result: 'جاهزية القرار', complete: 'أجب عن كل سؤال لإظهار الوضع الحالي.' },
    exposure: { eyebrow: 'التعرض لقرار رأس المال', title: 'اجعل تكلفة تأخير القرار مرئية.', body: 'يعزل هذا العرض التوضيحي التعرض التمويلي ما دام القرار دون حسم.', capital: 'رأس المال المعني', days: 'أيام دون حسم', rate: 'معدل التمويل السنوي', result: 'التعرض التمويلي التوضيحي' },
    states: { eyebrow: 'للحالة نتيجة', title: 'يجب أن تغيّر حالة القرار ما يمكن أن يحدث تالياً.', body: 'تفصل لغة الحالة الواضحة بين الجاهزية وصلاحية الإنسان للتصرف.', actions: ['إفراج', 'إفراج مشروط', 'تعليق', 'إيقاف / مراجعة'] },
    roles: { eyebrow: 'تعاون قائم على الصلاحيات', title: 'واقع واحد للبرنامج. مسؤوليات مختلفة.', body: 'السياق المشترك لا يعني صلاحية مشتركة. يرى كل مشارك القرار من خلال مسؤوليته.', labels: ['مسؤول رأس المال', 'مسؤول التنفيذ', 'الضمان والتدقيق'] },
    detail: { label: 'راجع التفاصيل الكاملة', note: 'صفحات المنتج التفصيلية متاحة حالياً باللغة الإنجليزية.' },
  },
};
