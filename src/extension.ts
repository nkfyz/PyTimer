// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('pytimer.timing', () => {
		

		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('No editor is active');
			return;
		} else {
			const selection = editor.selection;
			const indents = ' '.repeat(selection.start.character);
			const selectedText = editor.document.getText(selection);
            // 在选中文本前后添加语句
            const modifiedText = `${indents}import time
${indents}CODE_SEGMENT_NAME = "Evaluated Code Segment"
${indents}time_start = time.time()\n
${indents}${selectedText}\n
${indents}time_end = time.time()
${indents}print(f"The { CODE_SEGMENT_NAME } took { time_end - time_start } seconds to run.");`





            // 插入修改后的文本
            editor.edit(editBuilder => {
                editBuilder.replace(selection, modifiedText);
            });
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
