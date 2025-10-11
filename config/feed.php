<?php

return [
    'feeds' => [
        'blogs' => [
            'items' => 'App\Models\Blog@getFeedItems',
            'url' => '/feed',
            'title' => 'TPM feed',
            'description' => 'This is TPM feed.',
            'language' => 'fa-IR',

            /*
             * The image to display for the feed. For Atom feeds, this is displayed as
             * a banner/logo; for RSS and JSON feeds, it's displayed as an icon.
             * An empty value omits the image attribute from the feed.
             */
//            'image' => '',

            /*
             * The format of the feed. Acceptable values are 'rss', 'atom', or 'json'.
             */
            'format' => 'atom',

            /*
             * The view that will render the feed.
             */
            'view' => 'feed::atom',

            /*
             * The mime type to be used in the <link> tag. Set to an empty string to automatically
             * determine the correct value.
             */
            'type' => '',

            /*
             * The content type for the feed response. Set to an empty string to automatically
             * determine the correct value.
             */
            'contentType' => '',
        ],
//        'products' => [
//            'items' => 'App\Models\Product@getFeedItems',
//            'url' => '/products',
//            'title' => 'Kadooyab Products feed',
//            'description' => 'This is Kadooyab Products feed.',
//            'language' => 'fa-IR',
//            'format' => 'atom',
//            'view' => 'feed::atom',
//            'type' => '',
//            'contentType' => '',
//        ],
    ],
];
