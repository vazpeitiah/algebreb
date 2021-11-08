const Navbar = () => {
	return (
		<header className="navbar-collapse site-header p-2 bg-nav text-white">
			<nav className="container container.item d-flex flex-column flex-md-row justify-content-between">
				<a className="py-3 px-2" href="#" aria-label="Product">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#00ADB5" className="bi bi-circle-square" viewBox="0 0 16 16">
						<path d="M0 6a6 6 0 1 1 12 0A6 6 0 0 1 0 6z" />
						<path d="M12.93 5h1.57a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1.57a6.953 6.953 0 0 1-1-.22v1.79A1.5 1.5 0 0 0 5.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 4h-1.79c.097.324.17.658.22 1z" />
					</svg>
				</a>
				<div className="col-6 justify-content-end">
					<a className="py-3 px-4 d-none d-md-inline-block nav-link" href="#home">Inicio</a>
					<a className="py-3 px-4 d-none d-md-inline-block nav-link" href="#app">Aplicación</a>
					<a className="py-3 px-4 d-none d-md-inline-block nav-link" href="#topics">Álgebra</a>
					<a className="py-3 px-4 d-none d-md-inline-block nav-link" href="#team">Nuestro equipo</a>
				</div>

			</nav>
		</header>);
}

export default Navbar;