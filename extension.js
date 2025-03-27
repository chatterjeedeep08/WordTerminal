const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const disposable = vscode.commands.registerCommand('wordterminal.startWordTerminal', function () {
		vscode.window.showInformationMessage('Hello from WordTerminal!');
		const terminal = vscode.window.createTerminal('WordTerminal');
		terminal.show();

		terminal.sendText("node " + __dirname + "/wordterminal.js");

		// terminal.sendText('echo Welcome to WordTerminal!\n');
        // terminal.sendText('echo (Debug Mode: The word is " + chosenWord + ")\n');
        // terminal.sendText('echo Type your guess below:');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
