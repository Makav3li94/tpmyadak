<?php

namespace App\Constants;

use Illuminate\Support\Facades\Route;

class PermissionConstant
{
    const LIST = [
        ['label' => 'View Dashboard', 'name' => 'view-dashboard', 'group' => 'General'],

        ['label' => 'Create User', 'name' => 'create-user', 'group' => 'Users'],
        ['label' => 'Update User', 'name' => 'update-user', 'group' => 'Users'],
        ['label' => 'View User', 'name' => 'view-user', 'group' => 'Users'],
        ['label' => 'Delete User', 'name' => 'delete-user', 'group' => 'Users'],

        ['label' => 'Create Admin', 'name' => 'create-admin', 'group' => 'Admins'],
        ['label' => 'Update Admin', 'name' => 'update-admin', 'group' => 'Admins'],
        ['label' => 'View Admin', 'name' => 'view-admin', 'group' => 'Admins'],
        ['label' => 'Delete Admin', 'name' => 'delete-admin', 'group' => 'Admins'],

        ['label' => 'Create Role', 'name' => 'create-role', 'group' => 'Users'],
        ['label' => 'Update Role', 'name' => 'update-role', 'group' => 'Users'],
        ['label' => 'View Role', 'name' => 'view-role', 'group' => 'Users'],
        ['label' => 'Delete Role', 'name' => 'delete-role', 'group' => 'Users'],

        ['label' => 'View Setting', 'name' => 'view-setting', 'group' => 'Sertting'],
        ['label' => 'Update Setting', 'name' => 'update-setting', 'group' => 'Setting'],

        // #Add New Permission Below!
		['label' => 'Delete Blog Category', 'name' => 'delete-blog-category' , 'group' => 'blog-category'],
		['label' => 'Update Blog Category', 'name' => 'update-blog-category' , 'group' => 'blog-category'],
		['label' => 'Create Blog Category', 'name' => 'create-blog-category' , 'group' => 'blog-category'],
		['label' => 'View Blog Category', 'name' => 'view-blog-category' , 'group' => 'blog-category'],

        ['label' => 'Delete Blog ', 'name' => 'delete-blog' , 'group' => 'blog'],
        ['label' => 'Update Blog ', 'name' => 'update-blog' , 'group' => 'blog'],
        ['label' => 'Create Blog ', 'name' => 'create-blog' , 'group' => 'blog'],
        ['label' => 'View Blog ', 'name' => 'view-blog' , 'group' => 'blog'],

        ['label' => 'Delete Order ', 'name' => 'delete-order' , 'group' => 'order'],
        ['label' => 'Update Order ', 'name' => 'update-order' , 'group' => 'order'],
        ['label' => 'Create Order ', 'name' => 'create-order' , 'group' => 'order'],
        ['label' => 'View Order ', 'name' => 'view-order' , 'group' => 'order'],

        ['label' => 'Delete Transaction ', 'name' => 'delete-transaction' , 'group' => 'transaction'],
        ['label' => 'Update Transaction ', 'name' => 'update-transaction' , 'group' => 'transaction'],
        ['label' => 'Create Transaction ', 'name' => 'create-transaction' , 'group' => 'transaction'],
        ['label' => 'View Transaction ', 'name' => 'view-transaction' , 'group' => 'transaction'],

        ['label' => 'Delete Product ', 'name' => 'delete-product' , 'group' => 'product'],
        ['label' => 'Update Product ', 'name' => 'update-product' , 'group' => 'product'],
        ['label' => 'Create Product ', 'name' => 'create-product' , 'group' => 'product'],
        ['label' => 'View Product ', 'name' => 'view-product' , 'group' => 'product'],

        ['label' => 'Delete Ticket ', 'name' => 'delete-ticket' , 'group' => 'ticket'],
        ['label' => 'Update Ticket ', 'name' => 'update-ticket' , 'group' => 'ticket'],
        ['label' => 'Create Ticket ', 'name' => 'create-ticket' , 'group' => 'ticket'],
        ['label' => 'View Ticket ', 'name' => 'view-ticket' , 'group' => 'ticket'],

        ['label' => 'Delete Brand ', 'name' => 'delete-brand' , 'group' => 'brand'],
        ['label' => 'Update Brand ', 'name' => 'update-brand' , 'group' => 'brand'],
        ['label' => 'Create Brand ', 'name' => 'create-brand' , 'group' => 'brand'],
        ['label' => 'View Brand ', 'name' => 'view-brand' , 'group' => 'brand'],

        ['label' => 'Delete Car Brand ', 'name' => 'delete-car-brand' , 'group' => 'car-brand'],
        ['label' => 'Update Car Brand ', 'name' => 'update-car-brand' , 'group' => 'car-brand'],
        ['label' => 'Create Car Brand ', 'name' => 'create-car-brand' , 'group' => 'car-brand'],
        ['label' => 'View Car Brand ', 'name' => 'view-car-brand' , 'group' => 'car-brand'],

        ['label' => 'Delete Car Model ', 'name' => 'delete-car-model' , 'group' => 'car-model'],
        ['label' => 'Update Car Model ', 'name' => 'update-car-model' , 'group' => 'car-model'],
        ['label' => 'Create Car Model ', 'name' => 'create-car-model' , 'group' => 'car-model'],
        ['label' => 'View Car Model ', 'name' => 'view-car-model' , 'group' => 'car-model'],

        ['label' => 'Delete Supplier ', 'name' => 'delete-supplier' , 'group' => 'supplier'],
        ['label' => 'Update Supplier ', 'name' => 'update-supplier' , 'group' => 'supplier'],
        ['label' => 'Create Supplier ', 'name' => 'create-supplier' , 'group' => 'supplier'],
        ['label' => 'View Supplier ', 'name' => 'view-supplier' , 'group' => 'supplier'],

        ['label' => 'Delete Attribute Group', 'name' => 'delete-attribute-group' , 'group' => 'attribute-group'],
        ['label' => 'Update Attribute Group', 'name' => 'update-attribute-group' , 'group' => 'attribute-group'],
        ['label' => 'Create Attribute Group', 'name' => 'create-attribute-group' , 'group' => 'attribute-group'],
        ['label' => 'View Attribute Group', 'name' => 'view-attribute-group' , 'group' => 'attribute-group'],

        ['label' => 'Delete Tax ', 'name' => 'delete-tax' , 'group' => 'tax'],
        ['label' => 'Update Tax ', 'name' => 'update-tax' , 'group' => 'tax'],
        ['label' => 'Create Tax ', 'name' => 'create-tax' , 'group' => 'tax'],
        ['label' => 'View Tax ', 'name' => 'view-tax' , 'group' => 'tax'],

        ['label' => 'Delete Filter ', 'name' => 'delete-filter' , 'group' => 'filter'],
        ['label' => 'Update Filter ', 'name' => 'update-filter' , 'group' => 'filter'],
        ['label' => 'Create Filter ', 'name' => 'create-filter' , 'group' => 'filter'],
        ['label' => 'View Filter ', 'name' => 'view-filter' , 'group' => 'filter'],

        ['label' => 'Delete Product Category ', 'name' => 'delete-product-category' , 'group' => 'product-category'],
        ['label' => 'Update Product Category ', 'name' => 'update-product-category' , 'group' => 'product-category'],
        ['label' => 'Create Product Category ', 'name' => 'create-product-category' , 'group' => 'product-category'],
        ['label' => 'View Product Category ', 'name' => 'view-product-category' , 'group' => 'product-category'],

        ['label' => 'Delete Shipping Method', 'name' => 'delete-shipping-method' , 'group' => 'shipping-method'],
        ['label' => 'Update Shipping Method', 'name' => 'update-shipping-method' , 'group' => 'shipping-method'],
        ['label' => 'Create Shipping Method', 'name' => 'create-shipping-method' , 'group' => 'shipping-method'],
        ['label' => 'View Shipping Method', 'name' => 'view-shipping-method' , 'group' => 'shipping-method'],

        ['label' => 'Delete Payment Method', 'name' => 'delete-payment-method' , 'group' => 'payment-method'],
        ['label' => 'Update Payment Method', 'name' => 'update-payment-method' , 'group' => 'payment-method'],
        ['label' => 'Create Payment Method', 'name' => 'create-payment-method' , 'group' => 'payment-method'],
        ['label' => 'View Payment Method', 'name' => 'view-payment-method' , 'group' => 'payment-method'],

    ];

