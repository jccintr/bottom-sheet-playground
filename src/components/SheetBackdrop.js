import React from "react";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

// Backdrop escurecido com fade suave, reaproveitado por todos os modais.
export function SheetBackdrop(props) {
  return (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.6}
      pressBehavior="close"
    />
  );
}
