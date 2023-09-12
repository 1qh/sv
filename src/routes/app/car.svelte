<script lang="ts">
    import { A } from 'flowbite-svelte'
    export let name: string
    export let type: string
    export let brand: string
    $: link = `https://${brand}.com/${type}/${name}`
</script>

See {type} car {name} from {brand} at <A href={link}>website</A>
