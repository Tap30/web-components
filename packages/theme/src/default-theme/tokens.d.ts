declare const tokens: {
    readonly palette: {
        readonly black: "#000000";
        readonly white: "#ffffff";
        readonly gray: {
            readonly "900": "#141414";
            readonly "800": "#323333";
            readonly "700": "#323333";
            readonly "600": "#535454";
            readonly "500": "#747575";
            readonly "400": "#b1b2b2";
            readonly "300": "#cacccc";
            readonly "200": "#e1e3e3";
            readonly "100": "#eaeded";
            readonly "50": "#f5f7f7";
        };
        readonly orange: {
            readonly "900": "#422e28";
            readonly "800": "#662a14";
            readonly "700": "#662a14";
            readonly "600": "#a64221";
            readonly "500": "#e55c2e";
            readonly "400": "#ff7140";
            readonly "300": "#ff8c61";
            readonly "200": "#ffac8a";
            readonly "100": "#ffd5c2";
            readonly "50": "#fff0e9";
        };
        readonly blue: {
            readonly "900": "#262f40";
            readonly "800": "#143166";
            readonly "700": "#143166";
            readonly "600": "#174291";
            readonly "500": "#1e54b7";
            readonly "400": "#276ef1";
            readonly "300": "#5b91f5";
            readonly "200": "#a0bff8";
            readonly "100": "#d4e2fc";
            readonly "50": "#eff3fe";
        };
        readonly green: {
            readonly "900": "#24332c";
            readonly "800": "#10462d";
            readonly "700": "#10462d";
            readonly "600": "#03582f";
            readonly "500": "#03703c";
            readonly "400": "#048848";
            readonly "300": "#06c167";
            readonly "200": "#66d19e";
            readonly "100": "#addec9";
            readonly "50": "#e6f2ed";
        };
        readonly yellow: {
            readonly "900": "#332e24";
            readonly "800": "#674d1b";
            readonly "700": "#674d1b";
            readonly "600": "#996f00";
            readonly "500": "#e49e15";
            readonly "400": "#ffc043";
            readonly "300": "#ffcf70";
            readonly "200": "#ffe3ac";
            readonly "100": "#fff2d9";
            readonly "50": "#fffaf0";
        };
        readonly red: {
            readonly "900": "#402926";
            readonly "800": "#5a0a00";
            readonly "700": "#5a0a00";
            readonly "600": "#870f00";
            readonly "500": "#ab1300";
            readonly "400": "#e11900";
            readonly "300": "#e85c4a";
            readonly "200": "#f1998e";
            readonly "100": "#fed7d2";
            readonly "50": "#ffefed";
        };
        readonly indigo: {
            readonly "900": "#2C2942";
            readonly "800": "#3D3678";
            readonly "700": "#3D3678";
            readonly "600": "#443997";
            readonly "500": "#483AB8";
            readonly "400": "#4A38DB";
            readonly "300": "#7163E8";
            readonly "200": "#9B90F2";
            readonly "100": "#C6C0F9";
            readonly "50": "#F3F2FE";
        };
    };
    readonly color: {
        readonly brand: "var(--tapsi-palette-orange-400)";
        readonly surface: {
            readonly black: "var(--tapsi-palette-black)";
            readonly white: "var(--tapsi-palette-white)";
            readonly primary: "var(--tapsi-palette-white)";
            readonly secondary: "var(--tapsi-palette-gray-50)";
            readonly tertiary: "var(--tapsi-palette-gray-100)";
            readonly disabled: "var(--tapsi-palette-gray-50)";
            readonly accent: "var(--tapsi-palette-blue-400)";
            readonly "accent-light": "var(--tapsi-palette-blue-50)";
            readonly negative: "var(--tapsi-palette-red-400)";
            readonly "negative-light": "var(--tapsi-palette-red-50)";
            readonly warning: "var(--tapsi-palette-yellow-400)";
            readonly "warning-light": "var(--tapsi-palette-yellow-50)";
            readonly positive: "var(--tapsi-palette-green-400)";
            readonly "positive-light": "var(--tapsi-palette-green-50)";
            readonly "background-primary": "var(--tapsi-palette-gray-50)";
            readonly "background-secondary": "var(--tapsi-palette-gray-100)";
            readonly "inverse-primary": "var(--tapsi-palette-black)";
            readonly "inverse-secondary": "var(--tapsi-palette-gray-700)";
            readonly "overlay-dark": "#0000004d";
            readonly "overlay-light": "#0000001f";
        };
        readonly content: {
            readonly primary: "var(--tapsi-palette-black)";
            readonly secondary: "var(--tapsi-palette-gray-600)";
            readonly tertiary: "var(--tapsi-palette-gray-500)";
            readonly disabled: "var(--tapsi-palette-gray-400)";
            readonly accent: "var(--tapsi-palette-blue-400)";
            readonly negative: "var(--tapsi-palette-red-400)";
            readonly warning: "var(--tapsi-palette-yellow-500)";
            readonly positive: "var(--tapsi-palette-green-400)";
            readonly "on-inverse": "var(--tapsi-palette-white)";
            readonly "on-brand": "var(--tapsi-palette-white)";
            readonly "on-accent": "var(--tapsi-palette-white)";
            readonly "on-negative": "var(--tapsi-palette-white)";
            readonly "on-warning": "var(--tapsi-palette-black)";
            readonly "on-positive": "var(--tapsi-palette-white)";
        };
        readonly border: {
            readonly primary: "var(--tapsi-palette-gray-200)";
            readonly selected: "var(--tapsi-palette-gray-700)";
            readonly focus: "var(--tapsi-palette-gray-700)";
            readonly accent: "var(--tapsi-palette-blue-200)";
            readonly negative: "var(--tapsi-palette-red-200)";
            readonly positive: "var(--tapsi-palette-green-200)";
            readonly warning: "var(--tapsi-palette-yellow-200)";
            readonly "inverse-primary": "var(--tapsi-palette-gray-700)";
        };
        readonly gradient: {
            readonly surface: {
                readonly brand: "linear-gradient(91.39deg,#ff7733 0%,#ff5722 50.15%,#e64917 100%)";
                readonly "brand-light": "linear-gradient(90deg, #FFF0E9 0%, #F4F1F0 100%)";
            };
        };
    };
    readonly radius: {
        readonly "0": "0";
        readonly "1": "0.125rem";
        readonly "2": "0.25rem";
        readonly "3": "0.5rem";
        readonly "4": "0.75rem";
        readonly "5": "1rem";
        readonly "6": "1.25rem";
        readonly "7": "1.5rem";
        readonly full: "999px";
    };
    readonly spacing: {
        readonly "0": "0";
        readonly "1": "0.0625rem";
        readonly "2": "0.125rem";
        readonly "3": "0.25rem";
        readonly "3-1": "0.375rem";
        readonly "4": "0.5rem";
        readonly "5": "0.75rem";
        readonly "6": "1rem";
        readonly "7": "1.25rem";
        readonly "8": "1.5rem";
        readonly "9": "2rem";
        readonly "10": "2.5rem";
        readonly "11": "3rem";
        readonly "12": "4rem";
        readonly "13": "5rem";
        readonly "14": "6rem";
    };
    readonly stroke: {
        readonly "0": "0px";
        readonly "1": "1px";
        readonly "2": "2px";
    };
    readonly typography: {
        readonly "font-family": "\"Vazirmatn\", sans-serif";
        readonly body: {
            readonly xs: {
                readonly font: "var(--tapsi-typography-font-family)";
                readonly size: "0.75rem";
                readonly height: 1.6666666667;
                readonly weight: 400;
            };
            readonly sm: {
                readonly font: "var(--tapsi-typography-font-family)";
                readonly size: "0.875rem";
                readonly height: 1.7142857143;
                readonly weight: 400;
            };
            readonly md: {
                readonly font: "var(--tapsi-typography-font-family)";
                readonly size: "1rem";
                readonly height: 1.75;
                readonly weight: 400;
            };
            readonly lg: {
                readonly font: "var(--tapsi-typography-font-family)";
                readonly size: "1.125rem";
                readonly height: 1.7777777778;
                readonly weight: 400;
            };
        };
        readonly label: {
            readonly xxs: {
                readonly font: "var(--tapsi-typography-font-family)";
                readonly size: "0.625rem";
                readonly height: 1.6;
                readonly weight: 500;
            };
            readonly xs: {
                readonly font: "var(--tapsi-typography-font-family)";
                readonly size: "0.75rem";
                readonly height: 2;
                readonly weight: 500;
            };
            readonly sm: {
                readonly font: "var(--tapsi-typography-font-family)";
                readonly size: "0.875rem";
                readonly height: 1.7142857143;
                readonly weight: 500;
            };
            readonly md: {
                readonly font: "var(--tapsi-typography-font-family)";
                readonly size: "1rem";
                readonly height: 1.75;
                readonly weight: 500;
            };
            readonly lg: {
                readonly font: "var(--tapsi-typography-font-family)";
                readonly size: "1.125rem";
                readonly height: 1.7777777778;
                readonly weight: 500;
            };
        };
        readonly headline: {
            readonly xs: {
                readonly font: "var(--tapsi-typography-font-family)";
                readonly size: "1rem";
                readonly height: 1.5;
                readonly weight: 600;
            };
            readonly sm: {
                readonly font: "var(--tapsi-typography-font-family)";
                readonly size: "1.25rem";
                readonly height: 1.5;
                readonly weight: 600;
            };
            readonly md: {
                readonly font: "var(--tapsi-typography-font-family)";
                readonly size: "1.5rem";
                readonly height: 1.5;
                readonly weight: 600;
            };
            readonly lg: {
                readonly font: "var(--tapsi-typography-font-family)";
                readonly size: "1.75rem";
                readonly height: 1.5;
                readonly weight: 600;
            };
        };
        readonly display: {
            readonly sm: {
                readonly font: "var(--tapsi-typography-font-family)";
                readonly size: "2rem";
                readonly height: 1.5;
                readonly weight: 600;
            };
            readonly md: {
                readonly font: "var(--tapsi-typography-font-family)";
                readonly size: "2.5rem";
                readonly height: 1.5;
                readonly weight: 600;
            };
            readonly lg: {
                readonly font: "var(--tapsi-typography-font-family)";
                readonly size: "3rem";
                readonly height: 1.5;
                readonly weight: 600;
            };
        };
    };
};
export default tokens;
