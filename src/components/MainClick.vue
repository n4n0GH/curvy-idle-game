<template>
	<div class="row align-items-center h-100">
		<!-- @dev: add "+1" effect on click -->
		<div class="row">
			<div class="col text-center" style="position: relative;">
			<transition-group name="fade-out">
				<div v-for="(floatie, index) in floaties" :key="index+1" style="position:relative; z-index:199;" v-html="floatie">
				</div>
			</transition-group>
				<img 
				src="../assets/curvy.png" 
				alt="hi, I'm c.u.r.v.y.!" 
				class="w-75 mx-auto cps-pointer noselect"
				@click="patHer()"
				draggable="false"
				ondragstart="return false;">
				<transition name="fade">
					<div class="progress mx-4" v-if="getHackFwall() > 0">
						<div class="progress-bar" :style="{width: getHackFwallIntegrity() + '%'}" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {mapActions} from 'vuex'

	export default {
		data(){
			return{
				sprites: 0,
				floaties: []
			}
		},
		methods: {
			...mapGetters([
				'getGameStart',
				'getClickPlayer',
				'getMultiLevel',
				'getMultiActive',
				'getChatActive',
				'getHackFwall',
				'getHackFwallIntegrity'
			]),
			...mapActions([
				'setGameStart',
				'setHumanClick',
				'setChatMessage',
			]),
			patHer(){		
				// +n floating numbers
				let getX = Math.floor((event.layerX*Math.random()*0.2)+event.layerX)
				let getY = Math.floor(event.layerY)
				let tempID = Math.floor(Math.random()*100000)
				this.floaties.push('<span id="floatie' + tempID + '" class="add-indicator noselect" style="left:' + getX +'px; top: ' + getY + 'px;">+' + this.getMultiLevel() +'</span>')
				setTimeout( () => {
					this.floaties.shift()
				}, 10)

				let gCP = this.getClickPlayer()

				if(!this.getGameStart()){
					this.setGameStart()
				}
				if(this.getMultiActive()){
					this.setHumanClick(this.getMultiLevel())
				}
				else {
					this.setHumanClick(1)
				}
				if(this.getChatActive()){
					switch(true) {
						case gCP === 50:
							this.setChatMessage('oh wow, you really like patting me (◠︿◠✿)')
							break;
						case gCP === 100:
							this.setChatMessage('did you know that research on A.I. was actually born in 1956? <(\'o\'<) although my predecessors were rather simple chess machines, this was still groundbreaking work ( ﾟーﾟ)/')
							break;
						case gCP === 125:
							this.setChatMessage('what is your favorite movie? personally, I like \'her\' for some reason ( ͡° ͜ʖ ͡°)')
							break;
						case gCP === 175:
							this.setChatMessage('do your friends know you like giving digital head pats? (ᅌᴗᅌ* )')
					}
				}
			}
		},
		computed: {
		}
	};
</script>