/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      sansSerif: ['Source Sans Pro', 'sans-serif'],
      mono: ['Source Code Pro', 'monospace'],
      handwriting: ['Kalam', 'cursive']
    },
    extend: {
      borderWidth: {
        // 0: '0',
        1: '1px'
        // 2: '2px',
        // 4: '4px',
      },
      boxShadow: {
        colored: '0 7px 16px rgba(127, 91, 220, 0.002)',
        coloredHover: '0 16px 25px rgba(127, 91, 220, 0.3)',
        invoice: '-4px 0 44px rgba(0, 0, 0, 0.25)',
        slidePanel: '-4px 0px 44px rgba(0, 0, 0, 0.25)',
        tableRow: '0px 0px 16px rgba(0, 0, 0, 0.16)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        '4xl': '0 50px 100px -20px rgba(0, 0, 0, 0.25)',
        '5xl': '0 75px 150px -25px rgba(0, 0, 0, 0.2)',
        '6xl': '0 100px 200px -30px rgba(0, 0, 0, 0.15)'
      },
      colors: {
        lavenderIndigo: '#8657E1',
        daisyBush: '#4714a5',
        goldenFizz: '#feff40',
        whisper: '#f9f4f9',
        pastelPurple: '#b2a1bb',
        purple: '#7209b7',
        robinEggBlue: '#00e9c0',
        blueGem: '#3813a0',
        caribbeanGreen: '#1CC6A0',
        scarlet: '#f72f45',
        monsoon: '#777878',
        silver: '#c0c0c0',
        gallery: '#efeaf2',
        caribbeanGreen: '#00ca9e',
        fog: '#decaec',
        prim: '#edebef'
      },
      gridTemplateColumns: {
        clientTable: ' 100px 1fr 125px 125px 32px 32px',
        clientTableMobile: '1fr 90px',
        invoiceTable: '100px 100px 60px 1fr 116px 32px 32px',
        invoiceTableMobile: '1fr 90px',
        invoiceLineItem: '1fr 100px 100px 100px 65px',
        invoiceLineItemPrint: '1fr 100px 100px 100px'
      },
      minHeight: {
        24: '6rem'
      },
      minWidth: {
        64: '16rem'
      },
      zIndex: {
        toaster: 1000,
        modal: 999,
        modalOverlay: 998,
        slidePanel: 997,
        overlay: 996,
        navBarToggle: '91',
        navBar: '90'
      },
      backgroundImage: {
        circle: "url('/images/svg/hand-circle.svg')",
        chevronDown: "url('/images/svg/chevron--down.svg')",
        thankYou: "url('/images/svg/thankyou.svg')",
        error_404: "url('/images/svg/bgError.svg')",
        auth: "url('/images/svg/bg-auth.svg')"
      },
      backgroundPosition: {
        'right-center': '97% center'
      }
    },
    plugins: []
  }
};
