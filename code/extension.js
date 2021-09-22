// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "paste-incrementer" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json

	let paste = vscode.commands.registerTextEditorCommand('paste-incrementer.pasteWithIncrement', function (editor) {
		vscode.env.clipboard.readText().then(text => {
			var match = text.match(/\d+/);

			if(match != null){
				var number = parseInt(match[0])+1;
				text = text.replace(/\d+/, number.toString());
			}
			var edit = new vscode.WorkspaceEdit();
			edit.replace(editor.document.uri, editor.selection, text);

			vscode.env.clipboard.writeText(text);
			return vscode.workspace.applyEdit(edit);	
		});
	});

	context.subscriptions.push(paste);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
