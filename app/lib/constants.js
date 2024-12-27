'use client';
import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only use this for client-side calls
});

export const successtoastOptions = {
  duration: 8000,
  // position: 'top',
  style: {},
  className: '',
  // Custom Icon
  icon: '👏',
  // Change colors of success/error/loading icon
  iconTheme: {
    primary: 'red',
    secondary: '#fff',
  },
  ariaProps: {
    role: 'status',
    'aria-live': 'polite',
  },
};

export const successOptions = {
    style: {
      border: '1px solid #255625',
      padding: '16px',
      color: '#ffffff',
      boxShadow: 'none',
      fontSize: '14px',
      background: 'green'
  },
  iconTheme: {
      primary: '#398439',
      secondary: '#FFF',
  },
}

export const permissionLevelList = [
  {
    id: 1,
    title: 'Admin'
  },
  {
    id: 2,
    title: 'Author'
  }
]

export const allSubmissions = [
  {
    _id: 1,
    id: 1,
    no_of_reviews: 13,
    date_created: "21/07/2024",
    created_by: "praise",
    last_activity_on: "Sunday, July 21, 2024",
    title: 'Lorem ipsum dolor, sit test amet consectetur adipisicing elit.',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.'
  },
  {
    _id: 2,
    id: 2,
    no_of_reviews: 2,
    date_created: "21/07/2024",
    created_by: "praise",
    last_activity_on: "Sunday, July 25, 2024",
    title: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.'
  }
]

export const demoSubmissions = [
  {
    id: 1,
    no_of_reviews: 13,
    date_created: "21/07/2024",
    created_by: "praise",
    last_activity_on: "Sunday, July 21, 2024",
    title: 'Lorem ipsum dolor, sit test amet consectetur adipisicing elit.',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.'
  },
  {
    id: 2,
    no_of_reviews: 2,
    date_created: "21/07/2024",
    created_by: "praise",
    last_activity_on: "Sunday, July 25, 2024",
    title: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.'
  }
]

export const SectionsData = [
  {
    title: 'Journal of Advanced Research',
    abbreviation: 'JAR',
    identification_text: 'JAR-2024',
    word_count: '1500',
    policy: 'Open Access',
    editors: 'Udeh Praise, PG'
  },
  {
    title: 'Scientific Review Monthly',
    abbreviation: 'SRM',
    identification_text: 'SRM-2024',
    word_count: '2000',
    policy: 'Subscription-Based',
    editors: 'Udeh Praise, PG'
  },
  {
    title: 'Tech Innovations Journal',
    abbreviation: 'TIJ',
    identification_text: 'TIJ-2024',
    word_count: '1200',
    policy: 'Peer-Reviewed',
    editors: 'Udeh Praise, PG'

  },
  {
    title: 'Global Health Bulletin',
    abbreviation: 'GHB',
    identification_text: 'GHB-2024',
    word_count: '1800',
    policy: 'Public Access',
    editors: 'Udeh Praise, PG'
  },
  {
    title: 'Economic Insights Weekly',
    abbreviation: 'EIW',
    identification_text: 'EIW-2024',
    word_count: '2500',
    policy: 'Subscription-Based',
    editors: 'Udeh Praise, PG'
  }
];


export const issuesData = [
  {
    volume: '10',
    number: '1',
    year: '2024',
    title: 'Advances in Artificial Intelligence',
    url_path: '/journals/ai-advances-2024',
    description: 'A comprehensive review of the latest trends in AI research and applications.'
  },
  {
    volume: '5',
    number: '3',
    year: '2023',
    title: 'Renewable Energy Perspectives',
    url_path: '/journals/renewable-energy-2023',
    description: 'Insights and case studies on the global push towards renewable energy solutions.'
  },
  {
    volume: '15',
    number: '2',
    year: '2022',
    title: 'Medical Innovations',
    url_path: '/journals/medical-innovations-2022',
    description: 'Exploring breakthrough treatments and technologies in the medical field.'
  },
  {
    volume: '8',
    number: '4',
    year: '2024',
    title: 'Economic Growth Analysis',
    url_path: '/journals/economic-growth-2024',
    description: 'Analyzing global economic trends and their implications for the future.'
  },
  {
    volume: '3',
    number: '6',
    year: '2021',
    title: 'Space Exploration Milestones',
    url_path: '/journals/space-exploration-2021',
    description: 'A detailed account of recent achievements in space exploration and technology.'
  }
];

export const uploadTypeList = [
  { id: 1,
    title: 'Article Text',
  },
  { id: 2,
    title: 'Research Instrument',
  },
  { id: 3,
    title: 'Research Materials',
  },
  { id: 4,
    title: 'Research Results',
  },
  { id: 5,
    title: 'Transcripts',
  },
  { id: 6,
    title: 'Data Analysis',
  },
  { id: 7,
    title: 'Data Set',
  },
  { id: 8,
    title: 'Source Texts',
  },
  { id: 9,
    title: 'Other',
  },
]

export const modules = {
  clipboard: {
      matchVisual: false, // Prevents paste formatting issues
  },
  toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean']
  ]
};

export const styles = {
  height: "auto",
  minHeight: "288px" // equivalent to min-h-72
};

export const blurDataUrl ="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEkKzI2LywxMzYwNTQ/OjU9PTQxM0BOREVFTk9QUlZSMj5aYVpQYEH/2wBDAQoLCw4NDhwQEBxBLiQuQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUH/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="

export const noOfWords = [
  {
    id: 1,
    value: "50-100"
  },
  {
    id: 2,
    value: "100-150"
  },
  {
    id: 3,
    value: "150-200"
  },
  {
    id: 4,
    value: "200-300"
  },
]