<script lang="ts">
    const price_data: { [key: string]: number } = {
        airpods: 249,
        iphone: 799,
        ipad: 449,
        macbook: 1199,
        imac: 1299
    }
    export let product: string
    const price: number = price_data[product]
</script>

Buy {product} for {price}$
