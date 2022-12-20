<script lang="ts">
	import { Button, Hr, Layout, Li, List, Listgroup, P } from 'flowbite-svelte'
	import Car from './car.svelte'
	import Greet from './greet.svelte'
	import Prices from './prices.svelte'
	const car = {
		name: 'VFe34',
		type: 'SUV',
		brand: 'Vinfast'
	}
	type User = {
		login: boolean
	}
	let user: User = {
		login: false
	}
	let toggle = () => (user.login = !user.login)

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
</script>

<div>
	<P align="center">
		{#if user.login}
			<Button
				pill
				gradient
				color="purpleToBlue"
				shadow="purple"
				size="lg"
				class="w-24"
				on:click={toggle}>Log out</Button>
		{:else}
			<Button
				pill
				gradient
				color="purpleToBlue"
				shadow="purple"
				size="lg"
				class="w-24"
				on:click={toggle}>Log in</Button>
		{/if}
	</P>
	<Hr />

	<P space="widest" size="xl" weight="extrabold"><Car {...car} /></P>

	<Hr />

	<Greet />
	<Greet holiday={'New Year'} />

	<Hr />
	<Layout gap={0}>
		<P align="center">
			<Button class="w-48" on:click={removeFirst}>Remove first</Button>
		</P>
		<P align="center">
			<Button class="w-48" on:click={removeLast}>Remove last</Button>
		</P>
	</Layout>

	<Listgroup items={cart} let:item><Prices product={item.name} /></Listgroup>

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

	<Hr />

	<Button on:click={appendNum}>
		{arr.join(' + ')} = {sum}
	</Button>

	<Hr />

	<Button on:click={clickForRandom}>Generate random number</Button>
	{#await promise}
		...wait
	{:then num}
		{num}
	{:catch error}
		{error.message}
	{/await}

	<Hr />
</div>
