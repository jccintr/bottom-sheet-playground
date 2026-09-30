# BottomSheet Playground

Projeto de teste (Expo 54, JavaScript) com 6 modelos de bottom sheet usando `@gorhom/bottom-sheet`, pra validar se funciona no Expo Go antes de decidir se precisamos partir pro dev build/prebuild.

## Modelos incluídos

1. **Menu de ações** (`ActionsSheet`) — `BottomSheetModal` com altura fixa, lista de opções com ícone (padrão ActionSheet).
2. **Filtro com rolagem** (`FilterSheet`) — conteúdo rolável (`BottomSheetScrollView`), múltiplos snap points e rodapé fixo (`BottomSheetFooter`) com botão de aplicar.
3. **Formulário** (`FormSheet`) — `BottomSheetTextInput` com `keyboardBehavior="interactive"`, pra testar o comportamento do teclado empurrando a sheet.
4. **Altura dinâmica** (`DetailsSheet`) — `enableDynamicSizing`, sem snap points fixos; o "Ver mais" recalcula a altura da sheet automaticamente.
5. **Sheets empilhadas** (`NestedSheet`) — uma sheet de confirmação abrindo por cima da outra (duas `BottomSheetModal` independentes).
6. **Sheet persistente** (`ClassicPlayerSheet`) — `BottomSheet` não-modal, sempre montada na base da tela, arrastável entre estado recolhido/expandido (o padrão do mini-player do Spotify).

## Como rodar

```bash
npm install
npx expo start
```

Escaneie o QR com o app **Expo Go** (Android ou iOS). Não precisa de dev client nem prebuild pra esse teste — é exatamente o objetivo: confirmar se o `@gorhom/bottom-sheet` roda liso no Expo Go nessa combinação de versões (Expo SDK 54, reanimated ~4.1.1, gesture-handler ~2.28.0).

## Se der erro no Expo Go

Normalmente aparece como:
- Tela branca/erro vermelho ao abrir alguma sheet específica → anota qual modelo (1 a 6) e me manda o erro exato.
- Erro de `Reanimated`/`Worklet` no console → geralmente é incompatibilidade de versão do reanimated com o que o Expo Go daquele SDK espera.

Nesse caso, partimos pro `expo prebuild` + dev client, igual fizemos no MyRadio.

## Estrutura

```
App.js                          # GestureHandlerRootView + BottomSheetModalProvider
src/screens/HomeScreen.js       # lista de cards que abrem cada sheet
src/sheets/                     # os 6 modelos de bottom sheet
src/components/                 # MenuCard, SheetBackdrop, SheetHeader (reaproveitados)
src/theme/                      # cores, espaçamento, tipografia e estilos padrão das sheets
```
