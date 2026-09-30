import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, radius, spacing, typography } from "../theme/theme";

// Cabeçalho padrão das sheets: puxador + título + botão de fechar opcional.
export function SheetHeader({ title, onClose }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={typography.sheetTitle}>{title}</Text>
        {onClose && (
          <Pressable onPress={onClose} hitSlop={12} style={styles.closeButton}>
            <Ionicons name="close" size={18} color={colors.textSecondary} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
  },
});
