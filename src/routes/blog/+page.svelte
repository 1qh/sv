<script>
    export let data
    import { A, Listgroup, ListgroupItem } from 'flowbite-svelte'
</script>

<Listgroup>
    {#each data.summaries as { slug, title }}
        <ListgroupItem>
            <A href="/blog/{slug}">{title}</A>
        </ListgroupItem>
    {/each}
</Listgroup>
