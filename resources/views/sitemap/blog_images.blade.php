<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    @foreach ($posts as $article)
        <url>
            <loc>https://tpmyadak.com/articles/{{urlencode($article->slug) }}</loc>

            <image:image>
                <image:loc>https://cdn.tpmyadak.com/postjpg/{{substr($article->img_cover, 0, strpos($article->img_cover, ".")).".jpg"}}</image:loc>
                <image:title>{{$article->title}}</image:title>
                <image:geo_location>Iran</image:geo_location>
                <image:caption>{{$article->slug}}</image:caption>
            </image:image>
            <image:image>
                <image:loc>https://cdn.tpmyadak.com/postthumb/{{'thumb-'.$article->img_cover}}</image:loc>
                <image:title>{{$article->title}}</image:title>
                <image:geo_location>Iran</image:geo_location>
                <image:caption>{{$article->slug}}</image:caption>
            </image:image>
            <image:image>
                <image:loc>https://cdn.tpmyadak.com/post510/{{$article->img_cover}}</image:loc>
                <image:title>{{$article->title}}</image:title>
                <image:geo_location>Iran</image:geo_location>
                <image:caption>{{$article->slug}}</image:caption>
            </image:image>
            <image:image>
                <image:loc>https://cdn.tpmyadak.com/{{$article->img_cover}}</image:loc>
                <image:title>{{$article->title}}</image:title>
                <image:geo_location>Iran</image:geo_location>
                <image:caption>{{$article->slug}}</image:caption>
            </image:image>
        </url>
    @endforeach
</urlset>
