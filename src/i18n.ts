export const localeCodes = ['en-gb', 'en-us', 'es', 'de', 'it', 'pt', 'fr', 'cs', 'hu', 'sr', 'ar'] as const;

export type LocaleCode = (typeof localeCodes)[number];

type Principle = { title: string; body: string };
type Package = { name: string; scope: string; body: string };

export type LocaleContent = {
  code: LocaleCode;
  hreflang: string;
  htmlLang: string;
  dir: 'ltr' | 'rtl';
  label: string;
  nav: {
    why: string; system: string; exposure: string; trust: string; deployment: string;
    frame: string; menu: string; navigation: string; close: string; skip: string;
  };
  page: {
    eyebrow: string; title: string; intro: string; primary: string; secondary: string;
    whyEyebrow: string; whyTitle: string; whyBody: string; principles: Principle[];
    systemEyebrow: string; systemTitle: string; systemBody: string; sequence: string[];
    deploymentEyebrow: string; deploymentTitle: string; deploymentBody: string; packages: Package[];
    boundaryEyebrow: string; boundaryTitle: string; boundaryBody: string;
    ctaEyebrow: string; ctaTitle: string; ctaBody: string; cta: string;
  };
  footer: {
    explore: string; company: string; home: string; founder: string; email: string; contact: string;
    kicker: string; title: string; body: string; operatingCompany: string;
    nonCustodial: string; boundary: string; rights: string; englishNotice: string;
  };
};

const sharedPackages = (pilot: string, core: string, enterprise: string): Package[] => [
  { name: 'AX1.Pilot', scope: '01', body: pilot },
  { name: 'AX1.Core', scope: '02', body: core },
  { name: 'AX1.Enterprise', scope: '03', body: enterprise },
];

