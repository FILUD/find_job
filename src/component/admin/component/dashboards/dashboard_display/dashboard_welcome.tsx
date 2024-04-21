function Dashboard_welcome() {

    return (
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-screen">
                    <h1 className="mb-5 text-5xl font-bold">Admin dashboard</h1>
                    <p className="mb-5">Welcome to the admin dashboard. This central hub empowers you to efficiently manage and oversee the intricate data ecosystem of this site. Dive into insightful analytics, effortlessly manipulate content, and streamline user interactions—all within a few clicks.</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard_welcome