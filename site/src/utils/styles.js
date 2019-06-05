import { css } from "@emotion/core"

export const colors = {
  navy_normal: "#003d59",
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
  white_two: "rgb(250, 250, 250)",
  footer_gray: "rgb(236, 236, 237)"
}

export const gradients = {
  navy_shine: css`
    background: linear-gradient(to left, ${colors.navy_normal}, #33637a);
  `
}

export const spacing = {
  vert_aligned_flex_text: css`
    display: flex;
    justify-content: center;
    flex-direction: column;
  `,
  standard_vertical: css`
    padding: 15px 0px;
  `,
  large_vertical: css`
    padding: 30px 0px;
  `,
  text_clearance: css`
    margin: 0px 2px;
  `,
  minimum_gap: css`
    margin: 2px 0px;
  `,
  tab: css`
    padding: 15px;
    min-height: 30px;
  `,
  main_box: css`
    margin: 0 auto;
    max-width: 700px;
  `,
  page_padding: css`
    padding: 15px;
  `,
  in_page_element: css`
    padding: 5px 15px;
  `
}
