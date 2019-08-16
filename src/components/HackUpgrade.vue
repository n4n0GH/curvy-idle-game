<template>
	<div class="row">
		<div class="col p-0">
			<div class="card h-100 w-100" v-if="getHackActive()">
				<div class="card-header">
					C.U.R.V.Y. VM Settings
				</div>
				<div class="card-body pb-0">
					<div class="row">
						<div class="col-4">
							<p class="lead w-100">CPU: <span class="text-just">{{getHackCpu()}}GHz</span></p>
						</div>
						<div class="col-8" v-if="getHackCpu() < 4">
							<button 
							class="btn btn-just btn-block"
							@click="upgradeCpu()">
								Overclock ({{getHackCpuPrice()}} BP)
							</button>
						</div>
						<div class="col-8" v-else>
							<p class="lead">Max Speed</p>
						</div>
					</div>
					<div class="row">
						<div class="col-4">
							<p class="lead w-100">RAM: <span class="text-just">{{getHackRam()}}GiB</span></p>
						</div>
						<div class="col-8" v-if="getHackRam() < 6">
							<button 
							class="btn btn-just btn-block"
							@click="upgradeRam()">
								Download RAM ({{getHackRamPrice()}} BP)
							</button>
						</div>
						<div class="col-8" v-else>
							<p class="lead">Max Capacity</p>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<hr>
							<p class="lead">Firewall: 
								<span class="text-just">
									{{getHackFwall() > 0 ? 'Enabled - ' : 'Disabled'}}
								</span>
								<span class="text-just" v-if="getHackFwall() > 0">
									{{getHackFwall() &lt; 4 ? 'Level ' + getHackFwall() : 'Maximum Security'}}
								</span>
							</p>
						</div>
					</div>
					<div class="row" v-if="getHackFwall() == 0">
						<div class="col">
							<button 
							class="btn btn-just btn-block mb-4"
							@click="upgradeFwall()"
							>
								Enable ({{getHackFwallPrice()}} PP)
							</button>
						</div>
					</div>
					<div class="row" v-if="getHackFwall() > 0">
						<div class="col">
							<button 
							class="btn btn-just btn-block mb-4"
							@click="upgradeFwall()"
							v-if="getHackFwall() < 4">
								Upgrade ({{getHackFwallPrice()}} PP)
							</button>
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