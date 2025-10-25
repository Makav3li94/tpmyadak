import {Star} from "lucide-react";

export default function Review({review, i}) {

    return (
        <div key={review.id} className="flex space-x-4 text-sm text-gray-500 pb-4 border-b border-gray-300">
            <div className="flex-none py-10">
                {/*<img alt="" src={review.avatarSrc} className="h-10 w-10 rounded-full bg-gray-100"/>*/}
                <span
                    className="rounded-full mx-auto mt-4 inline-flex items-center justify-center h-[4.375rem] w-[4.375rem]  bg-gray-500 text-sm font-semibold text-white leading-none">
                    {review.author.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()}
                </span>
            </div>
            <div className={`${i === 0 ? '' : 'border-t border-gray-200'}  py-10 w-full`}>
                <h3 className="font-medium text-gray-900">{review.author.name}</h3>
                <p>
                    <time dateTime={review.created_at}>{review.created_at}</time>
                </p>

                <div className="mt-4 flex items-center">
                    <Star className={`w-6 h-6 lg:w-4 lg:h-4 ${review.rating>=1 ?'text-yellow-500' :'text-gray-500'}`}/>
                    <Star className={`w-6 h-6 lg:w-4 lg:h-4 ${review.rating>=2 ?'text-yellow-500' :'text-gray-500'}`}/>
                    <Star className={`w-6 h-6 lg:w-4 lg:h-4 ${review.rating>=3 ?'text-yellow-500' :'text-gray-500'}`}/>
                    <Star className={`w-6 h-6 lg:w-4 lg:h-4 ${review.rating>=4 ?'text-yellow-500' :'text-gray-500'}`}/>
                    <Star className={`w-6 h-6 lg:w-4 lg:h-4 ${review.rating>=5 ?'text-yellow-500' :'text-gray-500'}`}/>
                </div>
                <p className="sr-only">{review.rating} از 5</p>
                <div className="mt-2">
                    <strong className="mt-2">{review.title}</strong>
                </div>
                <div
                    dangerouslySetInnerHTML={{__html: review.review}}
                    className="prose prose-sm mt-4 max-w-none text-gray-500"
                />
            </div>
        </div>
    )
}
