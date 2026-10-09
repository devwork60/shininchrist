import { AGE_GROUPS, DAYS, type FormConfig } from "./formTypes";

// Field lists come from the client's application forms in new-assets/ (Volunteer Time, Share Skills,
// ServePrayer, FieldServiceForm). The Partner form has no supplied document: it follows the Serve guide.

const DECLARATION_TAIL = "Signature / Typed Name";

export const VOLUNTEER_TIME_FORM: FormConfig = {
  id: "volunteer-time-form",
  title: "Volunteer Your Time",
  intro:
    "Thank you for your interest in volunteering with ShininChrist. We welcome individuals willing to contribute their time, talents, knowledge, and skills to support spiritual growth, education, community development, and compassionate service.",
  submit: "Submit Volunteer Application",
  successTitle: "Thank you for volunteering!",
  successText:
    "The ShininChrist team will review your application and contact you about volunteer opportunities. Submitting this form does not appoint you to a role.",
  footnote:
    "ShininChrist — Compassion · Assistance · Restoration · Encouragement",
  sections: [
    {
      title: "1. Personal Information",
      fields: [
        { id: "fullName", label: "Full Name", type: "text", required: true },
        { id: "email", label: "Email Address", type: "email", required: true },
        {
          id: "phone",
          label: "Phone / WhatsApp Number",
          type: "tel",
          required: true,
        },
        { id: "country", label: "Country", type: "text", required: true },
        {
          id: "cityState",
          label: "City / State",
          type: "text",
          required: true,
        },
        {
          id: "ageGroup",
          label: "Age Group",
          type: "radios",
          options: AGE_GROUPS,
          columns: 3,
        },
      ],
    },
    {
      title: "2. Areas of Volunteer Interest",
      intro: "Select all that apply.",
      fields: [
        {
          id: "interests",
          label: "Areas of interest",
          type: "checks",
          columns: 2,
          options: [
            "Evangelism & Outreach",
            "Prayer & Spiritual Support",
            "Teaching & Tutoring",
            "Children & Youth Programs",
            "Community C.A.R.E. Services",
            "Media & Content Creation",
            "Video Editing & Photography",
            "Social Media & Communications",
            "IT & Digital Support",
            "Writing, Editing & Translation",
            "Administration & Research",
            "Events & Logistics",
            "Music & Creative Arts",
            "Other",
          ],
        },
        {
          id: "skills",
          label: "Skills, qualifications, or talents you can contribute",
          type: "textarea",
        },
      ],
    },
    {
      title: "3. Availability & Commitment",
      fields: [
        {
          id: "service",
          label: "Preferred Service",
          type: "radios",
          options: ["Online / Remote", "In Person", "Both"],
          columns: 3,
        },
        {
          id: "days",
          label: "Available Days",
          type: "checks",
          options: DAYS,
          columns: 3,
        },
        {
          id: "hours",
          label: "Hours Per Week",
          type: "radios",
          options: ["1-2", "2-4", "5-10", "More than 10"],
          columns: 3,
        },
        {
          id: "commitment",
          label: "Commitment",
          type: "radios",
          options: [
            "Weekly",
            "Monthly",
            "Occasional / Project-based",
            "Long-term",
          ],
          columns: 3,
        },
      ],
    },
    {
      title: "4. Experience & Motivation",
      fields: [
        {
          id: "experience",
          label:
            "Have you volunteered or served in a similar role before? Describe briefly",
          type: "textarea",
        },
        {
          id: "why",
          label: "Why would you like to volunteer with ShininChrist?",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      title: "5. Volunteer Declaration",
      fields: [
        {
          id: "declaration",
          type: "declaration",
          label:
            "I understand that this is an application for voluntary, unpaid service. I agree to be contacted by ShininChrist regarding volunteer opportunities and understand that placement may require an interview, orientation, or safeguarding checks depending on the role.",
        },
        {
          id: "signature",
          label: DECLARATION_TAIL,
          type: "text",
          required: true,
        },
        { id: "date", label: "Date", type: "date", required: true },
      ],
    },
  ],
};

export const VOLUNTEER_SKILLS_FORM: FormConfig = {
  id: "volunteer-skills-form",
  title: "Volunteer Your Skills",
  intro:
    "Use your professional knowledge, technical abilities, creativity, and experience to advance ShininChrist’s spiritual, educational, digital, and community initiatives.",
  submit: "Submit Skills Application",
  successTitle: "Thank you for offering your skills!",
  successText:
    "The ShininChrist team will review your qualifications and contact you to discuss where your skills can help.",
  footnote:
    "ShininChrist — Compassion · Assistance · Restoration · Encouragement",
  sections: [
    {
      title: "1. Personal & Professional Information",
      fields: [
        { id: "fullName", label: "Full Name", type: "text", required: true },
        { id: "email", label: "Email Address", type: "email", required: true },
        {
          id: "phone",
          label: "Phone / WhatsApp (include country code)",
          type: "tel",
          required: true,
        },
        {
          id: "location",
          label: "Country & City of Residence",
          type: "text",
          required: true,
        },
        {
          id: "profession",
          label: "Profession / Occupation",
          type: "text",
          required: true,
        },
      ],
    },
    {
      title: "2. Skills & Areas of Expertise",
      intro: "Select all that apply.",
      fields: [
        {
          id: "expertise",
          label: "Areas of expertise",
          type: "checks",
          columns: 3,
          options: [
            "Curriculum & Educational Content",
            "Graphic Design & Illustration",
            "Software Development & IT",
            "Teaching & Academic Tutoring",
            "Video Editing & Animation",
            "Writing, Editing & Publishing",
            "Social Media & Digital Marketing",
            "Web Design & Development",
            "Music Production & Creative Arts",
            "AI & Digital Automation",
            "Accounting & Financial Management",
            "Photography & Media Production",
            "Research & Data Analysis",
            "Radio & Audio Production",
            "Healthcare & Community Wellness",
            "Translation & Interpretation",
            "Fundraising & Grant Writing",
            "Legal & Administrative Services",
            "Project Management & Operations",
            "Counseling & Mentorship",
            "Vocational & Life Skills Training",
            "Evangelism & Biblical Teaching",
          ],
        },
        {
          id: "otherSkills",
          label: "Other Skills (specify)",
          type: "text",
          span: 6,
        },
      ],
    },
    {
      title: "3. Qualifications & Experience",
      fields: [
        {
          id: "qualifications",
          label: "Relevant Qualifications or Certifications",
          type: "textarea",
        },
        {
          id: "professionalExperience",
          label: "Describe Your Professional Experience",
          type: "textarea",
          required: true,
        },
        {
          id: "portfolio",
          label: "Portfolio, LinkedIn or Website (optional)",
          type: "url",
          placeholder: "https://",
          span: 6,
        },
      ],
    },
    {
      title: "4. How Would You Like to Contribute?",
      fields: [
        {
          id: "offer",
          label:
            "Describe the specific skills or services you can offer ShininChrist",
          type: "textarea",
          required: true,
        },
        {
          id: "arrangement",
          label: "Preferred Service Arrangement",
          type: "radios",
          options: ["Remote / Online", "In Person", "Both"],
          columns: 3,
        },
        {
          id: "hours",
          label: "Hours Available Per Week",
          type: "radios",
          options: [
            "1-2 hours",
            "2-5 hours",
            "6-10 hours",
            "More than 10 hours",
          ],
          columns: 3,
        },
        {
          id: "commitment",
          label: "Preferred Commitment",
          type: "radios",
          options: [
            "One-time assignment",
            "Project-based",
            "Ongoing weekly",
            "Long-term",
          ],
          columns: 3,
        },
      ],
    },
    {
      title: "5. Volunteer Declaration",
      fields: [
        {
          id: "declaration",
          type: "declaration",
          label:
            "I understand that this application is for voluntary, unpaid professional service. I agree to be contacted by ShininChrist and understand that selection may involve reviewing my qualifications, discussing project requirements, and completing relevant screening.",
        },
        {
          id: "signature",
          label: DECLARATION_TAIL,
          type: "text",
          required: true,
        },
        { id: "date", label: "Date", type: "date", required: true },
      ],
    },
  ],
};

export const SERVE_PRAYER_FORM: FormConfig = {
  id: "serve-prayer-form",
  title: "Serve in Prayer",
  intro:
    "Prayer is central to the mission of ShininChrist. We invite believers worldwide to serve through intercession for individuals, families, communities, nations, and the advancement of the gospel of Jesus Christ.",
  submit: "Join the Prayer Team",
  successTitle: "Thank you for serving in prayer!",
  successText:
    "The ShininChrist prayer ministry will contact you about prayer opportunities. We are grateful you want to stand with us.",
  footnote:
    "ShininChrist — Compassion · Assistance · Restoration · Encouragement",
  sections: [
    {
      title: "1. Personal Information",
      fields: [
        { id: "fullName", label: "Full Name", type: "text", required: true },
        { id: "email", label: "Email Address", type: "email", required: true },
        {
          id: "phone",
          label: "Phone / WhatsApp Number",
          type: "tel",
          required: true,
        },
        {
          id: "location",
          label: "City, State & Country",
          type: "text",
          required: true,
        },
        {
          id: "ageGroup",
          label: "Age Group (optional)",
          type: "radios",
          options: AGE_GROUPS,
          columns: 3,
        },
      ],
    },
    {
      title: "2. Areas of Prayer Interest",
      intro: "Select all that apply.",
      fields: [
        {
          id: "prayerAreas",
          label: "Areas of prayer interest",
          type: "checks",
          columns: 2,
          options: [
            "Salvation of Souls & Evangelism",
            "Spiritual Growth & Discipleship",
            "Families, Marriages & Children",
            "Youth & Young Adults",
            "The Sick & Those in Need",
            "Communities & Humanitarian Needs",
            "National & Global Intercession",
            "Missionaries, Pastors & Christian Leaders",
            "ShininChrist Ministry & Outreach",
            "ShininChrist Academy & Students",
            "ShininChrist Chapters & Volunteers",
            "Personal Prayer Requests & Encouragement",
          ],
        },
        {
          id: "otherPrayer",
          label: "Other Prayer Interests",
          type: "text",
          span: 6,
        },
      ],
    },
    {
      title: "3. Faith & Prayer Experience",
      fields: [
        {
          id: "church",
          label: "Church or Prayer Group (optional)",
          type: "text",
          span: 6,
        },
        {
          id: "prayerExperience",
          label: "Describe your prayer or intercessory experience",
          type: "textarea",
        },
      ],
    },
    {
      title: "4. Prayer Availability & Participation",
      fields: [
        {
          id: "days",
          label: "Days Available",
          type: "checks",
          options: DAYS,
          columns: 3,
        },
        {
          id: "commitment",
          label: "Preferred Prayer Commitment",
          type: "radios",
          options: ["Daily", "Weekly", "Monthly", "As prayer needs arise"],
          columns: 3,
        },
        {
          id: "participation",
          label: "Preferred Participation",
          type: "radios",
          columns: 2,
          options: [
            "Individual prayer from my location",
            "Online prayer meetings",
            "Prayer group / Intercessory team",
            "Both individual and group prayer",
          ],
        },
      ],
    },
    {
      title: "5. Your Heart for Prayer",
      fields: [
        {
          id: "why",
          label: "Why would you like to serve in prayer with ShininChrist?",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      title: "6. Prayer Ministry Declaration",
      fields: [
        {
          id: "confidentiality",
          type: "declaration",
          label:
            "I agree to respect the privacy and confidentiality of prayer requests shared with me and not disclose personal information without authorization.",
        },
        {
          id: "voluntary",
          type: "declaration",
          label:
            "I understand that serving in prayer is voluntary and unpaid. I agree to uphold the Christian values of ShininChrist and consent to being contacted regarding prayer ministry opportunities.",
        },
        {
          id: "signature",
          label: DECLARATION_TAIL,
          type: "text",
          required: true,
        },
        { id: "date", label: "Date", type: "date", required: true },
      ],
    },
  ],
};

export const FIELD_SERVICE_FORM: FormConfig = {
  id: "field-service-form",
  title: "Serve in the Field",
  intro:
    "Join ShininChrist in bringing the gospel of Jesus Christ, compassionate assistance, restoration, encouragement, and practical support to individuals, families, and communities.",
  submit: "Submit Field Service Application",
  successTitle: "Thank you for your interest in field service!",
  successText:
    "The ShininChrist team will review your application and contact you. Submission does not guarantee placement.",
  footnote:
    "Submission does not guarantee placement. Assignments depend on operational needs, suitability, safeguarding requirements, and approved activities. Applicants under 18 require parent/guardian consent and appropriate supervision.",
  sections: [
    {
      title: "1. Personal Information",
      fields: [
        { id: "fullName", label: "Full Name", type: "text", required: true },
        { id: "email", label: "Email Address", type: "email", required: true },
        {
          id: "phone",
          label: "Phone / WhatsApp Number",
          type: "tel",
          required: true,
        },
        {
          id: "cityState",
          label: "City / State",
          type: "text",
          required: true,
        },
        { id: "country", label: "Country", type: "text", required: true },
        {
          id: "ageGroup",
          label: "Age Group",
          type: "radios",
          options: AGE_GROUPS,
          columns: 3,
          required: true,
        },
      ],
    },
    {
      title: "2. Emergency Contact",
      fields: [
        {
          id: "emergencyName",
          label: "Emergency Contact Full Name",
          type: "text",
          required: true,
        },
        {
          id: "emergencyPhone",
          label: "Emergency Contact Phone Number",
          type: "tel",
          required: true,
        },
      ],
    },
    {
      title: "3. Areas of Field Service",
      intro: "Select all that apply.",
      fields: [
        {
          id: "fieldAreas",
          label: "Areas of field service",
          type: "checks",
          columns: 2,
          options: [
            "Evangelism & Gospel Outreach",
            "Community Needs Assessment & Field Research",
            "Food Distribution & Meal Support",
            "Children & Youth Educational Support",
            "Homework Help & Tutoring",
            "Community C.A.R.E. Services",
            "Bibles & Christian Literature Distribution",
            "Event Setup & Logistics",
            "Community Visits & Follow-Up",
            "Media Documentation & Field Reporting",
            "Translation & Interpretation",
            "Technical & Digital Assistance",
            "Administrative & Registration Support",
            "Chapter Activities & Community Engagement",
            "Other",
          ],
        },
        {
          id: "otherField",
          label: "Other Field Service Interests",
          type: "text",
          span: 6,
        },
      ],
    },
    {
      title: "4. Skills & Experience",
      fields: [
        {
          id: "practicalSkills",
          label: "What practical skills or abilities can you contribute?",
          type: "textarea",
        },
        {
          id: "outreachExperience",
          label: "Describe previous outreach or community service experience",
          type: "textarea",
        },
      ],
    },
    {
      title: "5. Location & Availability",
      fields: [
        {
          id: "preferredCity",
          label: "Preferred City or Community for Field Service",
          type: "text",
          required: true,
          span: 6,
        },
        {
          id: "travel",
          label: "Travel availability",
          type: "radios",
          columns: 3,
          options: [
            "Near my location only",
            "Within my city only",
            "Within my state",
            "Within my country",
            "International assignments",
          ],
        },
        {
          id: "days",
          label: "Days Available",
          type: "checks",
          options: DAYS,
          columns: 3,
        },
        {
          id: "hours",
          label: "Hours Available Per Week",
          type: "radios",
          options: [
            "1-2 hours",
            "2-4 hours",
            "5-10 hours",
            "More than 10 hours",
          ],
          columns: 3,
        },
        {
          id: "commitment",
          label: "Preferred Commitment",
          type: "radios",
          options: [
            "One-time outreach",
            "Weekly",
            "Monthly",
            "Project-based",
            "Long-term",
          ],
          columns: 3,
        },
      ],
    },
    {
      title: "6. Motivation for Service",
      fields: [
        {
          id: "why",
          label: "Why would you like to serve in the field with ShininChrist?",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      title: "7. Field Service Declaration",
      fields: [
        {
          id: "safeguarding",
          type: "declaration",
          label:
            "I agree to respect the dignity, privacy, safety, and well-being of individuals and communities served by ShininChrist. I will follow safeguarding guidelines, supervision requirements, and approved outreach procedures.",
        },
        {
          id: "voluntary",
          type: "declaration",
          label:
            "I understand field service is voluntary and unpaid. I agree to follow ShininChrist policies and instructions and understand that orientation, identity verification, references, or screening may be required.",
        },
        {
          id: "consent",
          type: "declaration",
          label:
            "I consent to ShininChrist contacting me and processing the information provided for volunteer application purposes.",
        },
        {
          id: "signature",
          label: "Applicant Signature",
          type: "text",
          required: true,
        },
        { id: "date", label: "Date", type: "date", required: true },
      ],
    },
  ],
};

export const PARTNER_FORM: FormConfig = {
  id: "partner-form",
  title: "Partner With ShininChrist",
  intro:
    "Churches, ministries, schools, businesses, organizations and community groups are welcome to serve alongside ShininChrist. Tell us about your organization and how you would like to partner.",
  submit: "Submit Partnership Interest",
  successTitle: "Thank you for your interest in partnering!",
  successText:
    "The ShininChrist team will review your proposal and contact you. Nothing is represented as an official partnership until it has been reviewed and agreed.",
  sections: [
    {
      title: "1. Organization",
      fields: [
        {
          id: "orgName",
          label: "Organization Name",
          type: "text",
          required: true,
        },
        {
          id: "orgType",
          label: "Type of Organization",
          type: "radios",
          columns: 3,
          required: true,
          options: [
            "Church / Ministry",
            "School / Institution",
            "Business",
            "Non-profit / Community group",
            "Other",
          ],
        },
        {
          id: "website",
          label: "Website (optional)",
          type: "url",
          placeholder: "https://",
        },
        {
          id: "location",
          label: "City, State & Country",
          type: "text",
          required: true,
        },
      ],
    },
    {
      title: "2. Contact Person",
      fields: [
        { id: "fullName", label: "Full Name", type: "text", required: true },
        { id: "role", label: "Position / Role", type: "text", required: true },
        { id: "email", label: "Email Address", type: "email", required: true },
        {
          id: "phone",
          label: "Phone / WhatsApp Number",
          type: "tel",
          required: true,
        },
      ],
    },
    {
      title: "3. Partnership Interest",
      intro: "Select all that apply.",
      fields: [
        {
          id: "areas",
          label: "Areas of partnership",
          type: "checks",
          columns: 2,
          options: [
            "Education",
            "Outreach",
            "Community service",
            "Venues / resources",
            "Professional expertise",
            "Media",
            "Logistics",
            "Other",
          ],
        },
        {
          id: "proposal",
          label: "Describe how you would like to partner with ShininChrist",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      title: "4. Acknowledgement",
      fields: [
        {
          id: "acknowledge",
          type: "declaration",
          label:
            "I understand that submitting this form does not create an official partnership. ShininChrist will review the proposed relationship before anything is represented as a partnership.",
        },
        {
          id: "signature",
          label: DECLARATION_TAIL,
          type: "text",
          required: true,
        },
        { id: "date", label: "Date", type: "date", required: true },
      ],
    },
  ],
};