export const localeContent: Record<LocaleCode, LocaleContent> = {
  'en-gb': {
    code: 'en-gb', hreflang: 'en-GB', htmlLang: 'en-GB', dir: 'ltr', label: 'English (UK)',
    nav: { why: 'Why Axis One', system: 'System', exposure: 'Decision exposure', trust: 'Trust', deployment: 'Deployment', frame: 'Frame a decision', menu: 'Menu', navigation: 'Navigation', close: 'Close navigation menu', skip: 'Skip to main content' },
    page: {
      eyebrow: 'Capital governance infrastructure', title: 'Capital moves when execution is proven.', intro: 'Axis One connects committed capital to current milestones, attributable evidence and explicit authority, so the next action can be defended in real time.', primary: 'Frame a decision', secondary: 'See how it works',
      whyEyebrow: 'Why Axis One', whyTitle: 'The next decision can arrive before its proof is current.', whyBody: 'Approval, delivery, evidence and capital action often sit in separate environments. Axis One keeps the decision context connected before pressure arrives.',
      principles: [
        { title: 'Current state', body: 'See what changed since capital was approved.' },
        { title: 'Attributable evidence', body: 'Connect claims to current, reviewable proof.' },
        { title: 'Explicit authority', body: 'Keep human responsibility and permission visible.' },
        { title: 'Decision record', body: 'Preserve the basis for every hold, release or escalation.' },
      ],
      systemEyebrow: 'A connected decision system', systemTitle: 'One governed context from commitment to release.', systemBody: 'Axis One keeps execution, proof, ownership and authority connected to the capital decision they support.', sequence: ['Milestone', 'Evidence', 'Validation', 'Authority', 'Decision'],
      deploymentEyebrow: 'Deployment', deploymentTitle: 'Start narrow. Prove value. Expand.', deploymentBody: 'Choose the smallest operating scope that can produce a credible result before scaling.', packages: sharedPackages('Frame one approaching capital decision with a bounded stakeholder group.', 'Operate one programme with connected milestones, evidence and authority.', 'Extend a proven governance pattern across multiple programmes.'),
      boundaryEyebrow: 'Trust through boundaries', boundaryTitle: 'Institutional claims should come with visible boundaries.', boundaryBody: 'Custody and transfer remain with authorised external financial providers. Axis One preserves readiness, responsibility and the decision record.',
      ctaEyebrow: 'Decision Brief', ctaTitle: 'Bring the next capital decision—not a requirements list.', ctaBody: 'Share enough context for a useful first conversation. Nothing is submitted until you choose to open your email.', cta: 'Start an inquiry',
    },
    footer: { explore: 'Explore', company: 'Company', home: 'Home', founder: 'Founder', email: 'Email Axis One', contact: 'Contact Axis One', kicker: 'Capital governance infrastructure', title: 'Capital, governed by execution.', body: 'Axis One connects committed capital to verified milestones, attributable evidence and controlled decision states.', operatingCompany: 'Operating company', nonCustodial: 'Non-custodial by design', boundary: 'Axis One does not hold, transfer, manage or guarantee client capital. Authorised external financial providers execute any transfer.', rights: 'All rights reserved.', englishNotice: 'Legal documents are provided in English.' },
  },
  'en-us': {
    code: 'en-us', hreflang: 'en-US', htmlLang: 'en-US', dir: 'ltr', label: 'English (US)',
    nav: { why: 'Why Axis One', system: 'System', exposure: 'Decision exposure', trust: 'Trust', deployment: 'Deployment', frame: 'Frame a decision', menu: 'Menu', navigation: 'Navigation', close: 'Close navigation menu', skip: 'Skip to main content' },
    page: {
      eyebrow: 'Capital governance infrastructure', title: 'Capital moves when execution is proven.', intro: 'Axis One connects committed capital to current milestones, attributable evidence, and explicit authority, so the next action can be defended in real time.', primary: 'Frame a decision', secondary: 'See how it works',
      whyEyebrow: 'Why Axis One', whyTitle: 'The next decision can arrive before its proof is current.', whyBody: 'Approval, delivery, evidence, and capital action often sit in separate environments. Axis One keeps the decision context connected before pressure arrives.', principles: [
        { title: 'Current state', body: 'See what changed since capital was approved.' }, { title: 'Attributable evidence', body: 'Connect claims to current, reviewable proof.' }, { title: 'Explicit authority', body: 'Keep human responsibility and permission visible.' }, { title: 'Decision record', body: 'Preserve the basis for every hold, release, or escalation.' },
      ],
      systemEyebrow: 'A connected decision system', systemTitle: 'One governed context from commitment to release.', systemBody: 'Axis One keeps execution, proof, ownership, and authority connected to the capital decision they support.', sequence: ['Milestone', 'Evidence', 'Validation', 'Authority', 'Decision'],
      deploymentEyebrow: 'Deployment', deploymentTitle: 'Start narrow. Prove value. Expand.', deploymentBody: 'Choose the smallest operating scope that can produce a credible result before scaling.', packages: sharedPackages('Frame one approaching capital decision with a bounded stakeholder group.', 'Operate one program with connected milestones, evidence, and authority.', 'Extend a proven governance pattern across multiple programs.'),
      boundaryEyebrow: 'Trust through boundaries', boundaryTitle: 'Institutional claims should come with visible boundaries.', boundaryBody: 'Custody and transfer remain with authorized external financial providers. Axis One preserves readiness, responsibility, and the decision record.',
      ctaEyebrow: 'Decision Brief', ctaTitle: 'Bring the next capital decision—not a requirements list.', ctaBody: 'Share enough context for a useful first conversation. Nothing is submitted until you choose to open your email.', cta: 'Start an inquiry',
    },
    footer: { explore: 'Explore', company: 'Company', home: 'Home', founder: 'Founder', email: 'Email Axis One', contact: 'Contact Axis One', kicker: 'Capital governance infrastructure', title: 'Capital, governed by execution.', body: 'Axis One connects committed capital to verified milestones, attributable evidence, and controlled decision states.', operatingCompany: 'Operating company', nonCustodial: 'Non-custodial by design', boundary: 'Axis One does not hold, transfer, manage, or guarantee client capital. Authorized external financial providers execute any transfer.', rights: 'All rights reserved.', englishNotice: 'Legal documents are provided in English.' },
  },
  es: {
    code: 'es', hreflang: 'es', htmlLang: 'es', dir: 'ltr', label: 'Español',
    nav: { why: 'Por qué Axis One', system: 'Sistema', exposure: 'Exposición de la decisión', trust: 'Confianza', deployment: 'Implementación', frame: 'Definir una decisión', menu: 'Menú', navigation: 'Navegación', close: 'Cerrar el menú de navegación', skip: 'Ir al contenido principal' },
    page: {
      eyebrow: 'Infraestructura para decisiones de capital', title: 'El capital avanza cuando la ejecución está demostrada.', intro: 'Axis One conecta el capital comprometido con hitos actuales, evidencia atribuible y autoridad explícita para que la siguiente acción pueda defenderse en tiempo real.', primary: 'Definir una decisión', secondary: 'Ver cómo funciona',
      whyEyebrow: 'Por qué Axis One', whyTitle: 'La próxima decisión puede llegar antes de que la evidencia esté al día.', whyBody: 'Aprobación, ejecución, evidencia y movimiento de capital suelen vivir en entornos separados. Axis One mantiene unido el contexto antes de que llegue la presión.', principles: [ { title: 'Estado actual', body: 'Vea qué cambió desde que se aprobó el capital.' }, { title: 'Evidencia atribuible', body: 'Conecte cada afirmación con pruebas actuales y revisables.' }, { title: 'Autoridad explícita', body: 'Mantenga visibles la responsabilidad humana y el permiso.' }, { title: 'Registro de decisión', body: 'Conserve la base de cada pausa, liberación o escalada.' } ],
      systemEyebrow: 'Un sistema de decisión conectado', systemTitle: 'Un único contexto gobernado, del compromiso a la liberación.', systemBody: 'Axis One mantiene la ejecución, la evidencia, la responsabilidad y la autoridad conectadas con la decisión de capital que sustentan.', sequence: ['Hito', 'Evidencia', 'Validación', 'Autoridad', 'Decisión'],
      deploymentEyebrow: 'Implementación', deploymentTitle: 'Empiece con un alcance acotado. Demuestre valor. Después, amplíe.', deploymentBody: 'Elija el menor alcance operativo que pueda producir un resultado creíble antes de escalar.', packages: sharedPackages('Defina una decisión de capital próxima con un grupo acotado de participantes.', 'Gestione un programa con hitos, evidencia y autoridad conectados.', 'Extienda un patrón de gobernanza probado a varios programas.'),
      boundaryEyebrow: 'Confianza mediante límites', boundaryTitle: 'Las afirmaciones institucionales necesitan límites visibles.', boundaryBody: 'La custodia y la transferencia permanecen en proveedores financieros externos autorizados. Axis One conserva la preparación, la responsabilidad y el registro.',
      ctaEyebrow: 'Resumen de decisión', ctaTitle: 'Traiga la próxima decisión de capital, no una lista de requisitos.', ctaBody: 'Comparta el contexto suficiente para una primera conversación útil. Nada se envía hasta que usted decida abrir su correo.', cta: 'Iniciar una consulta',
    },
    footer: { explore: 'Explorar', company: 'Empresa', home: 'Inicio', founder: 'Fundadora', email: 'Enviar un correo a Axis One', contact: 'Contactar con Axis One', kicker: 'Infraestructura de gobernanza del capital', title: 'Capital, gobernado por la ejecución.', body: 'Axis One conecta capital comprometido, hitos verificados, evidencia atribuible y decisiones controladas.', operatingCompany: 'Empresa operadora', nonCustodial: 'Sin custodia por diseño', boundary: 'Axis One no posee, transfiere, gestiona ni garantiza el capital del cliente. Los proveedores financieros externos autorizados ejecutan las transferencias.', rights: 'Todos los derechos reservados.', englishNotice: 'Los documentos legales se proporcionan en inglés.' },
  },
  de: {
    code: 'de', hreflang: 'de', htmlLang: 'de', dir: 'ltr', label: 'Deutsch',
    nav: { why: 'Warum Axis One', system: 'System', exposure: 'Entscheidungsrisiko', trust: 'Vertrauen', deployment: 'Einführung', frame: 'Entscheidung definieren', menu: 'Menü', navigation: 'Navigation', close: 'Navigationsmenü schließen', skip: 'Zum Hauptinhalt springen' },
    page: {
      eyebrow: 'Infrastruktur für belastbare Kapitalentscheidungen', title: 'Kapital bewegt sich, wenn Umsetzung nachweisbar ist.', intro: 'Axis One verbindet gebundenes Kapital mit aktuellen Meilensteinen, zurechenbaren Nachweisen und klarer Befugnis – damit der nächste Schritt in Echtzeit belastbar ist.', primary: 'Entscheidung definieren', secondary: 'Funktionsweise ansehen',
      whyEyebrow: 'Warum Axis One', whyTitle: 'Die nächste Entscheidung kann anstehen, bevor ihre Nachweise aktuell sind.', whyBody: 'Freigabe, Umsetzung, Nachweise und Kapitalbewegung liegen oft in getrennten Umgebungen. Axis One hält den Entscheidungskontext zusammen, bevor Zeitdruck entsteht.', principles: [ { title: 'Aktueller Stand', body: 'Erkennen Sie, was sich seit der Kapitalfreigabe geändert hat.' }, { title: 'Zurechenbare Nachweise', body: 'Verbinden Sie Aussagen mit aktuellen, prüfbaren Belegen.' }, { title: 'Klare Befugnis', body: 'Menschliche Verantwortung und Erlaubnis bleiben sichtbar.' }, { title: 'Entscheidungsprotokoll', body: 'Bewahren Sie die Grundlage jeder Freigabe, Pause oder Eskalation.' } ],
      systemEyebrow: 'Ein verbundenes Entscheidungssystem', systemTitle: 'Ein gesteuerter Kontext – von der Zusage bis zur Freigabe.', systemBody: 'Axis One hält Umsetzung, Nachweise, Verantwortung und Befugnis mit der Kapitalentscheidung verbunden, die sie tragen.', sequence: ['Meilenstein', 'Nachweis', 'Validierung', 'Befugnis', 'Entscheidung'],
      deploymentEyebrow: 'Einführung', deploymentTitle: 'Klein beginnen. Wirkung belegen. Dann skalieren.', deploymentBody: 'Wählen Sie zuerst den kleinsten operativen Umfang, der ein glaubwürdiges Ergebnis liefern kann.', packages: sharedPackages('Eine bevorstehende Kapitalentscheidung mit einer klar begrenzten Gruppe definieren.', 'Ein Programm mit verbundenen Meilensteinen, Nachweisen und Befugnissen steuern.', 'Ein bewährtes Governance-Muster auf mehrere Programme ausweiten.'),
      boundaryEyebrow: 'Vertrauen durch klare Grenzen', boundaryTitle: 'Institutionelle Aussagen brauchen sichtbare Grenzen.', boundaryBody: 'Verwahrung und Transfer verbleiben bei autorisierten externen Finanzdienstleistern. Axis One sichert Entscheidungsreife, Verantwortung und Protokoll.',
      ctaEyebrow: 'Entscheidungsbrief', ctaTitle: 'Bringen Sie die nächste Kapitalentscheidung mit – keine Anforderungsliste.', ctaBody: 'Teilen Sie genügend Kontext für ein sinnvolles Erstgespräch. Nichts wird gesendet, bevor Sie Ihr E-Mail-Programm öffnen.', cta: 'Anfrage starten',
    },
    footer: { explore: 'Entdecken', company: 'Unternehmen', home: 'Startseite', founder: 'Gründerin', email: 'Axis One per E-Mail kontaktieren', contact: 'Axis One kontaktieren', kicker: 'Infrastruktur für Kapital-Governance', title: 'Kapital, gesteuert durch Ausführung.', body: 'Axis One verbindet zugesagtes Kapital, verifizierte Meilensteine, zurechenbare Nachweise und kontrollierte Entscheidungen.', operatingCompany: 'Betreibergesellschaft', nonCustodial: 'Bewusst ohne Verwahrung', boundary: 'Axis One hält, überträgt, verwaltet oder garantiert kein Kundenkapital. Autorisierte externe Finanzdienstleister führen Transfers aus.', rights: 'Alle Rechte vorbehalten.', englishNotice: 'Rechtliche Dokumente werden auf Englisch bereitgestellt.' },
  },
  it: {
    code: 'it', hreflang: 'it', htmlLang: 'it', dir: 'ltr', label: 'Italiano',
    nav: { why: 'Perché Axis One', system: 'Sistema', exposure: 'Esposizione decisionale', trust: 'Fiducia', deployment: 'Implementazione', frame: 'Definisci una decisione', menu: 'Menu', navigation: 'Navigazione', close: 'Chiudi il menu di navigazione', skip: 'Vai al contenuto principale' },
    page: {
      eyebrow: 'Infrastruttura per decisioni sul capitale', title: 'Il capitale avanza quando l’esecuzione è dimostrata.', intro: 'Axis One collega il capitale impegnato a traguardi attuali, prove attribuibili e autorità esplicita, così la prossima azione è difendibile in tempo reale.', primary: 'Definisci una decisione', secondary: 'Scopri il funzionamento',
      whyEyebrow: 'Perché Axis One', whyTitle: 'La prossima decisione può arrivare prima che le prove siano aggiornate.', whyBody: 'Approvazione, esecuzione, prove e movimento del capitale vivono spesso in ambienti separati. Axis One mantiene unito il contesto prima che arrivi la pressione.', principles: [ { title: 'Stato attuale', body: 'Vedi cosa è cambiato dopo l’approvazione del capitale.' }, { title: 'Prove attribuibili', body: 'Collega ogni affermazione a prove attuali e verificabili.' }, { title: 'Autorità esplicita', body: 'Mantieni visibili responsabilità umana e permesso.' }, { title: 'Registro decisionale', body: 'Conserva la base di ogni sospensione, rilascio o escalation.' } ],
      systemEyebrow: 'Un sistema decisionale connesso', systemTitle: 'Un unico contesto governato, dall’impegno al rilascio.', systemBody: 'Axis One mantiene esecuzione, prove, responsabilità e autorità collegate alla decisione sul capitale che sostengono.', sequence: ['Traguardo', 'Prova', 'Validazione', 'Autorità', 'Decisione'],
      deploymentEyebrow: 'Implementazione', deploymentTitle: 'Parti da un perimetro preciso. Dimostra il valore. Poi scala.', deploymentBody: 'Scegli prima l’ambito operativo minimo capace di produrre un risultato credibile.', packages: sharedPackages('Definisci una decisione imminente con un gruppo circoscritto di stakeholder.', 'Gestisci un programma con traguardi, prove e autorità collegati.', 'Estendi un modello di governance comprovato a più programmi.'),
      boundaryEyebrow: 'Fiducia attraverso confini chiari', boundaryTitle: 'Le dichiarazioni istituzionali richiedono confini visibili.', boundaryBody: 'Custodia e trasferimento restano presso fornitori finanziari esterni autorizzati. Axis One conserva prontezza, responsabilità e registro.',
      ctaEyebrow: 'Decision Brief', ctaTitle: 'Porta la prossima decisione sul capitale, non un elenco di requisiti.', ctaBody: 'Condividi il contesto necessario per un primo confronto utile. Nulla viene inviato finché non scegli di aprire la tua email.', cta: 'Avvia una richiesta',
    },
    footer: { explore: 'Esplora', company: 'Società', home: 'Home', founder: 'Fondatrice', email: 'Scrivi ad Axis One', contact: 'Contatta Axis One', kicker: 'Infrastruttura di governance del capitale', title: 'Capitale, governato dall’esecuzione.', body: 'Axis One collega capitale impegnato, traguardi verificati, prove attribuibili e decisioni controllate.', operatingCompany: 'Società operativa', nonCustodial: 'Non-custodial per progettazione', boundary: 'Axis One non detiene, trasferisce, gestisce né garantisce il capitale del cliente. I fornitori finanziari esterni autorizzati eseguono i trasferimenti.', rights: 'Tutti i diritti riservati.', englishNotice: 'I documenti legali sono disponibili in inglese.' },
  },
  pt: {
    code: 'pt', hreflang: 'pt', htmlLang: 'pt-PT', dir: 'ltr', label: 'Português',
    nav: { why: 'Porquê a Axis One', system: 'Sistema', exposure: 'Exposição da decisão', trust: 'Confiança', deployment: 'Implementação', frame: 'Definir uma decisão', menu: 'Menu', navigation: 'Navegação', close: 'Fechar o menu de navegação', skip: 'Ir para o conteúdo principal' },
    page: {
      eyebrow: 'Infraestrutura para decisões de capital', title: 'O capital avança quando a execução está comprovada.', intro: 'A Axis One liga capital comprometido a marcos atuais, evidência atribuível e autoridade explícita, para que o próximo passo seja defensável em tempo real.', primary: 'Definir uma decisão', secondary: 'Ver como funciona',
      whyEyebrow: 'Porquê a Axis One', whyTitle: 'A próxima decisão pode chegar antes de a evidência estar atualizada.', whyBody: 'Aprovação, execução, evidência e movimento de capital vivem muitas vezes em ambientes separados. A Axis One mantém o contexto unido antes de surgir a pressão.', principles: [ { title: 'Estado atual', body: 'Veja o que mudou desde a aprovação do capital.' }, { title: 'Evidência atribuível', body: 'Ligue afirmações a provas atuais e auditáveis.' }, { title: 'Autoridade explícita', body: 'Mantenha visíveis a responsabilidade humana e a permissão.' }, { title: 'Registo da decisão', body: 'Preserve a base de cada pausa, libertação ou escalada.' } ],
      systemEyebrow: 'Um sistema de decisão conectado', systemTitle: 'Um único contexto governado, do compromisso à libertação.', systemBody: 'A Axis One mantém execução, evidência, responsabilidade e autoridade ligadas à decisão de capital que sustentam.', sequence: ['Marco', 'Evidência', 'Validação', 'Autoridade', 'Decisão'],
      deploymentEyebrow: 'Implementação', deploymentTitle: 'Comece com um âmbito claro. Comprove valor. Depois, escale.', deploymentBody: 'Escolha primeiro o menor âmbito operacional capaz de gerar um resultado credível.', packages: sharedPackages('Defina uma decisão de capital próxima com um grupo delimitado de intervenientes.', 'Opere um programa com marcos, evidência e autoridade conectados.', 'Estenda um padrão de governação comprovado a vários programas.'),
      boundaryEyebrow: 'Confiança através de limites', boundaryTitle: 'As afirmações institucionais exigem limites visíveis.', boundaryBody: 'A custódia e a transferência permanecem com prestadores financeiros externos autorizados. A Axis One preserva prontidão, responsabilidade e registo.',
      ctaEyebrow: 'Resumo de decisão', ctaTitle: 'Traga a próxima decisão de capital, não uma lista de requisitos.', ctaBody: 'Partilhe contexto suficiente para uma primeira conversa útil. Nada é enviado até decidir abrir o seu email.', cta: 'Iniciar um pedido',
    },
    footer: { explore: 'Explorar', company: 'Empresa', home: 'Início', founder: 'Fundadora', email: 'Enviar email à Axis One', contact: 'Contactar a Axis One', kicker: 'Infraestrutura de governação de capital', title: 'Capital, governado pela execução.', body: 'A Axis One liga capital comprometido, marcos verificados, evidência atribuível e decisões controladas.', operatingCompany: 'Empresa operadora', nonCustodial: 'Sem custódia por conceção', boundary: 'A Axis One não detém, transfere, gere ou garante capital do cliente. Prestadores financeiros externos autorizados executam qualquer transferência.', rights: 'Todos os direitos reservados.', englishNotice: 'Os documentos jurídicos são disponibilizados em inglês.' },
  },
  fr: {
    code: 'fr', hreflang: 'fr', htmlLang: 'fr', dir: 'ltr', label: 'Français',
    nav: { why: 'Pourquoi Axis One', system: 'Système', exposure: 'Exposition décisionnelle', trust: 'Confiance', deployment: 'Déploiement', frame: 'Cadrer une décision', menu: 'Menu', navigation: 'Navigation', close: 'Fermer le menu de navigation', skip: 'Aller au contenu principal' },
    page: {
      eyebrow: 'Infrastructure pour les décisions de capital', title: 'Le capital avance lorsque l’exécution est démontrée.', intro: 'Axis One relie le capital engagé à des jalons actuels, des preuves attribuables et une autorité explicite, afin que la prochaine action soit défendable en temps réel.', primary: 'Cadrer une décision', secondary: 'Voir le fonctionnement',
      whyEyebrow: 'Pourquoi Axis One', whyTitle: 'La prochaine décision peut arriver avant que ses preuves soient à jour.', whyBody: 'Approbation, exécution, preuves et mouvement de capital vivent souvent dans des environnements séparés. Axis One maintient le contexte uni avant que la pression n’arrive.', principles: [ { title: 'État actuel', body: 'Voyez ce qui a changé depuis l’approbation du capital.' }, { title: 'Preuves attribuables', body: 'Reliez chaque affirmation à des preuves actuelles et vérifiables.' }, { title: 'Autorité explicite', body: 'Gardez visibles la responsabilité humaine et l’autorisation.' }, { title: 'Registre de décision', body: 'Préservez le fondement de chaque attente, libération ou escalade.' } ],
      systemEyebrow: 'Un système de décision connecté', systemTitle: 'Un seul contexte gouverné, de l’engagement au déblocage.', systemBody: 'Axis One maintient l’exécution, les preuves, la responsabilité et l’autorité reliées à la décision de capital qu’elles soutiennent.', sequence: ['Jalon', 'Preuve', 'Validation', 'Autorité', 'Décision'],
      deploymentEyebrow: 'Déploiement', deploymentTitle: 'Commencez par un périmètre ciblé. Prouvez la valeur. Puis déployez.', deploymentBody: 'Choisissez d’abord le plus petit périmètre opérationnel capable de produire un résultat crédible.', packages: sharedPackages('Cadrez une décision de capital à venir avec un groupe limité de parties prenantes.', 'Pilotez un programme avec des jalons, preuves et autorités connectés.', 'Étendez un modèle de gouvernance éprouvé à plusieurs programmes.'),
      boundaryEyebrow: 'La confiance par des limites claires', boundaryTitle: 'Les affirmations institutionnelles doivent avoir des limites visibles.', boundaryBody: 'La conservation et le transfert restent chez des prestataires financiers externes autorisés. Axis One préserve la préparation, la responsabilité et le registre.',
      ctaEyebrow: 'Decision Brief', ctaTitle: 'Apportez la prochaine décision de capital, pas une liste d’exigences.', ctaBody: 'Partagez assez de contexte pour un premier échange utile. Rien n’est envoyé avant que vous choisissiez d’ouvrir votre messagerie.', cta: 'Démarrer une demande',
    },
    footer: { explore: 'Explorer', company: 'Entreprise', home: 'Accueil', founder: 'Fondatrice', email: 'Écrire à Axis One', contact: 'Contacter Axis One', kicker: 'Infrastructure de gouvernance du capital', title: 'Le capital, gouverné par l’exécution.', body: 'Axis One relie capital engagé, jalons vérifiés, preuves attribuables et décisions contrôlées.', operatingCompany: 'Société exploitante', nonCustodial: 'Sans conservation par conception', boundary: 'Axis One ne détient, ne transfère, ne gère ni ne garantit le capital du client. Des prestataires financiers externes autorisés exécutent les transferts.', rights: 'Tous droits réservés.', englishNotice: 'Les documents juridiques sont fournis en anglais.' },
  },
  cs: {
    code: 'cs', hreflang: 'cs', htmlLang: 'cs', dir: 'ltr', label: 'Čeština',
    nav: { why: 'Proč Axis One', system: 'Systém', exposure: 'Rozhodovací expozice', trust: 'Důvěra', deployment: 'Nasazení', frame: 'Vymezit rozhodnutí', menu: 'Menu', navigation: 'Navigace', close: 'Zavřít navigační nabídku', skip: 'Přejít na hlavní obsah' },
    page: {
      eyebrow: 'Infrastruktura pro kapitálová rozhodnutí', title: 'Kapitál se posouvá, když je plnění prokazatelné.', intro: 'Axis One propojuje přidělený kapitál s aktuálními milníky, přiřaditelnými důkazy a jasnou pravomocí, aby byl další krok obhajitelný v reálném čase.', primary: 'Vymezit rozhodnutí', secondary: 'Jak to funguje',
      whyEyebrow: 'Proč Axis One', whyTitle: 'Další rozhodnutí může přijít dřív, než budou jeho podklady aktuální.', whyBody: 'Schválení, realizace, důkazy a pohyb kapitálu bývají v oddělených prostředích. Axis One drží rozhodovací kontext pohromadě ještě před vznikem tlaku.', principles: [ { title: 'Aktuální stav', body: 'Zjistěte, co se změnilo od schválení kapitálu.' }, { title: 'Přiřaditelné důkazy', body: 'Propojte tvrzení s aktuálními a přezkoumatelnými podklady.' }, { title: 'Výslovné oprávnění', body: 'Udržujte lidskou odpovědnost a oprávnění viditelné.' }, { title: 'Záznam rozhodnutí', body: 'Uchovejte podklad každého pozastavení, uvolnění či eskalace.' } ],
      systemEyebrow: 'Propojený rozhodovací systém', systemTitle: 'Jeden řízený kontext od závazku po uvolnění kapitálu.', systemBody: 'Axis One drží realizaci, důkazy, odpovědnost a pravomoc propojené s kapitálovým rozhodnutím, které podporují.', sequence: ['Milník', 'Důkaz', 'Ověření', 'Oprávnění', 'Rozhodnutí'],
      deploymentEyebrow: 'Nasazení', deploymentTitle: 'Začněte v úzkém rozsahu. Prokažte hodnotu. Pak škálujte.', deploymentBody: 'Nejprve zvolte nejmenší provozní rozsah, který dokáže přinést důvěryhodný výsledek.', packages: sharedPackages('Vymezte blížící se kapitálové rozhodnutí s omezenou skupinou účastníků.', 'Řiďte jeden program s propojenými milníky, důkazy a oprávněním.', 'Rozšiřte osvědčený model správy na více programů.'),
      boundaryEyebrow: 'Důvěra díky jasným hranicím', boundaryTitle: 'Institucionální tvrzení potřebují jasně viditelné hranice.', boundaryBody: 'Úschova a převod zůstávají u oprávněných externích finančních poskytovatelů. Axis One zachovává připravenost, odpovědnost a záznam.',
      ctaEyebrow: 'Decision Brief', ctaTitle: 'Přineste další kapitálové rozhodnutí, ne seznam požadavků.', ctaBody: 'Sdílejte dostatek kontextu pro užitečný první rozhovor. Nic se neodešle, dokud se nerozhodnete otevřít svůj e-mail.', cta: 'Zahájit poptávku',
    },
    footer: { explore: 'Prozkoumat', company: 'Společnost', home: 'Domů', founder: 'Zakladatelka', email: 'Napsat Axis One', contact: 'Kontaktovat Axis One', kicker: 'Infrastruktura správy kapitálu', title: 'Kapitál řízený skutečným plněním.', body: 'Axis One propojuje přidělený kapitál, ověřené milníky, důkazy a kontrolovaná rozhodnutí.', operatingCompany: 'Provozující společnost', nonCustodial: 'Bez úschovy již v návrhu', boundary: 'Axis One nedrží, nepřevádí, nespravuje ani nezaručuje kapitál klienta. Převody provádějí oprávnění externí finanční poskytovatelé.', rights: 'Všechna práva vyhrazena.', englishNotice: 'Právní dokumenty jsou k dispozici v angličtině.' },
  },
  hu: {
    code: 'hu', hreflang: 'hu', htmlLang: 'hu', dir: 'ltr', label: 'Magyar',
    nav: { why: 'Miért Axis One', system: 'Rendszer', exposure: 'Döntési kitettség', trust: 'Bizalom', deployment: 'Bevezetés', frame: 'Döntés keretezése', menu: 'Menü', navigation: 'Navigáció', close: 'Navigációs menü bezárása', skip: 'Ugrás a fő tartalomra' },
    page: {
      eyebrow: 'Infrastruktúra tőkedöntésekhez', title: 'A tőke akkor lép tovább, ha a teljesítés bizonyított.', intro: 'Az Axis One az elkötelezett tőkét aktuális mérföldkövekhez, visszavezethető bizonyítékokhoz és egyértelmű jogosultsághoz kapcsolja, így a következő lépés valós időben védhető.', primary: 'Döntés keretezése', secondary: 'Működés megtekintése',
      whyEyebrow: 'Miért Axis One', whyTitle: 'A következő döntés hamarabb érkezhet, mint az aktuális bizonyíték.', whyBody: 'A jóváhagyás, a végrehajtás, a bizonyíték és a tőkemozgás gyakran külön rendszerekben él. Az Axis One még a döntési nyomás előtt összekapcsolja a kontextust.', principles: [ { title: 'Aktuális állapot', body: 'Lássa, mi változott a tőke jóváhagyása óta.' }, { title: 'Visszavezethető bizonyíték', body: 'Kapcsolja az állításokat aktuális, felülvizsgálható bizonyítékokhoz.' }, { title: 'Kifejezett jogosultság', body: 'Tartsa láthatóan az emberi felelősséget és engedélyt.' }, { title: 'Döntési nyilvántartás', body: 'Őrizze meg minden megállítás, felszabadítás vagy eszkaláció alapját.' } ],
      systemEyebrow: 'Összekapcsolt döntési rendszer', systemTitle: 'Egyetlen irányított kontextus az elkötelezéstől a felszabadításig.', systemBody: 'Az Axis One a végrehajtást, a bizonyítékot, a felelősséget és a jogosultságot az általuk támogatott tőkedöntéshez kapcsolja.', sequence: ['Mérföldkő', 'Bizonyíték', 'Ellenőrzés', 'Jogosultság', 'Döntés'],
      deploymentEyebrow: 'Bevezetés', deploymentTitle: 'Kezdje szűk körben. Bizonyítsa az értéket. Utána bővítsen.', deploymentBody: 'Először azt a legkisebb működési kört válassza, amely hiteles eredményt hozhat.', packages: sharedPackages('Keretezzen egy közelgő tőkedöntést körülhatárolt érintetti csoporttal.', 'Működtessen egy programot összekapcsolt mérföldkövekkel, bizonyítékokkal és jogosultságokkal.', 'Terjessze ki a bevált irányítási mintát több programra.'),
      boundaryEyebrow: 'Bizalom világos határok révén', boundaryTitle: 'Az intézményi állításokhoz látható határok kellenek.', boundaryBody: 'Az őrzés és az átutalás jogosult külső pénzügyi szolgáltatóknál marad. Az Axis One megőrzi a döntési készséget, felelősséget és nyilvántartást.',
      ctaEyebrow: 'Decision Brief', ctaTitle: 'A következő tőkedöntést hozza, ne egy követelménylistát.', ctaBody: 'Osszon meg elegendő kontextust egy hasznos első beszélgetéshez. Semmi nem kerül elküldésre, amíg meg nem nyitja az e-mailjét.', cta: 'Érdeklődés indítása',
    },
    footer: { explore: 'Felfedezés', company: 'Vállalat', home: 'Kezdőlap', founder: 'Alapító', email: 'E-mail az Axis One-nak', contact: 'Kapcsolat az Axis One-nal', kicker: 'Tőkeirányítási infrastruktúra', title: 'A végrehajtás által irányított tőke.', body: 'Az Axis One összekapcsolja az elkötelezett tőkét, mérföldköveket, bizonyítékokat és szabályozott döntéseket.', operatingCompany: 'Üzemeltető társaság', nonCustodial: 'Tervezetten letétkezelés nélkül', boundary: 'Az Axis One nem tartja, utalja, kezeli vagy garantálja az ügyfél tőkéjét. Az átutalást jogosult külső pénzügyi szolgáltatók végzik.', rights: 'Minden jog fenntartva.', englishNotice: 'A jogi dokumentumok angol nyelven érhetők el.' },
  },
  sr: {
    code: 'sr', hreflang: 'sr-Latn', htmlLang: 'sr-Latn', dir: 'ltr', label: 'Srpski',
    nav: { why: 'Zašto Axis One', system: 'Sistem', exposure: 'Izloženost odluke', trust: 'Poverenje', deployment: 'Uvođenje', frame: 'Definišite odluku', menu: 'Meni', navigation: 'Navigacija', close: 'Zatvori navigacioni meni', skip: 'Pređi na glavni sadržaj' },
    page: {
      eyebrow: 'Infrastruktura za kapitalne odluke', title: 'Kapital se pokreće kada je izvršenje dokazano.', intro: 'Axis One povezuje angažovani kapital sa aktuelnim prekretnicama, pripisivim dokazima i jasnim ovlašćenjem, tako da je sledeći korak odbranjiv u realnom vremenu.', primary: 'Definišite odluku', secondary: 'Pogledajte kako radi',
      whyEyebrow: 'Zašto Axis One', whyTitle: 'Sledeća odluka može stići pre nego što dokazi budu aktuelni.', whyBody: 'Odobrenje, izvršenje, dokazi i kretanje kapitala često žive u odvojenim okruženjima. Axis One povezuje kontekst pre nego što nastane pritisak.', principles: [ { title: 'Trenutno stanje', body: 'Vidite šta se promenilo od odobrenja kapitala.' }, { title: 'Pripisivi dokazi', body: 'Povežite tvrdnje sa aktuelnim dokazima koji se mogu pregledati.' }, { title: 'Jasno ovlašćenje', body: 'Održite ljudsku odgovornost i dozvolu vidljivim.' }, { title: 'Zapis odluke', body: 'Sačuvajte osnov svake pauze, oslobađanja ili eskalacije.' } ],
      systemEyebrow: 'Povezani sistem odlučivanja', systemTitle: 'Jedan upravljani kontekst, od obaveze do oslobađanja kapitala.', systemBody: 'Axis One održava izvršenje, dokaze, odgovornost i ovlašćenje povezanim sa kapitalnom odlukom koju podržavaju.', sequence: ['Prekretnica', 'Dokaz', 'Validacija', 'Ovlašćenje', 'Odluka'],
      deploymentEyebrow: 'Uvođenje', deploymentTitle: 'Počnite usko. Dokažite vrednost. Zatim proširite.', deploymentBody: 'Prvo izaberite najmanji operativni obim koji može da proizvede verodostojan rezultat.', packages: sharedPackages('Definišite jednu predstojeću kapitalnu odluku sa ograničenom grupom učesnika.', 'Vodite jedan program sa povezanim prekretnicama, dokazima i ovlašćenjima.', 'Proširite dokazani obrazac upravljanja na više programa.'),
      boundaryEyebrow: 'Poverenje kroz jasne granice', boundaryTitle: 'Institucionalne tvrdnje moraju imati vidljive granice.', boundaryBody: 'Čuvanje i prenos ostaju kod ovlašćenih eksternih finansijskih pružalaca. Axis One čuva spremnost, odgovornost i zapis odluke.',
      ctaEyebrow: 'Decision Brief', ctaTitle: 'Donesite sledeću kapitalnu odluku, ne listu zahteva.', ctaBody: 'Podelite dovoljno konteksta za koristan prvi razgovor. Ništa se ne šalje dok ne odlučite da otvorite svoju e-poštu.', cta: 'Pokrenite upit',
    },
    footer: { explore: 'Istražite', company: 'Kompanija', home: 'Početna', founder: 'Osnivačica', email: 'Pošaljite e-poštu Axis One-u', contact: 'Kontaktirajte Axis One', kicker: 'Infrastruktura upravljanja kapitalom', title: 'Kapital kojim upravlja izvršenje.', body: 'Axis One povezuje angažovani kapital, potvrđene prekretnice, pripisive dokaze i kontrolisane odluke.', operatingCompany: 'Operativna kompanija', nonCustodial: 'Bez čuvanja kapitala po dizajnu', boundary: 'Axis One ne drži, prenosi, upravlja niti garantuje kapital klijenta. Ovlašćeni eksterni finansijski pružaoci izvršavaju prenose.', rights: 'Sva prava zadržana.', englishNotice: 'Pravni dokumenti su dostupni na engleskom jeziku.' },
  },
  ar: {
    code: 'ar', hreflang: 'ar', htmlLang: 'ar', dir: 'rtl', label: 'العربية',
    nav: { why: 'لماذا Axis One', system: 'النظام', exposure: 'التعرّض للقرار', trust: 'الثقة', deployment: 'التطبيق', frame: 'تحديد القرار', menu: 'القائمة', navigation: 'التنقل', close: 'إغلاق قائمة التنقل', skip: 'الانتقال إلى المحتوى الرئيسي' },
    page: {
      eyebrow: 'بنية تحتية لقرارات رأس المال', title: 'يتحرك رأس المال عندما تثبت نتائج التنفيذ.', intro: 'تربط Axis One رأس المال الملتزم به بمراحل حديثة وأدلة منسوبة وصلاحية واضحة، بحيث يمكن الدفاع عن الإجراء التالي في الوقت الفعلي.', primary: 'تحديد قرار', secondary: 'اكتشف آلية العمل',
      whyEyebrow: 'لماذا Axis One', whyTitle: 'قد يحين القرار التالي قبل أن تصبح أدلته محدثة.', whyBody: 'غالباً ما توجد الموافقة والتنفيذ والأدلة وحركة رأس المال في بيئات منفصلة. تحافظ Axis One على ترابط سياق القرار قبل ظهور الضغط.', principles: [ { title: 'الحالة الحالية', body: 'اعرف ما تغيّر منذ الموافقة على رأس المال.' }, { title: 'أدلة منسوبة', body: 'اربط كل ادعاء بدليل حديث وقابل للمراجعة.' }, { title: 'صلاحية واضحة', body: 'أبقِ المسؤولية البشرية والإذن ظاهرين.' }, { title: 'سجل القرار', body: 'احفظ أساس كل إيقاف أو إفراج أو تصعيد.' } ],
      systemEyebrow: 'نظام قرارات مترابط', systemTitle: 'سياق قرار واحد ومحكوم، من الالتزام إلى الإفراج.', systemBody: 'تحافظ Axis One على ارتباط التنفيذ والأدلة والمسؤولية والصلاحية بقرار رأس المال الذي تدعمه.', sequence: ['مرحلة', 'دليل', 'تحقق', 'صلاحية', 'قرار'],
      deploymentEyebrow: 'التطبيق', deploymentTitle: 'ابدأ بنطاق محدد. أثبت القيمة. ثم توسّع.', deploymentBody: 'اختر أولاً أصغر نطاق تشغيلي يمكنه إنتاج نتيجة موثوقة.', packages: sharedPackages('حدّد قراراً رأسمالياً قريباً مع مجموعة محددة من أصحاب المصلحة.', 'شغّل برنامجاً واحداً بمراحل وأدلة وصلاحيات مترابطة.', 'وسّع نمط حوكمة مثبتاً عبر عدة برامج.'),
      boundaryEyebrow: 'الثقة عبر حدود واضحة', boundaryTitle: 'الادعاءات المؤسسية تحتاج إلى حدود واضحة ومرئية.', boundaryBody: 'يبقى الحفظ والتحويل لدى مزودي الخدمات المالية الخارجيين المرخصين. وتحفظ Axis One الجاهزية والمسؤولية وسجل القرار.',
      ctaEyebrow: 'ملخص القرار', ctaTitle: 'أحضر قرار رأس المال التالي، لا قائمة متطلبات.', ctaBody: 'شارك سياقاً كافياً لمحادثة أولى مفيدة. لا يُرسل شيء حتى تختار فتح بريدك الإلكتروني.', cta: 'بدء استفسار',
    },
    footer: { explore: 'استكشف', company: 'الشركة', home: 'الرئيسية', founder: 'المؤسِسة', email: 'مراسلة Axis One', contact: 'التواصل مع Axis One', kicker: 'بنية تحتية لحوكمة رأس المال', title: 'رأس مال تحكمه نتائج التنفيذ.', body: 'تربط Axis One رأس المال الملتزم به بالمراحل المتحقق منها والأدلة المنسوبة والقرارات المنضبطة.', operatingCompany: 'الشركة المشغّلة', nonCustodial: 'مصمم من دون حفظ الأموال', boundary: 'لا تحتفظ Axis One برأس مال العميل ولا تنقله أو تديره أو تضمنه. ينفذ مزودو الخدمات المالية الخارجيون المرخصون أي تحويل.', rights: 'جميع الحقوق محفوظة.', englishNotice: 'تتوفر المستندات القانونية باللغة الإنجليزية.' },
  },
};

