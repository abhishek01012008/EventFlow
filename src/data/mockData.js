// Student Mock Data for EventFlow

export const initialUsers = [
  {
    id: 'usr-stu-1',
    name: 'Abhishek Pradhan',
    rollNo: 'CS2023042',
    email: 'abhishek.pradhan@college.edu',
    phone: '+91 98765 43210',
    role: 'student',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2023-08-10'
  }
];

export const initialEvents = [
  {
    id: 'evt-1',
    title: 'Tech Fest 2026: InnovateX',
    description: 'The flagship annual technical symposium celebrating engineering brilliance. Features technical paper presentations, IoT showcases, robotics combat, drone racing, and guest lectures from industry leaders at Google and Microsoft.',
    category: 'Technical',
    date: '2026-11-15',
    startTime: '09:00 AM',
    endTime: '05:30 PM',
    venue: 'Main Auditorium & Engineering Labs',
    organizerName: 'Dr. Amit Kumar (CSE Dept)',
    capacity: 300,
    registeredCount: 142,
    registrationDeadline: '2026-11-12',
    eligibility: 'Open to all B.Tech, M.Tech, and MCA students',
    status: 'Upcoming',
    poster: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
    highlights: ['Keynote by Silicon Valley Alumni', 'Cash prizes worth ₹1,50,000', 'Certificates for all participants', 'Complimentary lunch & kit']
  },
  {
    id: 'evt-2',
    title: 'Cultural Night — Tarang 2026',
    description: 'An enchanting evening of music, dance, drama, and spotlight talent. Come celebrate campus vibrancy with musical band face-offs, fusion dance routines, stand-up comedy, and an electrifying live concert.',
    category: 'Cultural',
    date: '2026-11-18',
    startTime: '06:00 PM',
    endTime: '10:30 PM',
    venue: 'Open Air Amphitheatre',
    organizerName: 'Prof. Sarah Jenkins (Cultural Club)',
    capacity: 500,
    registeredCount: 310,
    registrationDeadline: '2026-11-16',
    eligibility: 'Open to all students, faculty, and registered alumni',
    status: 'Upcoming',
    poster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    highlights: ['Live band performance', 'Inter-departmental dance battle', 'Food trucks & art stalls', 'Free entry with college ID']
  },
  {
    id: 'evt-3',
    title: 'Coding Workshop: Advanced React & Cloud Architecture',
    description: 'Hands-on intensive workshop diving into modern production React patterns, custom hooks, micro-frontends, state machines, Docker containerization, and AWS serverless deployment.',
    category: 'Workshop',
    date: '2026-11-22',
    startTime: '10:00 AM',
    endTime: '02:00 PM',
    venue: 'Computer Lab 3 (Turing Hall)',
    organizerName: 'Dr. Amit Kumar (CSE Dept)',
    capacity: 80,
    registeredCount: 76,
    registrationDeadline: '2026-11-20',
    eligibility: 'Computer Science, IT, and Electronics students (2nd/3rd/4th Year)',
    status: 'Upcoming',
    poster: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    highlights: ['Live coding walkthroughs', 'AWS free credits voucher', 'Direct GitHub project review', 'Exclusive verified badge']
  },
  {
    id: 'evt-4',
    title: 'Annual Sports Meet: Athena 2026',
    description: 'Three days of athletic spirit and sportsmanship! Track & field events (100m, 400m, 4x100m relay), football championship, badminton singles & doubles, table tennis, and basketball tournaments.',
    category: 'Sports',
    date: '2026-11-25',
    startTime: '08:00 AM',
    endTime: '06:00 PM',
    venue: 'College Sports Ground & Indoor Stadium',
    organizerName: 'Coach Rajesh Rao (Sports Council)',
    capacity: 400,
    registeredCount: 215,
    registrationDeadline: '2026-11-23',
    eligibility: 'All currently enrolled undergraduate and postgraduate students',
    status: 'Upcoming',
    poster: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80',
    highlights: ['Medals & trophies by College Director', 'Inter-house championship cup', 'Energy refreshments provided', 'Sports attire required']
  },
  {
    id: 'evt-5',
    title: 'National Hackathon 2026 — CodeSprint 36H',
    description: 'A 36-hour non-stop hackathon tackling real-world problem statements in AI Healthcare, FinTech, Green Energy, and Smart Cities. Mentors from top tech unicorns will guide teams throughout.',
    category: 'Hackathon',
    date: '2026-12-05',
    startTime: '08:00 AM',
    endTime: '08:00 PM',
    venue: 'Campus Innovation & Incubation Center',
    organizerName: 'Dr. Amit Kumar (CSE Dept)',
    capacity: 150,
    registeredCount: 138,
    registrationDeadline: '2026-12-01',
    eligibility: 'Teams of 2 to 4 students from any accredited college',
    status: 'Upcoming',
    poster: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
    highlights: ['₹3,00,000 Prize Pool', 'Incubation offers for top 3 teams', 'Midnight pizza & energy drinks', 'Cloud sponsor API credits']
  },
  {
    id: 'evt-6',
    title: 'AI & Machine Learning Research Symposium',
    description: 'Faculty and student researchers presented papers on deep generative models, transformers, and neural compute architectures.',
    category: 'Technical',
    date: '2026-10-10',
    startTime: '02:00 PM',
    endTime: '05:30 PM',
    venue: 'Seminar Hall A',
    organizerName: 'Dr. Amit Kumar (CSE Dept)',
    capacity: 120,
    registeredCount: 110,
    registrationDeadline: '2026-10-08',
    eligibility: 'Engineering & Science students',
    status: 'Past',
    poster: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
    highlights: ['Research paper proceedings published', 'Certificate of Participation', 'Q&A session with AI researchers']
  },
  {
    id: 'evt-7',
    title: 'Inter-College Parliamentary Debate Championship',
    description: 'High-octane British Parliamentary style debate tournament discussing global economics, ethical technology, and geopolitical sustainability.',
    category: 'Cultural',
    date: '2026-10-05',
    startTime: '11:00 AM',
    endTime: '04:30 PM',
    venue: 'Conference Hall 2',
    organizerName: 'Prof. Sarah Jenkins (Cultural Club)',
    capacity: 60,
    registeredCount: 58,
    registrationDeadline: '2026-10-03',
    eligibility: 'Open to all registered student debaters',
    status: 'Past',
    poster: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80',
    highlights: ['Adjudication by National Debating Society', 'Best Speaker and Best Team Trophies', 'Formal debate protocols']
  },
  {
    id: 'evt-8',
    title: 'Cybersecurity Boot Camp & Capture The Flag (CTF)',
    description: 'Live hands-on offensive and defensive cybersecurity drills, reverse engineering challenges, web vulnerability exploitation, and network packet analysis.',
    category: 'Workshop',
    date: '2026-10-22',
    startTime: '10:00 AM',
    endTime: '04:30 PM',
    venue: 'Cyber Defense Lab (B-Block)',
    organizerName: 'Dr. Amit Kumar (CSE Dept)',
    capacity: 60,
    registeredCount: 54,
    registrationDeadline: '2026-10-21',
    eligibility: 'Students with basic Linux & networking knowledge',
    status: 'Ongoing',
    poster: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
    highlights: ['Live scoreboard CTF', 'Defensive playbooks', 'Certificate of Completion']
  }
];

