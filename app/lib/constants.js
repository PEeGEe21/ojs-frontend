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

export const uploadTypeList = [

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
