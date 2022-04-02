<template>
  <div>
    父组件内容: {{cardTitle}} - {{cardContent}}
    <BaseCard :cardTitle="cardTitle" :cardContent="cardContent"></BaseCard>
  </div>
</template>
<script lang="js">
	import {ref} from "vue";
	import BaseCard from "./../../package/BaseCardComponent/index"
  // import {BaseCard} from "./../../build/lib/main"
	export default {
		setup(props) {
			const cardTitle = ref("cardTitle");
			const cardContent = ref("cardContent");
			return {
				cardTitle,
				cardContent
			}
		},
		components: {
			BaseCard,
		}
	}
</script>
