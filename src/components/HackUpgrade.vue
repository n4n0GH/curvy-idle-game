<template>
	<div class="row">
		<transition name="fade" mode="out-in" appear>
			<div class="col p-0">
				<button 
				class="btn btn-just btn-block"
				@click="activateHack()"
				v-if="!getHackActive() && getBoxPoints() >= getHackPrice()">
					Boot CVM ({{getHackPrice()}} BP)
				</button>
				<div class="card h-100 w-100" v-if="getHackActive()">
					<div class="card-header">
						C.U.R.V.Y. VM Settings
					</div>
					<div class="card-body">
						<div class="row">
							<div class="col-4">
								<p class="lead w-100">CPU: <span class="text-just">{{getHackCpu()}}GHz</span></p>
							</div>
							<div class="col-8">
								<button 
								class="btn btn-just btn-block"
								@click="upgradeCpu()">
									Overclock ({{getHackCpuPrice()}} BP)
								</button>
							</div>
						</div>
						<div class="row">
							<div class="col-4">
								<p class="lead w-100">RAM: <span class="text-just">{{getHackRam()}}GiB</span></p>
							</div>
							<div class="col-8">
								<button 
								class="btn btn-just btn-block"
								@click="upgradeRam()">
									Download RAM ({{getHackRamPrice()}} BP)
								</button>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<hr>
								<p class="lead">Firewall: <span class="text-just">{{getHackFwall() > 0 ? 'Enabled' : 'Disabled'}}</span></p>
							</div>
						</div>
						<div class="row" v-if="getHackFwall() == 0">
							<div class="col">
								<button 
								class="btn btn-just btn-block"
								@click="upgradeFwall()"
								>
									Enable ({{getHackFwallPrice()}} PP)
								</button>
							</div>
						</div>
						<div class="row" v-if="getHackFwall() > 0">
							<div class="col-4">
								<p>Integrity: <span class="text-just">{{getHackFwallIntegrity()}}%</span></p>
							</div>
							<div class="col-8">
								<button 
								class="btn btn-just btn-block"
								@click="upgradeFwall()"
								v-if="getHackFwall() < 4">
									Upgrade ({{getHackFwallPrice()}} PP)
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'
	import {mapActions} from 'vuex'
	import EventBus from '../eventBus.js'

	export default {
		methods: {
			...mapGetters([
				'getClickBalance',
				'getBoxPoints',
				'getChatActive',
				'getAutoActive',
				'getHackActive',
				'getHackPrice',
				'getHackRam',
				'getHackRamPrice',
				'getHackCpu',
				'getHackCpuPrice',
				'getHackFwall',
				'getHackFwallIntegrity',
				'getHackFwallPrice'
			]),
			...mapActions([
				'setClickBalanceSubtract',
				'setBoxBalanceSubtract',
				'setChatActive',
				'setAutoActive',
				'setChatMessage',
				'setBoxActive',
				'setBoxPoints',
				'setHackActive',
				'setHackCpuUpgrade',
				'setHackRamUpgrade',
				'setHackFwallUpgrade'
			]),
			activateHack(){
				if(this.getBoxPoints() >= this.getHackPrice()){
					this.setBoxBalanceSubtract(this.getHackPrice())
					this.setHackActive()
					if(!this.getChatActive()){
						this.setChatActive()
						this.setChatMessage('ooh, my vm is running. that means you got the console.log for free now, you cheapskate (¬‿¬)')
					}
					else {
						this.setChatMessage('aah, my vm. it\'s a bit rusty tho; you might want to upgrade the components to make it faster (✿◠‿◠)')
					}
					if(!this.getAutoActive()){
						this.setAutoActive()
						this.setChatMessage('my vm requires a constant stream of patting, so the A.P.S. is kind of compulsory for this to work out. lucky you (☉▵☉\' )')
						EventBus.$emit('autoActivated')
					}
				}
			},
			upgradeRam(){
				if(this.getBoxPoints() >= this.getHackRamPrice()){
					this.setBoxBalanceSubtract(this.getHackRamPrice())
					this.setHackRamUpgrade()
				}
			},
			upgradeCpu(){
				if(this.getBoxPoints() >= this.getHackCpuPrice()){
					this.setBoxBalanceSubtract(this.getHackCpuPrice())
					this.setHackCpuUpgrade()
				}
			},
			upgradeFwall(){
				if(this.getClickBalance() >= this.getHackFwallPrice()){
					if(this.getHackFwall() < 4) {
						this.setClickBalanceSubtract(this.getHackFwallPrice())
						this.setHackFwallUpgrade()
					}
					else {
						this.setChatMessage('this firewall is already stronger than the golden shield, what more do you want (☉▵☉\' )')
					}
				}
			}
		}
	}
</script>