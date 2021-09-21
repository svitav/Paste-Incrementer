// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const { toEditorSettings } = require('typescript');
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

	let paste = vscode.commands.registerTextEditorCommand('paste-incrementer.pasteWithIncrement', function (editor, edit, tags) {
		// The code you place here will be executed every time your command is executed
		//var text;
		var promise = vscode.env.clipboard.readText().then(text => {
			var number = parseInt(text.match("\d+")[0]);
			console.log(number);
			text.replace("\d+", "asd");
			var edit = new vscode.WorkspaceEdit();
			edit.insert(editor.document.uri, editor.selection.active, text);
			return vscode.workspace.applyEdit(edit);	
		});

		//console.log(promise);
		//this.edit.replace(editor.selection.active, text);
		// Display a message box to the user
	});


	let disposable = vscode.commands.registerCommand('paste-incrementer.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Paste Incrementer!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
