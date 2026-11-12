import { Image } from "react-native";

type Props = {
  size: number;
};

/** Decorative brand artwork. Interactive parents provide their own label. */
export function JacMark({ size }: Props) {
  return (
    <Image
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      resizeMode="contain"
      source={require("../../assets/jac-isotype.png")}
      style={{ height: size, width: size }}
    />
  );
}
