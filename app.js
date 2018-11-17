const yargs = require('yargs');
const prompt = require('prompts');
const commands = require("./command-actions");

let interval;

let argv = yargs.argv;
let command = process.argv[2];

if(command === 'add') {
	add(null, null);
} else if(command === 'list') {
	list();
} else if(command === 'read') { 
	read();
} else if(command === 'delete') {
	remove();
} else {
	(async function(){
		const questions = [
			{
				type: 'autocomplete',
				name: 'value',
				message: 'You want me to ',
				choices: [
					{ title: 'Add a new command', value: 'add'},
					{ title: 'Retrieve a saved command', value: 'read'},
					{ title: 'List all the commands', value: 'list'},
					{ title: 'Delete a command', value: 'delete'}
				]
			}
		];
		const answers = await prompt(questions, {onCancel:cleanup, onSubmit:cleanup});

		let methodName = answers.value;

		switch(methodName) {
			case "add": 
				add();
				break;
			case "read": 
				read();
				break;
			case "list": 
				list();
				break;
			case "delete": 
				remove();
				break;
			default: break;
		}
	})();
	
	function cleanup() {
		clearInterval(interval);
	}
}

/**
 * 
 * @param {*} commandKey 
 * @param {*} command 
 */
function add() {
	(async function(){
		const questions = [
			{
				type: 'text',
				name: 'commandKey',
				message: `What this command does?`,
				initial: `installs npm smrti package`,
				format: v => `@${v}`
			},
			{
				type: 'text',
				name: 'command',
				message: `What is the command?`,
				initial: `npm install smrti --save`,
				format: v => `@${v}`
			}
		];
		const answers = await prompt(questions, {onCancel:cleanup, onSubmit:cleanup});
		commandKey = answers.commandKey;
		command = answers.command;
		commands.add(answers.commandKey, answers.command);
	})();
	
	function cleanup() {
		clearInterval(interval);
	}
}
/**
 * 
 * @param {*} keywords 
 */
function read() {
	(async function(){
		const questions = [
			{
				type: 'text',
				name: 'commandKey',
				message: `What is the command?`,
				initial: `installs npm smrti package`,
				format: v => `${v}`
			},
			{
				type: 'text',
				name: 'commandKeywords',
				message: `Enter command keywords you remember`,
				initial: `installs npm smrti package`,
				format: v => `${v}`
			}
		];
		const answers = await prompt(questions, {onCancel:cleanup, onSubmit:cleanup});
		commands.read(answers.commandKey);
	})();
	
	function cleanup() {
		clearInterval(interval);
	}
}

/**
 * 
 */
function list() {
	commands.getAll();
}

function remove() {
	commands.remove();
}
