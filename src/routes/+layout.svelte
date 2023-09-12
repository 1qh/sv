<script>
    import ava from '$lib/ava.svg'
    import logo from '$lib/bike.svg'
    import {
        Avatar,
        DarkMode,
        Dropdown,
        DropdownDivider,
        DropdownHeader,
        DropdownItem,
        Navbar,
        NavBrand,
        NavHamburger,
        NavLi,
        NavUl
    } from 'flowbite-svelte'
    import '../app.postcss'
</script>

<div>
    <div class="mx-5 mt-2 rounded-full shadow-xl shadow-gray-300 dark:shadow-gray-600">
        <Navbar let:hidden let:toggle navClass="rounded-full px-2 w-full">
            <NavHamburger on:click={toggle} />
            <NavBrand href="/">
                <img src={logo} class="mr-2 dark:invert" alt="Logo" />
                <span class="text-xl font-bold dark:text-white">Ride</span>
            </NavBrand>
            <div class="flex items-center md:order-2">
                <Avatar id="avatar-menu" src={ava} />
            </div>
            <Dropdown placement="bottom" triggeredBy="#avatar-menu">
                <DropdownHeader>
                    <span class="block text-sm"> Name </span>
                    <span class="block truncate text-sm font-medium"> e@mail.com </span>
                </DropdownHeader>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownDivider />
                <div class="flex">
                    <DropdownItem>Sign out</DropdownItem>
                    <DarkMode />
                </div>
            </Dropdown>
            <NavUl {hidden}>
                <NavLi href="/">Home</NavLi>
                <NavLi href="/app">App</NavLi>
                <NavLi href="/blog">Blog</NavLi>
                <NavLi href="/todo">Todo</NavLi>
            </NavUl>
        </Navbar>
    </div>
    <div class="overflow-scroll h-screen ml-3 mr-3 pt-4">
        <slot />
    </div>
</div>
