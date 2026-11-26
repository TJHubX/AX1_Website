import React from 'react';
import type { PageProps } from '../components';
import { Footer } from '../components';
import LegalPageLayout from '../components/LegalPageLayout';

export default function PrivacyPage({ onOpenContact }: PageProps) {
  return (
    <>
      <LegalPageLayout
        label="Privacy"
        title="Privacy Policy"
        lastUpdated="26 November 2026"
        intro="This policy explains how AX1 Structura Ltd handles personal information in connection with the public Axis One website, enquiries, professional relationships and business development. Separate product or client-specific notices may apply to a contracted engagement."
        onContact={() => onOpenContact({ source: 'privacy_policy' })}
        sections={[
          {
            heading: 'Controller and contact',
            paragraphs: [
              'AX1 Structura Ltd is the controller for personal information covered by this policy. The company is registered in England and Wales under company number 17151320, with its registered office at 66 Paul Street, London EC2A 4NA, England.',
              <>Privacy questions and rights requests can be sent to <a href="mailto:info@ax1.capital?subject=Data%20protection%20request">info@ax1.capital</a>. Please use the subject “Data protection request” so it can be identified promptly.</>,
            ],
          },
          {
            heading: 'Information you choose to provide',
            paragraphs: [
              'The Decision Brief and enquiry experiences are prepared in your browser. Axis One does not receive those entries merely because you type them on the website. Information is sent only if you choose to open your email client and send the prepared message, or contact us through another channel.',
              'An enquiry may include your name, work email, organisation, role, decision context, package interest and any other information you choose to include. Please do not include confidential, special-category or otherwise sensitive personal information unless it is necessary and you are authorised to share it.',
              'Providing this information is voluntary. If you choose not to provide contact details or sufficient context, we may be unable to respond to an enquiry or assess the requested engagement.',
            ],
          },
          {
            heading: 'Website and technical information',
            paragraphs: [
              'When you visit the website, hosting, network delivery and security infrastructure, including Cloudflare, may process routine request information such as IP addresses, browser and device details, timestamps, requested pages and security events. This information supports delivery, security, troubleshooting and service reliability.',
              'We may use aggregate service statistics to understand general usage and performance. The website includes local interface-event instrumentation. We have not enabled a connection from those public-site events to our business-development systems for visitor identification or sales outreach. The Decision Brief and enquiry tools do not submit their contents to those systems merely because you enter information.',
              'Before introducing additional analytics, business visitor identification or tracking, we will assess the applicable data-protection and electronic-communications rules, update our notices and implement any required consent or objection controls. The Cookie Policy explains the current website technology position.',
            ],
          },
          {
            heading: 'Professional contacts and business development',
            paragraphs: [
              'We process relevant business contact information to identify and assess potential business relationships, respond to professional communications, explore partnerships and communicate about our products and services. Information may include your name, professional contact details, employer, role, public professional profile, company characteristics, relevant business developments, communications and contact preferences.',
              'We obtain this information directly from you, referrals and professional communications, publicly accessible company websites, business announcements, official registers and professional networking platforms such as LinkedIn, and business information providers such as the Lemlist People Database and its enrichment services. We record the source where available and aim to keep professional information accurate and proportionate.',
              'We use business-development tools, including Lemlist, to organise records, identify relevant accounts and coordinate permitted communications. Research and prioritisation may be assisted by AI and account-level scoring, using business relevance, timing, role and documented commercial context. These tools inform business-development review; we do not use this processing to make solely automated decisions about individuals that have legal or similarly significant effects.',
              'Where information is obtained from another source, we provide the required privacy information within a reasonable period and no later than one month, or sooner at the first communication or disclosure where applicable, unless a lawful exception applies.',
            ],
          },
          {
            heading: 'Professional communication and measurement',
            paragraphs: [
              'We may contact relevant professionals through business email, professional networking channels and other permitted channels. We assess the applicable marketing rules separately from the lawful basis for processing personal information. The availability of a business contact address or public professional profile does not by itself establish permission to contact or track someone.',
              'Communication systems record delivery, bounce, reply and opt-out information. Where measurement features are enabled, they may also record email-open or link-click events, associated timestamps and technical information. These measurements are imperfect and do not establish that a person read a message or intends to buy. The use of measurement technologies is subject to separate electronic-communications requirements, including consent where required.',
              'You may object to direct marketing at any time, including any related profiling. We explain how to exercise that right below.',
            ],
          },
          {
            heading: 'Purposes and lawful bases',
            paragraphs: [
              'We assess an appropriate lawful basis for each processing purpose. Our main purposes and the bases that may apply are:',
            ],
            bullets: [
              'Responding to an enquiry and considering an engagement: taking steps at your request before entering a contract and, where appropriate, our legitimate interest in responding to relevant business enquiries.',
              'Maintaining professional correspondence and relationship records: our legitimate interest in managing business relationships and preserving an accurate record of material communications.',
              'Relevant B2B research, business-development assessment, professional communications and proportionate prioritisation: legitimate interests in identifying and developing business relationships where a documented assessment supports that basis and applicable marketing rules permit the activity; consent where required or otherwise relied upon.',
              'Website statistical measurement and communication measurement, where used: legitimate interests in improving a service where the applicable conditions are met, or consent where required. A data-protection lawful basis does not override separate device-storage, access or electronic-marketing rules.',
              'Managing privacy requests, complaints and marketing objections: compliance with legal obligations and, where appropriate, legitimate interests in maintaining a minimal suppression record to prevent unwanted contact.',
              'Delivering and securing the website: our legitimate interest in operating a reliable and secure public service, and compliance with a legal obligation where a specific security or record-keeping duty applies.',
              'Establishing, exercising or defending legal rights and meeting statutory duties: compliance with a legal obligation or our legitimate interest in protecting the company’s legal position, as applicable.',
            ],
          },
          {
            heading: 'Sharing and service providers',
            paragraphs: [
              'Cloudflare supports website hosting, delivery and security and separate business-development data infrastructure. Namecheap Private Email supports our business email and enquiry correspondence. Lemlist supports business contact records, research, communication and related workflows. Professional networking platforms, business-information providers and AI-assisted research and drafting tools may process limited information in connection with the relevant activity.',
              <>Providers may act as processors on our instructions or, for their own independently determined services, as separate controllers. We require appropriate contractual and security safeguards for processing on our behalf. For information about Lemlist’s own data handling, see its <a href="https://www.lemlist.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. Information may also be shared with professional advisers where necessary.</>,
              'We may disclose information where required by law, where necessary to protect legal rights, or in connection with a corporate transaction subject to appropriate confidentiality and data-protection safeguards.',
              'AX1 Structura Ltd does not sell personal information.',
            ],
          },
          {
            heading: 'International transfers',
            paragraphs: [
              'Some providers and authorised processing locations may be outside the United Kingdom or European Economic Area. Where applicable law requires a transfer safeguard, the relevant transfer must be covered by a permitted mechanism, such as an adequacy decision or regulation, applicable standard contractual clauses, the UK International Data Transfer Agreement or Addendum, together with the necessary transfer assessment. The use of an EU-located data store does not by itself establish that all processing remains in the EU.',
              <>You can ask for further information about the safeguard relevant to your information by emailing <a href="mailto:info@ax1.capital?subject=International%20transfer%20safeguards">info@ax1.capital</a>.</>,
            ],
          },
          {
            heading: 'Retention',
            paragraphs: [
              'Information typed into the Decision Brief or enquiry tools is not retained by Axis One unless you choose to send it. Enquiry correspondence that does not progress to an engagement is reviewed and normally deleted within 24 months of the last meaningful contact.',
              'Where an engagement or contractual relationship is established, material correspondence and business records are normally kept for the relationship and for up to six years afterwards where needed for contractual, accounting or legal purposes. Hosting and security records are retained only for the period required to operate and protect the website, according to the provider configuration and our documented retention schedule.',
              'Prospecting and business-development records are retained only while reasonably necessary for a relevant business relationship or opportunity. Retention is assessed by reference to the current role, relevance of the business context, the last meaningful interaction and any active engagement, objection or legal obligation. Unnecessary, outdated or incorrect records should be removed rather than retained indefinitely.',
              'We may retain a minimal record of an objection or unsubscribe for as long as necessary to respect that preference and prevent further unwanted marketing. This record is not used to restart outreach.',
              'A legal hold, active dispute or statutory requirement may justify a longer period. When information is no longer needed, it is deleted or irreversibly anonymised.',
            ],
          },
          {
            heading: 'Your rights',
            paragraphs: [
              'Subject to applicable law and any exemptions, you may ask for access to your personal information, correction, deletion, restriction, portability or information about how it is used. Where processing relies on consent, you may withdraw that consent at any time without affecting the lawfulness of processing before withdrawal. You may also object to processing as described separately below.',
              <>Send a request to <a href="mailto:info@ax1.capital?subject=Data%20protection%20request">info@ax1.capital</a>. We respond without undue delay and normally within one calendar month, subject to applicable rules for verification and permitted extensions. We may ask only for information reasonably needed to verify your identity or authority.</>,
            ],
          },
          {
            heading: 'Your right to object',
            emphasis: true,
            paragraphs: [
              <>You have the right to object at any time to our use of your personal information where we rely on legitimate interests. Tell us what processing you object to by emailing <a href="mailto:info@ax1.capital?subject=Objection%20to%20processing">info@ax1.capital</a>. We will stop the relevant processing unless we can demonstrate compelling legitimate grounds that override your interests, rights and freedoms, or the information is needed to establish, exercise or defend legal claims.</>,
              <>Your right to object to direct marketing is absolute. You can ask us to stop using your personal information for direct marketing, including related profiling, at any time. Email <a href="mailto:info@ax1.capital?subject=Stop%20direct%20marketing">info@ax1.capital</a>, use an available unsubscribe link or tell us through the channel we used. We will stop the relevant direct marketing across our channels and may retain only the information necessary to respect your preference.</>,
            ],
          },
          {
            heading: 'Data-protection complaints',
            paragraphs: [
              <>If you believe we have handled your personal information incorrectly, you can <a href="mailto:info@ax1.capital?subject=Data%20protection%20complaint">submit a data-protection complaint by email</a> or write to our registered office. You may also use the website enquiry option or contact us through an alternative accessible channel. Tell us what concerns you and, where possible, how we can help.</>,
              'We will acknowledge your complaint within 30 days, investigate it appropriately without undue delay, keep you informed of progress and communicate the outcome. We may request proportionate information to clarify the complaint or verify your authority where necessary.',
              <>You also have the right to complain to the <a href="https://ico.org.uk/make-a-complaint/data-protection-complaints/" target="_blank" rel="noopener noreferrer">UK Information Commissioner’s Office</a> or, where applicable, another competent supervisory authority. This does not limit any other statutory rights or remedies.</>,
            ],
          },
          {
            heading: 'Security and links',
            paragraphs: [
              'We use proportionate organisational and technical measures to protect personal information. No online service or transmission method can be guaranteed to be completely secure.',
              'The website may link to third-party services. Their privacy practices are governed by their own notices, not this policy.',
            ],
          },
          {
            heading: 'Changes to this policy',
            paragraphs: [
              'We may update this policy to reflect legal, operational or technical changes. The current version and effective date will remain available on this page.',
            ],
          },
        ]}
      />
      <Footer onOpenContact={onOpenContact} />
    </>
  );
}
