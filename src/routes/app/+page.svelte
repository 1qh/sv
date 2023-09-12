<script lang="ts">
    import {
        A,
        Button,
        ButtonGroup,
        Checkbox,
        FloatingLabelInput,
        Hr,
        Img,
        Li,
        List,
        Listgroup,
        ListgroupItem,
        NumberInput,
        P,
        Range
    } from 'flowbite-svelte'
    import Car from './car.svelte'
    import Greet from './greet.svelte'
    import Prices from './prices.svelte'
    import { elapsed, time } from './stores.js'

    const formatter = new Intl.DateTimeFormat('en', {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
    })
    let yes: boolean = false
    let toggle = () => (yes = !yes)

    type Car = {
        name: string
        type: string
        brand: string
    }
    let mycar: Car = {
        name: '',
        type: '',
        brand: ''
    }

    let stuff: string[] = ['table', 'chair', 'computer', 'mouse', 'keyboard']
    let cart = [
        { id: 1, name: 'imac' },
        { id: 2, name: 'iphone' },
        { id: 3, name: 'macbook' },
        { id: 4, name: 'ipad' },
        { id: 5, name: 'airpods' }
    ]
    let removeFirst = () => (cart = cart.slice(1))
    let removeLast = () => (cart = cart.slice(0, -1))

    let num: number = 0
    $: sqr = num ** (1 / 2)
    $: console.log(num)
    $: if (num >= 10) {
        alert(`noti ${num}`)
        num = 0
    }
    let increment = () => num++

    let arr: number[] = [0]
    $: sum = arr.reduce((a, b) => a + b, 0)

    let appendNum = () => (arr = [...arr, arr.length])

    let fetchRandom = async () => {
        const res = await fetch(
            'https://www.random.org/integers/?num=1&min=99&max=999&col=1&base=10&format=plain'
        )
        const text = await res.text()
        if (res.ok) return text
        else throw new Error(text)
    }
    let promise = fetchRandom()
    let clickForRandom = () => (promise = fetchRandom())

    type Coordinate = {
        x: number
        y: number
    }
    let mouse: Coordinate = {
        x: 0,
        y: 0
    }

    const fetchMeme = (async () => {
        const response = await fetch('https://meme-api.com/gimme')
        return await response.json()
    })()
</script>

<svelte:head>
    <title>App</title>
</svelte:head>

<div>
    <p>
        {formatter.format($time)}
        this page has been open for {$elapsed} seconds
    </p>

    <P align="center">
        {#if yes}
            <Button
                pill
                gradient
                color="purpleToBlue"
                shadow="purple"
                size="lg"
                class="w-24"
                on:click={toggle}>Log out</Button
            >
        {:else}
            <Button
                pill
                gradient
                color="greenToBlue"
                shadow="green"
                size="lg"
                class="w-24"
                on:click={toggle}>Log in</Button
            >
        {/if}
    </P>
    <Checkbox bind:checked={yes}>
        {#if yes}
            Thank you!
        {:else}
            Check this please
        {/if}
    </Checkbox>

    <Hr />

    <Greet />
    <Greet holiday={'New Year'} />

    <Hr />
    <ButtonGroup>
        <FloatingLabelInput style="outlined" label="Car name" bind:value={mycar.name} />
        <FloatingLabelInput style="outlined" label="Car brand" bind:value={mycar.brand} />
        <FloatingLabelInput style="outlined" label="Car type" bind:value={mycar.type} />
    </ButtonGroup>
    <P space="widest" size="xl" weight="extrabold"><Car {...mycar} /></P>

    <Hr />
    <div class="grid justify-center">
        <Listgroup active items={stuff} let:item class="w-24">
            {item}
        </Listgroup>
    </div>

    <ButtonGroup>
        <Button on:click={removeFirst}>Remove first</Button>
        <Button on:click={removeLast}>Remove last</Button>
    </ButtonGroup>

    <Listgroup class="w-48">
        {#each cart as item (item.id)}
            <ListgroupItem>
                <Prices product={item.name} />
            </ListgroupItem>
        {/each}
    </Listgroup>

    <List tag="ul">
        {#each cart as item (item.id)}
            <Li><Prices product={item.name} /></Li>
        {/each}
    </List>

    <Hr />

    {#if num > 6}
        <P>{num} is greater than 6</P>
    {:else if 3 > num}
        <P>{num} is less than 3</P>
    {:else}
        <P>{num} is between 3 and 6</P>
    {/if}
    <Button on:click={increment}>
        &#8730;{num} = {sqr}
    </Button>

    <Button on:click={appendNum}>
        {arr.join(' + ')} = {sum}
    </Button>

    <Button on:click={clickForRandom}>Generate random number</Button>
    {#await promise}
        ...wait
    {:then num}
        {num}
    {:catch error}
        {error.message}
    {/await}

    <Hr />

    <div
        class="h-screen grid justify-center items-center"
        on:mousemove={e => {
            mouse = { x: e.clientX, y: e.clientY }
        }}
    >
        <div>
            Cursor at
            <ButtonGroup divClass="flex">
                <NumberInput class="text-center" bind:value={mouse.x} />
                <NumberInput class="text-center" bind:value={mouse.y} />
            </ButtonGroup>
            <Range max="1920" bind:value={mouse.x} />
            <Range max="1080" bind:value={mouse.y} />
        </div>
    </div>

    <div class="grid justify-center">
        {#await fetchMeme}
            <p>...waiting</p>
        {:then data}
            <A href={data.postLink}>{data.postLink}</A>
            <Img
                src={data.url}
                caption={data.title}
                class="rounded-3xl transition-all duration-500 blur-lg hover:blur-none grayscale hover:grayscale-0"
                alignment="mx-auto"
            />
        {:catch error}
            <p>An error occurred!</p>
        {/await}
    </div>
</div>
