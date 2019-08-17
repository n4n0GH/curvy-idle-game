<template>
	<div class="row h-100">
		<div class="col p-0" v-if="getHackActive()">
			<div class="card w-100 h-100">
				<div class="card-header">
					C.U.R.V.Y. VM Terminal
				</div>
				<div class="card-body p-2" style="position: relative;">
					<div class="row w-100 h-100 ml-0">
						<div class="col p-0 w-100 h-100">
							<vue-command
							:commands="commands"
							:prompt="prompt"
							:hide-bar="bar"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {mapActions} from 'vuex'

	import VueCommand from 'vue-command'
	import 'vue-command/dist/vue-command.css'

	export default {
		data(){
			return {
				list: this.getHackCommands(),	// commands to use in the terminal
				prompt: 'user@cvm: ~$',				// PS1 of terminal
				bar: true,										// hide default titlebar of terminal
				commands: {
					help: () => {
						let compiledList = ''
						for(let i = 0; i < this.list.length; i++){
							compiledList += this.list[i].name + ': ' + this.list[i].description + ' (' + this.list[i].price + ' PP)<br>'
						}
						return compiledList
					},
					ping: () => {
						if(this.getClickBalance() >= this.list[1].price){
							this.setClickBalanceSubtract(this.list[1].price)
							this.setCommand('ping')
							return 'Initializing denial of service attack...'
						}
						else {
							return '[Error] insufficient funds'
						}
					},
					route: () => {
						if(this.getClickBalance() >= this.list[2].price){
							this.setClickBalanceSubtract(this.list[2].price)
							this.setCommand('route')
							return 'Tracing package route...'
						}
						else {
							return '[Error] insufficient funds'
						}
					},
					ifconfig: () => {
						if(this.getClickBalance() >= this.list[3].price){
							this.setClickBalanceSubtract(this.list[3].price)
							this.setCommand('ifconfig')
							return 'Reconfiguring configured configuration for eth0...'
						}
						else {
							return '[Error] insufficient funds'
						}
					},
					ethtool: () => {
						if(this.getClickBalance() >= this.list[4].price){
							this.setClickBalanceSubtract(this.list[4].price)
							this.setCommand('ethtool')
							return 'Patching firewall...'
						}
						else {
							return '[Error] insufficient funds'
						}
					},
					netcat: () => {
						if(this.getClickBalance() >= this.list[5].price){
							this.setClickBalanceSubtract(this.list[5].price)
							this.setCommand('netcat')
							return 'Sending out nyan...'
						}
						else {
							return '[Error] insufficient funds'
						}
					},
					nmap: () => {
						if(this.getClickBalance() >= this.list[6].price){
							this.setClickBalanceSubtract(this.list[6].price)
							this.setCommand('nmap')
							return 'Open ports found...'
						}
						else {
							return '[Error] insufficient funds'
						}
					},
					netwatch: () => {
						if(this.getClickBalance() >= this.list[7].price){
							this.setClickBalanceSubtract(this.list[7].price)
							this.setCommand('netwatch')
							return 'All systems go...'
						}
						else {
							return '[Error] insufficient funds'
						}
					},
					zlatan: () => {
						return 'guys, any news? I come here every day but still waiting so long with no news. every day losing money. where is Mansto?'
					},
					// @dev: for testing purposes only, remove on release
					hurt: () => {
						this.setHackFwallIntegrity(-20)
					},
					isuckhugedonkeydicksandloveanalcreampies: () => {
						this.setClickBalanceSubtract(-10000)
						this.setBoxPoints(1000)
					},
					reset: () => {
						localStorage.clear()
						location.reload()
						return 'goodbye...'
					}
				}
			}
		},
		methods: {
			...mapGetters([
				'getClickBalance',
				'getHackActive',
				'getHackCommands'
			]),
			...mapActions([
				'setCommand',
				'setClickBalanceSubtract',
				'setBoxPoints',
				'setHackFwallIntegrity'
			])
		},
		components: {
			VueCommand
		}
	};
</script>

<style lang="scss">
	.vue-command {
	height: 100%;
	width: 100%;
		.term {
			height: 100%;
			width: 100%;
			position: absolute;
		}

		.term-std {
			height: 100%;
			width: 100%;
			overflow-y: scroll;
		}
	}
</style>