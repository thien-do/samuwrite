import * as monaco from "monaco-editor";
import { ThemeColors } from "~src/components/prefs/theme/theme";

/**
 * Returns monaco theme's colors (i.e. colors for UI elements such as search
 * box and mini map)
 *
 * Generated with "./debug.ts"
 */
export const getEditorThemeColors = (
	theme: ThemeColors
): monaco.editor.IColors => ({
	// Overall foreground color. This color is only used if not overridden by a component.
	// "foreground": ,
	// Overall foreground color for error messages. This color is only used if not overridden by a component.
	// "errorForeground": ,
	// The default color for icons in the workbench.
	// "icon.foreground": ,
	// Overall border color for focused elements. This color is only used if not overridden by a component.
	// "focusBorder": ,
	// An extra border around elements to separate them from others for greater contrast.
	// "contrastBorder": ,
	// An extra border around active elements to separate them from others for greater contrast.
	// "contrastActiveBorder": ,
	// Foreground color for links in text.
	// "textLink.foreground": ,
	// Foreground color for links in text when clicked on and on mouse hover.
	// "textLink.activeForeground": ,
	// Background color for code blocks in text.
	// "textCodeBlock.background": ,
	// Shadow color of widgets such as find/replace inside the editor.
	// "widget.shadow": ,
	// Input box background.
	// "input.background": ,
	// Input box foreground.
	// "input.foreground": ,
	// Input box border.
	// "input.border": ,
	// Border color of activated options in input fields.
	// "inputOption.activeBorder": ,
	// Background color of activated options in input fields.
	// "inputOption.activeBackground": ,
	// Foreground color of activated options in input fields.
	// "inputOption.activeForeground": ,
	// Input validation background color for information severity.
	// "inputValidation.infoBackground": ,
	// Input validation foreground color for information severity.
	// "inputValidation.infoForeground": ,
	// Input validation border color for information severity.
	// "inputValidation.infoBorder": ,
	// Input validation background color for warning severity.
	// "inputValidation.warningBackground": ,
	// Input validation foreground color for warning severity.
	// "inputValidation.warningForeground": ,
	// Input validation border color for warning severity.
	// "inputValidation.warningBorder": ,
	// Input validation background color for error severity.
	// "inputValidation.errorBackground": ,
	// Input validation foreground color for error severity.
	// "inputValidation.errorForeground": ,
	// Input validation border color for error severity.
	// "inputValidation.errorBorder": ,
	// Dropdown background.
	// "dropdown.background": ,
	// Dropdown foreground.
	// "dropdown.foreground": ,
	// Button foreground color.
	// "button.foreground": ,
	// Button background color.
	// "button.background": ,
	// Button background color when hovering.
	// "button.hoverBackground": ,
	// Badge background color. Badges are small information labels, e.g. for search results count.
	// "badge.background": ,
	// Badge foreground color. Badges are small information labels, e.g. for search results count.
	// "badge.foreground": ,
	// Scrollbar shadow to indicate that the view is scrolled.
	// "scrollbar.shadow": ,
	// Scrollbar slider background color.
	// "scrollbarSlider.background": ,
	// Scrollbar slider background color when hovering.
	// "scrollbarSlider.hoverBackground": ,
	// Scrollbar slider background color when clicked on.
	// "scrollbarSlider.activeBackground": ,
	// Background color of the progress bar that can show for long running operations.
	// "progressBar.background": ,
	// Background color of error text in the editor. The color must not be opaque so as not to hide underlying decorations.
	// "editorError.background": ,
	// Foreground color of error squigglies in the editor.
	// "editorError.foreground": ,
	// Border color of error boxes in the editor.
	// "editorError.border": ,
	// Background color of warning text in the editor. The color must not be opaque so as not to hide underlying decorations.
	// "editorWarning.background": ,
	// Foreground color of warning squigglies in the editor.
	// "editorWarning.foreground": ,
	// Border color of warning boxes in the editor.
	// "editorWarning.border": ,
	// Background color of info text in the editor. The color must not be opaque so as not to hide underlying decorations.
	// "editorInfo.background": ,
	// Foreground color of info squigglies in the editor.
	// "editorInfo.foreground": ,
	// Border color of info boxes in the editor.
	// "editorInfo.border": ,
	// Foreground color of hint squigglies in the editor.
	// "editorHint.foreground": ,
	// Border color of hint boxes in the editor.
	// "editorHint.border": ,
	// Editor background color.
	"editor.background": theme.bg.hex(),
	// Editor default foreground color.
	"editor.foreground": theme.text.hex(),
	// Background color of editor widgets, such as find/replace.
	// "editorWidget.background": ,
	// Foreground color of editor widgets, such as find/replace.
	// "editorWidget.foreground": ,
	// Border color of editor widgets. The color is only used if the widget chooses to have a border and if the color is not overridden by a widget.
	// "editorWidget.border": ,
	// Border color of the resize bar of editor widgets. The color is only used if the widget chooses to have a resize border and if the color is not overridden by a widget.
	// "editorWidget.resizeBorder": ,
	// Quick picker background color. The quick picker widget is the container for pickers like the command palette.
	// "quickInput.background": ,
	// Quick picker foreground color. The quick picker widget is the container for pickers like the command palette.
	// "quickInput.foreground": ,
	// Quick picker title background color. The quick picker widget is the container for pickers like the command palette.
	// "quickInputTitle.background": ,
	// Quick picker color for grouping labels.
	// "pickerGroup.foreground": ,
	// Quick picker color for grouping borders.
	// "pickerGroup.border": ,
	// Keybinding label background color. The keybinding label is used to represent a keyboard shortcut.
	// "keybindingLabel.background": ,
	// Keybinding label foreground color. The keybinding label is used to represent a keyboard shortcut.
	// "keybindingLabel.foreground": ,
	// Keybinding label border color. The keybinding label is used to represent a keyboard shortcut.
	// "keybindingLabel.border": ,
	// Keybinding label border bottom color. The keybinding label is used to represent a keyboard shortcut.
	// "keybindingLabel.bottomBorder": ,
	// Color of the editor selection.
	"editor.selectionbackground": `${theme.sub.hex()}80`,
	// Color of the selected text for high contrast.
	// "editor.selectionForeground": ,
	// Color of the selection in an inactive editor. The color must not be opaque so as not to hide underlying decorations.
	// "editor.inactiveSelectionBackground": ,
	// Color for regions with the same content as the selection. The color must not be opaque so as not to hide underlying decorations.
	// "editor.selectionHighlightBackground": ,
	// Border color for regions with the same content as the selection.
	// "editor.selectionHighlightBorder": ,
	// Color of the current search match.
	"editor.findMatchBackground": `${theme.main.hex()}80`,
	// Color of the other search matches. The color must not be opaque so as not to hide underlying decorations.
	"editor.findMatchHighlightBackground": `${theme.main.hex()}40`,
	// Color of the range limiting the search. The color must not be opaque so as not to hide underlying decorations.
	// "editor.findRangeHighlightBackground": ,
	// Border color of the current search match.
	// "editor.findMatchBorder": ,
	// Border color of the other search matches.
	// "editor.findMatchHighlightBorder": ,
	// Border color of the range limiting the search. The color must not be opaque so as not to hide underlying decorations.
	// "editor.findRangeHighlightBorder": ,
	// Highlight below the word for which a hover is shown. The color must not be opaque so as not to hide underlying decorations.
	// "editor.hoverHighlightBackground": ,
	// Background color of the editor hover.
	// "editorHoverWidget.background": ,
	// Foreground color of the editor hover.
	// "editorHoverWidget.foreground": ,
	// Border color of the editor hover.
	// "editorHoverWidget.border": ,
	// Background color of the editor hover status bar.
	// "editorHoverWidget.statusBarBackground": ,
	// Color of active links.
	// "editorLink.activeForeground": ,
	// Foreground color of inline hints
	// "editorInlayHint.foreground": ,
	// Background color of inline hints
	// "editorInlayHint.background": ,
	// The color used for the lightbulb actions icon.
	// "editorLightBulb.foreground": ,
	// The color used for the lightbulb auto fix actions icon.
	// "editorLightBulbAutoFix.foreground": ,
	// Background color for text that got inserted. The color must not be opaque so as not to hide underlying decorations.
	// "diffEditor.insertedTextBackground": ,
	// Background color for text that got removed. The color must not be opaque so as not to hide underlying decorations.
	// "diffEditor.removedTextBackground": ,
	// Outline color for the text that got inserted.
	// "diffEditor.insertedTextBorder": ,
	// Outline color for text that got removed.
	// "diffEditor.removedTextBorder": ,
	// Border color between the two text editors.
	// "diffEditor.border": ,
	// Color of the diff editor's diagonal fill. The diagonal fill is used in side-by-side diff views.
	// "diffEditor.diagonalFill": ,
	// List/Tree background color for the focused item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not.
	// "list.focusBackground": ,
	// List/Tree foreground color for the focused item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not.
	// "list.focusForeground": ,
	// List/Tree outline color for the focused item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not.
	// "list.focusOutline": ,
	// List/Tree background color for the selected item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not.
	// "list.activeSelectionBackground": ,
	// List/Tree foreground color for the selected item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not.
	// "list.activeSelectionForeground": ,
	// List/Tree icon foreground color for the selected item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not.
	// "list.activeSelectionIconForeground": ,
	// List/Tree background color for the selected item when the list/tree is inactive. An active list/tree has keyboard focus, an inactive does not.
	// "list.inactiveSelectionBackground": ,
	// List/Tree foreground color for the selected item when the list/tree is inactive. An active list/tree has keyboard focus, an inactive does not.
	// "list.inactiveSelectionForeground": ,
	// List/Tree icon foreground color for the selected item when the list/tree is inactive. An active list/tree has keyboard focus, an inactive does not.
	// "list.inactiveSelectionIconForeground": ,
	// List/Tree background color for the focused item when the list/tree is inactive. An active list/tree has keyboard focus, an inactive does not.
	// "list.inactiveFocusBackground": ,
	// List/Tree outline color for the focused item when the list/tree is inactive. An active list/tree has keyboard focus, an inactive does not.
	// "list.inactiveFocusOutline": ,
	// List/Tree background when hovering over items using the mouse.
	// "list.hoverBackground": ,
	// List/Tree foreground when hovering over items using the mouse.
	// "list.hoverForeground": ,
	// List/Tree drag and drop background when moving items around using the mouse.
	// "list.dropBackground": ,
	// List/Tree foreground color of the match highlights when searching inside the list/tree.
	// "list.highlightForeground": ,
	// List/Tree foreground color of the match highlights on actively focused items when searching inside the list/tree.
	// "list.focusHighlightForeground": ,
	// Background color of the type filter widget in lists and trees.
	// "listFilterWidget.background": ,
	// Outline color of the type filter widget in lists and trees.
	// "listFilterWidget.outline": ,
	// Outline color of the type filter widget in lists and trees, when there are no matches.
	// "listFilterWidget.noMatchesOutline": ,
	// Tree stroke color for the indentation guides.
	// "tree.indentGuidesStroke": ,
	// Tree stroke color for the indentation guides.
	// "tree.tableColumnsBorder": ,
	//
	// "quickInput.list.focusBackground": ,
	// Quick picker foreground color for the focused item.
	// "quickInputList.focusForeground": ,
	// Quick picker icon foreground color for the focused item.
	// "quickInputList.focusIconForeground": ,
	// Quick picker background color for the focused item.
	// "quickInputList.focusBackground": ,
	// Border color of menus.
	// "menu.border": ,
	// Foreground color of menu items.
	// "menu.foreground": ,
	// Background color of menu items.
	// "menu.background": ,
	// Foreground color of the selected menu item in menus.
	// "menu.selectionForeground": ,
	// Background color of the selected menu item in menus.
	// "menu.selectionBackground": ,
	// Border color of the selected menu item in menus.
	// "menu.selectionBorder": ,
	// Color of a separator menu item in menus.
	// "menu.separatorBackground": ,
	// Highlight background color of a snippet tabstop.
	// "editor.snippetTabstopHighlightBackground": ,
	// Highlight border color of a snippet tabstop.
	// "editor.snippetTabstopHighlightBorder": ,
	// Highlight background color of the final tabstop of a snippet.
	// "editor.snippetFinalTabstopHighlightBackground": ,
	// Highlight border color of the final tabstop of a snippet.
	// "editor.snippetFinalTabstopHighlightBorder": ,
	// Overview ruler marker color for find matches. The color must not be opaque so as not to hide underlying decorations.
	// "editorOverviewRuler.findMatchForeground": ,
	// Overview ruler marker color for selection highlights. The color must not be opaque so as not to hide underlying decorations.
	// "editorOverviewRuler.selectionHighlightForeground": ,
	// Minimap marker color for find matches.
	// "minimap.findMatchHighlight": ,
	// Minimap marker color for the editor selection.
	// "minimap.selectionHighlight": ,
	// Minimap marker color for errors.
	// "minimap.errorHighlight": ,
	// Minimap marker color for warnings.
	// "minimap.warningHighlight": ,
	// Minimap background color.
	// "minimap.background": ,
	// Minimap slider background color.
	// "minimapSlider.background": ,
	// Minimap slider background color when hovering.
	// "minimapSlider.hoverBackground": ,
	// Minimap slider background color when clicked on.
	// "minimapSlider.activeBackground": ,
	// The color used for the problems error icon.
	// "problemsErrorIcon.foreground": ,
	// The color used for the problems warning icon.
	// "problemsWarningIcon.foreground": ,
	// The color used for the problems info icon.
	// "problemsInfoIcon.foreground": ,
	// Background color for the highlight of line at the cursor position.
	// "editor.lineHighlightBackground": ,
	// Background color for the border around the line at the cursor position.
	// "editor.lineHighlightBorder": ,
	// Background color of highlighted ranges, like by quick open and find features. The color must not be opaque so as not to hide underlying decorations.
	"editor.rangeHighlightBackground": `${theme.sub.hex()}40`,
	// Background color of the border around highlighted ranges.
	// "editor.rangeHighlightBorder": ,
	// Background color of highlighted symbol, like for go to definition or go next/previous symbol. The color must not be opaque so as not to hide underlying decorations.
	// "editor.symbolHighlightBackground": ,
	// Background color of the border around highlighted symbols.
	// "editor.symbolHighlightBorder": ,
	// Color of the editor cursor.
	"editorCursor.foreground": theme.caret.hex(),
	// The background color of the editor cursor. Allows customizing the color of a character overlapped by a block cursor.
	"editorCursor.background": theme.text.hex(),
	// Color of whitespace characters in the editor.
	// "editorWhitespace.foreground": ,
	// Color of the editor indentation guides.
	// "editorIndentGuide.background": ,
	// Color of the active editor indentation guides.
	// "editorIndentGuide.activeBackground": ,
	// Color of editor line numbers.
	// "editorLineNumber.foreground": ,
	// Color of editor active line number
	// "editorActiveLineNumber.foreground": ,
	// Color of editor active line number
	// "editorLineNumber.activeForeground": ,
	// Color of the editor rulers.
	// "editorRuler.foreground": ,
	// Foreground color of editor CodeLens
	// "editorCodeLens.foreground": ,
	// Background color behind matching brackets
	// "editorBracketMatch.background": ,
	// Color for matching brackets boxes
	// "editorBracketMatch.border": ,
	// Color of the overview ruler border.
	// "editorOverviewRuler.border": ,
	// Background color of the editor overview ruler. Only used when the minimap is enabled and placed on the right side of the editor.
	// "editorOverviewRuler.background": ,
	// Background color of the editor gutter. The gutter contains the glyph margins and the line numbers.
	// "editorGutter.background": ,
	// Border color of unnecessary (unused) source code in the editor.
	// "editorUnnecessaryCode.border": ,
	// Opacity of unnecessary (unused) source code in the editor. For example, "#000000c0" will render the code with 75% opacity. For high contrast themes, use the  'editorUnnecessaryCode.border' theme color to underline unnecessary code instead of fading it out.
	// "editorUnnecessaryCode.opacity": ,
	// Border color of ghost text in the editor.
	// "editorGhostText.border": ,
	// Foreground color of the ghost text in the editor.
	// "editorGhostText.foreground": ,
	// Overview ruler marker color for range highlights. The color must not be opaque so as not to hide underlying decorations.
	// "editorOverviewRuler.rangeHighlightForeground": ,
	// Overview ruler marker color for errors.
	// "editorOverviewRuler.errorForeground": ,
	// Overview ruler marker color for warnings.
	// "editorOverviewRuler.warningForeground": ,
	// Overview ruler marker color for infos.
	// "editorOverviewRuler.infoForeground": ,
	// Overview ruler marker color for matching brackets.
	// "editorOverviewRuler.bracketMatchForeground": ,
	// Background color of the peek view title area.
	// "peekViewTitle.background": ,
	// Color of the peek view title.
	// "peekViewTitleLabel.foreground": ,
	// Color of the peek view title info.
	// "peekViewTitleDescription.foreground": ,
	// Color of the peek view borders and arrow.
	// "peekView.border": ,
	// Background color of the peek view result list.
	// "peekViewResult.background": ,
	// Foreground color for line nodes in the peek view result list.
	// "peekViewResult.lineForeground": ,
	// Foreground color for file nodes in the peek view result list.
	// "peekViewResult.fileForeground": ,
	// Background color of the selected entry in the peek view result list.
	// "peekViewResult.selectionBackground": ,
	// Foreground color of the selected entry in the peek view result list.
	// "peekViewResult.selectionForeground": ,
	// Background color of the peek view editor.
	// "peekViewEditor.background": ,
	// Background color of the gutter in the peek view editor.
	// "peekViewEditorGutter.background": ,
	// Match highlight color in the peek view result list.
	// "peekViewResult.matchHighlightBackground": ,
	// Match highlight color in the peek view editor.
	// "peekViewEditor.matchHighlightBackground": ,
	// Match highlight border in the peek view editor.
	// "peekViewEditor.matchHighlightBorder": ,
	// Editor marker navigation widget error color.
	// "editorMarkerNavigationError.background": ,
	// Editor marker navigation widget warning color.
	// "editorMarkerNavigationWarning.background": ,
	// Editor marker navigation widget info color.
	// "editorMarkerNavigationInfo.background": ,
	// Editor marker navigation widget background.
	// "editorMarkerNavigation.background": ,
	// The foreground color for array symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.arrayForeground": ,
	// The foreground color for boolean symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.booleanForeground": ,
	// The foreground color for class symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.classForeground": ,
	// The foreground color for color symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.colorForeground": ,
	// The foreground color for constant symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.constantForeground": ,
	// The foreground color for constructor symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.constructorForeground": ,
	// The foreground color for enumerator symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.enumeratorForeground": ,
	// The foreground color for enumerator member symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.enumeratorMemberForeground": ,
	// The foreground color for event symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.eventForeground": ,
	// The foreground color for field symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.fieldForeground": ,
	// The foreground color for file symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.fileForeground": ,
	// The foreground color for folder symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.folderForeground": ,
	// The foreground color for function symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.functionForeground": ,
	// The foreground color for interface symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.interfaceForeground": ,
	// The foreground color for key symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.keyForeground": ,
	// The foreground color for keyword symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.keywordForeground": ,
	// The foreground color for method symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.methodForeground": ,
	// The foreground color for module symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.moduleForeground": ,
	// The foreground color for namespace symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.namespaceForeground": ,
	// The foreground color for null symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.nullForeground": ,
	// The foreground color for number symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.numberForeground": ,
	// The foreground color for object symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.objectForeground": ,
	// The foreground color for operator symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.operatorForeground": ,
	// The foreground color for package symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.packageForeground": ,
	// The foreground color for property symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.propertyForeground": ,
	// The foreground color for reference symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.referenceForeground": ,
	// The foreground color for snippet symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.snippetForeground": ,
	// The foreground color for string symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.stringForeground": ,
	// The foreground color for struct symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.structForeground": ,
	// The foreground color for text symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.textForeground": ,
	// The foreground color for type parameter symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.typeParameterForeground": ,
	// The foreground color for unit symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.unitForeground": ,
	// The foreground color for variable symbols. These symbols appear in the outline, breadcrumb, and suggest widget.
	// "symbolIcon.variableForeground": ,
	// Background color of the suggest widget.
	// "editorSuggestWidget.background": ,
	// Border color of the suggest widget.
	// "editorSuggestWidget.border": ,
	// Foreground color of the suggest widget.
	// "editorSuggestWidget.foreground": ,
	// Foreground color of the selected entry in the suggest widget.
	// "editorSuggestWidget.selectedForeground": ,
	// Icon foreground color of the selected entry in the suggest widget.
	// "editorSuggestWidget.selectedIconForeground": ,
	// Background color of the selected entry in the suggest widget.
	// "editorSuggestWidget.selectedBackground": ,
	// Color of the match highlights in the suggest widget.
	// "editorSuggestWidget.highlightForeground": ,
	// Color of the match highlights in the suggest widget when an item is focused.
	// "editorSuggestWidget.focusHighlightForeground": ,
	// Background color behind folded ranges. The color must not be opaque so as not to hide underlying decorations.
	// "editor.foldBackground": ,
	// Color of the folding control in the editor gutter.
	// "editorGutter.foldingControlForeground": ,
	// Background color when the editor auto renames on type.
	// "editor.linkedEditingBackground": ,
	// Background color of a symbol during read-access, like reading a variable. The color must not be opaque so as not to hide underlying decorations.
	// "editor.wordHighlightBackground": ,
	// Background color of a symbol during write-access, like writing to a variable. The color must not be opaque so as not to hide underlying decorations.
	// "editor.wordHighlightStrongBackground": ,
	// Border color of a symbol during read-access, like reading a variable.
	// "editor.wordHighlightBorder": ,
	// Border color of a symbol during write-access, like writing to a variable.
	// "editor.wordHighlightStrongBorder": ,
	// Overview ruler marker color for symbol highlights. The color must not be opaque so as not to hide underlying decorations.
	// "editorOverviewRuler.wordHighlightForeground": ,
	// Overview ruler marker color for write-access symbol highlights. The color must not be opaque so as not to hide underlying decorations.
	// "editorOverviewRuler.wordHighlightStrongForeground": ,
});
