'use client';

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