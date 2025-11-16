import React, { useState } from 'react'

import {
    LayoutDashboard,
    ListOrdered,
    BringToFront,
    SaudiRiyal,
    TicketCheck,
    Megaphone,
    LogOut, X
} from "lucide-react";
import {Link, router} from '@inertiajs/react'



export default function SidebarNavUser({ user, show, setShow }) {
    const navigation = [
        {name: 'داشبورد', href: route('user.dashboard'), icon: LayoutDashboard, current: true},
        {name: 'سفارش ها', href: route('user.orders.index'), icon: BringToFront, current: true},
        {name: 'تراکنش ها', href: route('user.transactions.index'), icon: SaudiRiyal, current: true},
        {name: 'لیست خرید', href: route('user.wishlists.index'), icon: ListOrdered, current: true},
        {name: 'تیکت ها', href: route('user.tickets.index'), icon: TicketCheck, current: true},
        {name: 'اعلان ها', href: route('user.notifications.index'), icon: Megaphone, current: true},
    ]
    return (
      <>
          <div className={`${!show && 'hidden'} flex flex-col h-screen overflow-y-auto transition-all
           duration-300 transform sticky top-0 start-0 bottom-0  w-full md:w-64
            bg-base-100 c-shadow
            lg:translate-x-0 lg:end-auto lg:bottom-0 `}>
              <div className="flex flex-col justify-between flex-1">
                  <div className="">
                      <div className="flex flex-row justify-between items-center lg:justify-center p-6">
                          <div className="">
                              {user.name}
                          </div>
                          <div
                              className="block lg:hidden"
                              onClick={() => setShow()}
                          >
                              <X className="w-5 h-5" />
                          </div>
                      </div>
                      <nav className="w-full">
                          <ul className="w-full menu rounded-box gap-3">
                              {navigation.map((item) => (
                                  <li key={item.name}>
                                      <Link href={item.href}>
                                          <item.icon aria-hidden="true" className='h-6 w-6 shrink-0'/>
                                          {item.name}
                                      </Link>
                                  </li>
                              ))}
                              <li className="mt-auto">
                                  <div onClick={() => router.post(route('logout'))}>
                                      <LogOut className="h-5 w-5" aria-hidden="true"/>
                                      خروج
                                  </div>
                              </li>

                          </ul>
                      </nav>
                  </div>
              </div>
              <div className="p-6">
                  <p className="text-sm font-light text-center bottom-4 left-4 text-base-content">
                  TPM
                  </p>
              </div>
          </div>

      </>

    )
}
