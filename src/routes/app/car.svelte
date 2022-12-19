<script lang="ts">
	export let name: string
	export let type: string
	export let brand: string
	$: link = `https://${brand}.com/${type}/${name}`
</script>

See {type} car {name} from {brand} at <a href={link}>website</a>
