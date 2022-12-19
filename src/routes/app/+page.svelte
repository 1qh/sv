<script lang="ts">
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

<Car {...car} />
<Greet />
<Greet holiday={'New Year'} />
<hr />
{#if user.login}
	<button on:click={toggle}> Log out </button>
{:else}
	<button on:click={toggle}> Log in </button>
{/if}
<hr />
<button on:click={removeFirst}>Remove first</button>
<button on:click={removeLast}>Remove last</button>
<ul>
	{#each cart as item (item.id)}
		<li><Prices product={item.name} /></li>
	{/each}
</ul>
<hr />
<button on:click={increment}>
	&#8730;{num} = {sqr}
</button>
{#if num > 6}
	<p>{num} is greater than 6</p>
{:else if 3 > num}
	<p>{num} is less than 3</p>
{:else}
	<p>{num} is between 3 and 6</p>
{/if}
<hr />
<button on:click={appendNum}>
	{arr.join(' + ')} = {sum}
</button>
<hr />
<button on:click={clickForRandom}> Generate random number </button>
{#await promise}
	...wait
{:then num}
	{num}
{:catch error}
	{error.message}
{/await}
