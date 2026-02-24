export function Rodape() {
  return (
    <footer className="bg-ruah-brown text-ruah-beige py-12 border-t-4 border-ruah-gold">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h4 className="font-serif text-2xl mb-2 text-ruah-beige">RUAH</h4>
            <p className="text-sm text-ruah-sand">Assessoria, Consultoria e Comercio</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-ruah-sand">
              &copy; {new Date().getFullYear()} RUAH. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
