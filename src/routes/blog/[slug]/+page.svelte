<script>
    export let data
    import { Heading } from 'flowbite-svelte'
</script>

<Heading>
    {data.post.title}
</Heading>
{@html data.post.content}
