import {hasPermission} from '@/utils'
import {Link, usePage} from '@inertiajs/react'
import {Button} from "@/components/index/index.js";
import {Heart, Star} from "lucide-react";

export default function BlogCard({blog,i}) {
    return (
        <article key={i} className="flex flex-col items-start justify-between">
            <div className="relative w-full">
                <img alt={blog.title} src={route('file.show',blog.img_cover)}
                    className="aspect-[16/9] w-full rounded bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <time dateTime={blog.created_at} className="text-gray-500">
                        {blog.published_at}
                    </time>
                    <Link href={route('home.getBlogs', {category: blog.category.id})} className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                        {blog.category.title}
                    </Link>
                </div>
                <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <Link href={route('home.getBlog',blog.slug)}>
                            <span className="absolute inset-0" />
                            {blog.title}
                        </Link>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{blog.excerpt}</p>
                </div>
                {/*<div className="relative mt-8 flex items-center gap-x-4">*/}
                {/*    <img alt="" src={blog.author.imageUrl} className="h-10 w-10 rounded-full bg-gray-100" />*/}
                {/*    <div className="text-sm leading-6">*/}
                {/*        <p className="font-semibold text-gray-900">*/}
                {/*            <a href={blog.author.href}>*/}
                {/*                <span className="absolute inset-0" />*/}
                {/*                {blog.author.name}*/}
                {/*            </a>*/}
                {/*        </p>*/}
                {/*        <p className="text-gray-600">{blog.author.role}</p>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </article>

    )
}
