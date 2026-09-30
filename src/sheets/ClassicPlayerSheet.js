import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

import { colors, radius, spacing, typography } from "../theme/theme";
import { sheetBackgroundStyle, sheetHandleIndicatorStyle, sheetHandleStyle } from "../theme/sheetStyles";

// Modelo 1 — Sheet persistente (não-modal), sempre montada na base da tela.
// É o padrão usado pelo mini-player do Spotify/YouTube Music: fica recolhida
// como uma barrinha e expande pra tela cheia ao arrastar ou tocar.
export const ClassicPlayerSheet = forwardRef(function ClassicPlayerSheet(_, ref) {
  const sheetRef = useRef(null);
  const [sheetIndex, setSheetIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const snapPoints = useMemo(() => ["11%", "88%"], []);

  useImperativeHandle(ref, () => ({
    expand: () => sheetRef.current?.snapToIndex(1),
    collapse: () => sheetRef.current?.snapToIndex(0),
  }));

  const expanded = sheetIndex === 1;

  const handleRowPress = useCallback(() => {
    sheetRef.current?.snapToIndex(expanded ? 0 : 1);
  }, [expanded]);

  return (
    <BottomSheet
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={setSheetIndex}
      backgroundStyle={sheetBackgroundStyle}
      handleIndicatorStyle={sheetHandleIndicatorStyle}
      handleStyle={sheetHandleStyle}
      enablePanDownToClose={false}
    >
      <BottomSheetView style={styles.content}>
        {expanded ? (
          <View style={styles.expandedContainer}>
            <Pressable onPress={() => sheetRef.current?.snapToIndex(0)} style={styles.collapseHint}>
              <Ionicons name="chevron-down" size={22} color={colors.textSecondary} />
            </Pressable>

            <View style={styles.bigArtwork}>
              <Ionicons name="radio" size={64} color={colors.primary} />
            </View>

            <Text style={styles.trackTitleBig} numberOfLines={1}>
              Nova Brasil FM
            </Text>
            <Text style={styles.trackSubtitleBig}>Tocando agora · Ao vivo</Text>

            <View style={styles.bigControlsRow}>
              <Ionicons name="play-skip-back" size={26} color={colors.textMuted} />
              <Pressable style={styles.bigPlayButton} onPress={() => setIsPlaying((v) => !v)}>
                <Ionicons
                  name={isPlaying ? "pause" : "play"}
                  size={30}
                  color={colors.background}
                  style={!isPlaying ? { marginLeft: 3 } : undefined}
                />
              </Pressable>
              <Ionicons name="play-skip-forward" size={26} color={colors.textMuted} />
            </View>

            <Text style={styles.hintText}>Arraste pra baixo ou toque na seta pra recolher</Text>
          </View>
        ) : (
          <Pressable style={styles.miniRow} onPress={handleRowPress}>
            <View style={styles.miniArtwork}>
              <Ionicons name="radio" size={20} color={colors.primary} />
            </View>
            <View style={styles.miniTextWrapper}>
              <Text style={typography.cardTitle} numberOfLines={1}>
                Nova Brasil FM
              </Text>
              <Text style={typography.cardBody} numberOfLines={1}>
                {isPlaying ? "Tocando agora" : "Pausado"}
              </Text>
            </View>
            <Pressable
              style={styles.miniPlayButton}
              onPress={(event) => {
                event.stopPropagation();
                setIsPlaying((v) => !v);
              }}
              hitSlop={10}
            >
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={18}
                color={colors.background}
                style={!isPlaying ? { marginLeft: 2 } : undefined}
              />
            </Pressable>
          </Pressable>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  miniRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.xs,
  },
  miniArtwork: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: `${colors.primary}22`,
    alignItems: "center",
    justifyContent: "center",
  },
  miniTextWrapper: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  miniPlayButton: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  expandedContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: spacing.xs,
  },
  collapseHint: {
    alignSelf: "flex-start",
    padding: spacing.xs,
  },
  bigArtwork: {
    width: 220,
    height: 220,
    borderRadius: radius.lg,
    backgroundColor: `${colors.primary}22`,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.lg,
  },
  trackTitleBig: {
    ...typography.sheetTitle,
    marginTop: spacing.xl,
  },
  trackSubtitleBig: {
    ...typography.cardBody,
    marginTop: spacing.xs,
  },
  bigControlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xl,
    marginTop: spacing.xl,
  },
  bigPlayButton: {
    width: 68,
    height: 68,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  hintText: {
    ...typography.cardBody,
    color: colors.textMuted,
    marginTop: spacing.xl,
    fontSize: 12,
  },
});
