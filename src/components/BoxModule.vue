<template>
	<div class="row">
		<div class="col p-0">
			<div class="card h-100 w-100">
				<div class="card-header">
					Patting Points Adaptation Processor
				</div>
				<div class="card-body">
					<p class="lead">Box Points: <span class="text-just">{{getBoxPoints()}}</span></p>
					<hr>
					<p>All-Or-Nothing Algorithm <span class="small">(patent pending)</span>:</p>
					<div v-highlight>
						<pre class="language-javascript">
<code>converter( () => {
this.setBoxPoints += Math.floor(this.getClickBalance/2)
this.setClickBalanceSubtract(this.getClickBalance)
})</code>
						</pre>
					</div>
					<button 
					class="btn btn-just btn-block"
					@click="converter()">
						Run Algorithm ({{getClickBalance().toFixed(0)}} PP)
					</button>
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
				'getBoxActive',
				'getBoxPrice',
				'getBoxPoints'
			]),
			...mapActions([
				'setClickBalanceSubtract',
				'setBoxActive',
				'setBoxPoints'
			]),
			converter(){
				let balance = this.getClickBalance()
				this.setBoxPoints(balance)
				this.setClickBalanceSubtract(balance)
			}
		}
	}
</script>