import React, { forwardRef, useCallback, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SheetBackdrop } from "../components/SheetBackdrop";
import { SheetHeader } from "../components/SheetHeader";
import { colors, radius, spacing, typography } from "../theme/theme";
import { sheetBackgroundStyle, sheetHandleIndicatorStyle, sheetHandleStyle } from "../theme/sheetStyles";

const ACTIONS = [
  { key: "share", label: "Compartilhar rádio", icon: "share-social-outline", color: colors.textPrimary },
  { key: "favorite", label: "Adicionar aos favoritos", icon: "heart-outline", color: colors.accent },
  { key: "sleep", label: "Timer para desligar", icon: "moon-outline", color: colors.warning },
  { key: "report", label: "Reportar problema no áudio", icon: "alert-circle-outline", color: colors.danger },
];

// Modelo 2 — Action Sheet modal, altura fixa, lista de opções com ícone.
// É o padrão de menu de contexto (equivalente ao ActionSheetIOS nativo).
export const ActionsSheet = forwardRef(function ActionsSheet(_, ref) {
  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(() => ["46%"], []);

  const renderBackdrop = useCallback((props) => <SheetBackdrop {...props} />, []);

  const handleSelect = useCallback((key) => {
    ref?.current?.dismiss();
  }, [ref]);

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      bottomInset={insets.bottom}
      backdropComponent={renderBackdrop}
      backgroundStyle={sheetBackgroundStyle}
      handleIndicatorStyle={sheetHandleIndicatorStyle}
      handleStyle={sheetHandleStyle}
    >
      <BottomSheetView style={[styles.content, { paddingBottom: insets.bottom }]}>
        <SheetHeader title="105 FM" onClose={() => ref?.current?.dismiss()} />
        <Text style={styles.subtitle}>O que você quer fazer com essa estação?</Text>

        <View style={styles.list}>
          {ACTIONS.map((action) => (
            <Pressable
              key={action.key}
              style={({ pressed }) => [styles.actionRow, pressed && styles.actionRowPressed]}
              onPress={() => handleSelect(action.key)}
            >
              <View style={[styles.actionIcon, { backgroundColor: `${action.color}22` }]}>
                <Ionicons name={action.icon} size={20} color={action.color} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Pressable>
          ))}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  subtitle: {
    ...typography.cardBody,
    marginBottom: spacing.md,
  },
  list: {
    gap: spacing.xs,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    paddingHorizontal: spacing.xs,
  },
  actionRowPressed: {
    backgroundColor: colors.surfaceElevated,
  },
  actionIcon: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  actionLabel: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "500",
  },
});
