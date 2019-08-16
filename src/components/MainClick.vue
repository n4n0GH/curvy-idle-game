<template>
	<div class="row align-items-center h-100">
		<img 
		src="../assets/curvy.png" 
		alt="hi, I'm c.u.r.v.y.!" 
		class="w-75 mx-auto cps-pointer"
		@click="patHer()">
		<!-- @dev: add "+1" effect on click -->
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {mapActions} from 'vuex'

	export default {
		methods: {
			...mapGetters([
				'getGameStart',
				'getClickPlayer',
				'getMultiLevel',
				'getMultiActive',
				'getChatActive'
			]),
			...mapActions([
				'setGameStart',
				'setHumanClick',
				'setChatMessage',
			]),
			patHer(){
				let gCP = this.getClickPlayer();

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
		}
	};
</script>