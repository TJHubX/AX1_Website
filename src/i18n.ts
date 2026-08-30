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
      eyebrow: 'Capital governance infrastructure', title: 'Capital, governed by execution.', intro: 'Axis One connects committed capital to verified milestones, attributable evidence and controlled decision states—without taking custody of client capital.', primary: 'Frame a decision', secondary: 'See how it works',
      whyEyebrow: 'Why Axis One', whyTitle: 'Make the next capital action defensible.', whyBody: 'A decision-ready position connects what changed, what proves it, who is responsible and who is authorised to act.',
      principles: [
        { title: 'Current state', body: 'See what changed since capital was approved.' },
        { title: 'Attributable evidence', body: 'Connect claims to current, reviewable proof.' },
        { title: 'Explicit authority', body: 'Keep human responsibility and permission visible.' },
        { title: 'Decision record', body: 'Preserve the basis for every hold, release or escalation.' },
      ],
      systemEyebrow: 'A connected decision system', systemTitle: 'From execution to governed action.', systemBody: 'Axis One turns fragmented reporting into a controlled sequence that preserves context and accountability.', sequence: ['Milestone', 'Evidence', 'Validation', 'Authority', 'Decision'],
      deploymentEyebrow: 'Deployment', deploymentTitle: 'Start with one live decision. Scale after proof.', deploymentBody: 'Choose the smallest operating scope that can produce a credible result.', packages: sharedPackages('Frame one approaching capital decision with a bounded stakeholder group.', 'Operate one programme with connected milestones, evidence and authority.', 'Extend a proven governance pattern across multiple programmes.'),
      boundaryEyebrow: 'Trust through boundaries', boundaryTitle: 'Axis One governs the decision. It never holds the money.', boundaryBody: 'Custody and transfer remain with authorised external financial providers. Axis One preserves readiness, responsibility and the decision record.',
      ctaEyebrow: 'Apply the boundary', ctaTitle: 'Bring one real capital decision.', ctaBody: 'Share enough context for a useful first conversation. Nothing is submitted until you choose to open your email.', cta: 'Start an inquiry',
    },
    footer: { explore: 'Explore', company: 'Company', home: 'Home', founder: 'Founder', email: 'Email Axis One', contact: 'Contact Axis One', kicker: 'Capital governance infrastructure', title: 'Capital, governed by execution.', body: 'Axis One connects committed capital to verified milestones, attributable evidence and controlled decision states.', operatingCompany: 'Operating company', nonCustodial: 'Non-custodial by design', boundary: 'Axis One does not hold, transfer, manage or guarantee client capital. Authorised external financial providers execute any transfer.', rights: 'All rights reserved.', englishNotice: 'Legal documents are provided in English.' },
  },
  'en-us': {
    code: 'en-us', hreflang: 'en-US', htmlLang: 'en-US', dir: 'ltr', label: 'English (US)',
    nav: { why: 'Why Axis One', system: 'System', exposure: 'Decision exposure', trust: 'Trust', deployment: 'Deployment', frame: 'Frame a decision', menu: 'Menu', navigation: 'Navigation', close: 'Close navigation menu', skip: 'Skip to main content' },
    page: {
      eyebrow: 'Capital governance infrastructure', title: 'Capital, governed by execution.', intro: 'Axis One connects committed capital to verified milestones, attributable evidence, and controlled decision states—without taking custody of client capital.', primary: 'Frame a decision', secondary: 'See how it works',
      whyEyebrow: 'Why Axis One', whyTitle: 'Make the next capital action defensible.', whyBody: 'A decision-ready position connects what changed, what proves it, who is responsible, and who is authorized to act.', principles: [
        { title: 'Current state', body: 'See what changed since capital was approved.' }, { title: 'Attributable evidence', body: 'Connect claims to current, reviewable proof.' }, { title: 'Explicit authority', body: 'Keep human responsibility and permission visible.' }, { title: 'Decision record', body: 'Preserve the basis for every hold, release, or escalation.' },
      ],
      systemEyebrow: 'A connected decision system', systemTitle: 'From execution to governed action.', systemBody: 'Axis One turns fragmented reporting into a controlled sequence that preserves context and accountability.', sequence: ['Milestone', 'Evidence', 'Validation', 'Authority', 'Decision'],
      deploymentEyebrow: 'Deployment', deploymentTitle: 'Start with one live decision. Scale after proof.', deploymentBody: 'Choose the smallest operating scope that can produce a credible result.', packages: sharedPackages('Frame one approaching capital decision with a bounded stakeholder group.', 'Operate one program with connected milestones, evidence, and authority.', 'Extend a proven governance pattern across multiple programs.'),
      boundaryEyebrow: 'Trust through boundaries', boundaryTitle: 'Axis One governs the decision. It never holds the money.', boundaryBody: 'Custody and transfer remain with authorized external financial providers. Axis One preserves readiness, responsibility, and the decision record.',
      ctaEyebrow: 'Apply the boundary', ctaTitle: 'Bring one real capital decision.', ctaBody: 'Share enough context for a useful first conversation. Nothing is submitted until you choose to open your email.', cta: 'Start an inquiry',
    },
    footer: { explore: 'Explore', company: 'Company', home: 'Home', founder: 'Founder', email: 'Email Axis One', contact: 'Contact Axis One', kicker: 'Capital governance infrastructure', title: 'Capital, governed by execution.', body: 'Axis One connects committed capital to verified milestones, attributable evidence, and controlled decision states.', operatingCompany: 'Operating company', nonCustodial: 'Non-custodial by design', boundary: 'Axis One does not hold, transfer, manage, or guarantee client capital. Authorized external financial providers execute any transfer.', rights: 'All rights reserved.', englishNotice: 'Legal documents are provided in English.' },
  },
  es: {
    code: 'es', hreflang: 'es', htmlLang: 'es', dir: 'ltr', label: 'Español',
    nav: { why: 'Por qué Axis One', system: 'Sistema', exposure: 'Exposición de la decisión', trust: 'Confianza', deployment: 'Implementación', frame: 'Definir una decisión', menu: 'Menú', navigation: 'Navegación', close: 'Cerrar el menú de navegación', skip: 'Ir al contenido principal' },
    page: {
      eyebrow: 'Infraestructura de gobernanza del capital', title: 'Capital, gobernado por la ejecución.', intro: 'Axis One conecta el capital comprometido con hitos verificados, evidencia atribuible y estados de decisión controlados, sin custodiar el capital del cliente.', primary: 'Definir una decisión', secondary: 'Ver cómo funciona',
      whyEyebrow: 'Por qué Axis One', whyTitle: 'Haga defendible la próxima acción de capital.', whyBody: 'Una posición preparada para decidir conecta qué cambió, qué lo demuestra, quién responde y quién está autorizado a actuar.', principles: [ { title: 'Estado actual', body: 'Vea qué cambió desde que se aprobó el capital.' }, { title: 'Evidencia atribuible', body: 'Conecte cada afirmación con pruebas actuales y revisables.' }, { title: 'Autoridad explícita', body: 'Mantenga visibles la responsabilidad humana y el permiso.' }, { title: 'Registro de decisión', body: 'Conserve la base de cada pausa, liberación o escalada.' } ],
      systemEyebrow: 'Un sistema de decisión conectado', systemTitle: 'De la ejecución a la acción gobernada.', systemBody: 'Axis One convierte informes fragmentados en una secuencia controlada que preserva el contexto y la responsabilidad.', sequence: ['Hito', 'Evidencia', 'Validación', 'Autoridad', 'Decisión'],
      deploymentEyebrow: 'Implementación', deploymentTitle: 'Empiece con una decisión real. Escale después de probar.', deploymentBody: 'Elija el alcance operativo mínimo capaz de producir un resultado creíble.', packages: sharedPackages('Defina una decisión de capital próxima con un grupo acotado de participantes.', 'Gestione un programa con hitos, evidencia y autoridad conectados.', 'Extienda un patrón de gobernanza probado a varios programas.'),
      boundaryEyebrow: 'Confianza mediante límites', boundaryTitle: 'Axis One gobierna la decisión. Nunca custodia el dinero.', boundaryBody: 'La custodia y la transferencia permanecen en proveedores financieros externos autorizados. Axis One conserva la preparación, la responsabilidad y el registro.',
      ctaEyebrow: 'Aplique el límite', ctaTitle: 'Traiga una decisión de capital real.', ctaBody: 'Comparta el contexto suficiente para una primera conversación útil. Nada se envía hasta que usted decida abrir su correo.', cta: 'Iniciar una consulta',
    },
    footer: { explore: 'Explorar', company: 'Empresa', home: 'Inicio', founder: 'Fundadora', email: 'Enviar un correo a Axis One', contact: 'Contactar con Axis One', kicker: 'Infraestructura de gobernanza del capital', title: 'Capital, gobernado por la ejecución.', body: 'Axis One conecta capital comprometido, hitos verificados, evidencia atribuible y decisiones controladas.', operatingCompany: 'Empresa operadora', nonCustodial: 'Sin custodia por diseño', boundary: 'Axis One no posee, transfiere, gestiona ni garantiza el capital del cliente. Los proveedores financieros externos autorizados ejecutan las transferencias.', rights: 'Todos los derechos reservados.', englishNotice: 'Los documentos legales se proporcionan en inglés.' },
  },
  de: {
    code: 'de', hreflang: 'de', htmlLang: 'de', dir: 'ltr', label: 'Deutsch',
    nav: { why: 'Warum Axis One', system: 'System', exposure: 'Entscheidungsrisiko', trust: 'Vertrauen', deployment: 'Einführung', frame: 'Entscheidung definieren', menu: 'Menü', navigation: 'Navigation', close: 'Navigationsmenü schließen', skip: 'Zum Hauptinhalt springen' },
    page: {
      eyebrow: 'Infrastruktur für Kapital-Governance', title: 'Kapital, gesteuert durch Ausführung.', intro: 'Axis One verbindet zugesagtes Kapital mit verifizierten Meilensteinen, zurechenbaren Nachweisen und kontrollierten Entscheidungszuständen – ohne Kundengelder zu verwahren.', primary: 'Entscheidung definieren', secondary: 'Funktionsweise ansehen',
      whyEyebrow: 'Warum Axis One', whyTitle: 'Machen Sie den nächsten Kapitalschritt belastbar.', whyBody: 'Eine entscheidungsreife Position verbindet Veränderungen, Nachweise, Verantwortung und Handlungsbefugnis.', principles: [ { title: 'Aktueller Stand', body: 'Erkennen Sie, was sich seit der Kapitalfreigabe geändert hat.' }, { title: 'Zurechenbare Nachweise', body: 'Verbinden Sie Aussagen mit aktuellen, prüfbaren Belegen.' }, { title: 'Klare Befugnis', body: 'Menschliche Verantwortung und Erlaubnis bleiben sichtbar.' }, { title: 'Entscheidungsprotokoll', body: 'Bewahren Sie die Grundlage jeder Freigabe, Pause oder Eskalation.' } ],
      systemEyebrow: 'Ein verbundenes Entscheidungssystem', systemTitle: 'Von der Ausführung zur gesteuerten Handlung.', systemBody: 'Axis One macht aus fragmentierten Berichten eine kontrollierte Abfolge mit Kontext und Rechenschaft.', sequence: ['Meilenstein', 'Nachweis', 'Validierung', 'Befugnis', 'Entscheidung'],
      deploymentEyebrow: 'Einführung', deploymentTitle: 'Mit einer echten Entscheidung starten. Nach dem Nachweis skalieren.', deploymentBody: 'Wählen Sie den kleinsten operativen Umfang, der ein glaubwürdiges Ergebnis liefert.', packages: sharedPackages('Eine bevorstehende Kapitalentscheidung mit einer klar begrenzten Gruppe definieren.', 'Ein Programm mit verbundenen Meilensteinen, Nachweisen und Befugnissen steuern.', 'Ein bewährtes Governance-Muster auf mehrere Programme ausweiten.'),
      boundaryEyebrow: 'Vertrauen durch klare Grenzen', boundaryTitle: 'Axis One steuert die Entscheidung. Es verwahrt niemals das Geld.', boundaryBody: 'Verwahrung und Transfer verbleiben bei autorisierten externen Finanzdienstleistern. Axis One sichert Entscheidungsreife, Verantwortung und Protokoll.',
      ctaEyebrow: 'Die Grenze anwenden', ctaTitle: 'Bringen Sie eine reale Kapitalentscheidung mit.', ctaBody: 'Teilen Sie genügend Kontext für ein sinnvolles Erstgespräch. Nichts wird gesendet, bevor Sie Ihr E-Mail-Programm öffnen.', cta: 'Anfrage starten',
    },
    footer: { explore: 'Entdecken', company: 'Unternehmen', home: 'Startseite', founder: 'Gründerin', email: 'Axis One per E-Mail kontaktieren', contact: 'Axis One kontaktieren', kicker: 'Infrastruktur für Kapital-Governance', title: 'Kapital, gesteuert durch Ausführung.', body: 'Axis One verbindet zugesagtes Kapital, verifizierte Meilensteine, zurechenbare Nachweise und kontrollierte Entscheidungen.', operatingCompany: 'Betreibergesellschaft', nonCustodial: 'Bewusst ohne Verwahrung', boundary: 'Axis One hält, überträgt, verwaltet oder garantiert kein Kundenkapital. Autorisierte externe Finanzdienstleister führen Transfers aus.', rights: 'Alle Rechte vorbehalten.', englishNotice: 'Rechtliche Dokumente werden auf Englisch bereitgestellt.' },
  },
  it: {
    code: 'it', hreflang: 'it', htmlLang: 'it', dir: 'ltr', label: 'Italiano',
    nav: { why: 'Perché Axis One', system: 'Sistema', exposure: 'Esposizione decisionale', trust: 'Fiducia', deployment: 'Implementazione', frame: 'Definisci una decisione', menu: 'Menu', navigation: 'Navigazione', close: 'Chiudi il menu di navigazione', skip: 'Vai al contenuto principale' },
    page: {
      eyebrow: 'Infrastruttura di governance del capitale', title: 'Capitale, governato dall’esecuzione.', intro: 'Axis One collega il capitale impegnato a traguardi verificati, prove attribuibili e stati decisionali controllati, senza custodire il capitale del cliente.', primary: 'Definisci una decisione', secondary: 'Scopri il funzionamento',
      whyEyebrow: 'Perché Axis One', whyTitle: 'Rendi difendibile la prossima azione sul capitale.', whyBody: 'Una posizione pronta alla decisione collega ciò che è cambiato, le prove, la responsabilità e l’autorità ad agire.', principles: [ { title: 'Stato attuale', body: 'Vedi cosa è cambiato dopo l’approvazione del capitale.' }, { title: 'Prove attribuibili', body: 'Collega ogni affermazione a prove attuali e verificabili.' }, { title: 'Autorità esplicita', body: 'Mantieni visibili responsabilità umana e permesso.' }, { title: 'Registro decisionale', body: 'Conserva la base di ogni sospensione, rilascio o escalation.' } ],
      systemEyebrow: 'Un sistema decisionale connesso', systemTitle: 'Dall’esecuzione all’azione governata.', systemBody: 'Axis One trasforma report frammentati in una sequenza controllata che preserva contesto e responsabilità.', sequence: ['Traguardo', 'Prova', 'Validazione', 'Autorità', 'Decisione'],
      deploymentEyebrow: 'Implementazione', deploymentTitle: 'Inizia con una decisione reale. Scala dopo la prova.', deploymentBody: 'Scegli l’ambito operativo minimo capace di produrre un risultato credibile.', packages: sharedPackages('Definisci una decisione imminente con un gruppo circoscritto di stakeholder.', 'Gestisci un programma con traguardi, prove e autorità collegati.', 'Estendi un modello di governance comprovato a più programmi.'),
      boundaryEyebrow: 'Fiducia attraverso i confini', boundaryTitle: 'Axis One governa la decisione. Non detiene mai il denaro.', boundaryBody: 'Custodia e trasferimento restano presso fornitori finanziari esterni autorizzati. Axis One conserva prontezza, responsabilità e registro.',
      ctaEyebrow: 'Applica il confine', ctaTitle: 'Porta una decisione reale sul capitale.', ctaBody: 'Condividi il contesto necessario per un primo confronto utile. Nulla viene inviato finché non scegli di aprire la tua email.', cta: 'Avvia una richiesta',
    },
    footer: { explore: 'Esplora', company: 'Società', home: 'Home', founder: 'Fondatrice', email: 'Scrivi ad Axis One', contact: 'Contatta Axis One', kicker: 'Infrastruttura di governance del capitale', title: 'Capitale, governato dall’esecuzione.', body: 'Axis One collega capitale impegnato, traguardi verificati, prove attribuibili e decisioni controllate.', operatingCompany: 'Società operativa', nonCustodial: 'Non-custodial per progettazione', boundary: 'Axis One non detiene, trasferisce, gestisce né garantisce il capitale del cliente. I fornitori finanziari esterni autorizzati eseguono i trasferimenti.', rights: 'Tutti i diritti riservati.', englishNotice: 'I documenti legali sono disponibili in inglese.' },
  },
  pt: {
    code: 'pt', hreflang: 'pt', htmlLang: 'pt-PT', dir: 'ltr', label: 'Português',
    nav: { why: 'Porquê a Axis One', system: 'Sistema', exposure: 'Exposição da decisão', trust: 'Confiança', deployment: 'Implementação', frame: 'Definir uma decisão', menu: 'Menu', navigation: 'Navegação', close: 'Fechar o menu de navegação', skip: 'Ir para o conteúdo principal' },
    page: {
      eyebrow: 'Infraestrutura de governação de capital', title: 'Capital, governado pela execução.', intro: 'A Axis One liga capital comprometido a marcos verificados, evidência atribuível e estados de decisão controlados, sem deter capital do cliente.', primary: 'Definir uma decisão', secondary: 'Ver como funciona',
      whyEyebrow: 'Porquê a Axis One', whyTitle: 'Torne defensável a próxima ação de capital.', whyBody: 'Uma posição pronta para decisão liga o que mudou, a prova, a responsabilidade e a autoridade para agir.', principles: [ { title: 'Estado atual', body: 'Veja o que mudou desde a aprovação do capital.' }, { title: 'Evidência atribuível', body: 'Ligue afirmações a provas atuais e auditáveis.' }, { title: 'Autoridade explícita', body: 'Mantenha visíveis a responsabilidade humana e a permissão.' }, { title: 'Registo da decisão', body: 'Preserve a base de cada pausa, libertação ou escalada.' } ],
      systemEyebrow: 'Um sistema de decisão conectado', systemTitle: 'Da execução à ação governada.', systemBody: 'A Axis One transforma relatórios fragmentados numa sequência controlada que preserva contexto e responsabilização.', sequence: ['Marco', 'Evidência', 'Validação', 'Autoridade', 'Decisão'],
      deploymentEyebrow: 'Implementação', deploymentTitle: 'Comece com uma decisão real. Escale após a prova.', deploymentBody: 'Escolha o menor âmbito operacional capaz de gerar um resultado credível.', packages: sharedPackages('Defina uma decisão de capital próxima com um grupo delimitado de intervenientes.', 'Opere um programa com marcos, evidência e autoridade conectados.', 'Estenda um padrão de governação comprovado a vários programas.'),
      boundaryEyebrow: 'Confiança através de limites', boundaryTitle: 'A Axis One governa a decisão. Nunca detém o dinheiro.', boundaryBody: 'A custódia e a transferência permanecem com prestadores financeiros externos autorizados. A Axis One preserva prontidão, responsabilidade e registo.',
      ctaEyebrow: 'Aplicar o limite', ctaTitle: 'Traga uma decisão real de capital.', ctaBody: 'Partilhe contexto suficiente para uma primeira conversa útil. Nada é enviado até decidir abrir o seu email.', cta: 'Iniciar um pedido',
    },
    footer: { explore: 'Explorar', company: 'Empresa', home: 'Início', founder: 'Fundadora', email: 'Enviar email à Axis One', contact: 'Contactar a Axis One', kicker: 'Infraestrutura de governação de capital', title: 'Capital, governado pela execução.', body: 'A Axis One liga capital comprometido, marcos verificados, evidência atribuível e decisões controladas.', operatingCompany: 'Empresa operadora', nonCustodial: 'Sem custódia por conceção', boundary: 'A Axis One não detém, transfere, gere ou garante capital do cliente. Prestadores financeiros externos autorizados executam qualquer transferência.', rights: 'Todos os direitos reservados.', englishNotice: 'Os documentos jurídicos são disponibilizados em inglês.' },
  },
  fr: {
    code: 'fr', hreflang: 'fr', htmlLang: 'fr', dir: 'ltr', label: 'Français',
    nav: { why: 'Pourquoi Axis One', system: 'Système', exposure: 'Exposition décisionnelle', trust: 'Confiance', deployment: 'Déploiement', frame: 'Cadrer une décision', menu: 'Menu', navigation: 'Navigation', close: 'Fermer le menu de navigation', skip: 'Aller au contenu principal' },
    page: {
      eyebrow: 'Infrastructure de gouvernance du capital', title: 'Le capital, gouverné par l’exécution.', intro: 'Axis One relie le capital engagé à des jalons vérifiés, des preuves attribuables et des états de décision contrôlés, sans détenir les fonds du client.', primary: 'Cadrer une décision', secondary: 'Voir le fonctionnement',
      whyEyebrow: 'Pourquoi Axis One', whyTitle: 'Rendez la prochaine action de capital défendable.', whyBody: 'Une position prête à décider relie ce qui a changé, les preuves, la responsabilité et l’autorité d’agir.', principles: [ { title: 'État actuel', body: 'Voyez ce qui a changé depuis l’approbation du capital.' }, { title: 'Preuves attribuables', body: 'Reliez chaque affirmation à des preuves actuelles et vérifiables.' }, { title: 'Autorité explicite', body: 'Gardez visibles la responsabilité humaine et l’autorisation.' }, { title: 'Registre de décision', body: 'Préservez le fondement de chaque attente, libération ou escalade.' } ],
      systemEyebrow: 'Un système de décision connecté', systemTitle: 'De l’exécution à l’action gouvernée.', systemBody: 'Axis One transforme des rapports fragmentés en une séquence contrôlée qui préserve le contexte et la responsabilité.', sequence: ['Jalon', 'Preuve', 'Validation', 'Autorité', 'Décision'],
      deploymentEyebrow: 'Déploiement', deploymentTitle: 'Commencez par une décision réelle. Étendez après validation.', deploymentBody: 'Choisissez le plus petit périmètre opérationnel capable de produire un résultat crédible.', packages: sharedPackages('Cadrez une décision de capital à venir avec un groupe limité de parties prenantes.', 'Pilotez un programme avec des jalons, preuves et autorités connectés.', 'Étendez un modèle de gouvernance éprouvé à plusieurs programmes.'),
      boundaryEyebrow: 'La confiance par des limites claires', boundaryTitle: 'Axis One gouverne la décision. Elle ne détient jamais l’argent.', boundaryBody: 'La conservation et le transfert restent chez des prestataires financiers externes autorisés. Axis One préserve la préparation, la responsabilité et le registre.',
      ctaEyebrow: 'Appliquer la limite', ctaTitle: 'Apportez une décision de capital réelle.', ctaBody: 'Partagez assez de contexte pour un premier échange utile. Rien n’est envoyé avant que vous choisissiez d’ouvrir votre messagerie.', cta: 'Démarrer une demande',
    },
    footer: { explore: 'Explorer', company: 'Entreprise', home: 'Accueil', founder: 'Fondatrice', email: 'Écrire à Axis One', contact: 'Contacter Axis One', kicker: 'Infrastructure de gouvernance du capital', title: 'Le capital, gouverné par l’exécution.', body: 'Axis One relie capital engagé, jalons vérifiés, preuves attribuables et décisions contrôlées.', operatingCompany: 'Société exploitante', nonCustodial: 'Sans conservation par conception', boundary: 'Axis One ne détient, ne transfère, ne gère ni ne garantit le capital du client. Des prestataires financiers externes autorisés exécutent les transferts.', rights: 'Tous droits réservés.', englishNotice: 'Les documents juridiques sont fournis en anglais.' },
  },
  cs: {
    code: 'cs', hreflang: 'cs', htmlLang: 'cs', dir: 'ltr', label: 'Čeština',
    nav: { why: 'Proč Axis One', system: 'Systém', exposure: 'Rozhodovací expozice', trust: 'Důvěra', deployment: 'Nasazení', frame: 'Vymezit rozhodnutí', menu: 'Menu', navigation: 'Navigace', close: 'Zavřít navigační nabídku', skip: 'Přejít na hlavní obsah' },
    page: {
      eyebrow: 'Infrastruktura správy kapitálu', title: 'Kapitál řízený skutečným plněním.', intro: 'Axis One propojuje přidělený kapitál s ověřenými milníky, přiřaditelnými důkazy a kontrolovanými stavy rozhodnutí, aniž by držel prostředky klienta.', primary: 'Vymezit rozhodnutí', secondary: 'Jak to funguje',
      whyEyebrow: 'Proč Axis One', whyTitle: 'Udělejte další kapitálový krok obhajitelným.', whyBody: 'Pozice připravená k rozhodnutí propojuje změnu, důkaz, odpovědnost a oprávnění jednat.', principles: [ { title: 'Aktuální stav', body: 'Zjistěte, co se změnilo od schválení kapitálu.' }, { title: 'Přiřaditelné důkazy', body: 'Propojte tvrzení s aktuálními a přezkoumatelnými podklady.' }, { title: 'Výslovné oprávnění', body: 'Udržujte lidskou odpovědnost a oprávnění viditelné.' }, { title: 'Záznam rozhodnutí', body: 'Uchovejte podklad každého pozastavení, uvolnění či eskalace.' } ],
      systemEyebrow: 'Propojený rozhodovací systém', systemTitle: 'Od plnění k řízenému jednání.', systemBody: 'Axis One mění roztříštěné reporty na kontrolovanou posloupnost, která zachovává kontext a odpovědnost.', sequence: ['Milník', 'Důkaz', 'Ověření', 'Oprávnění', 'Rozhodnutí'],
      deploymentEyebrow: 'Nasazení', deploymentTitle: 'Začněte jedním reálným rozhodnutím. Škálujte po ověření.', deploymentBody: 'Zvolte nejmenší provozní rozsah, který dokáže přinést důvěryhodný výsledek.', packages: sharedPackages('Vymezte blížící se kapitálové rozhodnutí s omezenou skupinou účastníků.', 'Řiďte jeden program s propojenými milníky, důkazy a oprávněním.', 'Rozšiřte osvědčený model správy na více programů.'),
      boundaryEyebrow: 'Důvěra díky jasným hranicím', boundaryTitle: 'Axis One řídí rozhodnutí. Peníze nikdy nedrží.', boundaryBody: 'Úschova a převod zůstávají u oprávněných externích finančních poskytovatelů. Axis One zachovává připravenost, odpovědnost a záznam.',
      ctaEyebrow: 'Použijte hranici', ctaTitle: 'Přineste jedno reálné kapitálové rozhodnutí.', ctaBody: 'Sdílejte dostatek kontextu pro užitečný první rozhovor. Nic se neodešle, dokud se nerozhodnete otevřít svůj e-mail.', cta: 'Zahájit poptávku',
    },
    footer: { explore: 'Prozkoumat', company: 'Společnost', home: 'Domů', founder: 'Zakladatelka', email: 'Napsat Axis One', contact: 'Kontaktovat Axis One', kicker: 'Infrastruktura správy kapitálu', title: 'Kapitál řízený skutečným plněním.', body: 'Axis One propojuje přidělený kapitál, ověřené milníky, důkazy a kontrolovaná rozhodnutí.', operatingCompany: 'Provozující společnost', nonCustodial: 'Bez úschovy již v návrhu', boundary: 'Axis One nedrží, nepřevádí, nespravuje ani nezaručuje kapitál klienta. Převody provádějí oprávnění externí finanční poskytovatelé.', rights: 'Všechna práva vyhrazena.', englishNotice: 'Právní dokumenty jsou k dispozici v angličtině.' },
  },
  hu: {
    code: 'hu', hreflang: 'hu', htmlLang: 'hu', dir: 'ltr', label: 'Magyar',
    nav: { why: 'Miért Axis One', system: 'Rendszer', exposure: 'Döntési kitettség', trust: 'Bizalom', deployment: 'Bevezetés', frame: 'Döntés keretezése', menu: 'Menü', navigation: 'Navigáció', close: 'Navigációs menü bezárása', skip: 'Ugrás a fő tartalomra' },
    page: {
      eyebrow: 'Tőkeirányítási infrastruktúra', title: 'A végrehajtás által irányított tőke.', intro: 'Az Axis One az elkötelezett tőkét ellenőrzött mérföldkövekhez, visszavezethető bizonyítékokhoz és szabályozott döntési állapotokhoz kapcsolja, az ügyfél tőkéjének őrzése nélkül.', primary: 'Döntés keretezése', secondary: 'Működés megtekintése',
      whyEyebrow: 'Miért Axis One', whyTitle: 'Tegye védhetővé a következő tőkelépést.', whyBody: 'A döntésre kész helyzet összekapcsolja a változást, a bizonyítékot, a felelősséget és a cselekvési jogosultságot.', principles: [ { title: 'Aktuális állapot', body: 'Lássa, mi változott a tőke jóváhagyása óta.' }, { title: 'Visszavezethető bizonyíték', body: 'Kapcsolja az állításokat aktuális, felülvizsgálható bizonyítékokhoz.' }, { title: 'Kifejezett jogosultság', body: 'Tartsa láthatóan az emberi felelősséget és engedélyt.' }, { title: 'Döntési nyilvántartás', body: 'Őrizze meg minden megállítás, felszabadítás vagy eszkaláció alapját.' } ],
      systemEyebrow: 'Összekapcsolt döntési rendszer', systemTitle: 'A végrehajtástól az irányított cselekvésig.', systemBody: 'Az Axis One a töredezett jelentéseket ellenőrzött folyamattá alakítja, amely megőrzi a kontextust és az elszámoltathatóságot.', sequence: ['Mérföldkő', 'Bizonyíték', 'Ellenőrzés', 'Jogosultság', 'Döntés'],
      deploymentEyebrow: 'Bevezetés', deploymentTitle: 'Kezdje egy valós döntéssel. Bizonyítás után bővítsen.', deploymentBody: 'Válassza a legkisebb működési kört, amely hiteles eredményt tud felmutatni.', packages: sharedPackages('Keretezzen egy közelgő tőkedöntést körülhatárolt érintetti csoporttal.', 'Működtessen egy programot összekapcsolt mérföldkövekkel, bizonyítékokkal és jogosultságokkal.', 'Terjessze ki a bevált irányítási mintát több programra.'),
      boundaryEyebrow: 'Bizalom világos határok révén', boundaryTitle: 'Az Axis One a döntést irányítja. A pénzt soha nem tartja.', boundaryBody: 'Az őrzés és az átutalás jogosult külső pénzügyi szolgáltatóknál marad. Az Axis One megőrzi a döntési készséget, felelősséget és nyilvántartást.',
      ctaEyebrow: 'Alkalmazza a határt', ctaTitle: 'Hozzon egy valós tőkedöntést.', ctaBody: 'Osszon meg elegendő kontextust egy hasznos első beszélgetéshez. Semmi nem kerül elküldésre, amíg meg nem nyitja az e-mailjét.', cta: 'Érdeklődés indítása',
    },
    footer: { explore: 'Felfedezés', company: 'Vállalat', home: 'Kezdőlap', founder: 'Alapító', email: 'E-mail az Axis One-nak', contact: 'Kapcsolat az Axis One-nal', kicker: 'Tőkeirányítási infrastruktúra', title: 'A végrehajtás által irányított tőke.', body: 'Az Axis One összekapcsolja az elkötelezett tőkét, mérföldköveket, bizonyítékokat és szabályozott döntéseket.', operatingCompany: 'Üzemeltető társaság', nonCustodial: 'Tervezetten letétkezelés nélkül', boundary: 'Az Axis One nem tartja, utalja, kezeli vagy garantálja az ügyfél tőkéjét. Az átutalást jogosult külső pénzügyi szolgáltatók végzik.', rights: 'Minden jog fenntartva.', englishNotice: 'A jogi dokumentumok angol nyelven érhetők el.' },
  },
  sr: {
    code: 'sr', hreflang: 'sr-Latn', htmlLang: 'sr-Latn', dir: 'ltr', label: 'Srpski',
    nav: { why: 'Zašto Axis One', system: 'Sistem', exposure: 'Izloženost odluke', trust: 'Poverenje', deployment: 'Uvođenje', frame: 'Definišite odluku', menu: 'Meni', navigation: 'Navigacija', close: 'Zatvori navigacioni meni', skip: 'Pređi na glavni sadržaj' },
    page: {
      eyebrow: 'Infrastruktura upravljanja kapitalom', title: 'Kapital kojim upravlja izvršenje.', intro: 'Axis One povezuje angažovani kapital sa potvrđenim prekretnicama, pripisivim dokazima i kontrolisanim stanjima odluke, bez čuvanja kapitala klijenta.', primary: 'Definišite odluku', secondary: 'Pogledajte kako radi',
      whyEyebrow: 'Zašto Axis One', whyTitle: 'Učinite sledeću kapitalnu akciju odbranjivom.', whyBody: 'Pozicija spremna za odluku povezuje šta se promenilo, šta to dokazuje, ko je odgovoran i ko ima ovlašćenje da deluje.', principles: [ { title: 'Trenutno stanje', body: 'Vidite šta se promenilo od odobrenja kapitala.' }, { title: 'Pripisivi dokazi', body: 'Povežite tvrdnje sa aktuelnim dokazima koji se mogu pregledati.' }, { title: 'Jasno ovlašćenje', body: 'Održite ljudsku odgovornost i dozvolu vidljivim.' }, { title: 'Zapis odluke', body: 'Sačuvajte osnov svake pauze, oslobađanja ili eskalacije.' } ],
      systemEyebrow: 'Povezani sistem odlučivanja', systemTitle: 'Od izvršenja do upravljane akcije.', systemBody: 'Axis One pretvara fragmentirane izveštaje u kontrolisani sled koji čuva kontekst i odgovornost.', sequence: ['Prekretnica', 'Dokaz', 'Validacija', 'Ovlašćenje', 'Odluka'],
      deploymentEyebrow: 'Uvođenje', deploymentTitle: 'Počnite jednom stvarnom odlukom. Širite nakon dokaza.', deploymentBody: 'Izaberite najmanji operativni obim koji može da proizvede verodostojan rezultat.', packages: sharedPackages('Definišite jednu predstojeću kapitalnu odluku sa ograničenom grupom učesnika.', 'Vodite jedan program sa povezanim prekretnicama, dokazima i ovlašćenjima.', 'Proširite dokazani obrazac upravljanja na više programa.'),
      boundaryEyebrow: 'Poverenje kroz jasne granice', boundaryTitle: 'Axis One upravlja odlukom. Nikada ne drži novac.', boundaryBody: 'Čuvanje i prenos ostaju kod ovlašćenih eksternih finansijskih pružalaca. Axis One čuva spremnost, odgovornost i zapis odluke.',
      ctaEyebrow: 'Primenite granicu', ctaTitle: 'Donesite jednu stvarnu kapitalnu odluku.', ctaBody: 'Podelite dovoljno konteksta za koristan prvi razgovor. Ništa se ne šalje dok ne odlučite da otvorite svoju e-poštu.', cta: 'Pokrenite upit',
    },
    footer: { explore: 'Istražite', company: 'Kompanija', home: 'Početna', founder: 'Osnivačica', email: 'Pošaljite e-poštu Axis One-u', contact: 'Kontaktirajte Axis One', kicker: 'Infrastruktura upravljanja kapitalom', title: 'Kapital kojim upravlja izvršenje.', body: 'Axis One povezuje angažovani kapital, potvrđene prekretnice, pripisive dokaze i kontrolisane odluke.', operatingCompany: 'Operativna kompanija', nonCustodial: 'Bez čuvanja kapitala po dizajnu', boundary: 'Axis One ne drži, prenosi, upravlja niti garantuje kapital klijenta. Ovlašćeni eksterni finansijski pružaoci izvršavaju prenose.', rights: 'Sva prava zadržana.', englishNotice: 'Pravni dokumenti su dostupni na engleskom jeziku.' },
  },
  ar: {
    code: 'ar', hreflang: 'ar', htmlLang: 'ar', dir: 'rtl', label: 'العربية',
    nav: { why: 'لماذا Axis One', system: 'النظام', exposure: 'التعرّض للقرار', trust: 'الثقة', deployment: 'التطبيق', frame: 'تحديد القرار', menu: 'القائمة', navigation: 'التنقل', close: 'إغلاق قائمة التنقل', skip: 'الانتقال إلى المحتوى الرئيسي' },
    page: {
      eyebrow: 'بنية تحتية لحوكمة رأس المال', title: 'رأس مال تحكمه نتائج التنفيذ.', intro: 'تربط Axis One رأس المال الملتزم به بالمراحل المتحقق منها والأدلة المنسوبة وحالات القرار المنضبطة، من دون الاحتفاظ بأموال العميل.', primary: 'تحديد قرار', secondary: 'اكتشف آلية العمل',
      whyEyebrow: 'لماذا Axis One', whyTitle: 'اجعل الإجراء الرأسمالي التالي قابلاً للدفاع.', whyBody: 'يربط الموقف الجاهز للقرار بين ما تغيّر وما يثبته ومن يتحمل المسؤولية ومن يملك صلاحية التصرف.', principles: [ { title: 'الحالة الحالية', body: 'اعرف ما تغيّر منذ الموافقة على رأس المال.' }, { title: 'أدلة منسوبة', body: 'اربط كل ادعاء بدليل حديث وقابل للمراجعة.' }, { title: 'صلاحية واضحة', body: 'أبقِ المسؤولية البشرية والإذن ظاهرين.' }, { title: 'سجل القرار', body: 'احفظ أساس كل إيقاف أو إفراج أو تصعيد.' } ],
      systemEyebrow: 'نظام قرارات مترابط', systemTitle: 'من التنفيذ إلى الإجراء المحكوم.', systemBody: 'تحوّل Axis One التقارير المتفرقة إلى تسلسل منضبط يحفظ السياق والمساءلة.', sequence: ['مرحلة', 'دليل', 'تحقق', 'صلاحية', 'قرار'],
      deploymentEyebrow: 'التطبيق', deploymentTitle: 'ابدأ بقرار حقيقي واحد. توسّع بعد إثبات النتيجة.', deploymentBody: 'اختر أصغر نطاق تشغيلي يمكنه إنتاج نتيجة موثوقة.', packages: sharedPackages('حدّد قراراً رأسمالياً قريباً مع مجموعة محددة من أصحاب المصلحة.', 'شغّل برنامجاً واحداً بمراحل وأدلة وصلاحيات مترابطة.', 'وسّع نمط حوكمة مثبتاً عبر عدة برامج.'),
      boundaryEyebrow: 'الثقة عبر حدود واضحة', boundaryTitle: 'تحكم Axis One القرار، ولا تحتفظ بالأموال أبداً.', boundaryBody: 'تبقى الحفظ والتحويل لدى مزودي الخدمات المالية الخارجيين المرخصين. وتحفظ Axis One الجاهزية والمسؤولية وسجل القرار.',
      ctaEyebrow: 'طبّق الحد', ctaTitle: 'أحضر قراراً رأسمالياً حقيقياً واحداً.', ctaBody: 'شارك سياقاً كافياً لمحادثة أولى مفيدة. لا يُرسل شيء حتى تختار فتح بريدك الإلكتروني.', cta: 'بدء استفسار',
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
