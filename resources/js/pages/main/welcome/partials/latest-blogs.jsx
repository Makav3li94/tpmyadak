import {Link} from "@inertiajs/react";
import BlogCard from "@/components/common/blog-card.jsx";


export default function LatestBlogs({latestBlogs}) {
    return (
        <section className="bg-base-200 w-full flex justify-center pb-12">

            <div className="container pt-14  px-5 md:px-0">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="text-center pb-4">
                        <h5 className=" text-[#d8330a] text-base">آخرین مقالات</h5>
                        <h3 className="text-2xl font-extrabold  my-4">
                            مشاهده مقاله ای نوشته شده توسط تیم تحریریه TPM
                        </h3>
                    </div>

                </div>
                <div
                    className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {latestBlogs.map((blog, i) => (
                        <BlogCard blog={blog} i={i}/>
                    ))}
                </div>
            </div>
        </section>
    )
}
