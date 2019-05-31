import { css } from "@emotion/core"

export const colors = {
  purple: "rgb(120, 16, 137)",
  marigold: "rgb(255, 204, 0)",
  tangerine: "rgb(255, 149, 0)",
  white: "rgb(255, 255, 255)",
  black: "rgb(0, 0, 0)",
  pale_grey: "rgb(239, 239, 244)",
  pale_lilac: "rgb(229, 229, 234)",
  light_blue_grey: "rgb(209, 209, 214)",
  light_blue_grey_two: "rgb(199, 199, 204)",
  blue_grey: "rgb(142, 142, 147)",
  brownish_grey: "rgb(110, 110, 110)",
  royal_5: "rgb(10, 10, 120)",
  dark_slate_blue_7: "rgb(25, 25, 100)",
  dark_slate_blue_18: "rgb(25, 25, 100)",
  eggplant_45: "rgb(4, 4, 15)",
  blue_grey_50: "rgb(142, 142, 147)",
  dark_navy_blue_22: "rgb(0, 0, 25)",
  velvet: "rgb(98, 13, 111)",
  purply: "rgb(170, 59, 188)",
  golden_yellow: "rgb(248, 196, 30)",
  light_tan: "rgb(253, 239, 173)",
  black_two: "rgb(48, 48, 48)",
  white_two: "rgb(250, 250, 250)"
}

export const gradients = {
  purple_shine: css`
    background: linear-gradient(to left, ${colors.velvet}, ${colors.purple});
  `
}

export const spacing = {
  vert_aligned_flex_text: css`
    display: flex;
    justify-content: center;
    flex-direction: column;
  `,
  short_vertical: css`
    margin: 10px 0px;
  `,
  standard_vertical: css`
    margin: 15px 0px;
  `,
  large_vertical: css`
    margin: 30px 0px;
  `,
  text_clearance: css`
    margin: 0px 2px;
  `,
  minimum_gap: css`
    margin: 2px 0px;
  `,
  tab: css`
    width: 100%;
    padding: 10px;
    min-height: 40px;
  `,
  main_box: css`
    margin: 0 auto;
    max-width: 700px;
    padding-top: 60px;
  `,
  page_padding: css`
    padding: 15px;
  `,
  in_page_element: css`
    padding: 5px 15px;
  `
}

export const fonts = {
  Header_Title_Style: css`
    color: ${colors.white};
    font-size: 16px;
    font-family: OpenSans, Semibold;
  `,
  Article_Title_Style: css`
    color: ${colors.purple};
    font-size: 24px;
    font-family: OpenSans;
    font-weight: bold;
  `,
  logo: css`
    line-height: 1;
    font-weight: bold;
    font-size: 40px;
    color: ${colors.ons_purple};
  `,
  hint: css`
    font-size: x-small;
  `,
  subtitle: css`
    color: ${colors.ons_purple};
  `,
  article: css`
    font-size: small;
  `,
  medium_link: css`
    font-size: medium;
    text-decoration: none;
    color: black;
  `,
  small: css`
    font-size: small;
  `,
  directory_link: css`
    text-decoration: none;
    color: white;
  `,
  menu_link: css`
    text-decoration: none;
    font-size: large;
    color: white;
  `,
  menu_toggle: css`
    text-decoration: none;
    color: inherit;
    font-size: larger;
    color: white;
  `
}
