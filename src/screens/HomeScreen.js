import React, { useRef } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { MenuCard } from "../components/MenuCard";
import { ActionsSheet } from "../sheets/ActionsSheet";
import { ClassicPlayerSheet } from "../sheets/ClassicPlayerSheet";
import { DetailsSheet } from "../sheets/DetailsSheet";
import { FilterSheet } from "../sheets/FilterSheet";
import { FormSheet } from "../sheets/FormSheet";
import { NestedSheet } from "../sheets/NestedSheet";
import { colors, spacing, typography } from "../theme/theme";

export function HomeScreen() {
  const insets = useSafeAreaInsets();

  const actionsRef = useRef(null);
  const filterRef = useRef(null);
  const formRef = useRef(null);
  const detailsRef = useRef(null);
  const nestedRef = useRef(null);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 140 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={typography.screenTitle}>Bottom Sheet Playground</Text>
        <Text style={styles.subtitle}>
          6 modelos de bottom sheet com @gorhom/bottom-sheet — toque em cada card pra testar.
        </Text>

        <Text style={styles.sectionLabel}>MODAIS (BottomSheetModal)</Text>

        <MenuCard
          icon="list-outline"
          iconColor={colors.primary}
          title="Menu de ações"
          subtitle="Altura fixa, lista de opções com ícone — padrão de ActionSheet"
          onPress={() => actionsRef.current?.present()}
        />

        <MenuCard
          icon="options-outline"
          iconColor={colors.accent}
          title="Filtro com rolagem"
          subtitle="Lista rolável + múltiplos snap points + rodapé fixo"
          onPress={() => filterRef.current?.present()}
        />

        <MenuCard
          icon="create-outline"
          iconColor={colors.warning}
          title="Formulário"
          subtitle="Campos de texto com o teclado empurrando a sheet corretamente"
          onPress={() => formRef.current?.present()}
        />

        <MenuCard
          icon="sparkles-outline"
          iconColor={colors.accent}
          title="Altura dinâmica"
          subtitle="Sem snap points fixos — o tamanho se ajusta ao conteúdo"
          onPress={() => detailsRef.current?.present()}
        />

        <MenuCard
          icon="layers-outline"
          iconColor={colors.danger}
          title="Sheets empilhadas"
          subtitle="Uma sheet de confirmação abrindo por cima da outra"
          onPress={() => nestedRef.current?.present()}
        />

        <Text style={styles.sectionLabel}>PERSISTENTE (BottomSheet)</Text>
        <View style={styles.persistentNote}>
          <Text style={styles.persistentNoteText}>
            A barrinha "Nova Brasil FM" fixada embaixo da tela é uma sheet não-modal — sempre
            montada, arraste pra cima pra expandir. É o mesmo padrão do mini-player do Spotify.
          </Text>
        </View>
      </ScrollView>

      <ActionsSheet ref={actionsRef} />
      <FilterSheet ref={filterRef} />
      <FormSheet ref={formRef} />
      <DetailsSheet ref={detailsRef} />
      <NestedSheet ref={nestedRef} />
      <ClassicPlayerSheet />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  subtitle: {
    ...typography.screenSubtitle,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  persistentNote: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  persistentNoteText: {
    ...typography.cardBody,
  },
});
