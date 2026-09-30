import React, { forwardRef, useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SheetBackdrop } from "../components/SheetBackdrop";
import { SheetHeader } from "../components/SheetHeader";
import { colors, radius, spacing, typography } from "../theme/theme";
import { sheetBackgroundStyle, sheetHandleIndicatorStyle, sheetHandleStyle } from "../theme/sheetStyles";

const SHORT_TEXT =
  "Rádio comunitária de Jundiaí (SP), no ar desde 1987, com programação de esportes, samba e pagode.";
const LONG_TEXT =
  SHORT_TEXT +
  " Um dos destaques é o programa esportivo das manhãs de sábado, que cobre os principais times da região " +
  "com participação dos ouvintes ao vivo. À noite, a grade abre espaço para clássicos do samba e pagode, " +
  "com apresentadores locais que também tocam nas rádios comunitárias vizinhas.";

const TAGS = ["Esportes", "Rap", "Samba e Pagode"];

// Modelo 5 — Sheet de tamanho dinâmico: sem snapPoints fixos, a altura se
// ajusta automaticamente ao conteúdo (enableDynamicSizing). Ao expandir a
// descrição, a sheet recalcula e anima a própria altura sozinha.
export const DetailsSheet = forwardRef(function DetailsSheet(_, ref) {
  const insets = useSafeAreaInsets();
  const [expanded, setExpanded] = useState(false);

  const renderBackdrop = useCallback((props) => <SheetBackdrop {...props} />, []);

  return (
    <BottomSheetModal
      ref={ref}
      enableDynamicSizing
      bottomInset={insets.bottom}
      backdropComponent={renderBackdrop}
      backgroundStyle={sheetBackgroundStyle}
      handleIndicatorStyle={sheetHandleIndicatorStyle}
      handleStyle={sheetHandleStyle}
      onDismiss={() => setExpanded(false)}
    >
      <BottomSheetView style={[styles.content, { paddingBottom: spacing.xl + insets.bottom }]}>
        <SheetHeader title="105 FM" onClose={() => ref?.current?.dismiss()} />

        <View style={styles.tagsRow}>
          {TAGS.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.description}>{expanded ? LONG_TEXT : SHORT_TEXT}</Text>

        <Pressable onPress={() => setExpanded((v) => !v)} style={styles.readMoreButton}>
          <Text style={styles.readMoreText}>{expanded ? "Ver menos" : "Ver mais"}</Text>
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={16}
            color={colors.primary}
          />
        </Pressable>

        <View style={styles.actionsRow}>
          <Pressable style={styles.primaryAction}>
            <Ionicons name="play" size={18} color={colors.background} />
            <Text style={styles.primaryActionText}>Ouvir agora</Text>
          </Pressable>
          <Pressable style={styles.secondaryAction}>
            <Ionicons name="heart-outline" size={20} color={colors.textPrimary} />
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  tag: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  tagText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
  description: {
    ...typography.sheetBody,
  },
  readMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: spacing.sm,
    alignSelf: "flex-start",
  },
  readMoreText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 13,
  },
  actionsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  primaryAction: {
    flex: 1,
    flexDirection: "row",
    gap: spacing.xs,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryActionText: {
    color: colors.background,
    fontWeight: "700",
  },
  secondaryAction: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
});
