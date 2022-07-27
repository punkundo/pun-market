/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        150: "150px",
        190: "190px",
        225: "225px",
        275: "275px",
        300: "300px",
        340: "340px",
        350: "350px",
        375: "375px",
        460: "460px",
        656: "656px",
        880: "880px",
        508: "508px",
      },
      height: {
        80: "80px",
        150: "150px",
        200: "200px",
        225: "225px",
        300: "300px",
        340: "340px",
        370: "370px",
        420: "420px",
        510: "510px",
        600: "600px",
        685: "685px",
        800: "800px",
        "90vh": "90vh",
      },
      colors: {
        headingColor: "#2e2e2e",
        textColor: "#515151",
        cartNumBg: "#e80013",
        primary: "#f5f3f3",
        cardOverlay: "rgba(256,256,256,0.4)",
        card: "rgba(256,256,256,0.6)",
        lightTextGray: "#9ca0ab",
        rowBg: "rgba(255,131,0,0.1)",
        cartBg: "#282a2c",
        cartItem: "#2e3033",
        cartTotal: "#343739",
        footerInfo: "#F06A72",
        footerBg: "#FFF7F2",
        btnBuy: "rgb(255, 57, 69)",
        textBtnBuy: "rgb(255, 255, 255)",
        bgPayment: "#3399FF"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
