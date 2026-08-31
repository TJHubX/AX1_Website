# Processor and transfer register

Controller: AX1 Structura Ltd

Last reviewed: 31 August 2026

Owner: operational privacy owner

Do not mark a provider approved until the controller has verified the contract/DPA, current sub-processors, security information, deletion/return terms, assistance with rights and breaches, and any international-transfer mechanism.

| Provider | Service and data | Role | Transfer safeguard | Technical status | Contract evidence | Approval status |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare, Inc. | Pages hosting, content delivery and security; routine request and security metadata | Processor for relevant customer content under the public self-serve terms; may act as controller for limited account/service data under its own notice | DPA v6.4 includes EU SCC and UK Addendum provisions for restricted transfers | Pages active; Web Analytics disabled for Pages and `ax1.capital` zone on 30 August 2026 | Public Self-Serve Agreement and DPA verified on 31 August 2026; retain dated AX1 account applicability evidence | Public terms verified; account evidence pending |
| Namecheap, Inc. and affiliates, Private Email for `info@ax1.capital` | Receives enquiry and rights-request emails intentionally sent by a visitor | Public DPA identifies Namecheap as processor for customer data in covered hosted services; Private Email is listed in product-specific privacy details | Public DPA incorporates EEA SCCs and provisions for UK transfers; account-specific applicability and processing locations require controller review | Cloudflare DNS contains Private Email MX, SPF, DKIM, DMARC, mail, autodiscover and autoconfig records; controller confirmed the provider on 30 August 2026 | Public DPA and Private Email product entry verified on 31 August 2026; retain the AX1 contract/account evidence and complete the provider review | Public terms verified; account evidence pending |
| Professional advisers | Case-specific legal, accounting or security advice | Processor or independent controller depending on engagement | Confirm per engagement before disclosure | No routine website disclosure | Engagement terms required | Case-by-case |

## Cloudflare evidence

- Customer DPA: https://www.cloudflare.com/en-gb/cloudflare-customer-dpa/
- Self-Serve Subscription Agreement: https://www.cloudflare.com/terms/
- The public DPA is version 6.4, effective 3 April 2026, and states that it forms part of the applicable main agreement. The public Self-Serve Subscription Agreement incorporates the DPA by reference where covered personal data is processed.
- The DPA includes the EU Standard Contractual Clauses and UK Addendum provisions for restricted transfers.
- RUM/Web Analytics was found enabled during the 30 August 2026 audit and disabled to restore the stated privacy-first configuration.
- Historical Web Analytics data was not deleted as part of the configuration change; the controller should decide whether any existing account-level data requires separate deletion under its retention policy.

## Namecheap Private Email evidence

- Data Processing Addendum: https://www.namecheap.com/legal/universal/data-processing-addendum/
- Product-specific privacy details: https://www.namecheap.com/legal/general/details-for-specific-products-services/
- The public DPA, last revised 27 September 2021, supplements the terms governing covered hosted services and identifies Namecheap as processor for customer data processed on behalf of the customer.
- The product-specific privacy page explicitly lists Private Email. The DPA addresses security, data-subject assistance, sub-processors, EEA SCCs, UK-transfer provisions and service-specific deletion.
- Public terms do not establish which exact account terms AX1 accepted, the mailbox's configured retention practice or all operational processing locations. Those items remain subject to the controller review in DP-04 and DP-05.

## Provider onboarding gate

Before activating a provider that will process personal information, record:

1. legal name, service, processing location and role;
2. data categories, people, purpose and documented instructions;
3. DPA/controller terms and sub-processor mechanism;
4. transfer mechanism and transfer-risk assessment where required;
5. security controls, breach notification and rights-assistance commitments;
6. retention, deletion/return and exit arrangements; and
7. approving owner and approval date.
