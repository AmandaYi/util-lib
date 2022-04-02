<template>
  <div>
    <h2>{{cardTitle}}</h2>
    <section>{{cardContent}}</section>
  </div>
</template>
<script lang="js">
	export default {
		name: "title",
		props: {
			cardTitle: {
				type: String,
				default: ""
			},
			cardContent: {
				type: String,
				default: ""
			}
		}
	}
</script>

