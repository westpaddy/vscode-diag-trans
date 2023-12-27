import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let diagnosticsCollection = vscode.languages.createDiagnosticCollection();
	context.subscriptions.push(diagnosticsCollection);

	function eventListener(e: vscode.DiagnosticChangeEvent) {
		console.log('called');
		const config = vscode.workspace.getConfiguration('diag-trans');
		for (const replacer of Object.entries(config.get('pathReplacer') as Object)) {
			const pattern = RegExp(replacer[0]);
			const replacement = replacer[1];
			for (const src of e.uris) {
				const tgt = vscode.Uri.from({ ...src, path: src.path.replace(pattern, replacement) });
				if (src.path !== tgt.path) {
					const srcDiags = vscode.languages.getDiagnostics(src);
					diagnosticsCollection.set(tgt, srcDiags);
				}
			}
		}
	}

	context.subscriptions.push(vscode.languages.onDidChangeDiagnostics(eventListener));
}
