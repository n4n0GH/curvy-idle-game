import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
	plugins: [createPersistedState()], // turn off for @dev
	state: {
		gameStart: false,
		clickCounter: {
			'byPlayer': 0, // tracks real clicks, unmanipulated by multipliers
			'total': 0, // used to create timestamps based on game states
			'balance': 0
		},
		clickMulti: {
			'active': false,
			'price': 1, //20 for main release
			'level': 1
		},
		autoClickModule: {
			'active': false,
			'price': 1, // 25 for main release
			'level': 1
		},
		chatModule: {
			'active': false,
			'price': 10, // 10 for main release
			'messages': []
		},
		boxModule: {
			'active': false,
			'price': 150, // 150 for main release
			'balance': 0 // 2 clicks => 1 box
		},
		hackModule: { // @dev: prices are in boxes! chat has to be purchased before!
			'active': false,
			'price': 100, // 100 for main release
			upgrades: {
				ram: { // how many commands can be queued up
					'price': 150, // 150 for main
					'level': 1
				},
				cpu: {
					'price': 300, // 300 for main
					'level': 1 // how fast commands are executed (higher level shortens delay in action)
				},
				firewall: { // @dev: prices are in clicks!
					'price': 250, // 250 for main release
					'level': 0,
					'energy': 0 // populated automatically, +25 max energy for each level
				}
			},
			game: {
				'delay': 5000, // reduce by 1000 per CPU level, -4000 max
				'threads': 0, // have functions ++ this on runtime and -- after finishing, never allow > ram.level
				hacker:{
					'active': false,
					'level': 1, // attack speed = game.delay-((hacker.level/100)*1000)
					'baseEnergy': 15, // increment per Level, populate new value to energy, don't change this value
					'energy': 15,
					'skip': 0, 
					skill: [
						'Drachenlord',
						'Scriptkiddie',
						'Jack the Ripper',
						'Sub7',
						'Google-Fu',
						'Stackoverflow',
						'Snowmen',
						'Cambridge Analytica',
						'Reddit',
						'Whistleblower',
						'Sleuth',
						'LOIC',
						'phreak',
						'Man In The Middle',
						'Hacktivist',
						'L0pht',
						'h4x0r',
						'sabu',
						'Incel',
						'Morpheus',
						'John McAfee',
						'0Cool',
						'Cypher',
						'Blackhat',
						'Mitnick',
						'4chan',
						'Lizard Squad',	
						'lulzsec',
						'Woz',
						'Zoz',
						'Anonymous',
						'Cult of the Dead Cow',
						'Elliot',
						'Mr. Robot',
						'Nation State',
						'Three Letter Agency',
						'Cicada',
						'Agent 232'
					]
				},
				commands: [
					{
						'name': 'help',
						'price': 0,
						'description': 'list all available commands'
					},
					{
						'name': 'ping',
						'price': 10,
						'description': 'slow down attacker',
						'slow': 1
					},
					{
						'name': 'route',
						'price': 25,
						'description': 'slow down attacker, hack firewall -5',
						'slow': 1,
						'attack': 5
					},
					{
						'name': 'ifconfig',
						'price': 50,
						'description': 'slow down attacker, hack firewall -10',
						'slow': 1,
						'attack': 10
					},
					{
						'name': 'ethtool',
						'price': 75,
						'description': 'repair own firewall +10',
						'repair': 10
					},
					{
						'name': 'netcat',
						'price': 100,
						'description': 'hack firewall -15, repair own firewall +10',
						'attack': 15,
						'repair': 10
					},
					{
						'name': 'nmap',
						'price': 150,
						'description': 'hack firewall -25, repair own firewall +10',
						'attack': 25,
						'repair': 10
					},
					{
						'name': 'netwatch',
						'price': 200,
						'description': 'slow down attacker, hack firewall -25, repair own firewall +20',
						'slow': 1,
						'attack': 25,
						'repair': 20
					},
					{
						'name': 'reboot',
						'price': 0,
						'description': 'halts all proccesses and reboots the machine, will terminate all connections'
					}
				]
			}
		}
	},
	getters: {
		// I swear I'll programmatically create these bitches next time ;__;
		getGameStart: state => {
			return state.gameStart
		},
		// getters for clicks
		getClickPlayer: state => {
			return state.clickCounter.byPlayer
		},
		getClickTotal: state => {
			return state.clickCounter.total
		},
		getClickBalance: state => {
			return state.clickCounter.balance
		},
		// getters for multiplier
		getMultiActive: state => {
			return state.clickMulti.active
		},
		getMultiPrice: state => {
			return state.clickMulti.price
		},
		getMultiLevel: state => {
			return state.clickMulti.level
		},
		// getters for autoclicker
		getAutoActive: state => {
			return state.autoClickModule.active
		},
		getAutoPrice: state => {
			return state.autoClickModule.price
		},
		getAutoLevel: state => {
			return state.autoClickModule.level
		},
		getChatActive: state => {
			return state.chatModule.active
		},
		getChatPrice: state => {
			return state.chatModule.price
		},
		getChatMessage: state => {
			return state.chatModule.messages
		},
		getBoxActive: state => {
			return state.boxModule.active
		},
		getBoxPrice: state => {
			return state.boxModule.price
		},
		getBoxPoints: state => {
			return state.boxModule.balance
		},
		getHackActive: state => {
			return state.hackModule.active
		},
		getHackPrice: state => {
			return state.hackModule.price
		},
		getHackRam: state => {
			return state.hackModule.upgrades.ram.level
		},
		getHackRamPrice: state => {
			return state.hackModule.upgrades.ram.price
		},
		getHackCpu: state => {
			return state.hackModule.upgrades.cpu.level
		},
		getHackCpuPrice: state => {
			return state.hackModule.upgrades.cpu.price
		},
		getHackFwall: state => {
			return state.hackModule.upgrades.firewall.level
		},
		getHackFwallIntegrity: state => {
			return state.hackModule.upgrades.firewall.energy
		},
		getHackFwallPrice: state => {
			return state.hackModule.upgrades.firewall.price
		},
		getHackCommands: state => {
			return state.hackModule.game.commands
		},
		getHackerActive: state => {
			return state.hackModule.game.hacker.active
		},
		getHackerLevel: state => {
			return state.hackModule.game.hacker.level
		},
		getHackerBaseEnergy: state => {
			return state.hackModule.game.hacker.baseEnergy
		},
		getHackerEnergy: state => {
			return state.hackModule.game.hacker.energy
		},
		getHackerSkill: state => {
			return state.hackModule.game.hacker.skill
		},
		getHackerDelay: state => {
			return state.hackModule.game.delay
		},
		getHackerSkip: state => {
			return state.hackModule.game.hacker.skip
		}
	},
	mutations: {
		gameStart: state => {
			state.gameStart = true
		},
		clickPlayer: state => {
			state.clickCounter.byPlayer += 1
		},
		clickTotal: (state, payload) => {
			state.clickCounter.total += payload
		},
		clickBalanceAdjust: (state, payload) => {
			state.clickCounter.balance += payload
		},
		multiActive: state => {
			state.clickMulti.active = true
			state.clickMulti.level++
			if(state.chatModule.active){
				state.chatModule.messages.push('activating the multiplier is a good way to reduce the chance of getting tendonitis (o◡o )')
			}
		},
		multiPrice: state => {
			state.clickMulti.price += Math.floor(state.clickMulti.price * 1.8)
		},
		multiLevel: state => {
			state.clickMulti.level++
		},
		autoActive: state => {
			state.autoClickModule.active = true
		},
		autoPrice: state => {
			state.autoClickModule.price += Math.floor(state.autoClickModule.price * 1.15)
		},
		autoLevel: state => {
			state.autoClickModule.level++
		},
		chatActive: state => {
			state.chatModule.active = true
		},
		chatMessage: (state, payload) => {
			state.chatModule.messages.push(payload)
		},
		boxActive: state => {
			state.boxModule.active = true
			if(state.chatModule.active){
				state.chatModule.messages.push('oh neat, you got the P.P.A.P. running! those box points can be used to upgrade my vm (ᅌᴗᅌ*)')
			}
		},
		boxPoints: (state, payload) => {
			state.boxModule.balance += Math.floor(payload/2)
		},
		boxBalanceSubtract: (state, payload) => {
			state.boxModule.balance -= payload
		},
		hackActive: state => {
			state.hackModule.active = true
		},
		hackCpuUpgrade: state => {
			state.hackModule.upgrades.cpu.level ++
			state.hackModule.upgrades.cpu.price += Math.floor(state.hackModule.upgrades.cpu.price * 0.3)
		},
		hackRamUpgrade: state => {
			state.hackModule.upgrades.ram.level ++
			state.hackModule.upgrades.ram.price += Math.floor(state.hackModule.upgrades.ram.price * 0.2)
		},
		hackFwallUpgrade: state => {
			state.hackModule.upgrades.firewall.level ++
			state.hackModule.upgrades.firewall.price += Math.floor(state.hackModule.upgrades.firewall.price * 0.1)
			state.hackModule.upgrades.firewall.energy += 25
		},
		hackFwallIntegrity: (state, payload) => {
			let result = state.hackModule.upgrades.firewall.energy += payload
			if(result <= 0){
				state.hackModule.upgrades.firewall.energy = 0
			}
			else {
				result
			}
		},
		commandExec: (state, payload) => {
			state.hackModule.game.threads ++
			let cmdArray
			let maxFwall = state.hackModule.upgrades.firewall.level*25
			if(state.hackModule.game.threads > state.hackModule.upgrades.ram.level){
				state.hackModule.game.threads --
				state.chatModule.messages.push('whoops, looks like you would need more RAM to do this; your process queue is packed ¯\\_(ツ)_/¯')
				// @dev refund player pls, it's the right thing to do ;__;
			}
			else {
				setTimeout( () => {
					switch(true) {
						case payload === 'ping':
							state.chatModule.messages.push('the attacker was confused by the ping spam we sent, he will be busy for a while (•̀o•́)ง')
							state.hackModule.game.hacker.skip ++
							state.hackModule.game.threads --
							break;
						case payload === 'route':
							cmdArray = state.hackModule.game.commands[2]
							state.chatModule.messages.push('found the attacker\'s firewall and damaged it! take that, sucker ρ(￣ﾍ￣ ﾒ)')
							state.hackModule.game.hacker.skip ++
							state.hackModule.game.hacker.energy -= cmdArray.attack
							state.hackModule.game.threads --
							break;
						case payload === 'ifconfig':
							cmdArray = state.hackModule.game.commands[3]
							state.chatModule.messages.push('sweet revenge (´꒳`∗) the attacker took a big hit; that\'ll take some time to get sorted out ε-(‘ﾍ´○)┓')
							state.hackModule.game.hacker.skip ++
							state.hackModule.game.hacker.energy -= cmdArray.attack
							state.hackModule.game.threads --
							break;
						case payload === 'ethtool':
							state.chatModule.messages.push('repaired my firewall a little (ﾉ^∇^)ﾉﾟ')
							// eslint-disable-next-line
							if (state.hackModule.upgrades.firewall.energy += 10 >= maxFwall){
								state.hackModule.upgrades.firewall.energy = maxFwall
							}
							else {
								state.hackModule.upgrades.firewall.energy += 10
							}
							state.hackModule.game.threads --
							break;
						case payload === 'netcat':
							cmdArray = state.hackModule.game.commands[5]
							state.chatModule.messages.push('repairing or attacking? why not have both? take this Σ(ノ°▽°)ノ')
							// eslint-disable-next-line
							if (state.hackModule.upgrades.firewall.energy += 10 >= maxFwall){
								state.hackModule.upgrades.firewall.energy = maxFwall
							}
							else {
								state.hackModule.upgrades.firewall.energy += 10
							}
							state.hackModule.game.hacker.energy -= cmdArray.attack
							state.hackModule.game.threads --
							break;
						case payload === 'nmap':
							cmdArray = state.hackModule.game.commands[6]
							state.chatModule.messages.push('attack train of repairs coming through ⤴︎ ε=ε=(ง ˃̶͈̀ᗨ˂̶͈́)۶ ⤴︎')
							// eslint-disable-next-line
							if (state.hackModule.upgrades.firewall.energy += 10 >= maxFwall){
								state.hackModule.upgrades.firewall.energy = maxFwall
							}
							else {
								state.hackModule.upgrades.firewall.energy += 10
							}
							state.hackModule.game.hacker.energy -= cmdArray.attack
							state.hackModule.game.threads --
							break;
						case payload === 'netwatch':
							cmdArray = state.hackModule.game.commands[7]
							state.chatModule.messages.push('take my ultimate attack, agent 232 凸ಠ益ಠ)凸')
							state.hackModule.game.hacker.skip ++
							// eslint-disable-next-line
							if (state.hackModule.upgrades.firewall.energy += 20 >= maxFwall){
								state.hackModule.upgrades.firewall.energy = maxFwall
							}
							else {
								state.hackModule.upgrades.firewall.energy += 20
							}
							state.hackModule.game.hacker.energy -= cmdArray.attack
							state.hackModule.game.threads --
							break;
					}
				}, state.hackModule.game.delay-(state.hackModule.upgrades.cpu.level*1000))
			}			
		},
		hackerStatus: state => {
			state.hackModule.game.hacker.active = !state.hackModule.game.hacker.active
		},
		hackAttack: (state, payload) => {
			state.hackModule.upgrades.firewall.energy -= payload
		},
		hackerEnergy: state => {
			let base = state.hackModule.game.hacker.baseEnergy
			if(state.hackModule.game.hacker.level > 1){
				state.hackModule.game.hacker.energy = base+(base*0.1)
			}
			else {
				state.hackModule.game.hacker.energy = base
			}
		},
		hackerLevel: state => {
			state.hackModule.game.hacker.level ++
		},
		hackerSkip: (state, payload) => {
			state.hackModule.game.hacker.skip += payload
		}
	},
	actions: {
		setGameStart: context => {
			context.commit('gameStart')
		},
		setClickBalanceSubtract: (context, payload) => {
			context.commit('clickBalanceAdjust', payload*-1)
		},
		setHumanClick: (context, payload) => {
			context.commit('clickPlayer')
			context.commit('clickTotal', payload)
			context.commit('clickBalanceAdjust', payload)
		},
		setMultiActive: context => {
			context.commit('multiActive')
			context.commit('multiPrice')
		},
		setMultiUpdate: context => {
			context.commit('multiPrice')
			context.commit('multiLevel')
		},
		setAutoClick: (context, payload) => {
			context.commit('clickTotal', 1)
			context.commit('clickBalanceAdjust', payload)
		},
		setAutoActive: context => {
			context.commit('autoActive')
			context.commit('autoPrice')
		},
		setAutoUpdate: context => {
			context.commit('autoPrice')
			context.commit('autoLevel')
		},
		setChatActive: context => {
			context.commit('chatActive')
		},
		setChatMessage: (context, payload) => {
			context.commit('chatMessage', payload)
		},
		setBoxActive: context => {
			context.commit('boxActive')
		},
		setBoxPoints: (context, payload) => {
			context.commit('boxPoints', payload)
		},
		setBoxBalanceSubtract: (context, payload) => {
			context.commit('boxBalanceSubtract', payload)
		},
		setHackActive: context => {
			context.commit('hackActive')
		},
		setHackCpuUpgrade: context => {
			context.commit('hackCpuUpgrade')
		},
		setHackRamUpgrade: context => {
			context.commit('hackRamUpgrade')
		},
		setHackFwallUpgrade: context => {
			context.commit('hackFwallUpgrade')
		},
		setHackFwallIntegrity: (context, payload) => {
			context.commit('hackFwallIntegrity', payload)
		},
		setCommand: (context, payload) => {
			context.commit('commandExec', payload)
		},
		setHackerStatus: context => {
			context.commit('hackerStatus')
		},
		setHackAttack: (context, payload) => {
			context.commit('hackAttack', payload)
		},
		setHackerEnergy: context => {
			context.commit('hackerEnergy')
		},
		setHackerLevel: context => {
			context.commit('hackerLevel')
		},
		setHackerSkip: (context, payload) => {
			context.commit('hackerSkip', payload)
		}
	}
})
