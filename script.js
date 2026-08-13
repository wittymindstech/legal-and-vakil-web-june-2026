/**
 * Legal And Vakil - Main JS Logic
 * Core functionality for search, filters, pricing toggles, AI assistant, and modals.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. Data Definitions (Aligned with screenshots)
    // ==========================================================================
    
    const serviceData = {
        'marriage': {
            title: 'Marriage Consultation',
            category: 'legal',
            icon: 'fa-rings-wedding',
            image: 'assets/marriage.webp',
            shortDesc: 'Divorce, Alimony, Child Custody, Marriage Disputes',
            subtitle: 'Legal guidance for a stronger, legally secure relationship.',
            desc: 'Get expert guidance on marriage registration, prenuptial agreements, mutual separations, child custody, and domestic disputes. We help protect your rights and assets through professional legal counsel.',
            benefits: ['Hassle-free Marriage Registration', 'Legally valid prenups/postnups drafting', 'Empathetic mutual divorce counsel', 'Child custody & support advice', 'Protection against domestic violence', 'Confidential 1-on-1 expert support'],
            faqs: [
                { q: 'What documents are required for marriage registration?', a: 'You need proof of age (Aadhar, Birth Certificate), address proof, passport size photographs, and two witnesses with their identity cards.' },
                { q: 'Are prenuptial agreements legally binding in India?', a: 'In India, prenups are generally not enforceable as contracts under family law, but they can be used to show the intent of parties and divide assets if drafted correctly under the Indian Contract Act.' },
                { q: 'What is the fee for Marriage Counseling / Consultation?', a: 'Our Marriage Counseling sessions are priced at a highly discounted rate of ₹20 per minute (originally ₹99 per minute), allowing you to pay exactly for the time you consult.' }
            ]
        },
        'odr': {
            title: 'Online Dispute Resolution (ODR)',
            category: 'legal',
            icon: 'fa-laptop-code',
            image: 'assets/odr.webp',
            shortDesc: 'Resolve disputes online quickly & legally',
            subtitle: 'Fast-track legal resolution without visiting courts.',
            desc: 'Settle commercial, property, family or contractual disputes through online arbitration, mediation and conciliation. Legal, secure, and completed in a fraction of court times.',
            benefits: ['100% digital arbitration and mediation', 'Legally binding settlements', 'Saves up to 80% time and cost', 'Experienced neutral panel experts', 'Encrypted secure video hearings'],
            faqs: [
                { q: 'Is ODR legally valid?', a: 'Yes, settlement agreements reached through ODR are legally binding and enforceable under the Arbitration and Conciliation Act, 1996.' }
            ]
        },
        'challans': {
            title: 'Challans & Traffic Matters',
            category: 'legal',
            icon: 'fa-traffic-light',
            image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=600',
            shortDesc: 'Challan disputes, license issues, traffic violations',
            subtitle: 'Resolve traffic challans and vehicle disputes legally.',
            desc: 'Faced with a wrongful traffic challan or need representation in court for a vehicle-related offence? Get representation and legal guidance to clear your name and records.',
            benefits: ['Verify and dispute virtual challans online', 'Get represented in virtual court hearings', 'Resolve license suspension issues', 'Vehicular documentation audit'],
            faqs: [
                { q: 'Can I contest a traffic challan?', a: 'Yes, if you believe the traffic challan was wrongly issued, you can contest it in court or submit an appeal on the virtual traffic court portal.' }
            ]
        },
        'property': {
            title: 'Property Disputes',
            category: 'legal',
            icon: 'fa-house-chimney-crack',
            image: 'assets/property.webp',
            shortDesc: 'Property conflicts, ownership, rent agreements',
            subtitle: 'Secure your real estate investments and clear disputes.',
            desc: 'Comprehensive solutions for ancestral property disputes, tenant evictions, title verifications, builder delays, and RERA complaints. Our experts ensure your assets remain safe.',
            benefits: ['Certified Title Search reports', 'RERA builder arbitration and compliance', 'Legally drafted lease and sale deeds', 'Succession certificate assistance'],
            faqs: [
                { q: 'How do I verify a property title?', a: 'You must conduct a search in the Sub-Registrar\'s records for the past 30 years to check for encumbrances, claims, and verify the chain of title deeds.' }
            ]
        },
        'debt': {
            title: 'Debt & Loan Issues',
            category: 'legal',
            icon: 'fa-sack-dollar',
            image: 'assets/loan.webp',
            shortDesc: 'Loan recovery, settlements, financial disputes',
            subtitle: 'Settle outstanding debts and stop harassment.',
            desc: 'Struggling with loan repayments, credit card debts, or recovery agent harassment? Get professional settlement negotiations and legal notices drafted by expert financial lawyers.',
            benefits: ['Legal defense against recovery harassment', 'Debt restructuring and settlement options', 'DRT representation', 'Credit score rehabilitation advice'],
            faqs: [
                { q: 'What is my protection against recovery agents?', a: 'RBI guidelines prohibit recovery agents from harassing, threatening, or contacting you during odd hours. You can file a legal complaint and injunction against them.' }
            ]
        },
        'ip': {
            title: 'Intellectual Property',
            category: 'startup',
            icon: 'fa-lightbulb',
            image: 'assets/intellectual property.webp',
            shortDesc: 'Copyrights, Trademarks, Patents, IP Registration',
            subtitle: 'Protect your brand name, inventions, and creative assets.',
            desc: 'Full-service IP protection. We handle trademark searches & filings, copyright registrations, patent drafting, and IP infringement litigations to protect your business assets.',
            benefits: ['Trademark search & quick filing in 24 hours', 'Patent drafting and filing protection', 'Copyright registration for code/design/content', 'Cease & Desist legal notice drafts'],
            faqs: [
                { q: 'How long does a trademark registration take?', a: 'The trademark application is filed in 1 day, allowing you to use the "TM" symbol. The final registration certificate takes 8-12 months after trademark office scrutiny.' }
            ]
        },
        'business': {
            title: 'Business & Corporate Law',
            category: 'startup',
            icon: 'fa-briefcase',
            image: 'assets/company registration.webp',
            shortDesc: 'Company registration, contracts, legal compliance',
            subtitle: 'End-to-end setup and annual compliance for your business.',
            desc: 'Start your business as a Private Limited Company, LLP, or OPC. We draft contracts (founder agreements, NDA, vendor contracts) and manage ROC compliance to keep your company audit-ready.',
            benefits: ['Pvt Ltd / LLP incorporation in 10 days', 'Founder agreements and NDAs', 'ROC and annual filing compliance', 'GST & tax registration setups'],
            faqs: [
                { q: 'What is the minimum requirement to start a Pvt Ltd?', a: 'You need minimum 2 directors (one must be Indian resident), 2 shareholders, and a registered office address proof.' }
            ]
        },
        'pvt-ltd': {
            title: 'Private Limited Company Registration',
            category: 'startup',
            icon: 'fa-building',
            image: 'assets/company registration.webp',
            shortDesc: 'Most popular corporate entity structure for startups',
            subtitle: 'The most popular legal structure for startups and growing businesses.',
            desc: 'A Private Limited Company is the most preferred business entity in India. It offers limited liability protection to its shareholders, the ability to raise equity funds, separate legal status, and perpetual existence.',
            benefits: [
                'Limited Liability Protection',
                'Access to Funding & Venture Capital',
                'Separate Legal Entity Status',
                'Higher Credibility & Brand Value',
                'Easy Transferability of Shares',
                'Perpetual Existence'
            ],
            faqs: [
                { q: 'What are the minimum requirements to register a Private Limited Company in India?', a: 'Minimum 2 directors, 2 shareholders, and a registered office address in India. At least one director must be an Indian resident.' },
                { q: 'How long does it take to register a Private Limited Company?', a: 'Typically, the entire process takes about 7 to 10 working days, subject to government processing and name approval times.' }
            ]
        },
        'llp': {
            title: 'LLP Registration',
            category: 'startup',
            icon: 'fa-handshake',
            image: 'assets/company registration.webp',
            shortDesc: 'Combine partnership flexibility with limited liability',
            subtitle: 'Combine the benefits of a partnership firm and a company structure.',
            desc: 'LLP registration is ideal for professional service providers, small businesses, and partners that do not require venture capital funding. It offers limited liability protection and has fewer compliance requirements compared to a Private Limited Company.',
            benefits: [
                'No Minimum Capital Requirement',
                'Limited Liability Protection',
                'Fewer Compliance Audits',
                'No Corporate Tax on Distributed Profit',
                'Easy to Manage and Operate',
                'Lower Registration Cost'
            ],
            faqs: [
                { q: 'What is the main difference between a Partnership and an LLP?', a: 'Unlike a traditional partnership, partners in an LLP have limited liability, meaning their personal assets are protected from business debts. Also, an LLP is a separate legal entity.' },
                { q: 'Is audit mandatory for an LLP?', a: 'Audit is mandatory only if the annual turnover exceeds Rs. 40 Lakhs or the contribution exceeds Rs. 25 Lakhs.' }
            ]
        },
        'opc': {
            title: 'One Person Company (OPC) Registration',
            category: 'startup',
            icon: 'fa-user-tie',
            image: 'assets/company registration.webp',
            shortDesc: 'Run a corporate entity with sole ownership',
            subtitle: 'Run a corporate entity with sole ownership and limited liability.',
            desc: 'OPC is a hybrid structure that combines the sole proprietor model with a Private Limited Company structure. It allows a single founder to operate a corporate entity with limited liability protection and full control.',
            benefits: [
                'Single Owner Control',
                'Limited Liability Protection',
                'Separate Legal Entity',
                'Easy Financing from Banks',
                'Sole Succession via Nominee',
                'Organized Corporate Structure'
            ],
            faqs: [
                { q: 'Who can register a One Person Company?', a: 'Only a natural person who is an Indian citizen and resident in India is eligible to incorporate an OPC and act as a nominee.' },
                { q: 'Can an OPC have more than one director?', a: 'Yes, an OPC can have up to 15 directors, but it can only have one shareholder/member.' }
            ]
        },
        'public-ltd': {
            title: 'Public Limited Company Registration',
            category: 'startup',
            icon: 'fa-city',
            image: 'assets/company registration.webp',
            shortDesc: 'Scale your business with public shareholding',
            subtitle: 'Scale your business with the power of public shareholding and investment.',
            desc: 'A Public Limited Company is a corporate entity registered under the Companies Act, which can raise funds from the general public and issue shares. It is suitable for large-scale operations requiring substantial capital.',
            benefits: [
                'Public Funding & Share Capital',
                'High Corporate Credibility',
                'Uncapped Number of Shareholders',
                'Transferable Shares & Listing Option',
                'Greater Borrowing Power',
                'Growth and Expansion Opportunities'
            ],
            faqs: [
                { q: 'What are the minimum requirements to register a Public Limited Company?', a: 'You need minimum 3 directors, 7 shareholders, and a registered office address. There is no minimum capital requirement as per recent amendments.' },
                { q: 'Can a Public Limited Company list on the stock exchange?', a: 'Yes, a Public Limited Company can list its shares on BSE/NSE through an Initial Public Offering (IPO) after satisfying SEBI guidelines.' }
            ]
        },
        'section-8': {
            title: 'Section 8 Company Registration',
            category: 'startup',
            icon: 'fa-hands-holding-child',
            image: 'assets/company registration.webp',
            shortDesc: 'Establish a non-profit organization or NGO',
            subtitle: 'Establish a non-profit organization or NGO under corporate guidelines.',
            desc: 'A Section 8 Company is registered for promoting charitable causes, art, science, sports, education, research, social welfare, or environmental protection, where any profits are reinvested back into the promotion of these activities.',
            benefits: [
                'Exemption from using "Limited" suffix',
                'Tax Exemptions for Donors (80G) and NGO',
                'Separate Legal Entity status',
                'No Minimum Capital Requirement',
                'Credibility for Foreign Funding (FCRA)',
                'Perpetual Succession'
            ],
            faqs: [
                { q: 'Can profits be distributed as dividend in a Section 8 Company?', a: 'No, distribution of any profits or dividends to shareholders or directors is strictly prohibited.' },
                { q: 'How many people are required to start a Section 8 Company?', a: 'Minimum of 2 people are required to register a Section 8 Company.' }
            ]
        },
        'nidhi': {
            title: 'Nidhi Company Registration',
            category: 'startup',
            icon: 'fa-piggy-bank',
            image: 'assets/company registration.webp',
            shortDesc: 'Start a mutual benefit financial institution',
            subtitle: 'Start a mutual benefit financial institution for lending and savings.',
            desc: 'Nidhi Company is a class of Non-Banking Financial Company (NBFC) that facilitates thrift, savings, and lending amongst its members. It works on the principle of mutual benefit and is regulated by the Ministry of Corporate Affairs.',
            benefits: [
                'Easy borrowing and lending for members',
                'Lower rate of interest than informal lenders',
                'No external intervention (members only)',
                'Safe and secure savings channel',
                'Low capital requirement compared to NBFCs',
                'Easy management structure'
            ],
            faqs: [
                { q: 'Can a Nidhi Company do microfinance or general banking business?', a: 'No, Nidhi Companies can only accept deposits from and lend loans to their registered members. They cannot issue credit cards, run insurance business, or do general banking.' },
                { q: 'What are the minimum membership requirements?', a: 'Within one year of registration, a Nidhi Company must have at least 200 members.' }
            ]
        },
        'subsidiary': {
            title: 'Indian Subsidiary Registration',
            category: 'startup',
            icon: 'fa-globe',
            image: 'assets/company registration.webp',
            shortDesc: 'Establish a subsidiary of your foreign company',
            subtitle: 'Establish a branch or subsidiary of your foreign company in India.',
            desc: 'An Indian Subsidiary is a foreign business entity incorporated as a Private Limited Company in India. It enables foreign companies to conduct operations, hire talent, and invest in the rapidly growing Indian market.',
            benefits: [
                '100% FDI allowed in many sectors',
                'Separate legal entity in India',
                'Limited liability for parent company',
                'Access to skilled Indian talent pool',
                'Legal protection under Indian corporate law',
                'Simplified repatriation of profits'
            ],
            faqs: [
                { q: 'Does a foreign subsidiary need an Indian director?', a: 'Yes, at least one director on the board of the Indian Subsidiary must be an Indian citizen and resident.' },
                { q: 'Can a foreign parent company hold 100% shares of the Indian Subsidiary?', a: 'Yes, under the automatic route of FDI, a foreign company can own 100% of the equity shares of the Indian Subsidiary in most sectors.' }
            ]
        },
        'din-kyc': {
            title: 'Director DIN e KYC Update',
            category: 'startup',
            icon: 'fa-id-card',
            image: 'assets/company registration.webp',
            shortDesc: 'DIN KYC Status Check, eKYC Update & DIR-3 KYC Filing',
            subtitle: 'DIN KYC Status Check, eKYC Update & DIR-3 KYC Filing, Updates and Compliance Assistance',
            desc: 'As per Ministry of Corporate Affairs, it is mandatory for all Directors/Partners to file DIR 3 KYC form (e-kyc) before 30th Sep’21 else Rs. 5000 to be paid as penalty. Director identification number (DIN) is a unique identification number given to a person wanting to be a director or an existing director of a company. In this digitised era, application in eForm DIR-3 was sufficient to obtain DIN. This was a one-time process for any person who wants to be a director in one or more companies. However, now with the move of the Ministry of Corporate Affairs (MCA) to update its registry, all directors with a DIN will have to submit their KYC details annually in eForm DIR-3 KYC.',
            benefits: [
                'Avoid Rs. 5,000 Penalty',
                'Keep DIN Status Active',
                'Ensure Annual Corporate Registry Compliance',
                'Quick Mobile & Email OTP Verification',
                'Expert Assistance in DSC Registration'
            ],
            documents: [
                { name: 'PAN of Director', icon: 'fa-id-card' },
                { name: 'Proof of permanent address (Latest Bank Statement/ Latest Mobile or Electricity Bill)', icon: 'fa-location-dot' },
                { name: 'Copy of Aadhaar Card (Mandatory for Indian Director)', icon: 'fa-id-badge' },
                { name: 'Copy of passport if they have the same', icon: 'fa-passport' },
                { name: 'Mobile No (will need OTP for Verification)', icon: 'fa-mobile' },
                { name: 'Email (will need OTP for Verification)', icon: 'fa-envelope' },
                { name: 'Digital Signature of Director', icon: 'fa-file-signature' }
            ],
            faqs: [
                { q: 'What is the due date for filing DIR-3 KYC?', a: 'Every director allotted a DIN must file DIR-3 KYC annually by 30th September of the immediate next financial year.' },
                { q: 'What happens if I fail to file DIR-3 KYC?', a: 'The MCA will deactivate the DIN with the status "Deactivated due to non-filing of DIR-3 KYC". To reactivate the DIN, you must pay a late filing penalty fee of Rs. 5,000.' }
            ]
        },
        'appointment-director': {
            title: 'Appointment of Director',
            category: 'startup',
            icon: 'fa-user-plus',
            image: 'assets/company registration.webp',
            shortDesc: 'Process under Companies Act, 2013',
            subtitle: 'New Director Appointment – Director Appointment Process under Companies Act, 2013',
            desc: 'A Company may appoint a new Director for several reasons. Sometimes it is because of hiring new expertise on the board or for the requirement of the company’s shareholders. The recommended panel of Online Legal India will complete the procedure of the Director’s Appointment following the MoA-AoA of the particular company & the Section 2(34) provisions of the Companies Act, 2013. Complete the Process of Appointment of Director through 360° Online Assistance within the Quickest at an Unbeatable Price from India’s Recommended Panel.',
            benefits: [
                'Board Resolution & Consent Letters Drafting',
                'Complete Form DIR-2 & DIR-12 Filings',
                'Ensure MoA & AoA Provisions Compliance',
                'Procuring DIN & DSC for the Proposed Director',
                'Official Registrar of Companies (ROC) Updates'
            ],
            documents: [
                { name: 'Passport size photograph of the new Director', icon: 'fa-camera' },
                { name: 'PAN Card of the new Director', icon: 'fa-id-card' },
                { name: 'Aadhaar Card / Identity proof', icon: 'fa-id-badge' },
                { name: 'Address Proof (Electricity bill/Bank statement)', icon: 'fa-location-dot' },
                { name: 'Digital Signature Certificate (DSC)', icon: 'fa-file-signature' },
                { name: 'Consent Letter (Form DIR-2)', icon: 'fa-file-signature' }
            ],
            faqs: [
                { q: 'How many directors can a Private Limited Company have?', a: 'Under the Companies Act, 2013, a Private Limited Company must have at least 2 directors and can have up to 15 directors.' },
                { q: 'What is DIR-2 and DIR-12?', a: 'DIR-2 is the consent form signed by the proposed director, while DIR-12 is the e-form filed with the Registrar of Companies (ROC) to record the appointment.' }
            ]
        },
        'removal-director': {
            title: 'Removal of Director',
            category: 'startup',
            icon: 'fa-user-minus',
            image: 'assets/company registration.webp',
            shortDesc: 'Process under Companies Act, 2013',
            subtitle: 'Removal of a Director’s Process - Filing & Compliance Assistance',
            desc: 'Get 360° Online Assistance in the Complete & Quick Director Removal Process under Companies Act, 2013. We handle DIR-11 and DIR-12 filings to ensure seamless compliance.',
            benefits: [
                'Board Resolution & Special Resolution Drafting',
                'Form DIR-11 & DIR-12 Preparation & Filings',
                'Legal compliance under the Companies Act, 2013 guidelines',
                'Verification of Digital Signature Certificate (DSC)',
                'Coordination with the Registrar of Companies (ROC)'
            ],
            documents: [
                { name: 'Resignation Letter of the concerned Director (Form DIR-11)', icon: 'fa-file-signature' },
                { name: 'Digital Signature Certificate of the concerned Director (Form DIR-11)', icon: 'fa-file-signature' },
                { name: 'Resignation Letter of the concerned Director (Form DIR-12)', icon: 'fa-file-signature' },
                { name: 'Board Resolution regarding the Removal of Director process (Form DIR-12)', icon: 'fa-file-signature' }
            ],
            faqs: [
                { q: 'What is DIR-11 and DIR-12 for Director Removal?', a: 'DIR-11 is the notice of resignation filed by the director, while DIR-12 is the notification of change on the board filed by the company with the Registrar.' },
                { q: 'Can a director be removed without their consent?', a: 'Yes, shareholders can remove a director before the expiry of their tenure by passing an ordinary resolution, subject to the provisions of Section 169 of the Companies Act, 2013.' }
            ]
        },
        'pvt-ltd-winding-up': {
            title: 'Pvt. Ltd. Winding up',
            category: 'startup',
            icon: 'fa-rectangle-xmark',
            image: 'assets/company registration.webp',
            shortDesc: 'Close LLP / Company Online & Registrar Compliance Assistance',
            subtitle: 'LLP Winding Up & Registrar Compliance Assistance',
            desc: 'Get 360° Online Assistance from India’s Recommended Expert Panel in the Complete & Quick LLP Closure and Winding Up Process. As per the provisions of the Ministry of Corporate Affairs (MCA) & Registrars of Companies (ROC), the required documents and activities are managed digitally.',
            benefits: [
                'Fast-track winding up and closure filings',
                'Complete documentation and review by experts',
                'ROC & MCA portal notification coordination',
                'Indemnity Bond and affidavit drafting support',
                'Securing necessary Regulatory NOCs'
            ],
            documents: [
                { name: 'DSC of the authorized Partner', icon: 'fa-file-signature' },
                { name: 'NOC (If the LLP is associated with any regulatory body)', icon: 'fa-shield' },
                { name: 'PAN Card of the LLP & the Partners of that entity', icon: 'fa-id-card' },
                { name: 'Aadhaar Card of the LLP Partners', icon: 'fa-id-badge' },
                { name: 'Copy of LLP Agreement', icon: 'fa-file-contract' },
                { name: 'Acknowledgement of the Partners regarding closure of the LLP', icon: 'fa-signature' },
                { name: 'Address Proof of all the Partners', icon: 'fa-location-dot' },
                { name: 'Indemnity Bond signed by the Partner(s)', icon: 'fa-file-signature' },
                { name: 'Copy of authority to make the application duly signed by all the Partners', icon: 'fa-file-signature' },
                { name: 'Copy of Acknowledgement of latest Income-tax Return', icon: 'fa-file-invoice' },
                { name: 'Affidavit signed by the designated Partners [sub-clause(b) of clause (II) of sub-rule (1A) to rule 37]', icon: 'fa-file-signature' }
            ],
            faqs: [
                { q: 'Under what rule is LLP closure filed?', a: 'LLP closure is filed under Rule 37 of the LLP Rules, 2009, which allows an inactive LLP to apply for striking off its name.' },
                { q: 'Is it mandatory to file tax returns before closure?', a: 'Yes, the latest income tax return acknowledgement must be submitted as part of the closure application.' }
            ]
        },
        'increase-authorized-capital': {
            title: 'Increase Authorized Capital',
            category: 'startup',
            icon: 'fa-arrow-trend-up',
            image: 'assets/company registration.webp',
            shortDesc: 'Increase Authorized Capital in a Company',
            subtitle: 'Increase Authorized Capital in a Company | Expert Assistance, Fees & Stamp Duty',
            desc: 'Get 360° Online Assistance for Increasing Authorized Capital of your Company by following the best regulatory standards. The alteration in the company’s MoA, AoA, and increase in the Authorized Capital should be informed to the Registrar of Companies (ROC) and the Ministry of Corporate Affairs (MCA).',
            benefits: [
                'Checking & amending the AoA capital clauses',
                'Organizing Board Meetings & Extraordinary General Meetings (EGM)',
                'Drafting shareholder special resolutions',
                'Filing Form SH-7 with the MCA',
                'Adapting MoA Capital Clause structures'
            ],
            documents: [
                { name: 'Documented AoA of the Company (with Capital Increase clause)', icon: 'fa-file-contract' },
                { name: 'Board Meeting Resolution to approve the capital increase', icon: 'fa-file-signature' },
                { name: 'Shareholders’ Approval Special Resolution copy', icon: 'fa-file-signature' },
                { name: 'Amended MoA showing the increased capital details', icon: 'fa-file-lines' },
                { name: 'Official Form filing with the Registrar of Companies (ROC)', icon: 'fa-building-columns' }
            ],
            faqs: [
                { q: 'What is Authorized Capital?', a: 'Authorized Capital is the maximum amount of share capital that a company is authorized by its constitutional documents to issue to shareholders.' },
                { q: 'Which MCA form is filed for increasing capital?', a: 'Form SH-7 must be filed with the Registrar of Companies (ROC) within 30 days of passing the resolution for increasing authorized capital.' }
            ]
        },
        'registered-office-change': {
            title: 'Registered Office Change',
            category: 'startup',
            icon: 'fa-map-location-dot',
            image: 'assets/company registration.webp',
            shortDesc: 'Registered Workplace Address Changing Assistance',
            subtitle: 'Change Your Registered Office Address – Filing & Compliance Assistance',
            desc: 'Get 360° Online Assistance in Renaming Your Registered Workplace at an Unbeatable Price! Whether you are changing the address within the same city, to a different city in the same state, or to another state, we handle all ROC documentation.',
            benefits: [
                'INC-22 Form Drafting and Submission',
                'Board Resolution and advertisement drafts (if state changes)',
                'Verification of location ownership/tenancy documents',
                'Updating address with government portals',
                'Hassle-free, quick ROC address updating'
            ],
            documents: [
                { name: 'The proof of owning the Business Location in the name of the company', icon: 'fa-file-invoice' },
                { name: 'If the workplace is taken on Rent / Lease, the Legal Document for the same', icon: 'fa-file-contract' },
                { name: 'In case the property is owned by a Director, valid documents permitting the Company to use the Location', icon: 'fa-file-signature' }
            ],
            faqs: [
                { q: 'Can we change the registered office outside the state?', a: 'Yes, shifting the office to another state requires a special resolution, alteration of the MoA, and approval from the Regional Director.' },
                { q: 'What is Form INC-22?', a: 'INC-22 is the official form filed with the MCA to notify the Registrar of Companies about the change in the company\'s registered office address.' }
            ]
        },
        'change-company-name': {
            title: 'Change Company Name',
            category: 'startup',
            icon: 'fa-signature',
            image: 'assets/company registration.webp',
            shortDesc: 'Change of Company Name with Expert Filing & Compliance',
            subtitle: 'Change of Company Name in India with Expert Filing & Compliance Support',
            desc: 'Get Complete Guidance from the Country’s Recommended Expert Panel for your Company’s Name Changing process | Quickest Service at an Unbeatable Price! We verify name availability, draft resolutions, and file MCA form RUN and MGT-14.',
            benefits: [
                'Name availability verification on MCA database',
                'RUN (Reserve Unique Name) application filing',
                'MGT-14 & INC-24 form submission assistance',
                'Amended MoA and AoA documentation',
                'Procuring new Certificate of Incorporation'
            ],
            documents: [
                { name: 'Company Incorporation Certificate', icon: 'fa-file-invoice' },
                { name: 'Suggested New Names for the Company List', icon: 'fa-list-ol' },
                { name: 'List of the Company’s Director(s) and Shareholders', icon: 'fa-users' },
                { name: 'Digital Signature of the Director(s)', icon: 'fa-file-signature' },
                { name: 'Company’s MOA & AOA statement', icon: 'fa-file-lines' }
            ],
            faqs: [
                { q: 'Is a special resolution required for changing name?', a: 'Yes, a special resolution must be passed by shareholders in an Extraordinary General Meeting (EGM) to change the company name.' },
                { q: 'Does changing the name affect the company\'s legal entity?', a: 'No, changing the company name does not affect its rights, obligations, or legal identity; all legal proceedings will continue in the new name.' }
            ]
        },
        'moa-amendment-pvt': {
            title: 'MOA Amendment of Pvt. Ltd.',
            category: 'startup',
            icon: 'fa-file-pen',
            image: 'assets/company registration.webp',
            shortDesc: 'Pvt. Ltd. MOA Amendment Filing & Compliance',
            subtitle: 'Private Limited Company MOA Amendment | Expert Filing & Compliance Support',
            desc: 'Get Step by Step Online Assistance in MOA Amendment Process of a Pvt Ltd Company at an Unbeatable Price! A Board Meeting should be organized by the company to approve the MOA Amendment from the Board of Directors.',
            benefits: [
                'EGM special resolution drafting support',
                'Objects Clause, Capital Clause, or Name Clause changes',
                'Filing Form MGT-14 with Registrar of Companies (ROC)',
                'Legal advisory on Memorandum changes',
                'Board and shareholder resolution documentation'
            ],
            documents: [
                { name: 'Board Meeting Resolution to approve the MOA Amendment', icon: 'fa-file-signature' },
                { name: 'Shareholders’ Approval and Special Resolution copy', icon: 'fa-file-signature' },
                { name: 'Documentation of the Amended Memorandum of Association', icon: 'fa-file-lines' }
            ],
            faqs: [
                { q: 'What is the Memorandum of Association (MOA)?', a: 'The MOA is the charter document of a company that defines its constitution, scope of power, and relationship with the outside world.' },
                { q: 'Within how many days should Form MGT-14 be filed?', a: 'Form MGT-14 must be filed with the ROC within 30 days of passing the special resolution in the shareholders\' meeting.' }
            ]
        },
        'moa-amendment-sec8': {
            title: 'MOA Amendment of Section 8',
            category: 'startup',
            icon: 'fa-file-shield',
            image: 'assets/company registration.webp',
            shortDesc: 'Section 8 Company MOA Amendment with Expert Assistance',
            subtitle: 'Memorandum of Association (MOA) Amendment for Section 8 Company with Expert Assistance',
            desc: 'Get 360° Online Assistance in Section 8 Company MOA Amendment at an Unbeatable Price! A Board Meeting of the Section-8 company should be organized to approve the MOA Amendment from the managing authority.',
            benefits: [
                'Specialized non-profit object clause advisory',
                'Filing with the regional director and ROC',
                'Drafting board resolution and special resolutions',
                'Securing necessary regulatory clearance',
                'Updating amended MOA records'
            ],
            documents: [
                { name: 'Board Meeting Resolution copy from managing authority', icon: 'fa-file-signature' },
                { name: 'Director’s Approval / Special Resolution of the Section 8 company', icon: 'fa-file-signature' },
                { name: 'Documentation of the Amended MOA', icon: 'fa-file-lines' }
            ],
            faqs: [
                { q: 'Does Section 8 MOA amendment require government approval?', a: 'Yes, any amendment to the object clause of a Section 8 Company requires prior approval of the Regional Director / Central Government.' },
                { q: 'What is the role of ROC in Section 8 MOA Amendment?', a: 'Once the Regional Director approves the amendment, the company must file the approved order with the ROC via Form INC-28 and MGT-14.' }
            ]
        },
        'moa-amendment-public': {
            title: 'MOA Amendment of Public Limited',
            category: 'startup',
            icon: 'fa-file-signature',
            image: 'assets/company registration.webp',
            shortDesc: 'Memorandum of Association Amendment for Public Ltd',
            subtitle: 'MOA Amendment for Public Limited Companies with Expert Assistance',
            desc: 'Get Step by Step Professional Assistance in Memorandum of Association Amendment Process at an Unbeatable Price! A Board Meeting should be organized by the Public Limited Company to approve the MOA Amendment from the Board of Directors.',
            benefits: [
                'Board Meeting coordination and resolution drafting',
                'Shareholders\' EGM special resolution processing support',
                'Official Form MGT-14 filing preparation',
                'Drafting modified Object, Capital or Name clauses in MOA',
                'ROC compliance and MCA portal synchronization'
            ],
            documents: [
                { name: 'Board meeting resolution to alter MOA', icon: 'fa-file-signature' },
                { name: 'Special resolution passed by shareholders', icon: 'fa-file-signature' },
                { name: 'Amended Memorandum of Association copy', icon: 'fa-file-lines' }
            ],
            faqs: [
                { q: 'Is shareholder approval required to alter the MOA?', a: 'Yes, a special resolution must be passed by shareholders in a general meeting to alter any clause of the MOA.' },
                { q: 'What is the filing timeframe for MOA amendment?', a: 'The company must file Form MGT-14 with the Registrar of Companies within 30 days of passing the special resolution.' }
            ]
        },
        'share-transfer': {
            title: 'Share Transfer',
            category: 'startup',
            icon: 'fa-arrow-right-arrow-left',
            image: 'assets/company registration.webp',
            shortDesc: 'Company Share Transfer & Share Transfer Deed Assistance',
            subtitle: 'Company Share Transfer in India | Share Transfer Deed Assistance',
            desc: 'Get Your Share Transfered at lowest fees. Online Legal India is an MCA (Ministry of Corporate Affairs) & MSME registered company in India. Our experienced team will draft & complete all the documentations on the same day. In India, the ownership of a Private Limited Company is determined by the shareholding of the Company. The shares of the Company are transferred in order to admit new investors or to transfer the ownership of the Company. The shares or debentures are ‘movable property’ and are transferable in accordance with the Articles of Association of the Company. Hence, the Articles of Association of the Company must be reviewed prior to beginning the share transfer procedure. In order to transfer shares between two or more persons they must enter into a contract or arrangement.',
            benefits: [
                'Drafting and execution of Share Transfer Deed (Form SH-4)',
                'Review of Articles of Association (AoA) for transfer restrictions',
                'Verification and payment of applicable share transfer stamp duty',
                'Endorsement and issue of new share certificates',
                'Updating Register of Members of the company'
            ],
            documents: [
                { name: 'Copy of the transferor\'s original share certificate', icon: 'fa-file-invoice' },
                { name: 'Authenticated copy of PAN card of the transferor(s) (sellers) and transferee(s) (buyers)', icon: 'fa-id-card' },
                { name: 'A duly filled and signed Form SH-4', icon: 'fa-file-signature' }
            ],
            faqs: [
                { q: 'How is share transfer stamp duty calculated?', a: 'Stamp duty on transfer of shares is currently 0.015% of the total market value of the shares being transferred.' },
                { q: 'Which form is used for transfer of shares?', a: 'Form SH-4 (Securities Transfer Form) is the prescribed format under Section 56 of the Companies Act, 2013, which needs to be executed by both transferor and transferee.' }
            ]
        },
        'jansamarth-registration': {
            title: 'JanSamarth Registration',
            category: 'startup',
            icon: 'fa-file-shield',
            image: 'assets/company registration.webp',
            shortDesc: 'JanSamarth Portal Registration & Scheme Eligibility Guidance',
            subtitle: 'The Core Objectives of JanSamarth Schemes',
            desc: 'JanSamarth schemes are available after registering the beneficiary on the JanSamarth portal of the government of India. These schemes are endowed for the growth and development of the people in their ultimate progress of careers. So, education, business, livelihood development, and Agri-Infrastructure development are brought under the segments. In these verticals, you will get a total of 13 schemes for enjoying the loan. The JanSamarth schemes are entailed with the government of India, and a person can get easy digital approval for the loans. The portal ensures providing facilities digitally through end-to-end coverage.',
            benefits: [
                'End-to-end registration on the official JanSamarth portal',
                'Detailed eligibility checking across all 13 government credit schemes',
                'Agri-infrastructure, education, and business loan advisory',
                'Assistance in digital verification and documentation upload',
                'Ensuring maximum compliance for digital loan approvals'
            ],
            documents: [
                { name: 'Aadhaar Card / Identity proof of the beneficiary', icon: 'fa-id-badge' },
                { name: 'PAN Card of the applicant', icon: 'fa-id-card' },
                { name: 'Income proof / ITR / Bank statements', icon: 'fa-file-invoice' },
                { name: 'Project report or business detail documentations', icon: 'fa-file-lines' }
            ],
            faqs: [
                { q: 'What is the JanSamarth Portal?', a: 'JanSamarth is a unique digital portal that links government schemes to make it simple for beneficiaries to check eligibility and apply for government-backed loans online.' },
                { q: 'How many schemes are available on the portal?', a: 'There are currently 13 government loan schemes categorized under Education Loan, Agri Infrastructure Loan, Business Activity Loan, and Livelihood Loan.' }
            ]
        },
        'credit-management-analysis': {
            title: 'Credit Management Analysis',
            category: 'startup',
            icon: 'fa-chart-pie',
            image: 'assets/company registration.webp',
            shortDesc: 'Fundamentals of Credit Management Analysis Report (CMA)',
            subtitle: 'Fundamentals of Credit Management Analysis Report',
            desc: 'Credit Management Analysis (C.M.A.) is a way to review the financial statements of a startup or a project where a detailed analysis of credit will be displayed. Analysis of cash flows, drainage of cash, replaying of loan amount strategy, and the profitable amount of the project are mentioned. Hence, it is the analysis of borrowers’ ability to repay loans and profit generation analytical report. The quality of the business compared to market trends in the competitive landscape is the way to assess the borrower\'s creditworthiness. If the CMA report is positive, it will generate profit. Then only the investors or banks will offer a reasonable loan to your business.',
            benefits: [
                'Calculation and optimization of Debt Service Coverage Ratio (DSCR)',
                'Detailed financial risk coverage documentary proof',
                'Analysis of cash flows and project profitability',
                'Creditworthiness assessment according to market trends',
                'Authentic CMA report preparation for loan approvals'
            ],
            documents: [
                { name: 'Brand Recognition (Credit history & previous loan records)', icon: 'fa-id-badge' },
                { name: 'Financial Statements (Current liabilities, assets, revenues, & expenses)', icon: 'fa-file-invoice' },
                { name: 'Cash Flow Statement (Details of repayment capability & cash sources)', icon: 'fa-chart-line' },
                { name: 'Collaterals list (Assets pledged as security for the loan)', icon: 'fa-building-shield' }
            ],
            faqs: [
                { q: 'What is the Debt Service Coverage Ratio (DSCR)?', a: 'DSCR is a financial metric used to determine if a business has enough cash flow to repay its debt obligations. A ratio of 1.25 or higher is typically expected for startups.' },
                { q: 'Why is a CMA report important for getting a loan?', a: 'Banks and investors require a CMA report to evaluate the viability, profitability, and financial risk of your project before sanctioning a loan.' }
            ]
        },
        'opc-to-pvt-ltd': {
            title: 'OPC to PVT. Conversion',
            category: 'startup',
            icon: 'fa-arrow-right-arrow-left',
            image: 'assets/company registration.webp',
            shortDesc: 'Application for conversion of OPC to a Private Limited Company',
            subtitle: 'Application for conversion of OPC to a Private Limited Company',
            desc: 'Convert your One Person Company (OPC) to a Private Limited Company seamlessly. Our experts will manage the entire legal process of conversion, ensuring compliance with the Registrar of Companies (ROC) and Ministry of Corporate Affairs (MCA). Once all the processes and steps are completed, we file the application to the concerned ROC.',
            benefits: [
                'Reforming and drafting of reformed MOA and AOA',
                'Preparation of special resolutions and board meetings',
                'Drafting of consent letters for directors and members',
                'Coordinating creditor NOCs and lists of creditors',
                'End-to-end ROC filing compliance and support'
            ],
            documents: [
                { name: 'Copy of special resolution passed by member', icon: 'fa-file-signature' },
                { name: 'Reformed MOA and AOA of the Company', icon: 'fa-file-lines' },
                { name: 'List of proposed members, and its directors with consent letters', icon: 'fa-users' },
                { name: 'List of creditors and Copy of NOC of every creditor', icon: 'fa-clipboard-list' },
                { name: 'The latest audited balance sheet with profit and loss statements', icon: 'fa-file-invoice' },
                { name: 'Consent & Proof of Identity/Residence/PAN of the member and nominee', icon: 'fa-id-card' }
            ],
            faqs: [
                { q: 'When is it mandatory to convert an OPC to a Private Limited company?', a: 'Under previous rules, an OPC was required to convert if its paid-up share capital exceeded Rs. 50 lakhs or average annual turnover exceeded Rs. 2 crores, though voluntary conversion is also supported.' },
                { q: 'What forms are filed for OPC conversion?', a: 'Form INC-6 is filed with the MCA for the conversion of OPC into a Private Limited Company.' }
            ]
        },
        'pvt-to-public-ltd': {
            title: 'PVT. to Public Ltd Conversion',
            category: 'startup',
            icon: 'fa-users-line',
            image: 'assets/company registration.webp',
            shortDesc: 'Trusted Assistance for Conversion of Private to Public Ltd',
            subtitle: 'Trusted Assistance for Conversion of Private to Public Limited Company',
            desc: 'Get online assistance to convert your Private Limited Company into a Public Limited Company. We prepare and file all ROC conversion documents, resolutions, and amended MOA/AOA statements.',
            benefits: [
                'Complete legal assistance in restructuring shareholding and director boards',
                'Drafting altered Memorandum of Association (MOA) & Articles of Association (AOA)',
                'Board meeting and shareholder special resolution documentation',
                'Attestation and notarization advisory for NRI or Foreign directors',
                'Hassle-free ROC filing and new Certificate of Incorporation procurement'
            ],
            documents: [
                { name: 'PAN Cards & Passport/DL/Voter ID of Directors and Shareholders', icon: 'fa-id-card' },
                { name: 'Address proof of all directors or shareholders (Bills/Bank statement)', icon: 'fa-location-dot' },
                { name: 'Latest passport size Photo of all shareholders and directors', icon: 'fa-image' },
                { name: 'Business address proof (Rent Agreement, electricity bills & Landlord NOC)', icon: 'fa-file-contract' },
                { name: 'Attested copy of latest audited Financial Statements & previous year ITR', icon: 'fa-file-invoice' },
                { name: 'Declaration of incorporation, original MOA, and AOA statements', icon: 'fa-file-lines' }
            ],
            faqs: [
                { q: 'What is the minimum requirement of members for a Public Limited Company?', a: 'A Public Limited Company requires a minimum of 7 shareholders and 3 directors to initiate the conversion from Private Limited.' },
                { q: 'Which ROC form is filed for converting Private to Public?', a: 'Form INC-27 and Form MGT-14 must be filed with the ROC for conversion.' }
            ]
        },
        'llp-to-pvt-ltd': {
            title: 'LLP to PVT Conversion',
            category: 'startup',
            icon: 'fa-building-columns',
            image: 'assets/company registration.webp',
            shortDesc: 'Complete Eligibility & Compliance for LLP to Pvt. Ltd Conversion',
            subtitle: 'Conversion of LLP to Pvt. Ltd Company',
            desc: 'Convert your Limited Liability Partnership (LLP) to a Private Limited Company to attract venture capital and equity funding. Our team ensures that all partners become shareholders, and the contribution to LLP is converted into share capital.',
            benefits: [
                'Name reservation and suffix transition from LLP to Private Limited',
                'Filing Statutory Returns and drafting corporate conversion approvals',
                'Converting LLP Partner contributions into share capital equity structure',
                'Setting up the company structure with at least 2 shareholders & directors',
                'ROC Form URC-1 filing and advisory support'
            ],
            documents: [
                { name: 'Copy of existing LLP Agreement', icon: 'fa-file-contract' },
                { name: 'Filed Statutory Returns of the LLP', icon: 'fa-file-invoice' },
                { name: 'Written consent from all partners for the conversion', icon: 'fa-signature' },
                { name: 'List of creditors and NOC from all creditors', icon: 'fa-clipboard-list' },
                { name: 'Identity & Address Proofs of all partners (to become shareholders)', icon: 'fa-id-card' },
                { name: 'Latest audited financial statements of the LLP', icon: 'fa-file-invoice-dollar' }
            ],
            faqs: [
                { q: 'Can the name of the LLP be changed during conversion?', a: 'No, the name will simply be suffixed with "Private Limited". For example, ABC LLP will become ABC Private Limited.', },
                { q: 'What is Form URC-1?', a: 'Form URC-1 is the application for registration of an existing joint stock company/LLP as a company under Section 366 of the Companies Act, 2013.' }
            ]
        },
        'sec-8-winding-up': {
            title: 'Sec-8 Winding Up',
            category: 'startup',
            icon: 'fa-rectangle-xmark',
            image: 'assets/company registration.webp',
            shortDesc: 'Closure of Section 8 Company - Process It Online',
            subtitle: 'Winding Up of Section-8 Company | Closure of Section 8 Company - Process It Online',
            desc: 'People who are engaged in operating non-profit organizations may create a Section 8 Company under the Companies Act, 2013. If someone wants to close a Section 8 company for operating a private or public limited company or for any other reason, they have to wind up the company by following specific procedures. As it is a non-profit organization, nobody can convert it to another form of company. All its funds must be transferred to the government or to another similar non-profit organization. So, the process is somehow typical and needs to follow the minute processes.',
            benefits: [
                'Complete assistance from start to end in Section 8 company closure',
                'Winding up of dormant firms to avoid legal obligations and compliance costs',
                'Compliance checklist verification to avoid late filing penalties',
                'Preparation and drafting of dissolution resolutions',
                'Guidance on transferring funds/assets to similar NGOs or government bodies'
            ],
            documents: [
                { name: 'Written Board and Shareholders Special Resolutions', icon: 'fa-file-signature' },
                { name: 'Latest audited accounts and asset distribution declarations', icon: 'fa-file-invoice' },
                { name: 'Statement of Assets and Liabilities (certified by CA)', icon: 'fa-file-invoice-dollar' },
                { name: 'No Objection Certificate from regional/regulatory authorities', icon: 'fa-building-columns' },
                { name: 'Verification of pending litigation status and resolution documents', icon: 'fa-clipboard-question' }
            ],
            faqs: [
                { q: 'Can a Section 8 Company be converted into a Private Limited Company?', a: 'No, a Section 8 Company cannot be converted into a profitable business entity. It must be wound up, and its remaining assets transferred to another Section 8 company or the government.' },
                { q: 'What happens to the surplus funds of a Section 8 Company upon closure?', a: 'All surplus funds and assets must be transferred to the government or to another NGO with similar non-profit objectives.' }
            ]
        },
        'nidhi-winding-up': {
            title: 'Nidhi Winding Up',
            category: 'startup',
            icon: 'fa-building-columns',
            image: 'assets/company registration.webp',
            shortDesc: 'Nidhi Company Closure & strike-off services',
            subtitle: 'Nidhi Company Closure | Advantages of Closing a Nidhi Company',
            desc: 'Go for the closure of your dormant Nidhi Company and enjoy a lot of benefits. Any registered Nidhi company needs to file an annual audit report and comply with the MCA. Otherwise, the company will be fined or penalized. To avoid these penalties, you must file a Nidhi Company Strike Off form by professionals.',
            benefits: [
                'Strike off form preparation and submission by professionals',
                'Complete removal of annual MCA compliance and audit report requirements',
                'Avoidance of compounding penalties and regulatory fines',
                'Productive resource reallocation for other business ventures',
                'Total exemption from record maintenance and source tax filings'
            ],
            documents: [
                { name: 'Statement of accounts showing nil debts & liabilities (duly audited)', icon: 'fa-file-invoice' },
                { name: 'Special resolutions from the members (75% members\' consent required)', icon: 'fa-signature' },
                { name: 'Indemnity Bond notarized by the directors (Form STK-3)', icon: 'fa-file-contract' },
                { name: 'Affidavit in Form STK-4', icon: 'fa-file-signature' },
                { name: 'Latest Bank Statement & Bank Account Closure Certificates', icon: 'fa-building-columns' },
                { name: 'PAN card of the Nidhi company', icon: 'fa-id-card' }
            ],
            faqs: [
                { q: 'What is the required member consent for Nidhi Company closure?', a: 'At least 75% of the Nidhi company members must provide their written consent through a special resolution for winding up.' },
                { q: 'What forms are filed for Nidhi Company closure?', a: 'Form STK-2 is filed with the Registrar of Companies (ROC) along with Form STK-3 (Indemnity Bond) and STK-4 (Affidavit) to strike off the Nidhi company.' }
            ]
        },
        'subsidiary-winding-up': {
            title: 'Indian Subsidiary Windup',
            category: 'startup',
            icon: 'fa-circle-xmark',
            image: 'assets/company registration.webp',
            shortDesc: 'Closure of Indian Subsidiary - A Complete Guide',
            subtitle: 'Indian Subsidiary Windup | Closure of Indian Subsidiary - A Complete Guide',
            desc: 'If you do not want to continue your Indian Subsidiary Company, it is better to close it on time. Otherwise, you have to maintain some compliance against the company. Unless you maintain company compliance, you may be fined or penalized. After closing the company all compliance and responsibilities will be null and void. You need not submit a yearly audit report or hire an expert to submit audit reports.',
            benefits: [
                'Complete advisory on striking off subsidiary company legalities',
                'Filing closing form and coordinating with the Registrar of Companies (ROC)',
                'Guidance to settle any pending litigations involving the subsidiary',
                'Preparing delisting processes if public shares are involved',
                'Making responsibilities, taxes, and compliance liabilities null and void'
            ],
            documents: [
                { name: 'Indemnity Bond (Form STK-3 notarized by every director of the company)', icon: 'fa-file-contract' },
                { name: 'Affidavit (Form STK-4 declaring zero debts or liabilities)', icon: 'fa-file-signature' },
                { name: 'Statement of Accounts showing nil assets/liabilities (certified by CA, < 30 days old)', icon: 'fa-file-invoice' },
                { name: 'Board Meeting Notice and Special Resolution Copy (with 75%+ member consent)', icon: 'fa-users' },
                { name: 'Statement regarding pending litigation status', icon: 'fa-clipboard-question' },
                { name: 'NOC from Regulatory Authority & Delisting Certificate from share market (if applicable)', icon: 'fa-building-columns' }
            ],
            faqs: [
                { q: 'Is it necessary to have nil liabilities before windup?', a: 'Yes, the statement of accounts must show nil assets and liabilities certified by a Chartered Accountant, and all directors must declare this in Form STK-4.', },
                { q: 'What is Form STK-3?', a: 'Form STK-3 is the official Indemnity Bond that must be executed and notarized by every director of the company.' }
            ]
        },
        'fssai-registration': {
            title: 'FSSAI Registration',
            category: 'startup',
            icon: 'fa-utensils',
            image: 'assets/company registration.webp',
            shortDesc: 'FSSAI FoSCoS Food License Registration',
            subtitle: 'Who Needs An FSSAI FoScos License?',
            desc: 'Get your business certified under the Food Safety and Standards Authority of India (FSSAI). Mandatory for all Food Business Operators (FBOs) including Canteens, Clubs, Dhabas, Distributors, Restaurants, Retailers, Storages, Suppliers, Transporters, and Wholesalers. We make the registration process transparent, fast, and simple.',
            benefits: [
                'FSSAI registration for Canteens, Clubs, Dhabas, & Restaurants',
                'Suitable for food Retailers, Wholesalers, Distributors, & Suppliers',
                'FoSCoS licensing for food Storage & Transporters',
                'Transparent pricing with clear expert assistance',
                'End-to-end liaisoning with Food Safety Officers'
            ],
            documents: [
                { name: 'Passport photo of the Food Business Operator', icon: 'fa-image' },
                { name: 'Identity Proof (Aadhaar / Voter ID / PAN Card)', icon: 'fa-id-card' },
                { name: 'Proof of possession of premises (Rent Agreement / Electricity Bill)', icon: 'fa-file-contract' },
                { name: 'List of food products planned to manufacture or sell', icon: 'fa-list-check' }
            ],
            faqs: [
                { q: 'Who needs an FSSAI License?', a: 'Any individual or entity handling, processing, manufacturing, storing, distributing, or selling food products must register under FSSAI.' },
                { q: 'What is the validity of an FSSAI Registration?', a: 'An FSSAI Registration or License can be issued with a validity ranging from 1 to 5 years, as requested by the FBO.' }
            ],
            pricingPlans: [
                {
                    name: 'Basic License',
                    price: '₹1999',
                    title: 'FSSAI FOSCOS Basic License (Govt. fee extra, GST Extra)',
                    bullets: [
                        'Eligibility: Annual turnover of the business is upto to 1.5 crore',
                        'Validity: 1 To 5 Years duration',
                        'Fee: 1 year ₹1,999 | 2 years ₹2,499 | 3 years ₹2,999 | 4 years ₹3,499 | 5 years ₹3,999',
                        'One Time professional fee excluding Govt. Fee and GST',
                        'FoSCoS application preparation and submission by experts',
                        'Instant application status tracking and updates'
                    ]
                },
                {
                    name: 'State License',
                    price: '₹3499',
                    title: 'FSSAI FOSCOS State License (Govt. fee extra, GST Extra)',
                    bullets: [
                        'Eligibility: Turnovers or operations exceeding basic limits',
                        'Validity: 1 To 5 Years duration',
                        'Fee: ₹3,499 One Time professional fee',
                        'Excluding Govt. Fee and GST charges',
                        'Detailed documentation check and product category mapping',
                        'Liaisoning with state licensing authority'
                    ]
                },
                {
                    name: 'Central License',
                    price: '₹4499',
                    title: 'FSSAI FOSCOS Central License (Govt. fee extra, GST Extra)',
                    bullets: [
                        'Eligibility: Importers, multi-state operators, or large factories',
                        'Validity: 1 To 5 Years duration',
                        'Fee: ₹4,499 One Time professional fee',
                        'Excluding Govt. Fee and GST charges',
                        'Filing under Central licensing category of FSSAI FoSCoS portal',
                        'Full compliance check for international trade and imports'
                    ]
                }
            ]
        },
        'fssai-food-labeling': {
            title: 'FSSAI Food Labeling Compliance',
            category: 'startup',
            icon: 'fa-tags',
            image: 'assets/company registration.webp',
            shortDesc: 'FSSAI & Legal Metrology Food Label Compliance Review',
            subtitle: 'What is Food Label Compliance?',
            desc: 'Food Label Compliance ensures that packaged food products meet applicable declaration and packaging requirements under FSSAI and Legal Metrology frameworks. Incorrect labels can create legal and commercial problems—from marketplace rejections to delayed product launches. Properly reviewed labels improve transparency, support smoother distribution, and help build customer confidence.',
            benefits: [
                'Packaged food brands & D2C food startups compliance reviews',
                'Suitable for FMCG manufacturers, snack, and beverage businesses',
                'Label verification for nutraceutical and supplement brands',
                'Avoid marketplace rejections and product launch delays',
                'Compliance review under FSSAI and Legal Metrology frameworks'
            ],
            documents: [
                { name: 'Current packaging artwork or label draft', icon: 'fa-image' },
                { name: 'Complete list of ingredients and additives used', icon: 'fa-list-ol' },
                { name: 'Nutritional facts or lab testing report of the product', icon: 'fa-file-lines' },
                { name: 'FSSAI License or Registration number details', icon: 'fa-id-card' }
            ],
            faqs: [
                { q: 'Why do businesses need label compliance support?', a: 'Businesses increasingly sell through online marketplaces, retail channels, and D2C platforms where packaging accuracy and regulatory adherence prevent bans and recall issues.' },
                { q: 'Who should use this food label service?', a: 'Any manufacturer, cloud kitchen, or brand selling packaged food items under trademark classes 29, 30, and 5.' }
            ],
            pricingPlans: [
                {
                    name: 'Starter Package',
                    price: '₹5999',
                    title: 'Starter Package - Label Compliance',
                    bullets: [
                        'FSSAI declaration review',
                        'Ingredient verification',
                        'Veg/Non-Veg symbol review',
                        'License display check',
                        'MRP and quantity review',
                        'Batch details review',
                        'Deficiency sheet preparation',
                        'Deliverables: Compliance report, checklist, and correction sheet'
                    ]
                },
                {
                    name: 'Advanced Package',
                    price: '₹9999',
                    title: 'Advanced Package - Label Compliance',
                    bullets: [
                        'Legal Metrology review',
                        'Nutritional format review',
                        'Allergen review & callout verification',
                        'Packaging declaration validation',
                        'Customer care verification',
                        'Two revision rounds included',
                        'Deliverables: Detailed report, nutritional format sheet, checklist, and corrected draft'
                    ]
                }
            ]
        },
        'fssai-renewal': {
            title: 'FSSAI Renewal',
            category: 'startup',
            icon: 'fa-rotate',
            image: 'assets/company registration.webp',
            shortDesc: 'FSSAI License Renewal Online',
            subtitle: 'FSSAI License Renewal Online | Easy Food License Renewal Support',
            desc: 'An FSSAI food license is mandatory to be renewed before the expiry of its validity period. If you fail to apply for renewal in time, your current license becomes invalid, and you will have to apply for a fresh new license. Let our FoSCoS experts handle your renewal seamlessly.',
            benefits: [
                'Timely submission to avoid license expiry issues',
                'Avoid high penalties and legal complications',
                'Smooth processing through FSSAI FoSCoS portal',
                'Document verification by food licensing experts',
                'End-to-end renewal tracking and notifications'
            ],
            documents: [
                { name: 'Copy of current active FSSAI License/Registration Certificate', icon: 'fa-id-card' },
                { name: 'Form A or Form B duly filled and signed by the applicant', icon: 'fa-file-signature' },
                { name: 'Declared changes in business details (if any)', icon: 'fa-file-invoice' },
                { name: 'Passport photo and identity proof of the FBO', icon: 'fa-image' }
            ],
            faqs: [
                { q: 'When should I apply for FSSAI renewal?', a: 'You must apply for renewal at least 30 days before the expiry date of your current food license to avoid late fees.' },
                { q: 'What happens if my FSSAI license expires?', a: 'Once expired, you cannot renew the license. You must cease business activities and apply for a brand new FSSAI registration.' }
            ]
        },
        'fssai-annual-return': {
            title: 'FSSAI Annual Return Filing',
            category: 'startup',
            icon: 'fa-file-invoice',
            image: 'assets/company registration.webp',
            shortDesc: 'FSSAI Annual Return Filing & Compliance',
            subtitle: 'FSSAI Annual Return Filing & FoSCoS Compliance',
            desc: 'All Food Business Operators (FBOs) who possess a food license and have an annual turnover up to Rs. 1.5 crore should file their returns mandatorily and within the due time. If anybody fails to file the returns within the stipulated time period, they may have to face penalties. Every FBO who possesses an FSSAI Food License should submit their return. Failing to file the return within the given time shall face penalties of Rs. 100/day. They are mandatory to file their Half-yearly Return by 30th September/30th March and Annual Return by 31st May of every fiscal year.',
            benefits: [
                'Required for every type of food business unit',
                'FSSAI Annual Return Filing for manufacturers, importers, packers, and labellers',
                'Avoid the Rs. 100/day penalty for non-filing',
                'Accurate documentation of food import, production, and distribution details',
                'Timely submission on the FSSAI FoSCoS portal'
            ],
            documents: [
                { name: 'Copy of active FSSAI Food License', icon: 'fa-id-card' },
                { name: 'Details of food categories manufactured, imported, or packed', icon: 'fa-clipboard-list' },
                { name: 'Quantity of food products produced/imported during the year', icon: 'fa-weight-hanging' },
                { name: 'Financial statement/turnover summary of the food business', icon: 'fa-file-invoice-dollar' }
            ],
            faqs: [
                { q: 'What is the due date for FSSAI Annual Return?', a: 'The FSSAI Annual Return (Form D-1) must be submitted by 31st May of every year for the preceding financial year.' },
                { q: 'What is the penalty for not filing the annual return?', a: 'A late fee penalty of Rs. 100 per day is levied for each day the return remains unfiled after the due date.' }
            ]
        },
        'fssai-modification': {
            title: 'FSSAI Modification',
            category: 'startup',
            icon: 'fa-file-pen',
            image: 'assets/company registration.webp',
            shortDesc: 'Online FSSAI License Modification',
            subtitle: 'Online FSSAI License Modification | Expert Support for Food License Updates',
            desc: 'Let the FSSAI FoSCoS Experts of Online Legal India do the FSSAI Modification for your Food Business | 1-Day Processing. As per the latest Notice issued by the FSSAI FoSCoS authority, only selected categories of FBOs can apply for a Modification: Any Registered Food Business Operator, Food Manufacturers, Food Processing units, Food Repackers, Food Re-labellers, and Food Distributors.',
            benefits: [
                'FSSAI Modification for registered Food Business Operators (FBOs)',
                'Suitable for manufacturers, processing units, repackers, and distributors',
                'Quick 1-day processing for eligible modifications',
                'Modification of category, business name, address, or products list',
                'Hassle-free application preparation on FoSCoS portal'
            ],
            documents: [
                { name: 'Copy of current FSSAI License or Registration certificate', icon: 'fa-id-card' },
                { name: 'Supporting documents for requested change (e.g. rent agreement for address change)', icon: 'fa-file-contract' },
                { name: 'Board resolution or partner NOC (if name or structure changes)', icon: 'fa-signature' },
                { name: 'List of proposed food products to add or alter', icon: 'fa-list-ol' }
            ],
            faqs: [
                { q: 'Who can apply for FSSAI License Modification?', a: 'FBOs wanting to change their business address, food category, product lists, or company name must apply for a modification.' },
                { q: 'Is there a fee for license modification?', a: 'Yes, FSSAI charges a nominal modification fee, which varies based on the type of license (Basic, State, or Central).' }
            ]
        },
        'bis-certificate': {
            title: 'BIS Certificate',
            category: 'startup',
            icon: 'fa-shield-halved',
            image: 'assets/company registration.webp',
            shortDesc: 'Apply for BIS Certificate Online',
            subtitle: 'Apply for BIS Certificate Online with Expert BIS Certification Assistance',
            desc: 'At Online Legal India, we help your business get BIS certified the right way. BIS Certification—granted by the Bureau of Indian Standards under the BIS Act, 2016—proves that your product meets India’s safety, quality, and compliance standards. From paperwork to lab testing and formalities, we simplify the entire process—so you can focus on growing your business with confidence, credibility.',
            benefits: [
                'ISI-mark certification to guarantee safety and performance standards',
                'Reduces manufacturing defect losses and returns',
                'Legally mandatory for 380+ products to be sold in India',
                'Full compliance mapping to protect you from penalties and recalls',
                'Expert registration, fast processing, and full lab test coordination'
            ],
            documents: [
                { name: 'Proof of factory establishment & business registration documents', icon: 'fa-building' },
                { name: 'Details of manufacturing machinery & calibration reports', icon: 'fa-gears' },
                { name: 'List of raw materials and testing equipment details', icon: 'fa-list-check' },
                { name: 'Product testing lab report from BIS-recognized laboratories', icon: 'fa-file-medical' },
                { name: 'Authorized signatory details & identity proofs', icon: 'fa-id-card' }
            ],
            faqs: [
                { q: 'What is a BIS Certificate?', a: 'A BIS certificate is a means of providing third-party guarantee of quality, safety, and reliability of products to customers in India.' },
                { q: 'Is BIS certification mandatory for all products?', a: 'No, but it is legally mandatory for over 380 products including electronics, chemicals, steel, toys, and cement.' }
            ]
        },
        'import-export-code': {
            title: 'Import Export Code',
            category: 'startup',
            icon: 'fa-ship',
            image: 'assets/company registration.webp',
            shortDesc: 'Importer Exporter Code (IEC) Registration Online',
            subtitle: 'Importer Exporter Code (IEC) Registration Online | IEC Certificate India',
            desc: 'Register your import export business under the Directorate General of Foreign Trade (DGFT), Ministry of Commerce and Industry, Govt. of India. Our IEC experts will file with the DGFT office on your behalf to secure your IEC Certificate. The process requires accurate documentation to avoid customs mismatch issues.',
            benefits: [
                'DGFT registration for global import-export business operations',
                'Avoid mismatch issues at customs during trade transactions',
                'Lifetime validity of the IEC certificate',
                'Fast application submission by certified trade experts',
                'Access to export promotional schemes and subsidies'
            ],
            documents: [
                { name: 'Colour photographs of promoters / individuals / directors', icon: 'fa-image' },
                { name: 'PAN Card of each shareholder and director of the company', icon: 'fa-id-card' },
                { name: 'Identity Proof (Voter ID / Driving License / Passport) of directors', icon: 'fa-id-badge' },
                { name: 'Address Proof (Bank statement / Electricity or mobile bill)', icon: 'fa-location-dot' },
                { name: 'Proof of registered office (Rent Agreement / Lease Deed)', icon: 'fa-file-contract' },
                { name: 'Utility bill as proof (must be latest copy)', icon: 'fa-file-invoice' }
            ],
            faqs: [
                { q: 'What is the Importer Exporter Code (IEC)?', a: 'IEC is a 10-digit code issued by the DGFT that is mandatory for importing or exporting goods and services from India.' },
                { q: 'Does an IEC require regular filings or renewals?', a: 'No, the IEC has lifetime validity and does not require annual renewals, though details must be updated yearly.' }
            ]
        },
        'import-export-modification': {
            title: 'Import Export Code Modification',
            category: 'startup',
            icon: 'fa-file-pen',
            image: 'assets/company registration.webp',
            shortDesc: 'IEC Certificate Modification Assistance',
            subtitle: 'IEC Certificate Modification Assistance | Online IEC Update',
            desc: 'IEC experts from Online Legal India will help you update your details in the Import Export Code Certificate within 24 hrs. It is essential to update every data of a company: branch details, activity status (manufacture/merchant), and so on. If not done, there will be consequences during the import-export process due to mismatching details in DGFT and customs. You can modify company/registered office address, change company name, add branch details, alter partner/director lists, change business activities, modify bank details, or change registered mobile/email.',
            benefits: [
                'Update details in the Import Export Code Certificate within 24 hours',
                'Avoid import-export hold-ups due to mismatches in DGFT and customs data',
                'Update company address, names, registered branch details, or partners',
                'Modify business activities, bank details, and contact coordinates',
                'Ensure 100% compliance with DGFT and port authorities'
            ],
            documents: [
                { name: 'Copy of current IEC Certificate', icon: 'fa-id-card' },
                { name: 'Documents supporting the modification (e.g. proof of new bank details, new address proof)', icon: 'fa-file-invoice' },
                { name: 'Updated Board resolution or partners NOC', icon: 'fa-signature' },
                { name: 'Valid class-3 Digital Signature Certificate (DSC) of the promoter', icon: 'fa-file-signature' }
            ],
            faqs: [
                { q: 'Is it mandatory to modify the IEC when bank details change?', a: 'Yes, if any detail like bank account, partners, or address changes, it must be updated immediately in the DGFT portal to prevent customs clearance issues.' },
                { q: 'How long does it take to modify an IEC certificate?', a: 'We can complete the modification submission on the DGFT portal within 24 hours of receiving the documents.' }
            ]
        },
        'online-tax-planning-consultancy': {
            title: 'Tax Planning & Consultancy',
            category: 'startup',
            icon: 'fa-user-gear',
            image: 'assets/company registration.webp',
            shortDesc: 'Comprehensive Online Tax Planning & Consultation',
            subtitle: 'Comprehensive Online Tax Planning & Consultation Services',
            desc: 'Let the Country’s Most Recommended Tax Consultant panel Analyze, Manage & Help Reduce your Tax Liability following the relevant Income Tax Act’s provisions. Proper tax planning helps save excessive tax payouts, creating economic stability and avoiding legal pitfalls.',
            benefits: [
                'Minimize tax liability legally within Income Tax Act rules',
                'Identify and optimize deductions under sections 80C to 80U',
                'Advance tax computations and quarterly filing checks',
                'Avoid legal penalties and compliance delays',
                'Specialized consulting for salary, house property, and capital gains',
                'Dedicated CA panel for customized assessment and support'
            ],
            documents: [
                { name: 'Form 16 or salary slips (for salaried individuals)', icon: 'fa-file-invoice' },
                { name: 'Details of investment proofs (Life Insurance, PPF, Tax Saver FD, etc.)', icon: 'fa-file-shield' },
                { name: 'Income tax portal credentials (if existing)', icon: 'fa-key' },
                { name: 'Property ownership documents & rental income details (if any)', icon: 'fa-building' },
                { name: 'Capital gains statement for stocks, mutual funds, or properties', icon: 'fa-chart-line' },
                { name: 'Bank transaction statements for the financial year', icon: 'fa-building-columns' }
            ],
            faqs: [
                { q: 'What is the goal of tax planning?', a: 'The primary goal is to organize your financial affairs in a way that minimizes your tax liability by claiming eligible deductions, exemptions, and reliefs.' },
                { q: 'When should I start tax planning?', a: 'Tax planning should ideally begin at the start of the financial year (April) so you can distribute investments and tax-saving decisions throughout the year.' }
            ],
            pricingPlans: [
                {
                    name: 'Salaried Plan',
                    price: '₹999',
                    title: 'Tax Planning for Salaried Individuals',
                    bullets: [
                        'Efficient support from tax experts',
                        'Annual tax planning under Chapter VI-A deductions',
                        'Computation of total taxable income',
                        'Full call, email, and chat support',
                        '1-time service'
                    ]
                },
                {
                    name: 'NRI Salary',
                    price: '₹1499',
                    title: 'NRI Tax Planning from Salary',
                    bullets: [
                        'Efficient support from specialized NRI tax consultants',
                        'Annual tax planning matching double taxation treaty rules',
                        'Evaluation of NRE/NRO accounts tax impact',
                        'Full call, email, and chat support',
                        '1-time service'
                    ]
                },
                {
                    name: 'Advance Tax',
                    price: '₹1499',
                    title: 'Advance Tax Payment & Planning',
                    bullets: [
                        'On-call support from tax expert panel',
                        'Annual direct and indirect tax computation',
                        'Estimation of advance tax installments due',
                        'Full call, email, and chat support',
                        '1-time service'
                    ]
                },
                {
                    name: 'House Property',
                    price: '₹1499',
                    title: 'Tax Planning from House Property',
                    bullets: [
                        'Efficient support from tax experts',
                        'Annual tax planning for rental income and housing loan interest',
                        'Deduction advice under Section 24',
                        'Full call, email, and chat support',
                        '1-time service'
                    ]
                },
                {
                    name: 'Capital Gains',
                    price: '₹2499',
                    title: 'Capital Gain Tax Planning (Long Term & Short Term)',
                    bullets: [
                        'Efficient support from senior tax planners',
                        'Annual direct-indirect capital gains tax structure',
                        'Calculation of indexation benefit and exemptions (Sec 54, etc.)',
                        'Full call, email, and chat support',
                        '1-time service'
                    ]
                },
                {
                    name: 'Other Sources',
                    price: '₹2499',
                    title: 'Tax Planning from Other Sources of Income',
                    bullets: [
                        'Efficient support from tax experts',
                        'Yearly tax planning for dividends, interest, lottery, etc.',
                        'Advice on tax exemptions on other income categories',
                        'Full call, email, and chat support',
                        '1-time service'
                    ]
                },
                {
                    name: 'ITR/Project',
                    price: '₹1999',
                    title: 'ITR Tax Planning / Individual Project Report',
                    bullets: [
                        'Efficient support from tax consultants',
                        'Profit & Loss and Balance Sheet preparation',
                        'Error-free tax computation sheet drafting',
                        'Full call, email, and chat support',
                        '1-time service'
                    ]
                },
                {
                    name: 'Retirement Plan',
                    price: '₹1999',
                    title: 'Tax Saving Plan after Retirement (Sec 80C - 80U)',
                    bullets: [
                        'Efficient support from senior tax advisors',
                        'Optimizing pension and gratuity tax implications',
                        'Senior citizen deduction schemes (Sec 80TTB, etc.)',
                        'Full call, email, and chat support',
                        '1-time service'
                    ]
                }
            ]
        },
        'tax-compliance-guide': {
            title: 'Tax & Compliance',
            category: 'startup',
            icon: 'fa-shield-halved',
            image: 'assets/company registration.webp',
            shortDesc: 'Tax & Compliance Guides & Filings',
            subtitle: 'Tax & Compliance Guides & Filings for Proprietorships & Companies',
            desc: 'Stay 100% compliant with the Indian taxation systems. We help sole proprietorships and corporate companies file all required registrations (PAN, TAN, GST, MSME, ESIC & PF), ROC/MCA filings (AOC-4, MGT-7, DIR-3 KYC), books maintenance, TDS returns, and statutory tax audits.',
            benefits: [
                'Complete TDS & GST compliance management and filing',
                'ROC/MCA Annual Filings (AOC-4, MGT-7, Board meetings coordination)',
                'PF, ESIC & Professional Tax returns handling',
                'Statutory Books & Records maintenance (cash books, sales/purchase registers)',
                'Tax Audit coordination and computation sheets'
            ],
            documents: [
                { name: 'Active Incorporation Certificate / Partnership Deed', icon: 'fa-file-invoice' },
                { name: 'PAN and TAN of the business entity', icon: 'fa-id-card' },
                { name: 'Active GST Registration certificate copy', icon: 'fa-passport' },
                { name: 'Financial statements, ledgers, and bank statements', icon: 'fa-building-columns' },
                { name: 'Digital signature certificates (DSC) of directors/owners', icon: 'fa-signature' }
            ],
            faqs: [
                { q: 'What compliance is mandatory for Sole Proprietorships?', a: 'Sole proprietorships must register for PAN, GST (if turnover exceeds threshold), Udyam MSME, and file income tax returns annually using ITR-3 or ITR-4.' },
                { q: 'What are the key MCA compliances for Private Limited Companies?', a: 'Companies must hold at least 4 board meetings yearly, conduct an AGM, file AOC-4 (financials) and MGT-7 (annual returns), and update director DIN KYCs annually.' }
            ]
        },
        'online-bookkeeping-service': {
            title: 'Online Bookkeeping',
            category: 'startup',
            icon: 'fa-cash-register',
            image: 'assets/company registration.webp',
            shortDesc: 'Online Accounting and Bookkeeping Services',
            subtitle: 'Online Accounting and Bookkeeping Services in India',
            desc: 'Let India’s Recommended Accountants Organize, Prepare and Analyze your Financial Transactions | Easy & Quick Cloud-based Bookkeeping Procedure. We provide complete online ledger posting, cash flow mapping, bank reconciliation, and balance sheet preparation.',
            benefits: [
                'Easy and quick cloud-based bookkeeping software setup',
                'Error-free balance sheets and ledger postings by certified CAs',
                'Direct calculation of GST liabilities and tax deductions',
                'Safe and secure transmission of fiscal details',
                'Periodic financial reports and dashboards'
            ],
            documents: [
                { name: 'Bank transaction statements for all business accounts', icon: 'fa-building-columns' },
                { name: 'Sales invoices, bills, and payment receipts', icon: 'fa-receipt' },
                { name: 'Purchase invoices, expense bills, and receipts', icon: 'fa-file-invoice' },
                { name: 'Previous year tax filings and financial reports', icon: 'fa-file-invoice-dollar' }
            ],
            faqs: [
                { q: 'Why is professional bookkeeping necessary?', a: 'Bookkeeping provides a clear picture of your company\'s financial health, simplifies tax computations, and ensures audits can be performed smoothly.' },
                { q: 'What software do you use for bookkeeping?', a: 'We utilize industry-standard cloud accounting platforms like Tally Prime, QuickBooks, and Zoho Books.' }
            ]
        },
        'section-8-company-compliance-filing': {
            title: '12A-80G-CSR',
            category: 'startup',
            icon: 'fa-ribbon',
            image: 'assets/company registration.webp',
            shortDesc: 'Section 8 Company Compliance, 12A & 80G Registration',
            subtitle: 'Section 8 Company Compliance, 12A & 80G Registration Services',
            desc: 'Fulfill all compliance requirements for non-profit entities. We help provide 12A registration, section 80G registration, CSR registration, and more, allowing tax exemptions for donors and the non-profit organization.',
            benefits: [
                'Section 12A tax exemption certificate registration',
                'Section 80G registration to allow tax benefits for donors',
                'CSR-1 registration to qualify for Corporate Social Responsibility funds',
                'Annual compliance filings under the Companies Act for Section 8 companies',
                'Absolute transparency in documentation and liaisoning'
            ],
            documents: [
                { name: 'Aadhaar card and PAN card of all the directors of the company', icon: 'fa-id-card' },
                { name: 'The incorporation certificate, MOA and AOA of the company', icon: 'fa-file-invoice' },
                { name: 'Business address proof of the company', icon: 'fa-location-dot' },
                { name: 'Income details & assets/liabilities of the Section 8 Company', icon: 'fa-scale-balanced' },
                { name: 'PAN Card of the company & copy of the Form 10A', icon: 'fa-file-signature' },
                { name: 'List of the donors & book of accounts of the company', icon: 'fa-book' }
            ],
            faqs: [
                { q: 'What is a 12A registration?', a: 'Section 12A registration exempts non-profit institutions like Section 8 companies, trusts, and societies from paying income tax on their receipts.' },
                { q: 'How does 80G registration benefit donors?', a: 'Section 80G registration allows donors to claim deductions (typically 50% or 100%) on the donation amount while filing their income tax returns.' }
            ]
        },
        'project-report-preparation': {
            title: 'Project Report',
            category: 'startup',
            icon: 'fa-file-invoice',
            image: 'assets/company registration.webp',
            shortDesc: 'Project Report Preparation for Bank Loans',
            subtitle: 'Online Project Report Preparation for New Business Bank Loans',
            desc: 'Our Expert team is dedicated for you to prepare a Project Report to avail an Easy Loan. Trusted by over 5 Lakh+ satisfied clients with guaranteed quality services, challenging low cost across India, and zero hidden charges.',
            benefits: [
                'Complete project reports for Mudra, PMEGP, or general commercial bank loans',
                'ISO 9001:2015 certified preparation for higher loan approval rates',
                'Error-free financial projections (P&L, balance sheets, cash flow statements)',
                'Dedicated call, chat, and email support',
                '100% transparent pricing structure'
            ],
            documents: [
                { name: 'Promoter profiles, educational details, and address proofs', icon: 'fa-id-badge' },
                { name: 'Proposed business model, product/service descriptions, and marketing plans', icon: 'fa-newspaper' },
                { name: 'Estimate of cost of project (land, machinery, raw material setup)', icon: 'fa-gears' },
                { name: 'Source of funds details (own capital, requested loan amount)', icon: 'fa-money-bill-wave' },
                { name: 'GSTIN and bank statements (if existing business)', icon: 'fa-building-columns' }
            ],
            faqs: [
                { q: 'What is a business project report?', a: 'A project report is a comprehensive document detailing the operational, financial, and marketing plans of a proposed business venture, essential for bank loan applications.' },
                { q: 'How long does it take to prepare the project report?', a: 'We can deliver a professionally compiled project report within 3 to 5 business days after receiving all parameters.' }
            ],
            pricingPlans: [
                {
                    name: 'Project Report',
                    price: '₹6999',
                    title: 'Project Report Preparation (excluding GST)',
                    bullets: [
                        'Onetime Charge: ₹6,999 + 18% GST',
                        'Detailed Project Report (DPR) for Bank Loans',
                        'Includes 5-Year Balance Sheet and Profit & Loss Projections',
                        'Expert drafting by experienced project analysts',
                        'Call, Chat, and Email Support',
                        'No hidden charges'
                    ]
                }
            ]
        },
        'online-filing-dpt-3': {
            title: 'DPT-3 Filing',
            category: 'startup',
            icon: 'fa-file-shield',
            image: 'assets/company registration.webp',
            shortDesc: 'Online Filing of DPT-3 Return',
            subtitle: 'Expert Assistance for Online Filing of DPT-3 Return',
            desc: 'If you feel the complications on DPT-3 return filing for your company, contact our expert. DPT-3 is a mandatory annual return of deposits that every company must file under the Companies Act, 2013.',
            benefits: [
                'Complete support for reporting outstanding loans and deposits',
                'Expert guidance on exempt deposits and related disclosures',
                'Direct filing on the Ministry of Corporate Affairs (MCA) portal',
                'Avoid heavy late filing penalties and interest charges',
                'Full call, chat, and email support'
            ],
            documents: [
                { name: 'Copy of the latest audited balance sheet', icon: 'fa-file-invoice' },
                { name: 'Details of outstanding loan amounts and deposits as of 31st March', icon: 'fa-file-invoice-dollar' },
                { name: 'Auditor Certificate (mandatory if DPT-3 is filed for deposits)', icon: 'fa-file-shield' },
                { name: 'DSC of the authorized director', icon: 'fa-signature' }
            ],
            faqs: [
                { q: 'What is DPT-3?', a: 'DPT-3 is an annual return of deposits and particulars of transactions not considered deposits that all active companies in India must file.' },
                { q: 'What is the due date for filing DPT-3?', a: 'The due date for filing DPT-3 is 30th June for the preceding financial year ending on 31st March.' }
            ],
            pricingPlans: [
                {
                    name: 'DPT-3 Filing',
                    price: '₹3999',
                    title: 'DPT-3 Return Filing Plan',
                    bullets: [
                        'Onetime Charge: ₹3,999 + 18% GST',
                        'DPT-3 Return Filing preparation and upload',
                        'Professional drafting and advisory support',
                        'Call, Chat, and Email Support',
                        'No hidden charges'
                    ]
                }
            ]
        },
        'ngo-darpan-registration': {
            title: 'NGO DARPAN Registration',
            category: 'startup',
            icon: 'fa-globe',
            image: 'assets/company registration.webp',
            shortDesc: 'NGO DARPAN Registration Online',
            subtitle: 'NGO DARPAN Registration Online | NITI Aayog Unique ID',
            desc: 'NGO DARPAN registration is a process through which all non-governmental organizations (NGOs), voluntary organizations (VOs), not-for-profit organizations (NPOs), registered societies, charity organizations, trusts, etc. sign up on the NGO DARPAN portal to create a database of all the NGOs in India. NGO DARPAN is maintained by NITI Aayog. Obtain your Unique ID for grants and bank accounts.',
            benefits: [
                'NGO DARPAN registration managed completely by specialists',
                'Crucial for obtaining government grants, funding schemes, and recognition',
                'Required to open a bank account in the name of charitable trusts/societies',
                'Facilitates corporate partnerships and increases public trust',
                'Unique ID registration quickly and flawlessly'
            ],
            documents: [
                { name: 'Trust Deed (for Trusts) / Society Deed & Bylaws (for Societies) / Incorporation Certificate & MOA/AOA (for Section 8)', icon: 'fa-file-invoice' },
                { name: 'PAN card of the Trust, Society, or Section-8 Company', icon: 'fa-id-card' },
                { name: 'KYC (Aadhaar, PAN, Voter ID) of all Governing Body members', icon: 'fa-users' },
                { name: 'Active email IDs and Mobile numbers of all members', icon: 'fa-mobile-screen' },
                { name: 'Declaration of nature of work and scope of operations', icon: 'fa-file-signature' }
            ],
            faqs: [
                { q: 'Who can register on NGO DARPAN?', a: 'Any registered Trust, Society, Section 8 Company, or charitable association carrying out social or welfare activities can apply.' },
                { q: 'Is it mandatory to have an NGO DARPAN ID?', a: 'Yes, if your NGO wants to apply for government grants, schemes, CSR funds, or foreign contributions, having a DARPAN unique ID is mandatory.' }
            ]
        },
        'annual-compliance-bookkeeping': {
            title: 'Annual Compliance & Bookkeeping',
            category: 'startup',
            icon: 'fa-book-bookmark',
            image: 'assets/company registration.webp',
            shortDesc: 'Annual Filing Compliance & Bookkeeping Services',
            subtitle: 'Annual Filing Compliance & Bookkeeping Services',
            desc: 'Streamline Your Business Compliance and Bookkeeping services online by experts. Get end-to-end compliance management, expert bookkeeping support, timely ROC filings, and our absolute no-penalty assurance. Enjoy our exclusive Free Incorporation facility included with all compliance and accounting packages.',
            benefits: [
                'End-to-End Compliance coverage under the Companies Act',
                'Expert Bookkeeping and regular ledger maintenance support',
                'Timely ROC Filing to maintain active business status',
                'No Penalty Assurance against regulatory late fees',
                'Free Incorporation facility included with all plans',
                'Dedicated accounting experts assigned to your company'
            ],
            documents: [
                { name: 'Bank statements for the financial year period', icon: 'fa-building-columns' },
                { name: 'Purchase invoices and bills record', icon: 'fa-receipt' },
                { name: 'Sales invoices and receipts summary', icon: 'fa-file-invoice' },
                { name: 'Previous year tax returns and ledger accounts', icon: 'fa-file-invoice-dollar' },
                { name: 'PAN and Aadhaar Card of Directors / Partners', icon: 'fa-id-card' },
                { name: 'GSTIN details and portals access info', icon: 'fa-key' }
            ],
            faqs: [
                { q: 'What does the Bookkeeping package include?', a: 'The package includes daily ledger updates, cash flow statements, bank reconciliation, financial statement preparation, and ROC filing support.' },
                { q: 'How does the Free Incorporation facility work?', a: 'If you purchase our annual compliance & bookkeeping package, we will process your company incorporation entirely for free (government charges extra).' }
            ],
            pricingPlans: [
                {
                    name: 'Basic Plan',
                    price: '₹29999',
                    title: 'Turnover Range (From 0 - 20 Lakh)',
                    bullets: [
                        'Turnover Range: 0 - 20 Lakh',
                        'Facility: Free Incorporation included',
                        'End-to-End Compliance drafting',
                        'Expert Bookkeeping support & auditing assistance',
                        'Timely ROC Filing & financial sheets preparation',
                        'No Penalty Assurance on ROC deadlines',
                        'Full email, call, and chat support'
                    ]
                },
                {
                    name: 'Standard Plan',
                    price: '₹44999',
                    title: 'Turnover Range (From 20 - 50 Lakh)',
                    bullets: [
                        'Turnover Range: 20 - 50 Lakh',
                        'Facility: Free Incorporation included',
                        'End-to-End Compliance drafting',
                        'Expert Bookkeeping support & auditing assistance',
                        'Timely ROC Filing & financial sheets preparation',
                        'No Penalty Assurance on ROC deadlines',
                        'Full email, call, and chat support'
                    ]
                },
                {
                    name: 'Premium Plan',
                    price: '₹64999',
                    title: 'Turnover Range (50 Lakh Onwards)',
                    bullets: [
                        'Turnover Range: 50 Lakh Onwards',
                        'Facility: Free Incorporation included',
                        'End-to-End Compliance drafting',
                        'Expert Bookkeeping support & auditing assistance',
                        'Timely ROC Filing & financial sheets preparation',
                        'No Penalty Assurance on ROC deadlines',
                        'Full email, call, and chat support'
                    ]
                }
            ]
        },
        'online-annual-compliance-filing': {
            title: 'Annual Compliance & Filing',
            category: 'startup',
            icon: 'fa-calendar-days',
            image: 'assets/company registration.webp',
            shortDesc: 'Annual Compliance Filing for Pvt Ltd, OPC & LLP',
            subtitle: 'Annual Compliance Filing Assistance for Pvt Ltd, OPC & LLP',
            desc: 'Let our Experts Start Filing Your Annual Compliance Today! India’s Best Experts Panel Ready to Provide 360° Online Assistance for Your Annual Compliances. The Companies Act, 2013 of Indian Govt. legally mandates every entity in the country to follow the declarations of the Annual Compliance. For Private Limited Companies (Pvt. Ltd.), One Person Companies (OPC), or Limited Liability Partnerships (LLP), Annual Compliance acts as a regular update to the Govt. that the entity is conducting its business under the particular Act.',
            benefits: [
                'Free Annual Compliance Drafting',
                'Free consultations from verified taxation advisors',
                'Statutory Audit coordination with clear Audit fees',
                'Point-to-point updates for upcoming compliances & requirements',
                'Customer service available in English, Hindi & regional languages',
                'Reliable and expert compliance support'
            ],
            documents: [
                { name: 'Directors’ Board Meeting minutes', icon: 'fa-users' },
                { name: 'Profit & Loss Balance Sheet of Pvt. Ltd./OPC', icon: 'fa-scale-balanced' },
                { name: 'Conclusions from the Annual General Meeting (AGM)', icon: 'fa-handshake' },
                { name: 'Audit report from the auditor', icon: 'fa-file-shield' },
                { name: 'Financial statement preparation sheets', icon: 'fa-calculator' },
                { name: 'Income Tax Return filings details', icon: 'fa-file-invoice-dollar' }
            ],
            faqs: [
                { q: 'Why is Annual Compliance filing mandatory?', a: 'Under the Companies Act, 2013, it is legally mandatory for all registered companies (Pvt Ltd, OPC, LLP) to submit annual financial returns to the Registrar of Companies (ROC) to maintain active status.' },
                { q: 'What is AOC-4 and MGT-7?', a: 'AOC-4 is used for filing financial statements (balance sheet, P&L account) within 30 days of the AGM. MGT-7 is used for filing the annual return of the company within 60 days of the AGM.' }
            ],
            pricingPlans: [
                {
                    name: 'Basic Plan',
                    price: '₹14999 + GST',
                    title: 'Basic Plan (Turnover upto 20 Lakhs)',
                    bullets: [
                        'Eligibility: Turnover upto 20 Lakhs',
                        'ADT-1: Auditor Appointment filing',
                        'AOC-4: Annual Return Filing (within 30 days of AGM)',
                        'MGT-7: Annual Return Filing (within 60 days of AGM)',
                        'DIR-3: KYC of the Company Director(s)',
                        'INC-20A: Declaration for business commencement',
                        'Financial statement preparation & ITR filing',
                        'Free Annual Compliance Drafting',
                        'Exclusive of government fees & Audit fees'
                    ]
                },
                {
                    name: 'Standard Plan',
                    price: '₹24999 + GST',
                    title: 'Standard Plan (Turnover 20 - 50 Lakhs)',
                    bullets: [
                        'Eligibility: Turnover between 20 - 50 Lakhs',
                        'ADT-1: Auditor Appointment filing',
                        'AOC-4: Annual Return Filing (within 30 days of AGM)',
                        'MGT-7: Annual Return Filing (within 60 days of AGM)',
                        'DIR-3: KYC of the Company Director(s)',
                        'INC-20A: Declaration for business commencement',
                        'Financial statement preparation & ITR filing',
                        'Free Annual Compliance Drafting',
                        'Exclusive of government fees & Audit fees'
                    ]
                },
                {
                    name: 'Premium Plan',
                    price: '₹34999 + GST',
                    title: 'Premium Plan (Turnover 51 - 100 Lakhs)',
                    bullets: [
                        'Eligibility: Turnover between 51 - 100 Lakhs',
                        'ADT-1: Auditor Appointment filing',
                        'AOC-4: Annual Return Filing (within 30 days of AGM)',
                        'MGT-7: Annual Return Filing (within 60 days of AGM)',
                        'DIR-3: KYC of the Company Director(s)',
                        'INC-20A: Declaration for business commencement',
                        'Financial statement preparation & ITR filing',
                        'Free Annual Compliance Drafting',
                        'Exclusive of government fees & Audit fees'
                    ]
                }
            ]
        },
        'gst-registration': {
            title: 'GST Registration',
            category: 'startup',
            icon: 'fa-file-invoice-dollar',
            image: 'assets/company registration.webp',
            shortDesc: 'Apply for GST Registration with Experts Assistance',
            subtitle: 'Apply for GST Registration with Experts Assistance by Online Legal India',
            desc: 'Get 360° Online Assistance from India’s recommended Business Taxation Experts in GST Registration to Filing the Mandatory GST Returns Annually. Obtain your GSTIN to expand your business online, trade across state lines, and leverage input tax credits.',
            benefits: [
                'Become more competitive in the Market',
                'Interstate trading is enabled once business is registered under GST',
                'Expansion of business online on Amazon, Flipkart, Shopify, & Paytm',
                'Get Input Tax Credit (ITC) while filing returns',
                'End-to-end guidance from leading business taxation experts'
            ],
            documents: [
                { name: 'PAN of the Applicant (Proprietor)', icon: 'fa-id-card' },
                { name: 'Aadhaar card of the applicant', icon: 'fa-id-badge' },
                { name: 'Proof of business registration or Incorporation certificate', icon: 'fa-file-invoice' },
                { name: 'Identity and Address proof of Promoters/Director with Photographs', icon: 'fa-image' },
                { name: 'Address proof of the place of business', icon: 'fa-location-dot' },
                { name: 'Bank Account statement / Cancelled cheque', icon: 'fa-money-check' },
                { name: 'Letter of Authorization / Board Resolution for Authorized Signatory', icon: 'fa-file-signature' },
                { name: 'Rent Agreement in case the PPOB (Principal Place of Business) is rented', icon: 'fa-file-contract' }
            ],
            faqs: [
                { q: 'Is GST registration mandatory for all businesses?', a: 'GST registration is mandatory if your aggregate annual turnover exceeds Rs. 40 lakhs for goods (Rs. 20 lakhs for hilly and North-Eastern states) or Rs. 20 lakhs for services.' },
                { q: 'What is the penalty for operating without GST?', a: 'Operating without registering under GST when mandatory carries a penalty of 10% of the tax due or Rs. 10,000, whichever is higher.' }
            ]
        },
        'gst-return-filing': {
            title: 'GST Return Filing',
            category: 'startup',
            icon: 'fa-file-invoice',
            image: 'assets/company registration.webp',
            shortDesc: 'File your GST Return with ease',
            subtitle: 'File your GST Return with ease! Your Business, Our Responsibility.',
            desc: 'Every GST registered organization in India is legally responsible for filing a total of 26 GST return filings in a financial year. It may sound problematic to meet up the regulations but with the GST experts’ proper online guidance in Online Legal India, you would be able to complete all the needful steps with ease. The taxpayers are liable to pay the GST filings within a preset time as the Govt. of India uses these returns to evaluate the entire tax liability in the country.',
            benefits: [
                'Get your GST Return filing done in few clicks',
                'Avoid high late fees and interest penalty charges',
                'Accurate digital assistance to any corner of the nation',
                'Complete documentation and reconciliation checks',
                'Maximize your monthly Input Tax Credit (ITC)'
            ],
            documents: [
                { name: 'GSTIN of the Business Entity', icon: 'fa-id-card' },
                { name: 'Sales Register containing all outward invoices', icon: 'fa-file-invoice' },
                { name: 'Purchase Register with inward supply bills', icon: 'fa-receipt' },
                { name: 'Bank statements and ledger details for the period', icon: 'fa-file-invoice-dollar' }
            ],
            faqs: [
                { q: 'How many returns must a normal taxpayer file?', a: 'A regular taxpayer must file GSTR-1 (sales details) and GSTR-3B (tax summary) monthly, along with an annual return (GSTR-9), totaling 25-26 filings a year.' },
                { q: 'What is GSTR-3B?', a: 'GSTR-3B is a self-declared monthly summary return that details outward supplies, input tax credit claimed, and tax paid.' }
            ]
        },
        'gst-nil-return-filing': {
            title: 'GST Nil Return Filing',
            category: 'startup',
            icon: 'fa-circle-check',
            image: 'assets/company registration.webp',
            shortDesc: 'File your GST NIL Return On-Time',
            subtitle: 'File your GST NIL Return On-Time | 100% Hassle-Free Process',
            desc: 'Let the country\'s leading business taxation experts Evaluate, Manage, and File your GST NIL Returns | Complete Digital Assistance at your Fingertips. If you have no sales or purchases in a return period, you must still file a Nil return to avoid active penalties.',
            benefits: [
                '100% Hassle-Free Process guided by GST experts',
                'Quick 5-step workflow from payment to success confirmation',
                'Pre-approval checks before final filing submission',
                'Avoid daily compounding late fees on inactive periods',
                'Fingertip digital tracking of filing records'
            ],
            documents: [
                { name: 'GSTIN of Business Entity', icon: 'fa-id-card' },
                { name: 'Declared statement of zero sales & purchases for the tax period', icon: 'fa-file-signature' },
                { name: 'Bank statement verifying zero transactions during the period', icon: 'fa-file-invoice' }
            ],
            faqs: [
                { q: 'Is it mandatory to file a GST return if there is no business?', a: 'Yes, filing GSTR-1 and GSTR-3B is mandatory even if there are zero transactions (Nil Return), otherwise late fees will apply.' },
                { q: 'Can I file a Nil return via SMS?', a: 'Yes, the government allows filing Nil GSTR-3B and GSTR-1 via SMS, but our experts ensure it is logged correctly in the GST portal with official records.' }
            ]
        },
        'gst-modification': {
            title: 'GST Modification',
            category: 'startup',
            icon: 'fa-pen-to-square',
            image: 'assets/company registration.webp',
            shortDesc: 'GST Modification Services & Amendments',
            subtitle: 'GST Modification Services for GST Registration Amendments',
            desc: 'Online Legal India will help you fulfill all the formalities regarding the GST modification and amendment of GST registration. Any changes made in the GST Registration or the details entered in the GST certificate are referred to as GST modification or update. One may go for change in GST Registration if he/she wishes from composite to normal scheme, or if there are mistakes in GST registration. To get GST modification, you need to file form GST REG 14.',
            benefits: [
                'Filing Form GST REG 14 for core and non-core amendments',
                'Updating name of business or principal place of business address',
                'Adding or altering additional places of business',
                'Addition, deletion, or retirement of partners/directors/CEO',
                'Updating mobile number or email of the authorized signatory'
            ],
            documents: [
                { name: 'Copy of current GST Registration Certificate', icon: 'fa-id-card' },
                { name: 'Proof of change (e.g. Rent Agreement for new address)', icon: 'fa-file-contract' },
                { name: 'Partnership deed or modified MOA / AOA (if partners/directors change)', icon: 'fa-file-lines' },
                { name: 'ID and Address proof of new directors/partners', icon: 'fa-id-badge' }
            ],
            faqs: [
                { q: 'What is Form GST REG-14?', a: 'GST REG-14 is the amendment application filed on the GST portal to notify and seek approval for changes in your registration details.' },
                { q: 'What is the difference between Core and Non-Core fields?', a: 'Core fields (like business name, address, or directors) require approval from tax officers, while non-core fields (like contact info) are updated instantly upon filing.' }
            ]
        },
        'gstr-9-annual-filing': {
            title: 'GSTR-9 Annual Filing',
            category: 'startup',
            icon: 'fa-calendar-check',
            image: 'assets/company registration.webp',
            shortDesc: 'GSTR-9 Annual Return Filing Online',
            subtitle: 'GSTR-9 Annual Return Filing Online | Step-by-Step Guide & Support',
            desc: 'Our Tax Experts are Never Late in Filing Annual GSTR-9 for You | Get 360° Professional Guidance in Each Step from Collecting Documents to GST Filing. As per the Central Goods and Services Act, 2017, every registered business entity is mandated to file GSTR-9 annually. GSTR-9 contains information about all the sales, purchases, refunds, or input tax credit by all tax-payers, Special Economic Zone (SEZ) units, SEZ developers, and many more.',
            benefits: [
                'Abolition of the Cascading Effect (tax-on-tax calculations)',
                'Organized single-time yearly tax reconciliation payment',
                'Enables nation-wide market access without regional barriers',
                'Assisting startups and SEZ units to stay compliant',
                'Complete validation of input tax credit matches'
            ],
            documents: [
                { name: 'Details of total Inward and Outward Supplies in the scheduled Financial Year', icon: 'fa-clipboard-list' },
                { name: 'Income Tax Credit Ledger for the scheduled Financial Year', icon: 'fa-file-invoice-dollar' },
                { name: 'GSTIN of Business Entity/Seller', icon: 'fa-id-card' },
                { name: 'GST Reconciliation Statement details', icon: 'fa-file-signature' },
                { name: 'Details of the Block Credit, Capital Goods, and related documents', icon: 'fa-file-lines' }
            ],
            faqs: [
                { q: 'Who is liable to file GSTR-9?', a: 'GSTR-9 is optional for businesses with turnover up to Rs. 2 crores, but mandatory for businesses exceeding Rs. 2 crores. Businesses exceeding Rs. 5 crores must file GSTR-9 along with GSTR-9C (reconciliation statement).' },
                { q: 'What is the due date for GSTR-9 filing?', a: 'The standard due date for filing GSTR-9 is 31st December (or altered dates like 31st October as per government extensions) following the end of the financial year.' }
            ]
        },
        'gst-lut-filing': {
            title: 'GST LUT Filing',
            category: 'startup',
            icon: 'fa-earth-americas',
            image: 'assets/company registration.webp',
            shortDesc: 'GST LUT (Letter of Undertaking) Filing Online',
            subtitle: 'GST LUT (Letter of Undertaking) Filing Online | Compliance Support',
            desc: 'Launch your Export Business in the Foreign Market with GST LUT Filing from our Specialised Taxation Team at Online Legal India | Get Approval Quickly. GST Letter of Undertaking or Bond legally enables a business personnel or seller to operate an Export business without paying the imposed Tax.',
            benefits: [
                'Export products and services without paying additional IGST tax',
                'Long validity of one entire Financial Year period',
                'Composure in terms of relaxation from Customs Duty',
                'Capital friendly process: saves working capital and avoids refund wait times',
                'Convenient, 100% digital filing process since April 2018'
            ],
            documents: [
                { name: 'GST Registration Certificate', icon: 'fa-id-card' },
                { name: 'Import Export Code (IEC) certificate copy', icon: 'fa-ship' },
                { name: 'Details of 2 Nominees/Witnesses (1 must be an Employed Accountant)', icon: 'fa-users' },
                { name: 'PAN and Aadhaar Card of the Business Owners', icon: 'fa-id-badge' },
                { name: 'Bank credentials (Canceled Cheque copy)', icon: 'fa-money-check' },
                { name: 'PAN details of the Business Entity', icon: 'fa-file-lines' }
            ],
            faqs: [
                { q: 'What is a Letter of Undertaking (LUT) under GST?', a: 'An LUT is a document filed on the GST portal that allows exporters to export goods or services without paying Integrated GST (IGST).' },
                { q: 'For how long is an LUT valid?', a: 'An LUT is valid for one financial year. A fresh LUT must be filed for each subsequent financial year.' }
            ]
        },
        'gst-eway-bill': {
            title: 'GST E-Way Bill',
            category: 'startup',
            icon: 'fa-truck-ramp-box',
            image: 'assets/company registration.webp',
            shortDesc: 'GST e-Way Bill Generation Assistance',
            subtitle: 'Get GST e-Way Bill Generation Online Assistance Through a Trusted Portal',
            desc: 'Trusted by over 1,20,000+ Corporate Entities | 360° GST Online E-Way Bill Generation Assistance from anywhere in our Nation. Having registered for GST E-Billing leads to various advantages and benefits before transporting goods.',
            benefits: [
                'Eliminates checkpoint complications and paper processing delays',
                'Digital procedure is significantly faster and easier to verify',
                'Unified document for seamless nation-wide cargo transport',
                'Tracks shipment movements to enhance transport security',
                'Ensures preset timing and schedules for faster cargo transit'
            ],
            documents: [
                { name: 'GST Invoice / receipt / challan for the transported goods', icon: 'fa-file-invoice' },
                { name: 'Detailed description and weight of the transported goods', icon: 'fa-box-open' },
                { name: 'Date of invoice and transaction details', icon: 'fa-calendar-days' },
                { name: 'Transport details (Vehicle number for road; Transporter ID & travel docs for rail/air/sea)', icon: 'fa-truck' }
            ],
            faqs: [
                { q: 'When is a GST E-Way Bill required?', a: 'An E-Way Bill is required for any movement of goods worth more than Rs. 50,000 in a vehicle, whether inter-state or intra-state.' },
                { q: 'Who is responsible for generating the E-Way Bill?', a: 'The registered consignor or consignee who causes the movement of goods is responsible, or the transporter if neither does.' }
            ]
        },
        'criminal': {
            title: 'Criminal Defense',
            category: 'legal',
            icon: 'fa-shield-halved',
            image: 'assets/Cyber fraud.webp',
            shortDesc: 'Bail, FIR, Appeals, Criminal disputes',
            subtitle: 'Robust representation for your civil liberties.',
            desc: 'Protect your legal rights during emergencies. Get immediate support for anticipatory bail, regular bails, quashing of FIRs under Section 482, and representation in district courts & high courts.',
            benefits: ['24/7 emergency bail application filing', 'FIR quashing and stay on arrests', 'Defense in fraud, theft, and assault cases', 'Cheque bounce defense & cases'],
            faqs: [
                { q: 'What is anticipatory bail?', a: 'Antigravity bail is a preemptive court order that protects a person from arrest in case of accusation of a non-bailable offence.' }
            ]
        }
    };

    const expertData = {
        'rohan': {
            id: 'rohan',
            name: 'Adv. Rohan Mehta',
            specialty: 'Criminal Law Expert',
            shortSpecialty: 'Criminal Law',
            expYears: 8,
            rating: 4.9,
            reviewsCount: 120,
            casesCount: '500+',
            clientsCount: '200+',
            successRate: '98%',
            consultFee: 99,
            originalFee: 499,
            available: true,
            img: 'assets/Lawyer (1).webp',
            bio: 'Adv. Rohan Mehta is a seasoned Criminal Law Expert with over 8 years of experience in handling complex criminal cases across various courts in India. He specializes in bail matters, FIR quashing, criminal defense, and high court litigation.<br><br>Known for his client-first approach, strategic thinking, and strong court presence, he has successfully represented hundreds of clients and helped them achieve favorable outcomes.',
            bullets: [
                'Enrolled with Bar Council of Delhi (2016)',
                'LL.B. from Campus Law Centre, University of Delhi',
                'Expert in High Court & Supreme Court Matters',
                'Dedicated support throughout your legal journey'
            ],
            tags: ['Criminal Law', 'Bail & FIR', 'Cheque Bounce', 'NDPS Cases', 'Cyber Crime', 'White Collar Crime'],
            education: [
                { title: 'LL.B., Campus Law Centre', span: 'University of Delhi' },
                { title: 'Bar Council of Delhi', span: 'Enrollment No. D/12345/2016' },
                { title: 'Certificate in Criminal Law', span: 'NALSAR University of Law' },
                { title: 'Member', span: 'Delhi High Court Bar Association' }
            ],
            casesList: [
                { title: 'Bail Granted in NDPS Case', desc: 'Secured anticipatory bail for client in NDPS matter under Section 37 after strong legal arguments.', result: 'Bail Granted', statusClass: 'success' },
                { title: 'FIR Quashed', desc: 'Successfully quashed false FIR registered against client for financial fraud.', result: 'Case Quashed', statusClass: 'info' },
                { title: 'Cheque Bounce Case', desc: 'Defended client in cheque bounce case under Section 138 NI Act. Case dismissed.', result: 'Case Dismissed', statusClass: 'warning' },
                { title: 'Acquittal in Criminal Case', desc: 'Got client acquitted in a criminal case involving allegations of assault and intimidation.', result: 'Acquitted', statusClass: 'success' }
            ],
            reviewsList: [
                { user: 'Amit Sharma', rating: 5, text: 'Adv. Rohan Mehta is an excellent lawyer. He handled my case with utmost professionalism and got me bail quickly. Highly recommended!' },
                { user: 'Neha Gupta', rating: 5, text: 'Very knowledgeable and supportive. He guided me at every step and explained everything clearly.' },
                { user: 'Vikram S.', rating: 5, text: 'He is a brilliant lawyer with deep knowledge of criminal law. My case was resolved in my favor.' }
            ]
        },
        'sneha': {
            id: 'sneha',
            name: 'Adv. Sneha Kapoor',
            specialty: 'Family Law Expert',
            shortSpecialty: 'Family Law',
            expYears: 6,
            rating: 4.8,
            reviewsCount: 98,
            casesCount: '350+',
            clientsCount: '150+',
            successRate: '95%',
            consultFee: '20/min',
            originalFee: '99/min',
            available: true,
            img: 'assets/Lawyer (2).webp',
            bio: 'Adv. Sneha Kapoor specializes in matrimonial and family dispute cases, including divorce, alimony, child custody, and domestic violence. She offers compassionate yet firm representation for her clients.',
            bullets: [
                'Enrolled with Bar Council of Maharashtra & Goa (2018)',
                'LL.M. in Family Law from SNDT Women\'s University',
                'Expert Mediator and Dispute Resolution Specialist',
                'Compassionate advice tailored to your personal situation'
            ],
            tags: ['Divorce', 'Alimony', 'Child Custody', 'Domestic Violence', 'Family Mediation'],
            education: [
                { title: 'LL.B., Government Law College', span: 'Mumbai' },
                { title: 'LL.M. (Family Law)', span: 'SNDT Women\'s University' },
                { title: 'Enrollment No.', span: 'MAH/5678/2018' },
                { title: 'Member', span: 'Family Court Bar Association, Mumbai' }
            ],
            casesList: [
                { title: 'Mutual Consent Divorce', desc: 'Settle mutual divorce proceedings and alimony settlement within 6 months.', result: 'Settled', statusClass: 'success' },
                { title: 'Sole Custody Granted', desc: 'Won sole physical custody of child for mother with visitation rights to father.', result: 'Custody Granted', statusClass: 'info' }
            ],
            reviewsList: [
                { user: 'Priya D.', rating: 5, text: 'She handled my divorce proceedings with a lot of empathy and got me a fair alimony settlement.' },
                { user: 'Rakesh Verma', rating: 4.8, text: 'Helped resolve child custody disputes smoothly without dragging the matter in court.' }
            ]
        },
        'vikram': {
            id: 'vikram',
            name: 'Adv. Vikram Singh',
            specialty: 'Property Law Expert',
            shortSpecialty: 'Property Law',
            expYears: 10,
            rating: 4.9,
            reviewsCount: 110,
            casesCount: '600+',
            clientsCount: '300+',
            successRate: '96%',
            consultFee: 99,
            originalFee: 499,
            available: true,
            img: 'assets/Lawyer (1).webp',
            bio: 'Adv. Vikram Singh has extensive experience in property verification, real estate documentation, RERA complaints, and handling property title litigation in civil courts.',
            bullets: [
                'Enrolled with Bar Council of Delhi (2014)',
                'LL.B. from Faculty of Law, University of Delhi',
                'Consultant for top real estate developers',
                'Expert title checker with 1000+ verifications completed'
            ],
            tags: ['Property Disputes', 'RERA', 'Title Verification', 'Partition Suits', 'Lease Deeds'],
            education: [
                { title: 'LL.B., Faculty of Law', span: 'University of Delhi' },
                { title: 'Enrollment No.', span: 'D/9876/2014' },
                { title: 'Diploma in Real Estate Law', span: 'ILI, New Delhi' },
                { title: 'Member', span: 'Delhi High Court Bar Association' }
            ],
            casesList: [
                { title: 'RERA Refund Granted', desc: 'Secured full refund with interest for homebuyer due to builder delay.', result: 'Refund Granted', statusClass: 'success' },
                { title: 'Partition Suit Settled', desc: 'Resolved family ancestral property division amicably out of court.', result: 'Amicably Settled', statusClass: 'info' }
            ],
            reviewsList: [
                { user: 'Sunil Kumar', rating: 5, text: 'His property title report was very detailed and saved me from investing in a disputed land.' },
                { user: 'Maya Roy', rating: 5, text: 'Highly professional. He helped file my RERA complaint and got me a refund.' }
            ]
        },
        'ankita': {
            id: 'ankita',
            name: 'Adv. Ankita Singh',
            specialty: 'Property Law Expert',
            shortSpecialty: 'Property Law',
            expYears: 10,
            rating: 4.9,
            reviewsCount: 110,
            casesCount: '600+',
            clientsCount: '300+',
            successRate: '96%',
            consultFee: 99,
            originalFee: 499,
            available: true,
            img: 'assets/Lawyer (3).webp',
            bio: 'Adv. Ankita Singh has extensive experience in relationship consultation , ODR, real estate documentation, RERA complaints, and handling property title litigation in civil courts.',
            bullets: [
                'Enrolled with Bar Council of Delhi (2014)',
                'LL.B. from Faculty of Law, University of Delhi',
                'Consultant for top real estate developers',
                'Expert title checker with 1000+ verifications completed'
            ],
            tags: ['Property Disputes', 'RERA', 'Title Verification', 'Partition Suits', 'Lease Deeds'],
            education: [
                { title: 'LL.B., Faculty of Law', span: 'University of Delhi' },
                { title: 'Enrollment No.', span: 'D/9879/2018' },
                { title: 'Diploma in Real Estate Law', span: 'ILI, New Delhi' },
                { title: 'Member', span: 'Delhi High Court Bar Association' }
            ],
            casesList: [
                { title: 'RERA Refund Granted', desc: 'Secured full refund with interest for homebuyer due to builder delay.', result: 'Refund Granted', statusClass: 'success' },
                { title: 'Partition Suit Settled', desc: 'Resolved family ancestral property division amicably out of court.', result: 'Amicably Settled', statusClass: 'info' }
            ],
            reviewsList: [
                { user: 'Aman Kumar', rating: 5, text: 'His property title report was very detailed and saved me from investing in a disputed land.' },
                { user: 'Riya Roy', rating: 5, text: 'Highly professional. He helped file my RERA complaint and got me a refund.' }
            ]
        },
        'chandramauli': {
            id: 'chandramauli',
            name: 'Adv. Chandramauli Kumar',
            specialty: 'Legal Expert',
            shortSpecialty: 'All Legal Matters',
            expYears: 10,
            rating: 4.9,
            reviewsCount: 110,
            casesCount: '600+',
            clientsCount: '300+',
            successRate: '96%',
            consultFee: 99,
            originalFee: 499,
            available: true,
            img: 'chandramauli.webp',
            bio: 'Adv.  Chandramauli Kumar has extensive experience in property verification, real estate documentation, RERA complaints, and handling property title litigation in civil courts.',
            bullets: [
                'Member of Bar Council',
                'LL.B. from Faculty of Law,',
                'Practices at Patna High Court',
                'Expert title checker with 1000+ verifications completed'
            ],
            tags: ['Property Disputes', 'RERA', 'Title Verification', 'Partition Suits', 'Lease Deeds'],
            education: [
                { title: 'LL.B., Faculty of Law', span: 'University of Delhi' },
                { title: 'Enrollment No.', span: 'BR/1715/2023' },
                { title: 'Diploma in Real Estate Law', span: 'ILI, New Delhi' },
                { title: 'Member', span: 'Delhi High Court Bar Association' }
            ],
            casesList: [
                { title: 'RERA Refund Granted', desc: 'Secured full refund with interest for homebuyer due to builder delay.', result: 'Refund Granted', statusClass: 'success' },
                { title: 'Partition Suit Settled', desc: 'Resolved family ancestral property division amicably out of court.', result: 'Amicably Settled', statusClass: 'info' }
            ],
            reviewsList: [
                { user: 'Sunil Kumar', rating: 5, text: 'His property title report was very detailed and saved me from investing in a disputed land.' },
                { user: 'Maya Roy', rating: 5, text: 'Highly professional. He helped file my RERA complaint and got me a refund.' }
            ]
        },
        'narendra': {
            id: 'narendra',
            name: 'Adv. Narendra Kumar',
            specialty: 'Legal Expert',
            shortSpecialty: 'All Legal Matters',
            expYears: 10,
            rating: 4.9,
            reviewsCount: 110,
            casesCount: '600+',
            clientsCount: '300+',
            successRate: '96%',
            consultFee: 99,
            originalFee: 499,
            available: true,
            img: 'narendra.webp',
            bio: 'Adv.  Narendra Kumar has extensive experience in property verification, real estate documentation, RERA complaints, and handling property title litigation in civil courts.',
            bullets: [
                'Member of Bar Council',
                'LL.B. from Faculty of Law,',
                'Practices in Rajasthan',
                'Expert title checker with 1000+ verifications completed'
            ],
            tags: ['Property Disputes', 'RERA', 'Title Verification', 'Partition Suits', 'Lease Deeds'],
            education: [
                { title: 'LL.B., Faculty of Law', span: 'University of Delhi' },
                { title: 'Enrollment No.', span: 'RJ/XXXX/XXXX' },
                { title: 'Diploma in Real Estate Law', span: 'ILI, New Delhi' },
                { title: 'Member', span: 'Delhi High Court Bar Association' }
            ],
            casesList: [
                { title: 'RERA Refund Granted', desc: 'Secured full refund with interest for homebuyer due to builder delay.', result: 'Refund Granted', statusClass: 'success' },
                { title: 'Partition Suit Settled', desc: 'Resolved family ancestral property division amicably out of court.', result: 'Amicably Settled', statusClass: 'info' }
            ],
            reviewsList: [
                { user: 'Rohan Awasthi', rating: 5, text: 'His property title report was very detailed and saved me from investing in a disputed land.' },
                { user: 'Sushmita Kumari', rating: 5, text: 'Highly professional. He helped file my RERA complaint and got me a refund.' }
            ]
        },
        'priya': {
            id: 'priya',
            name: 'Adv. Priya Sharma',
            specialty: 'Corporate Law Expert',
            shortSpecialty: 'Corporate Law',
            expYears: 7,
            rating: 4.8,
            reviewsCount: 85,
            casesCount: '400+',
            clientsCount: '250+',
            successRate: '97%',
            consultFee: 99,
            originalFee: 499,
            available: true,
            img: 'assets/Lawyer (4).webp',
            bio: 'Adv. Priya Sharma advises startups, MSMEs and corporates on business setups, compliance, contract drafting, licensing, and mergers & acquisitions.',
            bullets: [
                'Enrolled with Bar Council of Karnataka (2017)',
                'LL.B. from NLSIU, Bengaluru',
                'Advisor to 50+ technology startups',
                'Specialist in venture capital contract drafting'
            ],
            tags: ['Company Registration', 'Contracts', 'Compliance', 'Tax Law', 'Founder Agreements'],
            education: [
                { title: 'B.A., LL.B. (Hons.)', span: 'National Law School of India University (NLSIU)' },
                { title: 'Enrollment No.', span: 'KAR/3421/2017' },
                { title: 'Advisor', span: 'Startup Karnataka Mentor Network' }
            ],
            casesList: [
                { title: 'VC Funding Legal Close', desc: 'Drafted and closed Share Subscription Agreements for $2M Series A round.', result: 'Closed successfully', statusClass: 'success' },
                { title: 'Contract Dispute Resolved', desc: 'Negotiated out-of-court settlement for client in a vendor breach of contract.', result: 'Settled Out of Court', statusClass: 'info' }
            ],
            reviewsList: [
                { user: 'Karan J. (Founder)', rating: 5, text: 'Priya has been our go-to legal advisor since incorporation. Her founder agreement draft was perfect.' },
                { user: 'Anjali Shah', rating: 4.6, text: 'Very precise contract review. Saved us from harsh termination clauses in a client contract.' }
            ]
        },
        'arjun': {
            id: 'arjun',
            name: 'Adv. Arjun Nair',
            specialty: 'IP Law Expert',
            shortSpecialty: 'IP Law',
            expYears: 5,
            rating: 4.7,
            reviewsCount: 65,
            casesCount: '200+',
            clientsCount: '120+',
            successRate: '94%',
            consultFee: 99,
            originalFee: 499,
            available: true,
            img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
            bio: 'Adv. Arjun Nair specializes in IP litigation, trademark opposition filings, patent applications, and copyright registrations.',
            bullets: [
                'Enrolled with Bar Council of Delhi (2019)',
                'B.B.A. LL.B. from Symbiosis Law School, Pune',
                'Registered Patent Agent',
                'Expert in anti-counterfeiting campaigns'
            ],
            tags: ['Trademarks', 'Patents', 'Copyrights', 'IP Litigation', 'Licensing'],
            education: [
                { title: 'B.B.A. LL.B.', span: 'Symbiosis Law School, Pune' },
                { title: 'Registered Patent Agent', span: 'Govt. of India' },
                { title: 'Enrollment No.', span: 'D/4231/2019' }
            ],
            casesList: [
                { title: 'Trademark Opposed Successfully', desc: 'Fought and won trademark opposition case against a competitor using a similar logo.', result: 'Opposition Won', statusClass: 'success' },
                { title: 'Copyright Restored', desc: 'Sent cease & desist and got stolen code removed from public domain.', result: 'Content Removed', statusClass: 'info' }
            ],
            reviewsList: [
                { user: 'Deepak M.', rating: 5, text: 'Super fast trademark filing. He explained the objections and cleared them easily.' },
                { user: 'Shreya Roy', rating: 4.5, text: 'Helped us patent our software design. Highly professional and cost-effective.' }
            ]
        }
    };

    // ==========================================================================
    // 2. Global Reveal Animations (Intersection Observer)
    // ==========================================================================
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };
    const revealObserver = new IntersectionObserver(revealCallback, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Sticky header scroll behavior
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 30) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
            }
        });
    }

    // ==========================================================================
    // 3. AI Legal Assistant Logic (Simulated Chat)
    // ==========================================================================
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const chatForm = document.getElementById('chat-form');

    if (chatBody && chatForm && chatInput) {
        
        // Helper to append message to chat
        const appendMessage = (text, sender = 'ai') => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-msg chat-msg-${sender}`;
            msgDiv.innerHTML = text;
            chatBody.appendChild(msgDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
            return msgDiv;
        };

        // Helper to append typing indicator
        const appendTypingIndicator = () => {
            const indDiv = document.createElement('div');
            indDiv.className = 'typing-indicator';
            indDiv.innerHTML = `
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            `;
            chatBody.appendChild(indDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
            return indDiv;
        };

        // Simulate AI Response based on input
        const generateAIResponse = (userQuery) => {
            const query = userQuery.toLowerCase();
            let reply = '';

            if (query.includes('property') || query.includes('house') || query.includes('land') || query.includes('rent') || query.includes('dispute')) {
                reply = `For <strong>Property issues</strong>, we can assist with Title Verification, RERA builder disputes, tenant resolutions, and registry documentation. <br><br>I suggest booking a consult call with our Property Expert, <strong>Adv. Vikram Singh</strong>. <a href="lawyer-details.html?id=vikram" style="color:var(--secondary-hover); font-weight:700;">View Profile</a>`;
            } else if (query.includes('marriage') || query.includes('divorce') || query.includes('custody') || query.includes('alimony') || query.includes('spouse')) {
                reply = `For <strong>Relationship & Family issues</strong>, we offer sensitive, confidential consultation on mutual separations, custody matters, and family maintenance legalities. <br><br>I suggest booking a call with <strong>Adv. Sneha Kapoor</strong>, our Family Law Expert. <a href="lawyer-details.html?id=sneha" style="color:var(--secondary-hover); font-weight:700;">View Profile</a>`;
            } else if (query.includes('criminal') || query.includes('bail') || query.includes('police') || query.includes('fir') || query.includes('court')) {
                reply = `For <strong>Criminal or Emergency disputes</strong>, we offer fast-tracked filings for anticipatory/regular bails, FIR quashing, and robust court defenses.<br><br>I highly recommend calling <strong>Adv. Rohan Mehta</strong>, our Criminal Law Specialist. <a href="lawyer-details.html?id=rohan" style="color:var(--secondary-hover); font-weight:700;">View Profile</a>`;
            } else if (query.includes('trademark') || query.includes('copyright') || query.includes('patent') || query.includes('ip') || query.includes('brand')) {
                reply = `For <strong>Intellectual Property</strong>, we handle registration search, filing, and copyright disputes for brand names and software.<br><br>You can consult <strong>Adv. Arjun Nair</strong>, our IP Law Specialist. <a href="lawyer-details.html?id=arjun" style="color:var(--secondary-hover); font-weight:700;">View Profile</a>`;
            } else if (query.includes('business') || query.includes('company') || query.includes('incorporation') || query.includes('gst') || query.includes('compliance')) {
                reply = `For <strong>Business setups & accounting compliance</strong>, we support Pvt Ltd incorporation, annual filings, LLPs, and GST taxation registrations.<br><br>You can consult <strong>Adv. Priya Sharma</strong>, our Corporate Compliance Expert. <a href="lawyer-details.html?id=priya" style="color:var(--secondary-hover); font-weight:700;">View Profile</a>`;
            } else {
                reply = `Thanks for reaching out! To get authentic legal guidance matching your exact case details, we recommend booking a fixed-fee consultation (<strong>₹99 only</strong>) with a verified specialist. <br><br><a href="lawyers.html" style="color:var(--secondary-hover); font-weight:700;">Browse Top Lawyers</a>`;
            }

            const indicator = appendTypingIndicator();
            setTimeout(() => {
                indicator.remove();
                appendMessage(reply, 'ai');
            }, 1000);
        };

        // Listen for quick-option button clicks
        document.querySelectorAll('.ai-opt-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const text = btn.innerText.trim();
                appendMessage(text, 'user');
                
                // Hide options panel to clean up
                const optionsDiv = document.querySelector('.ai-options');
                if (optionsDiv) optionsDiv.style.display = 'none';

                let replyText = '';
                if (text.includes('legal issue')) {
                    replyText = `Understood. What is the nature of your legal issue? (e.g. Property, Divorce, Criminal Defence, Business Setup, Debt recovery). Please tell me in a few words below:`;
                } else if (text.includes('document review')) {
                    replyText = `We review agreements, sale deeds, lease terms, and business contracts for hidden liabilities. What document do you need reviewed?`;
                } else if (text.includes('case status')) {
                    replyText = `Please share your case details, court name, or CNR number to look up status records, or consult with a verified litigator directly.`;
                } else {
                    replyText = `Tell me what legal query or advice you need, and I will match you with the best specialist.`;
                }

                const indicator = appendTypingIndicator();
                setTimeout(() => {
                    indicator.remove();
                    appendMessage(replyText, 'ai');
                }, 800);
            });
        });

        // Form submit input
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;

            appendMessage(text, 'user');
            chatInput.value = '';

            // Hide options panel if visible
            const optionsDiv = document.querySelector('.ai-options');
            if (optionsDiv) optionsDiv.style.display = 'none';

            generateAIResponse(text);
        });
    }

    // ==========================================================================
    // 4. Monthly / Yearly Pricing Toggle
    // ==========================================================================
    const pricingSwitch = document.getElementById('pricing-switch');
    const labelMonthly = document.getElementById('toggle-monthly');
    const labelYearly = document.getElementById('toggle-yearly');

    if (pricingSwitch && labelMonthly && labelYearly) {
        
        const updatePricingDisplay = (isYearly) => {
            const pricingCards = document.querySelectorAll('.pricing-card');
            
            // Toggle active labels
            if (isYearly) {
                pricingSwitch.classList.add('yearly');
                labelYearly.classList.add('active');
                labelMonthly.classList.remove('active');
            } else {
                pricingSwitch.classList.remove('yearly');
                labelMonthly.classList.add('active');
                labelYearly.classList.remove('active');
            }

            pricingCards.forEach(card => {
                const priceElement = card.querySelector('.plan-price');
                const periodElement = card.querySelector('.plan-period');
                const plan = card.dataset.plan;

                if (!priceElement || !plan) return;

                if (plan === 'basic') {
                    priceElement.textContent = isYearly ? '₹239' : '₹299';
                } else if (plan === 'standard') {
                    priceElement.textContent = isYearly ? '₹479' : '₹559'; // Save 20%
                } else if (plan === 'premium') {
                    priceElement.textContent = isYearly ? '₹799' : '₹999';
                }
            });
        };

        pricingSwitch.addEventListener('click', () => {
            const isYearly = !pricingSwitch.classList.contains('yearly');
            updatePricingDisplay(isYearly);
        });

        labelMonthly.addEventListener('click', () => updatePricingDisplay(false));
        labelYearly.addEventListener('click', () => updatePricingDisplay(true));
    }

    // ==========================================================================
    // 5. Directory Render: lawyers.html
    // ==========================================================================
    const directoryContainer = document.getElementById('directory-lawyers-container');
    
    if (directoryContainer) {
        
        const renderDirectory = () => {
            const searchVal = document.getElementById('dir-search')?.value.toLowerCase() || '';
            const specVal = document.getElementById('dir-specialty')?.value || 'all';
            const sortVal = document.getElementById('dir-sort')?.value || 'rating';

            // Filter
            let list = Object.values(expertData).filter(lawyer => {
                const matchesSearch = lawyer.name.toLowerCase().includes(searchVal) || 
                                      lawyer.specialty.toLowerCase().includes(searchVal) ||
                                      lawyer.tags.some(tag => tag.toLowerCase().includes(searchVal));
                
                const matchesSpec = specVal === 'all' || lawyer.shortSpecialty.toLowerCase() === specVal.toLowerCase();
                
                return matchesSearch && matchesSpec;
            });

            // Sort
            if (sortVal === 'rating') {
                list.sort((a, b) => b.rating - a.rating);
            } else if (sortVal === 'experience') {
                list.sort((a, b) => b.expYears - a.expYears);
            }

            // Render
            let html = '';
            if (list.length > 0) {
                html = list.map(lawyer => `
                    <div class="lawyer-card-horizontal reveal active">
                        <div class="lawyer-img-wrapper">
                            <a href="lawyer-details.html?id=${lawyer.id}"><img src="${lawyer.img}" alt="${lawyer.name}" style="transition: var(--transition);"></a>
                        </div>
                        <div class="lawyer-details-mid">
                            <div class="lawyer-details-header" style="align-items: center;">
                                <a href="lawyer-details.html?id=${lawyer.id}" style="text-decoration: none; color: inherit;"><h3 style="margin: 0; font-size: 18px; font-weight: 700; transition: var(--transition);">${lawyer.name}</h3></a>
                                <i class="fas fa-check-circle lawyer-verified-icon" title="Verified Expert" style="margin-left: 8px;"></i>
                                ${lawyer.available ? `<span class="lawyer-availability-badge" style="padding: 2px 8px; font-size:10px; margin-left:10px;">Available</span>` : ''}
                            </div>
                            <div class="lawyer-mid-specialty">${lawyer.specialty}</div>
                            <div class="lawyer-mid-meta">
                                <span class="lawyer-rating">
                                    <i class="fas fa-star"></i> ${lawyer.rating} 
                                    <span class="lawyer-reviews-count">(${lawyer.reviewsCount} reviews)</span>
                                </span>
                                <span class="lawyer-exp"><strong>${lawyer.expYears}+ Years</strong> Exp.</span>
                            </div>
                            <p class="lawyer-desc">${lawyer.bio.split('<br>')[0]}</p>
                            <div class="lawyer-tags-row">
                                ${lawyer.tags.slice(0, 4).map(tag => `<span class="lawyer-tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                        <div class="lawyer-fee-box">
                            <span class="fee-label">Consultation Fee</span>
                            <div class="fee-pricing">
                                <span class="fee-original">₹${lawyer.originalFee}</span>
                                <span class="fee-discounted">₹${lawyer.consultFee}</span>
                            </div>
                            <span class="fee-offer-text">Limited Time Offer</span>
                            <a href="#" class="btn btn-primary book-call-btn" data-id="${lawyer.id}" style="width: 100%;">Book @ ₹${lawyer.consultFee}</a>
                            <a href="lawyer-details.html?id=${lawyer.id}" class="btn btn-outline" style="width: 100%; padding: 10px; margin-top: 8px; font-size: 13px; border-radius: 6px;">View Profile</a>
                            <span class="fee-guarantee-text" style="margin-top: 8px;"><i class="fas fa-shield-halved"></i> 100% Confidential</span>
                        </div>
                    </div>
                `).join('');
            } else {
                html = '<div style="text-align:center; padding: 40px; color:var(--text-muted); grid-column: 1/-1;">No expert lawyers found matching your query.</div>';
            }

            directoryContainer.innerHTML = html;
        };

        // Attach listeners
        ['dir-search', 'dir-specialty', 'dir-sort'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', renderDirectory);
                el.addEventListener('change', renderDirectory);
            }
        });

        // Check for URL search/specialty params to pre-filter on load
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        const specialtyParam = urlParams.get('specialty');
        
        if (specialtyParam) {
            const specialtySelect = document.getElementById('dir-specialty');
            if (specialtySelect) {
                let normParam = specialtyParam.toLowerCase().trim();
                // Map common lawyer terms to existing categories
                if (normParam.includes('criminal')) normParam = 'criminal law';
                else if (normParam.includes('family')) normParam = 'family law';
                else if (normParam.includes('property') || normParam.includes('estate') || normParam.includes('real estate')) normParam = 'property law';
                else if (normParam.includes('corporate')) normParam = 'corporate law';
                else if (normParam.includes('intellectual') || normParam.includes('ip')) normParam = 'ip law';

                let matched = false;
                for (let option of specialtySelect.options) {
                    if (option.value.toLowerCase() === normParam) {
                        specialtySelect.value = option.value;
                        matched = true;
                        break;
                    }
                }
                
                // If we couldn't map to a specific dropdown option, or to assist with matching, set the search field
                if (!matched) {
                    const searchInput = document.getElementById('dir-search');
                    if (searchInput) {
                        searchInput.value = specialtyParam;
                    }
                }
            }
        } else if (searchParam) {
            const searchInput = document.getElementById('dir-search');
            if (searchInput) {
                searchInput.value = searchParam;
            }
        }

        // First render
        renderDirectory();
    }

    // ==========================================================================
    // 6. Dynamic Lawyer Profile Loading: lawyer-details.html
    // ==========================================================================
    if (document.getElementById('lawyer-details-container')) {
        const params = new URLSearchParams(window.location.search);
        const lawyerId = params.get('id') || 'rohan'; // Default to Rohan Mehta
        const data = expertData[lawyerId];

        if (data) {
            // Document Title
            document.title = `${data.name} | Expert Profile | Legal And Vakil`;

            // Breadcrumbs
            const breadcrumbActive = document.querySelector('.breadcrumbs-bar span.active');
            if (breadcrumbActive) breadcrumbActive.textContent = data.name;

            // Profile header elements
            const pImg = document.getElementById('profile-img');
            const pName = document.getElementById('profile-name');
            const pSpecialty = document.getElementById('profile-specialty');
            const pExp = document.getElementById('profile-exp');
            const pRatingNum = document.getElementById('profile-rating-num');
            const pReviewsCount = document.getElementById('profile-reviews-count');
            
            if (pImg) pImg.src = data.img;
            if (pName) pName.textContent = data.name;
            if (pSpecialty) pSpecialty.textContent = data.specialty;
            if (pExp) pExp.textContent = `${data.expYears}+ Years of Experience`;
            if (pRatingNum) pRatingNum.textContent = data.rating;
            if (pReviewsCount) pReviewsCount.textContent = `(${data.reviewsCount} Reviews)`;

            // Tags row
            const tagsContainer = document.getElementById('profile-tags-container');
            if (tagsContainer) {
                tagsContainer.innerHTML = data.tags.map(tag => `<span class="lawyer-tag" style="font-size:12px; padding:6px 12px; background:#f1f5f9; border-radius:50px;">${tag}</span>`).join('');
            }

            // Right CTA fee block
            const originalFee = document.getElementById('cta-original-fee');
            const discountedFee = document.getElementById('cta-discounted-fee');
            const bookBtn = document.getElementById('cta-book-btn');
            
            if (originalFee) originalFee.textContent = `₹${data.originalFee}`;
            if (discountedFee) discountedFee.textContent = `₹${data.consultFee}`;
            if (bookBtn) {
                bookBtn.textContent = `Book a Call @ ₹${data.consultFee}`;
                bookBtn.setAttribute('data-id', data.id);
            }

            // Stats row counts
            const statCases = document.getElementById('stat-cases');
            const statClients = document.getElementById('stat-clients');
            const statRating = document.getElementById('stat-rating');
            const statExp = document.getElementById('stat-exp');

            if (statCases) statCases.textContent = data.casesCount;
            if (statClients) statClients.textContent = data.clientsCount;
            if (statRating) statRating.textContent = `${data.rating}/5`;
            if (statExp) statExp.textContent = `${data.expYears}+`;

            // About Text & list
            const pBio = document.getElementById('profile-bio');
            if (pBio) pBio.innerHTML = data.bio;

            const pBullets = document.getElementById('profile-bullets');
            if (pBullets) {
                pBullets.innerHTML = data.bullets.map(b => `<li><i class="fas fa-check-circle"></i> <span>${b}</span></li>`).join('');
            }

            // Expertise cards
            const expertiseContainer = document.getElementById('profile-expertise-grid');
            if (expertiseContainer) {
                // Generate expertise cards with icons matching tag areas
                expertiseContainer.innerHTML = data.tags.map(tag => `
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:16px; display:flex; align-items:center; gap:12px;">
                        <div style="width:36px; height:36px; border-radius:50%; background:#eff6ff; color:#2563eb; display:flex; align-items:center; justify-content:center;">
                            <i class="fas fa-scale-balanced"></i>
                        </div>
                        <span style="font-weight:600; font-size:14px;">${tag}</span>
                    </div>
                `).join('');
            }

            // Cases list
            const casesContainer = document.getElementById('profile-cases-grid');
            if (casesContainer) {
                casesContainer.innerHTML = data.casesList.map(c => `
                    <div class="case-handled-card">
                        <div class="case-handled-title">
                            <i class="fas fa-check-circle" style="color:var(--success);"></i>
                            <span>${c.title}</span>
                        </div>
                        <p>${c.desc}</p>
                        <div style="margin-top:auto;"><span class="badge badge-${c.statusClass}">${c.result}</span></div>
                    </div>
                `).join('');
            }

            // Reviews list
            const reviewsContainer = document.getElementById('profile-reviews-list');
            if (reviewsContainer) {
                reviewsContainer.innerHTML = data.reviewsList.map(r => `
                    <div class="review-card-item">
                        <div class="review-item-header">
                            <div class="review-item-user">
                                <div class="review-avatar-dot">${r.user.charAt(0)}</div>
                                <div class="review-username">${r.user}</div>
                            </div>
                            <div class="review-stars">
                                ${'<i class="fas fa-star"></i>'.repeat(Math.floor(r.rating))}
                            </div>
                        </div>
                        <div class="review-item-text">"${r.text}"</div>
                    </div>
                `).join('');
            }

            // Education & Credentials side list
            const credentialsContainer = document.getElementById('profile-credentials-list');
            if (credentialsContainer) {
                credentialsContainer.innerHTML = data.education.map(e => `
                    <div class="credential-item">
                        <i class="fas fa-graduation-cap"></i>
                        <div class="credential-item-text">
                            <strong>${e.title}</strong>
                            <span>${e.span}</span>
                        </div>
                    </div>
                `).join('');
            }
        }
    }

    // ==========================================================================
    // 7. Dynamic Service Loading: service-details.html
    // ==========================================================================
    if (document.getElementById('service-details-container')) {
        const params = new URLSearchParams(window.location.search);
        const serviceId = params.get('service') || 'marriage'; // Default to Marriage Consultation
        const data = serviceData[serviceId];

        if (data) {
            // Hide custom buy service banner by default
            const customBuySection = document.getElementById('custom-buy-service-section');
            if (customBuySection) customBuySection.style.display = 'none';
            // Document Title
            document.title = `${data.title} Services | Legal And Vakil`;

            // Titles & Image
            const sTitle = document.getElementById('service-detail-title');
            const sSubtitle = document.getElementById('service-detail-subtitle');
            const sOverview = document.getElementById('service-detail-overview');
            const sImage = document.getElementById('service-detail-image');
            
            if (sTitle) sTitle.textContent = data.title;
            if (sSubtitle) sSubtitle.textContent = data.subtitle;
            if (sOverview) sOverview.textContent = data.desc;
            if (sImage && data.image) {
                sImage.src = data.image;
                sImage.alt = data.title;
            }

            // Dynamic Pricing block
            const originalPriceEl = document.getElementById('service-original-price');
            const discountedPriceEl = document.getElementById('service-discounted-price');
            const bookBtnEl = document.getElementById('service-book-btn');

            if (serviceId === 'marriage') {
                if (originalPriceEl) originalPriceEl.textContent = '₹99/min';
                if (discountedPriceEl) discountedPriceEl.textContent = '₹20/min';
                if (bookBtnEl) bookBtnEl.innerHTML = `<i class="fas fa-calendar-check"></i> Book @ ₹20/min`;
            } else {
                if (originalPriceEl) originalPriceEl.textContent = '₹499';
                if (discountedPriceEl) discountedPriceEl.textContent = '₹99';
                if (bookBtnEl) bookBtnEl.innerHTML = `<i class="fas fa-calendar-check"></i> Book @ ₹99`;
            }

            // Toggle marriage-only help section
            const marriageHelp = document.getElementById('marriage-help-section');
            if (marriageHelp) {
                marriageHelp.style.display = (serviceId === 'marriage') ? 'block' : 'none';
            }

            // Company registration services interactive pricing
            const companyServices = ['pvt-ltd', 'opc', 'llp', 'section-8', 'public-ltd', 'nidhi', 'subsidiary', 'din-kyc', 'appointment-director', 'removal-director', 'pvt-ltd-winding-up', 'increase-authorized-capital', 'registered-office-change', 'change-company-name', 'moa-amendment-pvt', 'moa-amendment-sec8', 'moa-amendment-public', 'share-transfer', 'jansamarth-registration', 'credit-management-analysis', 'opc-to-pvt-ltd', 'pvt-to-public-ltd', 'llp-to-pvt-ltd', 'sec-8-winding-up', 'nidhi-winding-up', 'subsidiary-winding-up', 'fssai-registration', 'fssai-food-labeling', 'fssai-renewal', 'fssai-annual-return', 'fssai-modification', 'bis-certificate', 'import-export-code', 'import-export-modification', 'gst-registration', 'gst-return-filing', 'gst-nil-return-filing', 'gst-modification', 'gstr-9-annual-filing', 'gst-lut-filing', 'gst-eway-bill', 'online-annual-compliance-filing', 'annual-compliance-bookkeeping', 'online-tax-planning-consultancy', 'tax-compliance-guide', 'online-bookkeeping-service', 'section-8-company-compliance-filing', 'project-report-preparation', 'online-filing-dpt-3', 'ngo-darpan-registration'];
            if (companyServices.includes(serviceId)) {
                const stdPricing = document.getElementById('standard-consultation-section');
                const compPricing = document.getElementById('company-pricing-section');
                const compDocs = document.getElementById('company-documents-section');
                const customBuySection = document.getElementById('custom-buy-service-section');
                if (stdPricing) stdPricing.style.display = 'none';
                if (compDocs) compDocs.style.display = 'block';

                if (['din-kyc', 'appointment-director', 'removal-director', 'pvt-ltd-winding-up', 'increase-authorized-capital', 'registered-office-change', 'change-company-name', 'moa-amendment-pvt', 'moa-amendment-sec8', 'moa-amendment-public', 'share-transfer', 'jansamarth-registration', 'credit-management-analysis', 'opc-to-pvt-ltd', 'pvt-to-public-ltd', 'llp-to-pvt-ltd', 'sec-8-winding-up', 'nidhi-winding-up', 'subsidiary-winding-up', 'fssai-renewal', 'fssai-modification', 'fssai-annual-return', 'import-export-code', 'import-export-modification', 'bis-certificate', 'gst-registration', 'gst-return-filing', 'gst-nil-return-filing', 'gst-modification', 'gstr-9-annual-filing', 'gst-lut-filing', 'gst-eway-bill', 'tax-compliance-guide', 'online-bookkeeping-service', 'section-8-company-compliance-filing', 'ngo-darpan-registration'].includes(serviceId)) {
                    if (compPricing) compPricing.style.display = 'none';
                    if (customBuySection) customBuySection.style.display = 'block';
                } else {
                    if (compPricing) compPricing.style.display = 'block';
                    if (customBuySection) customBuySection.style.display = 'none';
                }

                // Dynamic documents rendering
                const compDocsGrid = document.querySelector('.company-documents-grid');
                if (compDocsGrid) {
                    if (data.documents && data.documents.length > 0) {
                        compDocsGrid.innerHTML = data.documents.map((doc, idx) => `
                            <div class="document-item">
                                <div class="document-icon"><i class="fa-solid ${doc.icon || 'fa-file-invoice'}"></i></div>
                                <div class="document-number">${String(idx + 1).padStart(2, '0')}</div>
                                <div class="document-text">${doc.name}</div>
                                ${doc.subtext ? `<div class="document-subtext">${doc.subtext}</div>` : ''}
                            </div>
                        `).join('');
                    } else {
                        // Restore default hardcoded ones for other company services
                        compDocsGrid.innerHTML = `
                            <!-- Item 1 -->
                            <div class="document-item">
                                <div class="document-icon"><i class="fa-solid fa-camera"></i></div>
                                <div class="document-number">01</div>
                                <div class="document-text">Passport Size Photograph</div>
                            </div>
                            <!-- Item 2 -->
                            <div class="document-item">
                                <div class="document-icon"><i class="fa-solid fa-id-card"></i></div>
                                <div class="document-number">02</div>
                                <div class="document-text">PAN Card</div>
                            </div>
                            <!-- Item 3 -->
                            <div class="document-item">
                                <div class="document-icon"><i class="fa-solid fa-location-dot"></i></div>
                                <div class="document-number">03</div>
                                <div class="document-text" style="font-weight: 600;">Registered Office Proof</div>
                                <div class="document-subtext">Copy of Electricity Bill / Water Bill / Gas Bill</div>
                            </div>
                            <!-- Item 4 -->
                            <div class="document-item">
                                <div class="document-icon"><i class="fa-solid fa-id-badge"></i></div>
                                <div class="document-number">04</div>
                                <div class="document-text">Copy of Aadhaar Card</div>
                            </div>
                            <!-- Item 5 -->
                            <div class="document-item">
                                <div class="document-icon"><i class="fa-solid fa-map-location-dot"></i></div>
                                <div class="document-number">05</div>
                                <div class="document-text">Address Proof</div>
                            </div>
                            <!-- Item 6 -->
                            <div class="document-item">
                                <div class="document-icon"><i class="fa-solid fa-file-signature"></i></div>
                                <div class="document-number">06</div>
                                <div class="document-text">No Objection Certificate</div>
                            </div>
                        `;
                    }
                }

                let compType = data.title.replace(' Registration', '');
                if (serviceId === 'llp') compType = 'LLP';
                if (serviceId === 'din-kyc') compType = 'Director KYC';
                if (serviceId === 'appointment-director') compType = 'Director Appointment';
                if (serviceId === 'removal-director') compType = 'Director Removal';
                if (serviceId === 'pvt-ltd-winding-up') compType = 'Winding Up';
                if (serviceId === 'increase-authorized-capital') compType = 'Authorized Capital';
                if (serviceId === 'registered-office-change') compType = 'Office Change';
                if (serviceId === 'change-company-name') compType = 'Company Name Change';
                if (serviceId === 'moa-amendment-pvt') compType = 'MOA Amendment';
                if (serviceId === 'moa-amendment-sec8') compType = 'Section 8 MOA Amendment';
                if (serviceId === 'moa-amendment-public') compType = 'Public MOA Amendment';
                if (serviceId === 'share-transfer') compType = 'Share Transfer';
                if (serviceId === 'jansamarth-registration') compType = 'JanSamarth Registration';
                if (serviceId === 'credit-management-analysis') compType = 'CMA Report';
                if (serviceId === 'opc-to-pvt-ltd') compType = 'OPC to PVT';
                if (serviceId === 'pvt-to-public-ltd') compType = 'PVT to Public';
                if (serviceId === 'llp-to-pvt-ltd') compType = 'LLP to PVT';
                if (serviceId === 'sec-8-winding-up') compType = 'Section 8 Winding Up';
                if (serviceId === 'nidhi-winding-up') compType = 'Nidhi Winding Up';
                if (serviceId === 'subsidiary-winding-up') compType = 'Subsidiary Winding Up';
                if (serviceId === 'fssai-registration') compType = 'FSSAI License';
                if (serviceId === 'fssai-food-labeling') compType = 'Food Labeling';
                if (serviceId === 'fssai-renewal') compType = 'FSSAI Renewal';
                if (serviceId === 'fssai-annual-return') compType = 'FSSAI Annual Return';
                if (serviceId === 'fssai-modification') compType = 'FSSAI Modification';
                if (serviceId === 'bis-certificate') compType = 'BIS Certification';
                if (serviceId === 'import-export-code') compType = 'IEC Registration';
                if (serviceId === 'import-export-modification') compType = 'IEC Modification';
                if (serviceId === 'gst-registration') compType = 'GST Registration';
                if (serviceId === 'gst-return-filing') compType = 'GST Return Filing';
                if (serviceId === 'gst-nil-return-filing') compType = 'GST Nil Return';
                if (serviceId === 'gst-modification') compType = 'GST Modification';
                if (serviceId === 'gstr-9-annual-filing') compType = 'GSTR-9 Return';
                if (serviceId === 'gst-lut-filing') compType = 'GST LUT Filing';
                if (serviceId === 'gst-eway-bill') compType = 'GST E-Way Bill';
                if (serviceId === 'online-annual-compliance-filing') compType = 'Annual Compliance';
                if (serviceId === 'annual-compliance-bookkeeping') compType = 'Compliance & Bookkeeping';
                if (serviceId === 'online-tax-planning-consultancy') compType = 'Tax Planning';
                if (serviceId === 'tax-compliance-guide') compType = 'Tax & Compliance';
                if (serviceId === 'online-bookkeeping-service') compType = 'Bookkeeping';
                if (serviceId === 'section-8-company-compliance-filing') compType = 'NGO Compliance';
                if (serviceId === 'project-report-preparation') compType = 'Project Report';
                if (serviceId === 'online-filing-dpt-3') compType = 'DPT-3 Return';
                if (serviceId === 'ngo-darpan-registration') compType = 'NGO DARPAN';

                const pricingPlans = data.pricingPlans || [
                    {
                        name: 'Consultation Fee',
                        price: '₹999',
                        isRecommended: false,
                        title: 'Complete guide for registration',
                        bullets: [
                            'Process',
                            'Required Documents',
                            'Benefits',
                            'Tax Compliance',
                            'Timeframe etc.'
                        ]
                    },
                    {
                        name: 'Start Up Plan',
                        price: '₹2999 + Govt. Fee',
                        isRecommended: false,
                        bullets: [
                            `Register your ${compType} at Ministry of Corporate Affairs`,
                            'Drafting & Filing by Experienced Professionals',
                            'Expert advice and assistance',
                            'MCA processing and CIN',
                            'Company PAN & TAN',
                            'MOA',
                            'AOA',
                            'Allotment of 2 DINs',
                            'ESI and PF registration'
                        ]
                    },
                    {
                        name: 'Basic Plan',
                        price: '₹7999 + Govt. Fee',
                        isRecommended: true,
                        bullets: [
                            `Register your ${compType} at Ministry of Corporate Affairs`,
                            'Drafting & Filing by Experienced Professionals',
                            'Expert advice and assistance',
                            'MCA processing and CIN',
                            'Company PAN & TAN',
                            'MOA',
                            'AOA',
                            'Allotment of 2 DINs',
                            'ESI and PF registration',
                            'GST registration',
                            'INC-20A commencement of business',
                            'The 1st Board Resolution documentation',
                            'Consent Letter drafting',
                            'Appointment of the Auditor'
                        ]
                    },
                    {
                        name: 'Smart Plan',
                        price: '₹16999 + Govt. Fee',
                        isRecommended: false,
                        bullets: [
                            `Register your ${compType} at Ministry of Corporate Affairs`,
                            'Company PAN & TAN',
                            'MOA',
                            'AOA',
                            'Allotment of 2 DINs',
                            'ESI and PF registration',
                            'GST registration',
                            'INC-20A commencement of business',
                            'The 1st Board Resolution documentation',
                            'Consent Letter drafting',
                            'Appointment of the Auditor',
                            'Current Account Opening in your nearest branch',
                            'MCA processing',
                            'MCA annual return filing and DIR-3 Director KYC'
                        ]
                    },
                    {
                        name: 'Mega Plan',
                        price: '₹29999 + Govt. Fee',
                        isRecommended: false,
                        bullets: [
                            `Register your ${compType} with the Ministry of Corporate Affairs`,
                            '1 Trademark Application',
                            'Company PAN & TAN',
                            'MOA',
                            'AOA',
                            'Allotment of 2 DINs',
                            'ESI and PF registration',
                            'GST registration',
                            'INC-20A commencement of business',
                            'The 1st Board Resolution documentation',
                            'Consent Letter drafting',
                            'Income Tax Return filing',
                            'Financial statements preparation',
                            'Appointment of the Auditor',
                            'MCA processing',
                            'MCA annual return filing and DIR-3 Director KYC',
                            'GST Return filing for 12 months'
                        ]
                    }
                ];

                const tabsContainer = document.getElementById('company-pricing-tabs');
                const detailsContainer = document.getElementById('company-pricing-details');

                const renderPlanDetails = (index) => {
                    const plan = pricingPlans[index];
                    const numBullets = plan.bullets.length;
                    const itemsPerCol = Math.ceil(numBullets / 3);
                    const col1 = plan.bullets.slice(0, itemsPerCol);
                    const col2 = plan.bullets.slice(itemsPerCol, itemsPerCol * 2);
                    const col3 = plan.bullets.slice(itemsPerCol * 2);

                    const titleHtml = plan.title ? `<div class="pricing-title">${plan.title}</div>` : '';

                    detailsContainer.innerHTML = `
                        ${titleHtml}
                        <div class="pricing-grid">
                            <div class="pricing-col">
                                ${col1.map(b => `<div class="pricing-bullet"><i class="fas fa-check-circle"></i><span>${b}</span></div>`).join('')}
                            </div>
                            <div class="pricing-col">
                                ${col2.map(b => `<div class="pricing-bullet"><i class="fas fa-check-circle"></i><span>${b}</span></div>`).join('')}
                            </div>
                            <div class="pricing-col">
                                ${col3.map(b => `<div class="pricing-bullet"><i class="fas fa-check-circle"></i><span>${b}</span></div>`).join('')}
                            </div>
                        </div>
                        <div class="pricing-footer">
                            <a href="#" class="register-btn book-call-btn" data-plan="${plan.name}" data-price="${plan.price}" data-id="rohan">
                                Register Now
                            </a>
                        </div>
                    `;
                };

                if (tabsContainer && detailsContainer) {
                    tabsContainer.innerHTML = pricingPlans.map((plan, idx) => `
                        <button class="company-pricing-tab ${idx === (pricingPlans.length - 1) ? 'active' : ''}" data-index="${idx}">
                            <span class="price-value">${plan.price.split(' ')[0]}</span>
                            <span class="plan-name">${plan.name}</span>
                        </button>
                    `).join('');

                    renderPlanDetails(pricingPlans.length - 1);

                    tabsContainer.querySelectorAll('.company-pricing-tab').forEach(tab => {
                        tab.addEventListener('click', () => {
                            tabsContainer.querySelectorAll('.company-pricing-tab').forEach(t => t.classList.remove('active'));
                            tab.classList.add('active');
                            const index = parseInt(tab.getAttribute('data-index'));
                            renderPlanDetails(index);
                        });
                    });
                }
            }

            // Service details bullets in hero
            const sBullets = document.getElementById('service-hero-bullets');
            if (sBullets) {
                sBullets.innerHTML = data.benefits.map(b => `
                    <div class="service-bullet-item">
                        <i class="fas fa-check-circle"></i>
                        <span>${b}</span>
                    </div>
                `).join('');
            }

            // Benefits list in body
            const sBenefitsList = document.getElementById('service-benefits-list');
            if (sBenefitsList) {
                sBenefitsList.innerHTML = data.benefits.map(b => `
                    <div style="display:flex; align-items:center; gap:10px; font-size:14.5px;">
                        <i class="fas fa-check-circle" style="color:var(--success);"></i>
                        <span>${b}</span>
                    </div>
                `).join('');
            }

            // FAQ list
            const sFaqContainer = document.getElementById('service-faq-container');
            if (sFaqContainer) {
                sFaqContainer.innerHTML = data.faqs.map((faq, index) => `
                    <div class="faq-item reveal active" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:18px; margin-bottom:12px; cursor:pointer;">
                        <div class="faq-question" style="display:flex; justify-content:space-between; font-weight:700; font-size:15px; color:var(--primary);">
                            <span>${faq.q}</span>
                            <i class="fas fa-chevron-down" style="color:var(--text-muted);"></i>
                        </div>
                        <div class="faq-answer" style="display:none; padding-top:12px; font-size:13.5px; color:var(--text-muted); line-height:1.5;">
                            ${faq.a}
                        </div>
                    </div>
                `).join('');

                // Add Accordion action
                sFaqContainer.querySelectorAll('.faq-item').forEach(item => {
                    item.addEventListener('click', () => {
                        const answer = item.querySelector('.faq-answer');
                        const icon = item.querySelector('.faq-question i');
                        const isVisible = answer.style.display === 'block';
                        
                        // Close others
                        sFaqContainer.querySelectorAll('.faq-item').forEach(other => {
                            other.querySelector('.faq-answer').style.display = 'none';
                            other.querySelector('.faq-question i').className = 'fas fa-chevron-down';
                        });

                        if (!isVisible) {
                            answer.style.display = 'block';
                            icon.className = 'fas fa-chevron-up';
                        }
                    });
                });
            }
        }
    }

    // ==========================================================================
    // 8. Modals Logic & Book Consultation Form
    // ==========================================================================
    const bookingModal = document.getElementById('bookingModal');
    const statusModal = document.getElementById('statusModal');
    const closeBtns = document.querySelectorAll('.close-modal, .close-status-btn');
    const bookingForm = document.getElementById('bookingForm');

    // Open booking modal
    document.addEventListener('click', (e) => {
        const targetBtn = e.target.closest('.book-call-btn, #cta-book-btn');
        if (targetBtn) {
            e.preventDefault();
            const lawyerId = targetBtn.getAttribute('data-id') || 'rohan';
            const lawyer = expertData[lawyerId];
            
            if (lawyer && bookingModal) {
                // Populate modal header
                const modalHeader = bookingModal.querySelector('.modal-header h3');
                if (modalHeader) modalHeader.textContent = `Consultation with ${lawyer.name}`;
                
                // Set hidden input
                const hiddenLawyerId = document.getElementById('modal-lawyer-id');
                if (hiddenLawyerId) hiddenLawyerId.value = lawyerId;

                // Prefill details if registering for a specific company plan
                const planName = targetBtn.getAttribute('data-plan');
                const planPrice = targetBtn.getAttribute('data-price');
                const subjectSelect = document.getElementById('book-subject');
                const messageTextarea = document.getElementById('book-message');

                if (targetBtn.id === 'custom-buy-btn') {
                    if (subjectSelect) subjectSelect.value = "Business setup & Legal";
                    if (messageTextarea) {
                        const params = new URLSearchParams(window.location.search);
                        const serviceId = params.get('service') || '';
                        const serviceName = serviceId ? (serviceData[serviceId]?.title || 'Service') : 'Service';
                        messageTextarea.value = `I want to purchase the service for "${serviceName}". Please contact me to get started with compliance assistance.`;
                    }
                } else if (planName && planPrice) {
                    if (subjectSelect) subjectSelect.value = "Business setup & Legal";
                    if (messageTextarea) {
                        const params = new URLSearchParams(window.location.search);
                        const serviceId = params.get('service') || '';
                        const companyName = serviceId ? (serviceData[serviceId]?.title || 'Company Registration') : 'Company Registration';
                        messageTextarea.value = `I would like to register for the "${planName}" (${planPrice}) of ${companyName}.`;
                    }
                } else {
                    // Reset or default values if opened from standard btn
                    if (subjectSelect) subjectSelect.value = "";
                    if (messageTextarea) messageTextarea.value = "";
                }

                bookingModal.style.display = 'flex';
            }
        }
    });

    // Close modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (bookingModal) bookingModal.style.display = 'none';
            if (statusModal) statusModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === bookingModal) bookingModal.style.display = 'none';
        if (e.target === statusModal) statusModal.style.display = 'none';
    });

    // Handle form submit to Google Sheets and Show Premium feedback
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Scheduling...';

            const lawyerId = document.getElementById('modal-lawyer-id')?.value || 'rohan';
            const lawyer = expertData[lawyerId];

            const formData = {
                name: document.getElementById('book-name').value,
                surname: '',
                email: document.getElementById('book-email').value,
                phone: document.getElementById('book-phone').value,
                service: document.getElementById('book-subject').value,
                message: `Booking call with ${lawyer?.name || 'Expert'}. Brief details: ${document.getElementById('book-message').value}`
            };

            // Call sheet integration
            window.submitToGoogleSheet(formData).then(success => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                // Hide booking modal
                if (bookingModal) bookingModal.style.display = 'none';
                
                if (success) {
                    // Show success status modal
                    const bookingId = `LV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
                    const successBody = document.getElementById('status-modal-body');
                    
                    if (successBody) {
                        successBody.innerHTML = `
                            <div class="status-modal-icon">
                                <i class="fas fa-check"></i>
                            </div>
                            <h3>Booking Confirmed!</h3>
                            <p>Your consultation with <strong>${lawyer?.name || 'our expert'}</strong> has been scheduled successfully.<br>Our legal expert will contact you shortly.</p>
                            <div style="background:#f1f5f9; padding:12px; border-radius:6px; font-family:monospace; margin-bottom:20px; font-size:13px; font-weight:600;">
                                Reference ID: ${bookingId}
                            </div>
                            <button class="btn btn-primary close-status-btn" style="width:100%;">Okay, Got It</button>
                        `;

                        // Reattach listener to new button
                        successBody.querySelector('.close-status-btn').addEventListener('click', () => {
                            if (statusModal) statusModal.style.display = 'none';
                        });
                    }

                    if (statusModal) statusModal.style.display = 'flex';
                    bookingForm.reset();
                } else {
                    alert('Oops! There was a connection issue. Please try again later.');
                }
            });
        });
    }

    // ==========================================================================
    // 9. Services Directory Render: services.html
    // ==========================================================================
    const servicesContainer = document.getElementById('services-container');
    if (servicesContainer) {
        const renderServicesDirectory = () => {
            const searchVal = document.getElementById('service-search')?.value.toLowerCase() || '';
            const activeTab = document.querySelector('.tab.active')?.dataset.category || 'all';

            // Filter services
            let list = Object.entries(serviceData).filter(([key, service]) => {
                const matchesSearch = service.title.toLowerCase().includes(searchVal) || 
                                      service.shortDesc.toLowerCase().includes(searchVal) ||
                                      service.desc.toLowerCase().includes(searchVal);
                const matchesTab = activeTab === 'all' || service.category === activeTab;
                return matchesSearch && matchesTab;
            });

            let html = '';
            if (list.length > 0) {
                html = `<div class="services-grid-8" style="margin-top: 20px;">` + 
                list.map(([key, service]) => `
                    <a href="service-details.html?service=${key}" class="service-card-light reveal active">
                        <div class="service-card-icon sc-${key}">
                            <i class="fas ${getServiceIcon(key)}"></i>
                        </div>
                        <h3>${service.title}</h3>
                        <p>${service.shortDesc}</p>
                    </a>
                `).join('') + `</div>`;
            } else {
                html = '<div style="text-align:center; padding: 40px; color:var(--text-muted);">No services found matching your search.</div>';
            }
            servicesContainer.innerHTML = html;
        };

        const getServiceIcon = (key) => {
            if (key === 'marriage') return 'fa-ring';
            if (key === 'odr') return 'fa-laptop-code';
            if (key === 'challans') return 'fa-traffic-light';
            if (key === 'property') return 'fa-house';
            if (key === 'debt') return 'fa-sack-dollar';
            if (key === 'ip') return 'fa-lightbulb';
            if (key === 'business') return 'fa-briefcase';
            if (key === 'pvt-ltd') return 'fa-building';
            if (key === 'llp') return 'fa-handshake';
            if (key === 'opc') return 'fa-user-tie';
            if (key === 'public-ltd') return 'fa-city';
            if (key === 'section-8') return 'fa-hands-holding-child';
            if (key === 'nidhi') return 'fa-piggy-bank';
            if (key === 'subsidiary') return 'fa-globe';
            if (key === 'criminal') return 'fa-shield-halved';
            return 'fa-scale-balanced';
        };

        // Attach listeners to search
        const sSearch = document.getElementById('service-search');
        if (sSearch) {
            sSearch.addEventListener('input', renderServicesDirectory);
        }

        // Attach listeners to tabs
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderServicesDirectory();
            });
        });

        // Initial render
        renderServicesDirectory();
    }

    // Google Sheets fetch submission function
    window.submitToGoogleSheet = async (formData) => {
        const scriptURL = 'https://script.google.com/macros/s/AKfycbwsPMk0hJJWqS8vh9bFZpHvUSfmh_Sz3O3OPRDzSqZJoSNvwB5z47fxHnztLB1P7tPO/exec';
        
        try {
            await fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: JSON.stringify(formData)
            });
            return true;
        } catch (error) {
            console.error('Error submitting to Google Sheet:', error);
            return false;
        }
    };

    // Dynamic Header login state manager
    const navActions = document.querySelector('.nav-actions');
    if (navActions) {
        const loggedIn = localStorage.getItem('userLoggedIn') === 'true';
        if (loggedIn) {
            const userName = localStorage.getItem('userName') || 'Rahul Sharma';
            const initials = userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
            
            navActions.innerHTML = `
                <a href="profile.html" class="btn btn-outline" style="padding: 8px 18px; border-radius: 6px; display: inline-flex; align-items: center; gap: 8px;">
                    <span style="width: 20px; height: 20px; border-radius: 50%; background: var(--secondary); color: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700;">${initials}</span>
                    Profile
                </a>
                <a href="#" id="logout-nav-btn" class="btn btn-primary" style="padding: 8px 18px; border-radius: 6px;">Logout</a>
            `;
            
            // Add listener to logout button
            const logoutBtn = document.getElementById('logout-nav-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    localStorage.removeItem('userLoggedIn');
                    alert('Logged out successfully!');
                    window.location.href = 'index.html';
                });
            }
        }
    }
});
