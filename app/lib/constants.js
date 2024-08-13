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