/**
 * Legal & Vakil - Main JS Logic
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
                { q: 'Are prenuptial agreements legally binding in India?', a: 'In India, prenups are generally not enforceable as contracts under family law, but they can be used to show the intent of parties and divide assets if drafted correctly under the Indian Contract Act.' }
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
            consultFee: 99,
            originalFee: 499,
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
            img: 'assets/Lawyer (3).webp',
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
            document.title = `${data.name} | Expert Profile | Legal & Vakil`;

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
            // Document Title
            document.title = `${data.title} Services | Legal & Vakil`;

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
