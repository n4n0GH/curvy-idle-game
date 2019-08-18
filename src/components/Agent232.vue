<template>
	<transition name="fade" mode="out-in">
		<div class="row w-100 mt-4" v-if="getHackerActive()">
			<div class="col p-0">
				<div class="card bg-dark text-light">
					<div class="card-header">
						cat /var/log/fail2ban.log
					</div>
					<div class="card-body">
						<p class="lead">Inbound Ping <span class="text-just attention-anim">{{incomingTimer}}ms</span></p>
						<p class="mb-0">Skill Level: {{skillLevel}}</p>
					</div>
					<div class="card-footer p-0" style="overflow:hidden">
						<div class="progress rounded-0" style="height:2.5rem">
							<div class="progress-bar" :style="{width: fWallHealth() + '%'}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {mapActions} from 'vuex'

	import EventBus from '../eventBus.js'

	let timer

	export default {
		data(){
			return{
				hackList: this.getHackerSkill(),
				incomingTimer: 0
			}
		},
		methods: {
			...mapGetters([
				'getHackerActive',
				'getHackerLevel',
				'getHackerBaseEnergy',
				'getHackerEnergy',
				'getHackerSkill',
				'getClickTotal',
				'getHackerDelay',
				'getHackerSkip'
			]),
			...mapActions([
				'setHackerStatus',
				'setHackAttack',
				'setHackerEnergy',
				'setHackerLevel',
				'setHackerSkip'
			]),
			
			fWallHealth(){
				return 100/this.getHackerBaseEnergy()*this.getHackerEnergy()
			},
			attackTimer(){
				let attackSpeed = this.getHackerDelay()-(this.getHackerLevel()*10)
				this.incomingTimer = attackSpeed
				timer = setInterval(()=>{
					if(this.getHackerSkip() == 0){
						this.setHackAttack(Math.floor(5+(5*this.getHackerLevel()/10))) // damage
					}
					else{
						this.setHackerSkip(-1)
					}
				}, attackSpeed)
				timer
			}
		},
		computed: {
			skillLevel: function() {
				if(this.getHackerLevel() > this.hackList.length){
					return this.hackList[this.hackList.length-1]
				}
				else {
					return this.hackList[this.getHackerLevel()-1]
				}
			},
		},
		mounted() {
			// check for HP periodically
			let vitCheck = setInterval(()=>{
				if(this.getHackerEnergy() <= 0){
					EventBus.$emit('hackerDefeated')
				}
			}, 10)
			vitCheck
			// receive event from HackUpgrade.vue
			EventBus.$on('backDoor', () => {
				let timeStamp = this.getClickTotal()
				let hackTimer = setInterval(()=>{
					if(this.getClickTotal() - timeStamp >= 100){
						this.setHackerEnergy()
						this.setHackerStatus()
						this.attackTimer()
						clearInterval(hackTimer)
					}
				}, 1000)
				hackTimer
			}),
			EventBus.$on('hackerDefeated', () => {
				clearInterval(timer)
				this.setHackerSkip(0)
				this.setHackerStatus()
				this.setHackerLevel()
				this.setHackerEnergy()
				let timeStamp = this.getClickTotal()
				let hackTimer = setInterval(()=>{
					if(this.getClickTotal() - timeStamp >= 25){
						this.setHackerStatus()
						this.attackTimer()
						clearInterval(hackTimer)
					}
				}, 1000)
				hackTimer
			}),
			EventBus.$on('playerDefeated', () => {
				clearInterval(timer)
			})
		}
	}
</script>