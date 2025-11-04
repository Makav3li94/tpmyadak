<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Shop\CarBrand;
use App\Models\Shop\CarModel;

class CarBrandSeeder extends Seeder
{
    public function run(): void
    {
        $brands = [

            // برند => [slug انگلیسی، مدل‌ها]
            'هایما' => [
                'slug' => 'Haima',
                'models' => ['Haima-S5', 'Haima-S7', 'Haima-S7-Turbo', 'Haima-8S', 'Haima-7X'],
            ],
            'سوزوکی' => [
                'slug' => 'Suzuki',
                'models' => ['Suzuki-Grand-Vitara', 'Suzuki-Kizashi', 'Suzuki-SX4', 'Suzuki-Jimny'],
            ],
            'رنو' => [
                'slug' => 'Renault',
                'models' => ['Renault-Talisman', 'Renault-Koleos', 'Renault-Captur', 'Renault-Duster', 'Renault-Symbol', 'Renault-Logan', 'Renault-Sandero', 'Renault-Megane'],
            ],
            'دانگ فنگ' => [
                'slug' => 'Dongfeng',
                'models' => ['Dongfeng-H30-Cross', 'Dongfeng-S30', 'Dongfeng-T5', 'Dongfeng-Fengon-580'],
            ],
            'پژو' => [
                'slug' => 'Peugeot',
                'models' => ['Peugeot-206', 'Peugeot-207', 'Peugeot-405', 'Peugeot-Pars', 'Peugeot-2008', 'Peugeot-301', 'Peugeot-508'],
            ],
            'ایران خودرو' => [
                'slug' => 'IKCO',
                'models' => ['Dena', 'Dena-Plus', 'Tara', 'Soren-Plus', 'Rana-Plus', 'Samand-EF7', 'Peugeot-Pars', 'Peugeot-206', 'Peugeot-207', 'Arisun-2'],
            ],
            'سایپا' => [
                'slug' => 'Saipa',
                'models' => ['Tiba', 'Saina', 'Quik', 'Shahin', 'Aria', 'Atlas', 'Pride'],
            ],
            'کیا' => [
                'slug' => 'Kia',
                'models' => ['Kia-Cerato', 'Kia-Optima', 'Kia-Sportage', 'Kia-Sorento', 'Kia-Picanto', 'Kia-Rio'],
            ],
            'برلیانس' => [
                'slug' => 'Brilliance',
                'models' => ['Brilliance-H220', 'Brilliance-H230', 'Brilliance-H320', 'Brilliance-H330', 'Brilliance-Cross'],
            ],
            'سیتروئن' => [
                'slug' => 'Citroen',
                'models' => ['Citroen-C3', 'Citroen-Xantia', 'Citroen-C5'],
            ],
            'هیوندای' => [
                'slug' => 'Hyundai',
                'models' => ['Hyundai-Elantra', 'Hyundai-Sonata', 'Hyundai-Tucson', 'Hyundai-SantaFe', 'Hyundai-i20', 'Hyundai-i30', 'Hyundai-Accent'],
            ],
            'ام وی ام' => [
                'slug' => 'MVM',
                'models' => ['MVM-110', 'MVM-315', 'MVM-X22', 'MVM-X22-Pro', 'MVM-X33', 'MVM-X33S', 'MVM-X55', 'MVM-X55-Pro'],
            ],
            'چری' => [
                'slug' => 'Chery',
                'models' => ['Chery-Arrizo-5', 'Chery-Arrizo-6-Pro', 'Chery-Tiggo-5', 'Chery-Tiggo-7', 'Chery-Tiggo-7-Pro', 'Chery-Tiggo-8-Pro'],
            ],
            'جک' => [
                'slug' => 'JAC',
                'models' => ['JAC-J4', 'JAC-J5', 'JAC-S3', 'JAC-S5', 'JAC-J7'],
            ],
            'جیلی' => [
                'slug' => 'Geely',
                'models' => ['Geely-Emgrand-7', 'Geely-X7', 'Geely-GC6'],
            ],
            'لیفان' => [
                'slug' => 'Lifan',
                'models' => ['Lifan-520', 'Lifan-620', 'Lifan-X50', 'Lifan-X60', 'Lifan-820'],
            ],
            'چانگان' => [
                'slug' => 'Changan',
                'models' => ['Changan-CS35', 'Changan-CS55', 'Changan-CS75', 'Changan-Alsvin'],
            ],
            'فاو' => [
                'slug' => 'FAW',
                'models' => ['FAW-B30', 'FAW-B50', 'FAW-X40'],
            ],
            'بی وای دی' => [
                'slug' => 'BYD',
                'models' => ['BYD-S6', 'BYD-F3', 'BYD-Tang'],
            ],
            'بهمن' => [
                'slug' => 'Bahman',
                'models' => ['Fidelity', 'Fidelity-Prime', 'Dignity', 'Respect', 'Kara'],
            ],
            'گریت وال' => [
                'slug' => 'GreatWall',
                'models' => ['GreatWall-Wingle5', 'Haval-H2', 'Haval-H6'],
            ],
            'دایون' => [
                'slug' => 'Dayun',
                'models' => ['Dayun-Y5', 'Dayun-Y7'],
            ],
            'لاماری' => [
                'slug' => 'Lamari',
                'models' => ['Lamari-Eama'],
            ],
            'ام جی' => [
                'slug' => 'MG',
                'models' => ['MG-360', 'MG-6', 'MG-GT', 'MG-RX5', 'MG-HS', 'MG-ZS'],
            ],
        ];

        foreach ($brands as $brandTitle => $data) {

            $brand = CarBrand::updateOrCreate(
                ['slug' => $data['slug']],
                ['title' => $brandTitle]
            );

            foreach ($data['models'] as $modelSlug) {
                CarModel::updateOrCreate(
                    [
                        'slug' => $modelSlug,
                        'car_brand_id' => $brand->id,
                    ],
                    [
                        'title' => $this->toPersianTitle($modelSlug),
                    ]
                );
            }
        }
    }

    private function toPersianTitle(string $slug): string
    {
        $name = str_replace('-', ' ', $slug);
        return ucfirst($name);
    }
}
