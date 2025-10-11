<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    @foreach ($products as $product)
        <url>
            <loc>https://tpmyadak.com/product/{{ urlencode($product->slug) }}</loc>
            <lastmod>{{ $product->updated_at->tz('UTC')->toAtomString() }}</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.9</priority>
            <image:image>
                <image:loc>https://cdn.tpmyadak.com/prothumb/{{$product->image}}</image:loc>
                <image:title>{{$product->title}}</image:title>
            </image:image>
        </url>
    @endforeach
</urlset>