export function isLocaleCode(value: string | undefined): value is LocaleCode {
  return Boolean(value && (localeCodes as readonly string[]).includes(value.toLowerCase()));
}

export function localeFromPath(pathname: string): LocaleCode {
  const firstSegment = pathname.split('/').filter(Boolean)[0]?.toLowerCase();
  return isLocaleCode(firstSegment) ? firstSegment : 'en-gb';
}

export function isLocalizedLanding(pathname: string): boolean {
  const segments = pathname.split('/').filter(Boolean);
  return segments.length === 1 && isLocaleCode(segments[0]) && segments[0] !== 'en-gb';
}

export function localeHome(code: LocaleCode): string {
  return code === 'en-gb' ? '/' : `/${code}`;
}

export const inquiryLanguageNotice: Record<LocaleCode, string> = {
  'en-gb': '',
  'en-us': 'This operational inquiry is currently prepared in UK English.',
  es: 'Este formulario operativo se prepara actualmente en inglés.',
  de: 'Dieses operative Anfrageformular wird derzeit auf Englisch erstellt.',
  it: 'Questo modulo operativo viene attualmente preparato in inglese.',
  pt: 'Este formulário operacional é atualmente preparado em inglês.',
  fr: 'Ce formulaire opérationnel est actuellement préparé en anglais.',
  cs: 'Tento provozní formulář je v současnosti připravován v angličtině.',
  hu: 'Ez az operatív űrlap jelenleg angol nyelven készül.',
  sr: 'Ovaj operativni obrazac je trenutno na engleskom jeziku.',
  ar: 'يتم إعداد نموذج الاستفسار التشغيلي حالياً باللغة الإنجليزية.',
};
