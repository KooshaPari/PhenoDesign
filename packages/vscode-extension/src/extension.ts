import * as vscode from 'vscode';

// phenoDesign token completions for CSS
const TOKEN_COMPLETIONS: vscode.CompletionItem[] = [
  // Surface tokens
  ...['surface.dark', 'surface.light', 'surface.card', 'surface.elevated', 'surface.text', 'surface.textMuted'].map(t => ({
    label: `--pd-${t.replace('.', '-')}`,
    kind: vscode.CompletionItemKind.Variable,
    detail: `phenoDesign ${t}`,
    documentation: new vscode.MarkdownString(`Surface token: \`${t}\``),
    insertText: new vscode.SnippetString(`var(--pd-${t.replace('.', '-')})`),
  })),

  // Arch (teal) tokens
  ...[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(n => ({
    label: `--pd-arch-${n}`,
    kind: vscode.CompletionItemKind.Color,
    detail: `phenoDesign arch ${n}`,
    documentation: new vscode.MarkdownString(`Arch (teal) scale: \`${n}\``),
    insertText: new vscode.SnippetString(`var(--pd-arch-${n})`),
  })),

  // Sky tokens
  ...[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(n => ({
    label: `--pd-sky-${n}`,
    kind: vscode.CompletionItemKind.Color,
    detail: `phenoDesign sky ${n}`,
    documentation: new vscode.MarkdownString(`Sky scale: \`${n}\``),
    insertText: new vscode.SnippetString(`var(--pd-sky-${n})`),
  })),

  // Forest tokens
  ...[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(n => ({
    label: `--pd-forest-${n}`,
    kind: vscode.CompletionItemKind.Color,
    detail: `phenoDesign forest ${n}`,
    documentation: new vscode.MarkdownString(`Forest scale: \`${n}\``),
    insertText: new vscode.SnippetString(`var(--pd-forest-${n})`),
  })),

  // Ember tokens
  ...[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(n => ({
    label: `--pd-ember-${n}`,
    kind: vscode.CompletionItemKind.Color,
    detail: `phenoDesign ember ${n}`,
    documentation: new vscode.MarkdownString(`Ember scale: \`${n}\``),
    insertText: new vscode.SnippetString(`var(--pd-ember-${n})`),
  })),

  // Sun tokens
  ...[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(n => ({
    label: `--pd-sun-${n}`,
    kind: vscode.CompletionItemKind.Color,
    detail: `phenoDesign sun ${n}`,
    documentation: new vscode.MarkdownString(`Sun scale: \`${n}\``),
    insertText: new vscode.SnippetString(`var(--pd-sun-${n})`),
  })),

  // Slate tokens
  ...[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(n => ({
    label: `--pd-slate-${n}`,
    kind: vscode.CompletionItemKind.Color,
    detail: `phenoDesign slate ${n}`,
    documentation: new vscode.MarkdownString(`Slate scale: \`${n}\``),
    insertText: new vscode.SnippetString(`var(--pd-slate-${n})`),
  })),

  // Iris tokens
  ...[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(n => ({
    label: `--pd-iris-${n}`,
    kind: vscode.CompletionItemKind.Color,
    detail: `phenoDesign iris ${n}`,
    documentation: new vscode.MarkdownString(`Iris scale: \`${n}\``),
    insertText: new vscode.SnippetString(`var(--pd-iris-${n})`),
  })),

  // Radius tokens
  ...['sm', 'md', 'lg', 'xl', '2xl', 'full'].map(s => ({
    label: `--pd-radius-${s}`,
    kind: vscode.CompletionItemKind.Unit,
    detail: `phenoDesign radius ${s}`,
    documentation: new vscode.MarkdownString(`Border radius: \`${s}\``),
    insertText: new vscode.SnippetString(`var(--pd-radius-${s})`),
  })),

  // Spacing tokens
  ...[0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64].map(n => ({
    label: `--pd-space-${n}`,
    kind: vscode.CompletionItemKind.Unit,
    detail: `phenoDesign spacing ${n}`,
    documentation: new vscode.MarkdownString(`Spacing scale: \`${n}\``),
    insertText: new vscode.SnippetString(`var(--pd-space-${n})`),
  })),

  // Font family tokens
  ...['sans', 'mono', 'display'].map(f => ({
    label: `--pd-font-${f}`,
    kind: vscode.CompletionItemKind.Enum,
    detail: `phenoDesign font ${f}`,
    documentation: new vscode.MarkdownString(`Font family: \`${f}\``),
    insertText: new vscode.SnippetString(`var(--pd-font-${f})`),
  })),
];

export function activate(context: vscode.ExtensionContext) {
  // Register CSS completion provider for .pheno.css files
  const provider = vscode.languages.registerCompletionItemProvider(
    'css',
    {
      provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
        const lineText = document.lineAt(position).text;
        // Only provide completions after a var( or in property context
        if (lineText.includes('var(') || lineText.match(/^\s*--pd-/)) {
          return TOKEN_COMPLETIONS;
        }
        return TOKEN_COMPLETIONS;
      },
    },
    '--', 'pd-' // trigger characters
  );

  context.subscriptions.push(provider);
}

export function deactivate() {}
