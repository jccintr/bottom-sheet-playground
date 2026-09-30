import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BottomSheetModal, BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SheetBackdrop } from "../components/SheetBackdrop";
import { SheetHeader } from "../components/SheetHeader";
import { colors, radius, spacing, typography } from "../theme/theme";
import { sheetBackgroundStyle, sheetHandleIndicatorStyle, sheetHandleStyle } from "../theme/sheetStyles";

// Modelo 4 — Sheet com formulário: usa o BottomSheetTextInput (em vez do
// TextInput padrão do RN) para o teclado empurrar a sheet corretamente,
// com keyboardBehavior="interactive" para acompanhar o teclado ao abrir.
export const FormSheet = forwardRef(function FormSheet(_, ref) {
  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(() => ["65%"], []);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const renderBackdrop = useCallback((props) => <SheetBackdrop {...props} />, []);

  const handleSubmit = useCallback(() => {
    setSent(true);
    setTimeout(() => {
      ref?.current?.dismiss();
      setTimeout(() => {
        setSent(false);
        setName("");
        setMessage("");
      }, 300);
    }, 900);
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
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
    >
      <BottomSheetView style={[styles.content, { paddingBottom: insets.bottom }]}>
        <SheetHeader title="Sugerir uma rádio" onClose={() => ref?.current?.dismiss()} />

        {sent ? (
          <View style={styles.successBox}>
            <Ionicons name="checkmark-circle" size={48} color={colors.accent} />
            <Text style={styles.successText}>Sugestão enviada, obrigado!</Text>
          </View>
        ) : (
          <>
            <Text style={styles.label}>Nome da estação</Text>
            <BottomSheetTextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Ex: Rádio Cidade FM"
              placeholderTextColor={colors.textMuted}
            />

            <Text style={styles.label}>Por que ela merece estar no app?</Text>
            <BottomSheetTextInput
              style={[styles.input, styles.inputMultiline]}
              value={message}
              onChangeText={setMessage}
              placeholder="Conte um pouco sobre a rádio..."
              placeholderTextColor={colors.textMuted}
              multiline
              numberOfLines={4}
            />

            <Pressable
              style={[styles.submitButton, !name && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={!name}
            >
              <Text style={styles.submitButtonText}>Enviar sugestão</Text>
            </Pressable>
          </>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.textPrimary,
    fontSize: 15,
  },
  inputMultiline: {
    minHeight: 90,
    textAlignVertical: "top",
  },
  submitButton: {
    marginTop: spacing.lg,
    height: 50,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonDisabled: {
    opacity: 0.4,
  },
  submitButtonText: {
    color: colors.background,
    fontWeight: "700",
    fontSize: 15,
  },
  successBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: spacing.xl,
  },
  successText: {
    ...typography.cardTitle,
    marginTop: spacing.md,
  },
});
