<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"  data-theme="light" dir="rtl">

<head>
    <title inertia>{{ config('app.name', 'Laravel') }}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="parham akbari (neogood@yahoo.com)">
    <meta name="twitter:image" content='{{asset('logo.png')}}'/>
    <meta name="twitter:card" content="summary"/>
    <meta name="twitter:site" content="@tpmyadak"/>
    <meta name="twitter:url" content="https://tpmyadak.com/"/>
    <meta name="twitter:creator" content="Parham Akbari"/>
    <meta data-react-helmet="true" property="og:site_name" content="تی‌پی‌ام"/>
    <meta data-react-helmet="true" property="og:locale" content="fa_IR"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="application-TileColor" content="#FFFFFF"/>
    <meta name="theme-color" content="#FFFFFF"/>
    <meta property="og:locale" content="fa_IR"/>
    <meta property="og:site_name" content="تی‌پی‌ام"/>
    <link rel="icon" type="image/png" href="{{asset('favicon-96x96.png')}}" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="{{asset('favicon.svg')}}" />
    <link rel="shortcut icon" href="{{asset('favicon.ico')}}" />
    <link rel="apple-touch-icon" sizes="180x180" href={{asset('apple-touch-icon.png')}} />
    <meta name="apple-mobile-web-app-title" content="TPMYADAK" />
    <link rel="manifest" href="{{ asset('build/manifest.webmanifest') }}">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
{{--    @vite(['resources/js/app.jsx', "resources/js/pages/{$page['component']}.jsx"])--}}
    @vite(['resources/js/app.jsx'])
    @inertiaHead
</head>

<body class="antialiased bg-base-100"  id="root">
    @inertia
    <script type="module">
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/build/sw.js')
                .then(reg => console.log('SW registered:', reg))
                .catch(err => console.log('SW registration failed:', err));
        }
    </script>
</body>

</html>
