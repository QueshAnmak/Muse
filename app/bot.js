const yargs = require("yargs");
const { argv } = require("yargs");

const init = require('./utils/main.js');

yargs.version("1.1.0");

yargs.command({
	command: 'start',

	describe: "No description yet.",

	builder: {
		link: {
			describe: "Link of the Google Meet to be joined.",
			demandOption: true,
			type: "string",
		},
	},

	handler: function (argv)
	{
		// console.log(argv.link);
		init(argv.link);
	},
});

yargs.parse();
