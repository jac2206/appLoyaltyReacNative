// JAC spacing and radius values use density-independent units in React Native.
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const typography = {
  display: { fontFamily: "MontserratBold", fontSize: 36, lineHeight: 44 },
  title: { fontFamily: "MontserratBold", fontSize: 28, lineHeight: 36 },
  heading: { fontFamily: "MontserratSemiBold", fontSize: 20, lineHeight: 28 },
  subheading: { fontFamily: "InterSemiBold", fontSize: 16, lineHeight: 24 },
  body: { fontFamily: "InterRegular", fontSize: 16, lineHeight: 24 },
  small: { fontFamily: "InterRegular", fontSize: 14, lineHeight: 21 },
  label: { fontFamily: "InterSemiBold", fontSize: 14, lineHeight: 20 },
  caption: { fontFamily: "InterMedium", fontSize: 12, lineHeight: 18 },
} as const;

export const layout = {
  contentWidth: 600,
  controlHeight: 52,
  touchTarget: 48,
} as const;
