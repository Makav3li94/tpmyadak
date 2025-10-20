
export default function HeaderSingle() {

    return (
        <div className="container">
        <div className="navbar bg-base-100 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Item 1</a></li>
                    <li>
                        <details>
                            <summary>Parent</summary>
                            <ul className="menu xl:menu-horizontal bg-base-200 rounded-box lg:min-w-max">
                                <li>
                                    <a>Solutions</a>
                                    <ul>
                                        <li><a>Design</a></li>
                                        <li><a>Development</a></li>
                                        <li><a>Hosting</a></li>
                                        <li><a>Domain register</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a>Enterprise</a>
                                    <ul>
                                        <li><a>CRM software</a></li>
                                        <li><a>Marketing management</a></li>
                                        <li><a>Security</a></li>
                                        <li><a>Consulting</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a>Products</a>
                                    <ul>
                                        <li><a>UI Kit</a></li>
                                        <li><a>WordPress themes</a></li>
                                        <li><a>WordPress plugins</a></li>
                                        <li>
                                            <a>Open source</a>
                                            <ul>
                                                <li><a>Auth management system</a></li>
                                                <li><a>VScode theme</a></li>
                                                <li><a>Color picker app</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a>Company</a>
                                    <ul>
                                        <li><a>About us</a></li>
                                        <li><a>Contact us</a></li>
                                        <li><a>Privacy policy</a></li>
                                        <li><a>Press kit</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
        </div>
    )
}
