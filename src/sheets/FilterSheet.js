import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

import { SheetBackdrop } from "../components/SheetBackdrop";
import { SheetHeader } from "../components/SheetHeader";
import { colors, radius, spacing, typography } from "../theme/theme";
import { sheetBackgroundStyle, sheetHandleIndicatorStyle, sheetHandleStyle } from "../theme/sheetStyles";

const GENRES = [
  "Sertanejo",
  "Pop",
  "Rock",
  "MPB",
  "Samba e Pagode",
  "Gospel",
  "Eletrônica",
  "Flashback",
  "Forró",
  "Hip Hop",
  "Jazz",
  "Notícias",
];

// Modelo 3 — Sheet de filtros: conteúdo rolável (BottomSheetScrollView) +
// múltiplos snap points + rodapé fixo (BottomSheetFooter) com o botão de
// ação, que fica sempre visível mesmo quando a lista rola por baixo dele.
export const FilterSheet = forwardRef(function FilterSheet(_, ref) {
  const snapPoints = useMemo(() => ["55%", "90%"], []);
  const [selected, setSelected] = useState(() => new Set(["Sertanejo", "Pop"]));

  const renderBackdrop = useCallback((props) => <SheetBackdrop {...props} />, []);

  const toggleGenre = useCallback((genre) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(genre) ? next.delete(genre) : next.add(genre);
      return next;
    });
  }, []);

  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={spacing.md}>
        <View style={styles.footerContainer}>
          <Pressable style={styles.clearButton} onPress={() => setSelected(new Set())}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </Pressable>
          <Pressable style={styles.applyButton} onPress={() => ref?.current?.dismiss()}>
            <Text style={styles.applyButtonText}>Aplicar filtros ({selected.size})</Text>
          </Pressable>
        </View>
      </BottomSheetFooter>
    ),
    [selected.size, ref]
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={sheetBackgroundStyle}
      handleIndicatorStyle={sheetHandleIndicatorStyle}
      handleStyle={sheetHandleStyle}
      footerComponent={renderFooter}
    >
      <BottomSheetView style={styles.headerWrapper}>
        <SheetHeader title="Filtrar por gênero" onClose={() => ref?.current?.dismiss()} />
      </BottomSheetView>
      <BottomSheetScrollView contentContainerStyle={styles.scrollContent}>
        {GENRES.map((genre) => {
          const isSelected = selected.has(genre);
          return (
            <Pressable key={genre} style={styles.genreRow} onPress={() => toggleGenre(genre)}>
              <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
                {isSelected && <Ionicons name="checkmark" size={14} color={colors.background} />}
              </View>
              <Text style={styles.genreLabel}>{genre}</Text>
            </Pressable>
          );
        })}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  headerWrapper: {
    paddingHorizontal: spacing.lg,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 100,
  },
  genreRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  genreLabel: {
    color: colors.textPrimary,
    fontSize: 15,
  },
  footerContainer: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    backgroundColor: colors.sheetBackground,
  },
  clearButton: {
    flex: 1,
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  clearButtonText: {
    color: colors.textSecondary,
    fontWeight: "600",
  },
  applyButton: {
    flex: 2,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonText: {
    color: colors.background,
    fontWeight: "700",
  },
});