    public static function all()
    {
        return array_merge(self::LIST,  self::modules());
    }

    private static function modules()
    {
        $permissions = [];

        if (Route::has('shortlink.link.index')) {
            $permissions[] = ['label' => 'View Shortlink', 'name' => 'view-shortlink', 'group' => 'Shortlink'];
        }

        if (Route::has('custom-form.forms.index')) {
            $permissions = array_merge($permissions, [
                ['label' => 'Create Custom Form', 'name' => 'create-custom-form', 'group' => 'CustomForm'],
                ['label' => 'Update Custom Form', 'name' => 'update-custom-form', 'group' => 'CustomForm'],
                ['label' => 'View Custom Form', 'name' => 'view-custom-form', 'group' => 'CustomForm'],
                ['label' => 'Delete Custom Form', 'name' => 'delete-custom-form', 'group' => 'CustomForm'],

                ['label' => 'Create Custom Form Record', 'name' => 'create-custom-form-record', 'group' => 'CustomForm'],
                ['label' => 'Update Custom Form Record', 'name' => 'update-custom-form-record', 'group' => 'CustomForm'],
                ['label' => 'View Custom Form Record', 'name' => 'view-custom-form-record', 'group' => 'CustomForm'],
                ['label' => 'Delete Custom Form Record', 'name' => 'delete-custom-form-record', 'group' => 'CustomForm'],
            ]);
        }

        return $permissions;
    }
}