export const initialRegistrations = [
  {
    id: 'reg-1',
    studentId: 'usr-stu-1',
    eventId: 'evt-1',
    registrationDate: '2026-10-15',
    status: 'Registered',
    certificateId: null
  },
  {
    id: 'reg-2',
    studentId: 'usr-stu-1',
    eventId: 'evt-2',
    registrationDate: '2026-10-16',
    status: 'Registered',
    certificateId: null
  },
  {
    id: 'reg-3',
    studentId: 'usr-stu-1',
    eventId: 'evt-3',
    registrationDate: '2026-10-19',
    status: 'Registered',
    certificateId: null
  },
  {
    id: 'reg-4',
    studentId: 'usr-stu-1',
    eventId: 'evt-4',
    registrationDate: '2026-10-12',
    status: 'Cancelled',
    certificateId: null
  },
  {
    id: 'reg-5',
    studentId: 'usr-stu-1',
    eventId: 'evt-6',
    registrationDate: '2026-10-02',
    status: 'Completed',
    certificateId: 'cert-1'
  },
  {
    id: 'reg-6',
    studentId: 'usr-stu-1',
    eventId: 'evt-7',
    registrationDate: '2026-09-28',
    status: 'Completed',
    certificateId: 'cert-2'
  },
  {
    id: 'reg-7',
    studentId: 'usr-stu-1',
    eventId: 'evt-8',
    registrationDate: '2026-10-20',
    status: 'Registered',
    certificateId: null
  }
];

export const initialCertificates = [
  {
    id: 'cert-1',
    certificateNo: 'EF-2026-AI-8492',
    title: 'Certificate of Participation',
    eventId: 'evt-6',
    eventName: 'AI & Machine Learning Research Symposium',
    studentId: 'usr-stu-1',
    studentName: 'Abhishek Pradhan',
    rollNo: 'CS2023042',
    department: 'Computer Science & Engineering',
    issueDate: '2026-10-11',
    organizerName: 'Dr. Amit Kumar',
    directorName: 'Dr. V. K. Verma'
  },
  {
    id: 'cert-2',
    certificateNo: 'EF-2026-DEB-3109',
    title: 'Certificate of Achievement',
    eventId: 'evt-7',
    eventName: 'Inter-College Parliamentary Debate Championship',
    studentId: 'usr-stu-1',
    studentName: 'Abhishek Pradhan',
    rollNo: 'CS2023042',
    department: 'Computer Science & Engineering',
    issueDate: '2026-10-06',
    organizerName: 'Prof. Sarah Jenkins',
    directorName: 'Dr. V. K. Verma'
  }
];

export const initialRecentActivity = [
  {
    id: 'act-1',
    type: 'registration',
    user: 'Abhishek Pradhan',
    text: 'Registered for Coding Workshop: Advanced React & Cloud Architecture',
    time: '2 hours ago',
    icon: 'CheckCircle2'
  },
  {
    id: 'act-2',
    type: 'participation',
    user: 'Abhishek Pradhan',
    text: 'Completed session for Cybersecurity Boot Camp & CTF',
    time: 'Yesterday at 11:30 AM',
    icon: 'CheckCircle2'
  },
  {
    id: 'act-3',
    type: 'certificate',
    user: 'Abhishek Pradhan',
    text: 'Earned certificate for AI & Machine Learning Research Symposium',
    time: 'Oct 11, 2026',
    icon: 'Award'
  },
  {
    id: 'act-4',
    type: 'registration',
    user: 'Abhishek Pradhan',
    text: 'Registered for Cultural Night — Tarang 2026',
    time: 'Oct 16, 2026',
    icon: 'Calendar'
  }
];
