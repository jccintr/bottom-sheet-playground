import { colors, radius } from "./theme";

// Estilos padrão reaproveitados em todas as bottom sheets do projeto.
export const sheetBackgroundStyle = {
  backgroundColor: colors.sheetBackground,
  borderTopLeftRadius: radius.lg,
  borderTopRightRadius: radius.lg,
};

export const sheetHandleIndicatorStyle = {
  backgroundColor: colors.handle,
  width: 40,
};

export const sheetHandleStyle = {
  paddingTop: 10,
  paddingBottom: 4,
};
