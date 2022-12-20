<script lang="ts">
	import { Button, Listgroup } from 'flowbite-svelte'
	import Car from './car.svelte'
	import Greet from './greet.svelte'

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
	{#if user.login}
		<Button on:click={toggle}>Log out</Button>
	{:else}
		<Button on:click={toggle}>Log in</Button>
	{/if}
	<br />
	<Car {...car} />
	<Greet />
	<Greet holiday={'New Year'} />
	<Button on:click={removeFirst}>Remove first</Button>
	<Button on:click={removeLast}>Remove last</Button>
	<Listgroup active items={cart} let:item>{item.name}</Listgroup>
	<Button on:click={increment}>
		&#8730;{num} = {sqr}
	</Button>
	{#if num > 6}
		<p>{num} is greater than 6</p>
	{:else if 3 > num}
		<p>{num} is less than 3</p>
	{:else}
		<p>{num} is between 3 and 6</p>
	{/if}
	<Button on:click={appendNum}>
		{arr.join(' + ')} = {sum}
	</Button>
	<br />
	<Button on:click={clickForRandom}>Generate random number</Button>
	{#await promise}
		...wait
	{:then num}
		{num}
	{:catch error}
		{error.message}
	{/await}
</div>
