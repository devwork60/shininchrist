export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  scriptures?: string[];
  keyPoints?: string[];
}

export const FAQ_CATEGORIES = [
  "All",
  "About ShininChrist",
  "Membership",
  "Chapters",
  "ShininChrist Academy",
  "ShininChrist Daily",
  "Library & Store",
  "Serving, Volunteering & Outreach",
  "Give",
  "Salvation & Christian Living",
  "Sin, Repentance & Fruit",
  "Spiritual Gifts & Character",
  "Mercy & Forgiveness",
  "Humility & Biblical Saints",
  "Self-Examination",
  "Account & Technical Support",
] as const;

export type FaqCategory = (typeof FAQ_CATEGORIES)[number];

export const FAQ_ITEMS: FaqItem[] = [
  // 1. ABOUT SHININCHRIST
  {
    id: "about-what-is",
    category: "About ShininChrist",
    question: "What is ShininChrist?",
    answer:
      "ShininChrist is a global ministry and community advancing the gospel of Jesus Christ through spiritual, educational, and cultural literacy, Christian community, compassionate service, media, and practical resources.\n\nOur framework is: In My Heart. In My Home. In My Community. In My Nation.\nOur motto is: “Shining Christ in our Hearts, Homes, Communities, and Nations.”",
  },
  {
    id: "about-who-can-participate",
    category: "About ShininChrist",
    question: "Who can participate in ShininChrist?",
    answer:
      "ShininChrist is designed to reach people across different ages, communities, cultures, and nations. Much of the ministry is publicly accessible, while certain resources, experiences, and benefits are reserved for ACTIVE ShininChrist members.",
  },
  {
    id: "about-need-membership",
    category: "About ShininChrist",
    question: "Do I have to become a member to benefit from ShininChrist?",
    answer:
      "No. Public teachings, ShininChrist Daily Today, portions of the Academy and other public resources can be available without membership. Membership provides access to additional ShininChrist community experiences and protected resources.",
  },

  // 2. MEMBERSHIP
  {
    id: "membership-who-can-join",
    category: "Membership",
    question: "Who can become a ShininChrist member?",
    answer:
      "Christians and individuals who desire to follow Jesus Christ are welcome to become members of the ShininChrist community. You do not have to already be a born-again Christian to join ShininChrist. Our community is also a place where individuals can learn about Jesus Christ, encounter the gospel, ask questions, grow in faith, and come to understand what it means to follow Him.\n\nDuring registration, we ask members to identify where they are in their faith journey (Born-again Christian; Learning & growing; Desiring to learn & follow). Membership and service are different: you do not have to be born again to join the community to learn and grow, but individuals who wish to serve within ShininChrist or participate in Outreach must be born-again Christians of good character with references.",
    keyPoints: [
      "I am a born-again Christian.",
      "I am a Christian, but I am still learning and growing in my understanding of being born again.",
      "I desire to learn about and follow Jesus Christ.",
    ],
  },
  {
    id: "membership-how-to-join",
    category: "Membership",
    question: "How do I become a ShininChrist member?",
    answer:
      "Select Join ShininChrist and follow the membership process. This includes registration, YouTube subscription verification, parental consent where applicable, requesting your ShininChrist uniform, payment for the uniform and applicable delivery, and final verification by ShininChrist.",
  },
  {
    id: "membership-account-vs-member",
    category: "Membership",
    question: "Does creating an account automatically make me a ShininChrist member?",
    answer:
      "No. Creating an account or signing in identifies you within the ShininChrist system. It does not automatically activate membership. Your account becomes an ACTIVE membership account only after the applicable membership requirements have been completed and verified by ShininChrist.",
  },
  {
    id: "membership-why-uniform",
    category: "Membership",
    question: "Why does ShininChrist have a membership uniform?",
    answer:
      "The ShininChrist T-shirt and wristband provide members with a shared and recognizable community identity, particularly as ShininChrist develops physical Chapters, gatherings, C.A.R.E. initiatives and other community activities.",
  },
  {
    id: "membership-wait-for-uniform",
    category: "Membership",
    question: "Must my uniform arrive before I receive online member access?",
    answer:
      "No. You do not have to wait for physical delivery. Once the required uniform has been requested, the applicable uniform and delivery payment has been confirmed, and all other membership requirements have been verified, your membership can be activated.",
  },
  {
    id: "membership-minors",
    category: "Membership",
    question: "Can children and teenagers participate?",
    answer:
      "Yes. Age-appropriate participation is available within the ShininChrist structure. Minors must satisfy applicable parental or guardian consent requirements.",
  },

  // 3. CHAPTERS
  {
    id: "chapters-what-are",
    category: "Chapters",
    question: "What are ShininChrist Chapters?",
    answer:
      "ShininChrist Chapters are communities where people can learn together, grow together, serve together, and enjoy meaningful experiences together. The Chapters provide opportunities for faith, fellowship, personal development, relationships, mentorship, life skills, community service and appropriate social experiences.",
  },
  {
    id: "chapters-which-exist",
    category: "Chapters",
    question: "What Chapters does ShininChrist have?",
    answer:
      "ShininChrist currently has three Chapters: Men, Women, and Youth.",
  },
  {
    id: "chapters-children",
    category: "Chapters",
    question: "Does ShininChrist have a Children’s Chapter?",
    answer:
      "Not at this time. ShininChrist currently has three Chapters: Men, Women, and Youth. Children are served through age-appropriate Christian formation content, including Jesus & Me.",
  },
  {
    id: "chapters-jesus-and-me",
    category: "Chapters",
    question: "What is Jesus & Me?",
    answer:
      "Jesus & Me is ShininChrist’s Christian formation initiative for children, created to help children learn about Jesus Christ and grow in faith through age-appropriate content and experiences. Jesus & Me will expand into a dedicated ShininChrist children’s app, providing a digital environment designed specifically for children and their Christian growth.",
  },
  {
    id: "chapters-more-than-bible-study",
    category: "Chapters",
    question: "Are ShininChrist Chapters only about Bible study?",
    answer:
      "No. Faith and discipleship are foundational, but ShininChrist is concerned with the development of the whole person. Depending upon the Chapter and age group, experiences can include relationships, marriage and family, mentorship, education, careers, finances, leadership, health and wellbeing, life skills, C.A.R.E. and community service, games, movies, sports, trips, camps, competitions and other social and developmental experiences.",
  },

  // 4. SHININCHRIST ACADEMY
  {
    id: "academy-what-is",
    category: "ShininChrist Academy",
    question: "What is ShininChrist Academy?",
    answer:
      "ShininChrist Academy is the educational arm of ShininChrist and is organized around six Fields of Learning: Scripture & Theology; Arts & Humanities; Mathematics & Sciences; Social Sciences & Business; Information & Digital Technology; Life Skills & Practical Skills.",
  },
  {
    id: "academy-for-adults",
    category: "ShininChrist Academy",
    question: "Is ShininChrist Academy only for children?",
    answer:
      "No. ShininChrist Academy is designed to accommodate learners of different ages and stages as courses and programs become available.",
  },
  {
    id: "academy-exam-prep",
    category: "ShininChrist Academy",
    question: "Does the Academy provide examination preparation?",
    answer:
      "ShininChrist Academy can provide educational support relevant to examinations such as WAEC, NECO, UTME/JAMB, GCE, CXC/CSEC and CAPE, according to available programs.",
  },
  {
    id: "academy-classes-available",
    category: "ShininChrist Academy",
    question: "Does every subject listed on the website mean a class is currently available?",
    answer:
      "No. The Fields of Learning describe the educational scope of ShininChrist Academy. Actual courses, classes, teachers and resources will be identified according to availability.",
  },
  {
    id: "academy-educator-requirements",
    category: "ShininChrist Academy",
    question: "Who can become a ShininChrist Academy educator?",
    answer:
      "ShininChrist Academy educators must be born-again Christians and must meet strict minimum requirements:\n• Be a born-again follower of Jesus Christ and a person of good Christian character.\n• Hold a minimum of a Bachelor’s degree.\n• Have at least three years of teaching experience in the area they wish to teach.\n• Provide verifiable character references satisfactory to ShininChrist.\n• Complete ShininChrist’s application, verification and approval process and any required orientation.\n\nMeeting minimum qualifications does not automatically guarantee acceptance.",
  },

  // 5. SHININCHRIST DAILY
  {
    id: "daily-what-is",
    category: "ShininChrist Daily",
    question: "What is ShininChrist Daily?",
    answer:
      "ShininChrist Daily is Daily Faith Formation for Christian Living. Each Daily follows six movements:\n1. Worship\n2. The Word\n3. Explore the Word\n4. Live the Word\n5. Prayer\n6. Go & Shine.",
  },
  {
    id: "daily-is-free",
    category: "ShininChrist Daily",
    question: "Is ShininChrist Daily free to the public?",
    answer:
      "Yes. Everyone receives the complete Today experience. ACTIVE members can also access This Week and the Archive, together with member downloads or resources when offered. Our principle is simple: Everyone gets Today; members retain the journey.",
  },

  // 6. LIBRARY & STORE
  {
    id: "library-what-is",
    category: "Library & Store",
    question: "What is the ShininChrist Library?",
    answer:
      "The Library is the protected resource center for ACTIVE ShininChrist members. It includes Bible studies, teachings, prayer and devotional resources, Christian-living materials, Academy and Chapter resources, video and audio, ShininChrist Music, books and publications, downloads and other tools.",
  },
  {
    id: "library-is-public",
    category: "Library & Store",
    question: "Is the Library public?",
    answer:
      "No. The Library is an ACTIVE-member resource center, subject to the permissions applicable to individual resources.",
  },
  {
    id: "store-is-public",
    category: "Library & Store",
    question: "Is the ShininChrist Store public?",
    answer:
      "Yes. You do not have to become a ShininChrist member to shop. As products become available, the Store can offer ShininChrist books, original music, merchandise, study materials, digital products and other approved resources.",
  },

  // 7. SERVING, VOLUNTEERING & OUTREACH
  {
    id: "serve-who-can-serve",
    category: "Serving, Volunteering & Outreach",
    question: "Who can serve within ShininChrist or participate in ShininChrist Outreach?",
    answer:
      "Individuals serving through ShininChrist or participating in ShininChrist Outreach must:\n• Be a born-again Christian.\n• Be a person of good Christian character.\n• Provide verifiable character references as part of the screening process.\n• Complete any additional verification, orientation or safeguarding requirements.\n\nSubmitting an application does not automatically authorize an individual to serve. References must be verified, and the applicant must be approved before serving.",
  },
  {
    id: "serve-why-different-from-member",
    category: "Serving, Volunteering & Outreach",
    question: "Why are the requirements for serving different from the requirements for membership?",
    answer:
      "ShininChrist welcomes Christians and individuals who desire to follow Jesus Christ into the community to learn and grow. Serving is different because a person serving within ShininChrist or on ShininChrist Outreach represents the ministry while serving others. Therefore, individuals who serve must be born-again Christians of good character with references required for verification.",
  },
  {
    id: "serve-children-safeguarding",
    category: "Serving, Volunteering & Outreach",
    question: "Can anyone serve children or youth through ShininChrist?",
    answer:
      "No. Service involving children, youth or other vulnerable individuals requires additional identity verification, references, safeguarding procedures, screening, training and supervision. Approval to serve in another area does not automatically authorize working with children or youth.",
  },
  {
    id: "serve-partnerships",
    category: "Serving, Volunteering & Outreach",
    question: "Can churches, businesses or organizations partner with ShininChrist?",
    answer:
      "Yes. Churches, ministries, schools, businesses, organizations and community groups can submit partnership inquiries for consideration. Partnership with an organization is distinct from an individual being approved to serve within ShininChrist.",
  },

  // 8. GIVE
  {
    id: "give-who-can-give",
    category: "Give",
    question: "Do I have to be a member to give?",
    answer:
      "No. Anyone who feels led to support the ministry of ShininChrist may give financially or donate approved in-kind contributions.",
  },
  {
    id: "give-what-can-i-give",
    category: "Give",
    question: "What can I give?",
    answer:
      "Giving can include financial gifts (one-time or recurring) and approved in-kind contributions such as Bibles, educational supplies, computers and technology, food and essentials, clothing, appropriate medical supplies or equipment, media equipment, furniture and other needed resources.",
  },
  {
    id: "give-major-assets",
    category: "Give",
    question: "Can I give ShininChrist land, a building or a vehicle?",
    answer:
      "Yes, ShininChrist can consider such an offer. Land, buildings, vehicles, major equipment, bulk technology and other significant assets must go through the Give Property & Major Assets inquiry and review process. Do not deliver or transfer a major asset until ShininChrist has reviewed and accepted the proposed gift.",
  },

  // 9. SALVATION & CHRISTIAN LIVING
  {
    id: "theology-born-again",
    category: "Salvation & Christian Living",
    question: "Do I need to be born again?",
    answer:
      "Yes. Jesus Christ said, “Except a man be born again, he cannot see the kingdom of God” (John 3:3). Being born again is more than attending church, becoming religious or adopting Christian language. Jesus described a spiritual birth — being born of the Spirit (John 3:5-8). The person who comes to Christ receives new life. Scripture says that if anyone is in Christ, he is a new creature (2 Corinthians 5:17). The transformed life should increasingly bear evidence of the new nature.",
    scriptures: ["John 3:3", "John 3:5-8", "2 Corinthians 5:17"],
  },
  {
    id: "theology-holy-spirit",
    category: "Salvation & Christian Living",
    question: "Do I need to have the Holy Spirit?",
    answer:
      "Yes. Romans 8:9 says that if anyone does not have the Spirit of Christ, that person does not belong to Him. Jesus promised the Holy Spirit to His followers (John 14:16-17). The Holy Spirit teaches, guides, convicts and empowers believers to live according to the will of Elohim. His presence also produces fruit (Galatians 5:22-23). Claiming to have the Holy Spirit should not be separated from the fruit His presence produces.",
    scriptures: ["Romans 8:9", "John 14:16-17", "Galatians 5:22-23"],
  },
  {
    id: "theology-lose-salvation",
    category: "Salvation & Christian Living",
    question: "Can an individual lose salvation?",
    answer:
      "Yes. ShininChrist teaches that salvation is by grace through faith in Jesus Christ, but Scripture also repeatedly warns believers about turning away, falling away and failing to continue in Christ. Jesus said, “He that shall endure unto the end, the same shall be saved” (Matthew 24:13). Hebrews warns against departing from the living God (Hebrews 3:12-14), and Scripture contains serious warnings concerning apostasy and deliberately returning to sin (Hebrews 6:4-6; 10:26-29; 2 Peter 2:20-22). Grace is not permission to abandon Christ while presuming upon salvation.",
    scriptures: ["Matthew 24:13", "John 15:1-6", "Hebrews 3:12-14", "Hebrews 10:26-29"],
  },

  // 10. SIN, REPENTANCE & FRUIT
  {
    id: "sin-fruit-determines",
    category: "Sin, Repentance & Fruit",
    question: "Does fruit determine where you belong?",
    answer:
      "Yes. Scripture teaches that fruit reveals where you belong. Jesus said, “Ye shall know them by their fruits” (Matthew 7:16). A good tree cannot bring forth evil fruit, neither can a corrupt tree bring forth good fruit (Matthew 7:18). Scripture makes the distinction explicit: “He that saith he is in the light, and hateth his brother, is in darkness even until now” (1 John 2:9). Therefore, hatred, mercilessness, and unrighteousness are not evidence of belonging to Elohim simply because someone professes Christianity or speaks in tongues. Your fruit reveals the tree. The tree reveals where you belong.",
    scriptures: ["Matthew 7:16-18", "1 John 2:9", "1 John 3:14", "Luke 6:36"],
  },
  {
    id: "sin-what-to-do",
    category: "Sin, Repentance & Fruit",
    question: "What should I do when I sin?",
    answer:
      "Repent. Do not justify it, rename it, normalize it, blame someone else for it, or use grace as permission to continue in it. First John 1:9 teaches that if we confess our sins, Elohim is faithful and just to forgive and cleanse us from unrighteousness. Repentance involves genuinely turning toward Elohim. Where our sin has harmed another person, repentance should also affect how we respond to that person. The Christian response to conviction is not concealment. It is repentance.",
    scriptures: ["1 John 1:9", "Proverbs 28:13", "Acts 3:19"],
  },

  // 11. SPIRITUAL GIFTS & CHARACTER
  {
    id: "gifts-tongues-without-love",
    category: "Spiritual Gifts & Character",
    question: "Can I dislike or hate my brother or sister while speaking in tongues and claim that this proves I have the Holy Spirit?",
    answer:
      "No. Speaking in tongues does not override the condition of your heart or the fruit of your life. Scripture says, “He that loveth not his brother abideth in death” (1 John 3:14). It also says that anyone claiming to love God while hating his brother is a liar (1 John 4:20). Even extraordinary speech without love amounts to noise (1 Corinthians 13:1). Never use a spiritual gift to excuse the absence of spiritual fruit.",
    scriptures: ["1 John 3:14", "1 John 4:20", "1 Corinthians 13:1"],
  },
  {
    id: "gifts-are-proof",
    category: "Spiritual Gifts & Character",
    question: "Are spiritual gifts or spiritual power proof that someone belongs to Elohim?",
    answer:
      "No. Power by itself is not the biblical test of someone’s relationship with Elohim. Jesus warned that people could point to prophecy and mighty works and yet hear, “I never knew you” (Matthew 7:22-23). Christian discernment must look beyond impressive manifestations, titles, and religious performance to character, obedience, and fruit.",
    scriptures: ["Matthew 7:21-23"],
  },

  // 12. MERCY & FORGIVENESS
  {
    id: "mercy-is-optional",
    category: "Mercy & Forgiveness",
    question: "Is mercy optional for Christians?",
    answer:
      "No. Mercy is fundamental to the teaching and character of Jesus Christ. Jesus said, “I desire mercy, and not sacrifice.” He also commanded His followers: “Be ye therefore merciful, as your Father also is merciful” (Luke 6:36). A Christianity that celebrates religious activity while comfortable with mercilessness has missed something fundamental about Jesus Christ.",
    scriptures: ["Matthew 9:13", "Luke 6:36", "Matthew 5:7"],
  },
  {
    id: "mercy-forgiveness-and-boundaries",
    category: "Mercy & Forgiveness",
    question: "Do Christians have to forgive? Does forgiveness mean allowing someone to continue harming me?",
    answer:
      "Yes, Christians are commanded to forgive (Matthew 6:14-15). However, forgiveness and unrestricted access are not the same thing. Forgiveness does not require pretending that evil was good, eliminating appropriate boundaries, or remaining in an unsafe situation. Mercy should never be used as an excuse to enable abuse or continuing wrongdoing.",
    scriptures: ["Matthew 6:14-15", "Proverbs 4:23"],
  },

  // 13. HUMILITY & BIBLICAL SAINTS
  {
    id: "humility-saints",
    category: "Humility & Biblical Saints",
    question: "Is it appropriate to speak negatively about Saints in the Bible to make yourself appear more prophetic, spiritual or wiser than they were?",
    answer:
      "No. ShininChrist rejects using the weaknesses or failures of servants of Elohim recorded in Scripture as an opportunity for self-exaltation. Scripture faithfully records both their obedience and their failures so that we can learn. Using those accounts to imply “I am wiser or more spiritual than they were” turns biblical instruction into pride. Scripture warns: “Wherefore let him that thinketh he standeth take heed lest he fall” (1 Corinthians 10:12). The appropriate posture toward biblical Saints is humility and learning.",
    scriptures: ["1 Corinthians 10:12", "Romans 15:4"],
  },

  // 14. SELF-EXAMINATION
  {
    id: "self-examination-how-to-know",
    category: "Self-Examination",
    question: "How can I know whether I am truly following Jesus Christ?",
    answer:
      "Do not answer merely by asking whether you attend church, speak in tongues, hold a title, preach, give money, or fast. Jesus repeatedly directs our attention toward relationship, obedience, and fruit.\n\nAsk yourself: Do I love Jesus Christ? Am I obeying His teachings? Am I becoming merciful? Do I forgive? Do I repent when I sin? Do I love others? Is the fruit of the Holy Spirit becoming evident in my life? Am I becoming more humble or more proud? How do I treat people who cannot benefit me? What does my life produce when no one is applauding me?\n\nSalvation is by grace through faith in Jesus Christ, but Scripture teaches us to examine ourselves (2 Corinthians 13:5), because what we profess with our mouths should not be contradicted by what our lives continually produce.",
    scriptures: ["2 Corinthians 13:5", "John 14:15", "Galatians 5:22-23"],
  },

  // 15. ACCOUNT & TECHNICAL SUPPORT
  {
    id: "support-google-signin",
    category: "Account & Technical Support",
    question: "I signed in with Google. Why can’t I access the Library?",
    answer:
      "Google sign-in authenticates your identity; it does not automatically authorize ShininChrist membership. Protected member resources require an ACTIVE membership status, which requires completing the registration steps, parental consent if applicable, requesting your uniform, and administrative verification.",
  },
  {
    id: "support-pending-status",
    category: "Account & Technical Support",
    question: "I completed the membership process but my account still shows pending. What should I do?",
    answer:
      "Use Contact Us or Technical Support and select the membership/account category so ShininChrist can review your submission and verification status.",
  },
  {
    id: "support-report-bug",
    category: "Account & Technical Support",
    question: "I found a problem on the website. How do I report it?",
    answer:
      "Use the Report an Issue page and identify the affected page or feature, describe the problem, and provide steps to reproduce or a screenshot where appropriate.",
  },
];
