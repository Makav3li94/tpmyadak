<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"  data-theme="light">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="parham akbari (neogood@yahoo.com)">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>


    <!-- Scripts -->
    @routes
    @viteReactRefresh
{{--    @vite(['resources/js/app.jsx', "resources/js/pages/{$page['component']}.jsx"])--}}
    @vite(['resources/js/app.jsx'])
    @inertiaHead
</head>

<body class="antialiased bg-base-300"  id="root">
    @inertia
</body>

</html>
