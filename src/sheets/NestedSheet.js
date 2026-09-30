import React, { forwardRef, useCallback, useMemo, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SheetBackdrop } from "../components/SheetBackdrop";
import { SheetHeader } from "../components/SheetHeader";
import { colors, radius, spacing, typography } from "../theme/theme";
import { sheetBackgroundStyle, sheetHandleIndicatorStyle, sheetHandleStyle } from "../theme/sheetStyles";

// Modelo 6 — Sheets aninhadas/empilhadas: a sheet principal abre uma segunda
// sheet de confirmação por cima. Como o BottomSheetModalProvider já cobre o
// app inteiro, basta ter uma segunda ref/modal independente — o gorhom lida
// com a pilha (a de cima fecha primeiro ao arrastar ou apertar voltar).
export const NestedSheet = forwardRef(function NestedSheet(_, ref) {
  const insets = useSafeAreaInsets();
  const confirmRef = useRef(null);
  const snapPoints = useMemo(() => ["40%"], []);
  const confirmSnapPoints = useMemo(() => ["34%"], []);

  const renderBackdrop = useCallback((props) => <SheetBackdrop {...props} />, []);

  return (
    <>
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
          <SheetHeader title="Remover do histórico" onClose={() => ref?.current?.dismiss()} />
          <View style={styles.iconWrapper}>
            <Ionicons name="trash-outline" size={28} color={colors.danger} />
          </View>
          <Text style={styles.bodyText}>
            Isso vai apagar "105 FM" do seu histórico de reprodução recente. Essa ação não pode
            ser desfeita.
          </Text>
          <Pressable
            style={styles.dangerButton}
            onPress={() => confirmRef.current?.present()}
          >
            <Text style={styles.dangerButtonText}>Remover</Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={() => ref?.current?.dismiss()}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheetModal>

      <BottomSheetModal
        ref={confirmRef}
        snapPoints={confirmSnapPoints}
        bottomInset={insets.bottom}
        backdropComponent={renderBackdrop}
        backgroundStyle={sheetBackgroundStyle}
        handleIndicatorStyle={sheetHandleIndicatorStyle}
        handleStyle={sheetHandleStyle}
      >
        <BottomSheetView style={[styles.content, { paddingBottom: insets.bottom }]}>
          <View style={[styles.iconWrapper, styles.iconWrapperWarning]}>
            <Ionicons name="warning-outline" size={26} color={colors.warning} />
          </View>
          <Text style={styles.confirmTitle}>Tem certeza mesmo?</Text>
          <Text style={styles.bodyText}>Essa é sua última chance de voltar atrás.</Text>
          <Pressable
            style={styles.dangerButton}
            onPress={() => {
              confirmRef.current?.dismiss();
              ref?.current?.dismiss();
            }}
          >
            <Text style={styles.dangerButtonText}>Sim, remover</Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={() => confirmRef.current?.dismiss()}>
            <Text style={styles.cancelButtonText}>Voltar</Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
});

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: `${colors.danger}1F`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  iconWrapperWarning: {
    backgroundColor: `${colors.warning}1F`,
  },
  confirmTitle: {
    ...typography.sheetTitle,
    marginBottom: spacing.xs,
  },
  bodyText: {
    ...typography.sheetBody,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  dangerButton: {
    width: "100%",
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.danger,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  dangerButtonText: {
    color: colors.background,
    fontWeight: "700",
  },
  cancelButton: {
    width: "100%",
    height: 48,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontWeight: "600",
  },
});
