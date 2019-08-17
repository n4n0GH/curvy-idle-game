<template>
	<div class="row w-100">
		<div class="card w-100 noselect">
			<div class="card-header">
				Simulation Report Module
			</div>
			<div class="card-body">
				<div class="row">
					<div class="col">
						<p class="lead">Patting Points: <span class="text-just">{{getClickBalance().toFixed(1)}}</span></p>
						<p>Manual Cycles: {{getClickPlayer()}} | Total Cycles: {{getClickTotal()}}</p>
					</div>
				</div>
				<div class="row">
					<div class="col mt-4" v-if="!getMultiActive()">
						<button 
						class="btn btn-just btn-block"
						@click="multiActive()">
							Initialize P.P.M. ({{getMultiPrice()}} PP)	
						</button>
					</div>
					<div class="col" v-else>
						<hr>
						<p>Patting Power Multiplicator enabled!</p>
						<p>Manual Cycles receive <span class="text-just">{{getMultiLevel()}}x</span> Patting Points</p>
						<button 
						class="btn btn-just btn-block"
						@click="multiUpdate()">
							Increase Power ({{getMultiPrice()}} PP)
						</button>
					</div>
				</div>
				<div class="row">
					<div class="col mt-4" v-if="!getAutoActive()">
						<button 
						class="btn btn-just btn-block"
						@click="autoActive()">
							Initialize A.P.S. ({{getAutoPrice()}} PP)	
						</button>
					</div>
					<div class="col" v-else>
						<hr>
						<p>Automatic Patting System enabled!</p>
						<p>Simulation frequency set at <span class="text-just">{{getAutoLevel()}}Hz</span></p>
						<button 
						class="btn btn-just btn-block"
						@click="autoIncrease()">
						Increase Frequency ({{getAutoPrice()}} PP)	
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {mapActions} from 'vuex'
	import EventBus from '../eventBus.js'

	let autoSim;

	export default {
		methods: {
			...mapGetters([
				'getClickPlayer',
				'getClickTotal',
				'getClickBalance',
				'getMultiActive',
				'getMultiPrice',
				'getMultiLevel',
				'getAutoActive',
				'getAutoPrice',
				'getAutoLevel',
				'getChatActive'
			]),
			...mapActions([
				'setGameStart',
				'setHumanClick',
				'setMultiActive',
				'setMultiUpdate',
				'setAutoClick',
				'setAutoActive',
				'setAutoUpdate',
				'setClickBalanceSubtract',
				'setChatMessage'
			]),
			patHer() {
				if(this.getGameStart() === false){
					this.setGameStart()
					this.setHumanClick(1)
				}
				this.setHumanClick(1)
			},
			multiActive() {
				if(this.getClickBalance() >= this.getMultiPrice()){
					this.setClickBalanceSubtract(this.getMultiPrice())
					this.setMultiActive()
				}
			},
			multiUpdate() {
				if(this.getClickBalance() >= this.getMultiPrice()){
					this.setClickBalanceSubtract(this.getMultiPrice())
					this.setMultiUpdate()
				}
			},
			autoActive() {
				if(this.getClickBalance() >= this.getAutoPrice()){
					this.setClickBalanceSubtract(this.getAutoPrice())
					this.setAutoActive()
					if(this.getChatActive()){
						this.setChatMessage('the A.P.S. module feels a little like cheating, but I can\'t tell the difference between the patting anyway ≧◡≦')
					}
					EventBus.$emit('autoActivated')
				}
			},
			autoIncrease() {
				if(this.getClickBalance() >= this.getAutoPrice()){
					this.setClickBalanceSubtract(this.getAutoPrice())
					this.setAutoUpdate()
					EventBus.$emit('autoActivated')
				}
			}
		},
		mounted() {
			EventBus.$on('autoActivated', () => {
				clearInterval(autoSim);
				autoSim = setInterval(() => {
					this.setAutoClick(this.getAutoLevel()/100);
				}, 1000/this.getAutoLevel());
				autoSim;
			}),
			EventBus.$on('playerDefeated', () => {
				clearInterval(autoSim)
			})
		}
	};
</script>