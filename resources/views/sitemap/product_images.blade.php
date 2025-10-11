<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    @foreach ($products as $product)
        <url>
            <loc>https://tpmyadak.com/product/{{ urlencode($product->slug )}}</loc>
            @foreach ($product->images as $image)
                <image:image>
                    <image:loc>https://cdn.tpmyadak.com/productjpg/{{substr_replace($image->image, 'jpg', -4, 4)}}</image:loc>
                    <image:title>{{$product->title}}</image:title>
                    <image:geo_location>Iran</image:geo_location>
                    <image:caption>{{$product->slug}}</image:caption>
                </image:image>
                <image:image>
                    <image:loc>https://cdn.tpmyadak.com/product/{{$image->image}}</image:loc>
                    <image:title>{{$product->title}}</image:title>
                    <image:geo_location>Iran</image:geo_location>
                    <image:caption>{{$product->slug}}</image:caption>
                </image:image>
                <image:image>
                    <image:loc>https://cdn.tpmyadak.com/product510/{{$image->image}}</image:loc>
                    <image:title>{{$product->title}}</image:title>
                    <image:geo_location>Iran</image:geo_location>
                    <image:caption>{{$product->slug}}</image:caption>
                </image:image>

            @endforeach
        </url>
    @endforeach
</urlset>
