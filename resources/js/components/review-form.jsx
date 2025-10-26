import {Star } from "lucide-react";
import {useForm} from "@inertiajs/react";
import StarInput from "@/components/daisy-ui/star-input.jsx";
import React from "react";
import TextareaInput from "@/components/daisy-ui/textarea-input.jsx";
import {Modal, Button, Card, TextInput,  Checkbox} from '@/components/index'
import {showToast} from "@/utils.js";

export default function ReviewForm({reviewType,model_id}){
    const {data, setData, post, put, processing, errors, reset, clearErrors} =
        useForm({
            model_id: model_id,
            title: '',
            body: '',
            overall: '',
            recommend: '',
            review_type:reviewType
        })


    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('user.review.store'), {
            onSuccess: () => showToast('دیدگاه شما با موفقیت ثبت شد.','success'),
            onError:()=>showToast('مشکلی پیش آمد.','error')
        })
    }
    return(
        <Card>
        <form className="form-control space-y-2.5 flex flex-col" onSubmit={handleSubmit}>
            <TextInput
                name="title"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                label="عنوان"
                error={errors.title}
            />
            <TextareaInput name="body" required value={data.body}
                      onChange={(e) => setData('body', e.target.value)} label="متن"
                      placeHolder="نظر خود را بنویسید"
                      error={errors.body}/>



            <div className="flex gap-3 justify-between items-center">

                <div className="basis-full sm:basis-1/2">
                    <Checkbox
                        label="توصیه میکنید؟"
                        name="recommend"
                        value={data.recommend}
                        onChange={()=>setData('recommend',1)}
                        error={errors.recommend}
                    />
                </div>
                <div className="basis-full sm:basis-1/2">
                    <StarInput label="امتیاز شما" data={data} setData={setData} name="overall"/>
                </div>
            </div>

            <div className="divider"/>
            <div className="flex items-center space-x-2 mt-4 justify-end">
                <Button processing={processing} btnType="submit" type="primary">
                    ارسال نظر
                </Button>

            </div>

        </form>
        </Card>
    )
}
