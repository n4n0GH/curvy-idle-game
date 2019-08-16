<template>
	<div class="row h-100">
		<transition name="fade" mode="out-in">
			<div class="col pr-0 h-100">
				<button 
				class="btn btn-just btn-block"
				@click="activateChat()"
				v-if="!getChatActive() && getClickBalance() >= getChatPrice()">
					Establish A.I. Logging ({{getChatPrice()}} PP)
				</button>
				<div class="card h-100 w-100" v-if="getChatActive()">
					<div class="card-header">
						console.log(C.U.R.V.Y.)
					</div>
					<div class="card-body p-0" style="position: relative;">
						<transition-group name="fade" mode="out-in" tag="div" style="position:absolute; overflow-y:scroll; overflow-x:hidden;" class="h-100 w-100 pl-1 pr-1">
							<div v-for="(message, index) in getChatMessage()" :key="index + 1" class="row">
								<div class="col-1">
									<span class="text-just text-center">&raquo;</span>
								</div>
								<div class="col">
									{{message}}
								</div>
							</div>
						</transition-group>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'
	import {mapActions} from 'vuex'

	export default {
		methods: {
			...mapGetters([
				'getClickBalance',
				'getChatActive',
				'getChatPrice',
				'getChatMessage'
			]),
			...mapActions([
				'setClickBalanceSubtract',
				'setChatActive',
				'setChatMessage'
			]),
			activateChat(){
				if(this.getClickBalance() >= this.getChatPrice()){
					this.setClickBalanceSubtract(this.getChatPrice())
					this.setChatActive()
					this.setChatMessage('hey, thanks for waking me up ヽ(‘ ∇‘ )ノ')
				}
			}
		}
	}
</script>