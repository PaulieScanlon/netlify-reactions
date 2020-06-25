export default {
  colors: {
    text: '#333333',
    background: '#ffffff',
    primary: '#FF69B4',
    muted: '#ffd5ea',
    highlight: '#00C4FF',
    gray: '#F7F7F7',
    accent: '#F2C40E',
    darken: '#989898',
    error: '#FF010E',
    success: '#03B255'
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'system-ui, sans-serif',
    monospace: 'Menlo, monospace'
  },
  fontSizes: [
    '0.75rem',
    '1rem',
    '1.25rem',
    '1.5rem',
    '2.125rem',
    '3rem',
    '3.5rem',
    '4.5rem'
  ],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700
  },
  lettingSpacings: {},
  lineHeights: {
    heading: 1,
    body: 1.5
  },
  radii: [],
  shadows: [
    '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'
  ],
  sizes: {
    container: 1140,
    header: 64
  },
  space: [0, 4, 8, 16, 24, 32],
  zIndices: [],
  styles: {
    root: {
      fontSize: 1,
      fontFamily: 'body',
      lineHeight: 'body'
    },
    p: {
      color: 'text',
      lineHeight: 'body',
      code: {
        backgroundColor: 'darken',
        color: 'highlight',
        padding: 1
      }
    },
    small: {
      fontSize: 0
    },
    a: {
      color: 'secondary'
    },
    h1: {
      color: 'primary',
      fontSize: [6, 7],
      fontWeight: 'heading',
      lineHeight: 'heading',
      marginTop: 0,
      marginBottom: 3,
      a: {
        color: 'inherit'
      }
    },
    h2: {
      color: 'primary',
      fontSize: [5, 6],
      fontWeight: 'heading',
      lineHeight: 'heading',
      marginTop: 0,
      marginBottom: 3,
      a: {
        color: 'inherit'
      }
    },
    h3: {
      color: 'text',
      fontSize: [4, 5],
      fontWeight: 'heading',
      lineHeight: 'heading',
      marginTop: 0,
      marginBottom: 3,
      a: {
        color: 'inherit'
      }
    },
    h4: {
      color: 'text',
      fontSize: [3, 4],
      fontWeight: 'heading',
      lineHeight: 'heading',
      marginTop: 0,
      marginBottom: 2,
      a: {
        color: 'inherit'
      }
    },
    h5: {
      color: 'text',
      fontSize: [2, 3],
      fontWeight: 'heading',
      lineHeight: 'heading',
      marginTop: 0,
      marginBottom: 2,
      a: {
        color: 'inherit'
      }
    },
    h6: {
      color: 'text',
      fontSize: 2,
      fontWeight: 'heading',
      lineHeight: 'heading',
      marginTop: 0,
      marginBottom: 1
    },
    img: {},
    pre: {},
    ol: {},
    ul: {},
    li: {},
    blockquote: {},
    hr: {
      color: 'gray',
      my: 4
    },
    em: {},
    table: {},
    tr: {},
    th: {},
    td: {},
    strong: {},
    del: {},
    b: {},
    i: {},
    progress: {},
    donut: {},
    spinner: {
      color: 'background',
      width: 23,
      height: 23,
      primary: {
        color: 'highlight'
      },
      secondary: {
        color: 'secondary'
      }
    }
  },
  box: {},
  flex: {},
  grids: {},
  buttons: {
    backgroundColor: 'primary',
    primary: {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'inline-flex',
      textTransform: 'capitalize',
      ':focus': {
        outlineColor: 'highlight'
      },
      '&:disabled': {
        color: 'darken',
        cursor: 'not-allowed',
        backgroundColor: 'muted'
      }
    },
    secondary: {},
    ghost: {
      alignItems: 'center',
      backgroundColor: 'background',
      cursor: 'pointer',
      display: 'inline-flex',
      color: 'primary',
      px: 2,
      py: 2,
      transition: '.2s linear background-color',
      ':focus': {
        outlineColor: 'primary'
      },
      ':hover': {
        backgroundColor: 'gray'
      }
    },
    text: {
      alignItems: 'center',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      display: 'inline-flex',
      color: 'text',
      p: 0,
      transition: '.2s linear color',
      ':focus': {
        outlineColor: 'primary'
      },
      ':hover': {
        color: 'primary'
      }
    },
    close: {
      cursor: 'pointer'
    },
    icon: {
      cursor: 'pointer'
    },
    menu: {}
  },
  text: {
    text: {},
    heading: {}
  },
  links: {
    nav: {
      borderRadius: 3,
      display: 'inline-flex',
      px: 2,
      py: 1,
      transition: '.2s linear color',
      '&[aria-current]': {
        color: 'primary'
      },
      ':focus': {
        outlineColor: 'accent'
      },
      ':hover': {
        color: 'highlight',
        backgroundColor: 'gray'
      }
    }
  },
  images: {
    avatar: {}
  },
  cards: {
    primary: {
      color: 'text',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      p: 4,
      boxShadow: 0,
      backgroundColor: 'background',
      transition: '.2s linear box-shadow, .2s ease-in-out transform',
      ':hover': {
        transform: 'translateY(-0.25rem)',
        boxShadow: 2
      }
    }
  },
  layout: {
    container: {
      maxWidth: 998,
      px: [3, 4]
    }
  },
  forms: {
    label: {},
    input: {},
    select: {},
    textarea: {},
    radio: {},
    checkbox: {}
  },
  badges: {},
  alerts: {},
  messages: {}
};
