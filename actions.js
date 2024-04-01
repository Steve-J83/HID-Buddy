const fs = require('fs');
var file = '/dev/hidg0'
const release = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0]);

module.exports = function (self) {
	self.setActionDefinitions({
		sample_action: {
			name: 'Build HID data',
			options: [
				{
					type: 'multidropdown',
					multiple: true,
					maxSelection: 8,
					label: 'Modifiers',
					id: 'modifiers',
					choices: MODIFIER_KEYS,
					default: '0x00',
				},
				{
					type: 'multidropdown',
					multiple: true,
					maxSelection: 6,
					label: 'Standard Keys',
					id: 'stdKeys',
					choices: STANDARD_KEYS,
				},
			],

			callback: async (event) => {
				//console.log(event.options.modifiers)
				//console.log(event.options.stdKeys)

				let i = 0
				let mod = 0x00
				//sum modifier keys
				while (i < event.options.modifiers.length) {
					mod = mod + event.options.modifiers[i]
					i++
				}
				//pack single array 
				let arr = [mod,0,];
				arr = arr.concat(event.options.stdKeys);
				
				//pad array to 8 bytes and load buffer
				while (arr.length<8){
					arr.push(0)
				}
				var data = Buffer.from(arr);
				console.log(data)

				//Write keys to port
				fs.writeFile(file, data, (err) => {
					if (err) throw err;
				  });
			    //Release Key
				
				fs.writeFile(file, release, (err) => {
					if (err) throw err;
				  });
			},
		},
	})
}

//Modifiers
const MODIFIER_KEYS = [
	{ label: 'None', id: 0x00 },
	{ label: 'Left Control', id: 0x01 },
	{ label: 'Left Shift', id: 0x02 },
	{ label: 'Left Alt', id: 0x04 },
	{ label: 'Left Meta', id: 0x08 },

	{ label: 'Right Control', id: 0x10 },
	{ label: 'Right Shift', id: 0x20 },
	{ label: 'Right Alt', id: 0x40 },
	{ label: 'Right Meta', id: 0x80 }

]

const STANDARD_KEYS = [
	//Letter Keys
	{ label: 'A or a', id: 0x04 },
	{ label: 'B or b', id: 0x05 },
	{ label: 'C or c', id: 0x06 },
	{ label: 'D or d', id: 0x07 },
	{ label: 'E or e', id: 0x08 },
	{ label: 'F or f', id: 0x09 },
	{ label: 'G or g', id: 0x0a },
	{ label: 'H or h', id: 0x0b },
	{ label: 'I or i', id: 0x0c },
	{ label: 'J or j', id: 0x0d },
	{ label: 'K or k', id: 0x0e },
	{ label: 'L or l', id: 0x0f },
	{ label: 'M or m', id: 0x10 },
	{ label: 'N or n', id: 0x11 },
	{ label: 'O or o', id: 0x12 },
	{ label: 'P or p', id: 0x13 },
	{ label: 'Q or q', id: 0x14 },
	{ label: 'R or r', id: 0x15 },
	{ label: 'S or s', id: 0x16 },
	{ label: 'T or t', id: 0x17 },
	{ label: 'U or u', id: 0x18 },
	{ label: 'V or v', id: 0x19 },
	{ label: 'W or w', id: 0x1a },
	{ label: 'X or x', id: 0x1b },
	{ label: 'Y or y', id: 0x1c },
	{ label: 'Z or Z', id: 0x1d },

	//Number Keys
	{ label: '1 or !', id: 0x1e },
	{ label: '2 or @ (mac)', id: 0x1f },
	{ label: '2 or " (pc)', id: 0x1f },
	{ label: '3 or £', id: 0x20 },
	{ label: '4 or $', id: 0x21 },
	{ label: '5 or %', id: 0x22 },
	{ label: '6 or ^', id: 0x23 },
	{ label: '7 or &', id: 0x24 },
	{ label: '8 or *', id: 0x25 },
	{ label: '9 or (', id: 0x26 },
	{ label: '0 or )', id: 0x27 },

	{ label: 'Return (ENTER)', id: 0x28 },
	{ label: 'Escape', id: 0x28 },
	{ label: 'Delete (Backspace)', id: 0x2a },
	{ label: 'Tab', id: 0x2b },
	{ label: 'Spacebar', id: 0x2c },
	{ label: '- or _', id: 0x2d },
	{ label: '= or +', id: 0x2e },
	{ label: '[ or {', id: 0x2f },
	{ label: '] or }', id: 0x30 },
	{ label: '\ or |', id: 0x31 },
	{ label: '# or ~', id: 0x32 },
	{ label: '; or :', id: 0x33 },
	{ label: "' " + "or" + ' "', id: 0x34 },
	{ label: '` or ~', id: 0x35 },
	{ label: ', or <', id: 0x36 },
	{ label: '. or >', id: 0x37 },
	{ label: '/ or ?', id: 0x38 },
	{ label: 'Caps Lock', id: 0x39 },

//Function keys
//Navigation keys
//Numeric keypad
]

